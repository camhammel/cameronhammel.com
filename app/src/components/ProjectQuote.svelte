<script lang="ts">
import type { Quote } from "$lib/types/project";

export let quote: Quote;
</script>
<div class="flex flex-col gap-2 items-center mt-6">
    {#if quote}
        <p class="text-center w-2/3">{quote.quote}</p>
        <caption class="text-center text-neutral-400 font-semibold">- {quote.author}</caption>
    {/if}
</div>
