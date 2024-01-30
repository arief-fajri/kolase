<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let data = [];
	export let collapse = true;
	export let disabled = false;
	export let gap = '0.5rem';
	export let expandedIndexes = [];

	// Lifecycle Hooks
	onMount(() => {
		// pass
	});

	// Functions
	const toggleAccordion = (index) => {
		if (disabled) return;

		const currentIndex = expandedIndexes.indexOf(index);

		if (currentIndex === -1) {
			if (collapse) {
				expandedIndexes = [index];
			} else {
				expandedIndexes = [...expandedIndexes, index];
			}
		} else {
			expandedIndexes = [
				...expandedIndexes.slice(0, currentIndex),
				...expandedIndexes.slice(currentIndex + 1)
			];
		}
	};
</script>

<div class="accordion-container" style="gap: {gap};">
	{#each data as item, i (i)}
		<div class="accordion-item">
			<button
				class="accordion-header"
				on:click={() => toggleAccordion(i)}
				aria-expanded={expandedIndexes.includes(i)}
				aria-controls={`content-${i}`}
			>
				<slot name="header" {item} {expandedIndexes} index={i}>
					<div class="title-container">{item.title}</div>
					{#if item.details}
						<div class="details-container">{item.details}</div>
					{/if}
				</slot>
			</button>
			{#if expandedIndexes.includes(i)}
				<div
					class="accordion-content"
					transition:slide={{ duration: 300 }}
					id={`content-${i}`}
					aria-labelledby={`accordion-header-${i}`}
					role="region"
				>
					<slot name="content" {item} {expandedIndexes}>
						{item.content}
					</slot>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="postcss">
	.accordion-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;
		transition: cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
		overflow: hidden;
	}

	.accordion-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		box-shadow: inset 0 0 0 1px var(--primary);
		padding: 2px;
	}

	.accordion-header {
		padding: 0.5rem;
		border: none;
		cursor: pointer;
		width: 100%;
		text-align: left;
		font-weight: bold;
	}

	.details-container {
		font-size: 1rem;
		font-weight: 400;
	}

	.accordion-content {
		width: 100%;
		padding: 0.5rem 1rem 1rem 1rem;
	}
</style>
