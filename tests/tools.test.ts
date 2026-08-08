import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRequestWithRetry = vi.fn();
const mockOctokit = {
  repos: {
    createForAuthenticatedUser: vi.fn(),
    listForAuthenticatedUser: vi.fn(),
    createOrUpdateFileContents: vi.fn()
  },
  issues: {
    create: vi.fn(),
    listForRepo: vi.fn()
  }
};

vi.mock('../src/github/client.js', () => ({
  createOctokit: () => ({
    octokit: mockOctokit,
    requestWithRetry: mockRequestWithRetry
  })
}));

import { createRepository, createIssue, listRepositories, createCommit, listIssues } from '../src/tools/index.js';

describe('Tools de GitHub', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('crea repositorio cuando los datos son válidos', async () => {
    mockRequestWithRetry.mockImplementation(async (fn) => fn());
    mockOctokit.repos.createForAuthenticatedUser.mockResolvedValue({ data: { html_url: 'https://github.com/user/repo', full_name: 'user/repo' } });

    const result = await createRepository({ name: 'mi-repo', description: 'Descripción' });
    expect(result).toEqual({ repository: 'https://github.com/user/repo', fullName: 'user/repo' });
    expect(mockOctokit.repos.createForAuthenticatedUser).toHaveBeenCalledOnce();
  });

  it('crea issue con parámetros válidos', async () => {
    mockRequestWithRetry.mockImplementation(async (fn) => fn());
    mockOctokit.issues.create.mockResolvedValue({ data: { html_url: 'https://github.com/user/repo/issues/1', number: 1 } });

    const result = await createIssue({ owner: 'user', repo: 'repo', title: 'Bug', body: 'Descripción' });
    expect(result.issueUrl).toBe('https://github.com/user/repo/issues/1');
    expect(result.issueNumber).toBe(1);
  });

  it('lista repositorios usando el cliente GitHub', async () => {
    mockRequestWithRetry.mockImplementation(async (fn) => fn());
    mockOctokit.repos.listForAuthenticatedUser.mockResolvedValue({ data: [{ name: 'repo', full_name: 'user/repo', private: false, html_url: 'https://github.com/user/repo' }] });

    const result = await listRepositories({ visibility: 'all' });
    expect(result).toEqual([{ name: 'repo', full_name: 'user/repo', private: false, url: 'https://github.com/user/repo' }]);
  });

  it('crea un commit con contenido codificado en base64', async () => {
    mockRequestWithRetry.mockImplementation(async (fn) => fn());
    mockOctokit.repos.createOrUpdateFileContents.mockResolvedValue({ data: { content: { html_url: 'https://github.com/user/repo/blob/main/README.md', sha: 'abc123' } } });

    const result = await createCommit({ owner: 'user', repo: 'repo', branch: 'main', path: 'README.md', message: 'Agrega README', content: 'Hola' });
    expect(result).toEqual({ commitUrl: 'https://github.com/user/repo/blob/main/README.md', sha: 'abc123' });
    expect(mockOctokit.repos.createOrUpdateFileContents).toHaveBeenCalledOnce();
  });

  it('lista issues de un repositorio', async () => {
    mockRequestWithRetry.mockImplementation(async (fn) => fn());
    mockOctokit.issues.listForRepo.mockResolvedValue({ data: [{ number: 1, title: 'Bug', state: 'open', html_url: 'https://github.com/user/repo/issues/1' }] });

    const result = await listIssues({ owner: 'user', repo: 'repo', state: 'open' });
    expect(result).toEqual([{ number: 1, title: 'Bug', state: 'open', url: 'https://github.com/user/repo/issues/1' }]);
  });

  it('lanza ValidationError para input inválido al crear repositorio', async () => {
    await expect(createRepository({ name: 'no spaces' })).rejects.toThrow('El nombre del repositorio sólo puede contener letras, números y guiones');
  });
});
