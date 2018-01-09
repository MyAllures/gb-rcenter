<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/en_US/msiteCommonContent/commonApiTabs.ftl">-->
    <div class="carousel-inner">
        <ul class="row item api-tabs casino-tabs active">
        <#if data.siteApiTypeRelationMap??>
            <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                <#if relationMap_index<apiNumPerSlide>
                    <li class="col-${apiNumPerSlide}-1 <#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>">
                        <a href="javascript:" class="_vr_getGames" data-api="${relationMap.apiId?string.computer}" data-href="casino_partial.html?apiType=${apiType}&apiId=${relationMap.apiId?string.computer}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>">
                            <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                            <em>${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}</em>
                        </a>
                    </li>
                </#if>
            </#list>
        </#if>
        </ul>
        <ul class="row item api-tabs casino-tabs">
        <#if data.siteApiTypeRelationMap??>
            <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                <#if (relationMap_index>=apiNumPerSlide&&relationMap_index<(apiNumPerSlide*2))>
                    <li class="col-${apiNumPerSlide}-1 <#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>">
                        <a href="javascript:" class="_vr_getGames" data-api="${relationMap.apiId?string.computer}" data-href="casino_partial.html?apiType=${apiType}&apiId=${relationMap.apiId?string.computer}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>">
                            <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                            <em>${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}</em>
                        </a>
                    </li>
                </#if>
            </#list>
        </#if>
        </ul>
        <#if (data.siteApiTypeRelationMap[apiType]?size>10&&apiNumPerSlide==5)||(data.siteApiTypeRelationMap[apiType]?size>12&&apiNumPerSlide==6)>
            <ul class="row item api-tabs casino-tabs">
                <#if data.siteApiTypeRelationMap??>
                    <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                        <#if (relationMap_index>=(apiNumPerSlide*2))>
                            <li class="col-${apiNumPerSlide}-1 <#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>">
                                <a href="javascript:" class="_vr_getGames" data-api="${relationMap.apiId?string.computer}" data-href="casino_partial.html?apiType=${apiType}&apiId=${relationMap.apiId?string.computer}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>">
                                    <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                                    <em>${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}</em>
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
