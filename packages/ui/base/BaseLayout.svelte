<script>
  let innerHeight, innerWidth;
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div
  class="app-layout"
  style:--h={innerHeight ? `${innerHeight}px` : '100vh'}
  style:--w={innerWidth ? `${innerWidth}px` : '100vw'}
>
  <div class="app-body">
    <slot />
  </div>
</div>

<style lang="postcss">
  .app-layout {
    position: fixed;
    display: flex;
    width: 100vw;
    height: 100vh;
    width: var(--w);
    height: var(--h);
    user-select: none;
  }
  .app-body {
    flex-grow: 1;
    min-width: 0;
    height: 100%;
    display: flex;
    align-items: stretch;
  }
</style>
