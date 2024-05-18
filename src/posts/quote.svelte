<script lang="ts">
	export let author: string;
	export let quote: string;
	export let citation: string;
</script>

<figure>
	<figcaption>
		{#if citation}
			<cite>{citation}</cite>, by {author}
		{/if}
		{#if !citation}
			{author}
		{/if}
	</figcaption>
	<blockquote>
		{quote}
	</blockquote>
</figure>
