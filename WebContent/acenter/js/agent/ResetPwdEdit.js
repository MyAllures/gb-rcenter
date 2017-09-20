/**
 * Created by jeff on 15-7-9.
 */
///resetPwdByHandConfirm
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({

        init : function() {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },
        /**
         * 重置密码确认弹出窗
         * @param e
         * @param opt
         */
        resetPwdByHandConfirm:function(e,opt){
            var that = this;
            var confirmMessage = '';
            if($('#isLogin').val()=='true'){
                confirmMessage = window.top.message.agent['resetUserpwdByHandConfirm'].replace('{userName}',$("#userName").val()).replace("{resetTypeName}",$("#resetTypeName").val());
            }else{
                confirmMessage = window.top.message.agent['resetUserPwdByMailLoginConfirm'].replace('{userName}',$("#userName").val()).replace("{resetTypeName}",$("#resetTypeName").val());
            }
            window.top.topPage.showConfirmMessage(confirmMessage,function(boo){
                if(boo){
                    that.resetPwd(e,opt);
                }else{
                    that.closePage();
                }
            });
            $(e.currentTarget).unlock();
        },
        resetPwd:function(e,opt){
            var that = this;
            window.top.topPage.ajax({
                type: "POST",
                url: root+"/player/resetPwd/doRestUserPwdByHand.html",
                data:$(that.formSelector).serialize(),
                error: function (request) {
                    $(e.target).unlock();
                },
                success: function (data) {
                    that.closePage();
                    $(e.target).unlock();
                }
            });
        }

    })
})