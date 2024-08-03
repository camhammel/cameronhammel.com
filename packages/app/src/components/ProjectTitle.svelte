<script lang="ts">
	import type { Project } from '$lib/types/project';
	import { page } from '$app/stores';

	export let project: Project;

	function getYearFromDate(date?: string) {
		return date?.split('-')?.[0] || '2024';
	}

	const isActivePage = $page.url.pathname === `/projects/${project.slug}`;
</script>

<div>
	{#if project}
		<div class="min-h-[10vh] block">
			<a
				class="project-title-component projects-list-item group hover:bg-white flex flex-row w-fit items-center px-8 rounded-md duration-300 transition-colors hover:project-title-a"
				class:bg-white={isActivePage}
				href={isActivePage ? undefined : `/projects/${project.slug}`}
				class:project-title={isActivePage}
			>
				<span class="text-primary font-['Space_Mono'] text-lg w-10 px-2 break-words font-bold">
					{getYearFromDate(project.start_date)}
				</span>
				<span class="text-primary font-['Space_Mono'] text-4xl w-10 px-2 font-bold"> / </span>
				<h3
					class="group-hover:text-primary transition-colors duration-300 line-clamp-1"
					class:text-primary={isActivePage}
					class:is-active-page={isActivePage}
				>
					{project.name}
				</h3>
			</a>
		</div>
	{/if}
</div>

<style>
	.project-title {
		view-transition-name: project-title;
	}

	.project-title-component h3.is-active-page {
		-webkit-text-stroke: 0px;
	}
</style>
