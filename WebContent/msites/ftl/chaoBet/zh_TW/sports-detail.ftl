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
<main class="main-sports2">
    <!-- notice -->
<#include "notice.ftl">
    <!-- Sports -->
    <section class="sports">
        <!-- IM体育 -->
        <div class="sports-box">
            <ul class="api-tabs sports-tabs">
                <#if data.siteApiTypeRelationMap['3']?exists>
                    <#list data.siteApiTypeRelationMap['3'] as relationMap>
                        <#if relationMap.apiId?string.computer!="10">
                            <li class="<#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>">
                                <a href="javascript:void(0)" class="_vr_mt_check lottery_btn_${relationMap.apiId?string.computer}"
                                   data-api="${relationMap.apiId?string.computer}" data-apitype="3" data-sports="sports"
                                    <#if relationMap.apiId?string.computer!="10">
                                   data-href="sports-detail.html?apiId=${relationMap.apiId?string.computer}"
                                    </#if>
                                   <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                                   <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                                    <span class="gui gui-logo-<#if apiMap[relationMap.apiId?string.computer]??>${apiMap[relationMap.apiId?string.computer]}</#if>"></span>
                                ${data.siteApiTypeRelationI18n['3'+relationMap.apiId?string.computer].name}<span class="_vr_mt_ptSlogan"></span>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </#if>
            </ul>
            <div class="bulk-frame">
                <iframe id="sportFrame"  scrolling="yes" frameborder="0" allowtransparency="true" style="border:0px;width: 100%;height: 1000px;"></iframe>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_TW/ads/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_TW/sportsScript.ftl">
</body>

</html>
