<script lang="ts">
  import { actionWaitTime } from "@consts/consts";
  import { onMount } from "svelte";

  //export let delayTime: number = actionWaitTime;
  export const delayTime: number = actionWaitTime;

  let isRendered = false;

  export const isDelay:boolean = false;

  // スクロールがずれるためデフォルトではDelayなくす
  onMount( () => {
    if( isDelay ){
      setTimeout( () => (isRendered = true), delayTime );
    }
    else{
      isRendered = true;
    }
  });
  // onMount(
  //   () => setTimeout(
  //     () => (isRendered = true), delayTime
  //   )
  // );
</script>

{#if isRendered}
  <div class="fade-in-up">
    <slot />
  </div>
{/if}

<!-- DelayedDisplay.svelte -->
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
