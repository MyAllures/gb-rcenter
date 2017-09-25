<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—APP下载—手机专题页</title>
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
                    <li><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">手机专题<small>新版上线</small></a></li>
                    <li><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">游戏<small>四大类十大API</small></a></li>
                    <li class="active"><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APP下载<small>随意畅玩</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="h5" class="active"><a href="#h5"><span class="itemIcon h5"></span>移动H5版本<em>无需下载即可玩，
支持移动支付</em></a></li>
                <li data-menuanchor="android"><a href="#android"><span class="itemIcon android"></span>移动Android版<em>最优质安卓客户端，
轻松投注</em></a></li>
                <li data-menuanchor="ios"><a href="#ios"><span class="itemIcon ios"></span>移动iOS版<em>极致面生的iOS客户端，
移动随行</em></a></li>
                <li data-menuanchor="iosHelp"><a href="#iosHelp">iOS安装教程</a></li>
            </ul>
        </div>
    </div>
    <div class="myFullPage">
        <!-- section1 -->
        <div class="section h5">
            <div class="container">
                <div class="top top5">
                    <div class="content">
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> 移动H5版</h1>
                        <h4>无需下载即可玩，可支持网页版移动支付</h4>
                        <h4>自动进行设备识别，您只需在移动设备打开网址即可访问</h4>
                        <h5>移动设备浏览器输入网址：</h5>
                        <h3 class="url-text"></h3>
                        <h5>支持：iPhone 5 / 5s / 6 / 6s / 7 / iPad / iPad Air</h5>
                        <h5>小米 / 魅族 / 三星 / 锤子 / 华为 / 中兴 / HTC / LG</h5>
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
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> 移动Android版</h1>
                        <h4>为您提供最优质Android客户端，轻松投注，快捷存取款</h4>
                        <h5>扫描二维码（请使用安卓手机扫码）</h5>
                        <div class="img"><span id="android_qr_code"></span></div>
                        <h5>支持：小米 / 魅族 / 三星 / 锤子 / 华为 / 中兴 / HTC / LG</h5>
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
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> 移动iOS版</h1>
                        <h4>为极致而生的iOS客户端，移动随行，轻松投注</h4>
                        <h5>扫描二维码</h5>
                        <div class="img"><span id="ios_qr_code"></span></div>
                        <h5>支持：iPhone 5 / 5s / 6 / 6s / 7 / iPad / iPad Air</h5>
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
                        <h1><#if data.siteInfo.siteName??>${data.siteInfo.siteName}</#if> iOS客户端安装教程</h1>
                        <h4>苹果手机安装过程中遇到【未信任的企业及开发者】可根据教程迅速安装</h4>
                    </div>
                </div>
                <div class="bottom bottom8"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/download-04.png"></div>
            </div>
        </div>
    </div>
    <!--footer-->
    <div class="footer">
        <div class="container">
            <p>手机端HTML5版本最佳显示建议IOS 8.0 以上系统使用内建浏览器，Android 4.0以上系统使用 Chrome 浏览器。</p>
            <p>若当您无法顺利用手机上网投注，请您使用电脑登录网站，咨询线上客服，我们会尽快帮您处理。</p>
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
    });
    </script>
</body>

</html>
