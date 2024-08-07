<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import type {
		Project,
		ProjectIntersectionElement,
		ProjectIntersectionElements
	} from '$lib/types/project';
	import { fade } from 'svelte/transition';

	export let project: Project;

	export let projectIntersectionElements: {
		[key in keyof ProjectIntersectionElements]: ProjectIntersectionElement;
	} = {
		'project-tech_stack': {
			title: Boolean(project?.tech_stack?.length) && 'Tech Stack',
			intersecting: false
		},
		'project-sections': {
			title: Boolean(project?.sections?.length) && 'Sections',
			intersecting: false
		},
		'project-quotes': {
			title: Boolean(project?.quotes?.length) && 'Quotes',
			intersecting: false
		}
	};

	$: intersectionElements = Object.entries(projectIntersectionElements);
</script>

<aside class="project-sidebar h-fit sm:col-span-1 col-span-4 grid gap-4 sticky top-3">
	<div class="bg-[#fff] h-fit rounded-md p-4 flex flex-col gap-4">
		{#if project.company_image}
			<img
				src={urlFor(project.company_image)?.url()}
				class="rounded-md bg-[#fff] px-1 object-contain"
				alt="Company Logo"
				transition:fade
			/>
		{/if}
		{#if project.job_title}
			<div>
				<h5>Job Title</h5>
				<p class="text-sm">{project.job_title}</p>
			</div>
		{/if}
		{#if project.summary}
			<div>
				<h5>About</h5>
				<p class="text-sm">{project.summary}</p>
			</div>
		{/if}
		{#if project.industry}
			<div>
				<h5>Industry</h5>
				<p class="text-sm">{project.industry}</p>
			</div>
		{/if}
		{#if project.website}
			<div>
				<h5>Website</h5>
				<a href={project.website} class="text-sm link">{project.website}</a>
			</div>
		{/if}
	</div>
	{#if intersectionElements.length}
		<div class="bg-[#fff] h-fit rounded-md p-4">
			<h5>On this page</h5>
			<div class="flex flex-col mt-1">
				{#each intersectionElements as [id, { show, title, intersecting }], index}
					{#if show}
						<div class="flex flex-row gap-4 h-full items-center">
							<div
								class="h-5 w-[2px] bg-slate-200 transition-colors duration-300"
								style="background-color: {intersecting ? 'var(--color-primary)' : ''}"
							/>
							<a
								href={`#${id}`}
								class="text-sm link transition-colors duration-300 text-slate-400"
								style="color: {intersecting ? 'var(--color-primary)' : ''}">{title}</a
							>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</aside>
