import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const post = await import(`../../posts/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata,
			post_slug: params.slug
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
};
