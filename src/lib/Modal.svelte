<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		busy?: boolean;
		children?: Snippet;
		title?: string;
		description?: string;
		focusOnOpen?: boolean;
		label: string;
		open?: boolean;
	};

	let {
		busy = false,
		children,
		focusOnOpen = false,
		label,
		title = label,
		description,
		open = $bindable(false)
	}: Props = $props();
	const descriptionId = $props.id();
	let dialog: HTMLDialogElement;

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
			if (focusOnOpen) dialog.focus({ preventScroll: true });
		}
		if (!open && dialog.open) dialog.close();
	});

	function close() {
		if (!busy) open = false;
	}
</script>

<dialog
	bind:this={dialog}
	class="modal"
	aria-label={label}
	aria-describedby={description ? descriptionId : undefined}
	tabindex={focusOnOpen ? -1 : undefined}
	onclick={(event) => {
		event.stopPropagation();
		if (event.target !== event.currentTarget) return;
		const bounds = event.currentTarget.getBoundingClientRect();
		if (
			event.clientX < bounds.left ||
			event.clientX > bounds.right ||
			event.clientY < bounds.top ||
			event.clientY > bounds.bottom
		)
			close();
	}}
	oncancel={(event) => {
		if (busy) event.preventDefault();
	}}
	onclose={() => (open = false)}
>
	<div class="modal__content">
		<header class="modal__header">
			<h2 class="type-section-title">{title}</h2>
			{#if description}<p id={descriptionId}>{description}</p>{/if}
		</header>
		{#if children}{@render children()}{/if}
	</div>
</dialog>

<style>
	.modal {
		width: min(calc(100% - 2rem), 28rem);
		box-sizing: border-box;
		border: 0;
		border-radius: 3rem;
		padding: 2rem;
		margin: auto;
		background: var(--brand-color-white);
		box-shadow: var(--shadow-modal);
		color: var(--color-foreground);
		text-align: left;
	}

	.modal__content {
		display: grid;
		gap: 2rem;
	}
	.modal__header {
		display: grid;
		gap: 1rem;
	}
	.modal__header h2,
	.modal__header p {
		margin: 0;
	}

	.modal::backdrop {
		background: transparent;
	}

	.modal[tabindex='-1']:focus {
		outline: none;
	}

	@supports (corner-shape: squircle) {
		.modal {
			border-radius: 6rem;
			corner-shape: squircle;
		}
	}
</style>
