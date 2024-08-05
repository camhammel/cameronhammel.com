<script lang="ts">
	import type { Project } from '$lib/types/project';
	import { page } from '$app/stores';

	export let project: Project;

	function getYearFromDate(date?: string) {
		return date?.split('-')?.[0] || '2024';
	}

	function getDateRange() {
		const start = project.start_date;
		const end = project.end_date || 'Present';
		return `${start} - ${end}`;
	}

	const isActivePage = $page.url.pathname === `/projects/${project.slug}`;
</script>

<div>
	{#if project}
		<div
			class="flex flex-col"
			id={`project-title-container-${project.slug}`}
			style={`view-transition-name: title-container-${project.slug}`}
		>
			{#if isActivePage}
				<a href="/" class="px-12 text-white text-7xl font-['Space_Mono'] font-bold pb-4 bg-primary">
					←
				</a>
			{/if}
			<div class="min-h-[10vh] flex flex-col w-full items-center">
				<a
					class="project-title-component projects-list-item group flex flex-row w-full items-center px-8 rounded-md duration-300 transition-colors"
					style:background-color={project.colourset?.main?.hex}
					href={isActivePage ? undefined : `/projects/${project.slug}`}
					class:rounded-md={!isActivePage}
				>
					<span class="text-white font-['Space_Mono'] text-lg w-10 px-2 break-words font-bold">
						{getYearFromDate(project.start_date)}
					</span>
					<span class="text-white font-['Space_Mono'] text-4xl w-10 px-2 font-bold"> / </span>
					<h3
						class="group-hover:text-white transition-colors duration-300 line-clamp-1"
						class:is-active-page={isActivePage}
						style={`view-transition-name: title-${project.slug}`}
					>
						{project.name}
					</h3>
				</a>
			</div>
		</div>
	{/if}
</div>
