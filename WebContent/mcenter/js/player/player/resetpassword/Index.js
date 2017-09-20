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
        playerHasNoEmail:function( event ,option){
        //    该玩家未验证邮箱，请选择其他方式重置登录密码
            var that = this;
            var warningMessage = window.top.message.playerResetPwd['playerHasNoMail'].replace('{resetTypeName}',that.resetTypeName);
            window.top.topPage.showWarningMessage(warningMessage);
            $(event.currentTarget).unlock();
        },
        /**
         * 根据类别重置密码
         */
        resetPwd:function(e,opt){
            var $btn = $(e.currentTarget);
            try{
                window.top.topPage.ajax({
                    url:root+"/player/resetPwd/sendByEmail.html",
                    data:{
                        userId:$("#userId").val()
                    },
                    dataType:'json',
                    success:function(data){
                        if(data.state){
                            window.top.topPage.showSuccessMessage("发送成功！",function(){
                                that.closePage();
                            });
                        }else{
                            window.top.topPage.showErrorMessage(window.top.message.player_auto['发送失败']);
                        }
                    }
                });
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
            var online = this.checkOnline();
            if(online){
                var $btn = $(e.currentTarget);
                try{
                    var that = this;
                    var sw = window;
                    var confirmMessage = window.top.message.playerResetPwd['resetPwdByMailLoginConfirm'].replace('{userName}',that.userName).replace('{resetTypeName}',that.resetTypeName);
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
            }else{
                //${fn:replace(fn:replace(views.role['resetPwdByMailNotLoginConfirm'],'{userName}' ,resetPwdVo.result.username ),'{resetTypeName}',resetTypeName)}

                var userName = $("#userName").val();
                var resetTypeName = $("#resetTypeName").val();
                var confirmMessage = window.top.message.player_auto['确认向玩家'].replace("[0]",userName).replace("[1]",resetTypeName);
                this.saveResetPwd(confirmMessage);
            }
            /*

            */
        },

        checkOnline: function () {
            var userId = $("#userId").val();
            var online = false;
            window.top.topPage.ajax({
                url:root+"/player/resetPwd/isOnline.html",
                data:{
                    userId:$("#userId").val()
                },
                async:false,
                dataType:'json',
                success:function(data){
                    if(data.state){
                        online = true;
                    }
                }
            });
            return online;
        },
        resetPwdByEmailConfirm:function( event , option ){
            var confirmMessage = option.confirmMessage;
            this.saveResetPwd(confirmMessage);
            $(event.currentTarget).unlock();
        },
        saveResetPwd: function (confirmMessage) {
            var that = this;
            var topPage = window.top.topPage;
            topPage.showConfirmMessage(confirmMessage,function(b){
                if(b){
                    //option.target = option.ajaxTarget
                    topPage.ajax({
                        url:root+"/player/resetPwd/toResetPwdByHand.html",
                        data:{
                            userId:$("#userId").val(),
                            resetType:$("#resetType").val()
                        },
                        dataType:'json',
                        success:function(data){
                            if(data.state){
                                topPage.showSuccessMessage(window.top.message.player_auto['发送失败'],function(){
                                    that.closePage();
                                });
                            }else{
                                topPage.showErrorMessage(window.top.message.player_auto['发送失败']);
                            }
                        }
                    });
                }else{
                    that.closePage();
                }
            });
        },

        resetPwdCallback:function( event , option ){
            //if(event.returnValue);
            this.closePage();
        },
        autoReset: function (e,opt) {
            var data = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                url: root+'/player/resetPwd/autoResetPwd.html',
                data:data,
                cache: false,
                type: "POST",
                success: function (data) {
                    $("#reset-pwd-div").hide();
                    $(".modal-body").append(data);
                    var clip = new ZeroClipboard($('a[name="copy"]'));
                    clip.on('aftercopy', function (e) {
                        e.currentTarget = e.target;
                        page.showPopover(e, {}, 'success', window.top.message.player_auto['复制成功'], true);
                    });
                    page.resizeDialog();
                }
            });
        }
    });

});