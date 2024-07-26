<script lang="ts">
  import { onMount } from "svelte";

  export let delayTime: number = 0; // デフォルトの遅延時間を0に設定
  export let isDelay: boolean = false; // デフォルトの遅延をfalseに設定

  let isRendered = false;

  onMount(() => {
    if (isDelay) {
      setTimeout(() => (isRendered = true), delayTime);
    } else {
      isRendered = true;
    }
  });
</script>

{#if isRendered}
  <div class="fade-in-up">
    <slot />
  </div>
{/if}

<style lang="scss">
  .fade-in-up {
    animation: fadeInUp 0.5s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
