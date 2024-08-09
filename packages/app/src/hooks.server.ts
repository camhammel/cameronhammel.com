import { sequence } from '@sveltejs/kit/hooks';
import { GITHUB_API_READ_TOKEN } from '$env/static/private';
import { createRequestHandler, setServerClient } from '@sanity/svelte-loader';
import { serverClient } from '$lib/server/sanity/client';
import { setSession } from '$houdini';
import type { Handle } from '@sveltejs/kit';

// Sets the client to be used by `loadQuery` when fetching data on the server.
// The loader will handle setting the correct fetch parameters, including
// perspective. This isn't a hook, but it's a good place to call this function
// as this file is executed once per app initialization.
setServerClient(serverClient);

const houdiniSessionHandle: Handle = async ({ event, resolve }) => {
	// get the user information however you want
	const user = { token: GITHUB_API_READ_TOKEN };

	// set the session information for this event
	setSession(event, { user });

	// pass the event onto the default handle
	return await resolve(event);
};

// This convenience function sets up preview mode endpoints and attaches useful
// helpers to the `event.locals` Svelte object, such as a preconfigured
// `loadQuery` function and `preview` state.
export const handle = sequence(createRequestHandler(), houdiniSessionHandle);
