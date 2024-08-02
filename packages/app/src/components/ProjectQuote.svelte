<script lang="ts">
	import type { Quote } from '$lib/types/project';
	import { PortableText } from '@portabletext/svelte';
	import QuoteIcon from '../svg/quote.svelte';
	import CustomMark from './blocks/CustomMark.svelte';

	export let quote: Quote;
</script>

<div class="carousel-item sm:w-2/5 w-full" id="quote-{quote._id}">
	<div
		class="flex flex-col p-8 gap-4 mt-6 rounded-md bg-gradient-to-b from-primary-light to-primary-lighter"
	>
		{#if quote}
			<div class="w-16 h-16 rotate-180 text-primary">
				<QuoteIcon />
			</div>
			<p class="flex-1 flex py-4 italic font-medium text-neutral-800">
				<PortableText value={quote.quote} components={{ marks: { highlight: CustomMark } }} />
			</p>
			<div class="border-t-2 border-neutral-700 pt-4 w-full flex">
				<caption class="text-left font-semibold text-primary">
					{quote.author}
				</caption>
			</div>
		{/if}
	</div>
</div>
