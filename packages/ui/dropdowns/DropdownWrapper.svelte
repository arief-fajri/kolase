<script>
	import { sineOut, quintOut } from 'svelte/easing';

	export let visible;
	export let top = 12;
	export let bottom = 12;
	export let rtl = false;
	export let width = '';
	export let onTop = false;

	const grow = (_) => {
		return {
			duration: 200,
			easing: sineOut,
			css: (t) => `transform: scale(${t}); opacity: ${t}`
		};
	};
</script>

{#if visible}
	<div
		class="dropdown default-shadow"
		style="{onTop ? `bottom: ${bottom}px;` : `top: ${top}px;`} {rtl
			? `right: 0; transform-origin: ${onTop ? 'bottom' : 'top'} right`
			: `left: 0; transform-origin: ${onTop ? 'bottom' : 'top'} left`}; {width
			? `width: ${width}`
			: ''}"
		transition:grow
	>
		<slot name="items">
			<div style="padding: 12px;">ITEMS</div>
		</slot>
	</div>
{/if}

<!-- style="--top: {top}px; {rtl
	? `right: 0; transform-origin: top right`
	: `left: 0; transform-origin: top left`}; {width ? `width: ${width}` : ''}" -->

<style>
	.dropdown {
		position: absolute;
		/* top: var(--top); */
		border-radius: 0.5rem;
		background: var(--surface);
		min-width: 160px;
		z-index: 1;
	}
</style>
