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
<#include "/${data.configInfo.templateName}/zh_CN/gamePage/gameTop.ftl">
<!-- Casino Game Overlay -->
<div class="CasinoGameOverlay" style="background-image:url(${data.configInfo.skinPath}/images/im-bg.jpg)">
    <div class="GameBody">
        <div class="GameContainer">
            <!-- Game Tips -->
            <!-- <div class="GameTips">
                廣告位
            </div> -->
            <!-- Iframe 包含頁面 -->
            <iframe id="box_playGameDemo_iframe" scrolling="yes" frameborder="0" allowtransparency="true" src=""> </iframe>
        </div>
    </div>
</div>

<#include "../../zh_CN/script.ftl">
<#include "apiRechargeScript.ftl">
<script>
    // PlayGameDemo iframe
    $(document).ready(function() {
        var appWidth = 1020;
        var apiId=getParamValuesByName("apiId");
        if(apiId=="12"){
            appWidth = 1060;
        }
        document.getElementById('box_playGameDemo_iframe').setAttribute('src',localStorage.re_url_sport);
        $("#box_playGameDemo_iframe").css("height", ($(window).height() - $("header").height()) + "px");
        $("#box_playGameDemo_iframe").css("width", "100%");
        $(".GameContainer").css("height", ($(window).height() - $("header").height()) + "px");
        $(".GameContainer").css("width", appWidth + "px");
        $(window).bind('resize', function(e) {
            $("#box_playGameDemo_iframe").css("height", ($(window).height() - $("header").height()) + "px");
            $("#box_playGameDemo_iframe").css("width", "100%");
            $(".GameContainer").css("height", ($(window).height() - $("header").height()) + "px");
            $(".GameContainer").css("width", appWidth + "px");
        });


    });
    function getParamValuesByName (querystring) {
        var qstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < qstring.length; i++) {
            var urlparam = qstring[i].split('=');
            if (urlparam[0] == querystring) {
                return urlparam[1];
            }
        }
    }
    $(function(){
        var dosome = getlocationParam("do")
        if( dosome === 'loginDialog' && sessionStorage.is_login!="true"){
            loginObj.getLoginPopup(function(){
                 window.location.href = "/gamePage/sport-game.html";
            });
        }
    })
</script>
</body>
</html>