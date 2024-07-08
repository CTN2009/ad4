<script lang="ts">
  import { fade } from "svelte/transition";
  import Button from "@components/Button.svelte";

  export let show: boolean;
  export let confirmBtnText: string = "";
  export let errorMessage: string = "";
  export let hasError: boolean = false;

  const close = () => (show = hasError);

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
    <div class="contents" data-simplebar data-simplebar-auto-hide="false">
      <div class="title">
        <slot name="itemName" />
      </div>

      <div class="body">
        <slot name="selectionContent" />
      </div>

      <div>
        {#if hasError}
          <div class="errorMessage">{errorMessage}</div>
        {/if}
        <!-- <div class="actions">
          <Button type="button" on:click={close}>{confirmBtnText}</Button>
        </div> -->
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
    padding: 30px 25px;
    background: #fff;
    display: grid;
    grid-template-rows: auto 1fr auto;
    pointer-events: auto;
    min-width: 240px;
    width: 400px;
    height: 80vh;
    position: relative;
  }
  @media (max-width: 800px) {
    .contents {
      width: 90vw;
    }
  }

  @media (max-height: 700px) {
    .contents {
      height: 95dvh;
    }
  }

  .title {
    text-align: center;
    font-size: 16px;
    line-height: 1.2;
  }
  .body {
    margin-top: 16px;
    margin-bottom: 20px;
    overflow: auto;
  }

  .errorMessage {
    color: red;
    text-align: center;
    font-weight: bold;
  }
</style>
