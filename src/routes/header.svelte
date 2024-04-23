<script lang="ts">
	import * as config from '$lib/config';
	import Toggle from './toggle.svelte';
</script>

<nav>
	<a href="/" class="title">
		<strong>{config.title}</strong>
		<span class="disclaimer">Work in Progress</span>
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

	<Toggle />
</nav>

<style>
	nav {
		text-align: center;
		padding-block: var(--size-7);
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

	.title:after {
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
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-around;
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
