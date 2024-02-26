<script lang="ts">
	import { formatDate } from '$lib/utils.js';
	import * as config from '$lib/config.js';
	import { IconStarFilled } from '@tabler/icons-svelte';
	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<!-- Pick of the day: Display latest featured article -->
<section class="">
	{#if data.homePagePosts.pickOfTheDay}
		<div class="featured-post">
			<a href={data.homePagePosts.pickOfTheDay.slug}>
				<div class="featured-post__cover">
					<div class="featured-post__header">
						<span class="featured-post__icon"><IconStarFilled size={15} /> Featured</span>
						<span class="featured-post__category"
							>{data.homePagePosts.pickOfTheDay.categories[0]}</span
						>
					</div>
					<img
						src={data.homePagePosts.pickOfTheDay.thumbnail}
						alt={data.homePagePosts.pickOfTheDay?.title}
						class="featured-post__thumbnail"
					/>
					<div class="featured-post__meta">
						<!-- <p class="featured-post__date">{formatDate(post.date)}</p> -->
						<h2 class="featured-post__title">{data.homePagePosts.pickOfTheDay.title}</h2>
					</div>
				</div>
				<p class="featured-post__description">{data.homePagePosts.pickOfTheDay.description}</p>
				<p class="featured-post__author">
					{data.homePagePosts.pickOfTheDay.author} - {new Date(
						data.homePagePosts.pickOfTheDay.date
					).toLocaleString('en-GB', {
						day: '2-digit',
						year: 'numeric',
						month: 'long'
					})}
				</p>
			</a>
		</div>
	{/if}
</section>

<section class="latest-posts">
	<h2 class="latest-posts__label">Latest Posts</h2>
	<ul class="posts">
		{#each data.homePagePosts.posts as post}
			<li class="latest-posts__article">
				<a href={post.slug}>
					<!-- <p class="date">{formatDate(post.date)}</p> -->
					{#if post.thumbnail}
						<h2 class="latest-posts__article-title">{post.title}</h2>
						<img class="latest-posts__article-thumbnail" src={post.thumbnail} alt={post?.title} />
					{/if}
					{#if !post.thumbnail}
						<h2 class="latest-posts__article-title--primary">{post.title}</h2>
					{/if}

					<p class="latest-posts__article-description">
						{post.description.length >= 400
							? post.description.substring(0, 600).concat('...')
							: post.description}
					</p>
					<p class="latest-posts__article-author">
						{post.author} - {new Date(post.date).toLocaleString('en-GB', {
							day: '2-digit',
							year: 'numeric',
							month: 'long'
						})}
					</p>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	a {
		color: unset;
	}
	a:visited {
		color: unset;
	}
	a:hover .featured-post__title {
		text-decoration: underline;
	}
	a:hover,
	a:hover .featured-post__description {
		text-decoration: none;
	}
	.latest-posts {
		padding-block: var(--size-9);
		padding-left: 25px;
		padding-right: 25px;
	}
	@media (min-width: 780px) {
		.latest-posts {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr;
			gap: 0px 0px;
			grid-template-areas:
				'featured-post featured-post featured-post'
				'latest-posts latest-posts latest-posts'
				'latest-posts latest-posts latest-posts';
		}
		.featured-post {
			grid-area: featured-post;
		}
		.latest-posts {
			grid-area: latest-posts;
		}
	}

	.featured-post {
		padding-left: 25px;
		padding-right: 25px;
		border-top: 1px solid;
		border-bottom: 1px solid;
	}

	.featured-post,
	.featured-post__cover {
		position: relative;
	}

	.featured-post__header {
		display: flex;
		gap: 10px;
	}

	.featured-post__icon {
		font-family: var(--font-mono);
		display: flex;
		gap: 10px;
		width: fit-content;
		border: 1px solid;
		padding: 8px 12px;
		margin-bottom: 15px;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: 600;
		background: var(--featured-tag-bg);
		color: var(--featured-tag-fg);
	}

	.featured-post__category {
		width: fit-content;
		border: 1px solid;
		padding: 8px 12px;
		margin-bottom: 15px;
		text-transform: uppercase;
		font-size: 14px;
		font-family: var(--font-mono);
	}

	.featured-post__date {
		background: black;
		color: white;
		padding: 4px 8px 4px 8px;
		width: fit-content;
		font-size: 12px;
	}

	.featured-post__meta {
		margin: 10px auto;
	}

	.featured-post__thumbnail {
		border-radius: 0;
	}

	.featured-post__title {
		font-size: 26px;
		font-family: var(--font-bebas-neue);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		text-transform: uppercase;
		max-inline-size: unset;
		text-wrap: wrap;
	}

	.featured-post__description {
		font-size: 14px;
		margin-bottom: 20px;
	}

	.featured-post__author {
		font-size: 12.5px;
		font-family: var(--font-mono);
	}

	.latest-posts__label {
		font-family: var(--font-bebas-neue);
	}

	.latest-posts__article {
		max-inline-size: unset;
	}

	.latest-posts__article:not(:last-child) {
		border-bottom: 1px solid var(--latest-posts-br);
	}

	.latest-posts__article-title {
		font-size: var(--font-size-fluid-1);
		max-inline-size: unset;
		text-wrap: wrap;
		margin-bottom: 20px;
	}

	.latest-posts__article-title--primary {
		font-weight: 600;
		font-size: var(--font-size-fluid-2);
		margin-bottom: 20px;
	}

	.latest-posts__article-thumbnail {
		margin-bottom: 20px;
	}
	.latest-posts__article-description {
		font-size: 1rem;
		margin-bottom: 20px;
	}

	.latest-posts__article-author {
		font-size: 12.5px;
		font-family: var(--font-mono);
	}

	.date {
		color: var(--text-2);
	}

	.description {
		margin-top: var(--size-3);
	}
</style>
