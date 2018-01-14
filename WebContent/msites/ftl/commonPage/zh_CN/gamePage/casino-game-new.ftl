<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "game.include.head.ftl">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/casino/casino.css">
    <link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/casino/jquery.raty.css">
</head>

<body>
<!-- Static Bar -->
<#include "/${data.configInfo.templateName}/zh_CN/gamePage/gameTop.ftl">
<!-- Casino Game Overlay -->
<main>
<div class="CasinoGameOverlay" style="background-image:url(${data.configInfo.skinPath}/images/mg-bg.jpg)">
    <div class="GameBody">
        <div class="GameContainer" data-width="16" data-height="9">
            <iframe id="box_playGameDemo_iframe" scrolling="no" frameborder="0" allowtransparency="true" src="" > </iframe>

            <#if data.siteGameByApiType["2"]?exists>
                <#list data.siteGameByApiType["2"] as game>
                    <div class="game-info">
                        <div class="hide-btn"></div>
                        <div class="game-info-content">
                            <div class="info-header">
                                <img src="${data.configInfo.ftlRootPath}commonPage/themes/casino/images/bsg.png"/>
                                <div class="info-api-name">${data.siteGameI18ns[game.gameId?string.computer].name}</div>
                              <#--  <div class="info-btn-group">
                                    <a href="javascript:" class="try pull-left">免费试玩</a>
                                    <a href="javascript:" class="btn-register pull-right">立即注册</a>
                                </div>-->
                            </div>
                            <div class="game-item">
                                <div class="tags"><!--标签-->
                                    <a href="javascript:void(0);" class="tag-hot"></a>
                                    <a href="javascript:void(0);" class="tag-new"></a>
                                    <#if game.tagsList?exists>
                                        <#list game.tagsList as tags>
                                            <#if tags=="3d">
                                                <a href="javascript:void(0);" class="tag-3d"></a>
                                            <#elseif tags=="mobile">
                                                <a href="javascript:void(0);" class="tag-mobile"></a>
                                            </#if>
                                        </#list>
                                    </#if>
                                </div>
                                <img src="<#if data.siteGameI18ns[game.gameId?string.computer]?has_content>${imgPath(data.configInfo.domain,data.siteGameI18ns[game.gameId?string.computer].cover)}</#if>"/>
                                <div class="game-item-tit">
                                    <div class="g_line1">
                                        <a class="g_title">${data.siteGameI18ns[game.gameId?string.computer].name}</a> <div class="g_tx gameLine">${game.gameLine}条线</div>
                                    </div>
                                </div>
                            </div>
                            <div class="game-extra-info">
                                <div class="extra-item">
                            <span class="icon">
                                <a class="fav_a" data-game-id="${game.gameId?string.computer}" data-game-collect="false" onclick="gameCollect(this)"></a>
                            </span>
                                    <span class="txt" >添加收藏</span>
                                </div>
                                <div class="extra-item">
                            <span class="icon">
                                <div id="star" class="star">

                                </div>
                            </span>
                                    <span class="txt" >评分<span class="gameScore">${game.gameScore}</span></span>
                                </div>
                                <div class="extra-item">
                            <span class="icon">
                                <a href="javascript:void(0);" onclick="fullScreen();" class="full_screen" ></a>
                            </span>
                                    <span class="txt" >全屏游戏</span>
                                </div>
                                <div  class="extra-item">
                            <span class="icon">
                                <a href="${data.siteGameI18ns[game.gameId?string.computer].gameIntroduce}" class="icon-info"></a>
                            </span>
                                    <span class="txt gameDetail" >游戏介绍</span>
                                </div>
                            </div>
                        </div>
                        <div class="time _user_time"></div>
                    </div>
                </#list>
            </#if>

        </div>
    </div>
</div>

    <!--游戏内页底部弹层-->
    <div class="game_bottom">
        <div class="small-bar">
            <div class="pull-left">
                <div class="icon-arrow-down"></div>
                <ul class="list-inline">
                    <li><a href="javascript:" onclick="myCollectList(this)" data-gametype="fav"><span class="z1"><span class="icon i-fav"></span>我的收藏</span></a></a></li>
                    <li><a <#if data.gameSearch.gameTag?default('') == "hot_game">class="active"</#if> href="javascript:" onclick="gameTagList(this)" data-tag="hot_game" data-gametype="hot"><span class="z1"><span class="icon i-hot"></span>热门游戏</span></a></a></li>
                    <li><a href="javascript:" onclick="gameTagList(this)" data-tag="${data.gameSearch.gameTag?default('')}" data-gametype="sam"><span class="z1"><span class="icon i-sam"></span>类似游戏</span></a></a></li>
                </ul>
            </div>
            <div class="pull-right">
                <div class="search-box header-login _vr_gameSearch">
                    <span class="gui gui-search"></span>
                    <input type="hidden" name="apiId" value="${data.gameSearch.apiId?default("")}">
                    <input type="hidden" name="gameTag" value="${data.gameSearch.gameTag?default('')}"/>
                    <input type="text" name="gameName" class="form-control input-sm pull-left" placeholder="请输入游戏名称">
                    <a href="javascript:void(0)" class="btn btn-search pull-left _vr_gameSubmit"> 搜&nbsp;&nbsp;索</a>
                </div>
            </div>
        </div>
        <div class="_vr_casino-game-tag">
            <#include "casino-game-tag.ftl">
        </div>
    </div>
</main>
<#include "../../zh_CN/script.ftl">

<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery.raty.js"></script>
<#--内容模板需要用到的js-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/jsrender/jsrender.js"></script>
<#include "apiRechargeScript.ftl">
<#--我的收藏内容模板-->
<script id="casinoGameTag" type="text/x-jsrender">
    <div class="g-b-content active" data-gametype="rec">
        <div class="b-g-slide">
            <div class="slide-inner">
                <ul>
                {{for data}}
                    <li>
                        <a href="javascript:void(0)" class="_vr_mt_check item" data-api="{{:apiId}}" data-game-name="{{:name}}"
                           data-game-code="{{:code}}"
                           data-game-id="{{:id}}">
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
<script>
    // PlayGameDemo iframe
    $(document).ready(function() {
        document.getElementById('box_playGameDemo_iframe').setAttribute('src',localStorage.re_url_casino);
        var widthSet = parseInt($(".GameContainer").data("width")) / parseInt($(".GameContainer").data("height"))
        $("#box_playGameDemo_iframe").css("height", ($(window).height() - $("header").height()) + "px");
        $("#box_playGameDemo_iframe").css("width", ($(window).height() - $("header").height()) * widthSet + "px");
        $(".GameContainer").css("height", ($(window).height() - $("header").height()) + "px");
        $(".GameContainer").css("width", ($(window).height() - $("header").height()) * widthSet + "px");
        $(window).bind('resize', function(e) {
            $("#box_playGameDemo_iframe").css("height", ($(window).height() - $("header").height()) + "px");
            $("#box_playGameDemo_iframe").css("width", ($(window).height() - $("header").height()) * widthSet + "px");
            $(".GameContainer").css("height", ($(window).height() - $("header").height()) + "px");
            $(".GameContainer").css("width", ($(window).height() - $("header").height()) * widthSet + "px");
        });

        // 星级评分插件
        $("#star").raty({starType : 'i'});

        $(".game_bottom .list-inline li:eq(0) a").click();
        var gameId = getlocationParam("gameId");
        $.ajax({
            url: "/siteGame/isCollect.html",
            type: "POST",
            dataType: "json",
            data:{"search.gameId":gameId},
            success: function (data) {
                if(!data.state){
                    //准备收藏游戏：true
                    $(".fav_a").removeClass("fav_ed")
                    $(".fav_a").attr("data-game-collect","true");
                }else{
                    $(".fav_a").addClass("fav_ed")
                    $(".fav_a").attr("data-game-collect","false");
                }
            }
        })

        //游戏评分
        $("#star i").on("click",function (e) {
            var _this = e.currentTarget;
            var score = $(_this).attr("data-alt");
            if (sessionStorage.is_login != "true") {
                loginObj.getLoginPopup();
            }else{
                $.ajax({
                    url: "/siteGame/updateGameScore.html",
                    dataType:"JSON",
                    type: 'POST',
                    data:{"result.gameId":gameId,"result.score":score},
                    success: function(data) {
                        alert(data.msg);
                    },
                    error:function (data) {
                        alert(data.msg);
                    }
                });
            }
        })
    });
    $(function(){
        var dosome = getlocationParam("do")
        if( dosome === 'loginDialog' && sessionStorage.is_login!="true"){
            loginObj.getLoginPopup(function(){
                window.location.href = "/gamePage/casino-game.html";

            });
        }
    })
</script>
</body>

</html>
