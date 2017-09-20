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
                            <h5>注册与登录</h5>
                        </div>
                        <div class="help_col show">
                            <ul class="list-inline help-list clearfix">
                                <li>
                                    <a href="#q90">
                                        如何注册？
                                    </a>
                                </li>
                                <li>
                                    <a href="#q91">
                                        如何登录玩家中心？
                                    </a>
                                </li>
                                <li>
                                    <a href="#q92">
                                        登录时密码提示错误，我该怎么办？
                                    </a>
                                </li>
                                <li>
                                    <a href="#q93">
                                        我可以注册多个账号吗？
                                    </a>
                                </li>
                                <li>
                                    <a href="#q94">
                                        我想删除/注销我的账号可以吗？
                                    </a>
                                </li>
                            </ul>
                            <p>
                                <button title="如何注册？" id="q90" class="btn btn-block primary-btn -blue -sm title" type="button">如何注册？</button>
                            </p>
                            <p>打开我公司的网站后，点击登录区的注册，如实填写您的资料信息，确认送出后即可完成注册。</p>
                            <p>
                                <button title="如何登录玩家中心？" id="q91" class="btn btn-block primary-btn -blue -sm title" type="button">如何登录玩家中心？</button>
                            </p>
                            <p>在我公司网站页面顶端登录区输入正确的账号及密码后，即可登录。</p>
                            <p>
                                <button title="登录时密码提示错误，我该怎么办？" id="q92" class="btn btn-block primary-btn -blue -sm title" type="button">登录时密码提示错误，我该怎么办？</button>
                            </p>
                            <p>首先请您再次确认输入的密码是否正确，必须是6-20个字符（由大小写英文字母、数字和特殊符号组成）。若确认后仍提示错误，建议您通过自助流程找回密码。或者，您也可以
                                <a <#if data.defaultCustomerService?exists>href="${data.defaultCustomerService}" target="_blank"<#else >href="javascript:"</#if> style="color: #1D42AB;text-decoration: none;" >联系客服</a>协助您找回密码。</p>
                            <p>
                                <button title="我可以注册多个账号吗？" id="q93" class="btn btn-block primary-btn -blue -sm title" type="button">我可以注册多个账号吗？</button>
                            </p>
                            <p>不可以。每位玩家只允许注册一次，不接受同一玩家多次注册。若发现玩家注册有多个账号，我公司将有权终止该玩家进行游戏，并封存帐户及所有于游戏中赚取的红利。</p>
                            <p>
                                <button title="我想删除/注销我的账号可以吗？" id="q94" class="btn btn-block primary-btn -blue -sm title" type="button">我想删除/注销我的账号可以吗？</button>
                            </p>
                            <p>我公司不会以任何理由注销玩家账号。您可
                                <a style="color: #1D42AB;text-decoration: none;" <#if data.defaultCustomerService?exists>href="${data.defaultCustomerService}" target="_blank"<#else >href="javascript:"</#if>>联系客服</a>申请停用账号，以停止其账号的使用。</p>

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