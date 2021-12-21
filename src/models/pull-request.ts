export interface PullRequestUser {
  login: string,
}

export interface PullRequest {
  id: string,
  name: string,
  link: string,
  isDependabot: boolean,
}

export interface PullRequestResponse {
  id: string,
  title: string,
  user: PullRequestUser,
  html_url: string,
}
