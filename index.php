<?php
// abcパラメータがURLに存在する場合、クッキーに保存（1週間有効）
if (isset($_GET['abc'])) {
    $abcValue = $_GET['abc'];
    setcookie('abc', $abcValue, time() + (7 * 24 * 60 * 60), "/"); // 1週間の有効期限
}
?>
<!doctype html>
<html lang="jp">

<head>
  <meta charset="UTF-8" />
  <link href="https://ctn-net.jp/kaitori/car/ad4/assets/img/favicon.ico" rel="icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="./style.css" />
  <title>最大15社の最高額がわかる！専門店比較で上位3社を厳選｜車買取・売却・査定はCTN車一括査定</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="./main.js"></script>

  <script type="text/javascript">
    (function(w,d,s){
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
      j.async=true;j.src='https://dmp.im-apps.net/js/1020159/0001/itm.js';
      f.parentNode.insertBefore(j, f);
    })(window,document,'script');
  </script>
</body>

</html>
