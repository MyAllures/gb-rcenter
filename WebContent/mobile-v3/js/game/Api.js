/*界面初始化*/
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*左侧菜单上下滚动，可自行指定范围*/
        leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left']
    };
    muiInit(options);
});

/*金额转入弹窗*/
function moneyIn(obj,options){
    options = {
        confirm:"<input type='text' id='transferIn' name='transferAmount' placeholder='¥'>",
        title:window.top.message.game_auto['转入金额'],
        btnArray:[window.top.message.game_auto['确认'], window.top.message.game_auto['取消']],
        func:transferIn
    };
    showConfirmMsg(options,obj);
    inputNumber.init($('[name=transferAmount]'), {
        negative: false,
        decimal: false,
        intSize: 9
    });
}

function transferIn(){
    var transferIn = $("#transferIn").val();
    var $this = $($(".mui-popup-buttons .mui-popup-button").get(0));
    if(transferIn != "" && transferIn != "0"){
        var options = {
            url:"/transfer/checkTransferAmount.html",
            type:'POST',
            data: {'result.transferAmount': transferIn, 'transferOut': 'wallet'},
            headers: {'Soul-Requested-With': 'XMLHttpRequest'},
            dataType: 'String',
            beforeSend: function () {
                $this.attr("disabled", "disabled").text(window.top.message.game_auto['提交中']);
            },
            success: function (data) {
                if (data == 'true') {
                    submitTransfer(true, transferIn);
                } else {
                    toast(window.top.message.game_auto['当前钱包余额不足']);
                    $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
                }
            },
            error: function () {
                $('.mui-popup').attr("style", "");
                $this.text('确认提交').removeAttr("disabled");
                toast(window.top.message.game_auto['转账异常']);
            }
        };
        muiAjax(options);
    }
}

/*金额转出弹窗*/
function moneyOut(obj,options){
    options = {
        confirm:"<input type='text' id='transferOut' placeholder='¥'>",
        title:window.top.message.game_auto['转出金额'],
        btnArray:[window.top.message.game_auto['确认'], window.top.message.game_auto['取消']],
        func:transferOut
    };
    showConfirmMsg(options,obj);
    inputNumber.init($('#transferOut'), {
        negative: false,
        decimal: false,
        intSize: 9
    });
}

function transferOut(){
    var transferOut = $("#transferOut").val();
    var $this = $($(".mui-popup-buttons .mui-popup-button").get(0));
    if (transferOut != "" && transferOut != "0") {
        var options = {
            url:"/transfer/checkTransferAmount.html",
            type: 'POST',
            data: {'result.transferAmount': transferOut, 'transferOut': $("#apiId").val()},
            headers: {'Soul-Requested-With': 'XMLHttpRequest'},
            dataType: 'String',
            beforeSend: function () {
                $this.attr("disabled", "disabled").text(window.top.message.game_auto['提交中']);
            },
            success: function (data) {
                if (data == 'true') {
                    submitTransfer(false, transferOut);
                } else {
                    toast(window.top.message.game_auto['当前游戏余额不足']);
                    $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
                }
            },
            error: function () {
                $('.mui-popup').attr("style", "");
                $this.text('确认提交').removeAttr("disabled");
                toast(window.top.message.game_auto['转账异常']);
            }
        };
        muiAjax(options);
    }
}

/*开始游戏*/
function startGame(obj,options){
    var apiId = $("#apiId").val();
    var apiTypeId = $("#apiTypeId").val();
    var data = new Object({'apiId': apiId, 'apiTypeId': apiTypeId});
    if (apiId == '3' && apiTypeId == '1')
        data.gameCode = "1179";
    if (apiId != "") {
        if (apiId == "10" || (apiTypeId != "" && (apiTypeId == "1" || apiTypeId == "3" || apiTypeId == "4"))) {
            apiLogin(data);
        } else if (apiTypeId != "" && (apiTypeId == "2")) {
            /*if (os == 'app_ios')
                gotoPay(root + "/game/getGameByApiId.html?search.apiId=" + apiId + "&search.apiTypeId=" + apiTypeId);
            else*/
                goToUrl(root + "/game/getGameByApiId.html?search.apiId=" + apiId + "&search.apiTypeId=" + apiTypeId);
        }
    }
}

function submitTransfer(isOut, amount) {
    var _this = this;
    var gbToken = $("[name='gb.token']").val();
    var apiId = $("#apiId").val();
    var $this = $($(".mui-popup-buttons .mui-popup-button").get(0));
    var data;
    if (isOut){
        data = {
            'gb.token': gbToken,
            'transferOut': 'wallet',
            'transferInto': apiId,
            'result.transferAmount': amount
        };
    }
    else{
        data = {
            'gb.token': gbToken,
            'transferOut': apiId,
            'transferInto': 'wallet',
            'result.transferAmount': amount
        };
    }
    var options={
        url:root + '/transfer/transfersMoney.html',
        dataType: 'json',
        data: data,
        type: 'post',
        async: true,
        beforeSend: function () {
            $this.attr("disabled", "disabled").text(window.top.message.game_auto['提交中']);
        },
        success: function (data) {
            transferBack(data);
            $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
        },
        error: function (xhr, type, errorThrown) {
            $this.text(window.top.message.game_auto['确认提交']).removeAttr("disabled");
        }
    };
    muiAjax(options);
}

/**
 * 转账回调
 */
function transferBack(data) {
    $('.mui-popup').attr("style", "");
    var _this = this;
    var apiId = $("#apiId").val();
    var apiTypeId = $("#apiTypeId").val();
    if (!data) {
        toast(window.top.message.game_auto["转账异常2"]);
    } else if (data.state == true && data.result == 0) {
        if (_this.os == 'app_android') {
            window.gamebox.backRefresh();
        }
        //转账成功
        layer.open({
            title: window.top.message.game_auto['转账成功'],
            content: '',
            btn: [window.top.message.game_auto['好的'], ''],
            shadeClose: false,
            yes: function (index) {
                window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                layer.close(index);
            }
        })
    } else if (data.state == true && data.result == 1) {
        //转账失败
        layer.open({
            title: window.top.message.game_auto['转账失败'],
            content: window.top.message.game_auto['失败提示'],
            btn: [window.top.message.game_auto['确定'], ''],
            shadeClose: false,
            yes: function (index) {
                window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                layer.close(index);
            }
        })
    } else if (data.state == true && data.result) {
        var orderId = data.orderId;
        var btnArray = [window.top.message.game_auto['返回'], window.top.message.game_auto['再试一次']];
        layer.open({
            title: window.top.message.game_auto['转账超时'],
            content: window.top.message.game_auto['订单超时'],
            btn: btnArray,
            shadeClose: false,
            yes: function (index) {
                window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                layer.close(index);
            },
            no: function (index) {
                window.location.replace("/api/detail.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId);
                layer.close(index);
            }
        })
    } else {
        toast(data.msg);
        $("[name='gb.token']").val(data.token);
    }
}

