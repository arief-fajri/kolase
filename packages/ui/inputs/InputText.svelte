<script>
  import { createEventDispatcher } from 'svelte';

  export let type = '';
  export let value = '';
  export let placeholder = 'type something';
  export let label = '';
  export let border = 'solid 1px';
  export let focusColor = 'rgb(167 139 250)';
  export let disabledColor = '#aaa';
  export let labelClass = '';
  export let inputClass = '';
  export let wrapperClass = '';
  export let disabled = true;

  let localType = '';
  let firstLoad;

  if (['text', 'email', 'password', 'search', 'tel', 'url'].includes(type)) {
    localType = type || 'text';
  }

  $: if (value && !firstLoad) {
    firstLoad = true;
    if (type === 'number') {
      value = value.toLocaleString('id-ID');
    }
  }

  const dispatch = createEventDispatcher();

  const handleInput = (e) => {
    const { value: _value } = e.target;

    let newValue = value;

    if (type === 'number') {
      let input = _value.replace(/[\D\s\._\-]+/g, '');
      input = input ? parseInt(input, 10) : 0;
      newValue = input.toLocaleString('id-ID');
    } else {
      newValue = _value;
    }

    value = newValue;
    dispatch('input', newValue);
  };
</script>

<label
  class="input-container {wrapperClass}"
  style="--border:{border}; --focus-color: {focusColor}; --disabled-color: {disabledColor};"
>
  {#if label}
    <p class="label {labelClass}">{label}</p>
  {/if}
  <div class="input-wrapper" class:disabled>
    <slot name="prefix">
      <p style="margin: 0;">Rp</p>
    </slot>
    <input
      type={localType}
      class={inputClass}
      value={value || ''}
      {placeholder}
      {disabled}
      on:keyup={handleInput}
      on:keydown={(e) => {
        const { key } = e;
        if (key !== 'Enter' && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
          if (!/[\d]/.test(key) && type === 'number') {
            e.preventDefault();
          }
        }
      }}
    />
    <slot name="suffix">
      <p style="margin: 0;">%</p>
    </slot>
  </div>
</label>

<style>
  .input-container {
    width: 100%;
  }
  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /* width: 100%; */
    font: inherit;
    padding: 0 12px;
    height: 34px;
    border: var(--border);
    border-radius: 0.25rem;
  }
  .input-wrapper input {
    width: 100%;
    padding: 0;
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
  }
  .input-wrapper:focus-within {
    outline: none;
    border-color: var(--focus-color);
    box-shadow: 0px 0px 10px -2px var(--focus-color);
  }
  .input-wrapper:focus-within input:focus {
    outline: none;
  }
  .label {
    font-size: 0.8em;
    font-weight: bold;
    padding: 0.5rem 0.25rem;
    margin: 0;
  }
  .input-wrapper.disabled {
    background: var(--disabled-color);
    opacity: 0.5;
  }
</style>
