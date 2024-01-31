<script>
  import { createEventDispatcher } from 'svelte';

  export let label = '';
  export let labelClass = '';
  export let value = '0';
  export let min = 0;
  export let max = null;
  export let placeholder = '';
  export let wrapperClass = '';
  export let isError;
  export let disabled;

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

<div>
  {#if label}
    <p class="label {labelClass}">{label}</p>
  {/if}
  <div class="input-number-wrapper {wrapperClass}" class:isError class:disabled>
    <button
      {disabled}
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
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2" />
      </svg>
    </button>
    <input
      type="tel"
      {disabled}
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
      {disabled}
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
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"
        />
      </svg>
    </button>
  </div>
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
    box-shadow: var(--default-shadow);
  }
  .isError {
    border: solid 1px var(--error) !important;
  }
  .label {
    font-size: 0.8em;
    font-weight: bold;
    padding: 0.5rem 0.25rem 0.125rem;
    margin: 0;
  }
</style>
