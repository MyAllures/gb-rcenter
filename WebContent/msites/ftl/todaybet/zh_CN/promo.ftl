<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "head.include.ftl">
    <style>
        header .nav-wrap .logo {
            top: 30px;
        }
    </style>
</head>
<body>
<#include "top.ftl">
<#assign status ={"apply":"立即加入","participation":"参与中","applyDeposit":"存款时申请","notStarted":"未开始"}>
<#assign statusKeys = status?keys>
<main class="main-promo">
    <!-- Promo -->
    <section class="promo">
        <div class="container">
            <div class="promo-box">
                <ul class="promo-sorts list-inline">
                    <li class="active"><a href="javascript:void(0);" data-item="_all_">所有活动</a></li>
                    <#if data.activityClassify??>
                        <#list data.activityClassify as classifies>
                            <li data-filter="${classifies.key}" value="${classifies.key}">
                                <a href="javascript:void(0);" data-item="${classifies.key}">${classifies.value}</a>
                            </li>
                        </#list>
                    </#if>
                </ul>
                <#if data.activityMessage??>
                <#list data.activityMessage as am>
                    <#if (am.states!="finished" && am.frontParticipateStates!='notStarted') || (am.code=="back_water" && am.states!="finished")>
                        <div id="cos_${am.id}" class="promo-item ${am.activityClassifyKey} _vr_promo_check" data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}" data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                            <div class="time">活动截止：<span class="_vr_promo_end" data-format="yyyy年MM月dd日"></span></div>
                            <div class="point"></div>
                            <div class="item-box">
                                <div class="item-status"></div>
                                <div class="item-top"></div>
                                <dl class="sidePromo">
                                    <dt>
                                        <h3>${am.activityName}</h3>
                                        <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}">
                                        <div class="promo-btns _vr_promo_processing">
                                            <#if am.frontParticipateStates!='notDisplay'>
                                                <a href="javascript:void(0);" <#if am.frontParticipateStates!='notStarted'>onclick="joinPromo(this)"</#if> class="btn btn-hollow _vr_promo_join"><#list statusKeys as key><#if key == am.frontParticipateStates>${status[key]}</#if></#list></a>
                                            <#else >
                                                <a class="btn">查看详情</a>
                                            </#if>
                                        </div>
                                    </dt>
                                    <dd class="promo-content">
                                        <input type="hidden" class="_vr_promo_oend" value="${am.endTime?long?string.computer}">
                                        <input type="hidden" class="_vr_promo_ostart" value="${am.startTime?long?string.computer}">
                                    ${am.activityDescription}
                                    </dd>
                                </dl>
                                <div class="item-foot"></div>
                            </div>
                        </div>
                    </#if>
                </#list>
                <#list data.activityMessage as am>
                    <#if am.states=="finished">
                        <div id="cos_${am.id}" class="promo-item over ${am.activityClassifyKey} _vr_promo_check">
                            <div class="time">活动截止：<span class="_vr_promo_end" data-format="yyyy年MM月dd日"></span></div>
                            <div class="point"></div>
                            <div class="item-box">
                                <div class="item-status"></div>
                                <div class="item-top"></div>
                                <dl class="sidePromo">
                                    <dt>
                                        <h3>${am.activityName}</h3>
                                        <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}">
                                        <div class="promo-btns">
                                            <a class="btn">查看详情</a>
                                        </div>
                                    </dt>
                                    <dd class="promo-content">
                                        <input type="hidden" class="_vr_promo_oend" value="${am.endTime?long?string.computer}">
                                        <input type="hidden" class="_vr_promo_ostart" value="${am.startTime?long?string.computer}">
                                    ${am.activityDescription}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>
            </div>
        </div>
    </section>
</main>
<#include "footer.ftl">
<#include "../../commonPage/zh_CN/ads/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_CN/promoScript.ftl">
<script>
    $(function () {
        $(".promo-sorts li").each(function () {
            $(this).on("click", "a", function () {
                if (!$(this).parent().hasClass("active")) {
                    $(this).parent().siblings().removeClass("active");
                    $(this).parent().addClass("active");
                    var val = $(this).data("item");
                    if (val == "_all_") {
                        $(".actContain").show();
                    } else {
                        $(".actContain").hide();
                        $("." + val).show();
                    }
                }
            })
        })
    })
</script>
</body>

</html>
