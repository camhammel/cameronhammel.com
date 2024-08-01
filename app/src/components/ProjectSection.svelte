<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib//sanity/client';
	import { fade } from 'svelte/transition';
	import type { Section } from '$lib/types/project';

	export let section: Section;

	let containerClass =
		section?.image_placement === 'left'
			? 'flex flex-1 flex-col sm:flex-row items-center justify-between lg:gap-24 sm:gap-8 gap-4'
			: section?.image_placement === 'right'
				? 'flex flex-1 flex-col sm:flex-row-reverse items-center justify-between lg:gap-24 sm:gap-8 gap-4'
				: 'flex flex-1 flex-col items-center gap-2';
</script>

<div>
	{#if section}
		<section class={containerClass}>
			<div class="flex flex-1 items-center sm:justify-end justify-center">
				<img
					class="rounded-md max-w-[55%]"
					transition:fade={{ delay: 200 }}
					src={urlFor(section.image).url()}
					alt="Project Section"
				/>
			</div>
			<div class="sm:items-start justify-center flex flex-1 flex-col sm:text-left text-center">
				<div class="max-w-[55%] mx-auto sm:mx-0">
					<PortableText value={section.content} components={{}} />
				</div>
			</div>
		</section>
	{/if}
</div>
