# A minimal SvelteKit site with Sanity Studio

Built on a starter, using [SvelteKit](https://kit.svelte.dev/) for the frontend and [Sanity](https://sanity.io/) to handle its content.

> **Note**
>
> This starter features an `/app` and a `/studio` folder. The `/app` folder contains the frontend code, and the `/studio` folder contains the Sanity Studio code.
>
> It is configured as a monorepo using [pnpm workspaces](https://pnpm.io/workspaces), but you can treat these directories as separate projects if you prefer.

## Prerequisities

- [Node.js](https://nodejs.org/en/) (v14.18 or later)
- [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) (optional)

## Deployments

The `/app` and `/studio` folders are meant to be deployed separately.

Make sure that after `/app` is deployed the `.env` file in `/studio` is updated with its deployment URL under `SANITY_STUDIO_PREVIEW_URL`.

And `/app` has a `.env` file with `PUBLIC_SANITY_STUDIO_URL` that points to the Studio's deployment URL.
