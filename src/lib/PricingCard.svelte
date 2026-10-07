<script lang="ts">
	import Button from './Button.svelte';
	import Card from './FeatureCard.svelte';
	import BrandLogo from './BrandLogo.svelte';

	type Props = {
		name: string;
		subtitle: string;
		price?: string;
		period?: string;
		scope: string[];
		notice?: string;
		tone?: 'test' | 'enterprise';
		actionLabel?: string;
		actionHref?: string;
		onaction?: () => void;
		disabled?: boolean;
	};
	let {
		name,
		subtitle,
		price,
		period,
		scope,
		notice,
		tone = 'test',
		actionLabel,
		actionHref,
		onaction,
		disabled = false
	}: Props = $props();
	let inverse = $derived(tone === 'enterprise');
</script>

<Card class="pricing-card" variant={inverse ? 'inverse' : 'default'}>
	<article class="pricing-card__content" aria-label={`${name} plan`}>
		<header class="pricing-card__header">
			<div class="pricing-card__label">
				<BrandLogo alt="" {inverse} />
				<h3>{name}</h3>
			</div>
			<p>{subtitle}</p>
		</header>
		{#if price}
			<p class="pricing-card__price">
				<strong class="type-display">{price}</strong>
				{#if period}<span>{period}</span>{/if}
			</p>
		{/if}
		<div class="pricing-card__scope">
			{#each scope as item (item)}<p>{item}</p>{/each}
		</div>
		{#if notice}<p class="pricing-card__notice">{notice}</p>{/if}
		{#if actionLabel && (actionHref || onaction)}
			<Button
				href={actionHref}
				onclick={onaction}
				{disabled}
				variant={inverse ? 'inverse' : 'primary'}
				width="full">{actionLabel}</Button
			>
		{/if}
	</article>
</Card>

<style>
	:global(.feature-card.pricing-card) {
		min-width: 0;
		height: fit-content;
		padding: 0;
	}
	.pricing-card__content,
	.pricing-card__header,
	.pricing-card__scope {
		display: flex;
		flex-direction: column;
	}
	.pricing-card__content {
		box-sizing: border-box;
		padding: 2rem;
		gap: 3rem;
		overflow-wrap: anywhere;
	}
	.pricing-card__header,
	.pricing-card__scope {
		gap: 1rem;
	}
	.pricing-card__content p,
	.pricing-card__label h3 {
		margin: 0;
	}
	.pricing-card__label {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}
	.pricing-card__label :global(.brand-logo) {
		width: 1.5rem;
		height: 1.5rem;
		object-fit: contain;
	}
	.pricing-card__label h3 {
		font-size: 1.5rem;
		line-height: 1.5rem;
		font-weight: var(--font-weight-bold);
	}
	.pricing-card__price {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.pricing-card__price span,
	.pricing-card__notice {
		font-weight: var(--font-weight-bold);
	}
</style>
