import type { ContributionsCollection } from '@octokit/graphql-schema';

export type GithubResponse = {
    data?: {
        user: { contributionsCollection: ContributionsCollection };
    }
}
