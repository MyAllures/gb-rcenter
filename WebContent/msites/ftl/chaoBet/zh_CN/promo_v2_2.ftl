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
                <li class="hisActivityButton hide"><a href="javascript:void(0)" data-item="historyActivitys">历史优惠</a></li>
            </ul>
        </div>
        <div class="list-type2"> <!--列表类型二-->
            <div class="row">
            <#if data.activityMessage??>
                <#list data.activityMessage as am>
                    <#if am.states!="finished">
                        <div class="col-3-1 _vr_all">
                            <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain promo-item"
                                 data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                                 data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                                <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}"/>
                                <div class="promo-status processing"><i class="icon-clock"></i>进行中</div>
                                <div class="shadow">
                                    <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                                    <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                                    <#if am.frontParticipateStates!='notStarted'>
                                        <#list statusKeys as key>
                                            <#if key == am.frontParticipateStates>
                                                <div class="btn-apply">
                                                    <a href="javascript:" onclick="joinPromo(this)"
                                                       class="btn-play btn-join _vr_promo_join">${status[key]}</a>
                                                </div>
                                            </#if>
                                        </#list>
                                    </#if>
                                    <a href="javascript:void(0);" class="btn-detail">
                                        <i class="icon-detail"></i>
                                        活动详细
                                    </a>
                                </div>
                                <div class="promo-detail">
                                    <div class="tit">${am.activityName}</div>
                                    <div class="content">${am.activityDescription}</div>
                                </div>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>

            <#if data.processActivityMessage??>
                <#list data.processActivityMessage as am>
                    <#if am.states!="finished" || (am.code=="back_water" && am.states!="finished")>
                        <div class="col-3-1 _vr_process hide">
                            <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain promo-item ${am.activityClassifyKey}"
                                 data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                                 data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                                <img src="${imgPath(data.configInfo.domain,am.activityAffiliated)}"/>
                                <div class="promo-status processing"><i class="icon-clock"></i>进行中</div>
                                <div class="shadow">
                                    <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                                    <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                                    <#if am.frontParticipateStates!='notStarted'>
                                        <#list statusKeys as key>
                                            <#if key == am.frontParticipateStates>
                                                <div class="btn-apply">
                                                    <a href="javascript:" onclick="joinPromo(this)"
                                                       class="btn-play btn-join _vr_promo_join">${status[key]}</a>
                                                </div>
                                            </#if>
                                        </#list>
                                    </#if>
                                    <a href="javascript:void(0);" class="btn-detail">
                                        <i class="icon-detail"></i>
                                        活动详细
                                    </a>
                                </div>
                                <div class="promo-detail">
                                    <div class="tit">${am.activityName}</div>
                                    <div class="content">${am.activityDescription}</div>
                                </div>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>

            <#if data.historyActivityMessage??>
                <#list data.historyActivityMessage as his>
                    <#if his.states="finished">
                        <div class="col-3-1">
                            <div id="cos_${his.id}" class="_vr_promo_check _vr_actContain promo-item <#if his.isDisplay?string('true','false')=='true'>historyActivitys</#if>"
                                 data-type="over" data-code="${his.code}" data-searchid="${his.searchId}"
                                 data-rank-id="<#if his.allRank?? && his.allRank>all<#elseif his.code=="back_water">backwater<#else >${his.rankid}</#if>">
                                <img src="${imgPath(data.configInfo.domain,his.activityAffiliated)}"/>
                                <div class="promo-status over"><i class="icon-clock"></i>已结束</div>
                                <div class="shadow">
                                    <input class="_vr_promo_ostart" type="hidden" value="${his.startTime?long?string.computer}">
                                    <input class="_vr_promo_oend" type="hidden" value="${his.endTime?long?string.computer}">
                                    <div class="btn-txt">该活动无需申请</div>
                                    <a href="javascript:void(0);" class="btn-detail">
                                        <i class="icon-detail"></i>
                                        活动详细
                                    </a>
                                </div>
                                <div class="promo-detail">
                                    <div class="tit">${his.activityName}</div>
                                    <div class="content">${his.activityDescription}</div>
                                </div>
                            </div>
                        </div>
                    </#if>
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
                        $("._vr_actContain").parent().addClass("hide");
                        $("."+val).parent().removeClass("hide");
                    }
                }
            })
        });

        // 默认配置
        layer.config({
            type: 0,
            move: ".layui-layer-title",
            title: true,
            offset: "auto",
            btnAlign: "r",
            closeBtn: "2",
            shade: [0.7, "#000"],
            shadeClose: true,
            time: 0,
            resize: false
        });
    })
</script>
</body>

</html>

