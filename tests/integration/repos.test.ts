import { getReposByUser } from '../../src';

describe('Goodbrother test suite', () => {
  test('Gets repos by user', async () => {
    const result = await getReposByUser('stscoundrel');

    expect(result.length > 60).toBeTruthy();
  });
});
