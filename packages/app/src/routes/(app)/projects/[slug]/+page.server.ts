import { client } from '$lib/sanity/client';
import groq from 'groq';
import type { ProjectQueryResult } from 'studio';

export async function load({ params }: { params: { slug: string } }) {
	const projectQuery = groq`*[_type == "project" && slug == $slug]{
        slug,
        name,
        colourset->,
        hero_banner,
        summary,
		industry,
		website,
		company_image,
        start_date,
		end_date,
		job_title,
        tech_stack[]->,
        sections[]->,
        quotes[]->,
    }`;
	const data = await client.fetch<ProjectQueryResult>(projectQuery, params);

	if (data) {
		return {
			project: data?.[0],
			slug: params.slug
		};
	}
	return {
		slug: params.slug
	};
}
