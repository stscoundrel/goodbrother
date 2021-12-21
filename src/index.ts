import { Repository } from './models/repository';
import { PullRequest } from './models/pull-request';
import client from './client';

export const getReposByUser = async (username: string): Promise<Repository[]> => (
  client.getRepos(username)
);

export const getPullRequests = async (repository: string): Promise<PullRequest[]> => (
  client.getPullRequests(repository)
);

export default {
  getReposByUser,
};
