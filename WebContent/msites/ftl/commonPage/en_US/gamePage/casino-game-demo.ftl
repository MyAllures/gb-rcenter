<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "game.include.head.ftl">
</head>

<body>
<!-- Static Bar -->
<#include "/${data.configInfo.templateName}/en_US/gamePage/gameTop.ftl">
<!-- Casino Game Overlay -->
<main>
<div class="CasinoGameOverlay" style="background-image:url(${data.configInfo.skinPath}/images/mg-bg.jpg)">
    <div class="GameBody">
        <div class="GameContainer" data-width="16" data-height="9">
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
</main>
<#include "../../en_US/script.ftl">
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
