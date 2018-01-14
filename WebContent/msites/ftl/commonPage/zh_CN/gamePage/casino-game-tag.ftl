
    <div class="g-b-content active" data-gametype="rec">
        <div class="b-g-slide">
            <div class="slide-inner">
                <ul>
                <#if data.siteGameByApiType["2"]?exists>
                    <#list data.siteGameByApiType["2"] as game>
                        <li>
                            <a href="javascript:void(0)" class="_vr_mt_check item" data-api="${game.apiId?string.computer}" data-game-name="${data.siteGameI18ns[game.gameId?string.computer].name}"
                               data-game-code="<#if data.gameMapById[game.gameId?string.computer]?has_content>${data.gameMapById[game.gameId?string.computer].code}</#if>"
                               data-game-id="${game.gameId?string.computer}">
                                <img src="<#if data.siteGameI18ns[game.gameId?string.computer]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[game.gameId?string.computer].cover)}</#if>"/>
                                <span>${data.siteGameI18ns[game.gameId?string.computer].name}</span>
                            </a>
                        </li>
                    </#list>
                </#if>
                </ul>
            </div>
            <a href="javascript:void(0);" class="prev gui gui-chevron-left"></a>
            <a href="javascript:void(0);" class="next gui gui-chevron-right"></a>
        </div>
    </div>
