/**
 * Implementa las tools del MCP server para GitHub.
 * Cada función valida su input, usa Octokit y devuelve un resultado claro para el cliente.
 */
export { createRepository } from './create-repository.js';
export { createIssue } from './create-issue.js';
export { listRepositories } from './list-repositories.js';
export { createCommit } from './create-commit.js';
export { listIssues } from './list-issues.js';

import { createRepository } from './create-repository.js';
import { createIssue } from './create-issue.js';
import { listRepositories } from './list-repositories.js';
import { createCommit } from './create-commit.js';
import { listIssues } from './list-issues.js';

export const toolMap = {
  create_repository: createRepository,
  create_issue: createIssue,
  list_repositories: listRepositories,
  create_commit: createCommit,
  list_issues: listIssues
};
