<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
    <style>
        header .nav-wrap .logo {
            top: 30px;
        }

        header .nav-wrap .navbar-nav > li a:before {
            height: 10px;
        }
    </style>
</head>

<body>
<header>
    <!--top-bar-->
    <div class="top-bar">
        <div class="container">
            <ul class="list-inline pull-left list-left _vr_unLogin" style="display: none;">
                <input type="hidden" name="type" value="top">
                <li>你好！</li>
                <li><a onclick="onLogin()" href="javascript:">请登录 </a></li>
                <li><a href="register.html" class="link-blink">免费注册</a></li>
            </ul>
            <ul class="list-inline pull-left list-left _vr_loginSuccess" style="display:none;">
                <li>你好，<span class="_vr_nickname"></span>!</li>
                <li><a href="javascript:void(0);" class="btn-logout" onclick="Logout()">退出</a></li>
            </ul>
            <ul class="list-inline pull-right list-right">
                <li><a href="/">首页</a></li>
                <li><a class="link-blink" <#if data.defaultCustomerService?exists>href="${data.defaultCustomerService}" target="_blank"<#else >href="javascript:"</#if>>在线客服</a></li>
                <li class="show-on-hover">
                    <a href="javascript:">购买彩票<i class="icon-arr-dow"></i></a>
                    <div class="dropdown-menua">
                        <h4>高频：</h4>
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京PK10</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>极速PK10</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>幸运飞艇</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>重庆时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>天津时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>新疆时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>分分时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>两分时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>三分时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>五分时时彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>湖北快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>安徽快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>江苏快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>吉林快3</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京快乐8</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>快乐十分</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>幸运农场</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>北京28</a>
                            </li>
                        </ul>
                        <hr/>
                        <h4>低频：</h4>
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>香港六合彩</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>福彩3D</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>体彩排列3</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li><a href="/commonPage/help.html">帮助</a></li>
                <li class="show-on-hover">
                    <a href="javascript:">网站导航<i class="icon-arr-dow"></i></a>
                    <div class="dropdown-menua dropdown2">
                        <ul class="list-inline">
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>购买彩票</a>
                            </li>
                            <li><a href="javascript:" class="mobileBetting">手机购彩</a></li>
                            <li><a href="javascript:">规则说明</a></li>
                        </ul>
                        <hr/>
                        <h4>彩票工具</h4>
                        <ul class="list-inline">
                            <li><a href="/commonPage/mobileTopic/index.html">手机客户端</a></li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>走势查询</a>
                            </li>
                            <li><a class="_vr_mt_check" href="javascript:void(0)" data-api="22" data-apitype="4"
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainStartTime?has_content>startTime="${data.siteApiMap["22"].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap["22"]?has_content && data.siteApiMap["22"].maintainEndTime?has_content>endTime="${data.siteApiMap["22"].maintainEndTime?long?string.computer}"</#if>>中奖查询</a>
                            </li>
                        </ul>
                        <hr/>
                        <ul class="list-inline">
                            <li><a href="javascript:">会员中心</a></li>
                            <li><a href="javascript:">推广赚钱</a></li>
                            <li><a href="promo.html">优惠活动</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="nav-wrap">
        <div class="container">
            <div class="logo">
            <#if data.siteFlashLogo?has_content>
                <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="260" height="56" align="middle">
                    <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                    <param name="wmode" value="transparent">
                    <param name="menu" value="false">
                    <param name="autoplay" value="true"/>
                    <!--[if !IE]>-->
                    <object type="application/x-shockwave-flash"
                            data="${imgPath(data.configInfo.domain,data.siteFlashLogo)}" width="260" height="56">
                        <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                        <param name="wmode" value="transparent">
                        <param name="menu" value="false">
                        <param name="autoplay" value="true"/>
                        <!--<![endif]-->
                        <a href="/"><img style="max-width:260px;height: 56px;"
                                         src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                        <!--[if !IE]>-->
                    </object>
                    <!--<![endif]-->
                </object>
            <#else >
                <a href="/"><img style="max-width:260px;height: 56px;"
                                 src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
            </#if>
            </div>
            <!--navbar-nav-->
            <ul class="nav navbar-nav _vr_nav">
                <li class="active"><a href="#home" data-toggle="tab" aria-expanded="true">代理首页</a></li>
                <!--代理加盟title-->
            <#list data.documents as document>
                <#if document['parent']?exists && document['code']=="agent&cooperation">
                    <li><a href="#id_${document["id"]}" data-toggle="tab" aria-expanded="false">${document["title"]}</a>
                    </li>
                </#if>
            </#list>
                <!--代理加盟子项title-->
            <#list data.documents as document>
                <#if document['parent']?exists && document['code']=="agent&cooperation">
                    <#list data.documents as children>
                        <#if children.parent_id = document.document_id><#--${navName["448"]}-->
                            <li><a href="#id_${children["id"]}" data-toggle="tab"
                                   aria-expanded="false">${children["title"]}</a></li>
                        </#if>
                    </#list>
                </#if>
            </#list>
                <li><a href="${data.contextInfo.agentCenterContext}" target="_blank">代理登录</a></li>
            </ul>
        </div>
    </div>
</header>
<main class="main-agent">
    <!-- Agent -->
    <section class="agent">
        <!-- /* Tab-Content -->
        <div class="tab-content">
            <!-- /* 代理首页 -->
            <div class="agent-slide tab-pane fade active in" id="home">
                <div class="slide">
                    <div class="slide-indicators">
                        <ul>
                        </ul>
                    </div>
                    <div class="slide-inner">
                        <ul>
                            <li data-src="url(../../ftl/commonPage/images/agent-ban-01.jpg)"
                                style="background:center 0 no-repeat;">
                            </li>
                            <li data-src="url(../../ftl/commonPage/images/agent-ban-02.jpg)"
                                style="background:center 0 no-repeat;">
                            </li>
                            <li data-src="url(../../ftl/commonPage/images/agent-ban-03.jpg)"
                                style="background:center 0 no-repeat;">
                            </li>
                        </ul>
                    </div>
                    <span class="prev gui gui-chevron-left"></span> <span class="next gui gui-chevron-right"></span>
                </div>
            </div>
        <#list data.documents as document>
            <#if document['parent']?exists && document['code']=="agent&cooperation">
                <div class="tab-pane fade agent-content-wrap" id="id_${document["id"]}" style="min-height: 600px;">
                    <div class="container">
                        <div class="col-1-1 agent-content" style="color:#c2a596;">
                            <h3 class="title">${document.title}</h3>
                            <div style="font-size: 15px;">
                            ${document.content}
                            </div>
                        </div>
                    </div>
                </div>
            </#if>
        </#list>
            <!--代理加盟子项title and content-->
        <#list data.documents as document>
            <#if document['parent']?exists && document['code']=="agent&cooperation">
                <#list data.documents as children>
                    <#if children.parent_id = document.document_id>
                        <div class="tab-pane fade agent-content-wrap" id="id_${children["id"]}"
                             style="min-height: 600px;">
                            <div class="container">
                                <div class="col-1-1 agent-content" style="color:#c2a596;">
                                    <h3 class="title">${children.title}</h3>
                                    <div style="font-size: 15px;">
                                    ${children.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>
        </#list>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_CN/ads/gameAds.ftl">
<#include "script.ftl">
</body>

</html>
