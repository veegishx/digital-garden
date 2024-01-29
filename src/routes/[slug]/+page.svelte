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
		<p>Initially published on {formatDate(data.meta.date)}</p>
		<h1>{data.meta.title}</h1>
	</header>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num; {category}</span>
		{/each}
	</div>

	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	header {
		text-align: center;
	}
	header > p {
		margin-inline: auto;
		text-align: center;
	}
	article {
		max-inline-size: var(--size-content-3);
		writing-mode: horizontal-tb;
		margin-inline: auto;
	}

	header > h1 {
		font-size: var(--font-size-4);
		text-wrap: wrap;
		max-inline-size: var(--size-header-3);
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
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
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
</style>
