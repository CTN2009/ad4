<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface Option {
    label: string;
    value: string;
  }

  export let option: Option | null = null;
  export let value: string | null = null;
  export let selectedOptions: string;
  export let selectedDisplayValue: string = "";
  export let variant: "radioOption" | "radioOption-columns" | "buttonOption" = "radioOption";
  export let className: string = "";

  let checked: boolean;
  let displayValue: string;
  let optionValue: string;

  $: {
    if (option) {
      displayValue = option.label;
      optionValue = option.value;
    } else if (value !== null) {
      displayValue = value;
      optionValue = value;
    } else {
      displayValue = "";
      optionValue = "";
    }
    checked = selectedOptions === optionValue;
    if (checked) {
      selectedDisplayValue = displayValue;
    }
  }

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }

  const checkToggle = () => {
    checked = !checked;
    if (checked === true) {
      selectedOptions = optionValue;
      selectedDisplayValue = displayValue;
    } else if (optionValue === selectedOptions) {
      checked = true;
    } else {
      selectedOptions = "";
      selectedDisplayValue = "";
    }
    dispatch("select", { selectedOptions, selectedDisplayValue });
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="option {checked ? 'checked' : ''} {className}"
  role="checkbox"
  aria-checked={checked}
  tabindex="0"
  on:click={checkToggle}
  on:click={handleClick}
  data-variant={variant}
>
  <div
    class="customRadio {checked ? 'checked' : ''}"
    data-variant={variant}
  ></div>
  {displayValue}
</div>

<style lang="scss">
  .option {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    border-radius: var(--ctn-button-radius);
    cursor: pointer;
    font-size: 14px;

    border: 1px solid #474747;
    color: #474747;
    background-color: #f5f5f5;
    box-shadow: 0 -5px 0 0 #00000040 inset;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .option.checked {
    background-color: var(--ctn-radio-green);
    color: #fff;
    border: 2px solid #474747;
    vertical-align: middle;
  }

  .option[data-variant="radioOption-columns"] {
    padding-left: 0;
    justify-content: center;
  }

  .option[data-variant="buttonOption"] {
    color: var(--ctn-primary);
    background-color: #fff;
    border: solid 1px var(--ctn-primary);
    padding: 10px 20px;
    font-size: 16px;
    box-shadow: 0 -4px 0 0 #00000040 inset;
    justify-content: center;
  }
  .option.checked[data-variant="buttonOption"] {
    color: #fff;
    border: transparent;
    background-color: var(--ctn-primary);
    box-shadow: 0 -5px 0 0 #00000040 inset;
  }

  .customRadio {
    box-sizing: border-box;
    width: 20px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #9e9e9e;
  }

  .customRadio.checked {
    position: relative;
    border: none;
    &::before {
      content: "";
      width: 55%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      position: absolute;
      background-color: var(--ctn-radio-green);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .customRadio[data-variant="buttonOption"] {
    visibility: hidden;
    position: absolute;
  }
</style>