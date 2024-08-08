<script lang="ts">
	import type { Project } from '$lib/types/project';
	import { page } from '$app/stores';
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Arrow from '../svg/arrow.svelte';

	export let project: Pick<Project, 'name' | 'slug' | 'start_date' | 'end_date' | 'colourset'>;
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

{#if project}
	<div
		class="flex flex-col"
		class:h-full={!isActivePage}
		id={`project-title-container-${project.slug}`}
		style={`view-transition-name: title-container-${project.slug}`}
	>
		{#if isActivePage}
			<div class="relative pt-8 pb-12 bg-primary">
				<a
					href="/"
					class="absolute left-5 sm:left-10 p-2 top-14 w-12 text-white hover:bg-primary-dark z-10 rounded-md transition-colors duration-300"
				>
					<Arrow />
				</a>
				<div class="flex flex-col w-full items-center pb-12">
					<div
						class="project-title-component projects-list-item group flex flex-col items-center px-28 w-full duration-300 transition-colors"
					>
						<h3
							class="group-hover:text-white transition-colors duration-300 text-wrap text-center sm:text-[3rem] sm:leading-[4.5rem] text-3xl"
							style={`view-transition-name: title-${project.slug}`}
						>
							{project.name}
						</h3>
						{#if ready}
							<span
								class="text-white font-['Space_Mono'] text-md sm:text-lg px-2 font-bold text-center mt-2 sm:mt-0"
								in:fly={{ y: 50, easing: cubicOut, delay: 300 }}
							>
								{getDateRange()}
							</span>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-col flex-grow w-full items-center justify-center">
				{#if ready}
					<a
						class="py-1 sm:py-2 project-title-component projects-list-item group flex flex-grow flex-row w-full items-center px-4 sm:px-8 rounded-badge duration-300 transition-all hover:shadow-md hover:-translate-y-2"
						style:background-color={project.colourset?.main?.hex || 'black'}
						in:slide={{
							delay: isFirstPage ? 50 + 100 * index : 0,
							axis: 'x',
							easing: cubicOut,
							duration: isFirstPage ? 250 : 0
						}}
						href={`/projects/${project.slug}`}
					>
						<span
							class="text-white font-['Space_Mono'] text-lg w-10 px-2 break-words font-bold hidden sm:inline"
						>
							{getYearFromDate(project.start_date)}
						</span>
						<span
							class="text-white font-['Space_Mono'] text-4xl w-10 px-2 font-bold hidden sm:inline"
						>
							/
						</span>
						<h3
							class="w-full sm:w-auto group-hover:text-white transition-colors duration-300 sm:line-clamp-1 sm:text-[3rem] sm:leading-[4.5rem] text-2xl leading-7 sm:text-left text-center"
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
