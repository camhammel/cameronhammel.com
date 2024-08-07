<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import ProjectTitle from '../../../../components/ProjectTitle.svelte';
	import ProjectSection from '../../../../components/ProjectSection.svelte';
	import ProjectQuote from '../../../../components/ProjectQuote.svelte';

	import { urlFor } from '$lib/sanity/client';
	import ProjectTechStack from '../../../../components/ProjectTechStack.svelte';
	import { cubicOut } from 'svelte/easing';

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
</script>

<div
	class="project-details relative overflow-y-hidden"
	style="--color-primary: {colourset.main.hex}; --color-primary-light: {colourset.light
		.hex}; --color-primary-lighter: {colourset.lighter.hex}; --color-primary-dark: {colourset.dark
		.hex};"
>
	{#if project}
		<ProjectTitle {project} />
		{#if ready}
			<div
				class="rounded-3xl bg-white pt-4 px-4 z-10 bottom-12 relative gap-4"
				transition:fly={{ duration: 500, delay: 200, y: 100, easing: cubicOut, opacity: 1 }}
			>
				<div class="max-w-screen-2xl mx-auto col-span-3">
					{#if project.hero_banner && ready}
						<div class="flex justify-center flex-row">
							<img src={urlFor(project.hero_banner)?.url()} class="rounded-2xl" alt="Hero Banner" />
						</div>
					{/if}
					<div class="my-4">
						{#if project.tech_stack?.length}
							<ProjectTechStack {project} />
						{/if}
						<div class="m-4 grid grid-cols-4 gap-4">
							<div class="col-span-3 bg-[#fff] rounded-md p-4">
								{#if project.sections?.length}
									<section id="project-sections">
										{#each project.sections as section}
											<ProjectSection {section} />
										{/each}
									</section>
								{/if}
								<section>
									{#if project.quotes?.length}
										<div
											id="project-quotes"
											class="carousel carousel-center rounded-box gap-8 justify-center flex-wrap sm:flex-nowrap"
										>
											{#each project.quotes as quote}
												<ProjectQuote {quote} />
											{/each}
										</div>
									{/if}
								</section>
							</div>
							<div class="project-sidebar h-fit grid-rows-2 grid gap-4 sticky top-4">
								<div class="bg-[#fff] rounded-md p-4">
									<h5>{project.name}</h5>
								</div>
								<div class="bg-[#fff] rounded-md p-4">On this page</div>
							</div>
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
