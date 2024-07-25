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
    <p class="sp_head">そのクルマを得意とする<br><span>専門店</span>で競り合うから<span>最高額</span>で売れる！</p>
    <span class="icons">
      <span class="icon"><img src={icon1} alt="1000店舗突破" width="41" height="40"></span>
      <span class="icon"><img src={icon2} alt="47都道府県対応" width="41" height="40"></span>
      <span class="icon"><img src={icon3} alt="業界15年の実績" width="41" height="40"></span>
    </span>
  </div>
</header>
<div class="pc-header">
  <div class="inner -flex">
  <span class="logo">
    <img src={logImage} alt="CTN" width="217" >
  </span>
  <p class="pc_head">そのクルマを得意とする<span>専門店</span>で競り合うから<span>最高額</span>で売れる！</p>
</div>
<div class="sub_header">
  <p>600社以上の中からやり取りは上位3社のみ</p>
</div>
</div>


<!-- Header.svelte -->
<style lang="scss">

  /* モバイルデバイスのみで表示される固定ヘッダーのスタイル */
  @media screen and (max-width: 768px) {
    .sp_head{
      font-size:12px;
    }
    .sp_head span{
      color:#db4a0b;
      font-weight:900;
      font-size:16px;
    }
    .sub_header{
      padding:10px 0;
      color:#fff;
      text-align: center;
      font-weight:bold;
      background: linear-gradient(#EB5514, #c83e02);
    }
    .pc-header {
      display:none;
    }
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
          display: none;
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
    .-flex{
      align-items:center;
      display:flex;
      justify-content:space-between;
    }
    .inner{
      max-width:1020px;
      width:100%;
      margin:0 auto;
    }
    .pc-header{
      background-color:#fff;
      padding:10px 0 0 0;
      position:fixed;
      width:100%;
      z-index:9999;
    }
    .pc_head{
      font-size:25px;
    }
    .pc_head span{
      color:#db4a0b;
      font-weight:900;
      font-size:36px;
    }
    .sub_header{
      padding:10px 0;
      color:#fff;
      font-size:28px;
      text-align: center;
      font-weight:bold;
      background: linear-gradient(#EB5514, #c83e02);
    }

  }
</style>
