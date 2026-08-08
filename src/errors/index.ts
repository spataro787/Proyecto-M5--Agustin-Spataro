/**
 * Define clases de error especializadas utilizadas por el MCP server.
 * Permite diferenciar errores de validación, autenticación, API de GitHub y red.
 */
export class ValidationError extends Error {
  public readonly details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class GitHubAPIError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly documentation_url?: string;

  constructor(message: string, status?: number, code?: string, documentation_url?: string) {
    super(message);
    this.name = 'GitHubAPIError';
    this.status = status;
    this.code = code;
    this.documentation_url = documentation_url;
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Autenticación inválida. Verifica tu token de GitHub.') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Error de red. Verifica tu conexión e intenta de nuevo.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export const isGitHubError = (error: unknown): error is { status?: number; message?: string; documentation_url?: string } => {
  return typeof error === 'object' && error !== null && 'status' in error;
};
