<script lang="ts">
	import { formatDate } from '$lib/utils.js';
	import * as config from '$lib/config.js';
	import { IconStarFilled } from '@tabler/icons-svelte';
	export let data;

	export const leftColumnData = data.homePagePosts.posts.filter((post) =>
		post.categories.includes('Security')
	);
	export const rightColumnData = data.homePagePosts.posts.filter((post) =>
		post.categories.includes('GDPR')
	);

	export const generateLayout = () => {
		if (leftColumnData?.length < 1 && rightColumnData?.length < 1) {
			return 'full-width-grid';
		}

		if (leftColumnData?.length > 0 && rightColumnData?.length < 1) {
			return 'left-quater-grid';
		}

		if (leftColumnData?.length < 1 && rightColumnData?.length > 0) {
			return 'right-quater-grid';
		}
	}
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="archive-notice gradient-border">
	<p>All my previous blog posts have been archived <a href="https://archive.veegish.com">here</a> for now</p>
</div>

<!-- Pick of the day: Display latest featured article -->
<section class={`above-fold-grid ${ generateLayout()}`}>
	{#if leftColumnData?.length > 0}
	<div class="above-fold-grid__left-column">
		<h2 class="column-label">Essays</h2>
		<ul class="article-list">
			{#each leftColumnData.slice(0, 3) as post}
				<li class="article-list__item--large">
					<article class="article-list__item-card">
						<div class="article-list__item-col">
							{#if post.thumbnail}
							<img src={post.thumbnail} alt={post.title} />
							{/if}
							<h2>{post.title}</h2>
							<span class="article-list__item-author">{post.author}</span>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	</div>
	{/if}
	<div class="above-fold-grid__middle-column featured-post">
		{#if data.homePagePosts.pickOfTheDay}
			<a href={data.homePagePosts.pickOfTheDay.slug}>
				<div class="featured-post__cover">
					<div class="featured-post__header">
						<span class="featured-post__icon"><IconStarFilled size={15} /> Featured</span>
						<span class="featured-post__category"
							>{data.homePagePosts.pickOfTheDay.categories[0]}</span
						>
					</div>
					{#if data.homePagePosts.pickOfTheDay.thumbnail}
					<img
						src={data.homePagePosts.pickOfTheDay.thumbnail}
						alt={data.homePagePosts.pickOfTheDay?.title}
						class="featured-post__thumbnail"
					/>
					{/if}
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
		{/if}
	</div>
	{#if rightColumnData?.length > 0}
	<div class="above-fold-grid__right-column">
		<h2 class="column-label">The Debug Log</h2>
		<ul class="article-list">
			{#each rightColumnData.slice(0, 6) as post}
				<li class="article-list__item--small">
					<article class="article-list__item-card">
						<div class="article-list__item-col">
							<h2>{post.title}</h2>
							<span class="article-list__item-author">{post.author}</span>
						</div>
						{#if post.thumbnail}
							<img src={post.thumbnail} alt={post.title} />
							{/if}
					</article>
				</li>
			{/each}
		</ul>
	</div>
	{/if}
</section>

<section class="latest-posts">
	<h2 class="latest-posts__label">Latest Posts</h2>
	<ul class="latest-posts__article-list">
		{#each data.homePagePosts.posts as post}
			<li class="latest-posts__article-list-item">
				<a
					href={post.slug}
					class="latest-posts__article-list-item--link"
					style={post.thumbnail ? 'flex-direction: row' : 'flex-direction: column'}
				>
					<!-- <p class="date">{formatDate(post.date)}</p> -->
					{#if post.thumbnail}
						<img class="latest-posts__article-thumbnail" src={post.thumbnail} alt={post?.title} />
						<div class="latest-posts__article-meta">
							<h2 class="latest-posts__article-title">{post.title}</h2>
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
						</div>
					{/if}
					{#if !post.thumbnail}
						<h2 class="latest-posts__article-title--primary">{post.title}</h2>
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
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.archive-notice {
		width: fit-content;
    text-align: center;
    background: var(--background);
    margin: 0px auto;
    padding: 6px 20px;
    border-radius: 50px;
		box-shadow: 0 0 0 1px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.05), 0 12px 24px rgba(0,0,0,.05);
	}
	.archive-notice > p > a {
		color: rgb(0, 119, 255);
	}
	.gradient-border {
  --borderWidth: 2px;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}


@keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}



	.featured-post h2 {
		font-size: 55px;
	}
	.above-fold-grid {
		display: grid;
	}
	.above-fold-grid.full-width-grid {
		grid-template-columns: repeat(8, 1fr)
	}
	.above-fold-grid.left-quater-grid {
		grid-template-columns: repeat(12, 1fr);
	}
	.above-fold-grid.right-quater-grid {
		grid-template-columns: repeat(8, 1fr);
	}
	.above-fold-grid.full-width-grid > .above-fold-grid__middle-column::before,
	.above-fold-grid.full-width-grid > .above-fold-grid__middle-column::after {
		display: none;
	}
	.above-fold-grid.right-quater-grid > .above-fold-grid__middle-column::before {
		display: none;
	}
	.above-fold-grid.left-quater-grid > .above-fold-grid__middle-column::after {
		display: none;
	}
	.above-fold-grid__left-column {
		display: flex;
		flex-direction: column;
		gap: 10px;
		grid-column: span 6;
		position: relative;

		overflow: hidden;
		order: 1;
		margin: 0px auto;
	}
	.column-label {
		text-transform: uppercase;
		font-size: 18px;
		font-family: var(--font-mono);
		padding: 10px;
		text-decoration: underline;
	}
	.above-fold-grid__left-column .article-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}
	.above-fold-grid__middle-column {
		order: 0;
		grid-column: span 6;
		position: relative;
	}
	.above-fold-grid__right-column {
		order: 1;
		grid-column: span 5;
	}
	.above-fold-grid__right-column ul {
		position: relative;
	}
	.article-list {
		margin-bottom: 20px;
	}
	.article-list__item-card {
		width: 100%;
	}

	.article-list__item--small .article-list__item-col {
		display: flex;
		flex-direction: column;
	}

	.article-list__item--small .article-list__item-card img {
		display: none;
	}
	.article-list__item--small:nth-last-child(-n + 3) {
		border: none;
	}
	ul li {
		overflow: hidden;
	}

	.article-list__item--large .article-list__item-card img {
		width: 100%;
		border-radius: 0;
		margin-bottom: 20px;
	}

	.article-list__item--large img {
		height: 320px;
		min-width: 100dvw;
		max-width: unset;
		max-height: unset;
	}

	.article-list__item--small .article-list__item-card img {
		max-width: 65px;
		max-height: 65px;
		min-width: 65px;
		min-height: 65px;
		border-radius: 0;
	}

	.above-fold-grid__right-column ul li .article-list__item-card h2 {
		font-size: 22px;
	}

	.article-list__item--small .article-list__item-card h2,
	.article-list__item--large .article-list__item-card h2 {
		font-size: 18px;
		text-wrap: wrap;
		max-inline-size: unset;
		margin-bottom: 10px;
	}
	.article-list__item--small .article-list__item-card h2 {
		font-weight: 100;
	}
	.article-list__item--small .article-list__item-author,
	.article-list__item--large .article-list__item-author {
		font-size: 12.5px;
		font-family: var(--font-mono);
	}

	.article-list__item--small:not(:last-child),
	.article-list__item--large:not(:last-child) {
		border-bottom: unset;
		margin-bottom: 20px;
	}

	.article-list__item-col h2,
	.article-list__item-col .article-list__item-author {
		padding: 0 20px;
	}

	.above-fold-grid__right-column ul li:nth-child(2)::before,
	.above-fold-grid__right-column ul li:nth-child(2)::after {
		display: none;
	}

	a {
		color: unset;
	}
	a:visited {
		color: unset;
	}
	a:hover .featured-post__title {
		text-decoration: underline;
		text-underline-offset: auto;
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

	.featured-post {
		padding-left: 25px;
		padding-right: 25px;
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

	.latest-posts {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
		margin: 0 auto;
		padding: 30px;
		max-width: 1600px;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: 25px;
	}

	.latest-posts__label {
		font-family: var(--font-bebas-neue);
	}

	.latest-posts__article-list-item {
		max-inline-size: unset;
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
		overflow: unset;
		width: 100%;
		margin: 0px auto;
	}

	.latest-posts__article-meta {
		max-inline-size: unset;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.latest-posts__article-list-item:not(:last-child) {
		border-bottom: 1px solid var(--articles-br);
		margin-bottom: 20px;
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
		max-inline-size: unset;
		text-wrap: pretty;
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
		margin-bottom: 20px;
	}

	.date {
		color: var(--text-2);
	}

	.description {
		margin-top: var(--size-3);
	}

	@media (min-width: 768px) {
		.above-fold-grid {
			display: grid;
			gap: 40px;
			grid-template-columns: repeat(10, 1fr);
			overflow: hidden;
			position: relative;
			margin: 0 auto;
			padding: 30px;
			max-width: 1320px;
			width: 100%;
		}
		.above-fold-grid__left-column {
			grid-column: span 4;
		}
		.above-fold-grid__middle-column::before {
			width: 0px;
		}

		.above-fold-grid__middle-column::after {
			width: 0px;
		}
		.above-fold-grid__right-column {
			grid-column: 1/-1;
			border-top: 1px solid var(--articles-br);
		}

		.above-fold-grid__right-column ul {
			display: grid;
			grid-template-rows: 1fr 1fr;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 10px;
			padding: 10px;
			height: 100%;
		}
		.above-fold-grid__right-column ul li:nth-child(2)::before {
			display: inline;
			background-color: var(--articles-br);
			content: '';
			height: 80%;
			position: absolute;
			top: 5%;
			left: calc((100dvw / 3) - 20px);
			width: 1px;
		}
		.above-fold-grid__right-column ul li:nth-child(2)::after {
			display: inline;
			background-color: var(--articles-br);
			content: '';
			height: 80%;
			position: absolute;
			top: 5%;
			right: calc((100dvw / 3) - 20px);
			width: 1px;
		}
		.above-fold-grid__left-column {
			order: unset;
		}

		.above-fold-grid__left-column .column-label,
		.above-fold-grid__right-column .column-label {
			text-align: center;
			margin: 0px auto;
		}

		.above-fold-grid__right-column .article-list {
			border-bottom: 1px solid black;
		}
		.article-list {
			margin-bottom: unset;
		}

		.article-list__item--small:not(:last-child),
		.article-list__item--large:not(:last-child) {
			margin-bottom: unset;
			border-bottom: 1px solid var(--articles-br);
		}

		/** Small article cards */
		.article-list__item--small .article-list__item-card {
			display: flex;
			align-items: start;
			justify-content: center;
			padding: 15px 10px;
		}

		.article-list__item--small .article-list__item-col {
			display: flex;
			flex-direction: column;
			align-items: start;
			justify-content: center;
		}

		.article-list__item--small .article-list__item-card img {
			display: none;
		}

		/** Large article cards */
		.article-list__item--large .article-list__item-card {
			padding: 15px 0;
		}

		.article-list__item--large .article-list__item-col {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			justify-content: center;
		}
		.article-list__item--large .article-list__item-card img {
			min-width: 300px;
			max-width: 300px;
			min-height: 200px;
			max-height: 200px;
			min-height: 65px;
		}
		.article-list__item-col h2,
		.article-list__item-col .article-list__item-author {
			padding: unset;
		}

		.latest-posts__article-list-item--link {
			display: flex;
			flex-direction: row;
			gap: 20px;
		}

		.latest-posts__article-list-item--link img {
			max-width: 300px;
			max-height: 300px;
		}
	}
	@media (min-width: 1024px) {
		.above-fold-grid__right-column ul {
			gap: 10px;
		}
		.article-list__item--small .article-list__item-card img {
			display: inline;
			margin-left: 10px;
		}
		.above-fold-grid__middle-column::before {
			background-color: var(--articles-br);
			content: '';
			height: 100%;
			position: absolute;
			left: calc(40px / -2);
			top: 0;
			width: 1px;
		}

		.above-fold-grid__middle-column::after {
			background-color: var(--articles-br);
			content: '';
			height: 100%;
			position: absolute;
			right: calc(40px / -2);
			top: 0;
			width: 1px;
		}
	}
	@media (min-width: 1280px) {
		.above-fold-grid {
			display: grid;
			gap: 40px;
			grid-template-columns: repeat(16, 1fr);
			overflow: hidden;
			position: relative;
			margin: 0 auto;
			padding: 30px;
			max-width: 1600px;
			width: 100%;
		}

		.above-fold-grid__middle-column {
			grid-column: span 8;
			position: relative;
		}

		.above-fold-grid__right-column {
			grid-column: 13/-1;
			border-top: unset;
		}
		.above-fold-grid__right-column ul {
			display: flex;
			flex-direction: column;
		}
		.above-fold-grid__left-column {
			display: flex;
			flex-direction: column;
			gap: 0;
			grid-column: span 4;
			position: relative;
			overflow: hidden;
		}
		.above-fold-grid__right-column .article-list {
			border: none;
		}
		.above-fold-grid__right-column {
			border-bottom: unset;
		}
		.above-fold-grid__right-column ul li:nth-child(2)::before,
		.above-fold-grid__right-column ul li:nth-child(2)::after {
			display: none;
		}

		.above-fold-grid__right-column ul li .article-list__item-card h2 {
			font-size: 16px;
		}

		.article-list__item--small .article-list__item-col {
			display: flex;
			flex-direction: column;
			align-items: start;
			justify-content: center;
		}

		/** Large article cards */
		.article-list__item--large .article-list__item-card {
			padding: 15px 0;
		}

		.article-list__item--large .article-list__item-col {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			justify-content: center;
		}
		.featured-post {
			background: var(--featured-article-bg);
			padding: 15px;
			border: 1px solid;
		}
	}
</style>
