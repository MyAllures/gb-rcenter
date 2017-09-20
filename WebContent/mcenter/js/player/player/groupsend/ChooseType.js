/**
 * Created by cj on 15-7-8.
 */
define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        formSelector:"#chooseType_btn",
        playerLabelSelector:".groupSend_",
        init: function () {
            this._super();
            //this.resizeDialog(); /
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },
        checkChannel: function (e) {
            var _this = this;
            window.top.topPage.showWarningMessage(window.top.message.player_auto['您还未设置设置短信']);
            return true;
        },
        returnPage: function (e) {
            if(e.returnValue=="setEmailInterface"){
                window.top.topPage.closeDialog();
                this.returnValue = "returnPage";
            }else{
                window.top.topPage.closeDialog();
            }
        }
    })
});