define(['bootstrap-dialog', 'jsrender'], function (BootstrapDialog, jsrender) {
    return Class.extend({
        init: function () {
            this.bindEvent();
            this.myProfit();
        },
        onPageLoad: function () {

        },
        bindEvent: function () {
            var _this = this;
            /**
             * 查看我的盈利
             */
            $("#topSecurity").on("click", "a#myProfit", function () {
                _this.myProfit();
            });
        },
        myProfit: function () {
            var isOpen = $("#topSecurity").hasClass("open");
            if (!isOpen) {
                window.top.topPage.ajax({
                    url: root + "/index/profitLimit.html",
                    dataType: 'json',
                    success: function (data) {
                        if (data.isMaster == true) {
                            var profitLimit = data.profitLimit;
                            var profit = data.profit;
                            var transferLimit = data.transferLimit;
                            var currentProfit = data.currentProfit;
                            $("#topSecurity").find("#profitLimit").text(profitLimit);
                            $("#topSecurity").find("#curProfit").text(profit);
                            $("#topSecurity").find("#transferLimit").text(transferLimit);
                            $("#topSecurity").find("#currentProfit").text(currentProfit);
                            var percent = 0;
                            var tranferPercent = 0;
                            if (profitLimit > 0) {
                                percent = Math.floor(profit / profitLimit * 100);
                            }
                            if (transferLimit > 0){
                                tranferPercent = Math.floor(currentProfit / transferLimit * 100);
                            }
                            $("#topSecurity").find("#usePercent").text(percent + '%');
                            $("#topSecurity").find("#currentUsePercent").text(tranferPercent + '%');
                            //1-79 safe
                            var className = "safety";
                            if (percent >= 80 && percent < 95) {
                                className = "slight";
                            } else if (percent >= 95 && percent < 100) {
                                className = "medium";
                            } else if (percent >= 100) {
                                className = "risk";
                            }
                            console.log("profit class:" + className);
                            $("#topSecurity").removeClass("safety");
                            $("#topSecurity").removeClass("slight");
                            $("#topSecurity").removeClass("medium");
                            $("#topSecurity").removeClass("risk");
                            $("#topSecurity").addClass(className);
                            $("#topSecurity").show();
                        }
                    }
                });
            }
        }
    });

});
