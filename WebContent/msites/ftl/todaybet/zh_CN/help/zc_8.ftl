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
                            <h5>未成年人购彩限制的说明?</h5>
                        </div>
                        <div class="help_col show">


                            <p>&nbsp;&nbsp;&nbsp;&nbsp;本站禁止向未成年人开放。 </p>

                            <p>&nbsp;&nbsp;&nbsp;&nbsp;对于实名认证结果显示未满18周岁的用户，网站将暂时限制其充值和购彩，除此之外的其他操作不受影响。 </p>

                            <p>&nbsp;&nbsp;&nbsp;&nbsp;正在进行中的已投注方案，将按照原规则进行兑奖、派奖； </p>

                            <p>&nbsp;&nbsp;&nbsp;&nbsp;如投注撤单，购彩金将退回账户； </p>

                            <p>&nbsp;&nbsp;&nbsp;&nbsp;追号方案、自动跟单、订制服务等与购彩相关服务也将被终止； </p>

                            <p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>如果您未满18周岁，请自觉遵守法规规定，务必不要购买彩票。</strong>
                            </p>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
</main>
<footer>
    <div class="container">
        <!--footer-info-->
        <div class="footer-info">
            <ul>
                <li>
                    <div class="item" style="">
                        <h2><img src="${data.configInfo.sitePath}/images/ico42.png" alt="">新手入门</h2>
                        <p>
                            <span ><a href="zc.html">关于注册</a></span>
                            <span ><a href="javascript:">关于充值</a></span>
                            <span ><a href="javascript:">关于提款</a></span>
                            <span ><a href="javascript:">彩种介绍</a></span>
                        </p>
                    </div>
                </li>
                <li>
                    <div class="item" style="">
                        <h2><img src="${data.configInfo.sitePath}/images/ico43.png" alt="">充值投注</h2>
                        <p>
                            <span ><a href="javascript:">充值介绍</a></span>
                            <span ><a href="javascript:">网银充值</a></span>
                            <span ><a href="javascript:">支付宝</a></span>
                            <span ><a href="javascript:">微信支付</a></span>
                        </p>
                    </div>
                </li>
                <li>
                    <div class="item" style="">
                        <h2><img src="${data.configInfo.sitePath}/images/ico44.png" alt="">兑奖提款</h2>
                        <p>
                            <span ><a href="javascript:">提款未成功</a></span>
                            <span ><a href="javascript:">是否收手续费</a></span>
                            <span ><a href="javascript:">如何提款</a></span>
                            <span ><a href="javascript:">中奖查询</a></span>
                        </p>
                    </div>
                </li>
                <li style="border-right: 0;">
                    <div class="item" style="">
                        <h2><img src="${data.configInfo.sitePath}/images/ico45.png" alt="">特色服务</h2>
                        <p>
                            <span ><a href="javascript:">推广赚钱</a></span>
                            <span ><a href="javascript:">在线客服</a></span>
                            <span ><a href="javascript:">代理QQ</a></span>
                        </p>
                    </div>
                </li>
                <div style="clear: both;"></div>
            </ul>
        </div>
        <div class="footer_wrap">
            <div class="copy_right">
                <p>Copyright © 2009-2017 彩票网 版权所有</p>
                <p>600wan.cm 郑重提示：彩票有风险，投注需谨慎 不向未满18周岁的青少年出售彩票</p>
            </div>
            <ul class="list-partner list-unstyled">
                <li><img src="${data.configInfo.sitePath}/images/img1.jpg"/></li>
                <li><img src="${data.configInfo.sitePath}/images/img2.jpg"/></li>
                <li><img src="${data.configInfo.sitePath}/images/img3.jpg"/></li>
                <li><img src="${data.configInfo.sitePath}/images/img4.jpg"/></li>
                <li><img src="${data.configInfo.sitePath}/images/img5.jpg"/></li>
                <li><img src="${data.configInfo.sitePath}/images/img6.jpg"/></li>
                <li><img src="${data.configInfo.sitePath}/images/img7.jpg"/></li>
                <li><img src="${data.configInfo.sitePath}/images/img8.jpg"/></li>
            </ul>
        </div>
    </div>
</footer>
<#include "../script.ftl">
<#include "script.ftl">
</body>

</html>