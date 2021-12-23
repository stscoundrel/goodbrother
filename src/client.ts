import axios from 'axios';
import { PullRequest, PullRequestResponse, PullRequestSearchResponses } from './models/pull-request';
import { Repository, RepositoryResponse } from './models/repository';
import { fromRepositoryResponse } from './mappers/repository';
import { fromPullRequestResponse, fromPullRequestSearchResponse } from './mappers/pull-requests';

const API_URL = 'https://api.github.com';

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
      .map((repository) => fromRepositoryResponse(repository));
  } catch (e) {
    throw new Error(`Could not list repos for user ${username}. Faced error: ${e.message}`);
  }
};

const getPullRequestsByRepository = async (repository: string) : Promise<PullRequest[]> => {
  try {
    const response = await axios.get(`${API_URL}/repos/${repository}/pulls`);
    const responsePRs = response.data as PullRequestResponse[];

    return responsePRs
      .map((pullRequest) => fromPullRequestResponse(pullRequest));
  } catch (e) {
    throw new Error(`Could not list PRs for repo ${repository}. Faced error: ${e.message}`);
  }
};

const getPullRequestsByUser = async (username: string) : Promise<PullRequest[]> => {
  try {
    const response = await axios.get(`${API_URL}/search/issues?q=user:${username}+is:pr+state:open`);
    const responsePRs = response.data as PullRequestSearchResponses;

    return responsePRs.items
      .map((pullRequest) => fromPullRequestSearchResponse(pullRequest));
  } catch (e) {
    throw new Error(`Could not list PRs for user ${username}. Faced error: ${e.message}`);
  }
};

export default {
  getRepos,
  getPullRequestsByRepository,
  getPullRequestsByUser,
};
