<svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
  ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
    d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
  /></svg
>

<style lang="scss">
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spinner path {
    fill: #999;
  }

  .spinner {
    animation: spin 2s linear infinite;
    width: 2.8rem;
    height: 2.8rem;
    margin-top: -3.6rem; // １箇所のみ設置予定だった為、マージンで暫定対応しています。
    margin-left: 50%; // １箇所のみ設置予定だった為、マージンで暫定対応しています。

  }
</style>
