
    <div class="g-b-content active">
        <div class="b-g-slide">
            <div class="slide-inner">
                <ul>
                <#if data.siteGameByApiType["${data.gameSearch.apiType?default('')}"]?exists>
                    <#list data.siteGameByApiType["${data.gameSearch.apiType?default('')}"] as game>
                        <li>
                            <a href="javascript:void(0);"
                               class="btn-enter _game_open" data-api="${game.apiId?string.computer}" data-game-name="${data.siteGameI18ns[game.gameId?string.computer].name}"
                               data-game-img="${game.cover?default('')}" <#if game.gameLine?c?number &gt; 0>data-game-line="${game.gameLine?string.computer}"</#if> data-game-score="${game.gameScore?string.computer}"
                                <#if data.siteGameI18ns[game.gameId?string.computer].introduceStatus?has_content && data.siteGameI18ns[game.gameId?string.computer].introduceStatus?string=="normal" && data.siteGameI18ns[game.gameId?string.computer].gameIntroduce?has_content>
                               data-game-introduce="${data.siteGameI18ns[game.gameId?string.computer].gameIntroduce}"
                                </#if>
                               data-game-code="<#if data.gameMapById[game.gameId?string.computer]?has_content>${data.gameMapById[game.gameId?string.computer].code}</#if>"
                               data-game-id="${game.gameId?string.computer}" data-apitype="${data.gameSearch.apiType?default('')}"
                               startTime="<#if data.gameMapById[game.gameId?string.computer].maintainStartTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainStartTime?long?string.computer}</#if>"
                               endTime="<#if data.gameMapById[game.gameId?string.computer].maintainEndTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainEndTime?long?string.computer}</#if>">
                                <img src="<#if data.siteGameI18ns[game.gameId?string.computer]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[game.gameId?string.computer].cover)}</#if>"/>
                                <span>${data.siteGameI18ns[game.gameId?string.computer].name}</span>
                            </a>
                        </li>
                    </#list>
                <#else>
                    <div class="col-1-1" style="text-align: center;line-height: 140px"><span class="text-center text-warning h5">暂无内容！</span></div>
                </#if>
                </ul>
            </div>
            <a href="javascript:void(0);" class="prev gui gui-chevron-left"></a>
            <a href="javascript:void(0);" class="next gui gui-chevron-right"></a>
        </div>
    </div>

