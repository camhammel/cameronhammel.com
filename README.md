# A minimal SvelteKit site with Sanity Studio

Built on a starter, using [SvelteKit](https://kit.svelte.dev/) for the frontend and [Sanity](https://sanity.io/) to handle its content.

> **Note**
>
> This starter features an `/app` and a `/studio` folder. The `/app` folder contains the frontend code, and the `/studio` folder contains the Sanity Studio code.
>
> It is configured as a monorepo using [pnpm workspaces](https://pnpm.io/workspaces)

## Check it out at:
[cameronhammel.dev](https://cameronhammel.dev)

## Development
Run `pnpm install` to install required dependencies for `packages/app` and `packages/studio`.

You'll also need to connect to a Sanity project, and replace the projectId in the code.

Run `pnpm dev` to start both development servers and the TS codegen from the specified sanity schema.

## Deployment
You can deploy the Sveltekit App to production by pushing commits to main.

To deploy changes to the Sanity schema, run `pnpm dlx sanity deploy`
