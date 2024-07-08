<script lang="ts">
</script>

<div class="gridContainer">
  <slot name="items" />
</div>

<style lang="scss">
  .gridContainer {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
</style>
