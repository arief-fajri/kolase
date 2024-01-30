<script>
	import { createEventDispatcher } from 'svelte';

	import Icon from '@iconify/svelte';
	import moment from 'moment';

	import Calender from './grid.svelte';
	import { getMonthName, shortMonthNames } from './function';
	import Button from '$lib/components/buttons/Button.svelte';
	import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';

	export let dateSelected = '';
	export let startDateAllowed;
	export let isDisplayTime = false;
	export let allowAll = false;
	export let visible;
	export let allowMinDate = null;
	export let allowMaxDate = null;

	let date, month, year, hour, minute;
	let display = 'calendar';
	let yearsArray = [];
	let localDateSelected = dateSelected;

	const dispatch = createEventDispatcher();

	// check allowed date to choose
	let isAllowed = (date) => {
		const d = moment(date);
		const today = moment(startDateAllowed);

		if (!allowAll) {
			if (
				(allowMinDate !== null && allowMaxDate === null && d.diff(today, 'days') >= allowMinDate) ||
				(allowMinDate === null && allowMaxDate !== null && d.diff(today, 'days') <= allowMaxDate) ||
				(allowMinDate !== null &&
					allowMaxDate !== null &&
					d.diff(today, 'days') >= allowMinDate &&
					d.diff(today, 'days') <= allowMaxDate) ||
				(allowMinDate === null && allowMaxDate === null)
			) {
				return true;
			}
			return false;
		}
		return true;
	};

	$: if (startDateAllowed) {
		if (!dateSelected) {
			// dateSelected = new Date(startDateAllowed).getDate()
			month = new Date(startDateAllowed).getMonth();
			year = new Date(startDateAllowed).getFullYear();
			// hour = new Date(startDateAllowed).getHours();
			// minute = new Date(startDateAllowed).getMinutes();
		}
	}

	$: if (dateSelected) {
		// localDateSelected = dateSelected
		month = new Date(dateSelected).getMonth();
		year = new Date(dateSelected).getFullYear();
		hour = new Date(dateSelected).getHours();
		minute = new Date(dateSelected).getMinutes();
	} else {
		month = new Date().getMonth();
		year = new Date().getFullYear();
	}

	// call next button click then change month
	const next = () => {
		if (month === 11) {
			month = 0;
			year += 1;
			return;
		}
		month += 1;
	};

	// call previous button click then change month
	const prev = () => {
		if (month === 0) {
			month = 11;
			year -= 1;
			return;
		}
		month -= 1;
	};
</script>

<div class="datePicker">
	<div class="month-name">
		<div class="flex items-center gap-2">
			<p class="font-semibold">{getMonthName(month)}</p>
			<p class="font-semibold">{year}</p>
		</div>
		<div class="flex items-center gap-3">
			<ButtonIcon width={32} height={32} customClass="rounded-full" on:click={prev}>
				<div slot="icon">
					<Icon icon="akar-icons:chevron-left" />
				</div>
			</ButtonIcon>
			<ButtonIcon width={32} height={32} customClass="rounded-full" on:click={next}>
				<div slot="icon">
					<Icon icon="akar-icons:chevron-right" />
				</div>
			</ButtonIcon>
		</div>
	</div>
	<div class="w-full h-full">
		<Calender
			bind:month
			bind:year
			bind:hour
			bind:minute
			bind:date={localDateSelected}
			{isAllowed}
			{isDisplayTime}
			on:datechange={(d) => {
				localDateSelected = d.detail;
			}}
		/>
		<div class="px-4 py-2 flex justify-between items-center border-t border-base-lightest">
			<Button
				text="Tutup"
				variant="secondary"
				size="small"
				on:click={() => {
					visible = false;
				}}
			/>
			<Button
				text="Simpan"
				variant="primary"
				size="small"
				disabled={!localDateSelected}
				on:click={() => {
					if (localDateSelected) {
						visible = false;
						dispatch('datechange', localDateSelected);
					}
				}}
			/>
		</div>
	</div>
</div>

<style>
	.datePicker {
		font-family:
			Rajdhani,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Helvetica,
			Arial,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol';
		position: relative;
		width: 100%;
		height: 100%;
	}
	.datePicker .month-name {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 12px;
		margin: 0 auto;
	}
</style>
