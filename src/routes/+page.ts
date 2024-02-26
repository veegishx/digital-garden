import type { HomePagePosts } from '$lib/types';

export const load = async ({ fetch }) => {
	const response = await fetch('api/posts');
	const homePagePosts: HomePagePosts = await response.json();
	return { homePagePosts };
};
