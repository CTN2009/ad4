<div class="inputWrap">
  <slot name="input" />
  <slot name="error" />
</div>

<style lang="scss">
  .inputWrap {
    display: grid;
    grid-template-rows: 1fr 20px;
  }
</style>
