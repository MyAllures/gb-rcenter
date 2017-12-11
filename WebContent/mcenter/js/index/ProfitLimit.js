define(['bootstrap-dialog', 'jsrender'], function (BootstrapDialog, jsrender) {
    return Class.extend({
        init: function () {
            this.bindEvent();
            this.myProfit();
            this.profitLimitDialog();
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
                _this.profitLimitDialog();
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
                            $("#topSecurity").find("#curProfit").text(data.profitCur);
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
        },
        /**
         * 登录-额度上限弹窗
         */
        profitLimitDialog: function () {
            var isOpen = $("#topSecurity").hasClass("open");
            if (!isOpen){
                window.top.topPage.ajax({
                    url: root + "/index/profitLimitDialog.html",
                    dataType: 'json',
                    success: function (data) {
                        var profit = data.profit;
                        var profitLimit = data.profitLimit;
                        var time = data.leftTime;
                        var countDown = window.top.message.setting_auto['倒计时'];
                        var tips = window.top.message.setting_auto['tips'];
                        var times = window.top.message.setting_auto['times'];
                        sessionStorage.setItem("minutes",time);
                        var percent = 0;
                        if (profitLimit > 0){
                            percent = Math.floor(profit / profitLimit * 100);
                        }
                        if (percent >= 100 && time > 0){
                            var msg = window.top.message.setting_auto['profitWarning'];
                            if (time >= 0){
                                var hour = Math.floor(time / 3600);
                                time = time - hour * 3600;
                                var minute = Math.floor(time / 60);
                                var second = time - minute * 60;
                                if (minute < 10) {
                                    minute = '0' + minute;
                                }
                                if (second < 10) {
                                    second = '0' + second;
                                }
                            }else {
                                var hour = 0;
                                var minute = 0;
                                var second = 0;
                            }
                            var html = '<div class="msg msg-warning al-center"><div class="msg-description ft-bold">'+msg+'</div></div>'+
                                '<div class="clearfix m-md al-center"><div><font class="fs20">'+countDown+'</font>' +
                                '<span class="fs30 co-red" id="leftTime" data-time="${leftTime}"><span id="hourss">'+hour+'</span>'+":"+'' +
                                '<span id="minutess">'+minute+'</span>'+":"+'<span id="secondss">'+second+'</span></span></div>' +
                                '<div class="al-center co-grayc2">'+times+'</div></div>'
                                +'<div class="clearfix m-md">'+tips+'</div>';
                            var dialog = BootstrapDialog.show({
                                title: window.top.message.setting_auto['消息'],
                                message: html,
                                buttons: [{
                                    label: window.top.message.setting_auto['去充值'],
                                    action: function (dialog) {
                                        dialog.close();
                                        $("#mainFrame").load(root + "/credit/pay/pay.html");
                                    }
                                }, {
                                    label: window.top.message.setting_auto['取消'],
                                    cssClass: 'btn-primary',
                                    action: function (dialog) {
                                        dialog.close();
                                    }
                                }],
                                onhidden: function (dialog) {
                                    dialog.close();
                                }
                            });
                                window.top.popUp.showLeftTime();
                                var interval = setInterval(function () {
                                    window.top.popUp.showLeftTime(interval)
                                }, 1000);

                        }else if (time < 0){
                            var sites = window.top.message.setting_auto['sites'];
                            var quota = window.top.message.setting_auto['quota'];
                            var html = '<div class="msg msg-warning al-center"><div class="msg-description">'+sites+'</div></div>'+
                                '<div class="clearfix m-md">'+quota+'</div>';
                            var dialog = BootstrapDialog.show({
                                title: window.top.message.setting_auto['消息'],
                                message: html,
                                buttons: [{
                                    label: window.top.message.setting_auto['去充值'],
                                    action: function (dialog) {
                                        dialog.close();
                                        $("#mainFrame").load(root + "/credit/pay/pay.html");
                                    }
                                }, {
                                    label: window.top.message.setting_auto['取消'],
                                    cssClass: 'btn-primary',
                                    action: function (dialog) {
                                        dialog.close();
                                    }
                                }],
                            })
                        }else if (percent >= 100){
                            var profitWarning = window.top.message.setting_auto['profitWarning'];
                            var information = window.top.message.setting_auto['information'];
                            var html = '<div class="msg msg-warning al-center"><div class="msg-description">'+profitWarning+'</div></div>' +
                                '<div class="clearfix m-md">'+information+'</div>';
                            var dialog = BootstrapDialog.show({
                                title: window.top.message.setting_auto['消息'],
                                message: html,
                                buttons: [{
                                    label: window.top.message.setting_auto['去充值'],
                                    action: function (dialog) {
                                        dialog.close();
                                        $("#mainFrame").load(root + "/credit/pay/pay.html");
                                    }
                                }, {
                                    label: window.top.message.setting_auto['取消'],
                                    cssClass: 'btn-primary',
                                    action: function (dialog) {
                                        dialog.close();
                                    }
                                }],
                            })
                        }
                    }
                })
            }
        },
        showLeftTime: function (interval) {
            var time = sessionStorage.getItem("minutes");
            if (time < 0 && interval) {
                window.clearInterval(interval);
                return;
            }
            var tmpTime = Number(time);
            var hour = Math.floor(tmpTime / 3600);
            tmpTime = tmpTime - hour * 3600;
            var minute = Math.floor(tmpTime / 60);
            var second = tmpTime - minute * 60;
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            $("span#hourss").text(hour);
            $("span#minutess").text(minute);
            $("span#secondss").text(second);
            sessionStorage.setItem("minutes",--time);
        }
    });

});
