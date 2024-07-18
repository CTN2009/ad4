<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  //import { getStores, navigating, page, updated } from '$app/stores';
  import { registAppraisalApi } from "@scripts/registAppraisalApi";
  import { type AppraisalFormData } from "@scripts/registAppraisalApi";

  const tabBrand = "brand";
  const tabVehicles = "vehicles";

  export let show: boolean;
  $: {
    // 背景のスクロールを停止する
    if (show) {
      openPopup();
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  let clientIpAddr: string = "0.0.0.0";

  let data = [];
  let loading: boolean = true;
  let error: any = null;
  let fetchedJson: any = [];

  let isVehicleSelected: boolean = false;
  let currentTabState: string = "";
  let currentBrand: string = "";
  let currentVehicle: string = "";
  let currentYear: string = "";
  let currentVersion: string = "";

  const dispatch = createEventDispatcher();

  //-----------------------------
  //
  //-----------------------------
  onMount(() => {
    fetchVehicleJson();
    getClientIpAddr();

    //const $page = get(page);
    //urlParams = $page.url.searchParams;
  });

  //-----------------------------
  // Fetch JSON data
  //-----------------------------
  const fetchVehicleJson = async function () {
    try {
      const response = await fetch(
        "https://ctn-uploads.s3.ap-northeast-1.amazonaws.com/latest.json",
      );
      if (!response.ok) {
        throw new Error("Network error!!(fetchVehicleJson)");
      }
      data = await response.json();
      if (import.meta.env.MODE.match(/dev/)) {
        console.log(data);
      }
      fetchedJson = data;
      showPopupFromBeginning();
      return data;
    } catch (err) {
      console.error("エラー：", err.message);
    } finally {
      loading = false;
    }
  };

  //-----------------------------
  // get IP
  //-----------------------------
  const getClientIpAddr = async function () {
    try {
      const response = await fetch(
        "https://ctn-net.jp/kaitori/car/ad2/wp-json/cform/v1/access",
      );
      if (!response.ok) {
        throw new Error("Network error!!(getClientIpAddr)");
      }
      //let data = await response.text();
      clientIpAddr = await response.text();
    } catch (err) {
      clientIpAddr = "0.0.0.0";

      console.error("エラー：", err.message);
    }
  };

  //-----------------------
  // Brand
  //-----------------------
  let carOneList: any[] = [];
  let carTwoList: any[] = [];
  let caroneItem: any[] = [];
  let cartwoItem: any[] = [];
  let carthreeItem: any[] = [];
  let carfourItem: any[] = [];
  let carfiveItem: any[] = [];
  let carsixItem: any[] = [];
  let carsevenItem: any[] = [];
  let careightItem: any[] = [];
  let carnineItem: any[] = [];
  const showPopupTab = (tabName: string) => {
    // var tabContents = document.querySelectorAll("#popup .tab-content");
    // for (var i = 0; i < tabContents.length; i++) {
    //   tabContents[i].classList.remove("active");
    // }
    // document.getElementById(tabName + "Popup").classList.add("active");

    // json
    // Tạo danh sách dữ liệu cho car-one và car-two

    fetchedJson.forEach((item: JSON) => {
      let matt = item.matt;
      let brand = item.brand;
      let logo = item.logo;
      let listItem = `{brand}`;
      let logoItem = `<img src="{item.logo}" alt="{item.listItem}" />`;

      // Phân tách dữ liệu vào car-one hoặc car-two dựa vào giá trị "matt"
      if (
        matt === "49" ||
        matt === "46" ||
        matt === "53" ||
        matt === "47" ||
        matt === "48" ||
        matt === "42" ||
        matt === "41" ||
        matt === "50" ||
        matt === "44"
      ) {
        carOneList.push(item);
      } else if (
        matt === "30" ||
        matt === "25" ||
        matt === "20" ||
        matt === "22" ||
        matt === "28" ||
        matt === "57" ||
        matt === "63" ||
        matt === "04"
      ) {
        carTwoList.push(item);
      } else if (
        matt === "19" ||
        matt === "90" ||
        matt === "21" ||
        matt === "01" ||
        matt === "58" ||
        matt === "79" ||
        matt === "06" ||
        matt === "07"
      ) {
        caroneItem.push(item);
      } else if (
        matt === "40" ||
        matt === "92" ||
        matt === "08" ||
        matt === "33" ||
        matt === "02" ||
        matt === "46" ||
        matt === "34" ||
        matt === "23" ||
        matt === "72" ||
        matt === "73"
      ) {
        cartwoItem.push(item);
      } else if (matt === "59" || matt === "60" || matt === "09") {
        carthreeItem.push(item);
      } else if (
        matt === "61" ||
        matt === "56" ||
        matt === "03" ||
        matt === "62" ||
        matt === "10" ||
        matt === "93" ||
        matt === "94" ||
        matt === "95" ||
        matt === "24" ||
        matt === "43" ||
        matt === "74"
      ) {
        carfourItem.push(item);
      } else if (
        matt === "96" ||
        matt === "64" ||
        matt === "65" ||
        matt === "11" ||
        matt === "45" ||
        matt === "97" ||
        matt === "32" ||
        matt === "75"
      ) {
        carfiveItem.push(item);
      } else if (matt === "98" || matt === "78") {
        carsixItem.push(item);
      } else if (
        matt === "66" ||
        matt === "55" ||
        matt === "67" ||
        matt === "35" ||
        matt === "36" ||
        matt === "99" ||
        matt === "68" ||
        matt === "100" ||
        matt === "12" ||
        matt === "101" ||
        matt === "102" ||
        matt === "26" ||
        matt === "69" ||
        matt === "51" ||
        matt === "54" ||
        matt === "76"
      ) {
        carsevenItem.push(item);
      } else if (
        matt === "27" ||
        matt === "13" ||
        matt === "37" ||
        matt === "103" ||
        matt === "70" ||
        matt === "104" ||
        matt === "29" ||
        matt === "106" ||
        matt === "31" ||
        matt === "14" ||
        matt === "107" ||
        matt === "52"
      ) {
        careightItem.push(item);
      } else if (
        matt === "38" ||
        matt === "15" ||
        matt === "39" ||
        matt === "71" ||
        matt === "05" ||
        matt === "108" ||
        matt === "16" ||
        matt === "17" ||
        matt === "18" ||
        matt === "77"
      ) {
        carnineItem.push(item);
      }
    });
  };
  //-----------------------
  // vehicles
  //-----------------------
  let ninkiData: any[] = [];
  let numberData: any[] = [];
  let textaData: any[] = [];
  let textkaData: any[] = [];
  let textsaData: any[] = [];
  let texttaData: any[] = [];
  let textnaData: any[] = [];
  let texthaData: any[] = [];
  let textmaData: any[] = [];
  let textyaData: any[] = [];
  let textraData: any[] = [];

  const handleSelectBrand = (brand: string) => {
    console.log(brand);
    currentTabState = "vehicles";
    dispatch("changeTitle", { message: "車種" });
    currentBrand = brand;

    //fetchedJson.forEach((item: JSON) => {});
    if (currentBrand) {
      ninkiData = [];
      numberData = [];
      textaData = [];
      textkaData = [];
      textsaData = [];
      texttaData = [];
      textnaData = [];
      texthaData = [];
      textmaData = [];
      textyaData = [];
      textraData = [];

      var brandData = fetchedJson.find(function (item: JSON) {
        return item.brand === currentBrand;
      });
      //console.log(brandData);
      if (brandData) {
        brandData.maqh.forEach(function (vehicle: JSON) {
          // Kiểm tra giá trị của thuộc tính "group" và thêm vào mảng tương ứng
          if (vehicle.group === "ninki") {
            ninkiData.push(vehicle);
          } else if (vehicle.group === "number") {
            numberData.push(vehicle);
          } else if (vehicle.group === "texta") {
            textaData.push(vehicle);
          } else if (vehicle.group === "textka") {
            textkaData.push(vehicle);
          } else if (vehicle.group === "textsa") {
            textsaData.push(vehicle);
          } else if (vehicle.group === "textta") {
            texttaData.push(vehicle);
          } else if (vehicle.group === "textna") {
            textnaData.push(vehicle);
          } else if (vehicle.group === "texha") {
            texthaData.push(vehicle);
          } else if (vehicle.group === "textma") {
            textmaData.push(vehicle);
          } else if (vehicle.group === "texya") {
            textyaData.push(vehicle);
          } else if (vehicle.group === "texra") {
            textraData.push(vehicle);
          }
        });
      }
    }
  };
  //-----------------------
  // year
  //------------------------
  let yearData: any[] = [];
  const handleSelectVehicle = (vehicle: string) => {
    console.log(vehicle);
    currentTabState = "year";
    dispatch("changeTitle", { message: "年式" });
    currentVehicle = vehicle;

    let brandData = fetchedJson.find(function (item: JSON) {
      return item.brand === currentBrand;
    });

    let vehicleData = brandData.maqh.find(function (item: JSON) {
      return item.name === currentVehicle;
    });
    if (vehicleData) {
      vehicleData.mapx.forEach(function (year: JSON) {
        yearData.push(year);
      });
    }

    console.log(yearData);
  };
  //-----------------------
  // version
  //------------------------
  let versionData: any[] = [];
  const handleSelectYear = (year: string) => {
    console.log(year);
    dispatch("changeTitle", { message: "グレード" });
    currentTabState = "version";
    currentYear = year;

    let brandData = fetchedJson.find(function (item: JSON) {
      return item.brand === currentBrand;
    });

    let vehicleData = brandData.maqh.find(function (item: JSON) {
      return item.name === currentVehicle;
    });
    if (vehicleData) {
      vehicleData.mapx.forEach(function (year: JSON) {
        if (year.name == currentYear) {
          year.makp.forEach(function (version: JSON) {
            versionData.push(version);
          });
        }
      });
    }

    console.log(versionData);
  };
  //--------------------------
  // version選択
  //----------------------------
  const handleSelectVersion = (version: string) => {
    currentVersion = version;

    // 車種
    // type VehicleJson = {
    //   Meka: string;
    //   CarName: string;
    //   caryear: string;
    //   carversion: string;
    //   ctn_wpc_f7_counter: string;
    // };

    // IPAddr
    type IPAddrJson = {
      host: string;
      userAgent: string;
      userIP: string;
      requestURL: string;
      saved_utm_param: string;
      fpc: string;
    };
    let url = new URL(window.location.href);
    let params = url.searchParams;

    let utmString: string[] = [];

    if (params.get("utm_source")) {
      utmString.push(String(params.get("utm_source")));
    }
    if (params.get("utm_campaign")) {
      utmString.push(String(params.get("utm_campaign")));
    }

    const curIp: IPAddrJson = {
      host: "https://ctn-net.jp/kaitori/car/ad3",
      userAgent: navigator.userAgent,
      userIP: clientIpAddr,
      requestURL: "https://ctn-net.jp/kaitori/car/ad3/cform",
      saved_utm_param: utmString.join(" "),
      fpc: String(params.get("fpc")),
    };
    sessionStorage.setItem("savedParameters", JSON.stringify(curIp));

    // AppraisalFormData
    const getYmd = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}${month}${day}`;
    };

    // const curData: VehicleJson = {
    //   Meka: currentBrand,
    //   CarName: currentVehicle,
    //   caryear: currentYear,
    //   carversion: currentVersion,
    //   ctn_wpc_f7_counter: getYmd() + cf7dtx_counter(),
    // };

    const appraisal_form_data: AppraisalFormData = {
      ctn_wpc_f7_counter: getYmd() + cf7dtx_counter(),
      saved_utm_param: curIp.saved_utm_param,
      ip: curIp.userIP,
      fpc: curIp.fpc,
      "your-subject": "",
      month: "",
      Meka: currentBrand,
      CarName: currentVehicle,
      caryear: currentYear,
      carversion: currentVersion,
    };

    //selectedVehicle.set(cur);
    // APIコール
    let appraisalApiResponse = registAppraisalApi(appraisal_form_data);

    // session保存
    sessionStorage.setItem(
      "appraisal_form_data",
      JSON.stringify(appraisal_form_data),
    );

    //
    dispatch("selectedVehicle", {
      text:
        currentBrand +
        "・" +
        currentVehicle +
        "・" +
        currentYear +
        "・" +
        currentVersion,
    });

    //
    //push("/chat");
    //window.scrollTo(0, 0);
  };
  //---------------------
  // ctn_wpc_f7_counter生成
  //---------------------
  const cf7dtx_counter = (): string => {
    // Get the current time in milliseconds
    let milliseconds: number = Date.now();

    // Generate a random number between 1000 and 9999 (4 digits)
    let random_number: number = Math.floor(Math.random() * 9000) + 1000;

    // Combine milliseconds and random number
    let combined: string = milliseconds.toString() + random_number.toString();

    // Ensure the result is exactly 6 digits by taking the last 6 digits
    let unique_counter: string = combined.slice(-6);

    return unique_counter;
  };

  //--------------------------
  // popup
  //----------------------------
  let popup: any;
  let popupContent: any;

  //----------------------
  // popup init
  //----------------------
  const showPopupFromBeginning = () => {
    //document.getElementById("popup").style.display =
    //  "block";
    currentTabState = "brand";
    showPopupTab("brand");
  };
  //----------------------
  // popup open
  //----------------------
  export const openPopup = () => {
    currentBrand = "";
    currentTabState = "brand";

    //document.getElementById("vehiclesField").value = "";
    //document.getElementById("kilometField").value = "";
  };

  //----------------------
  // popup close
  //----------------------
  export const closePopup = () => {
    document.body.style.overflow = "auto";

    currentBrand = "";
    currentTabState = "brand";

    //document.getElementById("vehiclesField").value = "";
    //document.getElementById("kilometField").value = "";
  };
</script>

<link
  rel="preload"
  as="font"
  href="https://ctn-net.jp/kaitori/car/demo_ad3/wp-content/themes/ctnkaitori/assets/font/NotoSansJP-Regular.woff2"
  crossorigin
/>
<link
  rel="preload"
  as="font"
  href="https://ctn-net.jp/kaitori/car/demo_ad3/wp-content/themes/ctnkaitori/assets/font/NotoSansJP-Medium.woff2'"
  crossorigin
/>
<link
  rel="preload"
  as="font"
  href="https://ctn-net.jp/kaitori/car/demo_ad3/wp-content/themes/ctnkaitori/assets/font/NotoSansJP-SemiBold.woff2"
  crossorigin
/>
<link
  rel="preload"
  as="font"
  href="https://ctn-net.jp/kaitori/car/demo_ad3/wp-content/themes/ctnkaitori/assets/font/NotoSansJP-Bold.woff2"
  crossorigin
/>
{#if show}
  <div class="overlay"></div>
  <div class="modal">
    <div id="popup" class="popup" bind:this={popup}>
      <div class="popup-content" bind:this={popupContent}>
        <div class="content">
          <div id="brandPopup" class="tab-content active">
            {#if loading}
              <div class="header-text">
                <h3>Now Loading..</h3>
              </div>
              <div class="logo-car-item">
                <div class="loading-spinner"></div>
              </div>
              <style>
                .loading-spinner {
                  height: 50vh;
                  width: 100vw;
                  cursor: progress;

                  &::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 5em;
                    height: 5em;
                    margin-top: -2.5em;
                    margin-left: -2.5em;
                    border-radius: 50%;
                    border: 0.25em solid #ccc;
                    border-top-color: #333;
                    animation: spinner 1.5s linear infinite;
                  }
                }

                @keyframes spinner {
                  to {
                    transform: rotate(360deg);
                  }
                }
              </style>
            {/if}
            {#if !loading && currentTabState == "brand"}
              <div class="header-text">
                <h3>メーカーを選択してください</h3>
              </div>
              <div class="menu-text">
                <nav class="modal-page-nav" id="js-modalPageNav">
                  <ul class="carmodelAnchorList">
                    <li><span><a href="#list-num">英数</a></span></li>
                    <li><span><a href="#list-a">ア</a></span></li>
                    <li><span><a href="#list-ka">カ</a></span></li>
                    <li><span><a href="#list-sa">サ</a></span></li>
                    <li><span><a href="#list-ta">タ</a></span></li>
                    <li><span><a href="#list-na">ナ</a></span></li>
                    <li><span><a href="#list-ha">ハ</a></span></li>
                    <li><span><a href="#list-ma">マ</a></span></li>
                    <li><span><a href="#list-ya">ヤ</a></span></li>
                    <li><span><a href="#list-ra">ラ</a></span></li>
                    <li><span><a href="#list-wa">ワ</a></span></li>
                  </ul>
                </nav>
              </div>
              <div class="content-detail">
                <div class="logo-car-item">
                  <div class="nihon-car-item">
                    <h3>主な国産車メーカー</h3>
                    <ul class="modal-block-list">
                      {#each carOneList as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            ><img src={item.logo} alt="" />
                            <div>{item.brand}</div></a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="world-car-item">
                    <h3>主な輸入車メーカー</h3>
                    <ul class="modal-block-list">
                      {#each carTwoList as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            ><img src={item.logo} alt="" />
                            <div>{item.brand}</div></a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>

                <div class="link-car-item">
                  <div class="link-item-one" id="list-num">
                    <h4>英数字</h4>
                    <ul class="modal-text-list">
                      {#each caroneItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            >{item.brand}</a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-two" id="list-a">
                    <h4>ア行</h4>
                    <ul class="modal-text-list">
                      {#each cartwoItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            >{item.brand}</a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-three" id="list-ka">
                    <h4>カ行</h4>
                    <ul class="modal-text-list">
                      {#each carthreeItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            >{item.brand}</a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-four" id="list-sa">
                    <h4>サ行</h4>
                    <ul class="modal-text-list">
                      {#each carfourItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            >{item.brand}</a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-five" id="list-ta">
                    <h4>タ行</h4>
                    <ul class="modal-text-list">
                      {#each carfiveItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            >{item.brand}</a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-six" id="list-na">
                    <h4>ナ行</h4>
                    <ul class="modal-text-list">
                      {#each carsixItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}
                            >{item.brand}</a
                          >
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-seven" id="list-ha">
                    <h4>ハ行</h4>
                    <ul class="modal-text-list">
                      {#each carsevenItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}>
                            {item.brand}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-eight" id="list-ma">
                    <h4>マ行</h4>
                    <ul class="modal-text-list">
                      {#each careightItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}>
                            {item.brand}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div class="link-item-nine" id="list-ra">
                    <h4>ラ行</h4>
                    <ul class="modal-text-list">
                      {#each carnineItem as item}
                        <li>
                          <a on:click={() => handleSelectBrand(item.brand)}>
                            {item.brand}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
              </div>
            {/if}
          </div>

          {#if !loading && currentTabState == "vehicles"}
            <div id="vehiclesPopup" class="tab-content content-tab active">
              <div class="header-text">
                <h3>車種を選択してください</h3>
              </div>
              <div class="menu-text">
                <nav class="modal-page-nav" id="js-modalPageNav">
                  <ul class="carmodelAnchorList">
                    <li><span><a href="#number">英数</a></span></li>
                    <li><span><a href="#text-a">ア</a></span></li>
                    <li><span><a href="#text-ka">カ</a></span></li>
                    <li><span><a href="#text-sa">サ</a></span></li>
                    <li><span><a href="#text-ta">タ</a></span></li>
                    <li><span><a href="#text-na">ナ</a></span></li>
                    <li><span><a href="#text-ha">ハ</a></span></li>
                    <li><span><a href="#text-ma">マ</a></span></li>
                    <li><span><a href="#text-ya">ヤ</a></span></li>
                    <li><span><a href="#text-ra">ラ</a></span></li>
                    <li><span><a href="#text-wa">ワ</a></span></li>
                  </ul>
                </nav>
              </div>
              <div class="vehicles-content">
                <div id="ninki">
                  <ul>
                    <h4>人気の車種</h4>
                    {#each ninkiData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="number">
                  <ul>
                    <h4>英数字</h4>
                    {#each numberData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-a">
                  <ul>
                    <h4>ア行</h4>
                    {#each textaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-ka">
                  <ul>
                    <h4>カ行</h4>
                    {#each textkaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-sa">
                  <ul>
                    <h4>サ行</h4>
                    {#each textsaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-ta">
                  <ul>
                    <h4>タ行</h4>
                    {#each texttaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-na">
                  <ul>
                    <h4>ナ行</h4>
                    {#each textnaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-ha">
                  <ul>
                    <h4>ハ行</h4>
                    {#each texthaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-ma">
                  <ul>
                    <h4>マ行</h4>
                    {#each textmaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-ya">
                  <ul>
                    <h4>ヤ行</h4>
                    {#each textyaData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
                <div id="text-ra">
                  <ul>
                    <h4>ラ行</h4>
                    {#each textraData as vehicle}
                      <li>
                        <a on:click={() => handleSelectVehicle(vehicle.name)}
                          >{vehicle.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          {/if}
          {#if !loading && currentTabState == "year"}
            <div class="header-text">
              <h3>年式を選択してください</h3>
            </div>
            <div
              id="yearPopup"
              class="tab-content content-tab-year content-tab active vehicles-content"
            >
              <p>※不明の場合はだいたいで構いません。</p>
              <ul>
                {#each yearData as year}
                  <li>
                    <a on:click={() => handleSelectYear(year.name)}
                      >{year.name}</a
                    >
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
          {#if !loading && currentTabState == "version"}
            <div class="header-text">
              <h3>グレードを選択してください</h3>
            </div>
            <div
              id="versionPopup"
              class="tab-content content-tab-version content-tab vehicles-content"
            >
              <p>※不明の場合はだいたいで構いません。</p>
              <ul>
                <li>
                  <a on:click={() => handleSelectVersion("不明")}>不明</a>
                </li>
                {#each versionData as version}
                  <li>
                    <a on:click={() => handleSelectVersion(version.name)}
                      >{version.name}</a
                    >
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
        <div class="footer-popup">
          <div class="modal-footer" id="registerButtons"></div>
        </div>
      </div>
    </div>
  </div>
  <style>
    img,
    svg {
      vertical-align: middle;
      display: inline;
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
      pointer-events: none;
      z-index: 9999;
      width: 500px;
    }
    .popup {
      width: 500px;
      z-index: 9999;
      /*grid-template-rows: auto 1fr auto;*/
      pointer-events: auto;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .popup-content {
      width: 400px;
      z-index: 9999;
      /* height:600px; */
      /*margin: 50px 0;*/
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
    .menu-text,
    .footer-popup {
      background-color: #fff;
    }
    .content-detail {
      background-color: #fff;
      height: 50vh;
      overflow-y: scroll;
    }
    .vehicles-content {
      background-color: #fff;
      height: 100%;
      height: 50vh;
      overflow-y: scroll;
      margin: 0;
      padding: 0px 12px 20px 12px;
    }
    .footer-popup {
      padding: 20px;
      text-align: left;
      border-bottom-right-radius: 30px;
      border-bottom-left-radius: 30px;
    }

    ul.modal-block-list li,
    ul.modal-block-list li a {
      width: inherit;
    }

    ul.carmodelAnchorList li {
      font-size: 14px;
      display: inline-block;
      vertical-align: top;
      width: calc(100% / 6);
      text-align: center;
    }
    ul.carmodelAnchorList li span {
      width: 105%;
      height: 100%;
      display: inline-block;
      color: #c0c0c0;
      font-weight: bold;
      position: relative;
      box-sizing: border-box;
      padding: 12px 0;
      background: #eee;
      border-top: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
    ul.carmodelAnchorList li span a {
      width: 100%;
      display: inline-block;
      color: #333;
      box-sizing: border-box;
      text-decoration: none !important;
    }
    ul.modal-block-list {
      font-size: 0;
      margin: 0 0 24px 0;
      display: flex;
      flex-wrap: wrap;
    }
    ul.modal-block-list li {
      vertical-align: top;
      font-size: 11px;
      line-height: 14px;
      flex: 0 0 25%;
      padding: 5px;
      margin: 0 0 10px 0;
      border-bottom: 1px dotted #eee;
      text-align: center;
      list-style-type: none;
    }
    ul.modal-block-list li a {
      width: 100%;
      display: inline-block;
      vertical-align: top;
      text-decoration: underline;
      color: #313233;
    }
    ul.modal-block-list li a img {
      height: 30px;
    }
    .logo-car-item h3 {
      padding-left: 12px;
    }
    .link-item-one {
      padding: 10px 15px 10px 15px;
    }
    .link-item-two {
      padding: 10px 15px 10px 15px;
    }
    .link-item-three {
      padding: 10px 15px 10px 15px;
    }
    .link-item-four {
      padding: 10px 15px 10px 15px;
    }
    .link-item-five {
      padding: 10px 15px 10px 15px;
    }
    .link-item-six {
      padding: 10px 15px 10px 15px;
    }
    .link-item-seven {
      padding: 10px 15px 10px 15px;
    }
    .link-item-eight {
      padding: 10px 15px 10px 15px;
    }
    .link-item-nine {
      padding: 10px 15px 10px 15px;
    }
    ul.modal-text-list {
      padding: 2px 0 2px 0;
    }

    ul.modal-text-list li {
      font-size: 16px;
      padding: 2px 0 2px 0;
      margin: 0 0 10px 0;
      border-bottom: 1px dotted #eee;
      list-style-type: none;
    }
    ul.modal-text-list li a {
      display: inline-block;
      background: url(./assets/img/logomeka/icon_negobtn.png) no-repeat;
      background-position: 5px 13px;
      font-size: 14px;
      padding: 8px 0 8px 23px !important;
      font-weight: 600;
      width: 90%;
    }
    ul.modal-text-list li a:hover {
      background:
        url(./assets/img/logomeka/icon_negobtn.png) no-repeat,
        #ff9e67;
      background-position: 5px 13px;
      cursor: pointer;
    }
    .link-car-item h4 {
      margin-top: 0px !important;
    }
    .content-tab ul li {
      font-size: 14px;
      padding: 0px;
      /*         margin: 0 0 10px 0; */
      border-bottom: 1px dotted #eee;
      cursor: pointer;
    }
    .vehicles-content ul {
      margin: 0;
      padding: 0;
    }

    .vehicles-content ul li {
      list-style: none;
    }
    .vehicles-content ul li a {
      font-size: 14px;
      font-weight: inherit;
      display: inline-block;
      background: url(./assets/img/logomeka/icon_negobtn.png) no-repeat;
      background-position: 5px 13px;
      font-size: 14px;
      padding: 8px 0 8px 23px !important;
      width: 90%;
    }
    .vehicles-content ul li a:hover {
      background:
        url(./assets/img/logomeka/icon_negobtn.png) no-repeat,
        #ff9e67;
      background-position: 5px 13px;
      cursor: pointer;
    }
    .content-tab-year ul li a {
      font-size: 14px;
    }
    .header-text {
      background-color: #fa6b19;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px;
    }
    .header-text h3 {
      font-size: 16px;
      margin: 0;
      color: #fff;
      padding: 20px 20px;
    }

    ul.carmodelAnchorList {
      padding: 10px;
      font-size: 0;
      margin: auto;
      margin-bottom: 20px;
    }
    ul.carmodelAnchorList li span a:hover {
      color: #f30;
      /*border-bottom: 3px solid #f30;*/
    }
    .menu-text {
      padding: 0px;
      border-bottom: 1px solid #ddd;
    }

    .vehicles-content h4 {
      font-size: 16px;
      font-weight: bold;
      padding: 0 0 10px;
      margin: 28px 0 20px;
      border-bottom: 1px solid #ddd;
    }
    /*div#yearPopup {
        height: 55vh;
    }
    div#versionPopup {
        height: 55vh;
    }*/

    .content-tab-version ul li {
      list-style-type: none;
      font-size: 14px;
      margin: 0px 0px 4px;
      width: 100% !important;
      display: block;
      cursor: pointer;
    }
    .nihon-car-item h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 20px 0;
    }
    .world-car-item h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 20px 0;
    }
    ul.modal-block-list {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: -moz-flex;
      display: flex;
      -webkit-box-lines: multiple;
      -moz-box-lines: multiple;
      -webkit-flex-wrap: wrap;
      -moz-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      /* -webkit-box-pack: justify; */
      -moz-box-pack: justify;
      -webkit-flex-pack: justify;
      -moz-flex-pack: justify;
      -ms-flex-pack: justify;
      -webkit-justify-content: space-between;
      -moz-justify-content: space-between;
      justify-content: space-between;
      margin: 0;
      padding: 0;
    }
    ul.modal-block-list li a:hover {
      opacity: 0.8;
      background-color: #ff9e67;
    }
    .link-car-item h4 {
      font-size: 16px;
      font-weight: bold;
      padding: 0 0 5px;
      margin: 28px 0 20px;
      border-bottom: 1px solid #ddd;
    }

    .vehicles-content h4 {
      /*margin-top: 0px!important;*/
      font-size: 16px;
      font-weight: bold;
      padding: 0 0 10px;
      margin: 28px 0 20px;
      border-bottom: 1px solid #ddd;
    }
    .vehicles-content h4 :nth-child(n + 2) {
      margin-top: 20px;
    }

    div#yearPopup p {
      padding: 10px 20px;
      border-bottom: 1px solid #dcdcdc;
      margin: 0;
      font-size: 14px;
      color: #898989;
    }
    div#versionPopup p {
      padding: 10px 20px;
      border-bottom: 1px solid #dcdcdc;
      margin: 0;
      font-size: 14px;
      color: #898989;
    }
    @media (max-width: 992px) {
      .popup-content {
      }
    }
    @media (min-width: 992px) {
      .popup-content {
      }
    }
  </style>
{/if}
