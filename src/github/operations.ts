import type {
  CreateCommitInput,
  CreateIssueInput,
  CreateRepoInput,
  ListIssuesInput,
  ListReposInput
} from '../schemas/index.js';
import { createOctokit } from './client.js';
import type { CreateRepoResult, CreateIssueResult, CreateCommitResult } from '../types.js';

const getClient = () => createOctokit(process.env.GITHUB_TOKEN ?? '');

export const createRepositoryOperation = async (input: CreateRepoInput): Promise<CreateRepoResult> => {
  const { octokit, requestWithRetry } = getClient();
  const response = await requestWithRetry(() =>
    octokit.repos.createForAuthenticatedUser({
      name: input.name,
      description: input.description,
      private: input.private ?? false
    })
  );

  return { repository: response.data.html_url, fullName: response.data.full_name };
};

export const createIssueOperation = async (input: CreateIssueInput): Promise<CreateIssueResult> => {
  const { octokit, requestWithRetry } = getClient();
  const response = await requestWithRetry(() =>
    octokit.issues.create({
      owner: input.owner,
      repo: input.repo,
      title: input.title,
      body: input.body
    })
  );

  return { issueUrl: response.data.html_url, issueNumber: response.data.number };
};

export const listRepositoriesOperation = async (input: ListReposInput) => {
  const { octokit, requestWithRetry } = getClient();
  const response = await requestWithRetry(() =>
    octokit.repos.listForAuthenticatedUser({
      visibility: input.visibility ?? 'all',
      affiliation: input.affiliation ?? 'owner'
    })
  );

  return response.data.map((repo: any) => ({
    name: repo.name,
    full_name: repo.full_name,
    private: repo.private,
    url: repo.html_url
  }));
};

export const createCommitOperation = async (input: CreateCommitInput): Promise<CreateCommitResult> => {
  const { octokit, requestWithRetry } = getClient();
  const encodedContent = Buffer.from(input.content, 'utf-8').toString('base64');
  const response = await requestWithRetry(() =>
    octokit.repos.createOrUpdateFileContents({
      owner: input.owner,
      repo: input.repo,
      path: input.path,
      message: input.message,
      content: encodedContent,
      branch: input.branch
    })
  );

  return {
    commitUrl: response.data.content?.html_url,
    sha: response.data.content?.sha
  };
};

export const listIssuesOperation = async (input: ListIssuesInput) => {
  const { octokit, requestWithRetry } = getClient();
  const response = await requestWithRetry(() =>
    octokit.issues.listForRepo({ owner: input.owner, repo: input.repo, state: input.state ?? 'open' })
  );

  return response.data.map((issue: any) => ({
    number: issue.number,
    title: issue.title,
    state: issue.state,
    url: issue.html_url
  }));
};
