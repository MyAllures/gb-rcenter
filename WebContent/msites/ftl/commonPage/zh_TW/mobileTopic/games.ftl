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

<body class="games-page">
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
                    <li class="active"><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">遊戲<small>四大類十大API</small></a></li>
                    <li><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APP下載<small>隨意暢玩</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="live" class="active"><a href="#live"><span class="itemIcon live"></span>真人視訊</a></li>
                <li data-menuanchor="sports"><a href="#sports"><span class="itemIcon sports"></span>體育競技</a></li>
                <li data-menuanchor="casino"><a href="#casino"><span class="itemIcon casino"></span>電子游藝</a></li>
                <li data-menuanchor="lottery"><a href="#lottery"><span class="itemIcon lottery"></span>彩票遊戲</a></li>
            </ul>
        </div>
    </div>
    <div class="myFullPage">
        <!-- section1 -->
        <div class="section live">
            <div class="container">
                <div class="left left1"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/live-01.png"></div>
                <div class="right right1">
                    <div class="content">
                        <h1>真人視訊</h1>
                        <h2>穩定流暢真實的現場演繹</h2>
                        <h4>採用HTML5最新技術，頁面自適應所有移動裝置螢幕寬度，高清全屏即視感俱佳！真人靚麗荷官、高清互動遊戲現場，極富真實感的娛樂體驗。</h4>
                        <ul class="list-inline api-list">
                            <li>
                                <a class="partner bb"><span></span></a>
                            </li>
                            <li>
                                <a class="partner ag"><span></span></a>
                            </li>
                            <li>
                                <a class="partner gd"><span></span></a>
                            </li>
                            <li>
                                <a class="partner og"><span></span></a>
                            </li>
                            <li>
                                <a class="partner ds"><span></span></a>
                            </li>
                            <li>
                                <a class="partner ebet"><span></span></a>
                            </li>
                            <li>
                                <a class="partner sa"><span></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bottom bottom1"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/live-02.png"></div>
            </div>
            <a class="godown" href="#sports"><span class="flash"></span></a>
        </div>
        <!-- section2 -->
        <div class="section sports">
            <div class="container">
                <div class="left left2">
                    <div class="content">
                        <h1>體育競技</h1>
                        <h2>移動投注，精彩賽事不錯過</h2>
                        <h4>擁有更清晰簡潔的頁面，豐富的滾球盤及線上最佳賠率，讓你隨時隨地輕鬆投注。</h4>
                        <ul class="list-inline api-list">
                            <li>
                                <a class="partner hg"><span></span></a>
                            </li>
                            <li>
                                <a class="partner sb"><span></span></a>
                            </li>
                            <li>
                                <a class="partner im"><span></span></a>
                            </li>
                            <li>
                                <a class="partner bb"><span></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="right right2">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/sports-01.png">
                    <div class="right2-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/sports-02.png"></div>
                </div>
            </div>
            <a class="godown" href="#casino"><span class="flash"></span></a>
        </div>
        <!-- section3 -->
        <div class="section casino">
            <div class="container">
                <div class="left left3">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/casino-01.png">
                    <div class="left3-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/casino-02.png"></div>
                    <div class="left3-3"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/casino-03.png"></div>
                </div>
                <div class="right right3">
                    <div class="content">
                        <h1>電子游藝</h1>
                        <h2>種類豐富，玩法更帶勁</h2>
                        <h4>精選全球火爆熱門電子遊戲，連線累積大獎、翻倍遊戲獎勵等你來領！</h4>
                        <ul class="list-inline api-list">
                            <li>
                                <a class="partner mg"><span></span></a>
                            </li>
                            <li>
                                <a class="partner pt"><span></span></a>
                            </li>
                            <li>
                                <a class="partner ag"><span></span></a>
                            </li>
                            <li>
                                <a class="partner bb"><span></span></a>
                            </li>
                            <li>
                                <a class="partner bs"><span></span></a>
                            </li>
                            <li>
                                <a class="partner hb"><span></span></a>
                            </li>
                            <li>
                                <a class="partner nyx"><span></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <a class="godown" href="#lottery"><span class="flash"></span></a>
        </div>
        <!-- section4 -->
        <div class="section lottery">
            <div class="container">
                <div class="left left4">
                    <div class="content">
                        <h1>彩票遊戲</h1>
                        <h2>彩種齊全，設立千萬彩池獎金</h2>
                        <h4>囊括市場主流彩種，線上購買更便捷，還可即時檢視彩票最新開獎結果。</h4>
                        <ul class="list-inline api-list">
                            <li>
                                <a class="partner kg"><span></span></a>
                            </li>
                            <li>
                                <a class="partner bb"><span></span></a>
                            </li>
                            <li>
                                <a class="partner dw"><span></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="right right4">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/lottery-01.png">
                    <div class="right4-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/lottery-02.png"></div>
                    <div class="right4-3"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/lottery-03.png"></div>
                    <div class="right4-4"><img src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/images/lottery-04.png"></div>
                </div>
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
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_TW/mobileTopic/js/jquery.fullPage.min.js"></script>
    <script>
    $(function() {
        // 全屏滚动
        $('.myFullPage').fullpage({
            verticalCentered: false, //垂直居中
            css3: true, //CSS3 transforms滚动
            anchors: ['live', 'sports', 'casino', 'lottery'], //锚链接
            menu: '.navbar-list', //菜单绑定
            navigation: true, //项目导航
            navigationTooltips: ['真人視訊', '體育競技', '電子游藝', '彩票游戏'] //导航tips
        });
        // API logo动画
        $('.api-list li a').hover(function() {
            $('span', this).stop().animate({
                'opacity': 1
            }, 300)
        }, function() {
            $('span', this).stop().animate({
                'opacity': 0
            }, 300)
        });
    });
    </script>
</body>

</html>
