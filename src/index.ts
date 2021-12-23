import { Repository } from './models/repository';
import { PullRequest } from './models/pull-request';
import client from './client';

export const getReposByUser = async (username: string): Promise<Repository[]> => (
  client.getRepos(username)
);

export const getPullRequestsByRepository = async (repository: string): Promise<PullRequest[]> => (
  client.getPullRequestsByRepository(repository)
);

export default {
  getReposByUser,
};
