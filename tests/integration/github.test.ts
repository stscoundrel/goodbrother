import { getPullRequestsByUser, groupPullRequestsByRepository } from '../../src';

describe('Goodbrother integration test suite', () => {
  test('Gets PRs by user', async () => {
    const result = await getPullRequestsByUser('stscoundrel');

    // Should always have debug PR on goodbrother repository.
    expect(result.some((pullRequest) => pullRequest.repository === 'stscoundrel/goodbrother'))
      .toBeTruthy();
    expect(result.some((pullRequest) => pullRequest.name === 'Fixture PR for integration tests'))
      .toBeTruthy();

    expect(result.length > 0).toBeTruthy();
  });

  test('Groups PRs by user', async () => {
    const response = await getPullRequestsByUser('stscoundrel');
    const result = groupPullRequestsByRepository(response);

    const goodbrotherPRs = result.filter((repository) => repository.name === 'stscoundrel/goodbrother')[0];

    expect(goodbrotherPRs.pullRequests.some((pullRequest) => pullRequest.name === 'Fixture PR for integration tests'))
      .toBeTruthy();

    expect(goodbrotherPRs.pullRequests.length > 0).toBeTruthy();
  });
});
