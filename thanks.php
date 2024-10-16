<?php
// クッキーからabcの値を取得
$abcValue = isset($_COOKIE['abc']) ? $_COOKIE['abc'] : '';
?>
<!doctype html>
<html lang="ja">

<head>
<script src="https://r.moshimo.com/af/r/maftag.js"></script>
      <?php
    $url = '';
    if (isset($_SERVER['HTTPS'])) {
      $url .= 'https://';
    } else {
      $url .= 'http://';
    }
    $url .= $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];


    $parameter = parse_url($url,  PHP_URL_QUERY);
    $parameter_2 = substr($parameter, 4, 14);
    ?>
<!-- uid2追加20240705 -->

<script>
(function(){
var uqid   = "3ded5G135605b816";
var cid    = "10";
var uid   = "<?php echo $parameter_2 ?>";
var uid2   = "<?php echo htmlspecialchars($abcValue, ENT_QUOTES, 'UTF-8'); ?>";  // PHPで取得したabcクッキーの値をJavaScript変数に設定
var af   = "";
var pid    = "";
var amount = "";
var a=document.createElement("script");
a.src="//ac.ads-manage.com/ac/action_js.php";
a.id="afadaction-"+Date.now();
a.addEventListener("load",function(){(new fpcAction(a.id)).action(cid, af, [uid, uid2], pid, amount, uqid)});
document.head.appendChild(a)})();
</script>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link href="https://ctn-net.jp/kaitori/car/wp-content/themes/ctnkaitori/assets/img/favicon.ico" rel="icon">
  <!-- <script type='text/javascript' src='https://api.kaiu-marketing.com/visitor/script.js?site_code=6972129ddafa4853a60780dc9b006c43&amp;key=388221a9cff341a7888e7a8bfc552a29&amp;secret=34b997b3280e472ba15f223640743484&amp;svd=2aecc64a32f9465cadab524dcd477b19'></script> -->

  <meta name="robots" content="noindex">
  <meta content="" name="keywords">

  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-844278297"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-844278297');
</script>

<!-- Event snippet for CTN車_申し込み完了_20240812 conversion page -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-844278297/blASCK2t7skZEJnUypID',
      'transaction_id': ''
  });
</script>

  <script>
  window.onload = function() {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5H75N4G');
  }
</script>

  <meta charset="utf-8">

  <link rel="preload" as="font" href="https://ctn-net.jp/kaitori/car/ad3/assets/font/NotoSansJP-Regular.woff2" crossorigin>
  <link rel="preload" as="font" href="https://ctn-net.jp/kaitori/car/ad3/assets/font/assets/font/NotoSansJP-Medium.woff2'" crossorigin>
  <link rel="preload" as="font" href="https://ctn-net.jp/kaitori/car/ad3/assets/font/assets/font/NotoSansJP-SemiBold.woff2" crossorigin>
  <link rel="preload" as="font" href="https://ctn-net.jp/kaitori/car/ad3/assets/font/assets/font/NotoSansJP-Bold.woff2" crossorigin>



    <title>問い合わせ頂きありがとうございます｜CTN車一括査定</title>
    <link rel='stylesheet' id='main-css-css' href='https://ctn-net.jp/kaitori/car/ad3/wp-content/themes/ctnkaitori/assets/css/main.css?ver=6.6' media='all' />
<link rel='stylesheet' id='style-new-css-css' href='https://ctn-net.jp/kaitori/car/ad3/wp-content/themes/ctnkaitori/assets/css/style-new.css?ver=6.6' media='all' />
<link rel='stylesheet' id='ctnkaitori-style-css' href='https://ctn-net.jp/kaitori/car/ad3/wp-content/themes/ctnkaitori/style.css?ver=6.6' media='all' />
  <script src="https://ctn-net.jp/kaitori/car/wp-content/themes/ctnkaitori/assets/js/jquery-3.4.1.min.js"></script>
  <link rel="stylesheet" href="https://ctn-net.jp/kaitori/car/ad/wp-content/themes/ctnkaitori/assets/slick/slick.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css">
  <link rel="stylesheet" type="text/css" href="https://ctn-net.jp/kaitori/car/ad/wp-content/themes/ctnkaitori/css/styles.css" />



<script src="https://r.moshimo.com/af/r/result.js?p_id=6272&pc_id=17663&m_v=<?php echo $parameter_2 ?>" id="msmaf"></script>
<noscript><img src="https://r.moshimo.com/af/r/result?p_id=6272&pc_id=17663&m_v=<?php echo $parameter_2 ?>" width="1" height="1" alt=""></noscript>

<!-- <script>
    var __atw = __atw || [];
    __atw.push({ "merchant" : "ctn", "param" : {
        "result_id" : "100",
        "verify" : "<?php echo $parameter_2 ?>",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);
</script> -->

  <style>
    @font-face {
      font-family: 'Noto Sans JP';
      src: url('https://ctn-net.jp/kaitori/car/ad3/assets/font/NotoSansJP-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Noto Sans JP';
      src: url('https://ctn-net.jp/kaitori/car/ad3/assets/font/NotoSansJP-Medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Noto Sans JP';
      src: url('https://ctn-net.jp/kaitori/car/ad3/assets/font/NotoSansJP-SemiBold.woff2') format('woff2');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Noto Sans JP';
      src: url('https://ctn-net.jp/kaitori/car/ad3/assets/font/NotoSansJP-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    body {
      font-family: 'Noto Sans JP', sans-serif;
      margin: 0 auto;
    }
  </style>
  <style type="text/css">
	section.thanks-content {
	    height: 85vh;
	    display: table;
	    width: 100%;
	}
	.thanks-container-custom {
	    display: table-cell;
	    width: 100%;
	    height: 100%;
	    vertical-align: middle;
	}
	.thanks-detail h3 {
	    font-size: 34px;
	    color: #ff5c00;
	}
	.thanks-detail a {
	    background-color: #ff5c00;
	    color: #fff;
	    padding: 10px 25px;
	    transition: 0.3s;
	}
	.thanks-detail p {
	    margin-bottom: 40px;
	}
	.thanks-detail a:hover {
	    background-color: #5f5f5f;
	    padding: 10px 35px;
	}
	.thanks-detail{
		text-align: center;
		vertical-align: middle;
	}
	@media (max-width: 468px){
		.thanks-detail h3{
			font-size: 28px!important;
		}
	}
</style>

</head>

<body>

  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5H75N4G" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  </section><!-- End Top Bar -->
  <header>
    <div class="header_inner">
      <a href="https://ctn-net.jp/kaitori/car/ad4/"><img src="https://ctn-net.jp/kaitori/car/ad/wp-content/themes/ctnkaitori/img/logo.svg" class="sp-non" loading="lazy"></a>
      <a href="https://ctn-net.jp/kaitori/car/ad4/"><img src="https://ctn-net.jp/kaitori/car/ad/wp-content/themes/ctnkaitori/img/logo.png" class="sp-b" style="max-height:38px" loading="lazy"></a>
      <div class="header-texts">
        <p>CTN車一括査定では中古車・廃車 ・事故車を高価買取 </p>
        <p style="display:none;"><span>1,000店舗以上</span>から厳選</p>
      </div>
      <div class="header-btn-area">
        <a href="#form"><img src="https://ctn-net.jp/kaitori/car/ad/wp-content/themes/ctnkaitori/img/botan1.svg" class="sp-non" style="margin-top:2px" loading="lazy"></a>
        <a href="#form-sp" class="sp-top-btn orange sp-b">無料査定依頼</a>
      </div>
    </div>

    <div class="header_menu">
      <div class="inner">
        <ul>
          <li> <a href="https://ctn-net.jp/kaitori/car/ad4/#strong">CTN車一括査定の強み</a></li>
          <li><a href="https://ctn-net.jp/kaitori/car/ad4/#line-top">他社との違い</a></li>
          <li><a href="https://ctn-net.jp/kaitori/car/ad4/#line-top-2">一括査定の流れ</a></li>
        </ul>
      </div>
    </div>

    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav class="globalMenuSp">
      <ul>
        <li><a href="https://ctn-net.jp/kaitori/car/ad4/#">TOP</a></li>
        <li><a href="https://ctn-net.jp/kaitori/car/ad4/#form-sp">一括査定依頼</a></li>
        <li><a href="https://ctn-net.jp/kaitori/car/ad4/#strong">CTN車一括査定の強み</a></li>
        <li><a href="https://ctn-net.jp/kaitori/car/ad4/#line-top">他社との違い</a></li>
        <li><a href="https://ctn-net.jp/kaitori/car/ad4/#line-top-2">一括査定の流れ</a></li>
        <li><a href="https://ctn-net.jp/kaitori/car/ad4/#faq">よくある質問</a></li>
      </ul>
    </nav>
  </header>
  <!-- End Header -->

  <section class="thanks-content">
	<div class="container thanks-container-custom">
		<div class="thanks-detail">
			<div class="thank-ct">
				<h3>この度はお問い合わせ頂きありがとうございます。</h3>
				<p>ご記入して頂いた情報は無事に送信されました。数日以内に担当者よりご連絡致します。</p>
				<a href="https://ctn-net.jp/kaitori/car/ad4">トップページへ戻る</a>
			</div>
		</div>
	</div>
</section>


    <div class="copy">
      <div class="footer-link">
        <a href="https://ctn-net.jp/kaitori/car/privacypolicy/" target="_blank">プライバシーポリシー<span class="footer-rod">|</span></a>
        <a href="https://ctn-net.jp/kaitori/car/terms/" target="_blank">利用規約<span class="footer-rod">|</span></a>
        <a href="https://ctn-net.jp/kaitori/car/anti_society/" target="_blank">反社会的勢力に対する基本方針<span class="footer-rod">|</span></a>
        <a href="https://ctn-net.jp/" target="_blank">運営会社</a>
      </div>
      <div class="copyright">
        Copyright <strong><span>© 2023 CTN Co., Ltd.</span></strong>. All Rights Reserved
      </div>
    </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


<script>
  $(function() {
    $('.hamburger').click(function() {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            $('.globalMenuSp').addClass('active');
        } else {
            $('.globalMenuSp').removeClass('active');
        }

    });
});
//メニュー内を閉じておく
$(function() {
    $('.globalMenuSp a[href]').click(function() {
        $('.globalMenuSp').removeClass('active');
       $('.hamburger').removeClass('active');

    });
  });
</script>

<!-- 20241001SSタグ設置 -->
<script type="text/javascript">
  (function(w,d,s){
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
    j.async=true;j.src='https://dmp.im-apps.net/js/1020159/0001/itm.js';
    f.parentNode.insertBefore(j, f);
  })(window,document,'script');
</script>
<!-- 20241001SSタグ設置 -->

<!--
<input type="hidden" id="ctn_wpc_f7_counter" name="ctn_wpc_f7_counter" value="<?php echo do_shortcode('[CF7_counter]'); ?>">
<input type="hidden" id="ctn_e" name="ctn_e" value="pr">
<input type="hidden" id="ctn_t" name="ctn_t" value="a">
<script src='https://ctn-net.jp/kaitori/car/ad3/wp-content/themes/ctnkaitori/assets/js/form.js?v=1.0'></script> -->

</body>

</html>
