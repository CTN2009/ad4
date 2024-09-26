<script lang="ts">
 import { createEventDispatcher } from 'svelte';

  export let value: string;
  export let imgUrl: string;
  export let group: string[]; // 複数の選択肢が格納される配列
  export let disabled: boolean;

  let checked: boolean;

  // Update checked status based on the group
  $: checked = group.includes(value);

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }

  // Modify the checkToggle function to ensure at least one option is always selected
  const checkToggle = (): void => {
    // If there is only one item in the group and it's the current value, don't allow deselect
    if (checked && group.length === 1) {
      return; // Block deselect if it's the last selected option
    }

    if (!checked) {
      group = [value];
    } else {
      // 選択されている場合は解除
      group = group.filter(item => item !== value);
    }

    // チェックを反転
    checked = !checked;
  };


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="option"
  role="checkbox"
  aria-checked={checked}
  tabindex="0"
  on:click={checkToggle}
  on:click={handleClick}
>
  <div
    class="backImg {disabled ? 'disabled' : ''}"
    style="background-image: url('{imgUrl}')"
  ></div>
  <div class="customCheckbox {checked ? 'checked' : ''}"></div>

  <span class="optionName" style="color: {value === 'ホワイト' ? 'black' : (value === '不明' ? 'black' : 'white')}">{value}</span>
</div>

<style lang="scss">
  .option {
    aspect-ratio: 1 / 1;
    border-radius: var(--ctn-button-radius);
    position: relative;
    cursor: pointer;
  }

  .backImg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: var(--ctn-button-radius);
    background-size: cover;
  }

  .backImg.isDark {
    filter: brightness(0.3);
  }

  .backImg.disabled {
    opacity: 0.6;
  }

  .optionName {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
  }

  .customCheckbox {
    box-sizing: border-box;
    width: 20%;
    height: 20%;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #e6e6e6;
    border: 2px solid #fff;
    border-radius: var(--ctn-radius);
  }

  .customCheckbox::after {
    content: "";
    background-image: url("../image/check_white.webp");
    background-size: 75% 55%;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    opacity: 0;
  }

  .customCheckbox.checked {
    background-color: #19dc15;
    border: none;
  }

  .customCheckbox.checked::after {
    opacity: 1;
  }
</style>
