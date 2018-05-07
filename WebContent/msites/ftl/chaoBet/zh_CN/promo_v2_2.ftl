<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <#include "head.include.ftl">
    <style type="text/css">
        body {
            background: url("themes/promo/images/bg.png");
        }
    </style>
</head>

<body>
<#include "top.ftl">
<#assign status ={"apply":"立即加入","participation":"参与中","applyDeposit":"存款时申请","notStarted":"未开始"}>
<#assign statusKeys = status?keys>
<main class="main-promo">
    <div style="height: 410px;background: url(${data.configInfo.sitePath}/images/promo-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <!-- Promo -->
    <section class="main-promo theme-white"> <!--主题切换 theme-black,theme-white-->
        <div class="promo-top-bar">
            <ul class="_vr_promo">
                <li class="active"><a href="javascript:void(0);" data-item="_all_">所有活动</a></li>
                <#if data.activityClassify??>
                    <#list data.activityClassify as classifies>
                        <li data-filter="${classifies.key}" value="${classifies.key}">
                            <a href="javascript:void(0);" data-item="${classifies.key}">${classifies.value}</a>
                        </li>
                    </#list>
                </#if>
            </ul>
            <div class="search-bar">
                <form>
                    <div class="input-wrap"><input type="text" id="search-input" placeholder="按活动名称搜索"/><i class="icon-search"></i></div>
                    <a onclick="searchActivity(this)" href="javascript:" class="btn-search">搜索</a>
                </form>
            </div>
        </div>
        <div class="list-type2"> <!--列表类型二-->
            <div class="row">
            <#if data.activityMessage??>
                <#list data.activityMessage as am>
                    <div class="col-3-1 _vr_all">
                        <div class="list_type2_item_tit">${am.activityName}</div>
                        <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain promo-item" data-activityName="${am.activityName}"
                             data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                             data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                            <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}"/>
                            <div class="promo-status processing" style="display: none"><i class="icon-clock"></i>进行中</div>
                            <div class="promo-status noyet" style="display: none"><i class="icon-clock"></i>未开始</div>
                            <div class="promo-status over" style="display: none"><i class="icon-clock"></i>已结束</div>
                            <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                            <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                            <div class="shadow">
                                <div class="btn-apply _vr_promo_join" onclick="joinPromo(this,event)">
                                    立即加入
                                </div>
                            </div>
                            <div class="promo-detail">
                                <div class="tit">${am.activityName}</div>
                                <div class="content">${am.activityDescription}</div>
                            </div>
                        </div>
                    </div>
                </#list>
            </#if>

            <#if data.processActivityMessage??>
                <#list data.processActivityMessage as am>
                    <div class="col-3-1 _vr_process hide">
                        <div class="list_type2_item_tit">${am.activityName}</div>
                        <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain promo-item ${am.activityClassifyKey}"
                             data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                             data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                            <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}"/>
                            <div class="promo-status processing" style="display: none"><i class="icon-clock"></i>进行中</div>
                            <div class="promo-status noyet" style="display: none"><i class="icon-clock"></i>未开始</div>
                            <div class="promo-status over" style="display: none"><i class="icon-clock"></i>已结束</div>
                            <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                            <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                            <div class="shadow">
                                <div class="btn-apply _vr_promo_join" onclick="joinPromo(this,event)">
                                    立即加入
                                </div>
                            </div>
                            <div class="promo-detail">
                                <div class="tit">${am.activityName}</div>
                                <div class="content">${am.activityDescription}</div>
                            </div>
                        </div>
                    </div>
                </#list>
            </#if>
            </div>
        </div>
    </section>

<#include "../../commonPage/zh_CN/msiteCommonContent/promoTip.ftl">
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_CN/msiteCommonScript/promoScriptHall.ftl">
</body>

</html>

