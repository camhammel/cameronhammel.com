// src/routes/+page.js
import dayjs from 'dayjs';

import type { AllProjectQueryResult, PortfolioQueryResult, TechStackQueryResult } from 'studio';
import { client } from '$lib/sanity/client';

import groq from 'groq';
export async function load() {
	const allProjectQuery = groq`*[_type == "project"]{
        slug,
        name,
        colourset->,
        start_date,
		end_date,
    }`;
	const portfolioQuery = groq`*[_type == "portfolio"]{
		profile_image,
	}`;

	const techStackQuery = groq`*[_type == "techstackitem"]{
		name,
	}`;

	const query = `{ "projects": ${allProjectQuery}, "portfolio": ${portfolioQuery}, "techStack": ${techStackQuery} }`;

	const { projects, portfolio, techStack } = await client.fetch<{
		projects: AllProjectQueryResult;
		portfolio: PortfolioQueryResult;
		techStack: TechStackQueryResult;
	}>(query);
	projects.sort((a, b) => (dayjs(a.start_date).isBefore(b.start_date) ? 0 : -1));

	if (projects && portfolio) {
		return {
			projects,
			portfolio: portfolio[0],
			techStack
		};
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
