<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—APP download—Mobile phone special topic</title>
    <link rel="shortcut Icon" href="${data.configInfo.sitePath}/images/favicon.png" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/common.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/<#if mobileTopic??>${mobileTopic}<#else>default</#if>/style.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/jquery.fullPage.css">
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
                    <li><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">Mobile phone special topic<small>new topic on the line</small></a></li>
                    <li><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">Game<small>Four categories of top ten API</small></a></li>
                    <li class="active"><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APP download<small>Free play</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="h5" class="active"><a href="#h5"><span class="itemIcon h5"></span>Mobile H5 version<em>no need to download to play, Support mobile payment</em></a></li>
                <li data-menuanchor="android"><a href="#android"><span class="itemIcon android"></span>mobile Android version<em>the best quality Andrews client, Easy betting</em></a></li>
                <li data-menuanchor="ios"><a href="#ios"><span class="itemIcon ios"></span>mobile iOS<em>the ultimate face of the iOS client, Mobile with the line</em></a></li>
                <li data-menuanchor="iosHelp"><a href="#iosHelp">iOS installation tutorial</a></li>
            </ul>
        </div>
    </div>
    <div class="myFullPage">
        <!-- section1 -->
        <div class="section h5">
            <div class="container">
                <div class="top top5">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> Mobile H5 version</h1>
                        <h4>No need to download, can support the web version of mobile payment</h4>
                        <h4>Automate device identification by simply opening the URL on your mobile device</h4>
                        <h5>Mobile Device Browser Enter URL:</h5>
                        <h3 class="url-text"></h3>
                        <h5>Support：iPhone 6 / 6s / 7 / 8 / iPhoneX / iPad / iPad Air</h5>
                        <h5>millet / Meizu / Samsung / hammer / Huawei / ZTE / HTC / LG</h5>
                    </div>
                </div>
                <div class="bottom bottom5"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/download-01.png"></div>
            </div>
            <a class="godown" href="#android"><span class="flash"></span></a>
        </div>
        <!-- section2 -->
        <div class="section android">
            <div class="container">
                <div class="left left6">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/download-02.png">
                </div>
                <div class="right right6">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> mobile Android version</h1>
                        <h4>To provide you with the best quality Android client, easy betting, quick access</h4>
                        <h5>Download two-dimensional code (please use android phone sweep code )</h5>
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
                        <h5>Support：millet / Meizu / Samsung / hammer / Huawei / ZTE / HTC / LG</h5>
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
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> mobile iOS</h1>
                        <h4>For the ultimate born iOS client, mobile accompanying, easy bet</h4>
                        <h5>Scan two-dimensional code</h5>
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
                        <h5>Support：iPhone 6 / 6s / 7 / 8 / iPhoneX / iPad / iPad Air</h5>
                    </div>
                </div>
                <div class="right right7">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/download-03.png">
                </div>
            </div>
            <a class="godown" href="#iosHelp"><span class="flash"></span></a>
        </div>
        <!-- section4 -->
        <div class="section iosHelp">
            <div class="container">
                <div class="top top8">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> IOS client installation tutorial</h1>
                        <h4>Apple mobile phone installation process encountered [untrusted enterprises and developers] can be quickly installed according to the tutorial</h4>
                    </div>
                </div>
                <div class="bottom bottom8"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/download-04.png"></div>
            </div>
        </div>
    </div>
    <!--footer-->
    <div class="footer">
        <div class="container">
            <p>Best version of the HTML5 version of the mobile phone recommended iOS 8.0 above the system using the built-in browser, Android 4.0 above the system using the Chrome browser.</p>
            <p>If you can not use the mobile Internet betting, please use your computer to log on the website, consult online customer service, we will help you as soon as possible.</p>
        </div>
    </div>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/jquery/jquery-1.11.3.min.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/changeSkin.js"></script>
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/jquery.fullPage.min.js"></script>
    <script>
    $(function() {
        // 全屏滚动
        $('.myFullPage').fullpage({
            verticalCentered: false, //垂直居中
            css3: true, //CSS3 transforms滚动
            anchors: ['h5', 'android', 'ios', 'iosHelp'], //锚链接
            menu: '.navbar-list', //菜单绑定
            navigation: true, //项目导航
            navigationTooltips: ['HTML5 version ', 'Android version', 'iOS version', 'iOS installation tutorial'] //导航tips
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
