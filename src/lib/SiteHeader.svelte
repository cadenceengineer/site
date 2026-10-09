<script lang="ts">
	import { base } from '$app/paths';
	import { appLinksEnabled, appUrl } from '$lib/app';
	import BrandLogo from './BrandLogo.svelte';
	import Button from './Button.svelte';
</script>

<header class="site-header">
	<nav aria-label="Primary navigation">
		<!-- The base-prefixed static-home URL is deployment-safe and cannot use route resolution. -->
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a class="home-link" href={`${base}/`} aria-label="CadenceEngineer home">
			<BrandLogo alt="" />
		</a>

		{#if appLinksEnabled}
			<Button href={appUrl}>Sign in</Button>
		{:else}
			<Button href={`${base}/contact/?topic=test_access`}>Request access</Button>
		{/if}
	</nav>
</header>

<style>
	.site-header {
		display: flex;
		min-height: 4rem;
		align-items: center;
		box-sizing: border-box;
		padding-inline: 1rem;
	}

	.site-header nav,
	.site-header .home-link {
		display: flex;
		align-items: center;
	}

	.site-header nav {
		width: 100%;
		max-width: 75rem;
		margin-inline: auto;
		justify-content: space-between;
		gap: 1rem;
	}

	.site-header .home-link {
		color: inherit;
	}

	.site-header :global(.brand-logo) {
		--brand-logo-size: 2rem;
	}
</style>
