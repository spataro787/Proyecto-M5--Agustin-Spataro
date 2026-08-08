import { describe, it, expect } from 'vitest';
import { createRepoSchema, createIssueSchema, listReposSchema, createCommitSchema, listIssuesSchema } from '../src/schemas/index.js';

describe('Schemas de GitHub', () => {
  it('acepta un repo válido', () => {
    const data = { name: 'mi-repo-1', description: 'Descripción', private: false };
    expect(() => createRepoSchema.parse(data)).not.toThrow();
  });

  it('rechaza nombres de repositorio inválidos', () => {
    expect(() => createRepoSchema.parse({ name: 'No spaces!', description: 'x' })).toThrow();
  });

  it('rechaza issues sin título', () => {
    expect(() => createIssueSchema.parse({ owner: 'octocat', repo: 'repo', body: 'cuerpo' })).toThrow();
  });

  it('acepta lista de repositorios con visibilidad pública', () => {
    expect(() => listReposSchema.parse({ visibility: 'public' })).not.toThrow();
  });

  it('rechaza commit sin contenido', () => {
    expect(() => createCommitSchema.parse({ owner: 'octocat', repo: 'repo', branch: 'main', path: 'README.md', message: 'msg', content: '' })).toThrow();
  });

  it('acepta listar issues abiertos', () => {
    expect(() => listIssuesSchema.parse({ owner: 'octocat', repo: 'repo', state: 'open' })).not.toThrow();
  });
});
