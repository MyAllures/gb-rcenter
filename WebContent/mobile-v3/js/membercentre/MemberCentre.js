/*获取用户信息*/
function userInfo() {
    var option = {
        url: root + "/mine/userInfo.html",
        success: function (data) {
            if (data != null) {
                var currency = data.currency;

                if (data.username) {
                    $(".ct p").text(data.username);
                }
                if (data.avatarUrl) {
                    $(".ct img.avatar").attr("src", data.avatarUrl);
                }
                //钱包余额
                if (data.walletBalance != null && data.walletBalance != 0) {
                    $(".span .green").text(currency + data.walletBalance.toFixed(2));
                } else {
                    $(".span .green").text(currency + "0.00");
                }
                //总资产
                if (data.totalAssets != null && data.totalAssets != 0) {
                    $(".span .orange").text(currency + data.totalAssets.toFixed(2));
                } else {
                    $(".span .orange").text(currency + "0.00");
                }
                //正在处理中取款金额
                if (data.withdrawAmount != null && data.withdrawAmount != 0) {
                    $(".withdrawAmount").text(window.top.message.my_auto['处理中'] + ":" + currency + data.withdrawAmount);
                } else {
                    $(".withdrawAmount").text("");
                }
                //计算近7日收益（优惠金额）
                if (data.preferentialAmount != null && data.preferentialAmount != 0) {
                    $(".preferentialAmount").text(window.top.message.my_auto['近7日收益'] + ":" + currency + data.preferentialAmount);
                } else {
                    $(".preferentialAmount").text("");
                }
                //推荐好友,昨日收益
                if (data.recomdAmount != null && data.recomdAmount != 0) {
                    $(".recomdAmount").text(window.top.message.my_auto['昨日收益'] + ":" + currency + data.recomdAmount);
                } else {
                    $(".recomdAmount").text("");
                }
                //系统消息-未读数量
                if (data.unReadCount != null && data.unReadCount != 0) {
                    $(".unReadCount").text(data.unReadCount);
                } else {
                    $(".unReadCount").hide();
                }
                //银行卡信息
                if (data.bankcard) {
                    /*$("#bankImg").addClass("pay-bank s " + data.bankcard.bankName);
                     $("#bankImg").text(data.bankcard.bankcardNumber);*/
                }
                //比特币
                if (data.btcNum) {
                    $("#btcNumber").text(data.btcNum);
                }
                //正在处理中转账金额,额度转换
                if (data.transferAmount != null && data.transferAmount != 0) {
                    $("#transferAmount").html(window.top.message.my_auto['处理中'] + ":" + currency + data.transferAmount);
                } else {
                    $("#transferAmount").html("");
                }
            }
        }
    };
    muiAjax(option);
}

$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['.mui-off-canvas-left']
    };
    muiInit(options);
    userInfo();
});
