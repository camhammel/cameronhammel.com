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

<div class="w-full max-w-screen flex flex-col items-center justify-center">
	<AboutMe profileImage={data.portfolio?.profile_image} techStackItems={data.techStack} />
	<div
		id="fp-experience"
		class="snap-center py-32 bg-white px-8 w-full flex flex-col items-center justify-center"
	>
		<div>
			{#if data.projects?.length}
				<h2 class="overflow-x-hidden sm:text-left text-center text-[clamp(1.5rem,4vw,2rem)]">
					Experience
				</h2>
				<ul class="grid grid-flow-row auto-rows-[1fr] justify-evenly gap-4">
					{#each data.projects as project, index}
						<li class="w-full h-full">
							<ProjectTitle {project} {index} />
						</li>
					{/each}
				</ul>
			{:else}
				<p>No projects found.</p>
			{/if}
		</div>
	</div>
</div>

<svelte:head>
	<style>
		html {
			overflow-y: scroll;
			scroll-snap-type: y mandatory;
		}
	</style>
</svelte:head>
