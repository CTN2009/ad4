<script lang="ts">
  export let disabled = false;
  export let type: "button" | "reset" | "submit" = "button";
  export let variant:
    | "primary"
    | "primary-outline"
    | "secondary"
    | "decision"
    | "decision-outline" = "primary";
</script>

<button {type} class="button" data-variant={variant} {disabled} on:click>
  <slot />
</button>

<style lang="scss">
  .button {
    appearance: none;
    box-sizing: border-box;
    border: transparent;
    border-radius: var(--ctn-button-radius);
    cursor: pointer;
    color: #fff;
    outline: inherit;
    padding: 14px 10px 16px;
    text-align: center;
    width: 100%;
    font-size: 20px;
    line-height: 1.4;
    &[type="button"] {
      cursor: pointer;
    }
  }
  .button[data-variant="primary"] {
    background-color: var(--ctn-primary);
    border-bottom: 4px solid var(--ctn-primary-darken);
  }
  .button[data-variant="primary-outline"] {
    color: var(--ctn-primary);
    background-color: #fff;
    border: solid 1px var(--ctn-primary);
    position: relative;
    &::after {
      content: "";
      box-sizing: border-box;
      border-bottom: 4px solid #dedbdb;
      border-radius: var(--ctn-button-radius);
      display: block;
      width: 100%;
      height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .button[data-variant="secondary"] {
    background-color: var(--ctn-secondary);
    border-bottom: 4px solid var(--ctn-secondary-darken);
  }

  .button[data-variant="decision"] {
    background-color: var(--ctn-decision);
    border-bottom: 4px solid var(--ctn-decision-darken);
    box-shadow: 0 -5px 0 0 #bd380f inset;
  }
  .button[data-variant="decision-outline"] {
    color: var(--ctn-decision);
    background-color: #fff;
    border: solid 1px var(--ctn-decision);
    box-shadow: 0 -5px 0 0 darkgray inset;
  }

  .button:disabled {
    color: gray;
    background-color: darkgray;
    // border-bottom: gray;
    border: 1px solid gray;
    border-radius: var(--ctn-button-radius);
    box-shadow: 0 -5px 0 0 gray inset;
  }
  :global(.button + .button) {
    margin-top: 10px;
  }
</style>
