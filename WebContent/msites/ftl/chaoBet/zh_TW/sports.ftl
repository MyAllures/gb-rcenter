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
<main class="main-sports1">
    <div class="container">
        <div class="txt">
            chaobet擁有健全的體育博彩系統，遊戲庫中擁有超過50種各類體育走地賽事，<br />涉及足球、籃球、網球等世界主流體育專案，每月提供上萬場賽事預播及直播。
        </div>
        <div class="ball-wrap">
        <#if data.siteApiTypeRelationMap['3']?exists>
            <#list data.siteApiTypeRelationMap['3'] as relationMap>
                <#if relationMap.apiId?string.computer!="10">
                    <div class="ball">
                        <div class="s-icon"></div>
                        <a href="javascript:void(0)" class="_vr_mt_check lottery_btn_${relationMap.apiId?string.computer}"
                           data-api="${relationMap.apiId?string.computer}" data-apitype="3" data-sports="sports"
                            <#if relationMap.apiId?string.computer!="10">
                           data-href="sports-detail.html?apiId=${relationMap.apiId?string.computer}"
                            </#if>
                           <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                            <div class="s-name">${data.siteApiTypeRelationI18n['3'+relationMap.apiId?string.computer].name}</div>
                        </a>
                        <a href="javascript:void(0)" class="_vr_mt_check lottery_btn_${relationMap.apiId?string.computer} btn-s _vr_mt_ptSlogan"
                           data-api="${relationMap.apiId?string.computer}" data-apitype="3" data-sports="sports"
                            <#if relationMap.apiId?string.computer!="10">
                           data-href="sports-detail.html?apiId=${relationMap.apiId?string.computer}"
                            </#if>
                           <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>开始游戏</a>
                    </div>
                </#if>
            </#list>
        </#if>
        </div>
    </div>
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
</body>

</html>
 