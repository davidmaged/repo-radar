# Repo Radar

A GitHub repository discovery dashboard. Search repositories, browse recently
created projects, save favorites, and view star and commit activity charts.

## Run locally

Requires Node.js and npm.

```sh
npm i
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```sh
npm run build
```

### GitHub API token

The app calls the GitHub REST API and works without authentication, but
unauthenticated requests are limited to 60 per hour. To raise that limit,
create a [personal access token](https://github.com/settings/tokens) (no
scopes are required for public data) and add it to `apps/web/.env.local`:

```sh
GITHUB_TOKEN=your_token_here
```

`.env.local` is gitignored, so your token stays out of version control.
Restart `npm run dev` after adding or changing the token.

## Features

- Search GitHub repositories and browse recently created repositories.
- Load results as you scroll.
- Save favorites between visits in browser local storage.
- View favorite repositories and charts on the dashboard.

## Project structure

- `apps/web` — React application and GitHub API integration.
- `packages/ui` — shared interface components and theme.
- `packages/plots` — shared chart components.

The repository uses npm workspaces. Root-level `dev` and `build` scripts run
the corresponding scripts for `@repo-radar/web`.
