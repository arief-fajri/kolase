<script>
	import Icon from '@iconify/svelte';
	import { clickOutside } from '$lib/helpers/click-outside';
	import DropdownWrapper from '$lib/components/dropdowns/DropdownWrapper.svelte';
	import Button from '$lib/components/buttons/Button.svelte';

	export let items = [];
	export let selected = [];
	export let key = 'name';
	export let placeholder = 'Pilih sesuatu';
	export let visible;
	export let disabled;

	export let top = 38;
	export let bottom = 38;
	export let onTop = false;
	export let rtl = false;
	export let width = '100%';

	const foundItem = (val = '') => {
		const found = items.find((f) => f[key] === val);
		if (found?.name) {
			return found.name || '';
		}

		return '';
	};
</script>

<div
	class="w-full relative"
	use:clickOutside
	on:outclick={() => {
		visible = false;
	}}
>
	<button
		class:isFocus={visible}
		class:disabled
		{disabled}
		on:click={() => {
			if (!disabled) {
				visible = !visible;
			}
		}}
	>
		{#if selected.length === 1 && foundItem(selected[0])}
			<p>{foundItem(selected[0])}</p>
		{:else}
			<p style="opacity: 0.5">{placeholder || ''}</p>
		{/if}
		<div class="text-xl">
			<Icon icon="eva:chevron-down-fill" />
		</div>
	</button>

	<DropdownWrapper bind:visible {top} {bottom} {onTop} {width} {rtl}>
		<div slot="items">
			{#if items.length}
				<div class="p-2 flex flex-col gap-1">
					{#each items as item}
						<Button
							text={item.name}
							variant="tertiary"
							size="small"
							customClass="w-full"
							isSelected={selected.includes(item[key])}
							on:click={() => {
								selected = [item[key]];
								visible = false;
							}}
						/>
					{/each}
				</div>
			{:else}
				<div class="flex items-center justify-center p-4">
					<p style="opacity: 0.5">Item Belum Tersedia</p>
				</div>
			{/if}
		</div>
	</DropdownWrapper>
</div>

<style>
	button {
		width: 100%;
		border: solid 1px var(--primary-container);
		border-radius: 0.5rem;
		font: inherit;
		padding: 0 12px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	button.isFocus {
		border: solid 1px var(--primary);
		box-shadow: var(--default-shadow);
	}
	button.disabled {
		background: var(--on-disabled);
		opacity: 0.5;
	}
</style>
