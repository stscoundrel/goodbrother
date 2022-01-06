import { PullRequest } from './pull-request';

export interface RepositorySummary {
  name: string,
  link: string,
  count: number,
  pullRequests: PullRequest[],
}
