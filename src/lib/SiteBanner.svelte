<script lang="ts">
	type Props = {
		linkHref?: string;
		linkLabel?: string;
		message?: string;
	};

	let {
		linkHref,
		linkLabel,
		message = 'CadenceEngineer is in early access and working with its first teams.'
	}: Props = $props();
</script>

<aside class="site-banner" aria-label="Site announcement">
	<span>{message}</span>
	{#if linkHref && linkLabel}
		<!-- The base-prefixed static URL is deployment-safe and cannot use route resolution. -->
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a class="site-banner__link" href={linkHref}>{linkLabel}</a>
	{/if}
</aside>

<style>
	.site-banner {
		display: flex;
		min-height: 3rem;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0.5rem 1rem;
		gap: 0.25rem 1rem;
		background: var(--color-accent);
		color: var(--brand-color-white);
		text-align: center;
	}

	.site-banner__link {
		color: inherit;
		font-weight: var(--font-weight-bold);
	}

	.site-banner__link:focus-visible {
		outline: 2px solid var(--brand-color-white);
		outline-offset: 2px;
	}
</style>
