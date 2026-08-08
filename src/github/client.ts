/**
 * Crea y configura el cliente Octokit para GitHub.
 * Agrega lógica de retry y traduce errores de la API a errores de aplicación legibles.
 */
import { Octokit } from '@octokit/rest';
import { AuthenticationError, GitHubAPIError, NetworkError } from '../errors/index.js';
import { isRetryableStatus, retryDelay } from '../utils/retry.js';

const getErrorMessage = (error: any) => {
  if (error?.status === 401 || error?.status === 403) {
    return new AuthenticationError('Token inválido o sin permisos. Verifica tu GitHub token.');
  }

  if (error?.status === 404) {
    return new GitHubAPIError('No se encontró el recurso solicitado.', 404, error?.code, error?.documentation_url);
  }

  if (error?.status === 422) {
    return new GitHubAPIError('Datos inválidos para la operación de GitHub.', error.status, error?.code, error?.documentation_url);
  }

  if (error?.status >= 400 && error?.status < 600) {
    return new GitHubAPIError(error.message ?? 'Error en la API de GitHub.', error.status, error?.code, error?.documentation_url);
  }

  return new NetworkError('Error de red al comunicar con GitHub. Intenta de nuevo.');
};

export const createOctokit = (token: string) => {
  if (!token) {
    throw new AuthenticationError('Falta el GitHub token en la configuración del servidor.');
  }

  const octokit = new Octokit({ auth: token });

  const requestWithRetry = async (fn: () => Promise<any>, attempt = 0): Promise<any> => {
    try {
      return await fn();
    } catch (error: any) {
      const status = error?.status;
      if (isRetryableStatus(status)) {
        if (attempt < 3) {
          const delayMs = retryDelay(attempt);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          return requestWithRetry(fn, attempt + 1);
        }
      }
      throw getErrorMessage(error);
    }
  };

  return {
    octokit,
    requestWithRetry
  };
};
