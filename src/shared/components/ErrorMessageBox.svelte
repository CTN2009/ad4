<script lang="ts">
</script>

<div class="errorMessage">
  <slot />
</div>

<style lang="scss">
  .errorMessage {
    margin-top: 0.3rem;
    color: red;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0 1px #fff, 1px 0 #fff, -1px 0 #fff, 0 -1px #fff;
  }
</style>
