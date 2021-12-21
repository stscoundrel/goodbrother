import { RepositoryResponse, Repository } from '../models/repository';

export const fromRepositoryResponse = (repositoryResponse: RepositoryResponse): Repository => ({
  id: repositoryResponse.id,
  name: repositoryResponse.name,
  path: repositoryResponse.full_name,
});

export default fromRepositoryResponse;
