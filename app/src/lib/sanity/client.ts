import { createClient } from '@sanity/client';
import { apiVersion, projectId, dataset, studioUrl } from '$lib/sanity/api';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	stega: {
		studioUrl
	}
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityAsset) {
    return builder.image(source)
}
