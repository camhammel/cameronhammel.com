<script lang="ts">
	import type { Project, Quote } from '$lib/types/project';
	import QuoteIcon from '../svg/quote.svelte';

	export let project: Project;
	export let quote: Quote;
</script>

<div class="carousel-item w-2/5" id="quote-{quote._key}">
	<div
		class="flex flex-col p-8 gap-4 mt-6 rounded-md bg-gradient-to-r from-primary-light to-purple-100"
	>
		{#if quote}
			<div class="w-16 h-16 rotate-180 text-primary">
				<QuoteIcon />
			</div>
			<p class="flex-1 flex py-4 italic font-medium text-neutral-800">{quote.quote}</p>
			<div class="border-t-2 border-neutral-700 pt-4 w-full flex">
				<caption class="text-left font-semibold" style:color={project.colours.primary?.main?.hex}>
					{quote.author}
				</caption>
			</div>
		{/if}
	</div>
</div>
