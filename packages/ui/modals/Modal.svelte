<script>
  import { sineOut, quintOut } from 'svelte/easing';

  export let visible = false;
  export let position = 'center'; // center, top, bottom, left, right
  export let preventClose;
  export let bgPanel = '#FFFFFF';
  export let showCloseButton = true;

  export let wrapperClass = '';

  let windowHeight, windowWidth;

  const fade = (_, { delay = 0, duration = 300 }) => ({
    duration,
    delay,
    easing: sineOut,
    css: (t) => `opacity: ${t};`
  });

  const grow = (_) => {
    switch (position) {
      case 'center':
        return {
          duration: 200,
          easing: sineOut,
          css: (t) => `transform: translate(-50%, -50%) scale(${t}); opacity: ${t}`
        };
      case 'bottom':
        return {
          duration: 200,
          easing: sineOut,
          css: (t, u) => `bottom: -${u * 100}%;`
        };
      case 'top':
        return {
          duration: 200,
          easing: sineOut,
          css: (t, u) => `top: -${u * 100}%;`
        };
      case 'left':
        return {
          duration: 200,
          easing: sineOut,
          css: (t, u) => `left: -${u * 100}%;`
        };
      case 'right':
        return {
          duration: 200,
          easing: sineOut,
          css: (t, u) => `right: -${u * 100}%;`
        };
    }
  };

  const getPanelStyle = () => {
    let style = [];
    switch (position) {
      case 'center':
        style = [
          'top: 50%',
          'left: 50%',
          'transform: translate(-50%, -50%)',
          'border-radius: 12px'
        ];
        return style.join(';');
      case 'bottom':
        style = [
          'bottom: 0',
          'left: 0',
          'right: 0',
          'width: 100%',
          'border-top-left-radius: 12px',
          'border-top-right-radius: 12px'
        ];
        return style.join(';');
      case 'top':
        style = [
          'top: 0',
          'left: 0',
          'right: 0',
          'width: 100%',
          'border-bottom-left-radius: 12px',
          'border-bottom-right-radius: 12px'
        ];
        return style.join(';');
      case 'left':
        style = ['top: 0', 'bottom: 0', 'left: 0'];
        return style.join(';');
      case 'right':
        style = ['top: 0', 'bottom: 0', 'right: 0'];
        return style.join(';');
    }
  };
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="overlay"
    in:fade
    out:fade={{ delay: 200 }}
    on:click={() => {
      if (!preventClose) {
        visible = false;
      }
    }}
  />
  <div
    class="panel-wrapper {wrapperClass}"
    style="background: {bgPanel}; {getPanelStyle()}"
    transition:grow
  >
    <div class="panel-header">
      <slot name="header">
        <div>INI HEADER</div>
      </slot>
      {#if showCloseButton}
        <button
          class="close-button"
          on:click={() => {
            visible = false;
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
            /></svg
          >
        </button>
      {/if}
    </div>
    <slot />
  </div>
{/if}

<style lang="postcss">
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
  }
  .close-button {
    padding: 0;
    border: none;
    border-radius: 9999px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .panel-wrapper {
    position: fixed;
    transition: 0.3s ease-in-out;
    z-index: 1000;
    max-height: 100vh;
    max-width: 100vw;
    /* overflow: auto; */
    min-width: 320px;
    min-height: 4rem;
    padding: 12px;
  }
  .overlay {
    background-color: rgba(55, 53, 60, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
</style>
