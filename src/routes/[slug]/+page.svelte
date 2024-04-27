<script lang="ts">
	import { formatDate } from '$lib/utils.js';

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

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

	h1 + p {
		margin-top: var(--size-2);
		color: var(--text-2);
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
</style>
