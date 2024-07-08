<script lang="ts">
  import { fade } from "svelte/transition";
  export let show: boolean;
  export let hasError: boolean = false;

  const close = () => {
    show = hasError;
  };

  $: {
    // 背景のスクロールを停止する
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }
</script>

{#if show}
  <div class="overlay"></div>
  <div class="modal" transition:fade>
    <div class="contents">
      <div class="body">
        <button class="close-button" on:click={close}>X</button>
        <slot name="selectionContent" />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  :global(.no-scroll) {
    overflow: hidden;
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9998;
  }

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* allow click-through to backdrop */
    pointer-events: none;
    z-index: 9999;
  }
  .contents {
    box-sizing: border-box;
    border-radius: var(--ctn-modal-radius);
    padding: 10px 10px;
    background: #fff;

    pointer-events: auto;
    min-width: 240px;
    width: 450px;
    height: 10vh;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .body {
    margin-top: 0px;
    margin-bottom: 10px;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Ensure content fills the body */
  }

  @media (max-width: 800px) {
    .contents {
      width: 90vw;
      font-size: 12px;
    }
    .contents {
      height: 10dvh;
    }
    .close-button {
      font-size: 12px;
    }
  }

  @media (max-height: 700px) {
    .contents {
      height: 10dvh;
    }
  }
</style>
