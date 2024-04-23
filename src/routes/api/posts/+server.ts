import type { Post, HomePagePosts } from '$lib/types';
import { json } from '@sveltejs/kit';

async function getPosts() {
	let homepageResponse: HomePagePosts = {
		posts: [],
		pickOfTheDay: {
			author: '',
			title: '',
			slug: '',
			description: '',
			date: '',
			categories: [],
			published: false
		}
	};

	const paths = import.meta.glob('/src/posts/*.md', {
		eager: true
	});

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			post.published && homepageResponse.posts.push(post);
		}
	}

	homepageResponse.posts = homepageResponse.posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	// Get the lastest featured post
	homepageResponse.posts.some((post) =>
		post.featured
			? (homepageResponse.pickOfTheDay = post)
			: (homepageResponse.pickOfTheDay = {
					author: '',
					title: '',
					slug: '',
					description: '',
					date: '',
					categories: [],
					published: false
				})
	);

	return homepageResponse;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
