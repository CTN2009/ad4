<script lang="ts">
  import { onMount } from "svelte";
  import Header from "@components/Header.svelte";
  import Footer from "@components/Footer.svelte";
  import { getImageUrl } from "@consts/consts";

  let scroll: "start" | "end" = "start";
  let footerElement: HTMLElement;

  onMount(() => {
    const options = {
      root: null,
      rootMargin: "-10px",
      threshold: 0.3,
    };

    const callback = (entries: any[], observer: any) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // footerElementがビューポートに入ったときの処理
          scroll = "end";
        } else {
          // footerElementがビューポートから出たときの処理
          scroll = "start";
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // 要素を監視
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<div class="container">
  <div class="header">
    <Header />
  </div>
  <div class="serviceNameImage">
    <img
      src={getImageUrl("/image/logos.webp")}
      alt=""
      width="100%"
      height="auto"
    />
  </div>
  <div class="content" data-scroll={scroll}>
    <slot name="content" />
    <div class="progressBar">
      <slot name="progressBar" />
    </div>
  </div>
  <div bind:this={footerElement}>
    <Footer />
  </div>
</div>

<style lang="scss">
  .container {
    background: linear-gradient(180deg, #b5edff 0%, #b5edff 80%, #b2f195 80%, #b2f195 100%);
    // background-image: none;
    position: relative;
    width: 100%;
    min-width: 37.5rem;
    min-height: 110dvh;
    // memo: コンテンツが少ない時でもcontainerを縦方向いっぱい広げるための
    display: flex;
    flex-flow: column;

    @media (width > 768px) {
      min-width: auto;
      background-color:#b5edff ;
      background-image: url(../../shared/image/background_isPc.webp);
      background-repeat: no-repeat;
      background-position: center bottom;
      background-attachment: fixed;
    }

    @media (width > 1900px) {
      background-size: 100vw 50vh;
    }
  }

  .progressBar {
    position: fixed;
    bottom: 5rem;
    z-index: 1;
    background-color: transparent;
    margin: 0 auto;
    width: 100%;
    @media screen and (width > 769px) {
      max-width: 46rem;
    }
    @media screen and (width < 769px){
      left: 0;
    }
  }


  .content {
    box-sizing: border-box;
    background-color: transparent;
    background-size: contain;
    background-image: url(../../shared/image/background_isMobile.webp);
    background-repeat: no-repeat;
    background-position: center bottom;
    margin: 0 auto 5rem auto;
    padding: 1rem 1.6rem 7.5rem 1.6rem;
    max-width: 100%;
    width: 100%;
    // コンテンツが少ない時でもフッターを一番したにするための対応
    flex-grow: 1;

    @media (width > 768px) {
      background: none;
      max-width: auto;
      height: 100%;
      // memo: pc画面での画面サイズ制限
      max-width: 46.5rem;
    }

    &[data-scroll="start"] {
      background-attachment: fixed;
    }
    &[data-scroll="end"] {
      background-attachment: scroll;
    }
  }

  .serviceNameImage {
    display: none;
    @media (width > 768px) {
      display: block;
      position: fixed;
      top: 2rem;
      left: 1rem;
      width: 15vw;
      max-width: 20rem;
    }
  }
</style>
