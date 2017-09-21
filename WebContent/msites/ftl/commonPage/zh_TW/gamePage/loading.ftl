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
<#include "/${data.configInfo.templateName}/zh_TW/gamePage/gameTop.ftl">
<main>
    <!-- Casino Game Overlay -->
    <div class="CasinoGameOverlay">
        <div class="GameBody">
            <div class="loading"><span class="gui gui-3x gui-spinner gui-pulse"></span></div>
            <div class="brand logo"><img src="${imgPath(data.configInfo.domain,data.configInfo.logo)}" alt="<#if data.siteInfo.title?exists>${data.siteInfo.title}</#if>"></div>
            <div class="desc"><#if data.siteInfo.title?exists>${data.siteInfo.title}</#if>正在為您跳轉<span class="apiName"></span></div>
        </div>
    </div>
</main>

<#include "../../zh_TW/script.ftl">
<#include "../../zh_TW/autoPayLogin.ftl">
<script>
    var apiId = getlocationParam("apiId");
    var gameCode = getlocationParam("gameCode");
    var apiTypeId = getlocationParam("apiTypeId");
    var apiName = getApiName(apiId);
    $(".apiName").text(apiName);

    $(function(){
        var isAutoPay = getCookie("isAutoPay");
        if(isAutoPay == 'true') {
            autoPayLogin();
        } else {
            fetchBalance();
        }
    });

    function fetchBalance(){
        $.ajax({
            url:"/ntl/getWalletBalanceAndApiBalance.html?apiId="+apiId+"&apiId="+apiTypeId+"&t="+ new Date().getTime().toString(36),
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
    var dialog;
    function showTransferWin(data){
        //快速转账弹窗，待处理：转账成功后续请求
        var apiName = data.apiName;
        dialog = BootstrapDialog.show({
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
            alert("钱包餘額不足");
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
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 账号餘額被冻结');
                    alert("账号餘額被冻结");
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
        var bdDialog = BootstrapDialog.show({
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
        });
    }

    /**
     * 再试一次
     * @param e
     * @param option
     */
    function reconnectTransfer(transactionNo) {
        $("#confirm-btn").attr("disabled",true);
        if(dialog){
            dialog.setClosable(false);
        }
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
            dialog.close();
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
                    alert("刷新失败，未获取到钱包餘額");
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
                    alert("刷新失败，未获取到API餘額");
                }
                $("#api-refresh-span").removeClass("gui-pulse");
            }
        });
    }
</script>
</body>

</html>
