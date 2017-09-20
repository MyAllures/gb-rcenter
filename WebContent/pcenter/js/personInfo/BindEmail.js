/**
 * Created by bruce on 16-6-19.
 */
define(['site/personInfo/BasePersonInfo'], function(BasePersonInfo) {

    return BasePersonInfo.extend({

        init: function (title) {
            this._super();
        },

        onPageLoad: function (e,option) {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },
        
        /**
         * 邮箱验证下一步
         * @param e
         */
        updateEmailNext:function(e) {
            var emailCode = $("#verificationCode").val();
            var email = $("#emailCode").val();
            var _this = this;
            window.top.topPage.ajax({
                type: "GET",
                url: root+'/personInfo/updateEmailCodeNext.html',
                data:{"emailCode":emailCode,"email":email},
                success: function(data) {
                    var datas = eval('('+data+')');
                    if(!datas.state) {
                        window.top.topPage.showWarningMessage(datas.msg);
                        return;
                    } else {
                        window.top.topPage.ajax({
                            type: "post",
                            url: root+'/personInfo/toBindEmail2.html',
                            success: function(data) {
                                $("#editForm").html(data);
                                _this.bindFormValidation();
                                //邮箱下拉
                                $(".inputMailList").mailAutoComplete();
                                clearTimeout(_this.timer);
                                _this.delayTime = 100;
                            },
                            error: function(data) {
                                $(e.currentTarget).unlock();
                            }
                        });
                    }
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 回调刷新账号设置页面
         * 此处回调如果碰上需要弹窗安全密码框(页面加载可能会空白)可以使用$(".sidebar-nav a[data='/personInfo/index.html']"，window.top.document).click();
         * @param e
         * @param options
         */
        mySaveCallBack:function(e,options){
            var _this = this;
            _this.closePage();
            var url = root+'/personInfo/index.html';
            window.top.topPage.ajax({
                type: "POST",
                url: url,
                success: function(data) {
                    $("#mainFrame",window.top.document).html(data);
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

    });
});