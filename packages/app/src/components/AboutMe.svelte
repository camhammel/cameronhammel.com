<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import HeaderLogo from '../svg/header-logo.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { urlFor } from '$lib/sanity/client';
	import type { SanityAsset } from '@sanity/image-url/lib/types/types';

	export let profileImage: SanityAsset | undefined = undefined;
	export let techStackItems: { name: string }[] = [];

	$: isLink = $page.url.pathname !== '/';

	let mounted = false;
	let isMobile = false;

	onMount(() => {
		mounted = true;
		isMobile = (document.querySelector('html')?.clientWidth || 0) < 640;
	});
</script>

<div id="fp-about" class="snap-start min-h-svh w-full bg-white flex flex-col">
	<div class="items-center flex flex-row sm:justify-end justify-center bg-white overflow-x-hidden">
		{#if mounted}
			<h1
				class="p-2 sm:p-6 sm:text-end text-center"
				in:fly={{
					easing: cubicOut,
					delay: 150,
					duration: 500,
					...(isMobile ? { y: -50 } : { x: 50 })
				}}
			>
				{#if isLink}
					<a href="/" class="inline-block w-80 sm:w-[458px]"> <HeaderLogo /> </a>
				{:else}
					<div class="inline-block w-80 sm:w-[458px]"><HeaderLogo /></div>
				{/if}
			</h1>
		{/if}
	</div>
	<div
		class="bg-radient-ellipse-tl from-[#6EE2F5] from-20% to-[#6454F0] to-80% flex flex-col flex-1 mx-4 mb-4 sm:mx-6 sm:mb-6 rounded-3xl px-4 pb-8 sm:pt-8 justify-between gap-4 sm:gap-8"
	>
		<div
			class="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-evenly flex-grow"
		>
			<h2
				class="text-6xl tracking-normal sm:text-8xl text-start text-white [text-transform:none;] mx-auto"
			>
				Hi, I'm<br />Cameron.
			</h2>
			<!-- <h2
				class="text-4xl tracking-normal max-w-[50%] sm:text-8xl text-start text-white [text-transform:none;]"
			>
				(WIP)
			</h2> -->
		</div>
		<div
			class="grid xs:grid-cols-3 sm:grid-cols-6 grid-cols-2 sm:gap-4 gap-2 px-4 max-w-screen-2xl mx-auto"
		>
			<div class="glass-card col-span-2 sm:row-span-2 justify-center items-center flex">
				<p
					class="sm:text-lg font-medium text-center text-white block aspect-square rounded-full overflow-clip w-2/3 sm:w-full"
				>
					{#if profileImage}
						<img src={urlFor(profileImage)?.crop('focalpoint').url()} alt="Project Section" />
					{:else}
						<p>👋</p>
					{/if}
				</p>
			</div>
			<div class="glass-card col-span-2 sm:col-span-4 justify-center items-center flex">
				<p class="sm:text-lg font-medium text-center text-white">GitHub Stat Here (TODO)</p>
			</div>
			<div class="glass-card col-span-full sm:col-span-4 justify-center items-center flex">
				<p class="sm:text-lg font-medium text-center text-white">
					I'm a software engineer based in Toronto, Canada. <br /><br />
					I build cutting edge web and mobile applications using modern frameworks such as
					<b>React-Native</b>, <b>SvelteKit</b>, and <b>Vue</b>.
				</p>
			</div>
			<div class="glass-card col-span-full justify-center items-center flex overflow-x-hidden">
				<p
					class="sm:text-lg font-medium text-center text-white animate-infinite-scroll whitespace-nowrap"
				>
					{' | ' + techStackItems.map(({ name }) => name).join(' | ')}
				</p>
				<p
					class="sm:text-lg font-medium text-center text-white animate-infinite-scroll whitespace-nowrap"
					aria-hidden
				>
					{' | ' + techStackItems.map(({ name }) => name).join(' | ')}
				</p>
			</div>
		</div>
	</div>
</div>
