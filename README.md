# Goodbrother

List open PRs in Github by user.

## Motivation

If you have many repos that receive regular updades with Dependabot, you're simply likely to miss some of them. I occasionally only found PRs when I get notification that they were closed in favor of a even newer version.

Goodbrother is there to let me know if I still have some open.

### Install

`yarn add goodbrother`

##### Usage

Main method is to get open PRs by username.

```javascript
import { getPullRequestsByUser, groupPullRequestsByRepository } from 'goodbrother'

const openPRs = await getPullRequestsByUser('stscoundrel');

/**
 * Array of PRs with structure like:
 * {
 *   id: 1068208284,
 *   name: Bump eslint-config-airbnb-base from 14.2.1 to 15.0.0,
 *   link: https://github.com/stscoundrel/gatsby-source-plugin-zoega/pull/18,
 *   isDependabot: true,
 *   repository: stscoundrel/gatsby-source-plugin-zoega,
 * }
 */
console.log(openPRs);

// You can also group the result by repository.
const byRepository = groupPullRequestsByRepository(openPRs);

/**
 * Array of repo summaries with structure like:
 * {
 *   name: stscoundrel/gatsby-source-plugin-zoega,
 *   pullRequests: [
 *     {
 *       id: 1068208284,
 *       name: Bump eslint-config-airbnb-base from 14.2.1 to 15.0.0,
 *       link: https://github.com/stscoundrel/gatsby-source-plugin-zoega/pull/18,
 *       isDependabot: true,
 *       repository: stscoundrel/gatsby-source-plugin-zoega,
 *      },
 *     ...
 *   ]
 * }
 */

```