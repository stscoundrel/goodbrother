import { getReposByUser, getPullRequests } from '../../src';

describe('Goodbrother test suite', () => {
  test('Gets repos by user', async () => {
    const result = await getReposByUser('stscoundrel');

    expect(result.length > 60).toBeTruthy();
  });

  test('Gets PRs by Repo', async () => {
    // TODO: switch to dummy Goodbrother PR when public.
    const result = await getPullRequests('stscoundrel/runes');

    expect(result.length > 0).toBeTruthy();
  });
});
