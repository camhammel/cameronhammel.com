<script lang="ts">
import { onMount } from 'svelte';
import type { ContributionCalendar } from '@octokit/graphql-schema';
import { fade } from 'svelte/transition';
export let githubData: ContributionCalendar;

function getContributionLevel(val: number): number {
	if (val < 6) return Math.ceil(val / 2);
	return 4;
}

let innerWidth: number = 0;
$: weeks = githubData.weeks;

const sizeToWeeks = {
	'100': -6,
	'640': -12,
	'1080': -24,
	'10000': undefined
} as const;

let hasMounted = false;
onMount(() => {
	hasMounted = true;
});

$: hasMounted &&
	(() => {
		const size = (Object.keys(sizeToWeeks) as Array<keyof typeof sizeToWeeks>).find(
			(key) => innerWidth < parseInt(key)
		);
		if (size) weeks = githubData.weeks.slice(sizeToWeeks[size]);
	})();
</script>

<div class="glass-card col-span-full flex min-h-48 items-center justify-center">
	{#if githubData && hasMounted}
		<div class="calendar" in:fade>
			<ul class="days">
				{#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as day}
					<li class="text-center text-xs font-bold text-white">{day}</li>
				{/each}
			</ul>
			<ul class="squares">
				{#each weeks as week}
					{#each week.contributionDays as day}
						<li class="day level-{getContributionLevel(day.contributionCount)}"></li>
					{/each}
				{/each}
			</ul>
		</div>
	{/if}
</div>
<svelte:window bind:innerWidth={innerWidth} />

<style lang="scss">
// credit to https://bitsofco.de/github-contribution-graph-css-grid/
:root {
	--square-size: 15px;
	--square-gap: 2px;
}

.calendar {
	display: inline-grid;
	grid-template-areas: 'days squares';
	grid-gap: 4px;
	grid-template-columns: auto 1fr;
	padding: 4px;

	.days {
		grid-area: days;
		display: grid;
		grid-gap: var(--square-gap);
		grid-template-rows: repeat(7, var(--square-size));
	}
	.squares {
		grid-area: squares;
		display: grid;
		grid-gap: var(--square-gap);
		grid-template-rows: repeat(7, var(--square-size));
		grid-auto-flow: column;
		grid-auto-columns: var(--square-size);
	}
}

.level-0 {
	@apply bg-white opacity-25;
}
.level-1 {
	@apply bg-white opacity-55;
}
.level-2 {
	@apply bg-white opacity-70;
}
.level-3 {
	@apply bg-white opacity-85;
}
.level-4 {
	@apply bg-white;
}
</style>
