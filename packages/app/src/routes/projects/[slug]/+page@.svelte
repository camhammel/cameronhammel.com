<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import ProjectTitle from '../../../components/ProjectTitle.svelte';
	import ProjectSection from '../../../components/ProjectSection.svelte';
	import ProjectQuote from '../../../components/ProjectQuote.svelte';

	import { urlFor } from '$lib/sanity/client';
	import ProjectTechStack from '../../../components/ProjectTechStack.svelte';
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
				class="rounded-3xl bg-white pt-4 z-10 bottom-5 relative flex-col"
				transition:fly={{ duration: 500, delay: 200, y: 100, easing: cubicOut }}
			>
				<div class="max-w-screen-2xl mx-auto" transition:fade={{ duration: 500 }}>
					{#if project.hero_banner && ready}
						<div class="mx-4">
							<img src={urlFor(project.hero_banner)?.url()} class="rounded-2xl" alt="Hero Banner" />
						</div>
					{/if}
					<div class="my-4 mx-8 flex-col flex gap-4">
						{#if project.tech_stack?.length}
							<ProjectTechStack {project} />
						{/if}
						<!-- <p>{project.summary}</p> -->
						<section class="mt-12">
							{#if project.quotes?.length}
								<div
									class="carousel carousel-center rounded-box gap-8 justify-center flex-wrap sm:flex-nowrap"
								>
									{#each project.quotes as quote}
										<ProjectQuote {quote} />
									{/each}
								</div>
							{/if}
						</section>
						<section class="my-12">
							{#if project.sections?.length}
								{#each project.sections as section}
									<ProjectSection {section} />
								{/each}
							{/if}
						</section>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>
