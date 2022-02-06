import axios from 'axios';
import { PullRequest, PullRequestSearchResponses } from './models/pull-request';
import { fromPullRequestSearchResponse } from './mappers/pull-requests';

const API_URL = 'https://api.github.com';
const MAX_REQUESTS = 5;

const getPullRequestsByUser = async (username: string) : Promise<PullRequest[]> => {
  let hasMoreResults = true;
  let page = 1;
  const items: PullRequest[] = [];

  while (hasMoreResults && page <= MAX_REQUESTS) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(`${API_URL}/search/issues?q=user:${username}+is:pr+state:open&per_page=100&page=${page}`);
      const responsePRs = response.data as PullRequestSearchResponses;

      items.push(
        ...responsePRs.items.map((pullRequest) => fromPullRequestSearchResponse(pullRequest)),
      );

      if (items.length >= responsePRs.total_count || responsePRs.items.length === 0) {
        hasMoreResults = false;
      }

      page += 1;
    } catch (e) {
      throw new Error(`Could not list PRs for user ${username}. Faced error: ${e.message}`);
    }
  }

  return items;
};

export default {
  getPullRequestsByUser,
};
