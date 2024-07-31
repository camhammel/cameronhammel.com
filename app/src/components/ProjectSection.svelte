<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib//sanity/client';
	import { fade } from 'svelte/transition';
	import type { Section } from '$lib/types/project';

	export let section: Section;

	let containerClass =
		section?.image_placement === 'left'
			? 'flex flex-row items-center justify-between gap-4'
			: section?.image_placement === 'right'
				? 'flex flex-row-reverse items-center justify-between gap-4'
				: 'flex flex-col items-center gap-2';
</script>

<div>
	{#if section}
		<section class={containerClass}>
			<div class="flex flex-1 items-center justify-center">
				<img
					class="rounded-md w-2/3"
					transition:fade={{ delay: 200 }}
					src={urlFor(section.image).url()}
					alt="Project Section"
				/>
			</div>
			<div class="items-center justify-center flex flex-1 flex-col">
				<div class="section-content w-2/3">
					<PortableText value={section.content} components={{}} />
				</div>
			</div>
		</section>
	{/if}
</div>
