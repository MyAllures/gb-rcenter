<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
<#include "game.include.head.ftl">
    <style>
        .GameBody{
            width: 100%;
            text-align: center;
            margin-top: 250px;
        }
    </style>
</head>
<body>
<#include "/${data.configInfo.templateName}/ja_JP/gamePage/gameTop.ftl">
<main>
    <!-- Casino Game Overlay -->
    <div class="CasinoGameOverlay">
        <div class="GameBody">
            <div class="loading"><span class="gui gui-3x gui-spinner gui-pulse"></span></div>
            <div class="brand logo"><img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" alt="<#if data.siteInfo.title?exists>${data.siteInfo.title}</#if>"></div>
            <div class="desc"><#if data.siteInfo.title?exists>${data.siteInfo.title}</#if>正在为您跳转<span class="apiName"></span></div>
        </div>
    </div>
</main>
<#include "../../ja_JP/script.ftl">
<script>
    var apiId = getlocationParam("apiId");
    var gameCode = getlocationParam("gameCode");
    var apiTypeId = getlocationParam("apiType");
    var apiName = getApiName(apiId);
    $(".apiName").text(apiName);

    $(function(){
        demoPayLogin();
    });

    /**
     * 试玩登录
     **/
    function demoPayLogin() {
        var url = "/demo.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId + "&language="+current_language+"&siteId="+${data.siteInfo.siteId};
        if(gameCode) {
            url = url + "&gameCode=" + gameCode;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                if (data.isSuccess == true) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        /*https协议的请求*/
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            if (apiTypeId == "1" && apiId=="1155") {
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if (apiTypeId == "2" && apiId=="15") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            }else{
                                /*游戏调转链接不支持https，所以不能嵌套在对应的-game.ftl里面*/
                                window.location=result.defaultLink;
                                return;
                            }
                        }else{
                            /*http协议的请求*/
                            if(apiTypeId == "3" && apiId =="10"){//BBIN 跳转特殊处理 跳转会不对应游戏类型
                                window.location=result.defaultLink;
                                return;
                            }
                            if (apiTypeId == "2") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            }else if(apiTypeId == "3"){
                                if (window.localStorage) {
                                    localStorage.re_url_sport = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            }else if(apiTypeId == "1"){
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if(apiTypeId == "4"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }
                        }
                    } else {
                        var redirectUrl = result.links[apiTypeId];
                        if (apiTypeId != "3") {
                            redirectUrl = "/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        } else {
                            redirectUrl = "/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        }
                        window.location=redirectUrl;
                    }
                } else {
                    if(data.msg) {
                        BootstrapDialog.alert({
                            title: 'ヒント',
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING,
                            buttonLabel: '確定',
                            callback: function(result) {
                                if (result){
                                    window.close();
                                }
                            }
                        });
                    } else {
                        BootstrapDialog.alert({
                            title: 'ヒント',
                            message: 'ゲームに入れません。時間が経ってから再度お試しください。',
                            type: BootstrapDialog.TYPE_WARNING,
                            buttonLabel: '確定',
                            callback: function(result) {
                                if (result){
                                    window.close();
                                }
                            }
                        });
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    window.close();
                    loginObj.getLoginPopup();
                } else {
                    BootstrapDialog.alert({
                        title: 'ヒント',
                        message: 'ゲームに入れません。時間が経ってから再度お試しください。',
                        type: BootstrapDialog.TYPE_WARNING,
                        buttonLabel: '確定',
                        callback: function(result) {
                            if (result){
                                window.close();
                            }
                        }
                    });
                }
            }
        })
    }
</script>
</body>

</html>
