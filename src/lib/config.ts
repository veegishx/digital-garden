import { dev } from '$app/environment';

export const site = {
	title: 'Veegish Ramdani',
	description:
		'The digital garden of Veegish Ramdani, a place where he posts his notes, links and occasionally blogs about technology',
	url: dev ? 'http://localhost:5173' : 'https://veegish.com',
	maintenanceMode: false,
	author: 'Veegish Ramdani',
	category: 'Software Development',
	keywords: [
		'technology',
		'blog',
		'personal site',
		'software development',
		'programming',
		'software design',
		'software engineering',
		'portfolio'
	],
	thumbnail: 'thumbnail.png'
};
