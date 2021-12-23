import { getReposByUser, getPullRequestsByRepository, getPullRequestsByUser } from '../../src';

describe('Goodbrother integration test suite', () => {
  test('Gets repos by user', async () => {
    const result = await getReposByUser('stscoundrel');

    expect(result.length > 60).toBeTruthy();
  });

  test('Gets PRs by repo', async () => {
    // TODO: switch to dummy Goodbrother PR when public.
    const result = await getPullRequestsByRepository('stscoundrel/runes');

    expect(result.length > 0).toBeTruthy();
  });

  test('Gets PRs by user', async () => {
    // TODO: switch to expect dummy Goodbrother PR when public.
    const result = await getPullRequestsByUser('stscoundrel');

    expect(result.length > 0).toBeTruthy();
  });
});
