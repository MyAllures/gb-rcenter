function MSitePopUp() {}

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
    }
};

/**
 * 弹框消息提示
 * @param msg
 */
function showDialog(opt) {
    layerDialogNormal(opt.message, opt.title, 'layui-layer-brand', ['360px']);
}
