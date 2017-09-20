define(['common/BasePage'], function(BasePage) {

    return BasePage.extend({
        userName : $('#userName').val(),
        resetTypeName : $('#resetTypeName').val(),
        init : function() {
            this.formSelector = "#resetPwd";
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },
        userHasNoEmail:function( event ,option){
            var that = this;
            var warningMessage = window.top.message.agent['userHasNoMail'].replace('{resetTypeName}',that.resetTypeName);
            window.top.topPage.showWarningMessage(warningMessage);
            $(event.currentTarget).unlock();
        },
        /**
         * 根据类别重置密码
         */
        resetPwd:function(e,opt){
            var $btn = $(e.currentTarget);
            try{

            }catch(e){
                $btn.unlock();
            }
        },
        /**
         *
         * 重置密码 confirm
         * 取消 关闭弹窗,确定 执行resetpwd重置密码。
         *
         */
        resetPwdLoginConfirm:function(e,opt){
            var $btn = $(e.currentTarget);
            try{
                var that = this;
                var sw = window;
                var confirmMessage = window.top.message.agent['resetUserPwdByMailLoginConfirm'].replace('{userName}',that.userName).replace('{resetTypeName}',that.resetTypeName);
                window.top.topPage.showConfirmMessage(confirmMessage,function(boo){
                    if(boo){
                        that.resetPwd(e,opt);
                    }else{
                        var ba = (sw === window);
                        that.closePage();
                    }
                });
            }catch(e){
                $btn.unlock();
            }
        },
        resetPwdByEmailConfirm:function( event , option ){
            var confirmMessage = option.confirmMessage;
            var that = this;
            var topPage = window.top.topPage;
            topPage.showConfirmMessage(confirmMessage,function(b){
                if(b){
                    option.target = option.ajaxTarget
                    topPage.ajax({
                        url:root+"/player/resetPwd/doRestUserPwdByHand.html",
                        data:{
                            userId:$("#userId").val(),
                            resetType:$("#resetType").val()
                        },
                        success:function(data){
                            if(data === 'true' || data === true){
                                topPage.showInfoMessage(window.top.message.common['send.success'],function(){
                                    that.closePage();
                                });
                            }
                        }
                    });
                }else{
                    //that.returnValue = '';
                    that.closePage();
                }
            });
            $(event.currentTarget).unlock();
        },
        resetPwdCallback:function( event , option ){
            //if(event.returnValue);
            this.closePage();
        }
    });

});