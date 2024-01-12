<script>
  import { createEventDispatcher } from 'svelte';

  export let rows = 1;
  export let value = '';
  export let placeholder = 'type something';
  export let label = 'LABEL';
  export let border = 'solid 1px';
  export let focusColor = 'rgb(167 139 250)';
  export let disabledColor = '#aaa';
  export let fixedHeigh = false;
  export let maxHeight = '4rem';
  export let labelClass = '';
  export let inputClass = '';
  export let wrapperClass = '';
  export let disabled;

  let inputComp;

  const dispatch = createEventDispatcher();

  const handleInput = (e) => {
    const parent = e.target.parentNode;
    parent.dataset.value = e.target.value;

    if (fixedHeigh) {
      inputComp.style.maxHeight = maxHeight;
    }

    const { value: _value } = e.target;

    value = _value;
    dispatch('input', _value);
  };
</script>

<label
  class="input-sizer stacked {wrapperClass}"
  style="--border:{border}; --focus-color: {focusColor}; --disabled-color: {disabledColor};"
>
  {#if label}
    <span class="label {labelClass}">{label}</span>
  {/if}
  <textarea
    bind:this={inputComp}
    class={inputClass}
    class:disabled
    on:input={handleInput}
    {rows}
    {placeholder}
    {disabled}>{value || ''}</textarea
  >
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
  .input-sizer.stacked textarea {
    grid-area: 2/1;
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
    border: var(--border);
    border-radius: 0.25rem;
  }
  .input-sizer::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
  .input-sizer:focus-within textarea:focus {
    border-color: var(--focus-color);
    box-shadow: 0px 0px 10px -2px var(--focus-color);
    outline: none;
  }
  .input-sizer > span {
    font-size: 0.8em;
    font-weight: 600;
    padding: 0.5rem 0.25rem;
    margin: 0;
  }
  .input-sizer .disabled {
    background: var(--disabled-color);
    opacity: 0.5;
  }
</style>
