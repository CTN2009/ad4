<script lang="ts">
  import { onMount } from "svelte";
  import { allInputCount } from "@consts/consts";

  export let compliedCount = 0;

  let progress = 0;
  let leftPosition = "0";
  let carIconElement: HTMLDivElement;
  let carIconWidthRem = 3.5; // 車アイコンの幅（rem） モバイルサイズを初期値とします

  $: progress = (100 / allInputCount) * compliedCount + 8;
  // 進捗に基づいて車の位置を計算する
  $: leftPosition = calcProgress(progress);

  const calcProgress = (currentProgress: number): string => {
    if (currentProgress === 0) {
      return `-${carIconWidthRem * 0.3}rem`;
    }
    // 車位置と進捗バーとの相対位置を計算
    let adjustedProgress =
      currentProgress - (carIconWidthRem / 2 / allInputCount) * 100;
    return `calc(${adjustedProgress}% + ${carIconWidthRem / 2}rem)`;
  };

  // 車アイコンのwidthを取得します。これはmediaQueryでのstyle切り替え対応のためです。
  const getCarIconSize = () => {
    const iconRect = carIconElement.getBoundingClientRect();
    carIconWidthRem = iconRect.width / 10;
  };

  // matchMedia でメディアクエリを設定
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  // 初期調整のため、handleResizeとleftPositionの取得を強制的に行います。
  onMount(() => {
    getCarIconSize();
    leftPosition = calcProgress(progress);
    // mediaQueryのイベントで切り替えます。
    mediaQuery.addEventListener("change", getCarIconSize);
    return () => {
      mediaQuery.removeEventListener("change", getCarIconSize);
    };
  });
</script>

<div class="progress-frame">
  <div class="progress-container">
    <div
      class="car-icon"
      bind:this={carIconElement}
      style="left: {leftPosition};"
    ></div>
    <div class="goal"></div>
    <div class="progress-bar" style="width: {progress}%"></div>
  </div>
</div>

<!-- ProgressBar.svelte -->
<style lang="scss">
  .progress-frame {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    width: calc(100% - 2.7rem);
    background-color: #b2f195;

    .progress-container {
      border-radius: 1.25rem;
      background: #d9d9d9;
      margin-top: 3rem;
      position: relative;
      width: 100%;

      @media screen and (width > 768px) {
        margin-top: 3.75rem;
      }

      .car-icon {
        z-index: 100;
        position: absolute;
        top: -2.2rem;
        width: 3.5rem;
        height: 2.2rem;
        background-image: url(../image/progress-bar/car.webp);
        background-size: contain;
        background-repeat: no-repeat;
        transition: left 0.5s ease-in-out;
        animation: carShake 0.5s ease-in-out infinite;
        @media screen and (width > 768px) {
          width: 4.2rem;
          height: 2.6rem;
          top: -2.6rem;
        }
      }

      .goal {
        z-index: 99;
        position: absolute;
        top: -2rem;
        right: -0.8rem;
        width: 2rem;
        height: 2rem;
        background-image: url(../image/progress-bar/goal.webp);
        background-size: contain;
        background-repeat: no-repeat;
      }

      .progress-bar {
        height: 1.375rem;
        border-radius: 1.25rem;
        background: #e4641b;
      }
    }

    @keyframes carShake {
      0%,
      100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-3px);
      }
    }
    @media screen and (width > 768px) {
      @keyframes carShake {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }
    }
  }
  @media screen and (max-width:768px) {
  .progress-frame {
    box-sizing: border-box;
    text-align: center;
    padding: 1rem 0;
    width: calc(106% - 2.7rem);
    background-color: #b2f195;
  }
  }
</style>
