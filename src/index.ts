import { Repository, RepositorySummary } from './models/repository';
import { PullRequest } from './models/pull-request';
import client from './client';

export const groupPullRequestsByRepository = (pullRequests: PullRequest[])
: RepositorySummary[] => {
  const summaries: RepositorySummary[] = [];
  const repositories = new Set();

  pullRequests.forEach((pullRequest) => repositories.add(pullRequest.repository));

  repositories.forEach((repository: string) => {
    const summary = {
      name: repository,
      pullRequests: pullRequests.filter((pullRequest) => pullRequest.repository === repository),
    };

    summaries.push(summary);
  });

  return summaries;
};

export const getReposByUser = async (username: string): Promise<Repository[]> => (
  client.getRepos(username)
);

export const getPullRequestsByRepository = async (repository: string): Promise<PullRequest[]> => (
  client.getPullRequestsByRepository(repository)
);

export const getPullRequestsByUser = async (username: string): Promise<PullRequest[]> => (
  client.getPullRequestsByUser(username)
);

export default {
  getReposByUser,
  getPullRequestsByRepository,
  getPullRequestsByUser,
  groupPullRequestsByRepository,
};
