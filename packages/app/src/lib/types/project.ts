import type { ProjectQueryResult } from 'studio';

export type Project = ProjectQueryResult[number];

export type Quote = NonNullable<ProjectQueryResult[number]['quotes']>[number];

export type Section = NonNullable<ProjectQueryResult[number]['sections']>[number];

export type ProjectIntersectionElement = {
	title: string | false;
	intersecting: boolean;
	node?: HTMLElement;
};

export type ProjectIntersectionElements = {
	'project-tech_stack': ProjectIntersectionElement;
	'project-sections': ProjectIntersectionElement;
	'project-quotes': ProjectIntersectionElement;
};
