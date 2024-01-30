<script>
	import { createSequenceGenerator } from '$lib/helpers/sequenceGenerator';
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';

	export let assets = [];
	export let assetsDeleted = [];
	export let label = 'Galeri';
	export let recomendation = '';
	export let isError;
	export let message = '';
	export let prefixName = '';

	let getId = createSequenceGenerator();

	const getAsset = (file) => {
		isError = false;
		message = '';
		let id = getId();
		let fi = file;

		assets = [
			...assets,
			{
				file: fi,
				name: `${prefixName || label}-${fi.name}`,
				type: fi.type,
				status: 'loading',
				id
			}
		];

		let reader = new FileReader();
		reader.readAsDataURL(fi);
		reader.onload = (e) => {
			assets = assets.map((m) => {
				if (m.id === id) {
					m.src = e.target.result;
					m.status = 'loaded';
				}
				return m;
			});
		};
	};
</script>

<div class="w-full" class:isError>
	<div class="flex flex-wrap items-center gap-1 label">
		<p class="font-semibold">{label}</p>
		{#if recomendation}
			<p class="italic font-normal text-[12px]">({recomendation})</p>
		{/if}
	</div>
	{#if isError && message}
		<p class="message mb-2" transition:slide>{message}</p>
	{/if}
	<div class="flex flex-wrap items-center gap-4 mt-2">
		{#each assets as item}
			<div class="w-[120px] h-[120px] bg-gray-200 rounded-lg overflow-hidden relative">
				{#if item.src}
					<img src={item.src} alt="" class="w-full h-full object-cover object-center" />
				{/if}
				<button
					class="absolute top-1 right-1 rounded-full flex items-center justify-center trash"
					on:click={() => {
						assets = assets.filter((f) => f.id !== item.id);
						assetsDeleted = [...(assetsDeleted || []), item.id];
					}}
				>
					<div class="text-xl">
						<Icon icon="eva:trash-2-fill" />
					</div>
				</button>
			</div>
		{/each}
		<label
			class="flex-none w-[120px] h-[120px] p-4 rounded-lg border-2 border-dashed border-[--surface-container] flex items-center justify-center btn-plus cursor-pointer"
		>
			<input
				type="file"
				class="absolue w-0 h-0 invisible"
				accept="image/*"
				on:click={(e) => {
					e.target.value = null;
				}}
				on:change={(e) => {
					const file = e.target.files[0];
					getAsset(file);
				}}
			/>
			<div class="text-4xl">
				<Icon icon="eva:plus-fill" />
			</div>
		</label>
	</div>
</div>

<style>
	.btn-plus:hover {
		color: var(--primary);
		background: var(--primary-container);
		border-color: var(--primary-container);
	}
	.trash {
		color: var(--error);
		padding: 0.25rem;
		transition: 0.3s ease;
	}
	.trash:hover {
		background: var(--error);
		color: var(--on-error);
	}
	.message {
		margin-top: 0.25rem;
		font-size: 12px;
		font-style: italic;
	}

	.isError .label,
	.isError .message {
		color: var(--error);
	}
</style>
