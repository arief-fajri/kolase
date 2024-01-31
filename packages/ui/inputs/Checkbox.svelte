<script>
  import { onMount } from 'svelte';

  export let name = 'checkbox';
  export let label = '';
  export let rtl = false;
  export let checked = false;
  export let size = 'medium';
  export let disabled = false;

  // Constants
  const sizeValues = {
    small: '.75',
    medium: '1',
    large: '1.25'
  };

  // Event handlers
  const handleInput = (event) => {
    const target = event.target;
    checked = target.checked;
  };
</script>

<div class="'checkbox-container'">
  <label class="label" class:rtl>
    <input type="checkbox" {disabled} {checked} {name} on:change={handleInput} {...$$restProps} />
    <span class="checkmark" style="transform: scale({sizeValues[size]})" />
    <slot name="label">
      {#if label}
        <p>{label}</p>
      {/if}
    </slot>
  </label>
</div>

<style lang="postcss">
  .checkbox-container {
    display: flex;
    align-items: center;
  }

  .label {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /* margin-right: 1rem; */
    font-size: 1rem;
    cursor: pointer;
  }

  .rtl {
    flex-direction: row-reverse;
  }

  .label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  .label input:disabled {
    visibility: hidden;
  }

  .checkmark {
    position: relative;
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: transparent;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  }

  .checkmark::before {
    content: '';
    position: absolute;
    display: none;
    left: 0.25em;
    width: 1em;
    height: 0.5em;
    border: solid rgb(129, 129, 129);
    border-width: 0 0.3em 0.2em 0;
    transform: rotate(130deg) scaleY(-1);
  }

  .label input:checked ~ .checkmark::before {
    display: block;
  }

  .label:hover input:not(:disabled) ~ .checkmark {
    border-color: #000;
  }

  .label:hover input:not(:disabled) ~ .checkmark::before {
    border-color: inherit;
    filter: brightness(0.5);
  }

  .label input:disabled ~ .checkmark {
    opacity: 0.5;
  }
</style>
