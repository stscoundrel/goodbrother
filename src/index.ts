import { RepositorySummary } from './models/repository';
import { PullRequest } from './models/pull-request';
import client from './client';

export const groupPullRequestsByRepository = (pullRequests: PullRequest[])
: RepositorySummary[] => {
  const summaries: RepositorySummary[] = [];
  const repositories = new Set();

  pullRequests.forEach((pullRequest) => repositories.add(pullRequest.repository));

  repositories.forEach((repository: string) => {
    const pulls = pullRequests.filter((pullRequest) => pullRequest.repository === repository);
    const summary = {
      name: repository,
      link: `https://github.com/${repository}`,
      count: pulls.length,
      pullRequests: pulls,
    };

    summaries.push(summary);
  });

  return summaries;
};

export const getPullRequestsByUser = async (username: string): Promise<PullRequest[]> => (
  client.getPullRequestsByUser(username)
);

export default {
  getPullRequestsByUser,
  groupPullRequestsByRepository,
};
