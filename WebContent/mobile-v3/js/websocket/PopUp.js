function MSitePopUp() {
}

MSitePopUp.prototype = {

    dialogCallBack: function (data) {
        var dataObj = $.parseJSON(data);
        console.info("订阅类型为" + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + data);
        var msgBody = dataObj.msgBody;
        var content = msgBody.content;
        var title = msgBody.title;
        var opt = {
            title: title,
            message: content
        };
        showDialog(opt);
    },
    depositResultCallBack: function (data) {
        var dataObj = $.parseJSON(data);
        console.info("订阅类型为" + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + data);
        var btnArray = [window.top.message.deposit_auto["查看明细"], window.top.message.deposit_auto["个人中心"]];
        var options = {
            title: window.top.message.deposit_auto["订单结果"],
            confirm: ''
        };
        mui.confirm(options.confirm, options.title, btnArray, function (e) {
            if (e.index == 0) {
                goToUrl(root + "/fund/record/index.html?search.transactionType=deposit");
            } else {
                goToUrl(root + "/mine/index.html?channel=mine&skip=4");
            }
        });
    },

    messageCallBack: function (data) {
        var dataObj = $.parseJSON(data);
        console.info("订阅类型为" + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + data);
    }

};

/**
 * 弹框消息提示
 * @param msg
 */
function showDialog(opt) {
    showWarningMsg(opt.title, opt.message, null, null);
}
