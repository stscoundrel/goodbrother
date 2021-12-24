import { PullRequestSearchResponse, PullRequest } from '../models/pull-request';

export const fromPullRequestSearchResponse = (pullRequestResponse: PullRequestSearchResponse)
: PullRequest => ({
  id: pullRequestResponse.id,
  name: pullRequestResponse.title,
  link: pullRequestResponse.html_url,
  isDependabot: pullRequestResponse.user.login.includes('dependabot'),
  repository: pullRequestResponse.repository_url.replace('https://api.github.com/repos/', ''),
});

export default {
  fromPullRequestSearchResponse,
};
