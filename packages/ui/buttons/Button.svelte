<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let text = 'text button';
  export let size = 'medium'; // xsmall, small, medium, large, xlarge
  export let variant = 'primary'; // primary, secondary, tertiary
  export let customClass = '';
  export let disabled;

  const dispatch = createEventDispatcher();

  let classString = '';
  let classList = [];

  onMount(() => {
    classList = [...classList, `btn-${size}`, `btn-${variant}`];

    classString = classList.join(' ');
  });
</script>

<button
  class="{classString} {customClass}"
  class:btn-disabled={disabled}
  {disabled}
  on:click={() => {
    if (!disabled) {
      dispatch('click');
    }
  }}
>
  <slot>{text}</slot>
</button>

<style>
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    /* height: 2rem; */
    border-radius: 0.75rem;
    border: none;
    font-weight: bold;
  }

  .btn-xsmall {
    padding: 0.125rem 0.25rem;
  }
  .btn-small {
    padding: 0.25rem 0.5rem;
  }
  .btn-medium {
    padding: 0.5rem 1rem;
  }
  .btn-large {
    padding: 0.75rem 1.5rem;
  }
  .btn-xlarge {
    padding: 1rem 2rem;
  }

  .btn-primary {
    background: #000;
    color: #fff;
    border: solid 1px #000;
  }
  .btn-secondary {
    background: #fff;
    color: #000;
    border: solid 1px #000;
  }
  .btn-tertiary {
    background: transparent;
    color: #000;
    border: none;
  }
  .btn-disabled {
    /* background: hsl(0, 0%, 75%); */
    /* color: hsl(0, 0%, 50%); */
    cursor: default;
    opacity: 0.5;
  }
</style>
