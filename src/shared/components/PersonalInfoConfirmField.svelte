<script lang="ts">
  export let information: Record<string, string> = {};
</script>

<dl>
  <div class="ddItem">
    <dt>名前</dt>
    <dd>{information.yourname}</dd>
  </div>
  <div class="ddItem">
    <dt>郵便番号</dt>
    <dd>{information.zipcode}</dd>
  </div>
  <!-- <div class="ddItem">
    <dt>番地</dt>
    <dd>{information.address2}</dd>
  </div> -->
  <div class="ddItem">
    <dt>住所</dt>
    <dd>{information.address}</dd>
  </div>
  <!-- <div class="ddItem">
    <dt>マンション名</dt>
    <dd>{information.manson !== "" ? information.manson : "--"}</dd>
  </div> -->
  <div class="ddItem">
    <dt>メールアドレス</dt>
    <dd>{information.youremail}</dd>
  </div>
  <div class="ddItem">
    <dt>電話番号</dt>
    <dd>{information.tel}</dd>
  </div>
</dl>

<style lang="scss">
  dl {
    border-top: dashed 2px #000;
    margin-block-start: 1.4rem;
    padding-block-start: 1.4rem;
    margin-block-end: 2rem;
  }
  .ddItem {
    margin-block-end: 1rem;
    & dt {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
</style>
