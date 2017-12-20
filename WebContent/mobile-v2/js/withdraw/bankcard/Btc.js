define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({
        init: function () {
            this._super();
        },
        /**
         * 绑定事件
         */
        bindEvent: function () {
            this.formSelector = "form[name=btcForm]";
            this._super(this.formSelector);
            this.submit();
            this.reset();
            this.bindBtn();
            this.cancelBtn();
        },
        /**
         * 页面加载
         */
        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
        },
        submit: function () {
            var _this = this;
            mui("body").on("tap", "#bindBtc", function () {
                var $form = $(_this.formSelector);
                if (!$form.valid()) {
                    return false;
                }
                var btnNum = $("input[name='result.bankcardNumber']").val();
                var html = '<div class="masker darker" style="display: block;"></div>' +
                    '<div class="gb-bindcard-box bit_addr" style="display: block;">' +
                    '<span class="close mui-icon mui-icon-closeempty"></span>' +
                    '<div class="cont"><div class="tit">确认提交吗?</div>' +
                    '<div class="bit_addr_txt">比特币钱包地址:</div>' +
                    '<div class="bit_addr_code">' + btnNum + '</div>' +
                    '<div class="btn_wrap"><div class="mui-col-xs-6 mui-pull-left"><a class="mui-btn btn_cancel" id="cancelBtn">取消</a></div>' +
                    '<div class="mui-col-xs-6 mui-pull-left"><a class="mui-btn btn_submit" id="bindBtn">提交</a></div>' +
                    '</div></div></div>';
                if ($(".bit_addr").length > 0) {
                    $(".bit_addr").remove();
                }
                $(".mui-content").append(html);
            })
        },
        bindBtn: function () {
            var _this = this;
            mui("body").on("tap", "a#bindBtn", function () {
                _this.submitBtc(_this);
            })
        },
        cancelBtn: function () {
            mui('body').on("tap", "a#cancelBtn", function () {
                $(".bit_addr").remove();
                $(".masker").remove();
            });
        },
        /**
         * 绑定比特币地址
         */
        submitBtc: function (_this) {
            var $submit = $("#bindBtc");
            $submit.attr("disabled", true);
            mui.ajax(root + '/fund/userBankcard/submitBtc.html?userType=24', {
                dataType: 'json',
                data: $("form[name=btcForm]").serialize(),
                type: 'post',
                async: true,
                beforeSend: function () {
                    $(".bit_addr").remove();
                    $(".masker").remove();
                    window.top.pd.show();
                },
                success: function (data) {
                    $submit.attr("disabled", false);
                    if (data.state) {
                        _this.toast(data.msg);
                        setTimeout(function () {
                            if (data.action == 'withdraw') {
                                var _href = root + '/wallet/withdraw/index.html';
                                if (os == 'android' || os == 'app_android') {
                                    window.gamebox.finishActivity();
                                } else {
                                    _this.gotoUrl(_href);
                                }
                            } else {
                                if (os == 'android' || os == 'app_android') {
                                    //window.history.go(-1);
                                    window.gamebox.finishActivity();
                                } else if (os == 'app_ios') {
                                    goBack();
                                } else {
                                    mui.back();
                                }
                            }

                        }, 1000);
                    } else {
                        _this.toast(data.msg);
                        $(document).find("input[name='gb.token']").val(data.token);
                    }
                },
                error: function (xhr, type, errorThrown) {
                    if (xhr.status == 608) {
                        mui.alert(window.top.message.my_auto['请勿重复提交']);
                    }
                    $submit.attr("disabled", false);
                },
                complete: function () {
                    window.top.pd.hide();
                }
            });
        },
        /**
         * 重置
         */
        reset: function () {
            mui("body").on("tap", ".btn_reset", function () {
                $("input[name='result.bankcardNumber']").val("");
            })
        }
    });
});