<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—API game—Mobile phone special topic</title>
    <link rel="shortcut Icon" href="${data.configInfo.sitePath}/images/favicon.png" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/common.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/<#if mobileTopic??>${mobileTopic}<#else>default</#if>/style.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/themes/jquery.fullPage.css">
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
                    <li><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">Mobile phone special topic<small>new topic on the line</small></a></li>
                    <li class="active"><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">Game<small>Four categories of top ten API</small></a></li>
                    <li><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APP download<small>Free play</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="live" class="active"><a href="#live"><span class="itemIcon live"></span>Live video</a></li>
                <li data-menuanchor="sports"><a href="#sports"><span class="itemIcon sports"></span>Sports Competition</a></li>
                <li data-menuanchor="casino"><a href="#casino"><span class="itemIcon casino"></span>Electronic Amusement</a></li>
                <li data-menuanchor="lottery"><a href="#lottery"><span class="itemIcon lottery"></span>Lottery game</a></li>
            </ul>
        </div>
    </div>
    <div class="myFullPage">
        <!-- section1 -->
        <div class="section live">
            <div class="container">
                <div class="left left1"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/live-01.png"></div>
                <div class="right right1">
                    <div class="content">
                        <h1>Live video</h1>
                        <h2>Stable and smooth real live interpretation</h2>
                        <h4>Using HTML5 latest technology, page adaptive all mobile device screen width, high-definition full-screen that is as good as possible! Live beautiful dealer, high-definition interactive game scene, very realistic entertainment experience.</h4>
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
                <div class="bottom bottom1"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/live-02.png"></div>
            </div>
            <a class="godown" href="#sports"><span class="flash"></span></a>
        </div>
        <!-- section2 -->
        <div class="section sports">
            <div class="container">
                <div class="left left2">
                    <div class="content">
                        <h1>Sports Competition</h1>
                        <h2>Mobile betting, wonderful tournament not to miss</h2>
                        <h4>Have a clearer and concise page, rich bowls and online best odds, so you easily bet anytime, anywhere.</h4>
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
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/sports-01.png">
                    <div class="right2-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/sports-02.png"></div>
                </div>
            </div>
            <a class="godown" href="#casino"><span class="flash"></span></a>
        </div>
        <!-- section3 -->
        <div class="section casino">
            <div class="container">
                <div class="left left3">
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/casino-01.png">
                    <div class="left3-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/casino-02.png"></div>
                    <div class="left3-3"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/casino-03.png"></div>
                </div>
                <div class="right right3">
                    <div class="content">
                        <h1>Electronic amusement</h1>
                        <h2>Species rich, play more exciting</h2>
                        <h4>Featured global hot popular video games, connection jackpot, doubling game rewards waiting for you to lead!</h4>
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
                        <h1>Lottery game</h1>
                        <h2>lottery species complete, set up ten thousand pot prize money</h2>
                        <h4>Including the market mainstream lottery , online purchase more convenient, but also real-time view lottery latest lottery results.</h4>
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
                    <img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/lottery-01.png">
                    <div class="right4-2"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/lottery-02.png"></div>
                    <div class="right4-3"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/lottery-03.png"></div>
                    <div class="right4-4"><img src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/images/lottery-04.png"></div>
                </div>
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
    <script src="${data.configInfo.ftlRootPath}commonPage/zh_CN/mobileTopic/js/jquery.fullPage.min.js"></script>
    <script>
    $(function() {
        // 全屏滚动
        $('.myFullPage').fullpage({
            verticalCentered: false, //垂直居中
            css3: true, //CSS3 transforms滚动
            anchors: ['live', 'sports', 'casino', 'lottery'], //锚链接
            menu: '.navbar-list', //菜单绑定
            navigation: true, //项目导航
            navigationTooltips: ['Live video', 'Sports Competition', 'Electronic amusement', 'Lottery game'] //导航tips
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
