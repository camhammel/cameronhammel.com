<script lang="ts">
	import { page } from '$app/stores';

	$: isLink = $page.url.pathname !== '/';
</script>

<div class="w-full h-screen">
	<div class="items-center flex flex-row justify-end bg-white">
		<h1 class="py-8 px-4 text-[clamp(24px,40px,64px)]">
			{#if isLink}
				<a href="/"> CameronHammel.dev </a>
			{:else}
				CameronHammel.dev
			{/if}
		</h1>
	</div>
	<div class="h-[calc(100vh-124px)]"><slot></slot></div>
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
