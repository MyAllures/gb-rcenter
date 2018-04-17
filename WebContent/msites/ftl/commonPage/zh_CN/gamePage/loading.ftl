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
<#include "/${data.configInfo.templateName}/zh_CN/gamePage/gameTop.ftl">
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

<#include "../../zh_CN/script.ftl">
<#include "../../zh_CN/autoPayLogin.ftl">
<script>
    var apiId = getlocationParam("apiId");
    var gameCode = getlocationParam("gameCode");
    var apiTypeId = getlocationParam("apiType");
    var apiName = getApiName(apiId);
    $(".apiName").text(apiName);
    var gameId = getlocationParam("gameId");
    var dialog = null;// 弹窗变量

    $(function(){
        var isAutoPay = getCookie("isAutoPay");
        if(isAutoPay == 'true') {
            fetchAllBalance();
        } else {
            fetchBalance();
        }
    });

    function fetchAllBalance(){
        var title ='cch';
        $.ajax({
            url: "/ntl/getWalletBalanceAndAllApiBalance.html?t="+ new Date().getTime().toString(36),
            type: "get",
            dataType: "JSON",
            success:function(data){
                if(!data.allBalance>0&&apiId!='20'){
                    showRecharge(data);
                }else {
                    autoPayLogin();
                }
            },
            error:function(error){
                console.log("getWalletBalanceAndAllApiBalance error")
            }
        })
    }

    function fetchBalance(){
        $.ajax({
            url:"/ntl/getWalletBalanceAndApiBalance.html?apiId="+apiId+"&t="+ new Date().getTime().toString(36),
            type:"get",
            dataType:"JSON",
            success:function(data){
                if((data.apiBalance==null||data.apiBalance<100)&&apiId!='20'){
                    showTransferWin(data);
                }else{
                    enterToGame();
                }
            },
            error:function(error) {
                console.log("getWalletBalanceAndApiBalance error")
            }
        })
    }
    /*var dialog;*/
    function showTransferWin(data){
        //快速转账弹窗，待处理：转账成功后续请求
        var apiName = data.apiName;
        /*dialog = BootstrapDialog.show({
            title: apiName + ' 快速转账',
            //closable: false, // <-- Default value is false
            draggable: true,
            type: BootstrapDialog.TYPE_WARNING,
            data: {
                'walletBalance': data.walletBalance,
                'apiBalance': data.apiBalance,
                'apiName':data.apiName
            },
            message: function(dialog) {
                var $message = $('<div></div>').load('/commonPage/modal/recharge.html', function(){
                    $("#api-name-div",$message).text(dialog.getData("apiName"));
                    $("#walletBalance-value",$message).text(dialog.getData("walletBalance"));
                    $("#apiBalance-value",$message).text(dialog.getData("apiBalance"));
                    $("#token",$message).val(data.token);

                });
                return $message;
            },
            onhide: function(dialogRef){
                apiLoginReal(apiId,gameCode,apiTypeId);
                //enterToGame();
            }
        });*/
        var apiName = layer.open({
            content:'<div style="width: 400px;margin: 0 auto 10px;"><span style="color: #466488;">转出</span> <span style="background: #466488;color: #fff;width: 90px; display:  inline-block;text-align:  center;height:  33px;line-height: 33px;">我的钱包</span><span id="walletBalance-value" style="background: #ddd;color: #00b7a4;display:  inline-block;width: 180px;text-align:  center;height:  33px;line-height: 33px;">'+data.walletBalance+'</span> <a href="javascript:refreshWalletBalance()"><span class=" gui gui-refresh" id="wallet-refresh-span"></span></a><a style="float:  right;" class="btn btn-primary" data-win-size="2" target="_blank" href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html">去存款</a></div>' +
            '<div style="width: 400px;margin: 0 auto 10px;"><span style="color: #466488;">转入</span>  <span id="api-name-div" style="background: #466488;color: #fff;width: 90px; display:  inline-block;text-align:  center;height:  33px;line-height: 33px;">'+data.apiName+'</span><span id="apiBalance-value" style="background: #ddd;color: #00b7a4;display:  inline-block;width: 180px;text-align:  center;height:  33px;line-height: 33px;">'+data.apiBalance+'</span> <a href="javascript:refreshApiBalance()"><span class="gui gui-refresh" id="api-refresh-span"></span></a></div>' +
            '<div style="width: 400px;margin: 0 auto 10px;"><span style="background: #466488;color: #fff;width: 90px; display:  inline-block;text-align:  center;margin-left: 31px;height:  33px;line-height: 33px;">￥</span><input style="background: #ddd;color: #00b7a4;display:  inline-block;width: 180px;text-align:  center;vertical-align:  top;border:  0;height:  33px;line-height: 33px;" type="text" class="form-control" id="transferAmount" name="transferAmount" placeholder="请输入整数金额"> <span></span><input type="hidden" name="gb.token" id="token"></div>' +
            '<div style="text-align:  center;width:400px;margin: 0 auto 10px;"><button class="btn btn-primary btn-block" type="button" id="confirm-btn" onclick="confirmTransction()"> <span class="gui gui-check-square-o"></span> 确认转账         </button></div>' +
            '<div style="text-align:  center;width: 400px;margin: 0 auto 10px;"><button class="btn btn-success btn-block" type="button" onclick="enterToGame()"><span class="gui gui-share"></span> 进入游戏</button></div>'+
            '<input type="hidden" name="gb.token" id="token">',
            title:apiName + ' 快速转账',
            area:['600px','285px'],
            skin:'layui-layer-brand',
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $("#token").val(data.token);
            },
            yes: function () {
                apiLoginReal(apiId,gameCode,apiTypeId);
            }
        });
    }

    function showRecharge(data){
        /*dialog = BootstrapDialog.show({
            title: '余额提醒',
            draggable: true,
            type:  BootstrapDialog.TYPE_WARNING,
            data: {
                'allBalance': data.allBalance,
            },
            message: function(dialog){
                var $message = $('<div></div>').load('/commonPage/modal/toRecharge.html', function(){
                    $("#walletBalance-value",$message).text(dialog.getData("allBalance"));
                });
                return $message;
            },
            onhide: function(dialogRef){
                apiLoginReal(apiId,gameCode,apiTypeId);
                //enterToGame();
            }
        });*/
        var dialog = layer.open({
            content:'<div style="width: 400px;margin: 0 auto 10px;"><span style="background: #466488;color: #fff;width: 90px;display:  inline-block;text-align:  center;height:  33px;line-height: 33px;">您的余额</span><span id="walletBalance-value" style="background: #ddd;color: #00b7a4;display:  inline-block;width: 280px;text-align:  center;height: 33px;line-height: 33px;">'+data.allBalance+'</span><a href="javascript:refreshWalletBalance()"><span class="gui gui-refresh pull-right" style="color: #337ab7;" id="wallet-refresh-span"></span></a></div>' +
            '<div style="width: 400px;margin: 0 auto 10px;"><a  id="confirm-btn" class="btn btn-primary btn-block" target="_blank" href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html"> <span class="gui gui-check-square-o"></span> 去存款 </a></div> '+
            '<div style="width: 400px;margin: 0 auto 10px;"><button class="btn btn-success btn-block" type="button" onclick="autoPayLogin()"><span class="gui gui-share"></span> 进入游戏</button></div>',
            title:'余额提醒',
            area:['600px','285px'],
            skin:'layui-layer-brand',
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
            },
            yes: function () {
                apiLoginReal(apiId,gameCode,apiTypeId);
            }
        });
    }

    function checkRate(amount){
        if(amount==null||amount==""){
            alert("转入金额不能为空");
            return false;
        }
        var g = /^[1-9]*[1-9][0-9]*$/;
        if(isNaN(amount)||!g.test(amount)){
            alert("请输入正整数");
            return false;
        }
        var wb = $("#walletBalance-value").text();
        if(wb){
            wb = wb.replace(/,/g, "");;
        }
        if(parseFloat(wb)<parseFloat(amount)){
            alert("钱包余额不足");
            return;
        }
        return true;
    }
    function confirmTransction(){
        var amount = $("[name='transferAmount']").val();
        if(!checkRate(amount)){
            return;
        }
        $("#confirm-btn").attr("disabled",true);
        if(dialog){
            dialog.setClosable(false);
        }
        $.ajax({
            type:"POST",
            data:{
                'transferInto':apiId,
                'transferOut':'wallet',
                'result.transferAmount':$("[name='transferAmount']").val(),
                'result.apiId':apiId,
                'gb.token':$("#token").val()
            },
            url:"${data.contextInfo.playerCenterContext}fund/playerTransfer/transfersMoney.html?t="+ new Date().getTime().toString(36),
            dataType:"JSON",
            beforeSend:function(){
                $("#confirm-btn").html('<span class="loading gui gui-spinner fa-pulse"></span> 转账中');
            },
            success:function(data){
                if (data.isFreeze == true) {
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 账号余额被冻结');
                    alert("账号余额被冻结");
                    return;
                } else if (data.apiStatus == false) {
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> API维护或停用');
                    alert("该api游戏正在维护中(或已停用)，不能转账！");
                } else if (data.state == false && data.hasAccount == false) {
                    $("#token").val(data.token);
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 确认转账');
                    alert("该Api暂时无法转账，请稍后重试！");
                    setButtonStatus();
                } else if (data.state == false && data.msg) {
                    $("#token").val(data.token);
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 确认转账');
                    alert(data.msg);
                    setButtonStatus();
                } else if (data.state == true) {
                    //转账成功后提示
                    if (data.resultCode == 0) {
                        alert("转账成功");
                        $("#confirm-btn").html('<span class="loading gui gui-check"></span> 转账完成');
                        enterToGame();
                    }else {//转账不成功或待确认
                        $("#token").val(data.token);
                        $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 确认转账');
                        tryAgain(data);
                    }
                    setButtonStatus();
                }

            },
            error:function(XMLHttpRequest, textStatus, errorThrown) {
                if(textStatus=="608"){
                    alert("请不要重复提交");
                }else{
                    setButtonStatus();
                    alert("请求异常，请联系客服");
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 确认转账');
                }
            },
            complete: function () {

            }
        });
    }

    function tryAgain(data){
        /*var bdDialog = BootstrapDialog.show({
            title:'订单超时',
            type: BootstrapDialog.TYPE_WARNING,
            message: '非常抱歉，由于网络连接异常，本次订单已超时，建议您稍后再试！',
            buttons: [{
                label: '再试一次',
                action: function(dialog) {
                    reconnectTransfer(data.transactionNo);
                    bdDialog.close();
                }
            }, {
                label: '取消',
                action: function(dialog) {
                    bdDialog.close();
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 确认转账');
                }
            }]
        });*/
        var dialog =  layer.open({
            content:'非常抱歉，由于网络连接异常，本次订单已超时，建议您稍后再试！',
            title:'订单超时',
            skin:'layui-layer-brand',
            area:['360px'],
            btn:['再试一次','取消'],
            success: function(layer){
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                // 提示框按钮类型
                if(!!btnRound){
                    $(layer).addClass("dialog-btn-round");
                }
                if(!!btnBorder){
                    $(layer).addClass("dialog-btn-border");
                }
            },
            yes:function () {
                layer.close(dialog);
                reconnectTransfer(data.transactionNo);
            },
            btn2:function(){
                layer.close(dialog);
                $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 确认转账');
            }
        });
    }

    /**
     * 再试一次
     * @param e
     * @param option
     */
    function reconnectTransfer(transactionNo) {
        $("#confirm-btn").attr("disabled",true);
        /*if(dialog){
            dialog.setClosable(false);
        }*/
        $("#confirm-btn").html('<span class="loading gui gui-spinner fa-pulse"></span> 转账中');
        $.ajax({
            url: "${data.contextInfo.playerCenterContext}fund/playerTransfer/reconnectTransfer.html",
            data: {'search.transactionNo':transactionNo},
            dataType: "json",
            loading: true,
            success: function (data) {
                if (data.state == false) {
                    alert("转账不成功，请稍后再试");
                    return;
                }
                //转账成功后提示
                if (data.state == true && data.resultCode == 0) {
                    alert("成功");
                    return;
                }
                setButtonStatus();
                $("#confirm-btn").html('<span class="loading gui gui-check"></span> 转账完成');
                tryAgain(data);
            },
            error: function (data) {
            }
        });
    }

    function enterToGame(){
        if(dialog!=null){
            layer.close(dialog);
        } else{
            apiLoginReal(apiId,gameCode,apiTypeId);
        }
    }
    function setButtonStatus() {
        $("#confirm-btn").attr("disabled", false);
        if (dialog) {
            dialog.setClosable(true);
        }
    }
    function refreshWalletBalance(){
        $.ajax({
            url:"/ntl/getWalletBalanceAndApiBalance.html?apiId="+apiId+"&t="+ new Date().getTime().toString(36),
            type:"get",
            dataType:"JSON",
            beforeSend:function(){
                $("#wallet-refresh-span").addClass("gui-pulse")
            },
            success:function(data){
                if(data.walletBalance){
                    $("#walletBalance-value").text(data.walletBalance);
                }else{
                    alert("刷新失败，未获取到钱包余额");
                }
                $("#wallet-refresh-span").removeClass("gui-pulse");
            },
            error:function(error) {
                console.log("getWalletBalanceAndApiBalance error")
            }
        })
    }
    function refreshApiBalance(){
        var url = "${data.contextInfo.playerCenterContext}fund/playerTransfer/refreshApi.html?type=api&search.apiId=" + apiId + "&t=" + new Date().getTime();
        $.ajax({
            url: url,
            dataType: "json",
            beforeSend:function(){
                $("#api-refresh-span").addClass("gui-pulse")
            },
            success: function (data) {
                if(data.apiMoney){
                    $("#apiBalance-value").text(data.apiMoney);
                }else{
                    alert("刷新失败，未获取到API余额");
                }
                $("#api-refresh-span").removeClass("gui-pulse");
            }
        });
    }
</script>
</body>

</html>
