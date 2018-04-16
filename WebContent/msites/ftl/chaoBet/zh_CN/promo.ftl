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
<#assign status ={"apply":"立即加入","participation":"参与中","applyDeposit":"存款时申请","notStarted":"未开始"}>
<#assign statusKeys = status?keys>
<main class="main-promo">
    <div style="height: 410px;background: url(${data.configInfo.sitePath}/images/promo-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
<#include "notice.ftl">
    <!-- Promo -->
    <section class="promo">
        <div class="container">
            <ul class="list-inline promo-sorts _vr_promo">
                <li class="active"><a href="javascript:void(0);" data-item="_all_">所有活动</a></li>
                <#if data.activityClassify??>
                    <#list data.activityClassify as classifies>
                        <li data-filter="${classifies.key}" value="${classifies.key}">
                            <a href="javascript:void(0);" data-item="${classifies.key}">${classifies.value}</a>
                        </li>
                    </#list>
                </#if>
                <li class="hisActivityButton hide"><a href="javascript:void(0)" data-item="historyActivitys">历史优惠</a></li>
            </ul>
            <dl class="sidePromo">
            <#if data.activityMessage??>
                <#list data.activityMessage as am>
                    <#if am.states!="finished" || (am.code=="back_water" && am.states!="finished")>
                        <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain actContain _vr_all"
                             data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                             data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                            <dt>
                                <span class="_vr_promo_end" data-format="yyyy年MM月dd日" style="color: #fff;"></span>
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
            <#if data.processActivityMessage??>
                <#list data.processActivityMessage as am>
                    <#if am.states!="finished" || (am.code=="back_water" && am.states!="finished")>
                        <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain actContain _vr_process ${am.activityClassifyKey} hide"
                             data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                             data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                            <dt>
                                <span class="_vr_promo_end" data-format="yyyy年MM月dd日" style="color: #fff;"></span>
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
            <#if data.historyActivityMessage??>
                <#list data.historyActivityMessage as his>
                    <#if his.states="finished">
                        <div id="cos_${his.id}" class="_vr_promo_check _vr_actContain actContain <#if his.isDisplay?string('true','false')=='true'>historyActivitys</#if>"
                             data-type="over" data-code="${his.code}" data-searchid="${his.searchId}"
                             data-rank-id="<#if his.allRank?? && his.allRank>all<#elseif his.code=="back_water">backwater<#else >${his.rankid}</#if>">
                            <dt class="status-over">
                                <span class="_vr_promo_end" data-format="yyyy年MM月dd日" style="color: #fff;"></span>
                                <img src="${imgPath(data.configInfo.domain,his.activityAffiliated)}">
                            <div class="status"></div>
                            </dt>
                            <dd class="promo-content status-over">
                                <!-- 优惠系统设置 -->
                                <div class="row promo-summary">
                                    <div class="col-12-10">
                                        <input class="_vr_promo_ostart" type="hidden" value="${his.startTime?long?string.computer}">
                                        <input class="_vr_promo_oend" type="hidden" value="${his.endTime?long?string.computer}">
                                        <div class="subtitle">${his.activityName}</div>
                                    </div>
                                    <div class="col-12-2 text-center">
                                        <a class="btn-play btn-join" href="javascript:void(0);">已结束</a>
                                    </div>
                                </div>
                                <!-- 优惠内容 -->
                                <div style="word-break: break-all;">
                                ${his.activityDescription}
                                </div>
                            </dd>
                        </div>
                    </#if>
                </#list>
            </#if>
            </dl>
        </div>
    </section>
    <#include "../../commonPage/zh_CN/msiteCommonContent/promoTip.ftl">
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_CN/msiteCommonScript/promoScript.ftl">
<script>
    $(function(){
        $("._vr_promo li").each(function(){
            $(this).on("click","a",function(){
                if(!$(this).parent().hasClass("active")){
                    $(this).parent().siblings().removeClass("active");
                    $(this).parent().addClass("active");
                    var val = $(this).data("item");
                    if (val=="_all_"){
                        $("._vr_all").removeClass("hide");
                        $("._vr_process").addClass("hide");
                    }else {
                        $("._vr_all").addClass("hide");
                        $("._vr_process").removeClass("hide");
                        $("._vr_actContain").addClass("hide");
                        $("."+val).removeClass("hide");
                    }
                }
            })
        })
    })
</script>
</body>

</html>
