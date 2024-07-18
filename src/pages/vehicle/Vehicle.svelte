<script lang="ts">
  import { onMount } from "svelte";
  import dayjs from "dayjs";
  import Button from "@components/Button.svelte";
  import ChatBalloons from "@components/ChatBalloons.svelte";
  import GridContainer from "@components/GridContainer.svelte";
  import SimpleModal from "@components/SimpleModal.svelte";
  import { handleScrollToTop } from "src/shared/scripts/handleScrollToBottom";
  import { handleScrollToBottom } from "src/shared/scripts/handleScrollToBottom";
  import { handleScrollToElement } from "src/shared/scripts/handleScrollToBottom";
  import Modal from "@components/Modal.svelte";
  import CarInfoSingleSelectOption from "@components/CarInfoSingleSelectOption.svelte";
  import CarInfoMultipleSelectOptions from "@components/CarInfoMultipleSelectOptions.svelte";
  import UnmatchedOption from "@components/UnmatchedOption.svelte";
  import CandidateDatePicker from "@components/CandidateDatePicker.svelte";
  import appraisalRequest from "@scripts/appraisalRequest";
  import triggerMail from "@scripts/triggerMails";

  import { createEventDispatcher } from "svelte";

  import {
    engineCapacityOptions,
    colorOptions,
    loanOptions,
    runOptions,
    troubleOptions,
    jisouOptions,
    inspectionDateOptions,
    DesiredTimeOptions,
    fuelOptions,
    exteriorConditionOptions,
    navigationOptions,
    electricSlideOptions,
    otherItemsOptions,
    actionWaitTime,
    getImageUrl,
    mansionOptions,
  } from "@consts/consts";
  import { countTrue } from "@scripts/utils";
  import DelayedDisplay from "@components/DelayedDisplay.svelte";

  // 個人情報入力用
  import debounce from "debounce";

  import { formStore } from "@store/personal";
  import Input from "@components/Input.svelte";
  import ErrorMessageBox from "@components/ErrorMessageBox.svelte";
  import addressSearch from "@scripts/addressSearch";
  import {
    genericInputHandler,
    initValidationResult,
    zipcodeHandler,
  } from "@scripts/validate";
  import InputWrap from "@components/InputWrap.svelte";
  import requestAuthCode from "@scripts/requestAuthCode";
  import authSmsCode from "@scripts/authSmsCode";
  import PersonalInfoConfirmField from "@components/PersonalInfoConfirmField.svelte";
  import Spinner from "@components/Spinner.svelte";

  // 車種選択用
  import VehiclePopup from "@components/VehiclePopup.svelte";

  // memo: 個人情報の入力と個人認証が完了した事を親コンポーネントに伝える
  export let isPersonalInputComplete: boolean = false;
  export let compliedCount: number;

  // 文言
  const confirmBtnText = "OK";
  const unmatchedText = "該当なし";

  const dispatch = createEventDispatcher();

  // 選択された項目のstate
  let engineCapacity: string = ""; // 排気量
  let run: string = ""; // 走行距離
  let loan: string = ""; // ローン残積
  let jisou: string = ""; // 自走可否
  let inspectionDate: string = ""; // 車検日
  let isRun: string = ""; //走行距離
  let inspectionTrouble: string = ""; //事故歴・修復歴
  let fuel: string = ""; // 燃料
  let exteriorCondition: string[] = []; // 外装(該当なしの場合は空)
  let colorAnswerText: string = ""; // 内装(該当なしの場合は空)
  let isDesiredTime: string = "";
  let navigation: string = "なし"; // ナビ
  let electricSlide: string = "なし"; // 電動スライド
  let otherItems: string[] = []; // オプション(該当なしの場合は空)
  let candidateDate: Date | null = null; // 査定候補日

  let vehicleAnswerText: string = ""; // 車種(該当なしの場合は空)

  // memo: モーダル表示状況のstate
  let selectedColor: string = "";
  let showInspectionDateModal = false; // 車検日
  let showDesiredTimeModal = false; // 売却時期
  let showTroubleModal = false; // 事故歴・修復歴
  let showColorModal = false; // カラー
  let showRunModal = false; //走行距離

  let showVehicleModal = false; //メーカー・車種

  // memo: 該当なしの状態
  let isUnmatchedInterior: boolean = false; // 内装

  // memo: ページ表示状況のstate.
  let isShowPersonalInfoRequest = false;
  let isShowPersonalInfoRequestSecond = false;
  let isEngineCapacityRequest = false;
  let isEngineCapacityAnswer = false;

  let isTroubleAnswer = false;
  let isTroubleRequest = false;
  let isColorRequest = false;
  let isColorAnswer = false;
  let isRunRequest = false;
  let isRunAnswer = false;
  let isLoanRequest = false;
  let isJisouRequest = false;
  let isJIsouAnswer = false;
  let isLoanAnswer = false;
  let isInspectionDateRequest = false;
  let isDesiredTimeRequest = false;
  let isInspectionDateAnswer = false;
  let isFuelRequest = false;
  let isFuelAnswer = false;
  let isDesiredTimeAnswer = false;
  let isPersonMessage = false;
  let isThankYouMessage = false;
  let isReminderMessage = false;
  let isEncouragementIllustration = false;
  let isOtherItemsRequest = false;
  let isOtherItemsAnswer = false;
  let isCandidateDateRequest = false;
  let isCandidateDateAnswer = false;
  let isValuationButton = false;
  let isAuthSuccess = false;
  let isDuplicateAppraisal = false;

  let isVehicleRequest = false;
  let isVehicleAnswer = false;

  // 個人情報入力用
  // memo: ページ表示状況のstate.
  let isShowContactRequest = false;
  let isShowThankRequest = false;
  let isShowContactInput = false;
  let isShowMansionQuestion = false;
  let isShowMansionInput = false;
  let isShowMansionNameInput = false;
  let isClickMansion = false;
  let isCompleteMansion = false;
  let mansionYesNo = "";
  let isShowAddressInput = false;
  let isShowInputEnd = false;
  let isRequestAuthCode = false;
  let isShowAuthButton = false;
  let isClickAuthCodeRequest = false;
  let isClickAuthentication = false;
  let isClickAuth = false;
  let isAuthSmsCode = false;
  let isNotModifyMode = true;
  let authCode = "";
  let isSubmit = false;

  // memo: validate結果を保存して、コンテンツ制御に利用するstate.
  let validateYourname = initValidationResult();
  let validateZipcode = initValidationResult();
  let validateAddress = initValidationResult();
  let validateAddress2 = initValidationResult();
  let validateManson = initValidationResult();
  let validateYouremail = initValidationResult();
  let validateTel = initValidationResult();
  let validateAuthCode = initValidationResult();

  const initInput = (): void => {
    ($formStore.yourname = ""),
      ($formStore.zipcode = ""),
      ($formStore.address = ""),
      ($formStore.manson = ""),
      ($formStore.youremail = ""),
      ($formStore.tel = ""),
      ($formStore.pref = ""),
      ($formStore.mailaddress = "");
  };
  initInput();
  const validateInit = (): void => {
    validateYourname = initValidationResult();
    validateZipcode = initValidationResult();
    validateAddress = initValidationResult();
    validateAddress2 = initValidationResult();
    validateManson = initValidationResult();
    validateYouremail = initValidationResult();
    validateTel = initValidationResult();
    validateAuthCode = initValidationResult();
  };
  validateInit();

  // memo: 住所検索に失敗した時にエラーメッセージを出力するために利用
  let isShowAddressSearchError: boolean = false;

  // memo: loading表示をするために利用します
  let isAddressSearchRunning = false;

  // 住所検索機能
  const doAddressSearch = async (target: string): Promise<void> => {
    try {
      isAddressSearchRunning = true;
      const result = await addressSearch(target);
      $formStore.address = `${result.address1}${result.address2}${result.address3}`;
      $formStore.mailaddress = `${result.address2}${result.address3}`;
      $formStore.pref = `${result.address1}`;
      isShowAddressSearchError = false;
      if (result) {
        isAddressSearchRunning = false;
      }

      // memo: 取得してきた時はvalidationを行う
      validateAddress = zipcodeHandler($formStore.address, "address");
    } catch (error) {
      isShowAddressSearchError = true;
      console.error(`addressSearch fail: ${error}`);
    }
  };

  // Vehicle PopUp Component Selected
  const selectedVehiclePopup = (event: any) => {
    vehicleAnswerText = event.detail.text;
    showVehicleModal = false;
  };
  let modalTitleVehicle = "メーカー";
  const changeTitleVehiclePopup = (event: any) => {
    modalTitleVehicle = event.detail.message;
  };
  const onFormSubmit = async () => {
    var jsonString = sessionStorage.getItem("appraisal_form_data");
    var savedParams = sessionStorage.getItem("savedParameters");
    var rawResponseData = localStorage.getItem("responseData");
    let zipcode = $formStore.zipcode;

    // Format the zipcode if it's in the incorrect format
    if (zipcode.length === 7) {
      zipcode = zipcode.slice(0, 3) + "-" + zipcode.slice(3);
    }

    var response_id =
      rawResponseData !== null ? parseInt(rawResponseData, 10) : undefined;

    // Parse the JSON string into an object
    var jsonObject = JSON.parse(jsonString!);
    var savedParamObj = JSON.parse(savedParams!);

    // Access each value in the object
    var Meka = jsonObject?.Meka;
    var CarName = jsonObject?.CarName;
    var caryear = jsonObject?.caryear;
    var carversion = jsonObject?.carversion;
    var ctn_wpc_f7_counter = jsonObject?.ctn_wpc_f7_counter;

    var host = savedParamObj?.host;
    var userAgent = savedParamObj?.userAgent;
    var remoteIP = savedParamObj?.userIP;
    var requestURL = savedParamObj?.requestURL;
    var saved_utm_param = savedParamObj?.savedUtmParameters;
    var fpc = savedParamObj?.fpc;

    //TODO: After confirmation use the generatePayload function as a best practise (generatePayload.ts)
    const reqMail = {
      ctn_wpc_f7_counter: ctn_wpc_f7_counter,
      Meka: Meka,
      CarName: CarName,
      caryear: caryear,
      carversion: carversion,
      carmet: isRun,
      color: colorAnswerText.length ? colorAnswerText[0] : "",
      month: isDesiredTime,
      status: "",
      auto: jisou,
      history: inspectionTrouble,
      "your-name": $formStore.yourname,
      zipcode: zipcode,
      address2: $formStore.address2,
      manson: $formStore.manson,
      "your-email": $formStore.youremail,
      tel: $formStore.tel,
      form_pref: $formStore.pref,
      form_address: $formStore.mailaddress,
      "cf7msm-no-ss": "",
      cf7msm_options: '{"last_step":1,"send_email":1}',
      host: host,
      userAgent: userAgent,
      remoteIP: remoteIP,
      requestURL: requestURL,
      saved_utm_param: saved_utm_param,
      xilanh: engineCapacity,
      zansai: loan,
      shaken: inspectionDate,
      shane: "",
      shapa: "",
      shahe: "",
      shage: "",
      shapi: "",
      nairua: "",
      naishito: "",
      naitabaco: "",
      sohinnabi: "",
      sohinden: "",
      sohintaiya: "",
      sohinshito: "",
      sohinmonitor: "",
      sohinsan: "",
      "date-881": formattedCandidateDate,
      fpc: fpc,
    };

    const reqDetail = {
      id: response_id,
      ctn_wpc_f7_counter: ctn_wpc_f7_counter,
      carmet: isRun,
      color: colorAnswerText.length ? colorAnswerText[0] : "",
      month: isDesiredTime,
      status: "",
      auto: jisou,
      history: inspectionTrouble,
      "your-name": $formStore.yourname,
      zipcode: zipcode,
      address: $formStore.pref + $formStore.address,
      address2: $formStore.address2,
      manson: $formStore.manson,
      "your-email": $formStore.youremail,
      tel: $formStore.tel,
      form_pref: $formStore.pref,
      form_address: $formStore.address,
      "cf7msm-no-ss": "",
      cf7msm_options: '{"last_step":1,"send_email":1}',
      xilanh: engineCapacity,
      zansai: loan,
      shaken: inspectionDate,
      shane: "",
      shapa: "",
      shahe: "",
      shage: "",
      shapi: "",
      nairua: "",
      naishito: "",
      naitabaco: "",
      sohinnabi: "",
      sohinden: "",
      sohintaiya: "",
      sohinshito: "",
      sohinmonitor: "",
      sohinsan: "",
      "date-881": formattedCandidateDate,
    };

    const appraisalResponse = await appraisalRequest(reqDetail);
    // Check if appraisal was successful and status code is 200 or 201
    // if (appraisalResponse.success && appraisalResponse.statusCode === 200) {
    //   await triggerMail(reqMail);
    //   const location: string = `https://ctn-net.jp/kaitori/car/ad3/thanks/?aid=${ctn_wpc_f7_counter}`;

    //   // Clear the appraisal_form_data from session storage
    //   sessionStorage.removeItem("appraisal_form_data");
    //   window.location.href = location;
    // } else if (appraisalResponse.statusCode === 409) {
    //   // isDuplicateAppraisal = true;
    // } else {
    //   sessionStorage.removeItem("appraisal_form_data");
    //   window.location.href = "https://ctn-net.jp/kaitori/car/ad3/";
    // }
    await triggerMail(reqMail);
    const location: string = `https://ctn-net.jp/kaitori/car/ad4/thanks.php?aid=${ctn_wpc_f7_counter}`;
    sessionStorage.removeItem("appraisal_form_data");
    window.location.href = location;
  };

  // 個人情報の確認する際に修正を押したら入力欄までスクロールする
  function handleClick() {
    handleScrollToElement("isShowAddressInput");
  }

  const nameInputHandler = (event: Event): void => {
    validateYourname = genericInputHandler(event, "yourname");
  };

  const zipCodeInputHandler = (event: Event): void => {
    validateZipcode = genericInputHandler(
      event,
      "zipcode",
      (isValid, value) => {
        if (isValid) doAddressSearch(value);
      },
    );
  };

  // 郵便番号で数字以外入れれないようにする
  function restrictNumeric(event) {
    const regex = /^[0-9]*$/; // 数字のみを許可する正規表現パターン
    const newValue = event.target.value + event.key; // 入力された値とキーを含む新しい値
    if (!regex.test(event.key)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, ""); // 数字以外を削除する
    }
  }
  const addressInputHandler = (event: Event): void => {
    validateAddress = genericInputHandler(event, "address");
  };

  const mansonSelectHandler = (_: Event) => {
    isClickMansion = true;
    if (mansionYesNo === "いいえ") {
      $formStore.manson = "";
      validateManson.isValid = true;
    }
  };

  const emailInputHandler = (event: Event): void => {
    validateYouremail = genericInputHandler(event, "youremail");
  };

  const telInputHandler = (event: Event): void => {
    validateTel = genericInputHandler(event, "tel");
  };

  const authCodeInputHandler = (event: Event): void => {
    validateAuthCode = genericInputHandler(event, "authCode");
  };

  //memo: ここからコンテンツ表示処理の記述. コンテンツの表示状況を判定して、後続のコンテンツを表示させていく
  $: if (isCandidateDateAnswer) {
    isValuationButton = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  // memo: 名前・住所入力のvalidationに通るまで後続のコンテンツを表示しない
  $: isValidAddress =
    validateYourname.isValid &&
    validateZipcode.isValid &&
    validateAddress.isValid &&
    validateAddress2.isValid;

  $: if (validateAddress.isValid) {
    handleScrollToBottom({ waitTime: 1250, compensation: -80 });
    isShowThankRequest = true;
  }

  $: if (isShowThankRequest) {
    // handleScrollToBottom({ waitTime: 1250 });
    isShowContactInput = true;
  }

  $: if (validateYouremail.isValid && validateTel.isValid) {
    handleScrollToBottom({ waitTime: 1250, compensation: 50 });
    isShowInputEnd = true;
  }

  $: if (isClickAuthCodeRequest && isRequestAuthCode && !isDuplicateAppraisal) {
    handleScrollToBottom({ waitTime: actionWaitTime });
    isShowAuthButton = true;
  }

  $: if (
    isClickAuthCodeRequest &&
    !isRequestAuthCode &&
    isNotModifyMode &&
    !isDuplicateAppraisal
  ) {
    handleScrollToBottom({ isWait: false });
  }

  $: if (isRequestAuthCode && !isDuplicateAppraisal) {
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (validateAuthCode.isValid) {
    handleScrollToBottom({ compensation: 100 });
  }

  $: if (isClickAuth && isAuthSmsCode) {
    handleScrollToBottom({ isWait: false });
  }

  $: if (isClickAuth && !isAuthSmsCode) {
    handleScrollToBottom({ isWait: false });
  }

  // memo: 車両情報コンポーネントを表示させるため、認証完了でstateを切り替えて親コンポーネントに通知する
  $: if (isClickAuth && isAuthSmsCode) {
    handleScrollToBottom({ isWait: false });
    handleScrollToBottom({ waitTime: 1500 });
    setTimeout(() => (isPersonalInputComplete = true), actionWaitTime * 3);
  }

  // ↑個人情報関連ここまで

  // memo: カレンダーはDateオブジェクトを返却する為、formatして表示します
  let formattedCandidateDate: string = "";

  // memo: ここからコンテンツ表示処理の記述. コンテンツの表示状況を判定して、後続のコンテンツを表示させていく
  // ページが表示された状態でチャット風表示を開始するため、onMount()で処理開始する
  onMount(() => {
    handleScrollToTop({ isWait: false });
    setTimeout(() => {
      isShowPersonalInfoRequest = true;
    }, actionWaitTime);
  });

  // 挨拶表示
  $: if (isShowPersonalInfoRequest) {
    // handleScrollToTop({ isWait: false });
    setTimeout(() => {
      //isShowPersonalInfoRequestSecond = true;
      isVehicleRequest = true;
    }, actionWaitTime);
  }

  // 挨拶表示2
  $: if (isShowPersonalInfoRequest) {
    // handleScrollToTop({ isWait: false });
    setTimeout(() => {
      //isColorRequest = true;

      isVehicleRequest = true;
    }, actionWaitTime);
  }

  // 車種選択
  $: if (isVehicleRequest) {
    // 車種選択完了
    if (vehicleAnswerText.length > 0 && !showVehicleModal) {
      isVehicleAnswer = true;
      // handleScrollToBottom({ waitTime: 1250 });
    }
  }

  $: if (isVehicleAnswer) {
    //isShowPersonalInfoRequestSecond = true;
    isColorRequest = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (isColorRequest) {
    if (colorAnswerText.length > 0 && !showColorModal) {
      isColorAnswer = true;
      //handleScrollToBottom({ waitTime: 1250 });
    }
  }
  $: if (isColorAnswer) {
    isRunRequest = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (isRunRequest) {
    if (isRun !== "" && !showRunModal) {
      isRunAnswer = true;
      handleScrollToBottom({ waitTime: 1250 });
    }
  }
  $: if (isRunAnswer) {
    isTroubleRequest = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (isTroubleRequest) {
    if (inspectionTrouble !== "" && !showTroubleModal) {
      isTroubleAnswer = true;
      handleScrollToBottom({ waitTime: 1250 });
    }
  }

  $: if (isTroubleAnswer) {
    isJisouRequest = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (isJisouRequest) {
    if (jisou !== "") {
      isJIsouAnswer = true;
      handleScrollToBottom({ waitTime: 1250 });
    }
  }

  $: if (isJIsouAnswer) {
    isInspectionDateRequest = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (isInspectionDateRequest) {
    if (inspectionDate !== "" && !showInspectionDateModal) {
      isInspectionDateAnswer = true;
      handleScrollToBottom({ waitTime: 1250 });
    }
  }
  $: if (isInspectionDateAnswer) {
    isLoanRequest = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (isLoanRequest) {
    if (loan !== "") {
      isLoanAnswer = true;
      handleScrollToBottom({ isWait: false });
    }
  }

  $: if (isLoanAnswer) {
    if (loan !== "") {
      isDesiredTimeRequest = true;
      handleScrollToBottom({ waitTime: 1250 });
    }
  }

  $: if (isDesiredTimeRequest) {
    if (isDesiredTime !== "" && !showDesiredTimeModal) {
      isDesiredTimeAnswer = true;
      handleScrollToBottom({ waitTime: 1250 });
    }
  }

  $: if (inspectionDate !== "") {
    isFuelRequest = true;
    handleScrollToBottom({ waitTime: 1250, compensation: 200 });
  }

  $: if (isDesiredTimeAnswer) {
    if (isDesiredTime !== "") {
      isCandidateDateRequest = true;
      handleScrollToBottom({ waitTime: 1250 });
    }
  }

  $: if (isCandidateDateRequest) {
    if (candidateDate !== null) {
      isCandidateDateAnswer = true;
      handleScrollToBottom();
    }
  }
  $: if (isCandidateDateAnswer) {
    isThankYouMessage = true;
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (isThankYouMessage) {
    isReminderMessage = true;
    handleScrollToBottom({ isWait: false });
  }

  $: if (isReminderMessage) {
    isEncouragementIllustration = true;
    handleScrollToBottom({ isWait: false, compensation: 200 });
  }
  $: if (isEncouragementIllustration) {
    setTimeout(() => {
      isPersonMessage = true;
      handleScrollToBottom({ waitTime: 1250, compensation: 200 });
    }, actionWaitTime);
  }
  // Handle checkboxColor change
  function handleCheckboxChangeVehicle() {
    showVehicleModal = false;
  }

  // Handle checkboxColor change
  function handleCheckboxChange() {
    showColorModal = false;
  }
  // Handle checkboxRun change
  function handleCheckboxChangeRun() {
    showRunModal = false;
  }
  // Handle checkboxTrouble change
  function handleCheckboxChangeTrouble() {
    showTroubleModal = false;
  }
  // Handle checkboxInspectionDate change
  function handleCheckboxChangeInspectionDate() {
    showInspectionDateModal = false;
  }
  // Handle checkboxInspectionDate change
  function handleCheckboxChangeDesiredTime() {
    showDesiredTimeModal = false;
  }

  $: if (isPersonMessage) {
    handleScrollToBottom({ waitTime: 2500, compensation: 200 });
    setTimeout(() => {
      isShowAddressInput = true;
      handleScrollToBottom({ waitTime: 1250, compensation: 50 });
    }, actionWaitTime);
  }

  // 購入者情報完了
  $: if (isPersonalInputComplete) {
    isEngineCapacityRequest = true;
    handleScrollToBottom({ waitTime: 750, compensation: 200 });
  }

  $: if (candidateDate === null) {
    formattedCandidateDate = "";
  } else {
    formattedCandidateDate = dayjs(candidateDate).format("YYYY/MM/DD");
  }

  $: {
    compliedCount = countTrue(
      isVehicleAnswer,

      isColorAnswer,
      isRunAnswer,
      isTroubleAnswer,
      isJIsouAnswer,
      isInspectionDateAnswer,
      isLoanAnswer,
      isDesiredTimeAnswer,
      isCandidateDateAnswer,
      isThankYouMessage,
      isShowAddressInput,
      isShowInputEnd,
      isShowContactInput,
      isShowAuthButton,
      isAuthSmsCode,
    );
  }

  // 共通関数
  // 複数選択肢の場合、画面上に表示する文言を取得
  const getMultipleOptionsAnswer = (
    selectedOptions: string[],
    isModalShow: boolean,
    isUnmatched: boolean,
  ): string => {
    if (selectedOptions.length > 0 && !isModalShow) {
      return selectedOptions.join("、");
    } else if (isUnmatched && !isModalShow) {
      return unmatchedText;
    }
    return "";
  };

  const isMultipleOptionsAnswerInput = (
    navigation: string,
    electricSlide: string,
    otherItems: any[],
    isUnmatchedOtherItems: boolean,
  ): boolean => {
    return (
      navigation !== "" &&
      electricSlide !== "" &&
      (otherItems.length > 0 || isUnmatchedOtherItems)
    );
  };
</script>

<GridContainer>
  <svelte:fragment slot="items">
    <div>
      <ChatBalloons>
        この度は弊社のCTN車一括査定をご利用いただき、ありがとうございます！
      </ChatBalloons>
      {#if isShowPersonalInfoRequest === true}
        <ChatBalloons>
          一括査定では下取りより50万円以上も買取価格が高くなる可能性があります。
        </ChatBalloons>
      {/if}
    </div>

    {#if isDuplicateAppraisal}
      <SimpleModal bind:show={isDuplicateAppraisal}>
        <div slot="selectionContent" class="selectionContent">
          <p>
            お客様は既にお問い合わせいただいております。<br />
            追加の問い合わせの場合、<a
              href="mailto:kaitori-cs@ctn-net.co.jp"
              style="color: blue; text-decoration: underline;"
              >こちらまでご連絡ください。</a
            >
          </p>
        </div>
      </SimpleModal>
    {/if}
    <!-- Vehicle Brand -->
    {#if isVehicleRequest}
      <ChatBalloons>
        早速ですが、査定したいおクルマの<span
          >メーカー・車種・年式・グレード</span
        >を選択してください。</ChatBalloons
      >

      <DelayedDisplay>
        <button
          type="button"
          class="selectHandle"
          on:click={() => {
            showVehicleModal = true;
            modalTitleVehicle = "メーカー";
          }}
        >
          {#if vehicleAnswerText !== ""}
            {vehicleAnswerText}
          {:else}
            選択してください
          {/if}
        </button>
      </DelayedDisplay>

      <VehiclePopup
        bind:show={showVehicleModal}
        on:selectedVehicle={selectedVehiclePopup}
        on:changeTitle={changeTitleVehiclePopup}
      ></VehiclePopup>

      <!--
      <Modal
        bind:show={showVehicleModal}
        {confirmBtnText}
        hasError={!isUnmatchedInterior && vehicleAnswerText.length == 0}
        errorMessage="{modalTitleVehicle}を選択してください。"
      >
        <div slot="itemName">
          <h2>
            {modalTitleVehicle}
          </h2>
        </div>
        <div slot="selectionContent">
          <VehiclePopup
            on:selectedVehicle={selectedVehiclePopup}
            on:changeTitle={changeTitleVehiclePopup}
          ></VehiclePopup>-->
      <!--
          <div
            class="selectionContent scroll"
            data-grid-row="3"
            data-grid-tile="true"
          >
            {#each colorOptions as option}
              <CarInfoMultipleSelectOptions
                value={option.value}
                imgUrl={option.imgUrl}
                bind:group={vehicleAnswerText}
                on:click={handleCheckboxChangeVehicle}
              ></CarInfoMultipleSelectOptions>
            {/each}
          </div>-->
      <!--</div>
      </Modal>-->
    {/if}
    {#if isVehicleAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">
          {vehicleAnswerText}
        </span>
        です。
      </ChatBalloons>
    {/if}

    <!-- Color -->
    <!-- {#if isShowPersonalInfoRequestSecond === true} -->
    {#if isColorRequest}
      <ChatBalloons isWait={false}>
        <span>ボディカラー</span>を選択してください。</ChatBalloons
      >

      <DelayedDisplay>
        <button
          type="button"
          class="selectHandle"
          on:click={() => (showColorModal = true)}
        >
          {#if colorAnswerText !== ""}
            {colorAnswerText}
          {:else}
            選択してください
          {/if}
        </button>
      </DelayedDisplay>
      <Modal
        bind:show={showColorModal}
        {confirmBtnText}
        hasError={!isUnmatchedInterior && colorAnswerText.length == 0}
        errorMessage="ボディカラーを選択してください。"
      >
        <div slot="itemName">
          <h2>ボディカラー</h2>
        </div>
        <div slot="selectionContent">
          <div
            class="selectionContent scroll"
            data-grid-row="3"
            data-grid-tile="true"
          >
            {#each colorOptions as option}
              <CarInfoMultipleSelectOptions
                value={option.value}
                imgUrl={option.imgUrl}
                bind:group={colorAnswerText}
                on:click={handleCheckboxChange}
              ></CarInfoMultipleSelectOptions>
            {/each}
          </div>
        </div>
      </Modal>
    {/if}

    {#if isColorAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">
          {colorAnswerText}
        </span>
        です。
      </ChatBalloons>
    {/if}

    <!-- Vehicle Run Km -->
    {#if isRunRequest}
      <ChatBalloons isWait={false}>
        <span class="boldText">走行距離</span>はどれくらい走っていますか？<br />
        ※不明の場合は大体で構いません。
      </ChatBalloons>

      <DelayedDisplay>
        <button
          type="button"
          class="selectHandle"
          on:click={() => {
            showRunModal = true;
          }}
        >
          {#if isRun !== ""}
            {isRun}
          {:else}
            選択してください
          {/if}
        </button>
      </DelayedDisplay>

      <Modal
        bind:show={showRunModal}
        {confirmBtnText}
        hasError={isRun == ""}
        errorMessage="走行距離を選択してください。"
      >
        <div slot="itemName">
          <h2>走行距離</h2>
        </div>
        <div
          slot="selectionContent"
          class="selectionContent"
          data-grid-row="2"
          data-grid-tile="true"
        >
          {#each runOptions.value as option}
            <CarInfoSingleSelectOption
              value={option}
              bind:selectedOptions={isRun}
              on:click={handleCheckboxChangeRun}
            ></CarInfoSingleSelectOption>
          {/each}
        </div>
      </Modal>
    {/if}

    {#if isRunAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">{isRun}</span>。
      </ChatBalloons>
    {/if}

    {#if isTroubleRequest}
      <ChatBalloons isWait={false}>
        <span class="boldText">事故歴・修復歴</span>はありますか？<br />
        ※不明の場合は大体で構いません。
      </ChatBalloons>

      <DelayedDisplay>
        <button
          type="button"
          class="selectHandle"
          on:click={() => {
            showTroubleModal = true;
          }}
        >
          {#if inspectionTrouble !== ""}
            {inspectionTrouble}
          {:else}
            選択してください
          {/if}
        </button>
      </DelayedDisplay>

      <Modal
        bind:show={showTroubleModal}
        {confirmBtnText}
        hasError={inspectionTrouble == ""}
        errorMessage="事故歴・修復歴を選択してください。"
      >
        <div slot="itemName">
          <h2>事故歴・修復歴</h2>
        </div>
        <div slot="selectionContent" class="selectionContent">
          {#each troubleOptions.value as option}
            <CarInfoSingleSelectOption
              value={option}
              bind:selectedOptions={inspectionTrouble}
              on:click={handleCheckboxChangeTrouble}
            ></CarInfoSingleSelectOption>
          {/each}
        </div>
      </Modal>
    {/if}

    {#if isTroubleAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">{inspectionTrouble}</span>。
      </ChatBalloons>
    {/if}

    {#if isJisouRequest}
      <ChatBalloons isWait={false}>
        <span class="boldText">自走</span>は可能ですか？<br />
        ※不明の場合は大体で構いません。
      </ChatBalloons>

      <DelayedDisplay>
        <div class="optionWrap">
          {#each jisouOptions.value as option}
            <CarInfoSingleSelectOption
              value={option}
              bind:selectedOptions={jisou}
              variant="buttonOption"
            ></CarInfoSingleSelectOption>
          {/each}
        </div>
      </DelayedDisplay>
    {/if}

    {#if isJIsouAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">{jisou}</span>。
      </ChatBalloons>
    {/if}

    {#if isInspectionDateRequest}
      <ChatBalloons isWait={false}>
        <span class="boldText">次回の車検日</span>はいつになりますか？
      </ChatBalloons>

      <DelayedDisplay>
        <button
          type="button"
          class="selectHandle"
          on:click={() => {
            showInspectionDateModal = true;
          }}
        >
          {#if inspectionDate !== ""}
            {inspectionDate}
          {:else}
            選択してください
          {/if}
        </button>
      </DelayedDisplay>

      <Modal
        bind:show={showInspectionDateModal}
        {confirmBtnText}
        hasError={inspectionDate == ""}
        errorMessage="車検日を選択してください。"
      >
        <div slot="itemName">
          <h2>車検日</h2>
        </div>
        <div slot="selectionContent" class="selectionContent">
          {#each inspectionDateOptions.value as option}
            <CarInfoSingleSelectOption
              value={option}
              bind:selectedOptions={inspectionDate}
              on:click={handleCheckboxChangeInspectionDate}
            ></CarInfoSingleSelectOption>
          {/each}
        </div>
      </Modal>
    {/if}

    {#if isInspectionDateAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">{inspectionDate}</span>です。
      </ChatBalloons>
    {/if}

    {#if isLoanRequest}
      <ChatBalloons isWait={false}>
        現在、<span class="boldText">ローン残債</span>はありますか？
      </ChatBalloons>

      <DelayedDisplay>
        <div class="optionWrap">
          {#each loanOptions.value as option}
            <CarInfoSingleSelectOption
              value={option}
              bind:selectedOptions={loan}
              variant="buttonOption"
            ></CarInfoSingleSelectOption>
          {/each}
        </div>
      </DelayedDisplay>
    {/if}

    {#if isLoanAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">{loan}</span>。
      </ChatBalloons>
    {/if}

    {#if isDesiredTimeRequest}
      <ChatBalloons isWait={false}>
        <span class="boldText">売却時期</span>はいつ頃お考えでしょうか？
      </ChatBalloons>

      <DelayedDisplay>
        <button
          type="button"
          class="selectHandle"
          on:click={() => {
            showDesiredTimeModal = true;
          }}
        >
          {#if isDesiredTime !== ""}
            {isDesiredTime}
          {:else}
            選択してください
          {/if}
        </button>
      </DelayedDisplay>

      <Modal
        bind:show={showDesiredTimeModal}
        {confirmBtnText}
        hasError={isDesiredTime == ""}
        errorMessage="売却時期を選択してください。"
      >
        <div slot="itemName">
          <h2>売却時期</h2>
        </div>
        <div slot="selectionContent" class="selectionContent">
          {#each DesiredTimeOptions.value as option}
            <CarInfoSingleSelectOption
              value={option}
              bind:selectedOptions={isDesiredTime}
              on:click={handleCheckboxChangeDesiredTime}
            ></CarInfoSingleSelectOption>
          {/each}
        </div>
      </Modal>
    {/if}

    {#if isDesiredTimeAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">{isDesiredTime}</span>です。
      </ChatBalloons>
    {/if}

    {#if isCandidateDateRequest}
      <div>
        <ChatBalloons isWait={false}>
          <span class="boldText">査定候補日</span>を教えてください
        </ChatBalloons>
      </div>
      <DelayedDisplay>
        <CandidateDatePicker
          bind:date={candidateDate}
          cssClass="selectHandle"
        />
      </DelayedDisplay>
    {/if}

    {#if isCandidateDateAnswer}
      <ChatBalloons variant="user" isWait={false}>
        <span class="boldText">{formattedCandidateDate}</span>です
      </ChatBalloons>
    {/if}

    {#if isThankYouMessage}
      <ChatBalloons>
        ここまで8項目をご回答いただき、ありがとうございます！
      </ChatBalloons>
    {/if}

    <!-- {#if isReminderMessage}
      <DelayedDisplay delayTime={750}>
        <ChatBalloons showIcon={false}>質問は残り4項目です。</ChatBalloons>
      </DelayedDisplay>
    {/if} -->

    {#if isEncouragementIllustration}
      <DelayedDisplay delayTime={1000}>
        <img
          src={getImageUrl("/image/stamp_almost.webp")}
          alt="後少しです"
          width="100%"
          height="auto"
        />
      </DelayedDisplay>
    {/if}
  </svelte:fragment>
</GridContainer>

<GridContainer>
  <svelte:fragment slot="items">
    {#if isPersonMessage}
      <DelayedDisplay delayTime={500}>
        <ChatBalloons>最後にお客様の情報を教えてください。</ChatBalloons>
      </DelayedDisplay>
    {/if}

    {#if isShowAddressInput}
      <DelayedDisplay>
        <div id="isShowAddressInput">
          <InputWrap>
            <Input
              slot="input"
              name="your-name"
              readonly={isShowContactRequest && isNotModifyMode}
              bind:value={$formStore.yourname}
              label="お名前"
              placeholder="山田太郎"
              required
              autocomplete="name"
              on:change={debounce((event) => {
                nameInputHandler(event);
              }, actionWaitTime)}
            />
            <svelte:fragment slot="error">
              {#if !validateYourname.isValid}
                <ErrorMessageBox>{validateYourname.message}</ErrorMessageBox>
              {/if}
            </svelte:fragment>
          </InputWrap>
        </div>

        <InputWrap>
          <Input
            type="number"
            inputmode="numeric"
            slot="input"
            name="zipcode"
            readonly={isShowContactRequest && isNotModifyMode}
            bind:value={$formStore.zipcode}
            label="郵便番号"
            placeholder="1234567(ハイフンなし)"
            required
            autocomplete="postal-code"
            replaceKeyword="-"
            on:input={restrictNumeric}
            on:keyup={debounce((event) => {
              zipCodeInputHandler(event);
            }, 250)}
            on:change={debounce((event) => {
              zipCodeInputHandler(event);
            }, 250)}
          />
          <svelte:fragment slot="error">
            {#if !validateZipcode.isValid}
              <ErrorMessageBox>{validateZipcode.message}</ErrorMessageBox>
            {/if}
            {#if isShowAddressSearchError}
              <ErrorMessageBox
                >住所取得に失敗しました。フォームへの入力をお願いします。</ErrorMessageBox
              >
            {/if}
          </svelte:fragment>
        </InputWrap>

        <InputWrap>
          <svelte:fragment slot="input">
            <Input
              name="address"
              readonly
              bind:value={$formStore.address}
              label="住所"
              required
              autocomplete="address-level1"
              on:change={debounce((event) => {
                addressInputHandler(event);
              }, actionWaitTime)}
            />
            {#if isAddressSearchRunning && !isShowAddressSearchError}
              <Spinner></Spinner>
            {/if}
          </svelte:fragment>
          <svelte:fragment slot="error">
            {#if !validateAddress.isValid}
              <ErrorMessageBox>{validateAddress.message}</ErrorMessageBox>
            {/if}
          </svelte:fragment>
        </InputWrap>
      </DelayedDisplay>
    {/if}

    {#if isShowThankRequest}
      <!-- memo: スクロールした時の位置を合わせるためにheightを指定 -->
      <div style="min-height: 12rem;">
        <ChatBalloons>
          ご入力ありがとうございます<br
          />続いて、査定結果の連絡先の入力をお願いします。
        </ChatBalloons>
      </div>
    {/if}

    {#if isShowContactInput}
      <DelayedDisplay>
        <InputWrap>
          <Input
            slot="input"
            name="your-email"
            placeholder="example@gmail.com"
            readonly={isShowInputEnd && isNotModifyMode}
            required
            autocomplete="email"
            bind:value={$formStore.youremail}
            label="メールアドレス"
            on:keypress={debounce((event) => {
              emailInputHandler(event);
            }, actionWaitTime)}
            on:keyup={debounce((event) => {
              emailInputHandler(event);
            }, actionWaitTime)}
            on:change={debounce((event) => {
              emailInputHandler(event);
            }, actionWaitTime)}
          />
          <svelte:fragment slot="error">
            {#if !validateYouremail.isValid}
              <ErrorMessageBox>{validateYouremail.message}</ErrorMessageBox>
            {/if}
          </svelte:fragment>
        </InputWrap>

        <InputWrap>
          <Input
            slot="input"
            name="tel"
            inputmode="numeric"
            placeholder="09012345678(ハイフン無し)"
            cautionMessage="査定結果のご連絡やご本人様確認のために使用いたします"
            readonly={isShowInputEnd && isNotModifyMode}
            required
            autocomplete="tel"
            replaceKeyword="-"
            bind:value={$formStore.tel}
            label="電話番号"
            on:keypress={debounce((event) => {
              telInputHandler(event);
            }, actionWaitTime)}
            on:keyup={debounce((event) => {
              telInputHandler(event);
            }, actionWaitTime)}
            on:change={debounce((event) => {
              telInputHandler(event);
            }, actionWaitTime)}
          />
          <svelte:fragment slot="error">
            {#if !validateTel.isValid}
              <ErrorMessageBox>{validateTel.message}</ErrorMessageBox>
            {/if}
          </svelte:fragment>
        </InputWrap>
      </DelayedDisplay>
    {/if}

    {#if isShowInputEnd}
      <ChatBalloons width="100%">
        <p>
          ご入力ありがとうございました！<br />入力内容の確認をお願いします。
        </p>
        <PersonalInfoConfirmField information={$formStore} />
        <div>
          <Button
            variant="decision"
            disabled={isClickAuthCodeRequest && isRequestAuthCode}
            on:click={async () => {
              const savedParams = sessionStorage.getItem("savedParameters");
              const rawResponseData = localStorage.getItem("responseData");

              let response_id;
              if (rawResponseData !== null) {
                response_id = parseInt(rawResponseData, 10);
                if (isNaN(response_id)) response_id = undefined;
              }

              let remoteIP;
              if (savedParams) {
                try {
                  const savedParamObj = JSON.parse(savedParams);
                  remoteIP = savedParamObj?.userIP;
                } catch (error) {
                  console.error("Failed to parse saved parameters:", error);
                }
              }

              isClickAuthCodeRequest = true;
              isNotModifyMode = true;

              const [authCodeRequestSuccess, conflictStatus] =
                await requestAuthCode(
                  $formStore.tel,
                  $formStore.youremail,
                  response_id,
                  remoteIP,
                  $formStore.yourname,
                );
              isRequestAuthCode = authCodeRequestSuccess;
              isDuplicateAppraisal = conflictStatus;
            }}>送信する</Button
          >
          <Button
            variant="decision-outline"
            disabled={isClickAuthCodeRequest &&
              isRequestAuthCode &&
              !isDuplicateAppraisal}
            on:click={() => {
              isNotModifyMode = false;
              validateInit();
              handleClick();
            }}>修正する</Button
          >
        </div>
      </ChatBalloons>
    {/if}

    {#if isClickAuthCodeRequest && isRequestAuthCode && !isDuplicateAppraisal}
      <ChatBalloons>
        いたずら・なりすまし防止のため、ご本人様の電話番号の認証を行っております。<br
        />
        ご入力頂いた電話番号に4桁の数字（認証コード）を送信しました。<br />
        携帯電話のメッセージアプリに届いている4桁の数字（認証コード）を下記へご入力ください。
      </ChatBalloons>
    {/if}
    {#if isClickAuthCodeRequest && !isRequestAuthCode && isNotModifyMode && !isDuplicateAppraisal}
      <!-- 認証に失敗した場合のメッセージ -->
      <ChatBalloons>申し訳ありません。SMSの送信に失敗しました。</ChatBalloons>
    {/if}

    {#if isShowAuthButton}
      <DelayedDisplay>
        <InputWrap>
          <Input
            slot="input"
            name="sms-num"
            type="text"
            bind:value={authCode}
            label="認証番号"
            on:keypress={authCodeInputHandler}
            on:keyup={authCodeInputHandler}
            on:change={async () => {
              if (!validateAuthCode.isValid) return;
              isAuthSmsCode = await authSmsCode($formStore.tel, authCode);
              isClickAuth = true;
            }}
          />
          <svelte:fragment slot="error">
            {#if !validateAuthCode.isValid}
              <ErrorMessageBox>{validateAuthCode.message}</ErrorMessageBox>
            {/if}
          </svelte:fragment>
        </InputWrap>
      </DelayedDisplay>
    {/if}

    {#if isClickAuth && !isAuthSmsCode}
      <!-- 認証に失敗した場合のメッセージ -->
      <ChatBalloons>
        認証に失敗しました。<br />認証番号をご確認ください。
      </ChatBalloons>
    {/if}

    {#if isClickAuth && isAuthSmsCode}
      <!-- 認証に成功した場合 -->
      <ChatBalloons>
        お疲れ様でした。入力は以上です。<br />
        「無料査定する」ボタンを押してください。
      </ChatBalloons>
      <DelayedDisplay>
        <Button
          variant="decision"
          on:click={async () => {
            onFormSubmit();
          }}>無料査定する</Button
        >
      </DelayedDisplay>
    {/if}
  </svelte:fragment>
</GridContainer>

<!-- memo: test formでpost通信するため、style="display:none; でformを設置する -->
<!-- memo: checkboxはcheckedをbindして、値を変更する -->
<div style="display:none;">
  <!-- 排気量 -->
  <select name={engineCapacityOptions.name}>
    <option value="" selected={engineCapacity === ""}></option>
    {#each engineCapacityOptions.value as option}
      <option value={option} selected={engineCapacity === option}
        >{option}</option
      >
    {/each}
  </select>

  <!-- 走行距離 -->
  {#each runOptions.value as option}
    <input
      type="checkbox"
      name={runOptions.name}
      value={option}
      checked={run === option}
    />
  {/each}

  <!-- ローン残債 -->
  {#each loanOptions.value as option}
    <input
      type="checkbox"
      name={loanOptions.name}
      value={option}
      checked={loan === option}
    />
  {/each}

  <!-- 車検日 -->
  {#each inspectionDateOptions.value as option}
    <input
      type="checkbox"
      name={inspectionDateOptions.name}
      value={option}
      checked={inspectionDate === option}
    />
  {/each}
  <!-- 燃料 -->
  {#each fuelOptions.value as option}
    <input
      type="checkbox"
      name={fuelOptions.name}
      value={option}
      checked={fuel === option}
    />
  {/each}
  <!-- 外装の状態 -->
  {#each exteriorConditionOptions as option}
    <input
      type="checkbox"
      name={option.name}
      value={option.value}
      checked={exteriorCondition.includes(option.value)}
    />
  {/each}
  <!-- ボディカラー -->
  {#each colorOptions as option}
    <input
      type="checkbox"
      name={option.name}
      value={option.value}
      checked={colorAnswerText.includes(option.value)}
    />
  {/each}
  <!-- ナビ -->
  {#each navigationOptions.value as option}
    <input
      type="checkbox"
      name={navigationOptions.name}
      value={option}
      checked={navigation === option}
    />
  {/each}
  <!-- 電動スライド -->
  {#each electricSlideOptions.value as option}
    <input
      type="checkbox"
      name={electricSlideOptions.name}
      value={option}
      checked={electricSlide === option}
    />
  {/each}
  <!-- オプション -->
  {#each otherItemsOptions as option}
    <input
      type="checkbox"
      name={option.name}
      value={option.value}
      checked={otherItems.includes(option.value)}
    />
  {/each}
  <!-- 査定候補日 -->
  <input type="date-881" name="shane" bind:value={formattedCandidateDate} />
</div>

<style lang="scss">
  .white-background {
    background-color: white;
  }
  .scroll {
    overflow: auto;
  }

  .black-background {
    background-color: black;
  }

  .vehicleTop {
    margin-top: 50px;
  }
  .optionWrap {
    margin: 0.5rem 0;
    display: flex;
    gap: 5%;
  }

  .boldText {
    font-weight: bold;
  }

  .selectionContent {
    display: grid;
    gap: 20px;

    &[data-grid-row="3"] {
      grid-template-columns: repeat(3, 1fr);
    }
    &[data-grid-row="2"] {
      grid-template-columns: repeat(2, 1fr);
    }
    &[data-grid-tile="true"] {
      width: 100%;
      margin: 0 auto;
    }
  }

  .unmatchedOption {
    margin-top: 14px;
  }

  .modalSubtitle {
    color: #858585;
  }

  .otherItemsContainer {
    margin: 1.5rem 0;
    .label {
      font-size: 14px;
      font-weight: bold;
      text-shadow: 1px 1px 2px white;
      margin-bottom: 0;
      line-height: 1;
    }
  }

  :global(.selectHandle) {
    box-sizing: border-box;
    width: 100%;
    border-radius: 8px;
    border: 1px #c0c0c0 solid;
    background: white;
    box-shadow: 0 -18px 33.599998474121094px rgba(5.32, 5.32, 5.32, 0.06) inset;
    color: #787676;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    padding: 13px;
    text-align: left;
    position: relative;
    &::after {
      content: "";
      background-size: contain;
      background-repeat: no-repeat;
      display: block;
      width: 16px;
      height: 16px;
      position: absolute;
      top: 50%;
      right: 15px;
      background-image: url(../../shared/image/selectbox_arrow.webp);
      transform: translateY(-50%);
    }
  }
</style>
