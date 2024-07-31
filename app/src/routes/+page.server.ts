// src/routes/+page.js
import dayjs from 'dayjs';

import type { Project } from "$lib/types/project";
import { client } from '$lib/sanity/client';

export async function load() {
    const data = await client.fetch<Project[]>(`*[_type == "project"]`);
    data.sort((a, b) => dayjs(a.start_date).isBefore(b.start_date) ? 0 : -1);

    if (data) {
        return {
            projects: data
        };
    }
    return {
        status: 500,
        body: new Error("Internal Server Error")
    };
}
