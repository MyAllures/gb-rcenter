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
<#assign bgCover ={"1":"${data.configInfo.sitePath}/images/live-item-bg-ds.jpg","3":"${data.configInfo.sitePath}/images/live-item-bg-mg.jpg","5":"${data.configInfo.sitePath}/images/live-item-bg-gd.jpg","7":"${data.configInfo.sitePath}/images/live-item-bg-og.jpg","8":"${data.configInfo.sitePath}/images/live-item-bg-slc.jpg","9":"${data.configInfo.sitePath}/images/live-item-bg-ag.jpg","10":"${data.configInfo.sitePath}/images/live-item-bg-bb.jpg","16":"${data.configInfo.sitePath}/images/live-item-bg-ebet.jpg","17":"${data.configInfo.sitePath}/images/live-item-bg-sa.jpg","24":"${data.configInfo.sitePath}/images/live-item-bg-opus.jpg"}>
<#assign bgCoverKeys = bgCover?keys>
<#--api logo-->
<#assign apiLogo ={"1":"${data.configInfo.sitePath}/images/live-logo-ds.png","3":"${data.configInfo.sitePath}/images/live-logo-mg.png","5":"${data.configInfo.sitePath}/images/live-logo-gd.png","7":"${data.configInfo.sitePath}/images/live-logo-og.png","8":"${data.configInfo.sitePath}/images/live-logo-slc.png","9":"${data.configInfo.sitePath}/images/live-logo-ag.png","10":"${data.configInfo.sitePath}/images/live-logo-bb.png","16":"${data.configInfo.sitePath}/images/live-logo-ebet.png","17":"${data.configInfo.sitePath}/images/live-logo-sa.png","24":"${data.configInfo.sitePath}/images/live-logo-opus.png"}>
<#assign logoKeys = apiLogo?keys>
<#--10-->
<#assign api10 ={'lineSize':[4,4,4],'game':{"百家乐":"poker1","骰宝":"dice1","龙虎斗":"poker2","牛牛":"spade-fill","无限21点":"chip2","番摊":"coin-cny","三公":"poker1","二八杠":"dice1","轮盘":"roulette3","色碟":"chip1","德州扑克":"poker2","温州牌九":"dice1"}}>
<#assign api10Keys = api10?keys>
<#--9-->
<#assign api9 ={'lineSize':[3,4],'game':{"旗舰厅":"poker1","国际厅":"dice1","贵宾厅":"poker2","百家乐":"spade-fill","龙虎斗":"chip2","轮盘":"coin-cny","骰宝":"poker1"}}>
<#assign api9Keys = api9?keys>
<#--7-->
<#assign api7 ={'lineSize':[3,3],'game':{"连环百家乐":"poker1","百家乐":"dice1","龙虎斗":"poker2","骰宝":"spade-fill","番摊":"chip2","轮盘":"coin-cny"}}>
<#assign api7Keys = api7?keys>
<#--5-->
<#assign api5 ={'lineSize':[2,2],'game':{"3D百家乐":"poker1","多台百家乐":"dice1","多彩百家乐":"poker2","轮盘":"spade-fill"}}>
<#assign api5Keys = api5?keys>
<#--3-->
<#assign api3 ={'lineSize':[3,4],'game':{"龙虎百家乐":"poker2","百家乐":"poker1","骰宝":"spade-fill","轮盘":"coin-cny","21点":"chip2","德州扑克":"poker2","PLAYBOY":"heart-fill"}}>
<#assign api3Keys = api3?keys>
<#--8-->
<#assign api8 ={'lineSize':[3,3],'game':{"百家乐":"poker1","保险百家乐":"dice1","番摊":"poker2","龙虎斗":"spade-fill","色碟":"poker1","轮盘":"dice1","色碟":"poker2","骰宝":"poker1","鱼虾蟹骰宝":"dice1"}}>
<#assign api8Keys = api8?keys>
<#--1-->
<#assign api1 ={'lineSize':[2,3],'game':{"百家乐":"poker1","轮盘":"dice1","龙虎":"poker2","骰宝":"spade-fill","斗牛":"spade-fill"}}>
<#assign api1Keys = api1?keys>
<#--16-->
<#assign api16 ={'lineSize':[2,3],'game':{"竞咪百家乐":"poker1","龙虎":"dragon-tiger","百家乐":"poker2","轮盘":"roulette3","骰宝":"dice1"}}>
<#assign api16Keys = api16?keys>
<#--17-->
<#assign api17 ={'lineSize':[2,3],'game':{"百家乐":"poker1","龙虎":"dragon-tiger","轮盘":"roulette3","骰宝":"dice1","番摊":"chip2"}}>
<#assign api17Keys = api17?keys>
<#--24-->
<#assign api24 ={'lineSize':[2,2],'game':{"七喜百家乐":"poker1","骰宝":"dice1","龙虎":"dragon-tiger","轮盘":"roulette3"}}>
<#assign api24Keys = api24?keys>

<#assign liveApis={"1":api1,"3":api3,"5":api5,"7":api7,"8":api8,"9":api9,"10":api10,"16":api16,"17":api17,"24":api24}>
<#assign liveLogos = {"1":"ds","5":"gd","7":"og","9":"ag","10":"bb","16":"ebet","17":"sa","24":"opus-l"}>
<#assign liveLogoDescs = {"1":"服务至上的亚洲线上赌场","3":"VIP贵宾厅，至尊享受","5":"全球口碑最好平台之一","7":"东南亚最大赌场","9":"全球唯一女优发牌","10":"亚洲最知名游戏平台","16":"亚洲技术领先的新晋赌场","17":"亚洲服务最好娱乐平台","24":"欧洲最流行的线上娱乐平台"}>
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
                            <figcaption class="title">敬请期待</figcaption>
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
