import axios from 'axios';
import mockRepoResponse from '../fixtures/repo-response.json';
import { getReposByUser } from '../../src';

jest.mock('axios');

describe('Goodbrother test suite', () => {
  beforeEach(() => {
    axios.get.mockRestore();
  });

  test('Processes repo response to repository models', async () => {
    // Mock Github api call
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockRepoResponse }));
    const results = await getReposByUser('stscoundrel');

    results.forEach((result) => {
      expect(Object.keys(result)).toEqual(['id', 'name', 'path']);
    });

    expect(results[0].name).toBe('abbreviatrix');
    expect(results[0].path).toBe('stscoundrel/abbreviatrix');

    expect(results.length).toBe(26);
  });

  test('Paginates repo response, if more than 100 results', async () => {
    const repoItem = {
      id: 666,
      name: 'goodbrother',
      full_name: 'stscoundrel/goodbrother',
    };
    const longResponse = [];

    // Make long response to trigger pagination.
    for (let i = 0; i < 100; i += 1) {
      longResponse.push(repoItem);
    }

    /**
     * Mock GH api calls.
     * - First long response
     * - Second another long response
     * - Then shorter, normal response
     */
    axios.get
      .mockImplementationOnce(() => Promise.resolve({ data: longResponse }))
      .mockImplementationOnce(() => Promise.resolve({ data: longResponse }))
      .mockImplementationOnce(() => Promise.resolve({ data: mockRepoResponse }));

    const results = await getReposByUser('stscoundrel');

    // 100 + 100 + 26 repos.
    expect(results.length).toBe(226);

    // Should've called API with incrementing pagination param.
    expect(axios.get.mock.calls[0][0]).toBe('https://api.github.com/users/stscoundrel/repos?page=1&per_page=100');
    expect(axios.get.mock.calls[1][0]).toBe('https://api.github.com/users/stscoundrel/repos?page=2&per_page=100');
    expect(axios.get.mock.calls[2][0]).toBe('https://api.github.com/users/stscoundrel/repos?page=3&per_page=100');
  });

  test('Errors if GH api fails', async () => {
    axios.get
      .mockImplementationOnce(() => { throw new Error('GH sucks today'); });

    expect(async () => {
      await getReposByUser('stscoundrel');
    }).rejects.toThrow('Could not list repos for user stscoundrel. Faced error: GH sucks today');
  });
});
