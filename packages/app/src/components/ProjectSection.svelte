<script lang="ts">
	import { DefaultListItem, PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib//sanity/client';
	import { fade } from 'svelte/transition';
	import type { Section } from '$lib/types/project';
	import { onMount } from 'svelte';
	import { getRoundedImageWidth } from '$lib/utils';

	export let section: Section;

	let containerClass =
		'my-4 flex flex-1 flex-col items-center ' +
		(section?.image_placement === 'left'
			? 'sm:flex-row justify-between lg:gap-24 sm:gap-8 gap-4'
			: section?.image_placement === 'right'
				? 'sm:flex-row-reverse justify-between lg:gap-24 sm:gap-8 gap-4'
				: 'gap-2');

	let textContainerClass =
		section?.image_placement === 'left'
			? 'sm:items-start justify-center flex flex-1 flex-col sm:text-left text-center'
			: section?.image_placement === 'right'
				? 'sm:items-end justify-center flex flex-1 flex-col sm:text-right text-center'
				: 'sm:items-center justify-center flex flex-1 flex-col text-center';

	let imageSrc: string | undefined = undefined;
	onMount(() => {
		let width = document.querySelector('html')?.clientWidth;
		if (section?.image && width)
			imageSrc = urlFor(section.image)?.width(getRoundedImageWidth(width))?.url();
	});
</script>

<div>
	{#if section}
		<section class={containerClass}>
			{#if section.image}
				<div
					class="flex flex-1 items-center justify-center"
					class:sm:justify-end={section?.image_placement === 'left'}
					class:sm:justify-start={section?.image_placement === 'right'}
				>
					<img
						class="rounded-md max-w-[70%]"
						transition:fade={{ delay: 200 }}
						src={imageSrc}
						alt="Project Section"
					/>
				</div>
			{/if}
			<div class={textContainerClass}>
				<div class="max-w-full mx-auto sm:mx-0">
					<PortableText
						value={section.content}
						components={{ listItem: { normal: DefaultListItem, bullet: DefaultListItem } }}
					/>
				</div>
			</div>
		</section>
	{/if}
</div>
