<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/en_US/msiteCommonContent/commonLotteryApiTabs.ftl">-->
<div class="carousel-inner">
    <ul class="row item api-tabs lottery-tabs active">
    <#if data.siteApiTypeRelationMap??>
        <#list data.siteApiTypeRelationMap["4"] as relationMap>
            <#if relationMap_index<apiNumPerSlide>
                <li class="col-${apiNumPerSlide}-1 lottery-click <#if relationMap_index == 0>active</#if>"  data-api="${relationMap.apiId?string.computer}">
                    <a class="_vr_mt_check _vr_mt_no" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-mt-ic="_vr_mt_lottery_${relationMap.apiId?string.computer}"
                       <#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                        <span class="gui gui-logo-<#if relationMap.apiId?string.computer=="22"&&yztLottery??>yzt<#else><#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list></#if>"></span>
                        <em><#if yztLottery??&&relationMap.apiId?string.computer=="22">一指通彩票<#else>${data.siteApiTypeRelationI18n["4"+relationMap.apiId?string.computer].name}</#if></em>
                    </a>
                </li>
            </#if>
        </#list>
    </#if>
    </ul>
<#--<ul class="row item api-tabs  lottery-tabs">
<#if data.siteApiTypeRelationMap??>
    <#list data.siteApiTypeRelationMap["4"] as relationMap>
        <#if (relationMap_index>=apiNumPerSlide&&relationMap_index<(apiNumPerSlide*2))>
            <li class="col-${apiNumPerSlide}-1 lottery-click <#if relationMap_index == 0>active</#if>"  data-api="${relationMap.apiId?string.computer}">
                <a class="_vr_mt_check _vr_mt_no" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-mt-ic="_vr_mt_lottery_${relationMap.apiId?string.computer}"
                   <#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                   <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                    <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                    <em>${data.siteApiTypeRelationI18n["4"+relationMap.apiId?string.computer].name}</em>
                </a>
            </li>
        </#if>
    </#list>
</#if>
</ul>-->
<#if (data.siteApiTypeRelationMap["4"]?size>10&&apiNumPerSlide==5)||(data.siteApiTypeRelationMap["4"]?size>12&&apiNumPerSlide==6)>
    <ul class="row item api-tabs  lottery-tabs">
        <#if data.siteApiTypeRelationMap??>
            <#list data.siteApiTypeRelationMap["4"] as relationMap>
                <#if (relationMap_index>=(apiNumPerSlide*2))>
                    <li class="col-${apiNumPerSlide}-1 lottery-click <#if relationMap_index == 0>active</#if>"  data-api="${relationMap.apiId?string.computer}">
                        <a class="_vr_mt_check _vr_mt_no" href="javascript:void(0)" data-api="${relationMap.apiId?string.computer}" data-mt-ic="_vr_mt_lottery_${relationMap.apiId?string.computer}"
                           <#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                           <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                            <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                            <em>${data.siteApiTypeRelationI18n["4"+relationMap.apiId?string.computer].name}</em>
                        </a>
                    </li>
                </#if>
            </#list>
        </#if>
    </ul>
</#if>
</div>
<a class="carousel-control left" href="#api-tabs" data-slide="prev">Previous</a>
<a class="carousel-control right" href="#api-tabs" data-slide="next">Next</a>
