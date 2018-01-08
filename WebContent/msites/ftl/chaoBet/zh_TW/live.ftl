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

<#--  当前api_type_id = 1 -->
<#assign apiType = "1">
<#-- api图片路径 -->
<#assign bgCover ={"1":"${data.configInfo.sitePath}/images/live-item-bg-ds.jpg","3":"${data.configInfo.sitePath}/images/live-item-bg-mg.jpg","5":"${data.configInfo.sitePath}/images/live-item-bg-gd.jpg","7":"${data.configInfo.sitePath}/images/live-item-bg-og.jpg","8":"${data.configInfo.sitePath}/images/live-item-bg-slc.jpg","9":"${data.configInfo.sitePath}/images/live-item-bg-ag.jpg","10":"${data.configInfo.sitePath}/images/live-item-bg-bb.jpg","16":"${data.configInfo.sitePath}/images/live-item-bg-ebet.jpg","17":"${data.configInfo.sitePath}/images/live-item-bg-sa.jpg"}>
<#assign bgCoverKeys = bgCover?keys>
<#--api logo-->
<#assign apiLogo ={"1":"${data.configInfo.sitePath}/images/live-logo-ds.png","3":"${data.configInfo.sitePath}/images/live-logo-mg.png","5":"${data.configInfo.sitePath}/images/live-logo-gd.png","7":"${data.configInfo.sitePath}/images/live-logo-og.png","8":"${data.configInfo.sitePath}/images/live-logo-slc.png","9":"${data.configInfo.sitePath}/images/live-logo-ag.png","10":"${data.configInfo.sitePath}/images/live-logo-bb.png","16":"${data.configInfo.sitePath}/images/live-logo-ebet.png","17":"${data.configInfo.sitePath}/images/live-logo-sa.png"}>
<#assign logoKeys = apiLogo?keys>
<#--10-->
<#assign api10 ={'lineSize':[4,4,4],'game':{"百家樂":"poker1","骰寶":"dice1","龍虎鬥":"poker2","牛牛":"spade-fill","無限21點":"chip2","番攤":"coin-cny","三公":"poker1","二八槓":"dice1","輪盤":"roulette3","色碟":"chip1","德州撲克":"poker2","溫州牌九":"dice1"}}>
<#assign api10Keys = api10?keys>
<#--9-->
<#assign api9 ={'lineSize':[3,4],'game':{"旗艦廳":"poker1","國際廳":"dice1","貴賓廳":"poker2","百家樂":"spade-fill","龍虎鬥":"chip2","輪盤":"coin-cny","骰寶":"poker1"}}>
<#assign api9Keys = api9?keys>
<#--7-->
<#assign api7 ={'lineSize':[3,3],'game':{"連環百家樂":"poker1","百家樂":"dice1","龍虎鬥":"poker2","骰寶":"spade-fill","番攤":"chip2","輪盤":"coin-cny"}}>
<#assign api7Keys = api7?keys>
<#--5-->
<#assign api5 ={'lineSize':[2,2],'game':{"3D百家樂":"poker1","多臺百家樂":"dice1","多彩百家樂":"poker2","輪盤":"spade-fill"}}>
<#assign api5Keys = api5?keys>
<#--3-->
<#assign api3 ={'lineSize':[3,4],'game':{"龍虎百家樂":"poker2","百家樂":"poker1","骰寶":"spade-fill","輪盤":"coin-cny","21點":"chip2","德州撲克":"poker2","PLAYBOY":"heart-fill"}}>
<#assign api3Keys = api3?keys>
<#--8-->
<#assign api8 ={'lineSize':[3,3],'game':{"百家樂":"poker1","保險百家樂":"dice1","番攤":"poker2","龍虎鬥":"spade-fill","色碟":"poker1","輪盤":"dice1","色碟":"poker2","骰寶":"poker1","魚蝦蟹骰寶":"dice1"}}>
<#assign api8Keys = api8?keys>
<#--1-->
<#assign api1 ={'lineSize':[2,3],'game':{"百家樂":"poker1","輪盤":"dice1","龍虎":"poker2","骰寶":"spade-fill","鬥牛":"spade-fill"}}>
<#assign api1Keys = api1?keys>
<#--16-->
<#assign api16 ={'lineSize':[2,3],'game':{"競咪百家樂":"poker1","龍虎":"dragon-tiger","百家樂":"poker2","輪盤":"roulette3","骰寶":"dice1"}}>
<#assign api16Keys = api16?keys>
<#--17-->
<#assign api17 ={'lineSize':[2,3],'game':{"百家樂":"poker1","龍虎":"dragon-tiger","輪盤":"roulette3","骰寶":"dice1","番攤":"chip2"}}>
<#assign api17Keys = api17?keys>

<#assign liveApis={"1":api1,"3":api3,"5":api5,"7":api7,"8":api8,"9":api9,"10":api10,"16":api16,"17":api17}>
<#assign liveLogos = {"1":"ds","5":"gd","7":"og","9":"ag","10":"bb","16":"ebet","17":"sa"}>
<#assign liveLogoDescs = {"1":"服務至上的亞洲線上賭場","3":"VIP貴賓廳，至尊享受","5":"全球口碑最好平臺之一","7":"東南亞最大賭場","9":"全球唯一女優發牌","10":"亞洲最知名遊戲平臺","16":"亞洲技術領先的新晉賭場","17":"亞洲服務最好娛樂平臺"}>
<#assign liveScript02=true>

<main class="main-live">
    <div style="height: 408px;background: url(${data.configInfo.sitePath}/images/live-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <div class="clearfix"></div>
    <!-- live-wrap -->
    <section class="live-wrap">
        <div class="container p-x-0">
            <div class="row row-match">
            <#if data.siteApiTypeRelationMap['1']?exists>
                <#list data.siteApiTypeRelationMap['1'] as relationMap>
                    <#if liveApis[relationMap.apiId?string.computer]??>
                        <div class="col-3-1">
                            <figure class="live-item <#if liveLogos[relationMap.apiId?string.computer]??>${liveLogos[relationMap.apiId?string.computer]}</#if>">
                                <div class="item" style="background-image: url(<#list bgCoverKeys as key><#if key == relationMap.apiId?string.computer>${bgCover[key]}</#if></#list>)">
                                    <div class="logo">
                                        <img src="<#list logoKeys as key><#if key == relationMap.apiId?string.computer>${apiLogo[key]}</#if></#list>">
                                        <h5 class="title"><#if liveLogoDescs[relationMap.apiId?string.computer]??>${liveLogoDescs[relationMap.apiId?string.computer]}</#if></h5>
                                    </div>
                                    <div class="cover">
                                        <div class="blur" style="background-image: url(<#list logoKeys as key><#if key == relationMap.apiId?string.computer>${apiLogo[key]}</#if></#list>);"></div>
                                        <div class="row row-gutter-0 hot-list">
                                            <#list liveApis[relationMap.apiId?string.computer]["game"]?keys as key>
                                                <#assign countSize = 0>
                                                <div class="<#list liveApis[relationMap.apiId?string.computer]['lineSize'] as size><#assign countSize = countSize+size><#if key_index<countSize>col-${size}-1<#break ></#if></#list>">
                                                    <a class="btn-live _vr_mt_check" href="javascript:"
                                                       data-api="${relationMap.apiId?string.computer}" data-apitype="${apiType}"
                                                       startTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}</#if>"
                                                       endTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}</#if>">
                                                        <span class="gui gui-2x gui-${liveApis[relationMap.apiId?string.computer]['game'][key]}"></span>
                                                    ${key}
                                                    </a>
                                                </div>
                                            </#list>
                                        </div>
                                    </div>
                                </div>
                                <figcaption class="title">
                                ${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}
                                    <a class="live-play _vr_mt_check _vr_mt_slogan" href="javascript:"
                                       data-api="${relationMap.apiId?string.computer}" data-apitype="${apiType}"
                                       startTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}</#if>"
                                       endTime="<#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}</#if>">开始游戏</a>
                                </figcaption>
                            </figure>
                        </div>
                    </#if>
                </#list>
            </#if>
            <#if data.siteApiTypeRelationMap['1']?size%3!=0>
                <#list 1..(3-data.siteApiTypeRelationMap['1']?size%3) as t>
                    <div class="col-3-1">
                        <figure class="live-item coming">
                            <div class="item" style="background-image: url(${data.configInfo.sitePath}/images/live-item-bg-coming.jpg);">
                            </div>
                            <figcaption class="title">敬請期待</figcaption>
                        </figure>
                    </div>
                </#list>
            </#if>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<script>
    $(function () {
        // 真人-栅格滑入动画
        $(".live-item > .item").hover(function () {
            var $this = $(this);
            $('.logo', $this).stop().fadeOut(500);
            $('.cover', $this).stop().fadeIn(500);
            $('.cover .row', $this).stop().fadeIn(500);
        }, function () {
            var $this = $(this);
            $('.logo', $this).stop().fadeIn(500);
            $('.cover', $this).stop().fadeOut(500);
            $('.cover .row', $this).stop().fadeOut(500);
        });
    });
</script>
</body>

</html>
