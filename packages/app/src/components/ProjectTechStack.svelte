<script lang="ts">
	import type { Project } from '$lib/types/project';

	export let project: Project;
</script>

<div>
	{#if project && project.tech_stack?.length}
		<ul class="flex flex-1 gap-2 flex-row flex-wrap justify-center">
			{#each project.tech_stack as item}
				<li
					class="bg-primary-light text-primary-dark inline-flex px-2 py-1 uppercase font-semibold tracking-wider text-xs transition-colors cursor-default duration-200 rounded-md h-min whitespace-nowrap"
				>
					<h6>{item.name}</h6>
				</li>
			{/each}
		</ul>
	{/if}
</div>
