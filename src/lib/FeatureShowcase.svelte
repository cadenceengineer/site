<script lang="ts">
	import type { Snippet } from 'svelte';
	import FeatureCard from './FeatureCard.svelte';
	import Section from './Section.svelte';

	type Props = {
		cardPosition?: 'left' | 'right';
		caption: string;
		children?: Snippet;
		description: string;
	};

	let { cardPosition = 'right', caption, children, description }: Props = $props();
</script>

<Section>
	<div class="feature-showcase" class:feature-showcase--card-left={cardPosition === 'left'}>
		<div class="feature-showcase__description">
			<h2 class="type-section-title">{caption}</h2>

			<p class="type-body">{description}</p>
		</div>

		<div class="feature-showcase__card">
			<FeatureCard>
				{#if children}
					{@render children()}
				{/if}
			</FeatureCard>
		</div>
	</div>
</Section>

<style>
	.feature-showcase {
		display: flex;
		max-width: 75rem;
		margin-inline: auto;
		gap: 2rem;
	}

	.feature-showcase--card-left {
		flex-direction: row-reverse;
	}

	.feature-showcase__description,
	.feature-showcase__card {
		flex: 1 1 0;
		min-width: 0;
	}

	.feature-showcase__description {
		display: grid;
		align-content: start;
		gap: 2rem;
	}

	.feature-showcase__description h2,
	.feature-showcase__description p {
		margin: 0;
	}

	.feature-showcase__card {
		display: flex;
	}

	@media (max-width: 56rem) {
		.feature-showcase,
		.feature-showcase--card-left {
			flex-direction: column;
		}
	}
</style>
