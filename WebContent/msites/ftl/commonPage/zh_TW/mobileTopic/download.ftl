<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—APP下載—手機專題頁</title>
    <link rel="shortcut Icon" href="${data.configInfo.sitePath}/images/favicon.png" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/themes/common.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/themes/<#if mobileTopic??>${mobileTopic}<#else>default</#if>/style.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/themes/jquery.fullPage.css">
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
                    <li><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">手機專題<small>新版上線</small></a></li>
                    <li><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">遊戲<small>四大類十大API</small></a></li>
                    <li class="active"><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APP下載<small>隨意暢玩</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="h5" class="active"><a href="#h5"><span class="itemIcon h5"></span>移動H5版本<em>無需下載即可玩，支援移動支付</em></a></li>
                <li data-menuanchor="android"><a href="#android"><span class="itemIcon android"></span>移動Android版<em>最優質安卓客戶端，輕鬆投注</em></a></li>
                <li data-menuanchor="ios"><a href="#ios"><span class="itemIcon ios"></span>移動iOS版<em>極致而生的iOS客戶端，移動隨行</em></a></li>
                <li data-menuanchor="iosHelp"><a href="#iosHelp">iOS安裝教程</a></li>
            </ul>
        </div>
    </div>
    <div class="myFullPage">
        <!-- section1 -->
        <div class="section h5">
            <div class="container">
                <div class="top top5">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> 移動H5版</h1>
                        <h4>無需下載即可玩，可支援網頁版移動支付</h4>
                        <h4>自動進行裝置識別，您只需在移動裝置開啟網址即可訪問</h4>
                        <h5>移動裝置瀏覽器輸入網址：</h5>
                        <h3 class="url-text"></h3>
                        <h5>支援：iPhone 6 / 6s / 7 / 8 / iPhoneX / iPad / iPad Air</h5>
                        <h5>小米 / 魅族 / 三星 / 錘子 / 華為 / 中興 / HTC / LG</h5>
                    </div>
                </div>
                <div class="bottom bottom5"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/download-01.png"></div>
            </div>
            <a class="godown" href="#android"><span class="flash"></span></a>
        </div>
        <!-- section2 -->
        <div class="section android">
            <div class="container">
                <div class="left left6">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/download-02.png">
                </div>
                <div class="right right6">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> 移動Android版</h1>
                        <h4>為您提供最優質Android客戶端，輕鬆投注，快捷存取款</h4>
                        <h5>下載二維碼（請使用安卓手機掃碼）</h5>
                        <div class="img">
                            <div class="qcode-wrap">
                                <span id="android_qr_code"></span>
                                <div class="txt">
                                    <div class="txt1">For Android</div>
                                    <div class="txt2">请登入下载</div>
                                </div>
                                <a href="/"><img class="qcode-blur" src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/qcode-blur.png"></a>
                            </div>
                        </div>
                        <h5>支援：小米 / 魅族 / 三星 / 錘子 / 華為 / 中興 / HTC / LG</h5>
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
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> 移動iOS版</h1>
                        <h4>為極致而生的iOS客戶端，移動隨行，輕鬆投注</h4>
                        <h5>下載二維碼</h5>
                        <div class="img">
                            <div class="qcode-wrap">
                                <span id="ios_qr_code"></span>
                                <div class="txt">
                                    <div class="txt1">For iOS</div>
                                    <div class="txt2">请登入下载</div>
                                </div>
                                <a href="/"><img class="qcode-blur" src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/qcode-blur.png"></a>
                            </div>
                        </div>
                        <h5>支援：iPhone 6 / 6s / 7 / 8 / iPhoneX / iPad / iPad Air</h5>
                    </div>
                </div>
                <div class="right right7">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/download-03.png">
                </div>
            </div>
            <a class="godown" href="#iosHelp"><span class="flash"></span></a>
        </div>
        <!-- section4 -->
        <div class="section iosHelp">
            <div class="container">
                <div class="top top8">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> iOS客戶端安裝教程</h1>
                        <h4>蘋果手機安裝過程中遇到【未信任的企業及開發者】可根據教程迅速安裝</h4>
                    </div>
                </div>
                <div class="bottom bottom8"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/download-04.png"></div>
            </div>
        </div>
    </div>
    <!--footer-->
    <div class="footer">
        <div class="container">
            <p>手機端HTML5版本最佳顯示建議IOS 8.0 以上系統使用內建瀏覽器，Android 4.0以上系統使用 Chrome 瀏覽器。</p>
            <p>若當您無法順利用手機上網投注，請您使用電腦登入網站，諮詢線上客服，我們會盡快幫您處理。</p>
        </div>
    </div>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/js/jquery/jquery-1.11.3.min.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/js/changeSkin.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/js/jquery.fullPage.min.js"></script>
    <script>
    $(function() {
        // 全屏滚动
        $('.myFullPage').fullpage({
            verticalCentered: false, //垂直居中
            css3: true, //CSS3 transforms滚动
            anchors: ['h5', 'android', 'ios', 'iosHelp'], //锚链接
            menu: '.navbar-list', //菜单绑定
            navigation: true, //项目导航
            navigationTooltips: ['HTML5版本', 'Android版本', 'iOS版本', 'iOS安装教程'] //导航tips
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

        // 判读是否登录
        var isLogin = sessionStorage.is_login;
        //后台设置是否登录后才能显示二维码
        <#if data.loginShowQrCode?string("true","false") == 'true'>
            if(isLogin=="true"){
                $('.download-page').addClass("login");
            }else{
                $('.download-page').addClass("unlogin");
            }
        <#else>
            $('.download-page').addClass("login");
        </#if>
    });
    </script>
</body>

</html>
