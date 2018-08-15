<!--api-nav 轮播式-->
<div  class="api-nav api-nav-slide">
    <!-- Api-tabs -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <#if data.siteApiTypeRelationMap??>
                <#list data.siteApiTypeRelationMap[apiType] as relationMap>
                    <#assign apiId = relationMap.apiId?string.computer>
                    <#if apiId!="28">
                        <div class="swiper-slide <#if apiId == data.gameSearch.apiId?default('')>active</#if>" data-slide="<#if apiMap[apiId]??>${apiMap[apiId]}</#if>">
                            <a href="javascript:" class="_vr_getGames" data-api="${apiId}" data-href="casino_partial.html?apiType=${apiType}&apiId=${apiId}&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list>">
                                <span class="gui gui-logo-<#list apiMapKeys as key><#if key == apiId>${apiMap[key]}</#if></#list>"></span>
                                <em>${data.siteApiTypeRelationI18n[apiType+apiId].name}</em>
                            </a>
                        </div>
                    </#if>
                </#list>

                <#--棋牌-->
                <#list data.siteApiTypeRelationMap[apiTypeChess] as chessMap>
                    <#assign apiId = chessMap.apiId?string.computer>
                    <div class="swiper-slide">
                        <a href="javascript:" class="_vr_getGames" data-api="${apiId}" data-href="casino_partial.html?apiType=${apiTypeChess}&apiId=${apiId}">
                            <span class="gui gui-logo-${apiMap["${apiId}"]}"></span>
                            <em>${data.siteApiTypeRelationI18n[apiTypeChess+apiId].name}</em>
                        </a>
                    </div>
                </#list>
            </#if>
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
                    <#assign apiId = relationMap.apiId?string.computer>
                    <#if apiId!="28">
                        <div class="swiper-slide <#if apiId == data.gameSearch.apiId?default('')>active</#if>" data-slide="<#if apiMap[apiId]??>${apiMap[apiId]}</#if>">
                            <a href="javascript:" class="_vr_getGames" data-api="${apiId}" data-href="casino_partial.html?apiType=${apiType}&apiId=${apiId}<#if apiId!="39">&gameTag=<#list data.gameTagsOfApiType as tag><#if tag_index == 0>${tag.key}</#if></#list></#if>">
                                <span class="gui gui-logo-<#list apiMapKeys as key><#if key == apiId>${apiMap[key]}</#if></#list>"></span>
                                <em>${data.siteApiTypeRelationI18n[apiType+apiId].name}</em>
                            </a>
                        </div>
                    </#if>
                </#list>

            <#--棋牌-->
                <#list data.siteApiTypeRelationMap[apiTypeChess] as chessMap>
                    <#assign apiId = chessMap.apiId?string.computer>
                    <div class="swiper-slide">
                        <a href="javascript:" class="_vr_getGames" data-api="${apiId}" data-href="casino_partial.html?apiType=${apiTypeChess}&apiId=${apiId}">
                            <span class="gui gui-logo-${apiMap["${apiId}"]}"></span>
                            <em>${data.siteApiTypeRelationI18n[apiTypeChess+apiId].name}</em>
                        </a>
                    </div>
                </#list>
            </#if>
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