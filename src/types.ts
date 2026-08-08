export interface RepositorySummary {
  name: string;
  full_name: string;
  private: boolean;
  url: string;
}

export interface IssueSummary {
  number: number;
  title: string;
  state: string;
  url: string;
}

export interface CreateRepoResult {
  repository: string;
  fullName: string;
}

export interface CreateIssueResult {
  issueUrl: string;
  issueNumber: number;
}

export interface CreateCommitResult {
  commitUrl: string | undefined;
  sha: string;
}
