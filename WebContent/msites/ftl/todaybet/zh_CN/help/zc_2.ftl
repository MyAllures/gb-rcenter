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
                            <div class="slide" style="display:block;">
                                <p class="acti"><a href="zc.html">注册登录</a></p>
                                <p ><a href="cz.html">充值</a></p>
                                <p ><a href="tk.html">提款</a></p>
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
                            <h5>注册时用户需要注意什么?</h5>
                        </div>
                        <div class="help_col show">

                            <p><strong>1、</strong>用户名一旦提交，不可更改，请选择容易记忆且安全级别高的用户名，并妥善保管。</p>
                            <p><strong>2、</strong>为确保用户中奖权益，请务必注册后，在“会员中心”的“账户设置”或“银行卡管理”页面<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绑定银行卡。银行卡户名必须与注册时的真实姓名相同，否则提款将不成功。</p>
                            <p><strong>3、</strong>请填写真实有效的手机号码与电子邮件，以便在您中大奖时能及时与您取得联系。</p>
                            <p><strong>4、</strong>注册时需要验证手机或者邮箱，一个手机最多可以验证绑定1个账户，一个邮箱只可以验证注册一个账户。 </p>

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