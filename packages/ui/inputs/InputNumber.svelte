<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import convertInt from '$lib/helpers/convert-int';

	export let value = '0';
	export let min = 0;
	export let max = null;
	export let placeholder = '';
	export let wrapperClass = '';

	export let isError;

	// let input = _value.replace(/[\D\s\._\-]+/g, '');
	// 		input = input ? parseInt(input, 10) : 0;
	// 		newValue = input.toLocaleString('id-ID');

	const dispatch = createEventDispatcher();

	const handleInput = (e) => {
		const { value: _value } = e.target;

		let newValue = value;

		let input = _value.replace(/[\D\s\._\-]+/g, '');
		input = input ? parseInt(input, 10) : 0;
		newValue = input.toLocaleString('id-ID');

		if ((max && input > max) || (min && input < min)) isError = true;

		value = newValue;
		dispatch('input', newValue);
	};
</script>

<div class="input-number-wrapper {wrapperClass}" class:isError>
	<button
		on:click={() => {
			let newValue = value;
			let input = value.replace(/[\D\s\._\-]+/g, '');
			input = input ? parseInt(input, 10) : 0;
			if (min !== null && input <= min) return;
			input--;
			newValue = input.toLocaleString('id-ID');

			value = newValue;
			dispatch('input', newValue);
		}}
	>
		<div>
			<Icon icon="eva:minus-fill" />
		</div>
	</button>
	<input
		type="tel"
		{value}
		{placeholder}
		on:keyup={handleInput}
		on:keydown={(e) => {
			isError = false;
			const { key } = e;
			if (key !== 'Enter' && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
				if (!/[\d]/.test(key)) {
					e.preventDefault();
				}
			}
		}}
	/>
	<!-- class="rounded-full flex-none border border-base-soft flex items-center justify-center" -->
	<button
		on:click={() => {
			let newValue = value;
			let input = value.replace(/[\D\s\._\-]+/g, '');
			input = input ? parseInt(input, 10) : 0;
			if (max !== null && input >= max) return;
			input++;
			newValue = input.toLocaleString('id-ID');

			value = newValue;
			dispatch('input', newValue);
		}}
	>
		<div>
			<Icon icon="eva:plus-fill" />
		</div>
	</button>
</div>

<style>
	input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background: transparent;
		text-align: center;
		width: 100%;
	}
	input:focus {
		/* border: none; */
		outline: none;
	}
	.input-number-wrapper {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		width: 100%;
		font: inherit;
		padding: 0 0.25rem;
		height: 34px;
		border: solid 1px var(--surface-container);
		border-radius: 0.5rem;
	}
	.input-number-wrapper button {
		width: 24px;
		height: 24px;
		flex: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.input-number-wrapper:focus-within {
		outline: none;
		border: solid 1px var(--primary);
		box-shadow: var(--primary);
	}
	.isError {
		border: solid 1px var(--error) !important;
	}
</style>
