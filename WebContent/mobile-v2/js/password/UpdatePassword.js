define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({
        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector ||"#updatePwdForm";
            this._super(this.formSelector);
            mui.init({});
        },
        onPageLoad: function () {
            this._super();
            mui('.mui-scroll-wrapper').scroll();
            this.bindFormValidation();

            this.initCaptcha();
            var times = $("#remainTimes").val();
            if (times < 4) {
                this.showCode(times);
            }
        },

        bindEvent : function(){
            this._super();
            var _this=this;
            mui("body").on("tap","#updatePwd",function (e) {
                var $form = $(_this.formSelector);
                if (!$form.valid()) {
                    return false;
                }
                $("#updatePwd").attr("disabled","disabled");
                mui.ajax({
                    url:root + "/my/password/updatePassword.html",
                    type:"POST",
                    data: {
                        "password":$("#password").val(),
                        "newPassword":$("#newPassword").val(),
                        "newRePassword":$("#confirmPassword").val(),
                        "code":$("#code").val()
                    },

                    success:function (data) {
                        var datas = eval("("+data+")");
                        if (datas.state) {
                            _this.toast(datas.msg);
                            setTimeout(function () {
                                if(os == 'android'){
                                    window.gamebox.finish();
                                }else if(os == 'app_ios'){
                                    goBack();
                                }else {
                                    mui.back();
                                }
                            },800);

                        } else {
                            _this.toast(datas.msg);
                            _this.saveCallbak(datas);
                        }
                    },

                    error:function (data) {
                        _this.toast(window.top.message.passport_auto['服务忙']);
                    }
                })
            }).on("tap",".captcha_img",function() {
                _this.refreshCode();
            });
        },

        showCode:function (times) {
            var _this=this;
            $('[name=flag]').val(true);
            $('#privilegeMsg span:last').text(times);
            $('#privilegeMsg').show();
            $('#privilegeTipDiv').show();
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
            $(img).attr('src', url);
            $("form"+" input[name='code']").val("");
        },

        saveCallbak:function (result) {
            var _this=this;
            var PrivilegeStatusEnum = {ALLOW_ACCESS:100,LOCKED:99};
            if (result.stateCode == PrivilegeStatusEnum.ALLOW_ACCESS || result.stateCode == PrivilegeStatusEnum.LOCKED) {
                mui.back;
            } else {
                $(_this.formSelector)[0].reset();
                if (result.remainTimes < 4) {
                    _this.refreshCode();
                    _this.showCode(result.remainTimes);
                }
            }
            return false;
        }
    })
});

