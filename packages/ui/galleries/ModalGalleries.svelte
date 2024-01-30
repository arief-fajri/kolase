<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { sineOut, quintOut } from 'svelte/easing';

  export let visible;
  export let thumbnails = [];
  export let previewIndex = 0;

  let windowHeight, windowWidth;

  const fade = (_, { delay = 0, duration = 300 }) => ({
    duration,
    delay,
    easing: sineOut,
    css: (t) => `opacity: ${t};`
  });

  const grow = (_) => {
    return {
      duration: 200,
      easing: sineOut,
      css: (t) => `transform: translate(-50%, -50%) scale(${t}); opacity: ${t}`
    };
  };

  $: if (visible && browser) {
    document.body.style.overflow = 'hidden';
    document.body.style.userSelect = 'none';
  } else {
    if (browser) {
      document.body.style.overflow = 'auto';
      document.body.style.userSelect = 'auto';
    }
  }

  let Carousel;
  onMount(async () => {
    Carousel = (await import('$lib/components/carousel/components/Carousel/Carpusel.svelte'))
      .default;
  });
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

{#if visible}
  <div class="overlay" in:fade out:fade={{ delay: 200 }} />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="panel-wrapper"
    on:click={(e) => {
      if (!e.target.classList.contains('stay')) {
        visible = false;
      }
    }}
    style="width: {windowWidth}px; height: {windowHeight}px"
    transition:grow
  >
    <svelte:component
      this={Carousel}
      arrows={true}
      dots={true}
      bind:initialPageIndex={previewIndex}
      bind:currentPageIndex={previewIndex}
    >
      {#each thumbnails as item}
        <div
          class="relative flex items-center justify-center"
          style="height: {windowHeight - 48}px; margin-top: 48px; user-select: none;"
        >
          <div class="view overflow-hidden" style="user-select: none;">
            <img
              src={item.src}
              alt=""
              class="w-full h-full object-center object-contain stay"
              style="-webkit-user-drag: none"
            />
          </div>
        </div>
      {/each}

      <div slot="dots" class="dots" let:currentPageIndex let:pagesCount let:showPage>
        {#each { length: pagesCount } as item, pageIndex (pageIndex)}
          <button
            class="w-full h-[4px] rounded-full dot stay"
            aria-label={`dot-${pageIndex + 1}`}
            class:isActive={currentPageIndex === pageIndex}
            on:click={() => {
              showPage(pageIndex);
            }}
          >
          </button>
        {/each}
      </div>

      <div slot="prev" let:showPrevPage>
        <button class="btn-prev stay" on:click={showPrevPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            class="stay"
          >
            <path
              fill="currentColor"
              class="stay"
              d="M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41a1 1 0 0 1-.72.29"
            />
          </svg>
        </button>
      </div>
      <div slot="next" let:showNextPage>
        <button class="btn-next stay" on:click={showNextPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            class="stay"
          >
            <path
              fill="currentColor"
              class="stay"
              d="M10.5 17a1 1 0 0 1-.71-.29a1 1 0 0 1 0-1.42L13.1 12L9.92 8.69a1 1 0 0 1 0-1.41a1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32"
            />
          </svg>
        </button>
      </div>
    </svelte:component>

    <button
      class="btn-close"
      on:click={() => {
        visible = false;
      }}
    >
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
          />
        </svg>

        <p style="white-space: nowrap;" class="line-clamp-1">
          {thumbnails[previewIndex].title || 'Keluar'}
        </p>
      </div>
    </button>
  </div>
{/if}

<style>
  .dots {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 100%;
    padding: 1rem;
    z-index: 10;
  }
  .dot {
    background: hsl(0, 0%, 50%);
  }
  .dot.isActive {
    background: var(--primary-color);
  }

  .btn-close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 50%;
    transform: translate(-50%, 75%);
    color: hsl(0, 0%, 80%);
  }
  .btn-close:hover {
    color: var(--primary-color);
  }
  .btn-next,
  .btn-prev {
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 200ms ease;
    top: 50%;
    background: var(--primary-color);
    z-index: 10;
  }
  .btn-prev:hover,
  .btn-next:hover {
    background: var(--primary-text);
    color: white;
    box-shadow: none;
  }
  .btn-prev {
    left: 0;
    transform: translate(50%, -50%);
  }
  .btn-next {
    right: 0;
    transform: translate(-50%, -50%);
  }
  .view {
    height: 100%;
    /* width: 100%; */
  }
  .panel-wrapper {
    position: fixed;
    transition: 0.3s ease-in-out;
    z-index: 1000;
    /* width: 100vw;
    height: 100vh; */
    /* background: white; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }

  @media only screen and (max-width: 720px) {
    .btn-prev,
    .btn-next {
      display: none;
    }
  }
</style>
