import axios from 'axios';
import mockPrSearchResponse from '../fixtures/pr-search-response.json';
import { getPullRequestsByUser, groupPullRequestsByRepository } from '../../src';

jest.mock('axios');

describe('Goodbrother PR tests', () => {
  beforeEach(() => {
    axios.mockRestore();
  });

  test('By user: processes search response to pull request models', async () => {
    // Mock Github api call
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockPrSearchResponse }));
    const results = await getPullRequestsByUser('stscoundrel');

    results.forEach((result) => {
      expect(Object.keys(result)).toEqual(['id', 'name', 'link', 'isDependabot', 'repository']);
    });

    expect(results[0].name).toBe('Bump next-pwa from 5.4.0 to 5.4.4');
    expect(results[0].link).toBe('https://github.com/stscoundrel/runes/pull/108');
    expect(results[0].isDependabot).toBeTruthy();

    expect(results.length).toBe(16);
  });

  test('By user: prrors if GH api fails', async () => {
    axios.get
      .mockImplementationOnce(() => { throw new Error('GH sucks today'); });

    expect(async () => {
      await getPullRequestsByUser('stscoundrel');
    }).rejects.toThrow('Could not list PRs for user stscoundrel. Faced error: GH sucks today');
  });

  test('Groups found PRs by repository', async () => {
    // Mock Github api call
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockPrSearchResponse }));
    const response = await getPullRequestsByUser('stscoundrel');
    const result = groupPullRequestsByRepository(response);

    const expected = [
      {
        name: 'stscoundrel/runes',
        pullRequests: [
          {
            id: 1075530244,
            name: 'Bump next-pwa from 5.4.0 to 5.4.4',
            link: 'https://github.com/stscoundrel/runes/pull/108',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067868936,
            name: 'Bump eslint-plugin-react-hooks from 4.2.0 to 4.3.0',
            link: 'https://github.com/stscoundrel/runes/pull/105',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067868852,
            name: 'Bump eslint-config-next from 12.0.2 to 12.0.4',
            link: 'https://github.com/stscoundrel/runes/pull/104',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067868687,
            name: 'Bump babel-jest from 27.3.1 to 27.4.2',
            link: 'https://github.com/stscoundrel/runes/pull/103',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067868357,
            name: 'Bump eslint-plugin-jest from 25.2.2 to 25.3.0',
            link: 'https://github.com/stscoundrel/runes/pull/102',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067868269,
            name: 'Bump jest from 27.3.1 to 27.4.2',
            link: 'https://github.com/stscoundrel/runes/pull/101',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067868016,
            name: 'Bump @babel/eslint-parser from 7.16.0 to 7.16.3',
            link: 'https://github.com/stscoundrel/runes/pull/100',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067867842,
            name: 'Bump cypress from 8.7.0 to 9.1.0',
            link: 'https://github.com/stscoundrel/runes/pull/99',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067867532,
            name: 'Bump eslint-plugin-import from 2.25.2 to 2.25.3',
            link: 'https://github.com/stscoundrel/runes/pull/97',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067867444,
            name: 'Bump next-sitemap from 1.6.192 to 1.6.203',
            link: 'https://github.com/stscoundrel/runes/pull/96',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067867250,
            name: 'Bump sass from 1.43.4 to 1.44.0',
            link: 'https://github.com/stscoundrel/runes/pull/95',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067866740,
            name: 'Bump eslint-plugin-react from 7.26.1 to 7.27.1',
            link: 'https://github.com/stscoundrel/runes/pull/94',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
          {
            id: 1067866608,
            name: 'Bump eslint-plugin-jsx-a11y from 6.4.1 to 6.5.1',
            link: 'https://github.com/stscoundrel/runes/pull/93',
            isDependabot: true,
            repository: 'stscoundrel/runes',
          },
        ],
      },
      {
        name: 'stscoundrel/gatsby-source-plugin-zoega',
        pullRequests: [
          {
            id: 1068208284,
            name: 'Bump eslint-config-airbnb-base from 14.2.1 to 15.0.0',
            link: 'https://github.com/stscoundrel/gatsby-source-plugin-zoega/pull/18',
            isDependabot: true,
            repository: 'stscoundrel/gatsby-source-plugin-zoega',
          },
        ],
      },
      {
        name: 'stscoundrel/gatsby-source-cleasby-vigfusson',
        pullRequests: [
          {
            id: 1067800663,
            name: 'Bump eslint-config-airbnb-base from 14.2.1 to 15.0.0',
            link: 'https://github.com/stscoundrel/gatsby-source-cleasby-vigfusson/pull/23',
            isDependabot: true,
            repository: 'stscoundrel/gatsby-source-cleasby-vigfusson',
          },
        ],
      },
      {
        name: 'stscoundrel/bower',
        pullRequests: [
          {
            id: 874776617,
            name: 'CI workflow: add Node 16',
            link: 'https://github.com/stscoundrel/bower/pull/1',
            isDependabot: false,
            repository: 'stscoundrel/bower',
          },
        ],
      },
    ];

    expect(result).toEqual(expected);
  });
});
