<script>
	import { intersect } from '$lib/helpers/intersect';
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';

	export let columns = [];
	export let data = [];
	export let isClickable = true;
	export let loading = true;

	const dispatch = createEventDispatcher();

	const sort = (key) => {
		columns = columns.map((m) => {
			if (m.key === key) {
				if (!m.sort) {
					m.sort = 'desc';
				} else if (m.sort === 'desc') {
					m.sort = 'asc';
				} else {
					m.sort = null;
				}
				dispatch('sort', { key, sort: m.sort });
			} else {
				m.sort = null;
			}
			return m;
		});
	};
</script>

<div class="table-container h-full">
	<table>
		<thead>
			<tr class="column-headers bg-white">
				{#each columns as c, i}
					<th
						scope="col"
						class="column-header border-b"
						style:cursor={c.sortable ? 'pointer' : 'default'}
						on:click={() => {
							if (c.sortable) {
								sort(c.key);
							}
						}}
					>
						<div class="header-item {c.headerClass ? c.headerClass : ''}">
							<p style="white-space: nowrap;">{c.title}</p>
							{#if c.sortable}
								<div
									class="icon"
									style:transform={c.sort === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)'}
									style:color={c.sort ? `hsl(0, 0%, 35%)` : `hsl(0, 0%, 75%)`}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 13V3M9 6l3-3l3 3m-3 11a2 2 0 1 1 0 4a2 2 0 0 1 0-4z"
										/>
									</svg>
								</div>
							{/if}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as row, idx}
				<tr class="table-row">
					{#each columns as c, i}
						<td
							class="{c.class || ''} border-t"
							style:cursor={isClickable ? 'pointer' : 'default'}
							on:click={() => {
								if (isClickable) {
									dispatch('click', { ...row, key: c.key });
								}
							}}
						>
							{#if c.renderComponent}
								<svelte:component
									this={c.renderComponent}
									value={c.value(row)}
									bind:dataItems={data}
									bind:isRowHovered={row.isHovered}
								/>
							{:else}
								{@html c.value(row)}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}

			{#if loading}
				{#each { length: 3 } as _, i}
					<tr class="loading">
						{#each columns as c, j}
							<td class={c.class}>
								<div class="loader" style="animation-delay: {(j + i) * 300}ms;" />
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
	<div
		use:intersect
		on:inViewport={() => {
			if (!loading) {
				dispatch('bottom');
			}
		}}
	/>
</div>

<style>
	.table-container {
		overflow: auto;
		overflow-anchor: none;
		position: relative;
	}

	table {
		border-collapse: separate;
		border-spacing: 0;
		width: 100%;
		table-layout: auto;
	}

	th,
	td {
		padding: 8px 12px;
	}

	thead tr {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 100;
	}

	.header-item {
		display: flex;
		flex: none;
		align-items: center;
		gap: 0.25rem;
	}

	.header-item .icon {
		height: 1.25rem;
		display: flex;
		align-items: center;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}

	.table-row {
		transition: 0.2s ease;
	}

	.table-row:hover {
		background: var(--surface-container-low);
		/* box-shadow:
			rgba(0, 0, 0, 0.05) 0px 0px 1px,
			rgba(0, 0, 0, 0.15) 0px 1px 4px; */
	}

	.loader {
		height: 1.5rem;
		border-radius: 0.5rem;
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		background: hsl(0, 0%, 80%);
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
