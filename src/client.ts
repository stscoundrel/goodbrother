import axios from 'axios';
import { PullRequest, PullRequestResponse } from './models/pull-request';
import { Repository, RepositoryResponse } from './models/repository';

const API_URL = 'https://api.github.com';

const toRepository = (repositoryResponse): Repository => ({
  id: repositoryResponse.id,
  name: repositoryResponse.name,
  path: repositoryResponse.full_name,
});

const toPullRequest = (pullRequestResponse): PullRequest => ({
  id: pullRequestResponse.id,
  name: pullRequestResponse.title,
  link: pullRequestResponse.html_url,
  isDependabot: pullRequestResponse.user.login.includes('dependabot'),
});

const getRepos = async (username: string): Promise<Repository[]> => {
  const repos: RepositoryResponse[] = [];
  let hasMoreRepos = true;
  let page = 1;

  try {
    while (hasMoreRepos) {
    // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(`${API_URL}/users/${username}/repos?page=${page}&per_page=100`);
      const responseRepos = response.data as RepositoryResponse[];
      repos.push(...responseRepos);

      if (responseRepos.length === 100) {
        page += 1;
      } else {
        hasMoreRepos = false;
      }
    }

    return repos
      .filter((repo) => !repo.fork)
      .map((repository) => toRepository(repository as RepositoryResponse));
  } catch (e) {
    throw new Error(`Could not list repos for user ${username}. Faced error: ${e.message}`);
  }
};

const getPullRequests = async (repository: string) : Promise<PullRequest[]> => {
  try {
    const response = await axios.get(`${API_URL}/repos/${repository}/pulls`);
    const responsePRs = response.data as PullRequestResponse[];

    return responsePRs
      .map((pullRequest) => toPullRequest(pullRequest));
  } catch (e) {
    throw new Error(`Could not list PRs for repo ${repository}. Faced error: ${e.message}`);
  }
};

export default {
  getRepos,
  getPullRequests,
};
