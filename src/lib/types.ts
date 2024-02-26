export type Post = {
	author: string;
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: string[];
	published: boolean;
	thumbnail?: string;
	featured?: boolean;
};

export type HomePagePosts = {
	posts: Post[];
	pickOfTheDay?: Post;
};
