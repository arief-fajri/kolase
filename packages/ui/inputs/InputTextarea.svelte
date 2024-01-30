<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let rows = 4;
	export let value = '';
	export let placeholder = 'type something';
	export let label = '';
	export let fixedHeigh = true;
	export let maxHeight = null;
	export let labelClass = '';
	export let inputClass = '';
	export let wrapperClass = '';
	export let disabled;
	export let autoFocus = false;
	export let maxLength = null;
	export let isError = false;
	export let message = '';

	let inputComp;

	const dispatch = createEventDispatcher();

	const handleInput = (e) => {
		const parent = e.target.parentNode;
		if (!fixedHeigh) {
			parent.dataset.value = e.target.value;
		}

		const { value: _value } = e.target;

		value = _value;
		dispatch('input', _value);
	};

	onMount(() => {
		if (autoFocus) {
			inputComp.focus();
		}
	});
</script>

<div style="width:100%;" class:isError>
	<label class="input-sizer stacked {wrapperClass}">
		{#if label}
			<span class="label {labelClass}">{label}</span>
		{/if}
		<textarea
			bind:this={inputComp}
			class={inputClass}
			class:disabled
			on:input={handleInput}
			on:keydown={(e) => {
				const { key } = e;
				if (key !== 'Enter' && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
					if (value && maxLength && value.length >= maxLength) {
						e.preventDefault();
					}
				}
			}}
			style={maxHeight ? `max-height: ${maxHeight}px` : ''}
			{rows}
			{placeholder}
			{disabled}
			value={value || ''}
		/>
	</label>
	{#if isError && message}
		<p class="message" transition:slide>{message || ''}</p>
	{/if}
</div>

<style>
	.input-sizer {
		display: grid;
		vertical-align: top;
		position: relative;
		width: 100%;
	}
	.input-sizer.stacked {
		align-items: stretch;
	}
	.input-sizer.stacked::after,
	.input-sizer.stacked textarea {
		grid-area: 2/1;
		/* max-height: 100px; */
	}
	.input-sizer::after,
	.input-sizer textarea {
		width: auto;
		min-width: 1rem;
		grid-area: 1/2;
		font: inherit;
		padding: 6px 10px;
		resize: none;
		background: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border: solid 1px var(--surface-container);
		border-radius: 0.5rem;
	}
	.input-sizer::after {
		content: attr(data-value) ' ';
		visibility: hidden;
		white-space: pre-wrap;
	}
	.input-sizer:focus-within textarea:focus {
		border: solid 1px var(--primary);
		box-shadow: var(--default-shadow);
		outline: none;
	}
	.input-sizer > span {
		font-size: 0.8em;
		font-weight: 600;
		padding: 0.5rem 0.25rem;
		margin: 0;
	}
	.input-sizer .disabled {
		background: var(--disabled);
		opacity: 0.5;
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

	.isError textarea {
		border: solid 1px var(--error) !important;
	}
</style>
