/**
 * Created by bruce on 16-12-10.
 */
define(['site/deposit/BaseCompanyDeposit','clipboard'], function (BaseCompanyDeposit,Clipboard) {
    return BaseCompanyDeposit.extend({

        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector || "#confirmCompanyForm";
            this._super(this.formSelector);
        },

        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
            // this.bindRechargeAmount();
            mui.ready(function () {
                //存款类型
                var typePick = new mui.PopPicker();
                var typeList = document.getElementById('rechargeTypeJson').value;
                typePick.setData(JSON.parse(typeList));
                var selectType = document.getElementById('rechargeType');
                selectType.addEventListener('tap', function (event) {
                    typePick.show(function (items) {
                        var value = items[0].value;
                        document.getElementById('result.rechargeType').value = value;
                        document.getElementById("rechargeTypeText").innerHTML = items[0].text;
                        //柜台现金存款需填写交易地点，其他填写存款人
                        if (value == 'atm_money') {
                            document.getElementById('address').style.display="block";
                            document.getElementById('payerName').style.display="none";
                        } else {
                            document.getElementById('address').style.display="none";
                            document.getElementById('payerName').style.display="block";
                        }

                    });
                }, false);
            });
        },

        bindEvent: function () {
            this._super();

            var options = {
                type:"company_deposit",
                submitUrl:"/wallet/deposit/company/submit.html",
                depositUrl:"/wallet/deposit/company/deposit.html"
            };
            this.submit(options);
            this.copy();
            this.os = this.whatOs();
            if(this.os == 'android') {
                window.addEventListener("resize", function() {
                    if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
                        window.setTimeout(function() {
                            document.activeElement.scrollIntoViewIfNeeded();
                        },0);
                    }
                })
            }
        },
        //按钮复制功能
        copy :function () {
            var _this = this;
            var clipboard = new Clipboard('.copy');
            clipboard.on('success',function (e) {
                _this.toast(window.top.message.deposit_auto['复制成功']);
            });

            clipboard.on('error', function(e) {
                _this.toast("复制按钮不可用，请长按文字手动复制信息");
            });
        }
    });
});