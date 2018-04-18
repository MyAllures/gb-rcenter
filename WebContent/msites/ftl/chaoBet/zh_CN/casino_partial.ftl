<!-- casino-nav -->
<#assign apiType = "${data.gameSearch.apiType?default('')}">
<!-- Casino-sorts -->
<div class="casino-sorts">
    <div class="toggle-api a-all">
        <div class="txt1">显示全部</div>
        <div class="txt2">显示轮播</div>
    </div>
    <ul class="nav nav-tabs _vr_tabs">
    <#if data.tagMaps?has_content && data.gameSearch.gameType?default('')!="Fish">
        <#list data.tagMaps["tags"] as tag>
            <#if tag_index < 7>
                <li <#if tag.key == data.gameSearch.gameTag?default('')>class="active"</#if>><a class="_vr_getGames" data-api="${data.gameSearch.apiId?default('')}" href="javascript:void(0)" data-href="casino_partial.html?apiType=${apiType}&gameTag=${tag.key}&apiId=${data.gameSearch.apiId?default('')}" >${tag.value}</a></li>
            </#if>
        </#list>
    </#if>
        <#if data.gameSearch.gameType?default('')=="Fish">
            <li class="<#if !data.gameSearch.gameTag?has_content>active</#if>"><a href="casino.html?apiType=2&gameType=Fish"  data-api="${data.gameSearch.apiId?default('')}">全部游戏</a></li>
        <#else>
            <li class="<#if !data.gameSearch.gameTag?has_content>active</#if>"><a class="_vr_getGames"  data-api="${data.gameSearch.apiId?default('')}" href="javascript:void(0)" data-href="casino_partial.html?apiType=${apiType}&apiId=${data.gameSearch.apiId?default('')}">全部游戏</a></li>
        </#if>
    </ul>
    <div class="search-box header-login search">
        <span class="gui gui-search"></span>
        <input type="hidden" name="apiType" value="${apiType}"/>
        <input type="hidden" name="gameType" value="${data.gameSearch.gameType?default('')}"/>
        <input type="hidden" name="apiId" value="${data.gameSearch.apiId?default("")}">
        <input type="hidden" name="gameTag" value="${data.gameSearch.gameTag?default('')}"/>
        <input type="text" name="gameName" class="form-control input-sm pull-left" placeholder="请输入游戏名称">
        <a href="javascript:void(0)" class="btn btn-search pull-left _vr_buttonSubmit">搜索</a>
    </div>
</div>
<!--game-list-header-->
<div class="game-list-header">
    <#if data.gameSearch.apiId=="3" || data.gameSearch.apiId=="6">
        <div class="pull-left">
            <div class="jackpot">
                <div class="j_txt pull-left">
                    <#if apiType?has_content && data.gameSearch.apiId?has_content>
                        <div class="t_rmb">RMB</div>
                        <div class="t_g_name"><span>${data.siteApiTypeRelationI18n[apiType+data.gameSearch.apiId?default('')].name}</span>总彩池</div>
                    </#if>
                </div>
                <#if data.siteApiTypeRelationMap??>
                    <#list data.siteApiTypeRelationMap["2"] as relationMap>
                        <div class="pull-left hide" id="jackpot_${relationMap.apiId?string.computer}" data-jackpot="25682425" data-api-id="${relationMap.apiId?string.computer}">
                        </div>
                    </#list>
                </#if>
                <div class="pull-left hide" id="jackpot_34" data-jackpot="25682425" data-api-id="34"></div>
            </div>
        </div>
    </#if>

    <div class="pull-right">
        <div class="all_g_txt pull-left">总共<span>${data.gameCount}</span>个电子游戏</div>
        <ul class="sort2 list-inline pull-left ">
            <li <#if data.gameSearch.maxTag?default('')=="maxView">class="active"</#if>><a href="javascript:" data-href="casino_partial.html?apiType=2&apiId=${data.gameSearch.apiId}&maxTag=maxView" onclick="maxGameTag(this);">最受欢迎</a></li>
            <#--<li <#if data.gameSearch.maxTag?default('')=="maxLine">class="active"</#if>><a href="javascript:" data-href="casino_partial.html?apiType=2&apiId=${data.gameSearch.apiId}&maxTag=maxLine" onclick="maxGameTag(this);">最多游戏线</a></li>-->
            <li <#if data.gameSearch.maxTag?default('')=="maxCollect">class="active"</#if>><a href="javascript:" data-href="casino_partial.html?apiType=2&apiId=${data.gameSearch.apiId}&maxTag=maxCollect" onclick="maxGameTag(this);">最多收藏</a></li>
            <li <#if data.gameSearch.maxTag?default('')=="maxScore">class="active"</#if>><a href="javascript:" data-href="casino_partial.html?apiType=2&apiId=${data.gameSearch.apiId}&maxTag=maxScore" onclick="maxGameTag(this);">最高评分</a></li>
            <#--<li <#if data.gameSearch.maxTag?default('')=="maxRtp">class="active"</#if>><a href="javascript:" data-href="casino_partial.html?apiType=2&apiId=${data.gameSearch.apiId}&maxTag=maxRtp" onclick="maxGameTag(this);">最高赔付</a></li>-->
        </ul>
    </div>
</div>

<!-- game-list -->
<div class="game-list">
    <div class="casino-game-list row _vr_casino_game _vr_mt_casino_${data.gameSearch.apiId?default('')}">
        <#if data.siteGameByApiType[apiType]?exists>
            <#list data.siteGameByApiType[apiType] as game>
                <div class="col-5-1">
                    <div class="game-item s_border">
                        <div class="tags"><!--标签-->
                            <#--<a href="javascript:" class="tag-fav"></a>-->
                            <#if game.tagsList??>
                                <#list game.tagsList as tags>
                                    <#if tags?? && tags=="hot_game">
                                        <a href="javascript:void(0);" class="tag-hot"></a>
                                    <#elseif tags?? && tags=="New game">
                                        <a href="javascript:void(0);" class="tag-new"></a>
                                    <#elseif tags?? && tags=="3d">
                                        <a href="javascript:" class="tag-3d"></a>
                                    <#elseif tags?? && tags=="mobile">
                                        <a href="javascript:" class="tag-mobile"></a>
                                    </#if>
                                </#list>
                            </#if>
                        </div>
                        <figure class="imghvr-fade"> <!--图片区域-->
                            <#if data.siteGameI18ns[game.gameId?string.computer].introduceStatus?has_content && data.siteGameI18ns[game.gameId?string.computer].introduceStatus?string=="normal" && data.siteGameI18ns[game.gameId?string.computer].gameIntroduce?has_content>
                                <a href="<#if data.siteGameI18ns[game.gameId?string.computer].gameIntroduce?has_content>${data.siteGameI18ns[game.gameId?string.computer].gameIntroduce}<#else>javascript:</#if>" class="tag-info"></a>
                            </#if>
                            <#if data.gameSearch.apiId=="3" || data.gameSearch.apiId=="6">
                                <span class="jiangchi">￥<span class="jianchi_num" data-speed="1" data-game-id="${game.gameId?string.computer}"></span></span>
                            </#if>
                            <img src="<#if data.siteGameI18ns[game.gameId?string.computer]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[game.gameId?string.computer].cover)}</#if>">
                            <figcaption>
                                <div class="table_div">
                                    <div class="table_cell_div">
                                        <a xxid="${game.gameId?string.computer}" href="javascript:void(0);"
                                           data-game-img="${game.cover?default('')}" <#if game.gameLine?c?number &gt; 0>data-game-line="${game.gameLine?string.computer}"</#if> data-game-score="${game.gameScore?string.computer}"
                                           class="btn-enter _game_open" data-api="${game.apiId?string.computer}" data-game-name="${data.siteGameI18ns[game.gameId?string.computer].name}"
                                            <#if data.siteGameI18ns[game.gameId?string.computer].introduceStatus?has_content && data.siteGameI18ns[game.gameId?string.computer].introduceStatus?string=="normal" && data.siteGameI18ns[game.gameId?string.computer].gameIntroduce?has_content>
                                           data-game-introduce="${data.siteGameI18ns[game.gameId?string.computer].gameIntroduce}"
                                            </#if>
                                           data-game-code="<#if data.gameMapById[game.gameId?string.computer]?has_content>${data.gameMapById[game.gameId?string.computer].code}</#if>"
                                           data-game-id="${game.gameId?string.computer}" data-apitype="${apiType}"
                                           startTime="<#if data.gameMapById[game.gameId?string.computer].maintainStartTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainStartTime?long?string.computer}</#if>"
                                           endTime="<#if data.gameMapById[game.gameId?string.computer].maintainEndTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainEndTime?long?string.computer}</#if>">开始游戏</a>

                                        <#if game.canTry?has_content>
                                            <a href="javascript:void(0);"
                                               data-game-img="${game.cover?default('')}" <#if game.gameLine?c?number &gt; 0>data-game-line="${game.gameLine?string.computer}"</#if> data-game-score="${game.gameScore?string.computer}"
                                               class="_game_open game-demo btn-try" data-api="${game.apiId?string.computer}" data-game-name="${data.siteGameI18ns[game.gameId?string.computer].name}"
                                                <#if data.siteGameI18ns[game.gameId?string.computer].introduceStatus?has_content && data.siteGameI18ns[game.gameId?string.computer].introduceStatus?string=="normal" && data.siteGameI18ns[game.gameId?string.computer].gameIntroduce?has_content>
                                               data-game-introduce="${data.siteGameI18ns[game.gameId?string.computer].gameIntroduce}"
                                                </#if>
                                               data-game-code="<#if data.gameMapById[game.gameId?string.computer]?has_content>${data.gameMapById[game.gameId?string.computer].code}</#if>"
                                               data-game-id="${game.gameId?string.computer}" data-apitype="${apiType}"
                                               startTime="<#if data.gameMapById[game.gameId?string.computer].maintainStartTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainStartTime?long?string.computer}</#if>"
                                               endTime="<#if data.gameMapById[game.gameId?string.computer].maintainEndTime?has_content>${data.gameMapById[game.gameId?string.computer].maintainEndTime?long?string.computer}</#if>">试玩</a>
                                        </#if>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                        <div class="game-info"><!--游戏信息区域-->
                            <div class="g_line1">
                                <a href="javascript:void(0);" class="g_title gameOpen">${data.siteGameI18ns[game.gameId?string.computer].name}</a>
                                <#--<#if game.gameLine?c?number &gt; 0>
                                    <div class="g_tx">${game.gameLine}条线</div>
                                </#if>-->
                            </div>
                            <div class="g_line2">
                                <div class="pull-left fav_n">收藏<span>${game.gameCollectNumber}</span></div> <!--未收藏去除fav_ed-->
                                <div class="pull-right pf">评分<span>${game.gameScore}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </#list>
        <#else>
            <div class="g_no_result">没有找到符合的游戏</div>
        </#if>
    </div>
    <!-- Pagination -->
    <div class="row">
        <div class="col-3-1 col-offset-3-1 text-center m-b-md">
            <div class="g_loading"><span class="gui gui-spinner gui-spin"></span>正在加载...</div>
            <div class="g_all_game_loaded">全部游戏加载完成</div>
            <input id="game-page" type="hidden" data-firstPageNumber="<#if data.pagingMap[apiType]?? && data.pagingMap[apiType].pageNumber??>${data.pagingMap[apiType].pageNumber}</#if>" data-lastPageNumber="<#if data.pagingMap[apiType]?? && data.pagingMap[apiType].pageNumber??>${data.pagingMap[apiType].lastPageNumber}</#if>">
        </div>
    </div>
</div>