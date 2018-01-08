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
<header>
    <!--nav-part-->
    <div class="nav-part">
        <div class="container">
            <!--logo-->
            <div class="logo">
            <#if data.siteFlashLogo?has_content>
                <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="182" height="61" align="middle">
                    <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                    <param name="wmode" value="transparent">
                    <param name="menu" value="false">
                    <param name="autoplay" value="true" />
                    <!--[if !IE]>-->
                    <object type="application/x-shockwave-flash" data="${imgPath(data.configInfo.domain,data.siteFlashLogo)}" width="182" height="61">
                        <param name="movie" value="${imgPath(data.configInfo.domain,data.siteFlashLogo)}">
                        <param name="wmode" value="transparent">
                        <param name="menu" value="false">
                        <param name="autoplay" value="true" />
                        <!--<![endif]-->
                        <a href="/"><img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
                        <!--[if !IE]>-->
                    </object>
                    <!--<![endif]-->
                </object>
            <#else >
                <a href="/"><img style="width: 182px;height: 61px;" src="${imgPath(data.configInfo.domain,data.configInfo.logo)}"></a>
            </#if>
            </div>
            <!--top-link-->
            <div class="clearfix">
                <div class="top-link pull-right">
                    <ul class="list-inline">
                        <li><a href="javascript:void(0)" class="mobileBetting">Mobile Betting</a></li>
                        <li><a href="javascript:void(0)" onclick="AddFavorite()">Collection</a></li>
                        <li class="dropdown lang">
                            <a href="javascript:" class="lan cn current_language">简体中文</a>
                            <ul class="dropdown-menu">
                            <#list data.dictMap.siteLang as lua>
                                <li><a href="javascript:" data-language="${lua.language}" class="lan cn changeLanguage">${lua.tran}</a></li>
                            </#list>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!--nav-->
            <div class="navbar pull-right">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#home" data-toggle="tab" aria-expanded="true">Agent Home</a></li>
                    <!--代理加盟title-->
                <#list data.documents as document>
                    <#if document['parent']?exists && document['code']=="agent&cooperation">
                        <li><a href="#id_${document["id"]}" data-toggle="tab" aria-expanded="false">${document["title"]}</a></li>
                    </#if>
                </#list>
                    <!--代理加盟子项title-->
                <#list data.documents as document>
                    <#if document['parent']?exists && document['code']=="agent&cooperation">
                        <#list data.documents as children>
                            <#if children.parent_id = document.document_id>
                                <li><a href="#id_${children["id"]}" data-toggle="tab" aria-expanded="false">${children["title"]}</a></li>
                            </#if>
                        </#list>
                    </#if>
                </#list>
                    <li><a href="${data.contextInfo.agentCenterContext}" target="_blank">Agent Login</a></li>
                    <li><a href="javascript:" class="openNewWindow" data-url="<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>">online service</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="header-form clearfix">
        <div class="container">
            <div class="time pull-left _user_time"></div>
            <!--form-->
            <div class="form-wrap pull-right">
                <div class="_vr_unLogin" style="display:none;">
                    <form class="form-inline">
                        <input type="hidden" name="type" value="top">
                        <div class="form-group account">
                            <input type="text" name="username" maxlength="15" class="form-control" placeholder="Account">
                            <a href="javascript:" onclick="forgetUsername()" class="forget">Forget?</a>
                        </div>
                        <div class="form-group password">
                            <input type="password" name="password" maxlength="20" class="form-control" placeholder="Password">
                            <a href="javascript:void(0);" class="forget openNewWindow" data-url="commonPage/msiteCommonContent/forgetPwd.html">Forget?</a>
                        </div>
                        <div class="form-group code _vr_captcha_box" style="display: none">
                            <input type="text" class="form-control" name="captcha" maxlength="4" placeholder="verification code">
                            <img class="_vr_captcha_code" data-code="loginTop">
                        </div>
                        <a href="javascript:" type="button" class="btn-login _vr_login">SIGN IN</a>
                        <a href="register.html" class="btn-register">SIGN UP</a>
                    </form>
                </div>
                <!--panel-->
                <div class="header-panel _vr_loginSuccess" style="display: none">
                <#include "../../commonPage/en_US/msiteCommonContent/loginSuccess.ftl">
                </div>
            </div>
        </div>

    </div>
</header>
<main class="main-agent">
    <!-- notice -->
    <#include "notice.ftl">
    <!-- Agent -->
    <#include "../../commonPage/commonContent/agentContent.ftl">
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
</body>

</html>