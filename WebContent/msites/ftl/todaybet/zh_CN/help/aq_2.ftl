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
                                <p class="acti"><a href="aq.html">安全保障</a></p>
                                <p ><a href="mima.html">热门问题</a></p>
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
                            <h5>账户资金安全</h5>
                        </div>
                        <div class="help_col show">

                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>登录密码验证</strong>：用户名称与登录密码必须完全一致，才可使用提款功能。
                                <br><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>真实身份核对</strong>：您绑定的银行卡的真实姓名必须和您在彩票网注册时填写的真实姓名一致，否则将无法提款。
                                <br><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>真实资料安全</strong>：真实姓名、银行卡信息绑定后，不允许用户私自修改，若要修改，需联系客服人员并提供身份证明资料方可修改。
                                <br><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>用户信息保密</strong>：您注册时所填写的真实姓名及您绑定的银行卡号，填写成功后，在个人资料中都无法查看到。
                                <br><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您的每一笔提款都需经过我们财务人员一一核对，核对无误后方可办理汇款。
                                <br><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：为保障用户的合法权益，避免在中奖时因用户注册资料与真实情况不符而发生纠纷，请用户注册时务必按照真实、全面、准确的原则填写注册信息和实名信息。


                            </p></div>

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
