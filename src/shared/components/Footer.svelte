<div class="footerWrap">
  <footer class="footer">
    <div>運営会社：株式会社CTN</div>
    <div>大阪府寝屋川市松屋町18-9 Casa Advance 2F</div>
  </footer>
</div>

<style lang="scss">
  .footerWrap {
    background-color: #a2a2a2;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 5rem;
  }

  .footer {
    box-sizing: border-box;
    color: #fff;
    font-size: 1.2rem;
    padding: 1rem;
    text-align: center;
    margin: 0 auto;
    width: 100%;
    

    @media (37.5rem < width) {
      padding: 1rem 2rem;
    }

    div + div {
      margin-top: 0.6rem;
    }
  }
</style>
