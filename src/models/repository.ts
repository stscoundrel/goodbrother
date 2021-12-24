import { PullRequest } from './pull-request';

export interface Repository {
  id: string,
  name: string,
  path: string,
}

export interface RepositorySummary {
  name: string,
  pullRequests: PullRequest[],
}

export interface RepositoryResponse {
  id: string,
  name: string,
  full_name: string,
  fork: boolean,
}
