<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "../head.include.ftl">
</head>

<body>
<#include "top.ftl">
<main class="main-about">
    <!-- about -->
    <section class="about register-about">
        <div class="container">
            <div class="main wi">
                <div class="list">
                    <h5><span style="cursor:pointer;" onclick="getHelp(null, '../../help/main.html')">帮助中心</span></h5>
                    <ul>
                        <li class="li1 sli">
                            <h4>彩种介绍<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p ><a href="cqssc.html">重庆时时彩</a></p>
                                <p ><a href="tjssc.html">天津时时彩</a></p>
                                <p ><a href="xjssc.html">新疆时时彩</a></p>
                                <p ><a href="pl3.html">体彩排列3</a></p>
                                <p ><a href="fc3d.html">福彩3D</a></p>
                                <p ><a href="lhc.html">香港六合彩</a></p>
                                <p ><a href="xy28.html">幸运28</a></p>
                                <p ><a href="bjkl8.html">北京快乐8</a></p>
                                <p ><a href="bjpk10.html">北京PK10</a></p>
                                <p ><a href="cqxync.html">重庆幸运农场</a></p>
                                <p ><a href="gd10.html">广东快乐十分</a></p>
                                <p ><a href="xyft.html">幸运飞艇</a></p>
                                <p ><a href="ffssc.html">分分时时彩</a></p>
                                <p ><a href="efssc.html">两分时时彩</a></p>
                                <p ><a href="sfssc.html">三分时时彩</a></p>
                                <p ><a href="wfssc.html">五分时时彩</a></p><p ><a href="jsk3.html">江苏快3</a></p><p ><a href="ahk3.html">安徽快3</a></p><p ><a href="gxk3.html">广西快3</a></p><p ><a href="hbk3.html">湖北快3</a></p>
                            </div>
                        </li>
                        <li class="li1  zhinan">
                            <h4>新手指南<img src="${data.configInfo.sitePath}/themes/images/help/bt.png"/></h4>
                            <div class="slide" style="">
                                <p ><a href="zc.html">注册登录</a></p>
                                <p ><a href="cz.html">充值</a></p>
                                <p class="acti"><a href="tk.html">提款</a></p>
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
                            <div class="slide" style="display:block;">
                                <p ><a href="aq.html">安全保障</a></p>
                                <p class="acti"><a href="mima.html">热门问题</a></p>
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
                                <li><a href="../../register.html"><img
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
                                <a href="../register.html" class="a0">
                                    <div class="pict">
                                        <i><img src="${data.configInfo.sitePath}/themes/images/help/ico211.png" alt=""></i>
                                    </div>
                                    <div class="text">
                                        <p>免费注册</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>"
                                   target="_blank">
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
                    <div class="help_list">
                        <div class="lis">
                            <h5>验证码是对的，却提示输入错误？</h5>
                        </div>
                        <div class="help_col show">
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请先确认您输入的内容是否和图片显示的相符，切记您在输入数字时中间不能使用空格。
                                如果您确认输入正确，再查看是否是以下原因：
                            </p>
                            <p>
                                <strong>（1）您使用了错误的输入法输入</strong>：
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请先确认您使用的输入法是否为英文的半角状态，
                                因为只有在半角状态下输入数字及英文字母，校验码才有效， 否则系统会提示您"验证码输入错误，请重新输入" 。
                            </p>
                            <p>
                                <strong>（2）您的浏览器不能正确地显示验证码图片</strong>：
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您的验证码显示不完全或者看不清楚，请尝试刷新页面，如果还是不能正常显示，请按如下步骤调整您的IE浏览器设置。
                            </p>
                            <p>
                                第一步、打开浏览器，选择菜单中的"<span style="color:#E53333;">工具</span>"→"<span style="color:#E53333;">Internet"选项</span>
                            </p>
                            <p style="text-align: center">
                                <a href="${data.configInfo.sitePath}/themes/images/help/1.png"><img width="435"
                                                                                               src="${data.configInfo.sitePath}/themes/images/help/1.png"></a>
                            </p>
                            <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>
                            <br>
                            <p>
                                第二步、选择"<span style="color:#E53333;">常规</span>"中"<span
                                    style="color:#E53333;">浏览历史纪录</span>"的"<span style="color:#E53333;">删除</span>"，并且勾选"<span
                                    style="color:#E53333;">临时文件与Cookie</span>"选项。 然后点击“<span
                                    style="color:#E53333;">删除</span>”
                            </p>
                            <p style="text-align: center">
                                <a href="${data.configInfo.sitePath}/themes/images/help/2.png"><img width="424"
                                                                                               src="${data.configInfo.sitePath}/themes/images/help/2.png"></a>
                            </p>
                            <p style="text-align: center">
                                <a href="${data.configInfo.sitePath}/themes/images/help/3.png"><img width="396"
                                                                                               src="${data.configInfo.sitePath}/themes/images/help/3.png"></a>
                            </p>
                            <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>
                            <br>
                            <p>
                                第三步，关闭浏览器，重新打开网页再做尝试。
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../script.ftl">
<#include "script.ftl">
</body>

</html>