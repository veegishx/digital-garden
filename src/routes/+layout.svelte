<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import PageTransition from './transition.svelte';

	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/buttons';
	import '../app.css';
	import { page } from '$app/stores';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import * as config from '$lib/config.js';

	export let data;
</script>

<svelte:head>
	{#if $page.data.keywords}
		<MetaTags
			title={config.site.title}
			description={config.site.description}
			canonical={config.site.url}
			openGraph={{
				type: 'article',
				article: {
					publishedTime: new Date().toDateString(),
					modifiedTime: new Date().toDateString(),
					section: config.site.category,
					authors: [config.site.author],
					tags: config.site.keywords
				},
				url: config.site.url,
				title: config.site.title,
				description: config.site.description,
				images: [
					{
						url: `${config.site.url}/${config.site.thumbnail}`,
						width: 800,
						height: 600,
						alt: config.site.title
					},
					{
						url: `${config.site.url}/${config.site.thumbnail}`,
						width: 900,
						height: 800,
						alt: config.site.title
					},
					{ url: `${config.site.url}/${config.site.thumbnail}` },
					{ url: `${config.site.url}/${config.site.thumbnail}` }
				],
				siteName: config.site.title
			}}
			twitter={{
				cardType: 'summary_large_image',
				title: config.site.title,
				description: config.site.description,
				image: `${config.site.url}/${config.site.thumbnail}`,
				imageAlt: config.site.title
			}}
			facebook={{
				appId: '1234567890'
			}}
		/>

		<JsonLd
			schema={{
				'@type': 'Article',
				mainEntityOfPage: {
					'@type': 'WebPage',
					'@id': config.site.url
				},
				headline: config.site.title,
				image: `${config.site.url}/${config.site.thumbnail}`,
				datePublished: new Date().toDateString(),
				dateModified: new Date().toDateString(),
				author: {
					'@type': 'Person',
					name: config.site.author
				},
				publisher: {
					'@type': 'Organization',
					name: config.site.author,
					logo: {
						'@type': 'ImageObject',
						url: `${config.site.url}/${config.site.thumbnail}`
					}
				}
			}}
		/>
	{/if}
</svelte:head>

<div class="layout">
	<Header />
	<main>
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	</main>
	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
