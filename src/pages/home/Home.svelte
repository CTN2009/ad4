<script lang="ts">
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import Layout from "@components/Layout.svelte";
  import { postUrl } from "@consts/consts";
  function handleClick() {
    alert("ボタンがクリックされました！");
    push("/chat");
  }
</script>

<div class="container">
  <button on:click={handleClick}> クリックしてください </button>
</div>
