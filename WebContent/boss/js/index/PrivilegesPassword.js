/**
 * Created by eagle on 15-12-4.
 */

define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({

        init:function() {
            this._super();
            this.permissionPwdExistence();
        },

        onPageLoad: function () {
            this._super();
        },
        //判断权限密码是否已设置，未设置时弹窗设置框
        permissionPwdExistence: function () {
            var _this=this;
            window.top.topPage.ajax({
                url: root + '/index/permissionPwdExistence.html',
                dataType: "json",
                async:false,
                success: function (data) {
                    if(data){
                        window.top.topPage.doDialog({page:this},{text:window.top.message.privilege['privilege.setpermissionPwd'],target: root + "/index/AddPrivilegesPassword.html",callback:""});
                    }
                }
            })
        }
    });

});
