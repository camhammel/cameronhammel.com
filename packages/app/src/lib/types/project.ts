import type { ProjectQueryResult } from "studio";

export type Project = ProjectQueryResult[number];

export type Quote = NonNullable<ProjectQueryResult[number]['quotes']>[number];

export type Section = NonNullable<ProjectQueryResult[number]['sections']>[number];
