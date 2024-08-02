<script lang="ts">
	import ProjectTitle from '../components/ProjectTitle.svelte';

	export const prerender = true;
	export let data;
</script>

<div class="min-h-full bg-gradient-to-b from-white to-blue-400 px-8">
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
