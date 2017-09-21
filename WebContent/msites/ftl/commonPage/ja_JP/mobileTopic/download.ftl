<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—APPダウンロード—モバイル専用</title>
    <link rel="shortcut Icon" href="${data.configInfo.sitePath}/images/favicon.png" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/themes/common.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/themes/<#if mobileTopic??>${mobileTopic}<#else>default</#if>/style.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/themes/jquery.fullPage.css">
</head>

<body class="download-page">
    <!--top-->
    <div class="top">
        <div class="header">
            <div class="container">
                <div class="logo">
                    <#if data.siteInfo.siteId??>
                        <img src="${data.configInfo.ftlRootPath}commonPage/images/app_logo/app_logo_${data.siteInfo.siteId}.png" alt="">
                    <#else>
                        <img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" alt="">
                    </#if>
                </div>
                <ul class="menu list-inline">
                    <li><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">モバイル版トピックス<small>最新アップ</small></a></li>
                    <li><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">ゲーム<small>4分類10以上のAPI</small></a></li>
                    <li class="active"><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APPダウンロード<small>楽々ゲーミング</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="h5" class="active"><a href="#h5"><span class="itemIcon h5"></span>モバイルH5バージョン<em>ダウンロードしなくても遊べます！，モバイル入出金対応</em></a></li>
                <li data-menuanchor="android"><a href="#android"><span class="itemIcon android"></span>モバイルアンドロイド版<em>最高水準のアンドロイド用APP、楽々ゲーム</em></a></li>
                <li data-menuanchor="ios"><a href="#ios"><span class="itemIcon ios"></span>モバイルiOS版<em>最高水準のiOS用APPモバイルモード</em></a></li>
                <li data-menuanchor="iosHelp"><a href="#iosHelp">iOSインストール方法</a></li>
            </ul>
        </div>
    </div>
    <div class="myFullPage">
        <!-- section1 -->
        <div class="section h5">
            <div class="container">
                <div class="top top5">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> モバイルH5バージョン</h1>
                        <h4>ダウンロード不要！ブラウザで遊んじゃお！</h4>
                        <h4>モバイル自動識別！最適なブラウザを自動起動！</h4>
                        <h5>ブラウザに次のURLを入れてください。URL：</h5>
                        <h3 class="url-text"></h3>
                        <h5>サポート：iPhone 5 / 5s / 6 / 6s / 7 / iPad / iPad Air</h5>
                        <h5>Huawei、サムスン、HTC、ZTE等</h5>
                    </div>
                </div>
                <div class="bottom bottom5"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/download-01.png"></div>
            </div>
            <a class="godown" href="#android"><span class="flash"></span></a>
        </div>
        <!-- section2 -->
        <div class="section android">
            <div class="container">
                <div class="left left6">
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/download-02.png">
                </div>
                <div class="right right6">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> 移动Android版</h1>
                        <h4>最新版のアンドロイドバージョン、楽々遊んじゃお！</h4>
                        <h5>QRコードをスキャンしてください</h5>
                        <div class="img"><span id="android_qr_code"></span></div>
                        <h5>サポート：Huawei、サムスン、HTC、ZTE等</h5>
                    </div>
                </div>
            </div>
            <a class="godown" href="#ios"><span class="flash"></span></a>
        </div>
        <!-- section3 -->
        <div class="section ios">
            <div class="container">
                <div class="left left7">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> モバイルiOSバージョン</h1>
                        <h4>iOS対応、楽々ゲーミング</h4>
                        <h5>QRコードをダウンロード</h5>
                        <div class="img"><span id="ios_qr_code"></span></div>
                        <h5>サポート：iPhone 5 / 5s / 6 / 6s / 7 / iPad / iPad Air</h5>
                    </div>
                </div>
                <div class="right right7">
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/download-03.png">
                </div>
            </div>
            <a class="godown" href="#iosHelp"><span class="flash"></span></a>
        </div>
        <!-- section4 -->
        <div class="section iosHelp">
            <div class="container">
                <div class="top top8">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> iOSインストール方法説明</h1>
                        <h4>アップル携帯のインストール方法は、説明動画をご参照ください。</h4>
                    </div>
                </div>
                <div class="bottom bottom8"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/download-04.png"></div>
            </div>
        </div>
    </div>
    <!--footer-->
    <div class="footer">
        <div class="container">
            <p>よりスムーズにゲームを楽しめるために、お使いの携帯はiOS8.0バージョン以上、アンドロイド4.0バージョンん以上でのご使用をお勧めします。</p>
            <p>モバイルによる登録/ログインがうまく行かない場合は、申し訳ありませんが、一旦パソコンからアクセスし、お客様センターへご連絡ください。</p>
        </div>
    </div>
    <script src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/js/jquery/jquery-1.11.3.min.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/js/changeSkin.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/js/jquery.fullPage.min.js"></script>
    <script>
    $(function() {
        // 全屏滚动
        $('.myFullPage').fullpage({
            verticalCentered: false, //垂直居中
            css3: true, //CSS3 transforms滚动
            anchors: ['h5', 'android', 'ios', 'iosHelp'], //锚链接
            menu: '.navbar-list', //菜单绑定
            navigation: true, //项目导航
            navigationTooltips: ['HTML5バージョン', 'Androidバージョン', 'iOSバージョン', 'iOS方法説明'] //导航tips
        });

        var cu_url = window.location.origin;
        $(".url-text").text(cu_url);

        //android二维码
        var android_download = "";
        var android_url = "";
        $.ajax({
            url:"/index/getAppsUrl.html",
            type:"get",
            data:{"device":"android"},
            async:false,
            success:function (data) {
                var data = eval('('+data+')');
                android_download=data.app;
                android_url = "data:image/png;base64,"+android_download;
            }
        })
        $("#android_qr_code").append("<img src="+android_url+">");

        //ios二维码
        var ios_download = "";
        var ios_url = "";
        $.ajax({
            url:"/index/getAppsUrl.html",
            type:"get",
            data:{"device":"ios"},
            async:false,
            success:function (data) {
                var data = eval('('+data+')');
                ios_download=data.app;
                ios_url = "data:image/png;base64,"+ios_download;
            }
        })
        $("#ios_qr_code").append("<img src="+ios_url+">");
    });
    </script>
</body>

</html>
