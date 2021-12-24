import axios from 'axios';
import { PullRequest, PullRequestSearchResponses } from './models/pull-request';
import { fromPullRequestSearchResponse } from './mappers/pull-requests';

const API_URL = 'https://api.github.com';

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
  getPullRequestsByUser,
};
