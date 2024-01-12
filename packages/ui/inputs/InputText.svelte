<script>
  export let type = '';
  export let rows = 1;
  export let value = '';
  export let placeholder = 'type something';
  export let label = 'TEXT';
  export let isStacked = true;
  export let border = 'none';
</script>

<label class="input-sizer" class:stacked={isStacked} style="--border={border};">
  {#if label}
    <span>{label}</span>
  {/if}
  {#if type === 'textarea'}
    <textarea
      value={value || ''}
      on:input={(e) => {
        const parent = e.target.parentNode;
        parent.dataset.value = e.target.value;
      }}
      {rows}
      {placeholder}
    ></textarea>
  {:else}
    <input type="text" value={value || ''} {placeholder} />
  {/if}
</label>

<style>
  .input-sizer {
    display: inline-grid;
    vertical-align: top;
    align-items: center;
    position: relative;
    border: solid 1px;
    padding: 0.25em 0.5em;
    margin: 5px;
  }
  .input-sizer.stacked {
    padding: 0.5em;
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
    min-width: 1em;
    grid-area: 1/2;
    font: inherit;
    padding: 0.25em;
    margin: 0;
    resize: none;
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
  }
  .input-sizer span {
    padding: 0.25em;
  }
  .input-sizer::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
  .input-sizer:focus-within {
    outline: solid 1px blue;
    box-shadow: 4px 4px 0px blue;
  }
  .input-sizer:focus-within > span {
    color: blue;
  }
  .input-sizer:focus-within textarea:focus,
  .input-sizer:focus-within input:focus {
    outline: none;
  }

  .input-sizer {
    /* box-shadow: 4px 4px 0px #000; */
  }
  .input-sizer > span {
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: bold;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
  }
</style>
