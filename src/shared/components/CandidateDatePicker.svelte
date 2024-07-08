<script lang="ts">
  import { DateInput } from "date-picker-svelte";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { getImageUrl } from "@consts/consts";
  export let cssClass: string = "";
  export let date: Date | null;

  const getFutureDate = (options: { month?: number; day?: number }): Date => {
    let futureDate = dayjs();
    if (options.month) {
      futureDate = futureDate.add(options.month, "month");
    }
    if (options.day) {
      futureDate = futureDate.add(options.day, "day");
    }
    return futureDate.toDate();
  };

  let minDate: Date = getFutureDate({ day: 3 });
  let maxDate: Date = getFutureDate({ month: 1, day: -1 });

  // 進捗に基づいて車の位置を計算する
  $: marginBottom = date ? "" : "10rem";

  onMount(() => {
    const dateContentElement = document.querySelector(".dateContent");

    if (dateContentElement) {
      dateContentElement.addEventListener("click", () => {
        window.scrollTo(0, window.scrollY + 300);
      });
    }

    const input = document.querySelector(".date-time-field input");
    if (input) {
      input.setAttribute("readonly", "readonly");
    }
  });

  let isIosSafari: boolean = false;
  let visible: boolean = false;

  onMount(() => {
    if (
      /iP(hone|od|ad)/.test(navigator.userAgent) &&
      /Safari/.test(navigator.userAgent)
    ) {
      isIosSafari = true;
    }
  });

  const handleFocusOut = (event: Event) => {
    if (date == null && isIosSafari === true) {
      visible = true;
    }
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="dateContent {cssClass}"
  style="margin-bottom: {marginBottom};"
  on:focusout={handleFocusOut}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <img
    src={getImageUrl("/image/calendar_icon.webp")}
    class="calendarIcon"
    alt=""
    on:focusout={handleFocusOut}
  />
  <DateInput
    bind:value={date}
    format="yyyy/MM/dd"
    min={minDate}
    max={maxDate}
    placeholder="選択してください"
    closeOnSelection={true}
    bind:visible
    locale={{
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      months: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      weekStartsOn: 7,
    }}
  />
</div>

<style>
  .dateContent {
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
  }

  .calendarIcon {
    position: absolute;
    margin-left: 10px;
    width: 15px;
    height: 16px;
  }

  /* ------------------------------------------------------------------------ */
  /* -- デザインに合わせる為に、「date-picker-svelte」ライブラリのstyleを上書きする -- */
  /* ------------------------------------------------------------------------ */

  /* 選択欄inputの枠 */
  .dateContent :global(.date-time-field) {
    width: 100%;
    height: 100%;
    line-height: 1;
    position: static;
  }

  /* 選択欄inputの本体 */
  .dateContent :global(.date-time-field > input[type="text"]) {
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding-left: 35px;
    border: none;
    background-color: transparent;
  }

  /* カレンダーの枠 */
  .dateContent :global(.date-time-field .picker) {
    width: 100%;
    top: 3rem;
    left: 0;
  }

  /* カレンダーの本体 */
  .dateContent :global(.date-time-field .picker .date-time-picker) {
    width: 100%;
    font-size: 1.5rem;
    padding: 1rem 1rem 0.5rem 1rem;
  }

  .dateContent :global(.date-time-field .picker .top) {
    padding-bottom: 1rem;
  }

  .dateContent :global(.date-time-field .picker .dropdown) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .dateContent :global(.date-time-field .picker .dropdown svg) {
    padding: 0rem 1rem;
  }

  .dateContent :global(.date-time-field .picker .page-button:nth-child(1)) {
    width: 3rem;
    height: 2.5rem;
    background-image: url("../image/back-icon.webp");
    background-size: contain;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .dateContent :global(.date-time-field .picker .page-button:last-child) {
    width: 3rem;
    height: 2.5rem;
    background-image: url("../image/front-icon.webp");
    background-size: contain;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  .dateContent :global(.date-time-field .picker .page-button svg) {
    width: 1.36rem;
    height: 1.36rem;
    display: none;
  }

  .dateContent :global(.date-time-field .picker select) {
    padding: 0rem 0.7rem;
    height: 2.5rem;
    padding-right: 2.6rem;
  }

  .dateContent :global(.date-time-field .picker .header-cell) {
    width: 3.75rem;
  }

  .dateContent :global(.date-time-field .picker .cell) {
    width: 4rem;
    height: 3rem;
  }

  /* カレンダー内部の範囲外日付 */
  .dateContent :global(.date-time-field .picker .cell.disabled) {
    visibility: visible;
    opacity: 0.4;
  }

  .dateContent :global(.date-time-field .picker .header) {
    & .header-cell:first-child {
      color: red;
    }

    & .header-cell:last-child {
      color: blue;
    }
  }

  .dateContent :global(.date-time-field .picker .week) {
    & .cell:first-child {
      color: red;
    }

    & .cell:last-child {
      color: blue;
    }
  }
</style>
