/**
 * Created by eagle on 15-10-29.
 */

define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this._super();
        },

        onPageLoad: function (e,option) {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },

        updatePwd:function(e) {

            window.top.topPage.ajax({
                type: "POST",
                url: root + "/personInfo/index.html",
                success: function(data) {
                    $("#mainFrame").html(data);
                    //弹窗修改密码框
                    window.top.topPage.doDialog(e,{
                        text: window.top.message.personInfo_auto['修改登录密码'],
                        target: root + "/personInfo/password/editPassword.html",
                        closable: true
                    });

                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });



        }

    });
});