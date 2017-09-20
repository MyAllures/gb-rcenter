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
<#include "../../commonPage/zh_CN/topLottery.ftl">
<main class="main-lottery">
    <div style="height: 406px;background: url(${data.configInfo.sitePath}/images/lottery-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <!-- Lottery -->
    <section class="lottery">
        <div class="tab-tit">
            <div class="container">
                <!-- Api-tabs -->
                <ul class="api-tabs lottery-tabs">
                <#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
                    <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
                        <li class="lottery-click <#if relationMap_index == 0>active</#if>" data-api="${relationMap.apiId?string.computer}">
                            <a class="_vr_mt_check _vr_mt_no" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-mt-ic="_vr_mt_lottery_${relationMap.apiId?string.computer}"
                               <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                                <span class="gui gui-logo-<#if apiMap[relationMap.apiId?string.computer]??>${apiMap[relationMap.apiId?string.computer]}</#if>"></span>
                                <span class="txt">${data.siteApiTypeRelationI18n[apiTypeLottery+relationMap.apiId?string.computer].name}</span>
                            </a>
                        </li>
                    </#list>
                </#if>
                </ul>
            </div>
        </div>

        <div class="container">
            <div class="lottery-box">
                <!-- game-list -->
                <div class="game-list">
                    <div class="row row-match">
                        <#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
                        <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
                            <#if lotteryApiMap01["${relationMap.apiId?string.computer}"]??>
                                <#list lotteryApiMap01["${relationMap.apiId?string.computer}"]?keys as gameImgs>
                                    <div data-api="${relationMap.apiId?string.computer}" class="lottery_list col-4-1 _vr_mt_lottery_${relationMap.apiId?string.computer} <#if relationMap_index != 0>hide</#if>">
                                        <figure class="game-item" data_id="${relationMap_index+1+.now}">
                                            <a href="javascript:" class="_vr_mt_check item" data-api="${relationMap.apiId?string.computer}" data-apitype="4">
                                                <div class="game-img"><img src="${data.configInfo.ftlRootPath}commonPage/images/lottery/${gameImgs}"></div>
                                                <div class="cover">
                                                    <div class="cover-bg"></div>
                                                    <div class="cover-name">${lotteryApiMap01["${relationMap.apiId?string.computer}"][gameImgs]}</div>
                                                </div>
                                            </a>
                                            <figcaption class="title">
                                                <a class="_vr_mt_check _vr_mt_slogan btn-play" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="4">${lotteryApiMap01["${relationMap.apiId?string.computer}"][gameImgs]}</a>

                                                <#if relationMap.apiId?string.computer == "22">
                                                    <a class="_vr_mt_check _vr_mt_slogan game-demo" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="4">试玩</a>
                                                </#if>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </#list>
                            </#if>
                        </#list>
                    </#if>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_CN/ads/gameAds.ftl">
<#include "script.ftl">
<script>
    $(function () {
        $(".lottery-click").on("click", function (e) {
            var _this = e.currentTarget;
            $(".lottery-click").removeClass("active");
            $(this).addClass("active");
            var tabPaneSelector = ".lottery_list[data-api="+$(_this).data("api")+"]";
            $(".lottery_list").addClass("hide");
            $(tabPaneSelector).removeClass("hide");
        })
    });
</script>
</body>

</html>
