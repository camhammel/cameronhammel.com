<script lang="ts">
	import type { Project } from '$lib/types/project';
	import { page } from '$app/stores';
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let project: Project;
	export let index = -1;

	let ready = false;
	let isFirstPage = true;

	onMount(() => {
		//@ts-expect-error
		isFirstPage = !window?.navigation?.canGoBack;

		ready = true;
	});

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
				<div class="relative pt-8 pb-12 bg-primary">
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
							{#if ready}
								<span
									class="text-white font-['Space_Mono'] text-lg px-2 font-bold"
									in:fly={{ y: 50, easing: cubicOut, delay: 300 }}
								>
									{getDateRange()}
								</span>
							{/if}
						</div>
					</div>
				</div>
			{:else}
				<div class="min-h-[10vh] flex flex-col w-full items-center justify-center">
					{#if ready}
						<a
							class="py-2 project-title-component projects-list-item group flex flex-row w-full items-center px-8 rounded-badge duration-300 transition-all hover:shadow-md hover:-translate-y-2"
							style:background-color={project.colourset?.main?.hex || 'black'}
							in:slide={{
								delay: isFirstPage ? 150 + 100 * index : 0,
								axis: 'x',
								easing: cubicOut,
								duration: isFirstPage ? 300 : 0
							}}
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
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
