/**
 * Created by eagle on 15-10-30.
 */

define(['common/BaseEditPage','common/PasswordLevel'], function(BaseEditPage,PasswordLevel) {

    return BaseEditPage.extend({
        passwordLevel:null,

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
            this.passwordLevel = new PasswordLevel();
            this.initCaptcha();
            var times = $("#remainTimes").val();
            if (times < 4) {
                this.showCode(times);
            }
        },

        bindEvent: function () {
            this._super();
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

        saveCallbak:function (e,options) {

            $("#editForm").find(".successsmall").remove();

            window.location.reload();

            /*var _this=this;
            var result = options.data;
            var PrivilegeStatusEnum = {ALLOW_ACCESS:100,LOCKED:99};
            if (result.stateCode == PrivilegeStatusEnum.ALLOW_ACCESS || result.stateCode == PrivilegeStatusEnum.LOCKED) {
                _this.returnValue=true;
                _this.closePage();
            } else {
                $(window.top.topPage.getCurrentForm(e))[0].reset();
                var $elem = $("._password_level").find("em");
                $elem.removeClass("passafegreen");
                $elem.removeClass("passafered");
                if (result.remainTimes < 4) {
                    _this.refreshCode();
                    _this.showCode(result.remainTimes);
                }
            }
            $(e.currentTarget).unlock();
            return false;*/
        },


    });
});
