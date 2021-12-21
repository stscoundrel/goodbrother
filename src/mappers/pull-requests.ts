import { PullRequestResponse, PullRequest } from '../models/pull-request';

export const fromPullRequestResponse = (pullRequestResponse: PullRequestResponse): PullRequest => ({
  id: pullRequestResponse.id,
  name: pullRequestResponse.title,
  link: pullRequestResponse.html_url,
  isDependabot: pullRequestResponse.user.login.includes('dependabot'),
});

export default fromPullRequestResponse;
