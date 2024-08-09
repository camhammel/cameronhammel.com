<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import HeaderLogo from '../../svg/header-logo.svelte';
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	$: isLink = $page.url.pathname !== '/';

	let mounted = false;
	let isMobile = false;

	onMount(() => {
		mounted = true;
		isMobile = (document.querySelector('html')?.clientWidth || 0) < 640;
	});
</script>

<div class="w-full h-screen flex-col flex">
	<div class="items-center flex flex-row sm:justify-end justify-center bg-white overflow-hidden">
		{#if mounted}
			<h1
				class="py-8 px-4 max-w-sm sm:text-end text-center"
				in:fly={{
					easing: cubicOut,
					delay: 150,
					duration: 500,
					...(isMobile ? { y: -50 } : { x: 50 })
				}}
			>
				{#if isLink}
					<a href="/" class="inline-block w-[328px]"> <HeaderLogo /> </a>
				{:else}
					<div class="inline-block w-[328px]"><HeaderLogo /></div>
				{/if}
			</h1>
		{/if}
	</div>
	<div class="flex flex-1"><slot></slot></div>
</div>
<SvelteSeo
	title="Cameron Hammel"
	description="Cameron Hammel's portfolio website"
	keywords="Cameron Hammel, Cameron, Hammel, personal, website, portfolio, LinkedIn, GitHub, Resume"
	themeColor="#334155"
	openGraph={{
		title: 'Cameron Hammel',
		description: "Cameron Hammel's personal website",
		url: 'https://cameronhammel.dev',
		type: 'website',
		images: [
			{
				url: 'https://cameronhammel.dev/favicon.png',
				width: 1200,
				height: 630,
				alt: 'Cameron Hammel'
			}
		]
	}}
/>
