<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if>—APIゲーム—モバイル専用</title>
    <link rel="shortcut Icon" href="${data.configInfo.sitePath}/images/favicon.png" />
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/themes/common.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/themes/<#if mobileTopic??>${mobileTopic}<#else>default</#if>/style.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/themes/jquery.fullPage.css">
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
                    <li><a href="index.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">モバイル版トピックス<small>最新アップ</small></a></li>
                    <li class="active"><a href="games.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">ゲーム<small>4分類10以上のAPI</small></a></li>
                    <li><a href="download.html?c=<#if mobileTopic??>${mobileTopic}<#else>default</#if>">APPダウンロード<small>楽々ゲーミング</small></a></li>
                </ul>
            </div>
        </div>
        <div class="navbar">
            <ul class="container list-inline navbar-list">
                <li data-menuanchor="live" class="active"><a href="#live"><span class="itemIcon live"></span>ライブ</a></li>
                <li data-menuanchor="sports"><a href="#sports"><span class="itemIcon sports"></span>スポーツ競技</a></li>
                <li data-menuanchor="casino"><a href="#casino"><span class="itemIcon casino"></span>電子ゲーム</a></li>
                <li data-menuanchor="lottery"><a href="#lottery"><span class="itemIcon lottery"></span>ロッテリー</a></li>
            </ul>
        </div>
    </div>
    <div class="myFullPage">
        <!-- section1 -->
        <div class="section live">
            <div class="container">
                <div class="left left1"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/live-01.png"></div>
                <div class="right right1">
                    <div class="content">
                        <h1>ライブ</h1>
                        <h2>臨場感に溢れたライブ映像をご体験ください。</h2>
                        <h4>最新のHTML5技術を駆使して端末を自動識別します！臨場感に溢れたライブ映像に、現地にいた以上のワクワクをお楽しみください！</h4>
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
                <div class="bottom bottom1"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/live-02.png"></div>
            </div>
            <a class="godown" href="#sports"><span class="flash"></span></a>
        </div>
        <!-- section2 -->
        <div class="section sports">
            <div class="container">
                <div class="left left2">
                    <div class="content">
                        <h1>スポーツ競技</h1>
                        <h2>モバイルベッティングでチャンスを逃がさない！</h2>
                        <h4>簡単明快なビジュアル、業界最高水準の倍率、いつでもどこでもどうぞ！</h4>
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
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/sports-01.png">
                    <div class="right2-2"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/sports-02.png"></div>
                </div>
            </div>
            <a class="godown" href="#casino"><span class="flash"></span></a>
        </div>
        <!-- section3 -->
        <div class="section casino">
            <div class="container">
                <div class="left left3">
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/casino-01.png">
                    <div class="left3-2"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/casino-02.png"></div>
                    <div class="left3-3"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/casino-03.png"></div>
                </div>
                <div class="right right3">
                    <div class="content">
                        <h1>電子ゲーム</h1>
                        <h2>1000種類以上のゲームに、中毒注意！</h2>
                        <h4>最新ホットゲーム登場、ボーナス大放出中！</h4>
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
                        <h1>ロッテリー</h1>
                        <h2>ジャックポット高額賞金、なんと1億円以上！</h2>
                        <h4>主流ロッテリーをすべて網羅、抽選結果はいつでもライブでチェック！</h4>
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
                    <img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/lottery-01.png">
                    <div class="right4-2"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/lottery-02.png"></div>
                    <div class="right4-3"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/lottery-03.png"></div>
                    <div class="right4-4"><img src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/images/lottery-04.png"></div>
                </div>
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
    <script src="${data.configInfo.ftlRootPath}commonPage/ja_JP/mobileTopic/js/jquery.fullPage.min.js"></script>
    <script>
    $(function() {
        // 全屏滚动
        $('.myFullPage').fullpage({
            verticalCentered: false, //垂直居中
            css3: true, //CSS3 transforms滚动
            anchors: ['live', 'sports', 'casino', 'lottery'], //锚链接
            menu: '.navbar-list', //菜单绑定
            navigation: true, //项目导航
            navigationTooltips: ['ライブ', 'スポーツ競技', '電子ゲーム', 'ロッテリー'] //导航tips
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
