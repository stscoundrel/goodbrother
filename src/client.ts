import axios from 'axios';
import { Repository, RepositoryResponse } from './models/repository';

const API_URL = 'https://api.github.com/users';

const toRepository = (repositoryResponse): Repository => ({
  id: repositoryResponse.id,
  name: repositoryResponse.name,
  path: repositoryResponse.full_name,
});

const getRepos = async (username: string): Promise<Repository[]> => {
  const response = await axios.get(`${API_URL}/${username}/repos?page=1&per_page=100`);
  const result = response.data as RepositoryResponse[];

  return result.map((repository) => toRepository(repository as RepositoryResponse));
};

export default {
  getRepos,
};
