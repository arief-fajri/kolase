<script>
  import DragLine from './Dragline.svelte';

  let classes = 'border-r';
  export { classes as class }; // export reserved keyword

  export let collapse;
  export let collapseWidth = '0';
  export let isDraggable;
  export let dragPosition = 'left';
  export let minDragWidth = 320;
  export let maxDragWidth = '40%';

  let initialWidth;

  let sidebarWidth = null;

  let sidebarElem;

  $: if (sidebarWidth && sidebarElem) {
    if (['left', 'right'].includes(dragPosition)) {
      const newWidth = sidebarWidth.replace('px', '');
      if (Number(newWidth) > minDragWidth) {
        sidebarElem.style.width = sidebarWidth;
      }
    }
    // localStorage.setItem(widthStorageKey, sidebarWidth);
  }
</script>

<aside
  bind:this={sidebarElem}
  class="page-sidebar {classes} {maxDragWidth}"
  style="{maxDragWidth ? `max-width: ${maxDragWidth};` : ''}{collapse
    ? `width: ${collapseWidth};`
    : ''}"
>
  <slot />
  {#if isDraggable}
    <div class="draggable {dragPosition}">
      <DragLine
        on:dragstart={() => {
          if (['left', 'right'].includes(dragPosition)) {
            initialWidth = sidebarElem.offsetWidth;
          }
        }}
        on:dragging={(e) => {
          if (dragPosition === 'left') {
            sidebarWidth = initialWidth - e.detail.diffX + 'px';
          } else if (dragPosition === 'right') {
            sidebarWidth = initialWidth + e.detail.diffX + 'px';
          }
        }}
        on:dragstop={() => {
          window.dispatchEvent(new Event('resize'));
        }}
      >
        <slot name="dragline">
          <div
            class="absolute top-1/2 -translate-x-1/2 -tranlate-y-1/2"
            style={dragPosition === 'left' ? 'left: calc(50% - 4px);' : 'right: calc(-50% - 4px);'}
          >
            <div class="px-[2.5px] py-1.5 bg-white border rounded relative">
              <div class="w-[1px] h-[28px]" />
            </div>
          </div>
        </slot>
      </DragLine>
    </div>
  {/if}
</aside>

<style lang="postcss">
  .page-sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    width: 321px;
  }
  .draggable {
    position: absolute;
    top: 0;
    width: 8px;
    height: 100%;
    /* background: inherit; */
    transition: 0.3s;
    z-index: 10;
    user-select: none;
  }
  .draggable:hover {
    /* background: currentColor; */
  }
  .draggable.left {
    left: 0;
  }
  .draggable.right {
    right: 0;
  }
</style>
