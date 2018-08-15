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
<#include "../../commonPage/zh_CN/topLottery_new.ftl">
<main class="main-lottery">
    <div style="height: 406px;background: url(${data.configInfo.sitePath}/images/lottery-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <!-- Lottery -->
    <section class="lottery">
        <div class="tab-tit">
            <div class="container">
                <!-- Api-tabs -->
                <div id="api-tabs" class="carousel">
                    <#include "../../commonPage/zh_CN/msiteCommonContent/commonLotteryApiTabs.ftl">
                </div>
            </div>
        </div>

        <div class="container">
            <div class="lottery-box">
                <!-- game-list -->
                <div class="game-list">
                    <div class="row row-match">
                        <#if data.siteApiTypeRelationMap[apiTypeLottery]?exists>
                            <#list data.siteApiTypeRelationMap[apiTypeLottery] as relationMap>
                                <#assign apiId = relationMap.apiId?string.computer>
                                <#if lotteryApiMap01[apiId]??>
                                    <#list lotteryApiMap01[apiId]?values as lotteryObj>
                                        <div data-api="${apiId}" class="lottery_list col-4-1 _vr_mt_lottery_${apiId} <#if relationMap_index != 0>hide</#if>">
                                            <figure class="game-item" data_id="${relationMap_index+1+.now}">
                                                <a href="javascript:" class="_vr_mt_check item" data-api="${apiId}" data-apitype="${apiTypeLottery}" data-lottery-code="${lotteryObj.code}">
                                                    <div class="game-img"><#if lotteryObj??><img src="${imgPath(data.configInfo.domain,lotteryObj.gameCover)}"></#if></div>
                                                </a>
                                                                            <#--<img src="${imgPath(data.configInfo.domain,lotteryObj.gameCover)}">
                                                                                <img src="${data.configInfo.ftlRootPath}commonPage/images/lottery/${lotteryObj.gameCover}">-->
                                                <figcaption class="title">
                                                    <a class="_vr_mt_check _vr_mt_slogan btn-play" href="javascript:void(0)" data-api="${apiId}" data-apitype="${apiTypeLottery}" data-lottery-code="${lotteryObj.code}">${lotteryObj.name}</a>
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
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/commonScript/lotteryScript.ftl">
</body>

</html>
