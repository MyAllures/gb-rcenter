/**
 * Created by eagle on 15-10-30.
 */

define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
            this.initCaptcha();
            var times = $("#7f1a3d0c-f15e-4e7a-8836-fc7182298af9").val();
            if (times < 4) {
                this.showCode(times);
            }
        },

        bindEvent: function () {
            this._super();
        },

        query:function(e) {
            window.top.topPage.closeDialog();
            window.top.topPage.ajax({
                url:root+"/personInfo/index.html",
                type:"POST",

                success:function(data) {
                    $("#mainFrame",window.top.document).html(data);
                    window.top.topPage.bindButtonEvents(page,window.top.document);
                    $(e.currentTarget).unlock();
                },

                error:function(data) {
                    $(e.currentTarget).unlock();
                }
            })
        },

        saveCallbak:function (e,options) {

            $("#editForm").find(".successsmall").remove();

            window.location.reload();

            /*var _this=this;
            var result = options.data;
            var PrivilegeStatusEnum = {ALLOW_ACCESS:100,LOCKED:99,WRONG_VALICODE:97};
            if (result.stateCode == PrivilegeStatusEnum.ALLOW_ACCESS) {
                _this.returnValue=true;
                _this.closePage();
            } else if (result.stateCode == PrivilegeStatusEnum.LOCKED) {
                location.href = root + "/personInfo/password/toUpdateSecurityPassword.html";
            } else {
                $(window.top.topPage.getCurrentForm(e))[0].reset();
                _this.refreshCode();
                if (result.leftTimes < 4) {
                    _this.showCode(result.leftTimes);
                }
            }
            $(e.currentTarget).unlock();
            return false;*/
        },
        
        showCode:function (times) {
            var _this=this;
            $('[name=flag]').val(true);
            $('#privilegeTipDiv span:last').text(times);
            $('#privilegeTipDiv').removeClass('hide');
            $('#privilegeTipDiv').show();
            setTimeout(function () {
                _this.resizeDialog();
            },100);
        },

        /**
         * 刷新
         */
        refreshCode: function () {
            var url = null;
            var img = $('#privilegeTipDiv img');
            if (!url) {
                url = $(img).attr('src');
            }
            $(img).attr('src', url + '?t=' + Math.random());
            $(this.formSelector+" input[name='code']").val("");
            $('#privilegeTipDiv a').unlock();
        },

    });
});
