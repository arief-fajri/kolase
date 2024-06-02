<script>
  import { createEventDispatcher } from 'svelte';

  export let center = false;

  const dispatch = createEventDispatcher();

  let classes = '';
  export { classes as class }; // export reserved keyword
</script>

<div
  class="page-wrapper {classes}"
  class:center-content={center}
  on:scroll={(e) => {
    dispatch('scroll', e.target);
  }}
>
  <main class="page-content">
    <slot />
  </main>

  <footer class="page-footer">
    <slot name="footer" />
  </footer>
</div>

<style lang="postcss">
  .page-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-gutter: stable;
    position: relative;
  }
  :global(.overlay-active .page-wrapper) {
    overflow-y: hidden;
  }
  .page-wrapper.center-content .page-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
