// src/routes/+page.js
import dayjs from 'dayjs';
import { GITHUB_API_READ_TOKEN } from '$env/static/private';
import type { AllProjectQueryResult, PortfolioQueryResult, TechStackQueryResult } from 'studio';
import { client } from '$lib/sanity/client';
import type { GithubResponse } from '$lib/types/github';
import groq from 'groq';

const githubQuery = `
	query($userName:String!) { 
		user(login: $userName) {
			contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						firstDay
						contributionDays {
							contributionCount
							date
						}
					}
				}
			}
		}
	}
`;

const variables = {
	userName: 'camhammel'
}

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

	let githubData = {};
	try {
		console.log('fetching github data', GITHUB_API_READ_TOKEN);
		const githubResponse = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${GITHUB_API_READ_TOKEN}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ query: githubQuery, variables })
		});
		console.log(Object.keys(githubResponse));
		githubData = await githubResponse.json() as GithubResponse;
	} catch(error) {
		console.error(error);
	}

	if (projects && portfolio) {
		return {
			projects,
			portfolio: portfolio[0],
			techStack,
			github: githubData
		};
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
