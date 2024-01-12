<script>
  import { createEventDispatcher } from 'svelte';

  export let type = '';
  export let rows = 1;
  export let value = '';
  export let placeholder = 'type something';
  export let label = 'TEXT';
  export let isStacked = true;
  export let border = 'solid 1px';
  export let focusColor = 'rgb(167 139 250)';
  export let fixedHeigh;
  export let labelClass = '';
  export let inputClass = '';
  export let wrapperClass = '';

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
    if (!fixedHeigh) {
      const parent = e.target.parentNode;
      parent.dataset.value = e.target.value;
    }

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
  class="input-sizer {wrapperClass}"
  class:stacked={isStacked}
  style="--border:{border}; --focus-color: {focusColor};"
>
  {#if label}
    <span class="label {labelClass}">{label}</span>
  {/if}
  {#if type === 'textarea'}
    <textarea class={inputClass} value={value || ''} on:input={handleInput} {rows} {placeholder}
    ></textarea>
  {:else}
    <input
      type={localType}
      class={inputClass}
      value={value || ''}
      {placeholder}
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
  {/if}
</label>

<style>
  .input-sizer {
    display: inline-grid;
    vertical-align: top;
    position: relative;
    width: 100%;
  }
  .input-sizer.stacked {
    align-items: stretch;
  }
  .input-sizer.stacked::after,
  .input-sizer.stacked input,
  .input-sizer.stacked textarea {
    grid-area: 2/1;
  }
  .input-sizer::after,
  .input-sizer input,
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
    border: var(--border);
    border-radius: 0.25rem;
  }
  .input-sizer::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
  .input-sizer:focus-within textarea:focus,
  .input-sizer:focus-within input:focus {
    outline: none;
    border-color: var(--focus-color);
    box-shadow: 0px 0px 10px -2px var(--focus-color);
  }
  .input-sizer > .label {
    /* font-size: 0.8rem; */
    /* font-weight: bold; */
    padding: 0.25rem;
  }
</style>
