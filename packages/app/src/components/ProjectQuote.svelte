<script lang="ts">
import type { Quote } from '$lib/types/project';
import { PortableText } from '@portabletext/svelte';
import QuoteIcon from '../svg/quote.svelte';
import CustomMark from './blocks/CustomMark.svelte';

export let quote: Quote;
</script>

<div class="carousel-item w-full sm:w-2/5" id="quote-{quote._id}">
	<div
		class="from-primary-light to-primary-lighter mt-6 flex flex-col gap-4 rounded-md bg-gradient-to-b p-8"
	>
		{#if quote}
			<div class="text-primary h-16 w-16 rotate-180">
				<QuoteIcon />
			</div>
			<p class="flex flex-1 py-4 font-medium italic text-neutral-800">
				<PortableText value={quote.quote} components={{ marks: { highlight: CustomMark } }} />
			</p>
			<div class="flex w-full border-t-2 border-neutral-700 pt-4">
				<caption class="text-primary text-left font-semibold">
					{quote.author}
				</caption>
			</div>
		{/if}
	</div>
</div>
