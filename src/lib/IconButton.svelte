<script lang="ts">
	type Props = {
		icon: string;
		label: string;
		onclick?: (event: MouseEvent) => void;
	};

	let { icon, label, onclick }: Props = $props();
</script>

<button class="icon-button" type="button" aria-label={label} title={label} {onclick}>
	<span class="icon-button__icon" style:--icon-source={`url("${icon}")`} aria-hidden="true"></span>
</button>

<style>
	.icon-button {
		display: inline-flex;
		width: 1.5rem;
		height: 1.5rem;
		flex: none;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 0;
		border-radius: 0.5rem;
		padding: 0.25rem;
		background: transparent;
		color: var(--color-foreground);
		cursor: pointer;
	}

	@supports (corner-shape: squircle) {
		.icon-button {
			border-radius: 1rem;
			corner-shape: squircle;
		}
	}

	.icon-button:hover {
		background: var(--color-interactive-hover);
	}

	.icon-button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.icon-button__icon {
		display: block;
		width: 1rem;
		height: 1rem;
		background: currentColor;
		-webkit-mask: var(--icon-source) center / contain no-repeat;
		mask: var(--icon-source) center / contain no-repeat;
	}
</style>
