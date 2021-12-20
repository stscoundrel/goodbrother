import axios from 'axios';
import mockRepoResponse from '../fixtures/repo-response.json';
import { getReposByUser } from '../../src';

jest.mock('axios');

describe('Goodbrother test suite', () => {
  test('Processes repo response to repository models', async () => {
    // Mock Github api call
    axios.get.mockImplementation(() => Promise.resolve({ data: mockRepoResponse }));
    const results = await getReposByUser('stscoundrel');

    results.forEach((result) => {
      expect(Object.keys(result)).toEqual(['id', 'name', 'path']);
    });

    expect(results[0].name).toBe('abbreviatrix');
    expect(results[0].path).toBe('stscoundrel/abbreviatrix');

    expect(results.length).toBe(26);
  });
});
