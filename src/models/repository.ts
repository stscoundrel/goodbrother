import { PullRequest } from './pull-request';

export interface RepositorySummary {
  name: string,
  pullRequests: PullRequest[],
}
