<script lang="ts">
	import * as config from '$lib/config';
</script>

<footer>
	<span>{config.title} &copy {new Date().getFullYear()}</span>
	<span>🚀 Svelte + Open Props</span>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		padding-block: var(--size-7);
		border-top: 1px solid var(--border);
	}
</style>
