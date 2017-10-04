define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({
        init: function () {
            this._super();
        },
        /**
         * 绑定事件
         */
        bindEvent: function () {
            this.formSelector = "form[name=bankcardForm]";
            this._super(this.formSelector);
            this.submit();
        },
        /**
         * 页面加载
         */
        onPageLoad: function () {
            this._super();
            this.getBankList();
            this.bindFormValidation();
        },
        /**
         * 获取银行列表
         */
        getBankList: function () {
            mui.ajax(root + '/bankCard/bankList.html', {
                dataType: 'json',
                type: 'post',
                async: true,
                success: function (data) {
                    var userPicker = new mui.PopPicker();
                    userPicker.setData(data);
                    var selectBank = document.getElementById("selectBank");
                    if (selectBank != null) {
                        selectBank.addEventListener('tap', function (event) {
                            userPicker.show(function (items) {
                                document.getElementById("bankLabel").innerHTML = items[0].text;
                                $("input[name='result.bankName']")[0].defaultValue = items[0].value;
                            });
                        })
                    }

                }
            });
        },
        /**
         * 保存银行卡
         */
        submit: function () {
            var _this = this;
            mui("body").on("tap", "#submitBankCard", function () {
                var $submit = $("#submitBankCard");
                var $form = $(_this.formSelector);
                if (!$form.valid()) {
                    return false;
                }
                $submit.attr("disabled", true);
                var data = $form.serialize();
                mui.ajax(root + '/fund/userBankcard/submitBankCard.html?userType=24', {
                    dataType: 'json',
                    data: data,
                    type: 'post',
                    async: true,
                    beforeSend: function () {
                        window.top.pd.show();
                    },
                    success: function (data) {
                        $submit.attr("disabled", false);
                        if (data.state) {
                            _this.toast(data.msg);
                            setTimeout(function () {
                                if (data.action == 'withdraw') {
                                    var _href = root + '/wallet/withdraw/index.html';
                                    if (os == 'android') {
                                        window.gamebox.finish();
                                    } else if (os == 'app_ios') {
                                        _this.goBack();
                                    } else {
                                        _this.gotoUrl(_href);
                                    }
                                } else {
                                    if (os == 'android')
                                        window.history.go(-1);
                                    else if (os == 'app_ios')
                                        _this.goBack();
                                    else
                                        mui.back();
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
            });
        }
    })
});