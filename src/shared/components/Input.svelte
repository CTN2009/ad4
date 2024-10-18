<script lang="ts">
  export let value: string | number = "";
  export let name: string = "";
  export let label: string = "";
  export let placeholder: string = "";
  export let required: boolean = false;
  export let readonly: boolean = false;
  export let type: "text" | "email" | "url" | "checkbox" | "number" | "tel" = "text";
  export let replaceKeyword: string = "";
  export let cautionMessage: string = "";
  export let autocomplete: string = "";
  export let isNumeric: boolean = false; // isNumericを追加してデフォルトをfalseに設定

  $: {
    if (replaceKeyword !== "" && typeof value === "string") {
      value = value.replace(replaceKeyword, "");
    }
  }

  const disableWheel = (event: Event) => {
    event.preventDefault();
  };

  const props = {
    class: "input",
    id: name,
    name,
    placeholder,
    required,
  };
</script>

<div class="inputField">
  <label class="label" for={name}>
    {label}{#if required}<span class="required">※必須</span>{/if}
  </label>
  {#if cautionMessage != ""}
    <small class="cautionMessage">{cautionMessage}</small>
  {/if}
  {#if type === "email"}
    <input
      type="email"
      inputmode="email"
      bind:value
      on:keypress
      on:keyup
      on:input
      on:change
      {...props}
      {readonly}
      {autocomplete}
    />
  {/if}
  {#if type === "url"}
    <input
      type="url"
      inputmode="url"
      bind:value
      on:keypress
      on:keyup
      on:input
      on:change
      {...props}
      {readonly}
      {autocomplete}
    />
  {/if}
  {#if type === "text"}
    <input
      type="text"
      inputmode={isNumeric ? "numeric" : undefined}
      bind:value
      on:keypress
      on:keyup
      on:input
      on:change
      {...props}
      {readonly}
      {autocomplete}
    />
  {/if}
  {#if type === "number"}
    <input
      type="number"
      inputmode="numeric"
      bind:value
      on:keypress
      on:input
      on:keyup
      on:change
      on:wheel={disableWheel}
      {...props}
      {readonly}
      {autocomplete}
    />
  {/if}
  {#if type === "tel"}
    <input
      type="tel"
      inputmode="tel"
      bind:value
      on:keypress
      on:input
      on:keyup
      on:change
      {...props}
      {readonly}
      {autocomplete}
    />
  {/if}
</div>

<style lang="scss">
  .inputField {
    display: grid;
    row-gap: 4px;
  }
  .label {
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 2px white;
    margin-bottom: 0;
    line-height: 1;
  }

  .required {
    color: #ff0000;
    display: inline-block;
    margin-inline-start: 5px;
    font-size: 12px;
    text-shadow: 1px 1px 2px white;
  }
  .cautionMessage{
    color: #ff0000;
    display: inline-block;
    margin-inline-start: 5px;
    font-size: 11px;
    font-weight:bold;
  }
  .input {
    border: var(--ctn-border);
    border-radius: var(--ctn-radius);
    font-size: 16px;
    padding: 10px;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
