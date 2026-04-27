<script lang="ts">
	import { formatDate } from '$lib/utils.js';
	import * as config from '$lib/config.js';
	import { Star } from 'lucide-svelte';
	import { JsonLd, MetaTags } from 'svelte-meta-tags';

	let { data } = $props();

	const leftColumnData = $derived(
		data.homePagePosts.posts.filter((post: { categories: string[] }) =>
			post.categories.includes('Privacy')
		)
	);
	const rightColumnData = $derived(
		data.homePagePosts.posts.filter((post: { categories: string[] }) =>
			post.categories.includes('Debug Log')
		)
	);

	const generateLayout = $derived(() => {
		if (leftColumnData.length < 1 && rightColumnData.length < 1) {
			return 'grid-cols-1';
		}
		if (leftColumnData.length > 0 && rightColumnData.length < 1) {
			return 'grid-cols-12';
		}
		if (leftColumnData.length < 1 && rightColumnData.length > 0) {
			return 'grid-cols-8';
		}
		return 'grid-cols-12';
	});
</script>

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

<div
	class="relative mx-auto w-fit rounded-full px-5 py-1.5 text-center text-[15px] md:text-[16px] shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] bg-[var(--background)]"
>
	<div
		class="absolute inset-[-2px] rounded-[calc(2*var(--borderWidth))] bg-gradient-to-br from-[#f79533] via-[#ef4e7b] via-[#a166ab] via-[#5073b8] via-[#1098ad] via-[#07b39b] to-[#6fba82] opacity-70 animate-pulse -z-10 bg-[length:300%_300%]"
	></div>
	<p>
		All previous <a href="https://archive.veegish.com" class="text-[rgb(0,119,255)]"
			>blog posts have been archived
		</a> for now
	</p>
</div>

<section class={`grid gap-10 mx-auto max-w-[1600px] w-full p-5 md:p-[30px] ${generateLayout()}`}>
	{#if leftColumnData.length > 0}
		<div class="flex flex-col gap-2.5 col-span-6 md:col-span-4 order-1">
			<h2 class="text uppercase text-lg font-monounderline p-2.5 text-center">Privacy</h2>
			<ul class="flex flex-wrap justify-center items-center gap-2.5">
				{#each leftColumnData.slice(0, 3) as post}
					<li class="w-full">
						<a href={post.slug}>
							<article class="w-full">
								<div class="flex flex-col items-center text-center">
									{#if post.thumbnail}
										<img src={post.thumbnail} alt={post.title} class="w-full" />
									{/if}
									<h2 class="text-lg mt-2.5">{post.title}</h2>
									<span class="text-[12.5px] font-mono">{post.author}</span>
								</div>
							</article>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<div class="col-span-6 md:col-span-8 relative order-0 md:order-2">
		{#if data.homePagePosts.pickOfTheDay}
			<a href={data.homePagePosts.pickOfTheDay.slug}>
				<div
					class="relative md:p-4 md:bg-[var(--featured-article-bg)] md:border md:border-[var(--articles-br)]"
				>
					<div class="flex gap-2.5 mb-4">
						<span
							class="flex gap-2.5 w-fit px-3 py-2 uppercase text-sm font-semibold bg-[var(--featured-tag-bg)] text-[var(--featured-tag-fg)]"
						>
							<Star size={15} /> Featured</span
						>
						<span
							class="w-fit px-3 py-2 uppercase text-sm font-mono border text-[var(--featured-post-category-color)]"
							>{data.homePagePosts.pickOfTheDay.categories[0]}</span
						>
					</div>
					{#if data.homePagePosts.pickOfTheDay.thumbnail}
						<img
							src={data.homePagePosts.pickOfTheDay.thumbnail}
							alt={data.homePagePosts.pickOfTheDay?.title}
							class="w-full"
						/>
					{/if}
					<div class="my-2.5 mx-auto">
						<h2 class="text-[26px] uppercase leading-tight">
							{data.homePagePosts.pickOfTheDay.title}
						</h2>
					</div>
				</div>
				<p class="text-sm mt-5 mb-5">{data.homePagePosts.pickOfTheDay.description}</p>
				<p class="text-[12.5px] font-mono">
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
	{#if rightColumnData.length > 0}
		<div
			class="col-span-5 md:col-span-12 lg:col-span-4 order-3 border-t md:border-t-0 border-[var(--articles-br)] pt-5 md:pt-0"
		>
			<h2 class="text uppercase text-lg font-mono underline p-2.5 text-center">The Debug Log</h2>
			<ul class="flex flex-col">
				{#each rightColumnData.slice(0, 6) as post}
					<li class="border-b border-[var(--articles-br)] pb-5 mb-5 last:border-b-0">
						<a href={post.slug}>
							<article class="flex items-start justify-center p-3.5">
								<div class="flex flex-col items-start">
									<h2 class="text-[16px]">{post.title}</h2>
									<span class="text-[12.5px] font-mono">{post.author}</span>
								</div>
								{#if post.thumbnail}
									<img src={post.thumbnail} alt={post.title} class="w-16 h-16 object-cover" />
								{/if}
							</article>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</section>

<section
	class="flex flex-col overflow-hidden relative mx-auto max-w-[1600px] w-full p-[30px] gap-6 items-center"
>
	<h2 class="font-bebas text-4xl">Latest Posts</h2>
	<ul class="flex flex-col w-full max-w-3xl gap-5">
		{#each data.homePagePosts.posts as post}
			<li class="max-w-full flex flex-col mb-5 w-full">
				<a href={post.slug} class="flex flex-col {post.thumbnail ? 'md:flex-row' : ''} gap-5">
					{#if post.thumbnail}
						<img
							loading="lazy"
							class="w-full md:max-w-[300px] md:max-h-[300px] object-cover mb-5"
							src={post.thumbnail}
							alt={post?.title}
							width="720"
							height="500"
						/>
						<div class="flex flex-col justify-center">
							<h2 class="text-2xl mt-5 mb-5">{post.title}</h2>
							<p class="text-base mb-5">
								{post.description.length >= 400
									? post.description.substring(0, 600).concat('...')
									: post.description}
							</p>
							<p class="text-[12.5px] font-mono">
								{post.author} - {new Date(post.date).toLocaleString('en-GB', {
									day: '2-digit',
									year: 'numeric',
									month: 'long'
								})}
							</p>
						</div>
					{:else}
						<h2 class="text-3xl font-semibold mb-5">{post.title}</h2>
						<p class="text-base mb-5">
							{post.description.length >= 400
								? post.description.substring(0, 600).concat('...')
								: post.description}
						</p>
						<p class="text-[12.5px] font-mono">
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
