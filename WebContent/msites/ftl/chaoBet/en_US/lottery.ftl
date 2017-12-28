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
<#include "../../commonPage/en_US/topLottery.ftl">
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
                <#assign apiNumPerSlide=3>
                    <#include "../../commonPage/zh_CN/commonLotteryApiTabs.ftl">
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
                                            <a href="javascript:" class="_vr_mt_check item" data-api="${relationMap.apiId?string.computer}" data-apitype="4" <#if relationMap.apiId?string.computer=="22">data-lottery-code="${lotteryApiMap01["${relationMap.apiId?string.computer}"][gameImgs].code}"</#if>>
                                                <div class="game-img"><img src="${data.configInfo.ftlRootPath}commonPage/images/lottery/${gameImgs}"></div>
                                            </a>
                                            <figcaption class="title"><a class="_vr_mt_check _vr_mt_slogan btn-play" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-apitype="4" <#if relationMap.apiId?string.computer=="22">data-lottery-code="${lotteryApiMap01["${relationMap.apiId?string.computer}"][gameImgs].code}"</#if>><#if relationMap.apiId?string.computer=="22">${lotteryApiMap01["${relationMap.apiId?string.computer}"][gameImgs].name}<#else >${lotteryApiMap01["${relationMap.apiId?string.computer}"][gameImgs]}</#if></a></figcaption>
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
<#include "../../commonPage/zh_TW/ads/gameAds.ftl">
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
