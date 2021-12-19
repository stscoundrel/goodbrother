import { Repository } from './models/repository';
import client from './client';

export const getReposByUser = async (username: string): Promise<Repository[]> => (
  client.getRepos(username)
);

export default {
  getReposByUser,
};
