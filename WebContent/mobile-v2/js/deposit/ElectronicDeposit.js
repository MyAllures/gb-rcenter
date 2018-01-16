/**
 * Created by bruce on 16-12-11.
 */
define(['site/deposit/BaseCompanyDeposit'], function (BaseCompanyDeposit) {
    return BaseCompanyDeposit.extend({

        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector || "#electronicForm";
            this._super();
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
            this.bindFormValidation();
            // this.bindRechargeAmount();

            if($("#imgQrCodeUrl").val()) {
                document.getElementById("saveImage").addEventListener("tap", function (e) {
                    var href = $(this).attr("url");
                    if (_this.os == "app_android") {
                        window.gamebox.saveImage(href);
                    } else if (_this.os == 'app_ios') {
                        gotoPay(href);
                        _this.toast(window.top.message.deposit_auto['请截屏再扫描二维码']);
                    } else {
                        if (/.(gif|jpg|jpeg|png)$/.test(href)) {
                            var a = document.createElement('a');
                            a.href = href;
                            a.download = href;
                            a.click();
                        }
                    }
                })
            }
        },

        bindEvent: function () {
            this._super();

            var type = $("input[name='result.rechargeType']").val();
            var options = {
                type:type,
                submitUrl:"/wallet/deposit/company/electronic/submit.html",
                depositUrl:"/wallet/deposit/company/electronic/deposit.html"
            };
            this.submit(options);
        }
    });

});
