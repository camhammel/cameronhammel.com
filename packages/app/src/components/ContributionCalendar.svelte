<script lang="ts">
export let githubData: { totalContributions: number; weeks: any[] };

function getContributionLevel(val: number): number {
	if (val < 6) return Math.ceil(val / 2);
	return 4;
}
</script>

<div class="glass-card col-span-full hidden items-center justify-center lg:flex">
	{#if githubData}
		<div class="calendar">
			<ul class="days">
				{#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as day}
					<li class="text-center text-xs font-bold text-white">{day}</li>
				{/each}
			</ul>
			<ul class="squares">
				{#each githubData.weeks as week}
					{#each week.contributionDays as day}
						<li class="day level-{getContributionLevel(day.contributionCount)}"></li>
					{/each}
				{/each}
			</ul>
		</div>
	{/if}
</div>

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
