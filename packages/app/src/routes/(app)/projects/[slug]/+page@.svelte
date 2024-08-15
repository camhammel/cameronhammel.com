<script lang="ts">
import { onMount } from 'svelte';
import { fade, fly } from 'svelte/transition';
import IntersectionObserver from 'svelte-intersection-observer';

import ProjectTitle from '../../../../components/ProjectTitle.svelte';
import ProjectSection from '../../../../components/ProjectSection.svelte';
import ProjectQuote from '../../../../components/ProjectQuote.svelte';

import { urlFor } from '$lib/sanity/client';
import ProjectTechStack from '../../../../components/ProjectTechStack.svelte';
import { cubicOut } from 'svelte/easing';
import ProjectSidebar from '../../../../components/ProjectSidebar.svelte';

let ready = false;

onMount(() => {
	ready = true;
});

export let data;
$: ({ project } = data);
$: colourset = project?.colourset || {
	main: { hex: '#000' },
	light: { hex: '#000' },
	lighter: { hex: '#000' },
	dark: { hex: '#000' }
};

let sectionNodes: HTMLElement[] = [];
let quotesNode: HTMLElement;
let techStackNode: HTMLElement;

let sectionsIntersecting = [false];
let quotesIntersecting = false;
let techStackIntersecting = false;

let projectIntersectionElements: Record<
	string,
	{ intersecting: boolean; title: string; show: boolean }
>;
// @ts-ignore
$: projectIntersectionElements = Object.assign(
	Object.assign(
		{
			'project-tech_stack': {
				intersecting: techStackIntersecting,
				title: 'Tech Stack',
				show: !!project?.tech_stack?.length
			}
		},
		project?.sections?.length &&
			project.sections.reduce((acc, section, index) => {
				// @ts-ignore
				acc[`project-${section.title}`] = {
					intersecting: sectionsIntersecting[index],
					title: section.title,
					show: true
				};
				return acc;
			}, {})
	),
	{
		'project-quotes': {
			intersecting: quotesIntersecting,
			title: 'Quotes',
			show: !!project?.quotes?.length
		}
	}
);
</script>

<div
	class="project-details relative flex flex-col bg-white"
	style="--color-primary: {colourset.main.hex}; --color-primary-light: {colourset.light
		.hex}; --color-primary-lighter: {colourset.lighter.hex}; --color-primary-dark: {colourset.dark
		.hex};"
>
	{#if project}
		<ProjectTitle project={project} />
		{#if ready}
			<div
				class="relative bottom-12 z-10 -mb-12 flex-1 gap-4 rounded-3xl bg-white p-4"
				transition:fly={{ duration: 500, delay: 200, y: 100, easing: cubicOut, opacity: 1 }}
			>
				<div class="col-span-3 mx-auto max-w-screen-2xl">
					{#if project.hero_banner && ready}
						<div class="flex flex-row justify-center">
							<img src={urlFor(project.hero_banner)?.url()} class="rounded-2xl" alt="Hero Banner" />
						</div>
					{/if}
					<div class="my-4">
						<IntersectionObserver
							element={techStackNode}
							bind:intersecting={techStackIntersecting}
							threshold={0.7}
						>
							<div id="project-tech_stack" bind:this={techStackNode}>
								{#if project.tech_stack?.length}
									<ProjectTechStack project={project} />
								{/if}
							</div>
						</IntersectionObserver>
						<div class="m-4 grid grid-cols-4 gap-4">
							<div class="col-span-4 rounded-md bg-[#fff] px-8 py-4 sm:col-span-3">
								{#if project.sections?.length}
									{#each project.sections as section, index}
										<IntersectionObserver
											element={sectionNodes[index]}
											bind:intersecting={sectionsIntersecting[index]}
											threshold={0.7}
										>
											<section id={`project-${section.title}`} bind:this={sectionNodes[index]}>
												<ProjectSection section={section} index={index} />
											</section>
										</IntersectionObserver>
									{/each}
								{/if}
								<section>
									{#if project.quotes?.length}
										<IntersectionObserver
											element={quotesNode}
											bind:intersecting={quotesIntersecting}
											threshold={0.7}
										>
											<div
												id="project-quotes"
												class="carousel carousel-center rounded-box flex-wrap justify-center gap-8 sm:flex-nowrap"
												bind:this={quotesNode}
											>
												{#each project.quotes as quote}
													<ProjectQuote quote={quote} />
												{/each}
											</div>
										</IntersectionObserver>
									{/if}
								</section>
							</div>
							<ProjectSidebar
								project={project}
								projectIntersectionElements={projectIntersectionElements}
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}
		<SvelteSeo
			title={`${project.name} | Cameron Hammel`}
			description="Cameron Hammel's personal website"
			keywords={`Cameron Hammel, Cameron, Hammel, personal, website, portfolio, LinkedIn, GitHub, Resume, ${project.name}`}
			openGraph={{
				title: `${project.name} | Cameron Hammel`
			}}
		/>
	{/if}
</div>
