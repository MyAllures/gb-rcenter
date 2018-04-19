<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
<#include "../../commonPage/casinoCss/casinoV2Css.ftl"><#--新版电子页面需要引用的样式-->
</head>

<body>
<#include "top.ftl">
<#assign apiType = "2">
<main class="main-casino">
    <div style="height: 408px;background: url(${data.configInfo.sitePath}/images/casino-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
<#include "notice.ftl">
    <div class="clearfix"></div>
    <!-- Casino -->
    <section class="casino theme-black _vr_casinoSearch"> <#--主题配置{theme-black:黑色主题，theme-white：白色主题}-->
        <div class="container gutter-20"><!--排水沟大小-->
        <#include "../../commonPage/commonContent/casinoV2ApiTabs.ftl"> <#--新版电子apitab切换-->
            <div class="game-list _vr_itemCasino">
            <#include "casino_partial.ftl">
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_CN/msiteCommonScript/casinoScript.ftl">
<#--公共电子游戏弹窗-->
<#include "../../commonPage/zh_CN/gamePage/gamePage.ftl">

</body>

</html>
