<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "@components/Layout.svelte";
  import Home from "@page/home/Home.svelte";
  import Personal from "@page/personal/Personal.svelte";
  import Vehicle from "@page/vehicle/Vehicle.svelte";
  import { postUrl } from "@consts/consts";
  import ProgressBar from "@components/ProgressBar.svelte";

  // memo: 車両情報のコンポーネントを表示させる為、個人情報の入力状況をもつstate
  let isPersonalInputComplete = true;
  let compliedCount: number;
  let isVehicleInputComplete: boolean = sessionStorage.getItem(
    "appraisal_form_data",
  )
    ? true
    : false;

  // Function to check local storage value and perform redirection if necessary
  const checkLocalStorageAndRedirect = () => {
    const appraisalFormData = sessionStorage.getItem("appraisal_form_data");
    if (!appraisalFormData) {
      //window.location.href = "https://ctn-net.jp/kaitori/car/ad3/"; // Redirect to default page if data not found
    }
  };
  onMount(checkLocalStorageAndRedirect); // Call the function when the component mounts

  //-------------------------
  // Google Tag Manager
  //-------------------------
  // Google Tag Manager (body)
  let addScript_gtmBody: boolean = false;
  onMount(() => {
    if (!addScript_gtmBody) {
      addScript_gtmBody = true;
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-5H75N4G");
    }
  });
  //-------------------------
  // Ad Common
  //-------------------------
  let addScript_adCommon: boolean = false;
  onMount(() => {
    // Ad Common
    if (!addScript_adCommon) {
      addScript_adCommon = true;
      (function(){
var uqid = "3ded5G135605b816";
var cid  = "10";
var a=document.createElement("script");
a.dataset.uqid=uqid;a.dataset.cid=cid;a.id="afadfpc-3ded5G135605b816cid10-"+Date.now();
a.src="//ac.ads-manage.com/fpc/cookie_js.php?scriptId="+encodeURIComponent(a.id);
document.head.appendChild(a);
})();
    }
  });

  //-------------------------
  // Ad Top
  //-------------------------
  let addScript_adTop: boolean = false;
  onMount(() => {
    if (!addScript_adTop) {
      addScript_adTop = true;
      (function () {
        var uqid = "3ded5G135605b816";
        var spname = "spname";
        var param = {};
        var a = document.createElement("script");
        a.dataset.uqid = uqid;
        a.dataset.spname = spname;
        a.id = "directtrack-" + uqid + Date.now();
        a.src =
          "//ac.ads-manage.com/fpc/directtrack_js.php?scriptId=" +
          encodeURIComponent(a.id);
        Object.keys(param).map(function (b) {
          return (a.dataset[b] = param[b]);
        });
        document.head.appendChild(a);
      })();
    }
  });
</script>

<!-- Personal Inputs -->
<Layout>
  <form slot="content" method="post" action={postUrl}>
    <div data-visible={isPersonalInputComplete}>
      <Vehicle bind:isPersonalInputComplete bind:compliedCount />
    </div>
  </form>
  <svelte:fragment slot="progressBar">
    <ProgressBar {compliedCount} />
  </svelte:fragment>
</Layout>

<style lang="scss">
  /* https://github.com/Andy-set-studio/modern-css-reset */
  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }
  :global(body, h1, h2, h3, h4, p, figure, blockquote, dl, dd) {
    margin: 0;
  }

  :global(ul[role="list"], ol[role="list"]) {
    list-style: none;
  }

  :global(html:focus-within) {
    scroll-behavior: smooth;
  }

  :global(body) {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  :global(a:not([class])) {
    text-decoration-skip-ink: auto;
  }

  :global(img, picture) {
    max-width: 100%;
    display: block;
  }

  :global(input, button, textarea, select) {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html:focus-within) {
      scroll-behavior: auto;
    }
    :global(*::before, *::after) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  // /* end https://github.com/Andy-set-studio/modern-css-reset */

  :global(:root) {
    font-size: calc(10 / 16 * 100%);
    --ctn-primary: #ff5c00;
    --ctn-primary-darken: #b04202;
    --ctn-secondary: #2096af;
    --ctn-secondary-darken: #418e3a;
    --ctn-decision: #ed1f1f;
    --ctn-decision-darken: darken(#ed1f1f, 10%);
    --ctn-radio-green: #59bf4f;
    --ctn-border: solid 1px #ccc;
    --ctn-radius: 5px;
    --ctn-modal-radius: 15px;
    --ctn-button-radius: 10px;
    --ctn-footer-height-mobile: 192px;
    --ctn-footer-height-other: 100px;
  }

  :global(a, a:visited, a:active, a:hover) {
    color: #333;
  }

  :global(body) {
    background-color: #fff;
    color: #333;
    font-size: 1.6rem;
    font-family: 'Noto Sans JP', "Helvetica Neue", "Hiragino Kaku Gothic ProN",
      "Hiragino Sans", "BIZ UDPGothic", "Meiryo", sans-serif;
    line-height: calc(19 / 16);
  }

  [data-visible="true"] {
    display: block;
  }

  [data-visible="false"] {
    display: none;
  }
</style>
