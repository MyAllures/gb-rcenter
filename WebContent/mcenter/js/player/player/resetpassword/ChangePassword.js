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
            var isOnLine = $("[name=isOnLine]").val();
            var confirmMessage = null;
            if(isOnLine=="true"){
                confirmMessage = window.top.message.playerResetPwd['resetByHandConfirm'].replace('{userName}',$("#userName").val()).replace("{resetTypeName}",$("#resetTypeName").val());
            }else{
                confirmMessage = window.top.message.playerResetPwd['logoff_ResetByHandConfirm'].replace('{userName}',$("#userName").val());
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
                url: root+"/player/resetPwd/toResetPwdByHand.html",
                data:$(that.formSelector).serialize(),
                error: function (request) {
                    $(e.target).unlock();
                },
                success: function (data) {
                    var _data = JSON.parse(data);
                    if(_data.state){
                        if(_data.mailstate==null||_data.mailstate){
                            window.top.topPage.showSuccessMessage(window.top.message.common['update.success'], function(){
                                window.top.topPage.closeDialog();
                            });
                        }else{
                            window.top.topPage.showSuccessMessage(window.top.message.player_auto['密码修改成功'], function(){
                                window.top.topPage.closeDialog();
                            });
                        }

                    }else{
                        window.top.topPage.showErrorMessage(window.top.message.common['update.failed'], function(){
                            window.top.topPage.closeDialog();
                        });
                    }
                    $(e.target).unlock();
                }
            });
        }

    })
})