import { getPullRequestsByUser } from '../../src';

describe('Goodbrother integration test suite', () => {
  test('Gets PRs by user', async () => {
    // TODO: switch to expect dummy Goodbrother PR when public.
    const result = await getPullRequestsByUser('stscoundrel');

    expect(result.length > 0).toBeTruthy();
  });
});
