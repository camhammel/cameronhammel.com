<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import ProjectTitle from '../../components/ProjectTitle.svelte';

	export let data;

	function setupTransitions(slug: string) {
		const containerElement = document.getElementById(`project-title-container-${slug}`);
		const titleElement = containerElement?.querySelector('h3');

		if (containerElement) containerElement.style.viewTransitionName = `title-container-${slug}`;
		if (titleElement) titleElement.style.viewTransitionName = `title-${slug}`;
	}

	beforeNavigate((navigation) => {
		if (navigation.to?.route.id === '/projects/[slug]' && navigation.to?.params?.slug) {
			setupTransitions(navigation.to.params.slug);
		}
	});

	afterNavigate((navigation) => {
		if (navigation.from?.route.id === '/projects/[slug]' && navigation.from?.params?.slug) {
			setupTransitions(navigation.from.params.slug);
		}
	});
</script>

<div class="min-h-full bg-gradient-to-b from-white to-slate-200 px-8">
	{#if data.projects?.length}
		<h2 class="h-[10vh]">Experience</h2>
		<ul class="block">
			{#each data.projects as project}
				<li>
					<ProjectTitle {project} />
				</li>
			{/each}
		</ul>
	{:else}
		<p>No projects found.</p>
	{/if}
</div>
