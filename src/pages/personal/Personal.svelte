<script lang="ts">
  import { onMount } from "svelte";
  import debounce from "debounce";
  import { formStore } from "@store/personal";
  import GridContainer from "@components/GridContainer.svelte";
  import Input from "@components/Input.svelte";
  import Button from "@components/Button.svelte";
  import ChatBalloons from "@components/ChatBalloons.svelte";
  import ErrorMessageBox from "@components/ErrorMessageBox.svelte";
  import {
    handleScrollToBottom,
    handleScrollToTop,
  } from "src/shared/scripts/handleScrollToBottom";
  import addressSearch from "@scripts/addressSearch";
  import {
    genericInputHandler,
    initValidationResult,
    zipcodeHandler,
  } from "@scripts/validate";
  import { actionWaitTime, mansionOptions, getImageUrl } from "@consts/consts";
  import InputWrap from "@components/InputWrap.svelte";
  import requestAuthCode from "@scripts/requestAuthCode";
  import authSmsCode from "@scripts/authSmsCode";
  import PersonalInfoConfirmField from "@components/PersonalInfoConfirmField.svelte";
  import { countTrue } from "@scripts/utils";
  import CarInfoSingleSelectOption from "@components/CarInfoSingleSelectOption.svelte";
  import DelayedDisplay from "@components/DelayedDisplay.svelte";
  import Spinner from "@components/Spinner.svelte";

  // memo: 個人情報の入力と個人認証が完了した事を親コンポーネントに伝える
  export let isPersonalInputComplete: boolean = false;
  export let compliedCount: number;

  // memo: ページ表示状況のstate.
  let isShowPersonalInfoRequest = false;
  let isShowContactRequest = false;
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
      ($formStore.address2 = ""),
      ($formStore.manson = ""),
      ($formStore.youremail = ""),
      ($formStore.tel = "");
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

  const addressInputHandler = (event: Event): void => {
    validateAddress = genericInputHandler(event, "address");
  };

  const address2InputHandler = (event: Event): void => {
    validateAddress2 = genericInputHandler(event, "address2");
  };

  const mansonSelectHandler = (_: Event) => {
    isClickMansion = true;
    if (mansionYesNo === "いいえ") {
      $formStore.manson = "";
      validateManson.isValid = true;
    }
  };

  const otherAddrInputHandler = (event: Event): void => {
    if ((event.target as HTMLInputElement).value == "") {
      validateManson = {
        isValid: false,
        message: "マンション名は必須入力です。",
      };
    } else {
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

  // memo: 名前・住所入力のvalidationに通るまで後続のコンテンツを表示しない
  $: isValidAddress =
    validateYourname.isValid &&
    validateZipcode.isValid &&
    validateAddress.isValid &&
    validateAddress2.isValid;

  $: if (isValidAddress) {
    handleScrollToBottom({ waitTime: 1250, compensation: 120 });
    isShowMansionQuestion = true;
  }

  $: if (isShowMansionQuestion) {
    handleScrollToBottom();
    isShowMansionInput = true;
  }

  $: if (isClickMansion && mansionYesNo === "はい") {
    handleScrollToBottom({ isWait: false, compensation: 100 });
    isShowMansionNameInput = true;
  }

  $: isCompleteMansion =
    (mansionYesNo === "はい" && validateManson.isValid) ||
    (isClickMansion && mansionYesNo == "いいえ");

  $: if (isCompleteMansion) {
    handleScrollToBottom({ isWait: false, compensation: 350 });
    isShowContactRequest = true;
  }

  $: if (isShowContactRequest) {
    handleScrollToBottom({ waitTime: 1250 });
    isShowContactInput = true;
  }

  $: if (validateYouremail.isValid && validateTel.isValid) {
    handleScrollToBottom({ waitTime: 1250, compensation: 100 });
    isShowInputEnd = true;
  }

  $: if (isClickAuthCodeRequest && isRequestAuthCode) {
    handleScrollToBottom({ waitTime: actionWaitTime });
    isShowAuthButton = true;
  }

  $: if (isClickAuthCodeRequest && !isRequestAuthCode && isNotModifyMode) {
    handleScrollToBottom({ isWait: false });
  }

  $: if (isRequestAuthCode) {
    handleScrollToBottom({ waitTime: 1250 });
  }

  $: if (validateAuthCode.isValid) {
    handleScrollToBottom({ compensation: 100 });
  }

  $: compliedCount = countTrue(
    isValidAddress,
    isCompleteMansion,
    isShowInputEnd,
    isRequestAuthCode,
    isClickAuthentication,
    isAuthSmsCode,
  );

  // memo: 車両情報コンポーネントを表示させるため、認証完了でstateを切り替えて親コンポーネントに通知する
  $: if (isClickAuth && isAuthSmsCode) {
    handleScrollToBottom({ isWait: false });
    handleScrollToBottom({ waitTime: 1500 });
    setTimeout(() => (isPersonalInputComplete = true), actionWaitTime * 3);
  }

  $: if (isClickAuth && !isAuthSmsCode) {
    handleScrollToBottom({ isWait: false });
  }

  isClickAuth && !isAuthSmsCode;
</script>

<GridContainer>
  <svelte:fragment slot="items">
    {#if isShowAddressInput}
      <DelayedDisplay>
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

        <InputWrap>
          <Input
            slot="input"
            name="zipcode"
            readonly={isShowContactRequest && isNotModifyMode}
            bind:value={$formStore.zipcode}
            label="郵便番号"
            placeholder="0000000"
            required
            autocomplete="postal-code"
            replaceKeyword="-"
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

        <InputWrap>
          <Input
            slot="input"
            name="address2"
            placeholder="1-1-1"
            readonly={isShowMansionQuestion && isNotModifyMode}
            bind:value={$formStore.address2}
            label="番地"
            autocomplete="off"
            required
            on:keyup={debounce((event) => {
              address2InputHandler(event);
            }, actionWaitTime)}
            on:change={debounce((event) => {
              address2InputHandler(event);
            }, actionWaitTime)}
            on:change={debounce((event) => {
              address2InputHandler(event);
            }, actionWaitTime)}
          />
          <svelte:fragment slot="error">
            {#if !validateAddress2.isValid}
              <ErrorMessageBox>{validateAddress2.message}</ErrorMessageBox>
            {/if}
          </svelte:fragment>
        </InputWrap>
      </DelayedDisplay>
    {/if}

    {#if isShowMansionQuestion}
      <ChatBalloons>住居はマンションですか？</ChatBalloons>
    {/if}

    {#if isShowMansionInput}
      <DelayedDisplay>
        <div class="optionWrap">
          {#each mansionOptions.value as option}
            <CarInfoSingleSelectOption
              value={option}
              bind:selectedOptions={mansionYesNo}
              variant="buttonOption"
              on:select={mansonSelectHandler}
            />
          {/each}
        </div>
      </DelayedDisplay>
    {/if}

    {#if isClickMansion && mansionYesNo == "はい"}
      <DelayedDisplay delayTime={0}>
        <InputWrap>
          <Input
            slot="input"
            name="manson"
            placeholder="Casa Advance 2F"
            bind:value={$formStore.manson}
            readonly={isCompleteMansion && isNotModifyMode}
            label="マンション名"
            required
            autocomplete="off"
            on:keypress={debounce((event) => {
              otherAddrInputHandler(event);
            }, actionWaitTime)}
            on:keyup={debounce((event) => {
              otherAddrInputHandler(event);
            }, actionWaitTime)}
            on:change={debounce((event) => {
              otherAddrInputHandler(event);
            }, actionWaitTime)}
          />
        </InputWrap>
      </DelayedDisplay>
    {/if}

    {#if isShowContactRequest}
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
              isClickAuthCodeRequest = true;
              isNotModifyMode = true;
              isRequestAuthCode = await requestAuthCode($formStore.tel);
            }}>送信する</Button
          >
          <Button
            variant="decision-outline"
            disabled={isClickAuthCodeRequest && isRequestAuthCode}
            on:click={() => {
              isNotModifyMode = false;
              validateInit();
              handleScrollToTop({ isWait: false, compensation: 275 });
            }}>修正する</Button
          >
        </div>
      </ChatBalloons>
    {/if}

    {#if isClickAuthCodeRequest && isRequestAuthCode}
      <ChatBalloons>
        いたずら・なりすまし防止のため、ご本人様の電話番号の認証を行っております。<br
        />
        ご入力頂いた電話番号に4桁の数字（認証コード）を送信しました。<br />
        携帯電話のメッセージアプリに届いている4桁の数字（認証コード）を下記へご入力ください。
      </ChatBalloons>
    {/if}

    {#if isClickAuthCodeRequest && !isRequestAuthCode && isNotModifyMode}
      <ChatBalloons>申し訳ありません。SMSの送信に失敗しました。</ChatBalloons>
    {/if}

    {#if isShowAuthButton}
      <DelayedDisplay>
        <InputWrap>
          <Input
            slot="input"
            name="sms-num"
            type="text"
            readonly={isClickAuth && isAuthSmsCode}
            bind:value={authCode}
            label="認証番号"
            on:keypress={authCodeInputHandler}
            on:keyup={authCodeInputHandler}
            on:change={authCodeInputHandler}
          />
          <svelte:fragment slot="error">
            {#if !validateAuthCode.isValid}
              <ErrorMessageBox>{validateAuthCode.message}</ErrorMessageBox>
            {/if}
          </svelte:fragment>
        </InputWrap>
        <!-- コンポーネントを表示させるための仮機能 -->
        {#if validateAuthCode.isValid}
          <DelayedDisplay delayTime={250}>
            <Button
              variant="decision"
              disabled={isClickAuth && isAuthSmsCode}
              on:click={async () => {
                if (!validateAuthCode.isValid) return;
                isAuthSmsCode = await authSmsCode($formStore.tel, authCode);
                isClickAuth = true;
              }}>認証する</Button
            >
          </DelayedDisplay>
        {/if}
      </DelayedDisplay>
    {/if}

    {#if isClickAuth && isAuthSmsCode}
      <ChatBalloons>ご本人様の認証が完了しました。</ChatBalloons>
      <DelayedDisplay>
        <div class="isAuthenticationImage">
          <img
            src={getImageUrl("/image/stamp_congratulations.webp")}
            alt=""
            width="100%"
            height="auto"
          />
        </div>
      </DelayedDisplay>
    {/if}

    {#if isClickAuth && !isAuthSmsCode}
      <ChatBalloons>
        認証に失敗しました。<br />認証番号をご確認ください。
      </ChatBalloons>
    {/if}
  </svelte:fragment>
</GridContainer>

<style lang="scss">
  .isAuthenticationImage {
    display: grid;
    justify-content: flex-end;
    text-align: right;
    & img {
      display: block;
    }

    @media (max-width: 800px) {
      & img {
        width: 100%;
      }
    }
  }

  .optionWrap {
    display: flex;
    gap: 5%;
    margin-bottom: 2rem;
  }
</style>
