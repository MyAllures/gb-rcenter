<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="<#if data.configInfo.apiId??&&data.configInfo.apiId=='2'>IE=9<#else>IE=edge</#if>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "game.include.head.ftl">
    <style>
        .GameBody{padding:0;}
    </style>
</head>

<body>
<!-- Static Bar -->
<#include "/${data.configInfo.templateName}/zh_CN/gamePage/gameTop.ftl">
<!-- Casino Game Overlay -->
<div class="CasinoGameOverlay" style="background-image:url(${data.configInfo.skinPath}/images/mg-bg.jpg)">
    <div class="GameBody">
        <div class="GameContainer" >
            <!-- Game Tips -->
            <!-- <div class="GameTips">
                廣告位
            </div> -->
            <!-- Iframe 直接調用 -->
            <iframe id="box_playGameDemo_iframe" scrolling="yes" frameborder="0" allowtransparency="true" src="" > </iframe>
            <!-- Iframe 過渡頁面調用 -->
            <!-- <iframe id="box_playGameDemo_iframe" scrolling="no" frameborder="0" allowtransparency="true" src="casino-game-playGo.htm"> </iframe> -->
            <!-- Extra Game -->
            <div class="ExtraGame" style="display: none;">
                <button class="gameIconsInner gameClose" title="返回"></button>
                <button class="gameIconsInner gameFavorite active" title="收藏遊戲"></button>
                <button class="gameIconsInner gameFullScreen" title="全屏顯示"></button>
                <button class="gameIconsInner gameClock" title="當前時間"></button>
            </div>
        </div>
    </div>
</div>
<#include "../../zh_CN/script.ftl">
<#include "apiRechargeScript.ftl">
<script>
    // PlayGameDemo iframe
    var lottery_code = getlocationParam("lottery_code");
    var _url = null;
    if(lottery_code!=undefined && lottery_code!="undefined" && lottery_code!="null"){
        _url = "/lottery/index.html?code="+lottery_code;
    }else{
        _url = "/lottery/index.html";
    }

    $(document).ready(function() {
        document.getElementById('box_playGameDemo_iframe').setAttribute('src',_url);
        var height=$(window).height() - (parseInt($(".CasinoGameOverlay").css("top"))||$("header").height()) + "px"
        $("#box_playGameDemo_iframe").css("height",height);
        $("#box_playGameDemo_iframe").css("width",$(window).width() + "px");
        $(".GameContainer").css("height",height);
        $(".GameContainer").css("width", $(window).width() + "px");
        $(window).bind('resize', function(e) {
            $("#box_playGameDemo_iframe").css("height", height);
            $("#box_playGameDemo_iframe").css("width", $(window).width() + "px");
            $(".GameContainer").css("height",height);
            $(".GameContainer").css("width", $(window).width() + "px");
        });
    });
    $(function(){
        var dosome = getlocationParam("do");
        if( dosome === 'loginDialog' && sessionStorage.is_login!="true"){
            loginObj.getLoginPopup(function(){
                window.location.href = "/gamePage/loadingUnLoginLottery.html";

            });
        }
    })
</script>
</body>

</html>
