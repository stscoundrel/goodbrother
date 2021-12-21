import axios from 'axios';
import mockPResponse from '../fixtures/pr-response.json';
import { getPullRequests } from '../../src';

jest.mock('axios');

describe('Goodbrother PR tests', () => {
  beforeEach(() => {
    axios.mockRestore();
  });

  test('Processes repo response to pull request models', async () => {
    // Mock Github api call
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockPResponse }));
    const results = await getPullRequests('stscoundrel/goodbrother');

    results.forEach((result) => {
      expect(Object.keys(result)).toEqual(['id', 'name', 'link', 'isDependabot']);
    });

    expect(results[0].name).toBe('Bump next-pwa from 5.4.0 to 5.4.4');
    expect(results[0].link).toBe('https://github.com/stscoundrel/runes/pull/108');
    expect(results[0].isDependabot).toBeTruthy();

    expect(results.length).toBe(13);
  });

  test('Errors if GH api fails', async () => {
    axios.get
      .mockImplementationOnce(() => { throw new Error('GH sucks today'); });

    expect(async () => {
      await getPullRequests('stscoundrel/runes');
    }).rejects.toThrow('Could not list PRs for repo stscoundrel/runes. Faced error: GH sucks today');
  });
});
