<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import ProjectTitle from '../../../components/ProjectTitle.svelte';
	import ProjectSection from '../../../components/ProjectSection.svelte';
	import ProjectQuote from '../../../components/ProjectQuote.svelte';

	import { urlFor } from '$lib/sanity/client';
	import ProjectTechStack from '../../../components/ProjectTechStack.svelte';

	let ready = false;
	onMount(() => (ready = true));

	export let data;
	$: ({ project } = data);
	$: colours = project?.colours?.primary || {
		main: { hex: '#000' },
		light: { hex: '#000' },
		lighter: { hex: '#000' },
		dark: { hex: '#000' }
	};
</script>

<div
	style="--color-primary: {colours.main.hex}; --color-primary-light: {colours.light
		.hex}; --color-primary-lighter: {colours.lighter.hex};"
>
	{#if project}
		<ProjectTitle {project} />
		<div class="max-w-screen-2xl mx-auto">
			{#if project.hero_banner && ready}
				<div class="mx-4">
					<img
						transition:fade={{ delay: 200 }}
						src={urlFor(project.hero_banner)?.url()}
						class="rounded-lg"
						alt="Hero Banner"
					/>
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
								<ProjectQuote {quote} {project} />
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
	{/if}
</div>
