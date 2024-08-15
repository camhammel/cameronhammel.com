<script lang="ts">
import type { Project } from '$lib/types/project';

export let project: Project;
</script>

<div>
	{#if project && project.tech_stack?.length}
		<ul class="flex flex-1 flex-row flex-wrap justify-center gap-2">
			{#each project.tech_stack as item}
				<li
					class="bg-primary-light text-primary-dark inline-flex h-min cursor-default whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
				>
					<h6>{item.name}</h6>
				</li>
			{/each}
		</ul>
	{/if}
</div>
