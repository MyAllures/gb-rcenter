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
<#assign status ={"apply":"Join Now","participation":"Participate in","applyDeposit":"Deposit when applying","notStarted":"Has not started"}>
<#assign statusKeys = status?keys>

<main class="main-promo">
    <div style="height: 410px;background: url(${data.configInfo.sitePath}/images/promo-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
<#include "notice.ftl">
    <!-- Promo -->
    <section class="promo">
        <div class="container">
            <ul class="list-inline promo-sorts">
                <li class="active"><a href="javascript:void(0);" data-item="_all_">All activities</a></li>
                <#if data.activityClassify??>
                    <#list data.activityClassify as classifies>
                        <li data-filter="${classifies.key}" value="${classifies.key}">
                            <a href="javascript:void(0);" data-item="${classifies.key}">${classifies.value}</a>
                        </li>
                    </#list>
                </#if>
            </ul>
            <dl class="sidePromo">
            <#if data.activityMessage??>
                <#list data.activityMessage as am>
                    <#if am.states!="finished" || (am.code=="back_water" && am.states!="finished")>
                        <div id="cos_${am.id}" class="_vr_promo_check actContain ${am.activityClassifyKey}"
                             data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                             data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                            <dt>
                                <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}">
                            <div class="status"></div>
                            </dt>
                            <dd class="promo-content">
                                <!-- 优惠系统设置 -->
                                <div class="row promo-summary">
                                    <div class="col-12-10">
                                        <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                                        <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                                        <div class="subtitle">${am.activityName}</div>
                                    </div>
                                    <div class="col-12-2 text-center">
                                        <a href="javascript:" <#if am.frontParticipateStates!='notStarted'>onclick="joinPromo(this)"</#if>
                                           class="btn-play btn-join _vr_promo_join"><#list statusKeys as key><#if key == am.frontParticipateStates>${status[key]}</#if></#list></a>
                                    </div>
                                </div>
                                <!-- 优惠内容 -->
                                <div style="word-break: break-all;">${am.activityDescription}</div>
                            </dd>
                        </div>
                    </#if>
                </#list>
            </#if>
            <#if data.activityMessage??>
                <#list data.activityMessage as am>
                    <#if am.states="finished">
                        <div id="cos_${am.id}" class="_vr_promo_check actContain ${am.activityClassifyKey}"
                             data-type="over" data-code="${am.code}" data-searchid="${am.searchId}"
                             data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                            <dt class="status-over">
                                <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}">
                            <div class="status"></div>
                            </dt>
                            <dd class="promo-content status-over">
                                <!-- 优惠系统设置 -->
                                <div class="row promo-summary">
                                    <div class="col-12-10">
                                        <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                                        <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                                        <div class="subtitle">${am.activityName}</div>
                                    </div>
                                    <div class="col-12-2 text-center">
                                        <a class="btn-play btn-join" href="javascript:void(0);">Over</a>
                                    </div>
                                </div>
                                <!-- 优惠内容 -->
                                <div style="word-break: break-all;">
                                ${am.activityDescription}
                                </div>
                            </dd>
                        </div>
                    </#if>
                </#list>
            </#if>
            </dl>
        </div>
    </section>
    <#include "../../commonPage/en_US/msiteCommonContent/promoTip.ftl">
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/en_US/msiteCommonScript/promoScript.ftl">
<#include "../../commonPage/commonScript/promoScript.ftl">
</body>

</html>
