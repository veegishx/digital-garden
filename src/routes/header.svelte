<script lang="ts">
	import * as config from '$lib/config';
	import Toggle from './toggle.svelte';
</script>

<nav>
	<a href="/" class="title">
		<strong>{config.site.title}</strong>
		{#if config.site.maintenanceMode}
			<span class="disclaimer">Work in Progress</span>
		{/if}
	</a>

	<ul class="links">
		<li>
			<a href="https://archive.veegish.com/">Archive</a>
		</li>
		<li>
			<a href="/whoami">Whoami</a>
		</li>
		<li>
			<a href="/contact">Contact</a>
		</li>
		<!-- <li>
			<a href="/rss.xml" target="_blank">RSS</a>
		</li> -->
	</ul>

	<div>
		<Toggle />
	</div>
</nav>

<style>
	nav {
		text-align: center;
		padding-block: var(--size-7);
		align-items: center;
	}

	nav > :nth-child(1) {
		flex: 1;
	}
	nav > :nth-child(2) {
		flex: 3;
	}
	nav > :nth-child(3) {
		flex: 1;
	}

	.links {
		margin-block: var(--size-7);
		display: flex;
		gap: 20px;
		justify-content: center;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.disclaimer {
		top: -11px;
		width: 105px;
		transform: rotate(6deg);
		position: absolute;
		left: 68px;
		font-size: 12px;
		background: rgb(189, 0, 0);
		color: white;
		padding: 4px;
		border-radius: var(--radius-2);
		box-shadow: var(--shadow-2);
	}

	.title {
		position: relative;
	}

	/* .title:after {
		z-index: -1;
		position: absolute;
		top: -50px;
		left: 105px;
		transform: rotate(96deg);
		content: '';
		width: 0px;
		height: 0px;
		border-style: solid;
		border-width: 20px 20px 20px 20px;
		border-color: transparent rgb(104, 2, 2) transparent transparent;
		display: inline-block;
		vertical-align: middle;
	} */

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-evenly;
		}

		.disclaimer {
			transform: rotate(6deg);
			position: absolute;
		}

		.title:after {
			z-index: -1;
			position: absolute;
			top: -50px;
		}
	}
</style>
