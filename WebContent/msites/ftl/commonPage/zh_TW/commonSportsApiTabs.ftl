<div class="carousel-inner">
    <ul class="row item api-tabs sports-tabs active">
        <#assign api_index = 0/>
    <#if data.siteApiTypeRelationMap??>
        <#list data.siteApiTypeRelationMap["3"] as relationMap>
            <#if (api_index<apiNumPerSlide)&&relationMap.apiId?string.computer!="10">
                <li class="col-${apiNumPerSlide}-1 <#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>">
                    <a href="javascript:void(0)" class="_vr_mt_check lottery_btn_${relationMap.apiId?string.computer}"
                       data-api="${relationMap.apiId?string.computer}" data-apitype="3"
                       <#if relationMap.apiId?string.computer!="10">data-href="sports.html?apiId=${relationMap.apiId?string.computer}"</#if>
                       <#if data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                       <#if data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                        <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                        <em>${data.siteApiTypeRelationI18n["3"+relationMap.apiId?string.computer].name}</em>
                    </a>
                </li>
                <#assign api_index = api_index+1/>
            </#if>
        </#list>
    </#if>
    </ul>
</div>
<a class="carousel-control left" href="#api-tabs" data-slide="prev">Previous</a>
<a class="carousel-control right" href="#api-tabs" data-slide="next">Next</a>
