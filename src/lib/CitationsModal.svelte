<script lang="ts">
	import bracketsIcon from '$lib/assets/icons/brackets.svg';
	import Button from './Button.svelte';
	import IconButton from './IconButton.svelte';
	import Modal from './Modal.svelte';

	type Citation = {
		claim: string;
		source: string;
		url: string;
	};

	type Props = {
		citations: Citation[];
		label?: string;
		title?: string;
	};

	let { citations, label = 'Citations', title = 'Citations' }: Props = $props();
	let open = $state(false);
</script>

<IconButton icon={bracketsIcon} {label} onclick={() => (open = true)} />

<Modal label={title} bind:open focusOnOpen>
	<div class="citations font-interface">
		<h2 class="type-subheading">{title}</h2>
		<!-- A Citation points at the provider source it verifies, never at a site route. -->
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<ul>
			{#each citations as citation (citation.claim)}
				<li>
					<a
						class="type-body"
						href={citation.url}
						title={citation.source}
						target="_blank"
						rel="noopener noreferrer">{citation.claim}</a
					>
				</li>
			{/each}
		</ul>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
		<div class="citations__actions">
			<Button type="button" onclick={() => (open = false)}>Close</Button>
		</div>
	</div>
</Modal>

<style>
	.citations {
		display: grid;
		gap: 1rem;
	}

	.citations h2 {
		margin: 0;
	}

	.citations ul {
		display: grid;
		margin: 0;
		padding-left: 1.25rem;
		gap: 0.5rem;
	}

	.citations a {
		color: inherit;
		overflow-wrap: anywhere;
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	/* Brand: the modal's action group follows its content after a 2rem gap. */
	.citations__actions {
		margin-top: 1rem;
	}
</style>
