<script lang="ts">
	export let caption: string;
</script>

<figure class="image-caption">
	<slot />
	<figcaption>{caption || ''}</figcaption>
</figure>
