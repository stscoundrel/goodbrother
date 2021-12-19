import { getReposByUser } from '../src';

describe('Goodbrother test suite', () => {
  test('Gets repos by user', async () => {
    const result = await getReposByUser('stscoundrel');

    console.log(result);

    expect(result.length > 0).toBeTruthy();
  });
});
