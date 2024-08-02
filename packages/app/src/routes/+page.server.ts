// src/routes/+page.js
import dayjs from 'dayjs';

import type { AllProjectQueryResult, AllSanitySchemaTypes } from 'studio';
import { client } from '$lib/sanity/client';
import groq from 'groq';
export async function load() {
	const allProjectQuery = groq`*[_type == "project"]{
        slug,
        name,
        colourset->,
        hero_banner,
        summary,
        start_date,
        tech_stack->,
        sections->,
        quotes->
    }`;

	const data = await client.fetch<AllProjectQueryResult>(allProjectQuery);
	data.sort((a, b) => (dayjs(a.start_date).isBefore(b.start_date) ? 0 : -1));

	if (data) {
		return {
			projects: data
		};
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
