<script>
	import Icon from '@iconify/svelte';

	export let arr = [];
	export let max = 240;
	export let fontSize = 14;
	export let processing = false;
</script>

<!-- list of route -->
<div class="flex item-center capitalize" style="font-size: {fontSize}px;">
	{#each arr as a, i}
		<a
			href={i < arr.length - 1 ? a.href : null}
			disabled={i >= arr.length - 1}
			on:click={() => {
				if (!processing && a.onclick) {
					a.onClick();
				}
			}}
			class="cursor-pointer flex-none truncate"
			style="max-width: {max}px"
			class:disabled={i >= arr.length - 1}
			class:cursor-default={i >= arr.length - 1}
			class:clickabled={i < arr.length - 1}
		>
			{a.name}
		</a>

		{#if i < arr.length - 1}
			<div class="text-xl">
				<Icon icon="eva:chevron-right-fill" />
			</div>
		{/if}
	{/each}
</div>

<style>
	.disabled {
		opacity: 0.5;
	}
	.clickabled {
		font-weight: 600;
		color: var(--primary);
	}
</style>
