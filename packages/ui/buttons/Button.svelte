<script>
  import { createEventDispatcher } from 'svelte';

  export let text = 'text button';
  export let size = 'medium'; // textOnly, xsmall, small, medium, large, xlarge
  export let variant = 'primary'; // primary, secondary, tertiary, tab, menu, tag
  export let isActive = false;
  export let isSelected = false;
  export let isFullRounded = false;
  export let customClass = '';
  export let disabled;
  export let processing;

  const dispatch = createEventDispatcher();
</script>

<button
  class="btn {size} {variant} {customClass} relative"
  class:disabled
  class:isActive
  class:isSelected
  class:isFullRounded
  data-text={text}
  {disabled}
  on:click={() => {
    if (!disabled || !processing) {
      dispatch('click');
    }
  }}
>
  {#if processing}
    <slot name="processing">
      <p style="white-space: nowrap;">memproses...</p>
    </slot>
  {:else}
    <slot>
      <p style="white-space: nowrap;">{text}</p>
    </slot>
  {/if}
</button>

<style>
  .btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    line-height: 1.375rem;
    transition: 0.3s ease;
    position: relative;
  }
  /*SIZE*/
  .xsmall {
    padding: 0.125rem 0.5rem;
  }
  .small {
    padding: 0.25rem 1rem;
  }
  .medium {
    padding: 0.5rem 2rem;
  }
  .large {
    padding: 0.75rem 3rem;
  }
  .xlarge {
    padding: 1rem 4rem;
  }

  /* VARIANT */
  .btn.primary {
    color: var(--on-primary);
    background: var(--primary);
  }
  .btn.primary:hover {
    background: var(--primary-container);
    color: var(--primary);
  }

  .btn.secondary {
    background: var(--on-primary);
    color: var(--primary);
    box-shadow: inset 0 0 0 2px var(--primary);
  }
  .btn.secondary:hover {
    background: var(--primary-container);
  }

  .btn.tertiary {
    background: transparent;
    color: var(--primary);
  }
  .btn.tertiary:hover {
    background: var(--primary-container);
  }

  .btn.tab {
    box-shadow: inset 0 0 0 1px var(--primary-container);
    color: var(--primary);
  }
  .btn.tab:hover {
    background: var(--primary-container);
  }

  .btn.label {
    background: var(--primary-container);
    color: var(--primary);
  }
  .btn.label:hover {
    box-shadow: none;
    color: var(--on-primary);
    background: var(--primary);
  }

  .btn.textOnly {
    color: var(--primary);
    padding: 0 !important;
    text-shadow:
      -0.25px -0.25px 0 transparent,
      0.25px 0.25px transparent;
  }
  .btn.textOnly:hover {
    text-shadow:
      -0.25px -0.25px 0 var(--primary),
      0.25px 0.25px var(--primary);
  }

  .btn.danger {
    background: var(--error);
    color: var(--on-error);
  }
  .btn.danger:hover {
    box-shadow: inset 0 0 0 2px var(--error);
    color: var(--error);
    background: var(--surface);
  }

  .btn.isActive:hover,
  .btn.isSelected:hover,
  .btn.isActive,
  .btn.isSelected {
    box-shadow: none;
    color: var(--on-primary);
    background: var(--primary);
    cursor: default;
  }

  .btn.disabled:hover,
  .btn.disabled.isActive,
  .btn.disabled {
    background: var(--disabled) !important;
    color: var(--on-disabled) !important;
    cursor: default;
    border: none;
    box-shadow: none;
    text-shadow: none;
  }
  .btn.textOnly.disabled {
    background: transparent !important;
  }

  .isFullRounded {
    border-radius: 9999px !important;
  }
</style>
