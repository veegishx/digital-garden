<script>
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>

<style>
	.error {
		width: 100%;
		height: 100%;
		display: flex;
		place-content: center;
	}

	.error > :where(h1) {
		max-inline-size: var(--size-header-2);
	}
</style>
