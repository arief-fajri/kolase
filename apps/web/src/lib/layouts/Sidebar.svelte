<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { Button } from '@kolase/ui';

	const UI = [
		{ name: 'Accordion', url: '/accordion' },
		{ name: 'Button', url: '/button' },
		{ name: 'Carousel', url: '/carousel' },
		{ name: 'Date Picker', url: '/datepicker' },
		{ name: 'Dropdown', url: '/dropdown' },
		{ name: 'Gallery', url: '/gallery' },
		{ name: 'Input', url: '/input' },
		{ name: 'Modal', url: '/modal' },
		{ name: 'Render', url: '/render' },
		{ name: 'Table', url: '/table' }
	];
</script>

<aside class="py-2">
	<h1 class="font-bold text-xl text-center mb-2">Kolase - UI</h1>
	<div class="flex flex-col gap-1">
		{#each UI as item}
			<Button
				text={item.name}
				variant="tertiary"
				size="small"
				class="w-full !rounded-none"
				isActive={$page.url.pathname === item.url}
				on:click={() => {
					goto(item.url);
				}}
			/>
		{/each}
	</div>
</aside>

<style>
	aside {
		width: 180px;
		position: fixed;
		z-index: 1;
		top: 20px;
		left: 10px;
		background: #eee;
		overflow-x: hidden;
	}
</style>
