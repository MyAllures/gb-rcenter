<#include "../../casinoCss/casinoV2Css.ftl"><#--新版电子页面需要引用的样式-->
<!--游戏内页左侧内容-->
<div class="game_side">
    <div class="icon-hide-side"></div>
    <div class="g-s-logo">
        <img src="${data.configInfo.ftlRootPath}commonPage/images/app_logo/app_logo_${data.siteInfo.siteId}.png"/>
    </div>
    <div class="g-s-banner">
        <img src="${data.configInfo.ftlRootPath}commonPage/themes/casino/images/side-banner.jpg"/>
    </div>
    <div class="g-s-api-tab">
        <a href="javascript:" class="active" data-api="i-casino"><span class="icon i-casino "></span><span class="txt">電子</span></a>
        <a href="javascript:" data-api="i-fish"><span class="icon i-fish"></span><span class="txt">釣り</span></a>
        <a href="javascript:" data-api="i-live"><span class="icon i-live"></span><span class="txt">本当の人々</span></a>
        <a href="javascript:" data-api="i-sports"><span class="icon i-sports"></span><span class="txt">スポーツ</span></a>
        <a href="javascript:" data-api="i-lottery"><span class="icon i-lottery"></span><span class="txt">宝くじチケット</span></a>
    </div>
    <div class="g-s-api-content" data-api="i-fish">
    <#assign FishGames=[{'id':'280001','api':'28'},{'id':'280002','api':'28'},{'id':'280003','api':'28'},{'id':'100380','api':'10'},{'id':'100382','api':'10'},{'id':'350001','api':'35'},{'id':'310177','api':'31'},{'id':'90013','api':'9'},{'id':'60368','api':'6'}]>
        <ul class="list-unstyled">
        <#list FishGames as game>
            <#if data.siteGameI18ns[game.id]?? && data.gameMapById[game.id]??>
                <li>
                    <a class="_game_open" href="javascript:void(0);"
                       <#if data.gameMapById[game.id].gameLine?? && data.gameMapById[game.id].gameLine?c?number &gt; 0>data-game-line="${data.gameMapById[game.id].gameLine?string.computer}"</#if> data-game-score="<#if data.gameMapById[game.id].gameScore??>${data.gameMapById[game.id].gameScore?string.computer}</#if>"
                       data-api="${game.api}" data-game-name="<#if data.siteGameI18ns[game.id].name??></#if>${data.siteGameI18ns[game.id].name}"
                        <#if data.siteGameI18ns[game.id].introduceStatus?has_content && data.siteGameI18ns[game.id].introduceStatus=="normal" && data.siteGameI18ns[game.id].gameIntroduce?has_content>
                       data-game-introduce="${data.siteGameI18ns[game.id].gameIntroduce}"
                        </#if>
                       data-game-code="<#if data.gameMapById[game.id].code??>${data.gameMapById[game.id].code}</#if>"
                       data-game-id="${game.id}" data-apitype="2"
                       data-game-img="<#if data.siteGameI18ns[game.id]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[game.id].cover)}</#if>"
                       data-api-name="<#if data.siteApiTypeRelationI18n["2"+game.api]??>${data.siteApiTypeRelationI18n["2"+game.api].name}"</#if>
                       data-api-name-abb="<#list apiMapKeys as key><#if key == game.api>${apiMap[key]}</#if></#list>"
                       startTime="<#if data.gameMapById[game.id]?has_content && data.gameMapById[game.id].maintainStartTime?has_content>${data.gameMapById[game.id].maintainStartTime?long?string.computer}</#if>"
                       endTime="<#if data.gameMapById[game.id]?has_content && data.gameMapById[game.id].maintainEndTime?has_content>${data.gameMapById[game.id].maintainEndTime?long?string.computer}</#if>">
                            <span class="icon icon-fish"><img
                                    src="<#if data.siteGameI18ns[game.id]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[game.id].cover)}</#if>"></span>
                        <span class="txt">${data.siteGameI18ns[game.id].name}</span>
                    </a>
                </li>
            </#if>
        </#list>
        </ul>
    </div>
<#list data.siteApiTypeI18n?keys as apiTypeId>
    <div class="g-s-api-content <#if apiTypeId == "2">active</#if>"
         data-api="i-<#if apiRelByType[apiTypeId]??>${apiRelByType[apiTypeId]}</#if>">
        <ul class="list-unstyled">
            <#if data.siteApiTypeRelationMap['${apiTypeId}']??>
                <#list data.siteApiTypeRelationMap['${apiTypeId}'] as relationMap>
                    <#if apiTypeId!="3" || relationMap.apiId?string.computer!="10">
                        <li>
                            <a class="_vr_mt_check"
                               data-api="${relationMap.apiId?string.computer}" href="javascript:void(0)"
                               data-apitype="${apiTypeId}"
                                <#if apiTypeId=='2'>
                               data-href="/casino.html?apiType=2&apiId=${relationMap.apiId?string.computer}"
                                <#elseif apiTypeId=='3' && relationMap.apiId?string.computer!="10">
                               data-href="/sports.html?apiId=${relationMap.apiId?string.computer}"
                               data-sports="sports"
                                </#if>
                               <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>startTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainStartTime?long?string.computer}"</#if>
                               <#if data.siteApiMap[relationMap.apiId?string.computer]?? && data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?has_content>endTime="${data.siteApiMap[relationMap.apiId?string.computer].maintainEndTime?long?string.computer}"</#if>>
                                <span class="icon c-<#list apiMapKeys as key><#if relationMap.apiId?string.computer==key && apiMap[key]??>${apiMap[key]}</#if></#list>"></span>
                                <span class="txt">${data.siteApiTypeRelationI18n['${apiTypeId}'+relationMap.apiId?string.computer].name}</span>
                            </a>
                        </li>
                    </#if>
                </#list>
                <#if apiTypeId=="2">
                    <li>
                        <a class="_vr_mt_check" data-api="34" href="/casino.html?apiType=2&amp;apiId=34" data-apitype="5" data-href="/casino.html?apiType=5&amp;apiId=34">
                            <span class="icon c-ky"></span>
                            <span class="txt">カイユンチェス</span>
                        </a>
                    </li>
                </#if>
            </#if>
        </ul>
    </div>
</#list>
</div>
<!--游戏内页底部tag-->
<div class="game_bottom">
    <div class="small-bar">
        <div class="pull-left">
            <div class="icon-arrow-down"></div>
            <ul class="list-inline">
                <li><a href="javascript:" data-api="" onclick="myCollectList(this)"><span class="z1"><span class="icon i-fav"></span>私のコレクション</span></a></a></li>
                <li><a href="javascript:" data-api="" onclick="myRecentlyList(this)" data-gametype="rec"><span class="z1"><span class="icon i-rec"></span>最近再生された</span></a></li>
                <li><a href="javascript:" data-api="" onclick="gameTagList(this)" data-tag="hot_game"><span class="z1"><span class="icon i-hot"></span>ホットゲーム</span></a></a></li>
                <li><a href="javascript:" data-api="" onclick="gameTagList(this)" data-tag="${data.gameSearch.gameTag?default('')}"><span class="z1"><span class="icon i-sam"></span>類似のゲーム</span></a></a></li>
            </ul>
        </div>
        <div class="pull-right">
            <div class="search-box header-login _vr_gameSearch">
                <span class="gui gui-search"></span>
                <input type="hidden" name="apiId" value="">
                <input type="hidden" name="gameTag" value=""/>
                <input type="text" name="gameName" class="form-control input-sm pull-left" placeholder="ゲーム名を入力してください">
                <a href="javascript:void(0)" class="btn btn-search pull-left _vr_gameSubmit"> 検&nbsp;&nbsp;索</a>
            </div>
        </div>
    </div>
    <div class="_vr_casino-game-tag hide">
    <#include "casino-game-tag.ftl">
    </div>
    <div class="_vr_gameNoContent hide">
        <div class="col-1-1" style="text-align: center;line-height: 140px"><span class="text-center text-warning h5">暂无内容！</span></div>
    </div>
</div>
<!--游戏详情页-->
<div class="game-detail">
    <div class="body">
        <a href="javascript:void(0);" title="退出全屏" class="exit-fullscreen" onclick="exitFullscreen();"></a>
        <a href="javascritp:" class="closeCasinoGame"></a>
        <!-- Panel -->
        <div class="header-panel game-panel _vr_loginSuccess" style="display: none">
        <#include "../msiteCommonContent/loginSuccess.ftl">
        </div>

        <div class="wrapper" data-width="16" data-height="9">
            <iframe id="box_playGameDemo_iframe" width="100%" height="100%" scrolling="no" frameborder="0" allowtransparency="true" src=""></iframe>

            <div class="game-info">
                <div class="hide-btn"></div>
                <div class="game-info-content">
                    <div class="info-header">
                        <img class="apiImg" src=""/>
                        <div class="info-api-name"></div>
                    </div>
                    <div class="game-item">
                        <div class="tags"><!--标签-->

                        </div>
                        <img src="images/casino/game-deom.jpg"/>
                        <div class="game-item-tit">
                            <div class="g_line1">
                                <a class="g_title"></a>
                                <div class="g_tx hidden"></div>
                            </div>
                        </div>
                    </div>
                    <div class="game-extra-info">
                        <div class="extra-item">
                                        <span class="icon">
                                            <a class="fav_a" data-api="" data-game-id="" data-game-collect="false"
                                               onclick="gameCollect(this)"></a>
                                        </span>
                            <span class="txt">添加收藏</span>
                        </div>
                        <div class="extra-item">
                                        <span class="icon">
                                            <div id="star" class="star">

                                            </div>
                                        </span>
                            <span class="txt">評価<span class="gameScore" data-score=""></span></span>
                        </div>
                        <div class="extra-item">
                                        <span class="icon">
                                            <a href="javascript:" onclick="gameFullScreen();" class="full_screen"></a>
                                        </span>
                            <span class="txt">フルスクリーンゲーム</span>
                        </div>
                        <div class="extra-item hidden">
                                        <span class="icon">
                                            <a href="javascript:" class="icon-info"></a>
                                        </span>
                            <span class="txt gameDetail">ゲーム紹介</span>
                        </div>

                    </div>
                </div>
                <div class="time _user_time"></div>
            </div>
        </div>
    </div>
</div>
<script src="${data.configInfo.ftlRootPath}commonPage/js/layer.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery.raty.js"></script>
<#--内容模板需要用到的js-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/jsrender/jsrender.js"></script>
<#--我的收藏内容模板-->
<script id="casinoGameTag" type="text/x-jsrender">
    <div class="g-b-content active" data-gametype="rec">
        <div class="b-g-slide">
            <div class="slide-inner">
                <ul>
                {{for data}}
                    <li>
                        <a href="javascript:void(0);"
                           class="btn-enter _game_open" data-api="{{:apiId}}" data-game-name="{{:name}}"
                           data-game-code="{{:code}}"
                           data-game-img="{{:cover}}" data-game-line="{{:gameLine}}" data-game-score="{{:gameScore}}"
                           data-game-id="{{:id}}" data-apitype="{{:apiTypeId}}"
                           startTime="{{:maintainStartTime}}" endTime="{{:maintainEndTime}}">
                           <img src="/fserver/files/{{:cover}}"/>
                        <span>{{:name}}</span>
                        </a>
                    </li>
                {{/for}}
                </ul>
            </div>
            <a href="javascript:void(0);" class="prev gui gui-chevron-left"></a>
            <a href="javascript:void(0);" class="next gui gui-chevron-right"></a>
        </div>
    </div>
</script>
<#include "../msiteCommonScript/gamePageScript.ftl">
