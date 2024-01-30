<script>
	import moment from 'moment';
	import { createEventDispatcher } from 'svelte';
	import { getDateRows, uuid, noop } from './function';

	const dispatch = createEventDispatcher();

	// props
	export let date;
	export let month;
	export let year;
	export let hour;
	export let minute;
	export let isAllowed;
	export let dateRange = [];
	export let isRange;
	export let isDisplayTime;

	let range = { start: '', end: '' };
	let rangeArr = [];
	let tempRangeArr = [];
	let cells = [];
	let selectedDate;
	// local vars to help in render
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// call change date function
	const onChange = (date) => {
		if (date) {
			if (isRange) {
				if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
					dateRange[1] = '';
					cells = cells.map((c) => ({ ...c, isRange: false }));
				}
				if (!range.start || (range.start && range.end)) {
					range.start = new Date(year, month, date);
					range.end = '';
				} else {
					range.end = new Date(year, month, date);
				}

				let tempArr = [range.start, range.end];
				tempArr = tempArr.sort((a, b) => {
					if (a < b) {
						return -1;
					} else if (a === b) {
						return 0;
					} else {
						return 1;
					}
				});
				if (tempArr.length === 2) {
					rangeArr = getDaysArray(tempArr[0], tempArr[1]).slice(1, rangeArr.length - 1);
					cells = cells.map((m) => ({
						...m,
						isRange: rangeArr.includes(m.str)
					}));
				}
				dispatch('datechange', tempArr);
			} else {
				dispatch('datechange', new Date(year, month, date, hour || 0, minute || 0));
			}
		}
	};

	// initiate allowed date
	const allow = (year, month, date) => {
		if (!date || !isAllowed) return true;
		return isAllowed(new Date(year, month, date));
	};

	// initiate date array
	const getDaysArray = (start, end) => {
		let arr = [];
		for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
			arr.push(moment(dt).format('YYYY-MM-DD'));
		}
		return arr;
	};

	const onRange = (r = '', value) => {
		if (
			range[r] &&
			new Date(range[r].getFullYear(), range[r].getMonth(), range[r].getDate()).getTime() ===
				new Date(year, month, value).getTime()
		) {
			return true;
		}
		return false;
	};

	// reset current date
	$: if (!date) {
		month = new Date().getMonth();
		year = new Date().getFullYear();
		// hour = new Date().getHours()
		// minute = new Date().getMinutes()
	} else {
		date = new Date(date);
		month = new Date(date).getMonth();
		year = new Date(date).getFullYear();
		hour = new Date(date).getHours();
		minute = new Date(date).getMinutes();
	}

	$: if (dateRange.length && dateRange[0] && dateRange[1]) {
		range.start = dateRange[0];
		range.end = dateRange[1];
		rangeArr = getDaysArray(dateRange[0], dateRange[1]);
		rangeArr = rangeArr.slice(1, rangeArr.length - 1);
	} else {
		rangeArr = [];
		if (!dateRange.length) {
			range.start = '';
			range.end = '';
		}
	}

	$: cells = getDateRows(month, year).map((c) => ({
		value: c,
		allowed: allow(year, month, c),
		atRange: rangeArr.includes(moment(`${year}-${month + 1}-${c}`).format('YYYY-MM-DD')),
		tempRange: tempRangeArr.includes(new Date(year, month, c).getTime()),
		str: moment(`${year}-${month + 1}-${c}`).format('YYYY-MM-DD')
	}));

	// $: console.log(rangeArr)
	// const isOutMonth = (range = { start: '', end: '' }, value, i) => {
	// 	const { start, end } = range;
	// 	const indexEStart = cells.findIndex((f) => f.str === moment(start).format('YYYY-MM-DD'));
	// 	const indexEnd = cells.findIndex((f) => f.str === moment(end).format('YYYY-MM-DD'));

	// 	if (moment(start).month() !== moment(end).month()) {
	// 		switch (true) {
	// 			case month == moment(start).month():
	// 				if (!value && i > indexEStart) {
	// 					return true;
	// 				}
	// 			case month == moment(end).month():
	// 				if (!value && i < indexEnd) {
	// 					return true;
	// 				}
	// 		}
	// 	}

	// 	return false;
	// };

	const handleInput = (node) => {
		const inputs = node.querySelectorAll('input');

		inputs.forEach((input, idx) => {
			if (hour !== undefined) {
				inputs[0].value = parseInt(hour) < 10 ? `0${hour}` : hour;
			}

			if (minute !== undefined) {
				inputs[1].value = parseInt(minute) < 10 ? `0${minute}` : minute;
			}

			const maxlength = parseInt(input.getAttribute('maxlength'));

			input.addEventListener('click', function () {
				if (idx !== 0 && !inputs[0].value) {
					inputs[0].focus();
				}
			});

			input.addEventListener('keydown', function (e) {
				const { key } = e;
				if (key !== 'Enter' && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
					if (!/[\d]/.test(key)) {
						e.preventDefault();
					}
				}
			});

			input.addEventListener('keyup', function (e) {
				const { key } = e;
				if (key === 'Backspace' && !input.value && idx > 0) {
					inputs[idx - 1].focus();
				} else {
					if (input.value?.length === maxlength) {
						hour = inputs[0].value;
						minute = inputs[1].value;

						if (parseInt(hour) > 24) {
							let h = parseInt(hour) - 24;
							hour = inputs[0].value = h < 10 ? `0${h}` : `${h}`;
						}

						if (parseInt(minute) > 24) {
							let m = parseInt(minute) - 24;
							minute = inputs[1].value = m < 10 ? `0${m}` : `${m}`;
						}

						if (idx < inputs.length - 1) {
							inputs[idx + 1].focus();
						}
						if (date && !selectedDate) {
							selectedDate = new Date(date).getDate();
						}
						if (selectedDate) {
							dispatch('datechange', new Date(year, month, selectedDate, hour || 0, minute || 0));
						}
					}
				}
			});
		});
	};
</script>

<div class="calender-wrapper">
	<div class="row-days">
		<div class="row">
			{#each weekdays as day}
				<div class="cell-day">{day}</div>
			{/each}
		</div>
	</div>

	<div class="row">
		{#each cells as { allowed, value, atRange, tempRange }, i (uuid())}
			<div class="cell-wrapper">
				{#if value}
					<button
						class="cell dt"
						class:same-range={onRange('start', value) &&
							onRange('end', value) &&
							moment(range.start).format('YYYY-MM-DD') === moment(range.end).format('YYYY-MM-DD')}
						class:highlight={allowed && value}
						class:disabled={!allowed}
						class:start={onRange('start', value)}
						class:end={onRange('end', value)}
						class:range={atRange}
						class:range-hover={tempRange}
						class:selected={date &&
							new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() ===
								new Date(year, month, value).getTime()}
						on:click={() => {
							if (allowed && value) {
								onChange(value);
								selectedDate = value;
							}
						}}
					>
						{value || ''}
					</button>
					<!-- {:else}
					<div class="cell dt" style="opacity: 0.3;">
						{i > getMonthStats(month, year).days ? i - getMonthStats(month, year).days : 'c'}
					</div> -->
				{/if}
			</div>
		{/each}
	</div>
	{#if isDisplayTime}
		<div class="time-wrapper">
			<!-- <p>Time</p> -->
			<div class="input-time" use:handleInput>
				<input type="text" maxlength="2" style="width: 64px;" placeholder="Jam" />
				<p>:</p>
				<input type="text" maxlength="2" style="width: 64px;" placeholder="Menit" />
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.calender-wrapper {
		width: 100%;
	}
	.row-days {
		border-top: solid 1px hsl(0, 0%, 75%);
		border-bottom: solid 1px hsl(0, 0%, 75%);
	}
	.row {
		font-size: 14px;
		margin: 0 auto;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}
	.cell-day {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
	}
	.cell-wrapper {
		position: relative;
		height: 32px;
		width: 100%;
		padding: 0.125rem;
	}
	.cell {
		width: 100%;
		height: 100%;
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		transition: 300ms ease;
	}
	.highlight:hover {
		background: var(--primary-container);
		color: var(--primary);
		cursor: pointer;
	}
	.selected,
	.start,
	.end {
		background: var(--primary);
		color: var(--on-primary);
		cursor: pointer;
	}
	.range,
	.range-hover:hover {
		background: var(--primary);
		color: var(--on-primary);
	}
	.disabled {
		cursor: not-allowed;
		opacity: 0.3;
	}
	.selected:hover,
	.start.highlight:hover,
	.end.highlight:hover {
		background: var(--primary);
		color: var(--on-primary);
	}
	.same-range {
		box-shadow: inset 0 0 0 1px var(--primary);
	}
	.time-wrapper {
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		justify-content: center;
		gap: 0.5rem;
		border-top: solid 1px hsl(0, 0%, 75%);
		padding: 6px 12px;
	}
	.time-wrapper input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background: transparent;
		text-align: center;
	}
	.time-wrapper input:focus {
		border: none;
		outline: none;
	}
	.time-wrapper .input-time {
		/* flex items-center */
		display: flex;
		align-items: center;
		padding: 0.125rem;
		border: solid 1px var(--primary-container);
		border-radius: 0.25rem;
	}

	.time-wrapper .input-time:focus-within {
		border: solid 1px var(--primary);
		box-shadow: var(--default-shadow);
	}
</style>
