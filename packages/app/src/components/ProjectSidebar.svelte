<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import type {
		Project,
		ProjectIntersectionElement,
		ProjectIntersectionElements
	} from '$lib/types/project';

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

<aside class="project-sidebar h-fit grid-rows-2 grid gap-4 sticky top-3">
	<div class="bg-[#fff] h-fit rounded-md p-4 flex flex-col gap-4">
		{#if project.company_image}
			<img
				src={urlFor(project.company_image)?.url()}
				class="rounded-2xl bg-primary-lighter"
				alt="Company Logo"
			/>
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
				{#each intersectionElements as [id, { show, title, intersecting }]}
					{#if show}
						<div
							class="border-l-2 border-solid border-slate-300 pl-4 transition-colors duration-500"
							class:border-primary={intersecting}
						>
							<a
								href={`#${id}`}
								class="text-sm link transition-colors duration-500"
								class:text-primary={intersecting}>{title}</a
							>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</aside>
