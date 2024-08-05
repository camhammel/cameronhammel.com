<script lang="ts">
	import type { Project } from '$lib/types/project';
	import { page } from '$app/stores';

	export let project: Project;

	function getYearFromDate(date?: string) {
		return date?.split('-')?.[0] || '2024';
	}

	function getDateRange() {
		const start = project.start_date?.split('-')?.[0] || '2024';
		const end = project.end_date?.split('-')?.[0] || 'Present';
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
				<div class="relative py-8 bg-primary">
					<a
						href="/"
						class="absolute left-10 top-6 text-white text-7xl font-['Space_Mono'] font-bold"
					>
						←
					</a>
					<div class="min-h-[10vh] flex flex-col w-full items-center pb-12">
						<div
							class="project-title-component projects-list-item group flex flex-col items-center px-8 w-full duration-300 transition-colors"
						>
							<h3
								class="group-hover:text-white transition-colors duration-300 line-clamp-1"
								style={`view-transition-name: title-${project.slug}`}
							>
								{project.name}
							</h3>
							<span class="text-white font-['Space_Mono'] text-lg px-2 font-bold">
								{getDateRange()}
							</span>
						</div>
					</div>
				</div>
			{:else}
				<div class="min-h-[10vh] flex flex-col w-full items-center">
					<a
						class="project-title-component projects-list-item group flex flex-row w-full items-center px-8 rounded-md duration-300 transition-colors"
						style:background-color={project.colourset?.main?.hex}
						href={`/projects/${project.slug}`}
					>
						<span class="text-white font-['Space_Mono'] text-lg w-10 px-2 break-words font-bold">
							{getYearFromDate(project.start_date)}
						</span>
						<span class="text-white font-['Space_Mono'] text-4xl w-10 px-2 font-bold"> / </span>
						<h3
							class="group-hover:text-white transition-colors duration-300 line-clamp-1"
							style={`view-transition-name: title-${project.slug}`}
						>
							{project.name}
						</h3>
					</a>
				</div>
			{/if}
		</div>
	{/if}
</div>
