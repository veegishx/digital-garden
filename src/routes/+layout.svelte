<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import PageTransition from './transition.svelte';

	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/buttons';
	import '../app.css';

	export let data;
</script>

<div class="layout">
	<Header />
	<main>
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	</main>
	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		flex-direction: column;
	}

	main {
		padding-block: var(--size-9);
		padding-left: 25px;
		padding-right: 25px;
	}

	@media (min-width: 768px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
