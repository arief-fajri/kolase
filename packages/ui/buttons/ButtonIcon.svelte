<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	export let width = 120;
	export let height = 120;
	export let icon = 'eva:plus-fill';
	export let customClass = '';
	export let isActive;

	const dispatch = createEventDispatcher();
</script>

<button
	class={customClass}
	style="width: {width}px; height: {height}px"
	class:isActive
	on:click={() => {
		dispatch('click');
	}}
>
	<slot name="icon">
		<div class="text-xl">
			<Icon {icon} />
		</div>
	</slot>
</button>

<style>
	button {
		flex: none;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.isActive,
	button:hover {
		color: var(--primary);
		background: var(--primary-container);
	}
</style>
