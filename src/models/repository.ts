export interface Repository {
  id: string,
  name: string,
  path: string,
}

export interface RepositoryResponse {
  id: string,
  name: string,
  full_name: string,
  fork: boolean,
}
