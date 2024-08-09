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
		setTimeout(() => {
			document.querySelector('.project-details')?.classList.remove('overflow-y-hidden');
		}, 500);
	});

	export let data;
	$: ({ project } = data);
	$: colourset = project?.colourset || {
		main: { hex: '#000' },
		light: { hex: '#000' },
		lighter: { hex: '#000' },
		dark: { hex: '#000' }
	};

	let sectionNode: HTMLElement;
	let quotesNode: HTMLElement;
	let techStackNode: HTMLElement;

	let sectionIntersecting = false;
	let quotesIntersecting = false;
	let techStackIntersecting = false;
</script>

<div
	class="project-details relative flex flex-col"
	style="--color-primary: {colourset.main.hex}; --color-primary-light: {colourset.light
		.hex}; --color-primary-lighter: {colourset.lighter.hex}; --color-primary-dark: {colourset.dark
		.hex};"
>
	{#if project}
		<ProjectTitle {project} />
		{#if ready}
			<div
				class="rounded-3xl bg-white p-4 z-10 bottom-12 relative gap-4 flex-1"
				transition:fly={{ duration: 500, delay: 200, y: 100, easing: cubicOut, opacity: 1 }}
			>
				<div class="max-w-screen-2xl mx-auto col-span-3">
					{#if project.hero_banner && ready}
						<div class="flex justify-center flex-row">
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
									<ProjectTechStack {project} />
								{/if}
							</div>
						</IntersectionObserver>
						<div class="m-4 grid grid-cols-4 gap-4">
							<div class="sm:col-span-3 col-span-4 bg-[#fff] rounded-md py-4 px-8">
								{#if project.sections?.length}
									<IntersectionObserver
										element={sectionNode}
										bind:intersecting={sectionIntersecting}
										threshold={0.7}
									>
										<section id="project-sections" bind:this={sectionNode}>
											{#each project.sections as section}
												<ProjectSection {section} />
											{/each}
										</section>
									</IntersectionObserver>
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
												class="carousel carousel-center rounded-box gap-8 justify-center flex-wrap sm:flex-nowrap"
												bind:this={quotesNode}
											>
												{#each project.quotes as quote}
													<ProjectQuote {quote} />
												{/each}
											</div>
										</IntersectionObserver>
									{/if}
								</section>
							</div>
							<ProjectSidebar
								{project}
								projectIntersectionElements={{
									'project-tech_stack': {
										intersecting: techStackIntersecting,
										title: 'Tech Stack',
										show: !!project.tech_stack?.length
									},
									'project-sections': {
										intersecting: sectionIntersecting,
										title: 'Page Sections',
										show: !!project.sections?.length
									},
									'project-quotes': {
										intersecting: quotesIntersecting,
										title: 'Quotes',
										show: !!project.quotes?.length
									}
								}}
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
