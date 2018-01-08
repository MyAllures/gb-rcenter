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
<#include "top.ftl">
<#assign apiType = "2">
<main class="main-casino">
    <div style="height: 408px;background: url(${data.configInfo.sitePath}/images/casino-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <div class="clearfix"></div>
    <!-- Casino -->
    <section class="casino _vr_casinoSearch">
        <div class="container">
            <div class="casino-box">
                <!-- Api-tabs -->
                <div id="api-tabs" class="carousel auto" data-ride="carousel" data-shift="1" data-interval="2000">
                    <#assign apiNumPerSlide=6>
                    <#include "../../commonPage/zh_CN/msiteCommonContent/commonApiTabs.ftl">
                </div>
                <div class="game-list _vr_itemCasino">
                    <#include "casino_partial.ftl">
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_CN/msiteCommonScript/casinoScript.ftl">
</body>

</html>
