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
</script>

<div>
	{#if project}
		<ProjectTitle {project} />
		{#if project.hero_banner && ready}
			<div class="mx-4">
				<img
					transition:fade={{ delay: 200 }}
					src={urlFor(project.hero_banner).url()}
					class="rounded-lg"
					alt="Hero Banner"
				/>
			</div>
		{/if}
		<div class="my-4 mx-8 flex-col flex gap-4">
			{#if project.tech_stack?.length}
				<ProjectTechStack {project} />
			{/if}
			<p>{project.summary}</p>
			<section class="mt-6">
				{#if project.sections?.length}
					{#each project.sections as section}
						<ProjectSection {section} />
					{/each}
				{/if}
			</section>
			<section class="mt-6">
				{#if project.quotes?.length}
					{#each project.quotes as quote}
						<ProjectQuote {quote} />
					{/each}
				{/if}
			</section>
		</div>
	{/if}
</div>
