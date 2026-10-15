<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		busy?: boolean;
		children: Snippet;
		focusOnOpen?: boolean;
		label: string;
		open?: boolean;
	};

	let {
		busy = false,
		children,
		focusOnOpen = false,
		label,
		open = $bindable(false)
	}: Props = $props();
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
	tabindex={focusOnOpen ? -1 : undefined}
	onclick={(event) => {
		event.stopPropagation();
		const target = event.target;
		if (!(target instanceof Element)) return;
		// Controls must finish their own interaction without dismissing the dialog.
		if (
			target.closest(
				'a, button, input, textarea, select, label, summary, [role="button"], [contenteditable="true"]'
			)
		)
			return;
		if (window.getSelection()?.toString()) return;
		close();
	}}
	oncancel={(event) => {
		if (busy) event.preventDefault();
	}}
	onclose={() => (open = false)}
>
	{@render children()}
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
