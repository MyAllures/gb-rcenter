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
                            <div class="slide" style="display:block;">
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
                                <p class="acti"><a href="gd10.html">广东快乐十分</a></p>
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
                            <h5>广东快乐十分</h5>
                            <ul>
                                <li class="sli">常规玩法</li>
                                <li>官方玩法</li>
                                <li>开奖规则</li>
                            </ul>
                        </div>
                        <div class="help_col show">
                            <h5><strong>单码/双面规则说明</strong></h5>
                            <p><strong>◎单码</strong><br>
                                第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。
                            </p>
                            <p><strong>◎大小</strong><br>
                                开出的号码大于或等于11为大，小于或等于10为小 。</p>
                            <p><strong>◎单双</strong><br>
                                号码为双数叫双，如08、16；号码为单数叫单，如19、05 。</p>
                            <p><strong>◎和数单双</strong><br>
                                正码个位和十位数字之和来判断胜负，如01、12、16为和单；02、11、20为和双 。</p>
                            <p><strong>◎尾数大小</strong><br>
                                开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。</p>
                            <h5><strong>总和规则说明</strong></h5>
                            <p><strong>◎总和大小</strong><br>
                                所有8个开奖号码总和值小于84为总小；总和值大于84为总大，若总和值刚好等于84算和局(不计算输赢)。</p>
                            <p><strong>◎总和单双</strong><br>
                                所有开奖号码数字加总值是单数为和单，如11、21；加总值是双数为和双，如22、40。</p>
                            <p><strong>◎总和尾数大小</strong><br>
                                所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。</p>
                            <p><strong>◎龙虎</strong><br>
                                龙：第一球中奖号码大于第八球的中奖号码。如第一球开出14第八球开出09。虎：第一球中奖号码小于第八球的中奖号码。如第一球开出09第八球开出14。</p>
                        </div>
                        <div class="help_col">
                            <h5>筹备中</h5>
                        </div>
                        <div class="help_col">
                            <h5><strong>总则</strong></h5>
                            <p>广东福利彩票快乐十分（以下简称广东快乐十分）经国家财政部批准，由中国福利彩票发行管理中心在广东省内发行，由广东福利彩票发行中心承销。<br>
                                广东快乐十分开奖时间：官网~11月至次年4月每日早上8:30-晚上22:30, 5月至10月每日早上9:00-晚上23:00(每10分钟一期)，共84期。
                                本公司广东快乐十分具体参考彩种介绍。</p>
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