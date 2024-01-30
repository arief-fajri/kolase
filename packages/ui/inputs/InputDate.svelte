<script>
	import { createEventDispatcher } from 'svelte';
	import moment from 'moment';
	import { clickOutside } from '$lib/helpers/click-outside';
	import DropdownWrapper from '$lib/components/dropdowns/DropdownWrapper.svelte';
	import DatePicker from '$lib/components/datePicker/index.svelte';
	import { slide } from 'svelte/transition';

	export let value = '';
	export let type = 'dateTime'; // dateTime, dateOnly
	// export let maxDate = '';
	// export let minDate = '';
	export let isError = false;
	export let message = 'lakslaslaklsa';

	let openCalender;

	const dispatch = createEventDispatcher();
</script>

<div class:isError>
	<div class="input-date-wrapper" use:clickOutside on:outclick={() => (openCalender = false)}>
		<button
			on:click={() => {
				openCalender = !openCalender;
				// dispatch('openCalender');
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<g id="evaCalendarOutline0">
					<g id="evaCalendarOutline1">
						<g id="evaCalendarOutline2" fill="currentColor">
							<path
								d="M18 4h-1V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM6 6h1v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h1a1 1 0 0 1 1 1v4H5V7a1 1 0 0 1 1-1Zm12 14H6a1 1 0 0 1-1-1v-6h14v6a1 1 0 0 1-1 1Z"
							/>
							<circle cx="8" cy="16" r="1" />
							<path d="M16 15h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Z" />
						</g>
					</g>
				</g>
			</svg>
			<div class="label">
				{#if value}
					<p>{moment(value).format(type === 'dateTime' ? 'DD MMMM YYYY HH:mm' : 'DD MMMM YYYY')}</p>
				{:else}
					<p style="opacity: 0.3;">Pilih Tanggal</p>
				{/if}
			</div>
		</button>

		<DropdownWrapper bind:visible={openCalender} bottom={38} top={38} onTop width="320px">
			<div slot="items">
				<DatePicker
					bind:visible={openCalender}
					isDisplayTime
					dateSelected={value}
					allowMinDate={0}
					allowAll={false}
					on:datechange={(e) => {
						value = moment(e.detail).format();
						dispatch('dateChange', value);
					}}
				/>
			</div>
		</DropdownWrapper>
	</div>
	{#if isError && message}
		<p class="message" transition:slide>{message || ''}</p>
	{/if}
</div>

<style>
	.input-date-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		font: inherit;
		padding: 0 12px 0 6px;
		height: 34px;
		border: solid 1px var(--surface-container);
		border-radius: 0.5rem;
	}
	.input-date-wrapper button {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		text-align: left;
	}
	.input-date-wrapper .label {
		min-width: 200px;
	}
	.input-date-wrapper:focus-within {
		border: solid 1px var(--primary);
		box-shadow: var(--default-shadow);
	}
	.message {
		margin-top: 0.25rem;
		font-size: 12px;
		font-style: italic;
	}
	.isError .message,
	.isError .label {
		color: var(--error);
	}
	.isError .input-date-wrapper {
		border: solid 1px var(--error) !important;
	}
</style>
