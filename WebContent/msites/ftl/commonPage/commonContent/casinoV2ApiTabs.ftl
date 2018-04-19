<!--api-nav 轮播式-->
<div  class="api-nav api-nav-slide">
    <!-- Api-tabs -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
        <#if data.siteApiTypeRelationMap??>
            <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                <div class="swiper-slide <#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>" data-slide="<#if apiMap[relationMap.apiId?string.computer]??>${apiMap[relationMap.apiId?string.computer]}</#if>">
                    <a href="javascript:" class="_vr_getGames" data-api="${relationMap.apiId?string.computer}" data-href="casino_partial.html?apiType=${apiType}&apiId=${relationMap.apiId?string.computer}">
                        <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                        <em>${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}</em>
                    </a>
                </div>
            </#list>
        </#if>
            <div class="swiper-slide">
                <a href="javascript:" class="_vr_getGames" data-api="34" data-href="casino_partial.html?apiType=5&apiId=34">
                    <span class="gui gui-logo-chess"></span>
                    <em>开元棋牌</em>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="casino.html?apiType=2&gameType=Fish">
                    <span class="gui gui-logo-fish"></span>
                    <em>捕鱼游戏</em>
                </a>
            </div>
        </div>
    </div>
    <a href="javascript:void(0);" class="swiper-contro next"></a>
    <a href="javascript:void(0);" class="swiper-contro prev"></a>
</div>
<!--api-nav 全部展开式-->
<div  class="api-nav api-nav-all">
    <!-- Api-tabs -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
        <#if data.siteApiTypeRelationMap??>
            <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                <div class="swiper-slide <#if relationMap.apiId?string.computer == data.gameSearch.apiId?default('')>active</#if>" data-slide="<#if apiMap[relationMap.apiId?string.computer]??>${apiMap[relationMap.apiId?string.computer]}</#if>">
                    <a href="javascript:" class="_vr_getGames" data-api="${relationMap.apiId?string.computer}" data-href="casino_partial.html?apiType=${apiType}&apiId=${relationMap.apiId?string.computer}">
                        <span class="gui gui-logo-<#list apiMapKeys as key><#if key == relationMap.apiId?string.computer>${apiMap[key]}</#if></#list>"></span>
                        <em>${data.siteApiTypeRelationI18n[apiType+relationMap.apiId?string.computer].name}</em>
                    </a>
                </div>
            </#list>
        </#if>
            <div class="swiper-slide">
                <a href="javascript:" class="_vr_getGames" data-api="34" data-href="casino_partial.html?apiType=5&apiId=34">
                    <span class="gui gui-logo-chess"></span>
                    <em>开元棋牌</em>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="casino.html?apiType=2&gameType=Fish">
                    <span class="gui gui-logo-fish"></span>
                    <em>捕鱼游戏</em>
                </a>
            </div>
        </div>
    </div>
    <#--<a href="javascript:void(0);" class="swiper-contro next"></a>
    <a href="javascript:void(0);" class="swiper-contro prev"></a>-->
</div>