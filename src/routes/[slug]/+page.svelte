<script lang="ts">
	import { formatDate } from '$lib/utils.js';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import * as config from '$lib/config.js';
	export let data;
</script>

<MetaTags
	title={data.meta.title}
	titleTemplate={`%s | ${config.site.title}`}
	description={data.meta.description}
	canonical={data.post_slug}
	openGraph={{
		type: 'article',
		article: {
			publishedTime: data.meta.date,
			modifiedTime: data.meta.date,
			section: data.meta.categories[0],
			authors: [data.meta.author],
			tags: data.meta.categories
		},
		url: data.post_slug,
		title: data.meta.title,
		description: data.meta.description,
		images: [
			{
				url: data.meta.thumbnail,
				width: 800,
				height: 600,
				alt: data.meta.title
			},
			{
				url: data.meta.thumbnail,
				width: 900,
				height: 800,
				alt: data.meta.title
			},
			{ url: data.meta.thumbnail },
			{ url: data.meta.thumbnail }
		],
		siteName: config.site.title
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: data.meta.title,
		description: data.meta.description,
		image: data.meta.thumbnail,
		imageAlt: data.meta.title
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
			'@id': data.post_slug
		},
		headline: data.meta.title,
		image: [data.meta.thumbnail],
		datePublished: data.meta.date,
		dateModified: data.meta.date,
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
<div id="progress-bar"></div>
<article class="markdown-content">
	<header>
		<p class="markdown-content__meta-date">Initially published on {formatDate(data.meta.date)}</p>
		<h1>{data.meta.title}</h1>
	</header>

	<div class="article-thumbnail">
		<img src={data.meta.thumbnail} alt={data.meta.title} />
	</div>

	<div class="article-body">
		<svelte:component this={data.content} />
	</div>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="tag">{category}</span>
		{/each}
	</div>
</article>

<style>
	@keyframes grow-progress {
		from {
			transform: scaleX(0);
			background: rgba(0, 112, 240, 1) 0%;
			box-shadow: 1px 1px 16px 1px rgba(0, 112, 240, 1);
		}
		to {
			transform: scaleX(1);
			background: rgba(199, 0, 128, 1) 100%;
			box-shadow: 1px 1px 16px 1px rgba(199, 0, 128, 1);
		}
	}

	#progress-bar {
		z-index: 1;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 2px;
		background: rgb(0, 112, 240);
		box-shadow: 1px 1px 16px 1px rgba(0, 112, 240, 1);
		transform-origin: 0 50%;
		animation: grow-progress auto linear;
		animation-timeline: scroll();
	}
	header {
		text-align: center;
		padding: 10px;
		margin-bottom: 20px;
	}
	header > p {
		margin-inline: auto;
		text-align: center;
	}
	article {
		writing-mode: horizontal-tb;
		margin-inline: auto;
	}

	header > h1 {
		font-size: var(--font-size-4);
		text-wrap: wrap;
		margin: 0px auto;
	}

	@media (min-width: 768px) {
		header > h1 {
			font-size: var(--font-size-6);
		}
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--size-1);
		margin-top: var(--size-7);
	}

	.tags > * {
		text-transform: uppercase;
		font-size: 14px;
		font-family: var(--font-mono);
		padding: 6px 8px;
		color: var(--indigo-10);
		background: var(--tag-bg);
	}

	@media (min-width: 768px) {
		article {
			max-inline-size: 1000px;
		}
		h1 {
			font-size: var(--font-size-8);
			text-align: center;
			margin-inline: auto;
		}
	}

	.markdown-content {
		max-width: 800px;
		width: 100%;
	}
	.markdown-content__meta-date {
		font-size: 14px;
	}

	.article-thumbnail {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
