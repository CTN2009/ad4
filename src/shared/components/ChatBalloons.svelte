<script lang="ts">
  import { customerDisplayValue } from "@consts/consts";

  export let variant: "customer" | "user" = "customer";
  export let showIcon: boolean = true;
  export let width: "fit-content" | "100%" = "fit-content";
  

  let isShowMessage = false;
  setTimeout(() => (isShowMessage = true), variant == "customer" ? 750 : 250);
</script>

<div class="box" data-variant={variant} data-show-icon={showIcon}>
  <div>
    {#if variant === "customer"}
      <div class="label">{customerDisplayValue}遠藤</div>
    {/if}
    <div class="item" style="width: {width};">
      {#if isShowMessage}
        <p><slot /></p>
      {:else}
        <div class="typing-indicator">
          <span data-variant={variant}></span>
          <span data-variant={variant}></span>
          <span data-variant={variant}></span>
        </div>
      {/if}
    </div>
  </div>
</div>


<style lang="scss">
  .box {
    .item {
      font-size: 16px;
      border-radius: 8px;
      padding: 12px;
      position: relative;
    }
    &[data-variant="customer"] {
      background-color: transparent;
      display: grid;
      column-gap: 20px;
      grid-template-columns: 52px 1fr;
      &::before {
        content: "";
        display: block;
        height: 52px;
        width: 52px;
        background-color: transparent;
        border-radius: 50% 50%;
        overflow: hidden;
        margin-block-start: 24px;
      }
      .label {
        color: #000;
        font-size: 12px;
        margin-block-end: 4px;
      }
      .item {
        background-color: #fff;
        border: var(--ctn-border);
        &::before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          position: absolute;
          top: 10px;
          left: -14px;
          background-image: url(../image/fukidashikuchi_customer.webp);
          background-size: cover;
        }
      }
    }
    &[data-show-icon="true"] {
      &::before {
        background-image: url(../image/operator_icon.webp);
        background-size: cover;
      }
    }
    &[data-variant="user"] {
      display: grid;
      justify-content: end;
      padding-inline-end: 15px;
      .item {
        background-color: var(--ctn-secondary);
        border: var(--ctn-secondary);
        border-radius: var(--ctn-radius);
        color: #fff;
        padding: 10px 20px;
        position: relative;

        &::before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          position: absolute;
          top: 10px;
          right: -14px;
          background-image: url(../image/fukidashikuchi_user.webp);
          background-size: cover;
        }
      }
    }
  }

  // memo: .boxが続いた時の余白設定
  :global(.box + .box),
  .box[data-show-icon="false"] {
    margin-top: 1rem;
  }

  .typing-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    width: 50px;
  }

  .typing-indicator span {
    display: block;
    width: 8px;
    height: 8px;
    &[data-variant="customer"] {
      background-color: gray;
    }
    &[data-variant="user"] {
      background-color: darken(white, 15%);
    }
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .typing-indicator span:nth-child(1) {
    animation-delay: -0.32s;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
</style>
