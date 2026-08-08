import { describe, it, expect } from 'vitest';
import { createOctokit } from '../src/github/client.js';
import { AuthenticationError, GitHubAPIError } from '../src/errors/index.js';

describe('GitHub client', () => {
  it('lanza AuthenticationError si falta token', () => {
    expect(() => createOctokit('')).toThrow(AuthenticationError);
  });

  it('transforma un 401 en AuthenticationError', async () => {
    const { requestWithRetry } = createOctokit('fake-token');
    await expect(requestWithRetry(async () => {
      const error = new Error('Unauthorized') as any;
      error.status = 401;
      throw error;
    })).rejects.toThrow(AuthenticationError);
  });

  it('transforma un 404 en GitHubAPIError', async () => {
    const { requestWithRetry } = createOctokit('fake-token');
    await expect(requestWithRetry(async () => {
      const error = new Error('Not found') as any;
      error.status = 404;
      throw error;
    })).rejects.toThrow(GitHubAPIError);
  });
});
