import { createClient } from "@sanity/client";
import type { Project } from "$lib/types/project";

const client = createClient({
    projectId: "9llpwxop",
    dataset: "production",
    apiVersion: "2023-11-27",
    useCdn: false
});

export async function load({ params }: { params: { slug: string } }) {
	// const data = await client.fetch<Project[]>(`*[_type == "project" && name == "Squaredance"]`);
	const data = await client.fetch<Project[]>(`*[_type == "project" && slug == "${params.slug}"]`);

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