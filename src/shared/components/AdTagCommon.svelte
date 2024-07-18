<!-- 全ページ用 -->
<script>
  (function() {
    var uqid = "3ded5G135605b816";
    var spname = "spname";
    var param = {};
    var a = document.createElement("script");
    a.dataset.uqid = uqid;
    a.dataset.spname = spname;
    a.id = "directtrack-" + uqid + Date.now();
    a.src = "//ac.ads-manage.com/fpc/directtrack_js.php?scriptId=" + encodeURIComponent(a.id);
    Object.keys(param).map(function(b) {
      return a.dataset[b] = param[b]
    });
    document.head.appendChild(a);
  })();
</script>
