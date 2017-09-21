<script>
    var apiId = getlocationParam("apiId");
    function fetchBalance(){
        $.ajax({
            url:"/ntl/getWalletBalanceAndApiBalance.html?apiId="+apiId+"&t="+ new Date().getTime().toString(36),
            type:"get",
            dataType:"JSON",
            success:function(data){
                var wd = $("#box_playGameDemo_iframe").width();
                data.width = wd;
                $("#box_playGameDemo_iframe").css("width","0px");
                if((apiId!='20'){
                    showTransferWin(data);
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
        var apiId = data.apiId;
        var apiName = data.apiName;
        var wd = data.width;
        dialog = BootstrapDialog.show({
            title: apiName + ' クイックトランスファー',
            //closable: false, // <-- Default value is false
            draggable: true,
            type: BootstrapDialog.TYPE_WARNING,
            data: {
                'walletBalance': data.walletBalance,
                'apiBalance': data.apiBalance
            },
            message: function(dialog) {
                var $message = $('<div></div>').load('/commonPage/modal/recharge.html?hideEnter=true', function(){
                    $(".enter-btn",$message).hide();
                    $("#api-name-div",$message).text(apiName);
                    $("#walletBalance-value",$message).text(dialog.getData("walletBalance"));
                    $("#apiBalance-value",$message).text(dialog.getData("apiBalance"));
                    $("#token",$message).val(data.token);

                });

                return $message;
            },
            onshown:function(){
                $(".enter-btn").hide();
            },
            onhide: function () {
                $("#box_playGameDemo_iframe").css("width",wd);
            }
        });
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
                'result.transferAmount':amount,
                'result.apiId':apiId,
                'gb.token':$("#token").val()
            },
            url:"${data.contextInfo.playerCenterContext}fund/playerTransfer/transfersMoney.html?t="+ new Date().getTime().toString(36),
            dataType:"JSON",
            beforeSend:function(){
                $("#confirm-btn").html('<span class="loading gui gui-spinner gui-pulse"></span> トランスファー中');
            },
            success:function(data){
                if (data.isFreeze == true) {
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> 残高凍結中');
                    alert("残高凍結中");
                    return;
                } else if (data.apiStatus == false) {
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> APIメンテナンス中');
                    alert("メンテナンス中、トランスファー不可！");
                } else if (data.state == false && data.hasAccount == false) {
                    $("#token").val(data.token);
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> トランスファー確認');
                    alert("APIメンテナンス中、時間が経ってから再度お試しください！");
                    setButtonStatus()
                } else if (data.state == false && data.msg) {
                    $("#token").val(data.token);
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> トランスファー確認');
                    alert(data.msg);
                    setButtonStatus()
                } else if (data.state == true) {
                    //转账成功后提示
                    if (data.resultCode == 0) {
                        $("#confirm-btn").html('<span class="loading gui gui-check"></span> トランスファー完了');
                        alert("トランスファー成功");
                        if(dialog){
                            dialog.close();
                        }
                    }else {//转账不成功或待确认
                        $("#token").val(data.token);
                        tryAgain(data);
                    }
                    setButtonStatus()
                }

            },
            error:function(XMLHttpRequest, textStatus, errorThrown) {
                if(textStatus=="608"){
                    alert("再送信しないでください");
                }else{
                    setButtonStatus();
                    alert("異常請求、お客様センターへご連絡ください。");
                    $("#confirm-btn").html('<span class="loading gui gui-check"></span> トランスファー完了');
                }
            },
            complete: function () {
            }
        });
    }
    function tryAgain(data){
        var bdDialog = BootstrapDialog.show({
            title:'タイムオーバー',
            type: BootstrapDialog.TYPE_WARNING,
            message: 'タイムオーバーのため、再操作してください！',
            buttons: [{
                label: '再操作',
                action: function(dialog) {
                    reconnectTransfer(data.transactionNo);
                    bdDialog.close();
                }
            }, {
                label: '取消',
                action: function(dialog) {
                    bdDialog.close();
                    $("#confirm-btn").html('<span class="gui gui-check-square-o"></span> トランスファー確認');
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
        $("#confirm-btn").html('<span class="loading gui gui-spinner gui-pulse"></span> 转账中');
        $.ajax({
            url: "${data.contextInfo.playerCenterContext}fund/playerTransfer/reconnectTransfer.html",
            data: {'search.transactionNo':transactionNo},
            dataType: "json",
            loading: true,
            success: function (data) {
                if (data.state == false) {
                    alert("トランスファー失敗、再操作してください。");
                    return;
                }
                //转账成功后提示
                if (data.state == true && data.resultCode == 0) {
                    alert("成功");
                    return;
                }
                setButtonStatus()
                $("#confirm-btn").html('<span class="loading gui gui-check"></span> トランスファー確認');
                tryAgain(data);
            },
            error: function (data) {
            }
        });
    }
    function checkRate(amount){
        if(amount==null||amount==""){
            alert("金額を入れてください。");
            return false;
        }
        var g = /^[1-9]*[1-9][0-9]*$/;
        if(isNaN(amount)||!g.test(amount)){
            alert("整数を入れてください。");
            return false;
        }
        return true;
    }
    function getlocationParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return r[2]; return null;
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
                    alert("ウォレット残高確認できません。");
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
                    alert("API残高確認できません。");
                }
                $("#api-refresh-span").removeClass("gui-pulse");
            }
        });
    }
</script>