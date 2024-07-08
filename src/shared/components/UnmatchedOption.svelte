<script lang="ts">
  type UnmatchedGroup = {
    length: number;
  };

  export let label: string;
  export let checked: boolean;
  export let unmatchedGroup: UnmatchedGroup;

  const checkToggle = (): void => {
    checked = !checked;
    if (checked) {
      unmatchedGroup.length = 0;
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="option {checked ? 'checked' : ''}"
  role="checkbox"
  aria-checked={checked}
  tabindex="0"
  on:click={checkToggle}
>
  <div class="customRadio {checked ? 'checked' : ''}"></div>
  {label}
</div>

<style lang="scss">
  .option {
    box-sizing: border-box;
    margin-top: 0.5rem;
    width: 100%;
    height: 50px;
    border-radius: var(--ctn-button-radius);
    border: 1px solid #474747;
    cursor: pointer;
    color: #474747;
    background-color: #f5f5f5;
    box-shadow: 0 -5px 0 0 #00000040 inset;
    font-size: 18px;
    padding-left: 1.25rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .option.checked {
    background-color: var(--ctn-radio-green);
    color: #fff;
    border: 2px solid #474747;
    vertical-align: middle;
  }

  .customRadio {
    width: 20px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: #fff;
  }

  .customRadio.checked {
    position: relative;
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
</style>
