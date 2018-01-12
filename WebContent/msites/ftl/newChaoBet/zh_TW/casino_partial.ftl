<!-- casino-nav -->
<#assign apiType = "2">
<!-- Casino-sorts -->
<div class="casino-sorts m-t-md">
    <ul class="nav nav-tabs _vr_tabs">
    <#list data.gameTagsOfApiType as tag>
        <#if tag_index < 7>
            <li <#if tag.key == data.gameSearch.gameTag?default('')>class="active"</#if>><a class="_vr_getGames" href="javascript:void(0)" data-href="casino_partial.html?apiType=${apiType}&gameTag=${tag.key}&apiId=${data.gameSearch.apiId?default('')}" >${tag.value}</a></li>
        </#if>
    </#list>
        <li class="<#if !data.gameSearch.gameTag?has_content>active</#if>"><a class="_vr_getGames" href="javascript:void(0)" data-href="casino_partial.html?apiType=${apiType}&apiId=${data.gameSearch.apiId?default('')}">全部遊戲</a></li>
    </ul>
    <div class="search-box header-login search">
        <input type="hidden" name="apiType" value="${apiType}"/>
        <input type="hidden" name="apiId" value="${data.gameSearch.apiId?default("")}">
        <input type="hidden" name="gameTag" value="${data.gameSearch.gameTag?default('')}"/>
        <input type="text" name="gameName" class="form-control input-sm pull-left" placeholder="請輸入遊戲名稱">
        <a href="javascript:void(0)" class="btn btn-search pull-left _vr_buttonSubmit">搜尋</a>
    </div>
</div>
<!-- game-list -->
<div class="game-list">
    <div class="row row-match _vr_casino_game _vr_mt_casino_${data.gameSearch.apiId?default('')}">
    <#if data.siteGameByApiType[apiType]?exists>
        <#list data.siteGameByApiType[apiType] as game>
            <div class="col-5-1">
                <figure class="game-item" data_id="001">
                    <a class="_vr_mt_check item" data-api="${game.apiId?string.computer}" data-game-name="${data.siteGameI18ns[game.gameId?string.computer].name}" data-game-code="<#if data.gameMapById[game.gameId?string.computer]?has_content>${data.gameMapById[game.gameId?string.computer].code}</#if>" href="javascript:void(0)"
                       startTime="<#if data.gameMapById[game.gameId?string.computer].maintainStartTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainStartTime?long?string.computer}</#if>"
                       endTime="<#if data.gameMapById[game.gameId?string.computer].maintainEndTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainEndTime?long?string.computer}</#if>">
                        <div class="game-img"><img src="<#if data.siteGameI18ns[game.gameId?string.computer]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[game.gameId?string.computer].cover)}</#if>"/></div>
                        <div class="cover">
                            <div class="cover-bg"></div>
                            <div class="cover-name">${data.siteGameI18ns[game.gameId?string.computer].name}</div>
                        </div>
                    </a>
                    <figcaption class="title">
                        <a href="javascript:">${data.siteGameI18ns[game.gameId?string.computer].name}</a>
                        <a class="_vr_mt_check _vr_mt_slogan btn-play" data-api="${game.apiId?string.computer}" data-game-name="${data.siteGameI18ns[game.gameId?string.computer].name}" data-game-code="<#if data.gameMapById[game.gameId?string.computer]?has_content>${data.gameMapById[game.gameId?string.computer].code}</#if>" href="javascript:void(0)"
                           startTime="<#if data.gameMapById[game.gameId?string.computer].maintainStartTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainStartTime?long?string.computer}</#if>"
                           endTime="<#if data.gameMapById[game.gameId?string.computer].maintainEndTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainEndTime?long?string.computer}</#if>">開始遊戲</a>
                    </figcaption>
                </figure>
            </div>
        </#list>
    <#else>
        <div class="col-1-1" style="text-align: center;line-height: 251px"><span class="text-center text-warning">暫無內容！</span></div>
    </#if>
    </div>
    <!-- Pagination -->
    <div class="row">
        <div class="col-3-1 col-offset-3-1 text-center m-b-md"><a class="btn-more more_click_game" href="javascript:void(0)" data-firstPageNumber="<#if data.pagingMap[apiType]?? && data.pagingMap[apiType].pageNumber??>${data.pagingMap[apiType].pageNumber}</#if>" data-lastPageNumber="<#if data.pagingMap[apiType]?? && data.pagingMap[apiType].pageNumber??>${data.pagingMap[apiType].lastPageNumber}</#if>">更多遊戲</a></div>
    </div>
</div>