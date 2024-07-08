<script lang="ts">
  import {getImageUrl} from "@consts/consts"

  const logImage = getImageUrl('/image/header/logo.webp')
  const icon1 = getImageUrl('/image/header/icon-1.webp')
  const icon2 = getImageUrl('/image/header/icon-2.webp')
  const icon3 = getImageUrl('/image/header/icon-3.webp')

   import { onMount } from 'svelte';

  onMount(() => {
    // スクリプトを動的に生成して読み込む
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/simplebar@5.3.6/dist/simplebar.min.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);

    // スタイルシートを動的に生成して読み込む
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/simplebar@5.3.6/dist/simplebar.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });

</script>

<header class="fixed-header">
  <div class="contents">
    <span class="logo">
      <img src={logImage} alt="CTN" width="93" height="40">
    </span>
    <span class="icons">
      <span class="icon"><img src={icon1} alt="1000店舗突破" width="41" height="40"></span>
      <span class="icon"><img src={icon2} alt="47都道府県対応" width="41" height="40"></span>
      <span class="icon"><img src={icon3} alt="業界15年の実績" width="41" height="40"></span>
    </span>
  </div>
</header>

<!-- Header.svelte -->
<style lang="scss">
  /* モバイルデバイスのみで表示される固定ヘッダーのスタイル */
  @media screen and (max-width: 768px) {
    .fixed-header {
      box-sizing: border-box;
      padding: 0.7rem 1.2rem;
      width: 100%;
      background-color: #fff;
      img{
            height: auto;
          }
      .contents {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .icons {
          display: flex;
          justify-content: flex-end;
          flex-grow: 1;
          .icon{
            margin: 0 0.25rem;
          }
        }
      }
    }
  }

  /* 画面が768pxより大きい場合はヘッダーを非表示にする */
  @media (width > 768px) {
    .fixed-header {
      display: none;
    }
  }
</style>
