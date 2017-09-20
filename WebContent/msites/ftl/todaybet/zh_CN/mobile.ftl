<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <link rel="stylesheet" href="${data.configInfo.sitePath}/themes/style.css" type="text/css"><!--页面CSS-->
    <link rel="stylesheet" href="${data.configInfo.sitePath}/themes/animate.min.css" type="text/css"><!--CSS3动画-->
    <link rel="stylesheet" href="${data.configInfo.sitePath}/themes/css_cole.css" type="text/css">
</head>
<body>
<div class="top">
    <div class="wid">
        <div class="logo" ani="bounce" style="opacity: 1;">
            <img src="${data.configInfo.sitePath}/images/logo.png" alt="">
        </div>
        <div class="menu">
            <ul>
                <li class="acti"><a href="javascript:">手机投注</a></li>
                <li><a href="/">电脑网页版</a></li>
            </ul>
        </div>
    </div>
</div>
<!--top-->
<div class="banner">
    <div class="wid">
        <div class="text " ani="fadeInLeft" style="opacity: 1;">
            <a></a><img src="${data.configInfo.sitePath}/themes/images/img0.png" alt="">
            <p>随时随地轻松存取款<br>Android / iPhone移动装置访问 </p>
            <div class="boxsea">
                <input type="text" id="inputUrl" value=""/>
                <a href="javascript:void(0)" onclick="go()"></a>
            </div>
        </div>
        <div class="rig_pic " ani="fadeInDown" style="opacity: 1;">
            <img src="${data.configInfo.sitePath}/themes/images/img1.png" alt="">
        </div>
    </div>
    <div class="float" style="left: 9.9px; top: 12.7px;">
        <img src="${data.configInfo.sitePath}/themes/images/img2.png" alt="">
    </div>
    <div class="banner-mask"></div>
</div>
<!-- 手机端支持设备 -->
<div class="mobile_support">
    <h2>手机端支持设备</h2>
    <div class="mobile_support_bg">
        <div class="clearfix" id="slide_mobile_support">
            <div class="num"><span class="current">1</span><span class="">2</span></div>
            <ul>
                <li>
                    <a href="javascript:"><img src="${data.configInfo.sitePath}/themes/images/mobile_info_iphone1.png"></a>
                    <div class="info_left">当别人还沉寂在敲打键盘进行游戏时丶我们已经将时下最火的时时彩<br>
                        快乐彩丶六合彩等装进了口袋，让您真正体验裤兜里的快乐
                    </div>
                    <div class="info_right"> iPhone4S / iPhone5 / iPhone5S / iPhone6 / iPhone6S / iPhone7<br>
                        适配于iOS5.5+以上所有手机，iPad及iPod
                    </div>
                </li>
                <li>
                    <a href="javascript:"><img src="${data.configInfo.sitePath}/themes/images/mobile_info_iphone2.png"></a>
                    <div class="info_left">当别人还沉寂在敲打键盘进行游戏时丶我们已经将时下最火的时时彩<br>
                        快乐彩丶六合彩等装进了口袋，让您真正体验裤兜里的快乐
                    </div>
                    <div class="info_right">三星/ 华为/ 小米/ 魅族/ 中兴/ HTC / LG及更多
                        适配于安卓2.0及以上系统所有手持设备
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<!--end 手机端支持设备 -->
<div class="kuai-3">
    <div class="home-jackpot layout1120">
        <h2>6大优势成就极致体验</h2>
        <ul class="mobile_adv">
            <li class="m_adv1">安全保障</li>
            <li class="m_adv2">信誉至上</li>
            <li class="m_adv3">急速到账</li>
            <li class="m_adv4">微信入款</li>
            <li class="m_adv5">支付宝</li>
            <li class="m_adv6">资金赔付</li>
            <li class="m_adv7">随时随地</li>
        </ul>
    </div>
</div>
<div class="bot_copy">
    <p>Copyright © 2009-2017 天天彩票 版权所有</p>
</div>

<script src="${data.configInfo.sitePath}/js/jquery-1.4.4.min.js"></script><!--jQuery库-->
<script src="${data.configInfo.sitePath}/js/hm.js"></script>
<script src="${data.configInfo.sitePath}/js/mobile-detect.min.js"></script>
<script src="${data.configInfo.sitePath}/js/scrollanim.min.js"></script> <!--"动画库"-->
<script src="${data.configInfo.sitePath}/js/type.js"></script><!--自定义封装函数-->
<script>
    $(".banner").mousemove(function (e) {
        $(".banner .float").css({"left": e.clientX / 80 + "px", "top": (e.clientY) / 40 + "px"})
    });
    var cu_url = window.location.origin;
    //当前网址
    $("#inputUrl").val(cu_url);

    // 游戏移动
    var ismauto = true;
    $("#slide_mobile_support .num span").click(function () {
        supportMobileMethod($(this).index());
    });

    function supportMobileMethod(liindex) {
        if ($("#slide_mobile_support .num span").eq(liindex)[0].className != "current") {
            $("#slide_mobile_support .num span").removeClass("current");
            $("#slide_mobile_support .num span").eq(liindex).addClass("current");
            $("#slide_mobile_support ul img").eq(liindex).css('margin-top', '20px');
            $("#slide_mobile_support ul").animate({'margin-left': (liindex * (-1200)) + 'px'}, 600, 'swing', function () {
                $("#slide_mobile_support ul img").eq(liindex).animate({'margin-top': '0px'}, 700);
            });
            mliindex = liindex;
        }
    }

    var mliindex = 0;
    var supportmmove = setInterval(function () {
        if (ismauto) {
            mliindex++;
            if (mliindex >= 2) {
                mliindex = 0;
            }
            supportMobileMethod(mliindex);
        }
    }, 5000);
    $("#slide_mobile_support").hover(
            function () {
                ismauto = false;
            },
            function () {
                ismauto = true;
            }
    );
    // 游戏移动 end
</script>
</body>
</html>