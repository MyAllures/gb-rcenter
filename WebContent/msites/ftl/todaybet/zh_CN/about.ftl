<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
</head>

<body>
<#include "top.ftl">
<main class="main-about">
    <!-- about -->
    <section class="about register-about">
        <div class="container">
            <div class="main wi">
                <div class="list">
                    <h5><span style="cursor:pointer;" onclick="getHelp(null, './help/main.html')">帮助中心</span></h5>
                    <ul>
                        <li class="li1 ">
                            <h4>彩种介绍<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p ><a href="help/cqssc.html">重庆时时彩</a></p>
                                <p ><a href="help/tjssc.html">天津时时彩</a></p>
                                <p ><a href="help/xjssc.html">新疆时时彩</a></p>
                                <p ><a href="help/pl3.html">体彩排列3</a></p>
                                <p ><a href="help/fc3d.html">福彩3D</a></p>
                                <p ><a href="help/lhc.html">香港六合彩</a></p>
                                <p ><a href="help/xy28.html">幸运28</a></p>
                                <p ><a href="help/bjkl8.html">北京快乐8</a></p>
                                <p ><a href="help/bjpk10.html">北京PK10</a></p>
                                <p ><a href="help/cqxync.html">重庆幸运农场</a></p>
                                <p ><a href="help/gd10.html">广东快乐十分</a></p>
                                <p ><a href="help/xyft.html">幸运飞艇</a></p>
                                <p ><a href="help/ffssc.html">分分时时彩</a></p>
                                <p ><a href="help/efssc.html">两分时时彩</a></p>
                                <p ><a href="help/sfssc.html">三分时时彩</a></p>
                                <p ><a href="help/wfssc.html">五分时时彩</a></p>
                                <p ><a href="help/jsk3.html">江苏快3</a></p>
                                <p ><a href="help/ahk3.html">安徽快3</a></p>
                                <p ><a href="help/gxk3.html">广西快3</a></p>
                                <p ><a href="help/hbk3.html">湖北快3</a></p>
                            </div>
                        </li>
                        <li class="li1  zhinan">
                            <h4>新手指南<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p ><a href="help/zc.html">注册登录</a></p>
                                <p ><a href="help/cz.html">充值</a></p>
                                <p ><a href="help/tk.html">提款</a></p>
                            </div>
                        </li>
                        <#--<li class="li1  gongneng">
                            <h4>特色功能<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p ><a href="help/Extension.html">推广赚钱</a></p>
                                <p ><a href="javascript:" target="_blank">手机购彩</a></p>
                            </div>
                        </li>-->
                        <li class="li1  wenti">
                            <h4>常见问题<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p ><a href="help/aq.html">安全保障</a></p>
                                <p ><a href="help/mima.html">热门问题</a></p>
                            </div>
                        </li>
                    </ul>
                    <h3>
                        <a href="javascript:" target="_blank">联系客服</a>
                    </h3>
                </div>
                <div class="rt">
                    <div class="type1">
                        <div class="pict">
                            <img src="${data.configInfo.sitePath}/themes/images/help/ico202.png" alt="">
                        </div>
                        <div class="step">
                            <ul>
                                <li><a href="register.html"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico203.png" alt="">免费注册</a></li>
                                <li><a href="javascript:void(0)"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico204.png" alt="">账户充值</a></li>
                                <li><a href="javascript:void(0)"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico205.png" alt="">购买彩票</a></li>
                                <li><img src="${data.configInfo.sitePath}/themes/images/help/ico206.png" alt="">中大奖</li>
                                <li><a href="javascript:void(0)"><img
                                        src="${data.configInfo.sitePath}/themes/images/help/ico207.png" alt="">提款</a></li>
                            </ul>
                            <div class="bor_box">
                                <p><span></span></p>
                                <p><span></span></p>
                                <p><span></span></p>
                                <p><span></span></p>
                                <p><span></span></p>
                            </div>
                        </div>
                    </div><!--五步-->
                    <div class="fix_ico">
                        <ul>
                            <li>
                                <a href="register.html" class="a0">
                                    <div class="pict">
                                        <i><img src="${data.configInfo.sitePath}/themes/images/help/ico211.png" alt=""></i>
                                    </div>
                                    <div class="text">
                                        <p>免费注册</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>" target="_blank">
                                    <div class="pict">
                                        <i><img src="${data.configInfo.sitePath}/themes/images/help/ico212.png" alt=""></i>
                                    </div>
                                    <div class="text">
                                        <p>在线客服</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:">
                                    <div class="pict">
                                        <i><img src="${data.configInfo.sitePath}/themes/images/help/ico213.png" alt=""></i>
                                    </div>
                                    <div class="text">
                                        <p>返回顶部</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id="helpRightContent">
                        <div class="type">
                            <h5>彩票种类</h5>
                            <div class="type_list">
                                <ul>
                                    <li>
                                        <h4><span><a href="help/cqssc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico16.png"/></a></span>
                                        </h4>
                                        <a href="help/cqssc.html"><p>重庆时时彩</br><span>重庆时时彩</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/lhc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico17.png"/></a></span>
                                        </h4>
                                        <a href="help/lhc.html"><p>香港六合彩</br><span>香港六合彩</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/bjpk10.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico18.png"/></a></span>
                                        </h4>
                                        <a href="help/bjpk10.html"><p>北京PK10</br><span>北京PK10</span></p></a>
                                    </li>
                                    <li class="li6">
                                        <h4><span><a href="help/fc3d.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico24.png"/></a></span>
                                        </h4>
                                        <a href="help/fc3d.html"><p>福彩3D</br><span>福彩3D</span></p></a>
                                    </li>

                                    <li>
                                        <h4><span><a href="help/pl3.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico20.png"/></a></span>
                                        </h4>
                                        <a href="help/pl3.html"><p>体彩排列3</br><span>体彩排列3</span></p></a>
                                    </li>

                                    <li>
                                        <h4><span><a href="help/tjssc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico27.png"/></a></span>
                                        </h4>
                                        <a href="help/tjssc.html"><p>天津时时彩</br><span>天津时时彩</span></p></a>
                                    </li>

                                    <li>
                                        <h4><span><a href="help/xjssc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico28.png"/></a></span>
                                        </h4>
                                        <a href="help/xjssc.html"><p>新疆时时彩</br><span>新疆时时彩</span></p></a>
                                    </li>
                                    <li class="li6">
                                        <h4><span><a href="help/gd10.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico26.png"/></a></span>
                                        </h4>
                                        <a href="help/gd10.html"><p>广东快乐十分</br><span>广东快乐十分</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/bjkl8.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico25.png"/></a></span>
                                        </h4>
                                        <a href="help/bjkl8.html"><p>北京快乐8</br><span>北京快乐8</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/cqxync.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico29.png"/></a></span>
                                        </h4>
                                        <a href="help/cqxync.html"><p>重庆幸运农场</br><span>重庆幸运农场</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/xy28.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ico30.png"/></a></span>
                                        </h4>
                                        <a href="help/xy28.html"><p>幸运28</br><span>幸运28</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/xyft.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/xyft.png"/></a></span>
                                        </h4>
                                        <a href="help/xyft.html"><p>幸运飞艇</br><span>幸运飞艇</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/ffssc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ffssc.png"/></a></span>
                                        </h4>
                                        <a href="help/ffssc.html"><p>分分时时彩</br><span>分分时时彩</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/efssc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/efssc.png"/></a></span>
                                        </h4>
                                        <a href="help/efssc.html"><p>两分时时彩</br><span>两分时时彩</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/sfssc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/sfssc.png"/></a></span>
                                        </h4>
                                        <a href="help/sfssc.html"><p>三分时时彩</br><span>三分时时彩</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/wfssc.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/wfssc.png"/></a></span>
                                        </h4>
                                        <a href="help/wfssc.html"><p>五分时时彩</br><span>五分时时彩</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/jsk3.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/jsk3.png"/></a></span>
                                        </h4>
                                        <a href="help/jsk3.html"><p>江苏快3</br><span>江苏快3</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/ahk3.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/ahk3.png"/></a></span>
                                        </h4>
                                        <a href="help/ahk3.html"><p>安徽快3</br><span>安徽快3</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/gxk3.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/gxk3.png"/></a></span>
                                        </h4>
                                        <a href="help/gxk3.html"><p>广西快3</br><span>广西快3</span></p></a>
                                    </li>
                                    <li>
                                        <h4><span><a href="help/hbk3.html"><img
                                                src="${data.configInfo.sitePath}/themes/images/help/hbk3.png"/></a></span>
                                        </h4>
                                        <a href="help/hbk3.html"><p>湖北快3</br><span>湖北快3</span></p></a>
                                    </li>
                                </ul>
                            </div>
                            <h5 id="flip">功能指引</h5>
                            <div class="type_links">
                                <div class="slide" style="">
                                    <ul>
                                        <h4>注册</h4>
                                        <li><p class=""><a href="help/zc.html">1、登录注册？</a></p></li>
                                    </ul>
                                </div>
                                <div class="slide" style="">
                                    <ul style="border-right: none;">
                                        <h4>充值投注</h4>
                                        <li><p class=""><a href="help/cz_1.html">1、在线支付？</a></p></li>
                                        <li><p class=""><a href="help/cz_2.html">2、网银存款？</a></p></li>
                                        <li><p class=""><a href="help/cz_3.html">3、扫码支付？</a></p></li>
                                        <li><p class=""><a href="help/cz_4.html">4、电子支付？</a></p></li>
                                        <li><p class=""><a href="help/cz_5.html">5、柜员机/柜台存款？</a></p></li>
                                    </ul>
                                </div>
                                <div class="slide" style="">
                                    <ul>
                                        <h4>提款</h4>
                                        <li><p class=""><a href="help/tk_1.html">1、取款稽核？</a></p></li>
                                        <li><p class=""><a href="help/tk_2.html">2、取款流程？</a></p></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="slide" style="">
                                <h5 id="flip2">常见问题</h5>
                                <div class="problem">
                                    <ul>
                                        <h4>新手指引</h4>
                                        <li><p ><a href="help/mima_3.html">忘记了登录密码怎么办？</a></p></li>
                                        <li><p ><a href="help/mima_4.html">忘记用户名怎么办？</a></p></li>
                                        <li><p ><a href="help/mima_5.html">登录时验证码输入是对的，为什么提示输入错误？</a></p></li>
                                        <li><p ><a href="help/mima_1.html">如何修改绑定的联系电话？</a></p></li>
                                        <li><p ><a href="help/mima_6.html">我从来没买过彩票，这些彩种都怎么玩？</a></p></li>
                                        <li><p ><a href="help/mima_2.html">购彩的流程是什么样的？</a></p></li>
                                    </ul>
                                    <ul class="no">
                                        <h4>安全保障</h4>
                                        <li><p ><a href="help/aq_1.html">购彩支付和充值安全</a></p></li>
                                        <li><p ><a href="help/aq_2.html">账户资金安全</a></p></li>
                                        <li><p ><a href="help/aq_3.html">个人隐私安全</a></p></li>
                                        <li><p ><a href="help/aq_4.html">购彩优势</a></p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_CN/ads/gameAds.ftl">
<#include "script.ftl">
<script>
    $(function () {
        $(".rt .type1 .step .bor_box p ,.rt .type1 .step ul li").hover(function () {
            var index = $(this).index() + 1;
            $(this).addClass("acti").siblings().removeClass("acti");
            $(".rt .type1 .step .bor_box p").removeClass("acti");
            $(".rt .type1 .step .bor_box p:lt(" + index + ")").addClass("acti");
        }, function () {
            $(".rt .type1 .step .bor_box p").removeClass("acti");
        });

        $(".Newest .Analysis .box3 .timer_wrap").each(function (index, element) {
            $(this).attr("index", "ti" + index);
            $(this).addClass("ti" + index);
        });

        setInterval(function () {
            $(".Newest .Analysis .box3 .timer_wrap").each(function (index, element) {
                //console.log();
                abc('".Newest .Analysis .box3 ".' + $(this).attr("index") + '"');
            });

        }, 1000);

        $('.list ul li.li1 h4').click(function () {
            var clickStatus = $(this).parent('li').attr('sl');
            if (typeof clickStatus == 'undefined') {
                $('.list ul li').removeClass('sli');
                $(this).parent('li').addClass('sli');
                $('.list ul li .slide').slideUp(300);
                $(this).parent('li').find('div').slideDown(300);
                $(this).parent('li').attr('sl', '0');
            } else if (clickStatus == 1) {
                $('.list ul li').removeClass('sli');
                $(this).parent('li').addClass('sli');
                $('.list ul li .slide').slideUp(300);
                $(this).parent('li').find('div').slideDown(300);
                $('.list ul li').attr('sl', '1');
                $(this).parent('li').attr('sl', '0');
            } else if (clickStatus == 0) {
                $('.list ul li').removeClass('sli');
                $(this).parent('li').removeClass('sli');
                $(this).parent('li').find('div').slideUp();
                $(this).parent('li').attr('sl', '1');
            }
        });
    });


</script>
</body>

</html>
