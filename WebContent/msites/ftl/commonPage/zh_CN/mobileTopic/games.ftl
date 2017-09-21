<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—API游戏—手机专题页</title>
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
                    <li><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">手机专题<small>新版上线</small></a></li>
                    <li class="active"><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">游戏<small>四大类十大API</small></a></li>
                    <li><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APP下载<small>随意畅玩</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="live" class="active"><a href="#live"><span class="itemIcon live"></span>真人视讯</a></li>
                <li data-menuanchor="sports"><a href="#sports"><span class="itemIcon sports"></span>体育竞技</a></li>
                <li data-menuanchor="casino"><a href="#casino"><span class="itemIcon casino"></span>电子游艺</a></li>
                <li data-menuanchor="lottery"><a href="#lottery"><span class="itemIcon lottery"></span>彩票游戏</a></li>
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
                        <h1>真人视讯</h1>
                        <h2>稳定流畅真实的现场演绎</h2>
                        <h4>采用HTML5最新技术，页面自适应所有移动设备屏幕宽度，高清全屏即视感俱佳！真人靓丽荷官、高清互动游戏现场，极富真实感的娱乐体验。</h4>
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
                        <h1>体育竞技</h1>
                        <h2>移动投注，精彩赛事不错过</h2>
                        <h4>拥有更清晰简洁的页面，丰富的滚球盘及在线最佳赔率，让你随时随地轻松投注。</h4>
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
                        <h1>电子游艺</h1>
                        <h2>种类丰富，玩法更带劲</h2>
                        <h4>精选全球火爆热门电子游戏，连线累积大奖、翻倍游戏奖励等你来领！</h4>
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
                        <h1>彩票游戏</h1>
                        <h2>彩种齐全，设立千万彩池奖金</h2>
                        <h4>囊括市场主流彩种，线上购买更便捷，还可即时查看彩票最新开奖结果。</h4>
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
            <p>手机端HTML5版本最佳显示建议IOS 8.0 以上系统使用内建浏览器，Android 4.0以上系统使用 Chrome 浏览器。</p>
            <p>若当您无法顺利用手机上网投注，请您使用电脑登录网站，咨询线上客服，我们会尽快帮您处理。</p>
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
            navigationTooltips: ['真人视讯', '体育竞技', '电子游艺', '彩票游戏'] //导航tips
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
