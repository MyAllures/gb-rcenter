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
                        <li><a href="javascript:void(0)" onclick="AddFavorite()">加入收藏</a></li>
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
                    <li class="active"><a href="#home" data-toggle="tab" aria-expanded="true">代理首頁</a></li>
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
                    <li><a href="${data.contextInfo.agentCenterContext}" target="_blank">代理登入</a></li>
                    <li><a href="javascript:" class="openNewWindow" data-url="<#if data.defaultCustomerService?exists>${data.defaultCustomerService}</#if>">在线客服</a></li>
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
                            <input type="text" name="username" maxlength="15" class="form-control" placeholder="會員賬號">
                            <a href="javascript:" onclick="forgetUsername()" class="forget">忘記?</a>
                        </div>
                        <div class="form-group password">
                            <input type="password" name="password" maxlength="20" class="form-control" placeholder="密碼">
                            <a href="javascript:void(0);" class="forget openNewWindow" data-url="commonPage/forgetPwd.html">忘記?</a>
                        </div>
                        <div class="form-group code _vr_captcha_box" style="display: none">
                            <input type="text" class="form-control" name="captcha" maxlength="4" placeholder="驗證碼">
                            <img class="_vr_captcha_code" data-code="loginTop">
                        </div>
                        <a href="javascript:" type="button" class="btn-login _vr_login">立即登入</a>
                        <a href="register.html" class="btn-register">免費註冊</a>
                    </form>
                </div>
                <!--panel-->
                <div class="header-panel _vr_loginSuccess" style="display: none">
                    <a href="javascript:" class="_vr_nickname"></a>
                    <a href="${data.contextInfo.playerCenterContext}" target="_blank">玩家中心</a>
                    <a href="${data.contextInfo.playerCenterContext}#/operation/pAnnouncementMessage/messageList.html" target="_blank">訊息 <span class="label label-info _vr_messageCount"></span></a>
                    <a href="${data.contextInfo.playerCenterContext}#/fund/playerTransfer/transfers.html" target="_blank">額度轉換</a>
                    <a href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html" target="_blank">存款專區</a>
                    <a href="${data.contextInfo.playerCenterContext}#/player/withdraw/withdrawList.html" target="_blank">取款專區</a>
                    <div class="btn-group dropdown show-on-hover _vr_balanceBox">
                        <a href="javascript:void(0);" class="static-btn" name="balance_show" data-toggle="dropdown">總資產 <span class="text-warning text-big _vr_player_balance"></span><span class="caret"></span></a>
                        <a class="static-btn" name="balance_hide" style="display: none" data-toggle="dropdown"> 總資產 <span class="caret"></span></a>
                        <ul class="dropdown-menu dropdown-menu-right members-dropdown" style="width: 166px;">
                        <#include "../../commonPage/zh_TW/fetchBalance.ftl">
                        </ul>
                    </div>
                    <a class="btn btn-link" onclick="Logout()" style="margin-top: -7px;padding: 0;">退出</a>
                </div>
            </div>
        </div>

    </div>
</header>
<main class="main-agent">
    <!-- notice -->
    <#include "notice.ftl">
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
                            <div class="col-1-1 agent-content">
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
                            <div class="tab-pane fade agent-content-wrap" id="id_${children["id"]}" style="min-height: 600px;">
                                <div class="container">
                                    <div class="col-1-1 agent-content">
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
<#include "../../commonPage/zh_TW/ads/gameAds.ftl">
<#include "script.ftl">
</body>

</html>