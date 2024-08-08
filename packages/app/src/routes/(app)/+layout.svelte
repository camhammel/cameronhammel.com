<script lang="ts">
	import { page } from '$app/stores';

	$: isLink = $page.url.pathname !== '/';
</script>

<div class="w-full h-screen flex-col flex">
	<div class="items-center flex flex-row sm:justify-end justify-center bg-white">
		<h1 class="py-8 px-4 max-w-sm text-[clamp(18px,28px,48px)] sm:text-end text-center">
			{#if isLink}
				<a href="/"> CameronHammel.dev </a>
			{:else}
				CameronHammel.dev
			{/if}
		</h1>
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
