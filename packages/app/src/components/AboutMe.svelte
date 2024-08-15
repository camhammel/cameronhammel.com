<script lang="ts">
import { page } from '$app/stores';
import { onMount } from 'svelte';
import HeaderLogo from '../svg/header-logo.svelte';
import { fly } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
import { urlFor } from '$lib/sanity/client';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import Arrow from '../svg/arrow.svelte';

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

<div id="fp-about" class="flex min-h-svh w-full flex-col bg-white sm:snap-start">
	<div class="flex flex-row items-center justify-center overflow-x-hidden bg-white sm:justify-end">
		{#if mounted}
			<div
				class="p-2 sm:p-6"
				in:fly={{
					easing: cubicOut,
					delay: 150,
					duration: 500,
					...(isMobile ? { y: -50 } : { x: 50 })
				}}
			>
				{#if isLink}
					<a href="/" class="inline-block w-80 sm:w-[458px]"><HeaderLogo /></a>
				{:else}
					<div class="inline-block w-80 sm:w-[458px]"><HeaderLogo /></div>
				{/if}
			</div>
		{/if}
	</div>
	<div
		class="bg-gradient-ellipse-tl from-primary-lighter to-primary relative mx-4 mb-4 flex flex-1 flex-col justify-between gap-4 rounded-3xl from-20% to-80% px-4 pb-8 sm:mx-6 sm:mb-6 sm:gap-8 sm:pt-8"
	>
		<div
			class="flex flex-grow flex-col-reverse items-start justify-evenly sm:flex-row sm:items-center"
		>
			<div class="mx-auto my-1 flex flex-col gap-2 sm:max-w-[50%]">
				<h1
					class="mx-auto text-center text-[clamp(24px,10svh,48px)] leading-none tracking-normal text-white [text-transform:none;] sm:mx-0 sm:text-start sm:text-8xl"
				>
					Hi, I'm<br />Cameron.
				</h1>
				<p class="mx-auto max-w-[80%] font-medium text-white sm:mx-0 sm:max-w-xl sm:text-xl">
					I'm a software engineer based in Toronto 🇨🇦
					<br /> I build cutting edge web and mobile applications using modern frameworks such as
					<b>React-Native</b>, <b>Vue</b>, and <b>SvelteKit</b>.
				</p>
			</div>
			<p
				class="xs:w-1/2 mx-auto my-4 block aspect-square w-1/3 max-w-64 overflow-clip rounded-full border-2 border-solid border-white text-center font-medium text-white shadow-sm sm:my-0 sm:w-auto sm:text-lg"
			>
				{#if profileImage}
					<img
						src={urlFor(profileImage)?.width(256).url()}
						alt="Project Section"
						height="256"
						width="256"
					/>
				{:else}
					<p class="text-7xl">👋</p>
				{/if}
			</p>
		</div>
		<div
			class="xs:grid-cols-3 mx-auto grid max-w-screen-2xl grid-cols-2 gap-2 px-4 sm:grid-cols-6 sm:gap-4"
		>
			<div class="glass-card col-span-2 flex items-center justify-center sm:row-span-2">
				<p class="block aspect-square text-center text-4xl font-medium text-white sm:text-7xl">
					👋
				</p>
			</div>
			<div class="glass-card col-span-2 flex items-center justify-center sm:col-span-4">
				<p class="text-center font-medium text-white sm:text-lg">GitHub Stat Here (TODO)</p>
			</div>
			<div class="glass-card col-span-full flex items-center justify-center sm:col-span-4">
				<p class="text-center font-medium text-white sm:text-lg">GitHub Stat 2 Here (TODO)</p>
			</div>
			<div class="glass-card col-span-full flex items-center justify-center overflow-x-hidden">
				<p
					class="animate-infinite-scroll whitespace-nowrap text-center font-medium text-white sm:text-lg"
				>
					{' | ' + techStackItems.map(({ name }) => name).join(' | ')}
				</p>
				<p
					class="animate-infinite-scroll whitespace-nowrap text-center font-medium text-white sm:text-lg"
					aria-hidden
				>
					{' | ' + techStackItems.map(({ name }) => name).join(' | ')}
				</p>
			</div>
		</div>
		<div
			class="3xl:absolute 3xl:bottom-12 3xl:right-4 mt-4 flex animate-bounce self-center text-white sm:mt-0 sm:self-end"
		>
			<div class="aspect-square w-8 -rotate-90 sm:w-12"><Arrow /></div>
		</div>
	</div>
</div>
