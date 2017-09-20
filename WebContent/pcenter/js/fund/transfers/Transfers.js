/**
 * 资金管理-转账js
 */
define(['common/BaseEditPage', 'Util', 'tooltips'], function (BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=transferForm]";
            this._super(this.formSelector);
            _that = this;
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

            var _this = this;
            //交换转入转出对象
            $(this.formSelector).on("click", "span.btn-exchange", function (e) {
                var transferOut = $("[name=transferOut]").val();
                var transferInto = $("[name=transferInto]").val();
                $("[name=transferOut]").val(transferInto);
                $("[name=transferInto]").val(transferOut);
                _this.transferStyle();
            });

            //转出选择对象，需相应改变转入选择对象
            $(this.formSelector).on("click", "select[name=transferOut]", function (e) {
                _this.change("transferInto");
                _this.transferStyle();
            });

            //转入选择对象，需相应改变转出选择对象
            $(this.formSelector).on("click", "select[name=transferInto]", function (e) {
                _this.change("transferOut");
                _this.transferStyle();
            });

            //显示隐藏刷新按钮
            $(this.formSelector).on("mouseenter", ".game", function (e) {
                var isHide = $('[name=isHide]').val();
                if (isHide == 0) {
                    $(this).find(".refreshApi").show();
                    $(this).find(".hs-ico").hide();
                }
            });

            $(this.formSelector).on("mouseleave", ".game", function (e) {
                var isHide = $('[name=isHide]').val();
                if (isHide == 0) {
                    $(this).find(".refreshApi").hide();
                    $(this).find(".hs-ico").show();
                }
            });

            //显示或者隐藏余额
            $(this.formSelector).on("click", "div.moneyhide", function (e) {
                _this.moneyToggle(e);
            });
        },
        onPageLoad: function () {
            this._super();
            this.loadAssets(null);
            this.loadCarousel();
            this.loadGameAnnouncement();
            $('option[name=maintain]').css({'background': '#E8ECEF'});
        },
        /**
         * 转入转出选择更换事件
         */
        change: function (obj) {
            var transferOut = $("[name=transferOut]").val();
            var transferInto = $("[name=transferInto]").val();
            if (transferOut != 'wallet' && transferInto != 'wallet') {
                $("select[name=" + obj + "]").val("wallet");
            } else if (transferOut == 'wallet' && transferInto == 'wallet' && obj == 'transferInto') {
                $("select[name=transferInto]").val($("select[name=transferInto]").children("option")[0].value);
            } else if (transferOut == 'wallet' && transferInto == 'wallet' && obj == 'transferOut') {
                $("select[name=transferOut]").val($("select[name=transferOut]").children("option")[1].value);
            }
        },
        /**
         * 更改钱包和api右上角转入转出动态效果
         */
        transferStyle: function () {
            var transferOut = $("[name=transferOut]").val();
            var transferInto = $("[name=transferInto]").val();
            $("i.arr-up").hide();
            $("i.arr-down").hide();
            $("i.arr-up").removeClass("hs-ico");
            $("i.arr-down").removeClass("hs-ico");
            if (transferOut == 'wallet') {
                $("i[name='wallet-left']").hide();
                $("i[name='wallet-right']").hide();
                if (transferInto != null && transferInto != '') {
                    $("i[name=" + transferInto + "down]").addClass("hs-ico");
                    $("i[name=" + transferInto + "down]").show();
                    $("i[name='wallet-right']").show();
                }
            } else {
                $("i[name='wallet-left']").hide();
                $("i[name='wallet-right']").hide();
                if (transferOut != null && transferOut != '') {
                    $("i[name=" + transferOut + "up]").addClass("hs-ico");
                    $("i[name=" + transferOut + "up]").show();
                    $("i[name='wallet-left']").show();
                }
            }
            $("select[name=transferOut]").valid();
            $("select[name=transferInto]").valid();
            var ele = $(this.formSelector).find("input[name='result.transferAmount']");
            $.data(ele[0], "previousValue", null);
            this.changeMsg();
            if ($(ele).val()) {
                $(ele).valid();
            }
        },
        /**
         * 转账订单提交回调
         * @param e
         * @param option
         */
        back: function (e, option) {
            var _this = this;
            var api = e.returnValue;
            if (api) {
                var _target = $(this.formSelector + " #api-game-" + api).children("[data-rel]");
                if (_target.length > 0) {
                    var _e = {currentTarget: _target, page: e.page || page};
                    var opt = eval("(" + $(_target).data('rel') + ")");
                    opt.isRefresh = true;
                    this.refreshApi(_e, opt);
                    $(".arr-right").hide();
                    $(".arr-left").hide();
                    $("i.hs-ico").hide();
                    $(".arr-down").removeClass("hs-ico");
                    $(".arr-up").removeClass("hs-ico")
                } else {
                    _this.loadAssets('t');
                }
            } else {
                _this.loadAssets('t');
            }
            _this.loadTransferPartial();
        },
        /**
         * 确认转账
         * @param e
         * @param option
         */
        transfers: function (e, option) {
            var _this = this;
            var transferOut = $("[name=transferOut]").val();
            $(e.currentTarget).text(window.top.message.fund['rechargeForm.process']);
            window.top.topPage.ajax({
                url: root + "/fund/playerTransfer/transfersMoney.html",
                data: this.getCurrentFormData(e),
                dataType: "json",
                loading: true,
                type: 'POST',
                success: function (data) {
                    $(e.currentTarget).text(window.top.message.fund['Transfer.transfer.confirmTransfer']);
                    if (data.isFreeze == true) {
                        var btnOption = {};
                        btnOption.target = root + "/share/balanceFreeze.html";
                        btnOption.text = option.text;
                        btnOption.callback = function () {
                            _this.securityPwdSetting(e, option);
                            $(e.currentTarget).text(window.top.message.fund["rechargeForm.confirmTransfer"]);
                        };
                        window.top.topPage.doDialog(e, btnOption);
                        $(e.currentTarget).unlock();
                        return;
                    } else if (data.state == false && data.msg) {
                        e.returnValue = data.api;
                        option.callback = "errorBack";
                        e.page.showPopover(e, option, 'warning', data.msg, true);
                    } else if (data.state == true) {
                        e.returnValue = data.api;
                        //转账成功后提示
                        if (data.resultCode == 0) {
                            option.callback = "back";
                            e.page.showPopover(e, option, 'success', window.top.message.fund['transferSuccess'], true);
                            $(e.currentTarget).unlock();
                        } else {//转账不成功或待确认
                            var btnOption = {};
                            btnOption.target = root + "/fund/playerTransfer/transferResult.html?resultStatus=" + data.resultStatus + '&transactionNo=' + data.orderId + "&resultCode=" + data.resultCode + "&transferOut=" + transferOut;
                            btnOption.callback = "back";
                            btnOption.text = option.text;
                            window.top.topPage.doDialog(e, btnOption);
                        }
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 转账失败回调
         * @param api
         */
        errorBack: function (e, option) {
            var _this = this;
            var api = e.returnValue;
            if (api) {
                var _target = $(this.formSelector + " #api-game-" + api).children("[data-rel]");
                if (_target.length > 0) {
                    var _e = {currentTarget: _target, page: e.page || page};
                    var opt = eval("(" + $(_target).data('rel') + ")");
                    opt.isRefresh = true;
                    this.refreshApi(_e, opt);
                    $(".arr-right").hide();
                    $(".arr-left").hide();
                    $("i.hs-ico").hide();
                    $(".arr-down").removeClass("hs-ico");
                    $(".arr-up").removeClass("hs-ico")
                }
            }
        },
        /**
         * 隐藏/显示余额
         * @param e
         */
        moneyToggle: function (e) {
            $(this.formSelector + " .assets-money").toggle();
            $(this.formSelector + " span.hide-assets").toggle();
            if ($(e.currentTarget).children("i").hasClass("show")) {
                $(e.currentTarget).children("i").removeClass("show");
                $(e.currentTarget).children("i").addClass("hide");
                $(e.currentTarget).children("span").text(window.top.message.fund['transfer.assets.showBalance']);
                $('span[name=totalRefresh]').hide();
                $('[name=isHide]').val(1);
            } else {
                $(e.currentTarget).children("i").removeClass("hide");
                $(e.currentTarget).children("i").addClass("show");
                $(e.currentTarget).children("span").text(window.top.message.fund['transfer.assets.hideBalance']);
                $('span[name=totalRefresh]').show();
                $('[name=isHide]').val(0);
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 总资产刷新
         * @param e
         * @param option
         */
        refresh: function (e, option) {
            this.loading(e, option);
            var type = option.type;
            if (type == null) {
                type = 'all';
            }
            var apiId = option.apiId;
            var url;
            if (apiId != null) {
                url = root + "/fund/playerTransfer/refresh.html?type=" + type + "&search.apiId=" + apiId + "&isRefresh=" + option.isRefresh + "&t=" + new Date().getTime();
            } else {
                url = root + "/fund/playerTransfer/refresh.html?type=" + type + "&t=" + new Date().getTime();
            }
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    _this.refreshAfter(_this, data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 加载资金概况
         */
        loadAssets: function (isRefresh) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/playerTransfer/refresh.html?type=all&isRefresh=" + isRefresh + "&t=" + new Date().getTime(),
                success: function (data) {
                    _this.refreshAfter(_this, data);
                },
                error: function (data) {

                }
            })
        },
        /**
         * 余额冻结回调
         * @param e
         * @param option
         * @constructor
         */
        securityPwdSetting: function (e, option) {
            if (e.returnValue) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/accountSettings/list.html']", window.top.document);
                $current.parent().addClass("select");
                $current.click();
            }
        },
        /**
         * 刷新资金
         * @param _this
         * @param data
         */
        refreshAfter: function (_this, data) {
            $(_this.formSelector + " div.account").html(data);
            //钱包
            $(_this.formSelector + " div.m-loading-icon").hide();
            $(_this.formSelector + " span.wallet-money").show();
            //取款金额
            $(_this.formSelector + " div.g-loading-icon-x").hide();
            $(_this.formSelector + " span.withdraw-money").show();
            //转账金额
            $(_this.formSelector + " div.transfer-loading").hide();
            $(_this.formSelector + " span.transfer-money").show();
            //api
            var $apis = $(_this.formSelector + " div.balance-right").find("div.game");
            var len = $apis.length;
            var i = 0;
            for (i = 0; i < len; i++) {
                if (i % 2 == 0 && $apis[i].className != 'game hg') {
                    $($apis[i]).hide();
                } else {
                    $($apis[i]).show();
                }
            }
            //资金
            $(_this.formSelector + " div.m-loading-icon-x").hide();
            $(_this.formSelector + " em.total-money").show();
            $(_this.formSelector + " span[name=totalRefresh]").show();
        },
        /**
         * 加载中效果
         * @param e
         * @param option
         */
        loading: function (e, option) {
            var type = option.type;
            $(this.formSelector + " .total-money").hide();
            $(this.formSelector + " span[name=totalRefresh]").hide();
            $(this.formSelector + " div.m-loading-icon-x").show();
            if (type == 'api') {
                $(e.currentTarget).parent().hide();
                $(e.currentTarget).parent().prev(".loading-api").show();
            } else {
                $(this.formSelector + " .assets-money").hide();
                $(this.formSelector + " .game").hide();
                $(this.formSelector + " div.m-loading-icon").show();
                $(this.formSelector + " div.g-loading-icon-x").show();
                $(this.formSelector + " .loading-api").show();
            }
        },
        /**
         * 刷新api
         * @param e
         * @param option
         */
        refreshApi: function (e, option) {
            var _this = this;
            var apiId = option.apiId;
            var isHide = $("input[name=isHide]").val();
            var state = option.state;
            var url;
            if (apiId) {
                this.loading(e, option);
                url = root + "/fund/playerTransfer/refreshApi.html?type=" + option.type + "&search.apiId=" + apiId + "&t=" + new Date().getTime();
                if (option.isRefresh) {
                    $(_this.formSelector + " span.wallet-money").hide();
                    $(_this.formSelector + " .m-loading-icon").show();
                    url = url + "&isRefresh=" + option.isRefresh;
                }
                window.top.topPage.ajax({
                    url: url,
                    dataType: "json",
                    success: function (data) {
                        if (data.totalAssets != null) {
                            $(_this.formSelector + " em.total-money").text(data.totalAssets);
                        }
                        $(_this.formSelector + " div.m-loading-icon-x").hide();
                        $(_this.formSelector + " span[name=totalRefresh]").show();
                        if (data.wallet != null) {
                            $(_this.formSelector + " span.wallet-money").text(data.wallet);
                        }
                        $(_this.formSelector + " .m-loading-icon").hide();
                        if (data.apiMoney != null) {
                            if (data.apiMoney > 0 && state != 'true') {
                                $(e.currentTarget).parent().children(".game-right").find(".assets-money").removeClass("gray");
                                $(e.currentTarget).parent().children(".game-right").find(".assets-money").addClass("blue");
                            } else {
                                $(e.currentTarget).parent().children(".game-right").find(".assets-money").removeClass("blue");
                                $(e.currentTarget).parent().children(".game-right").find(".assets-money").addClass("gray");
                            }
                            $(e.currentTarget).parent().children(".game-right").find(".api-money").text(data.apiMoney);
                            $(e.currentTarget).attr("title", data.apiSynTime);
                        }
                        $(_this.formSelector + " .loading-api").hide();
                        if (isHide != '1') {
                            $(_this.formSelector + " .total-money").show();
                            $(_this.formSelector + " span.wallet-money").show();
                        }
                        $(e.currentTarget).parent().show();
                        $(e.currentTarget).unlock();
                    },
                    error: function (data) {
                        $(_this.formSelector + " div.m-loading-icon-x").hide();
                        $(_this.formSelector + " .total-money").show();
                        $(_this.formSelector + " span[name=totalRefresh]").show();
                        $(_this.formSelector + " .m-loading-icon").hide();
                        $(_this.formSelector + " span.wallet-money").show();
                        $(_this.formSelector + " .loading-api").hide();
                        $(e.currentTarget).parent().show();
                        $(e.currentTarget).unlock();
                    }
                })
            }
        },
        /**
         * 链接到资金记录
         */
        linkTransaction: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/fund/transaction/list.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        },
        /**
         * 加载游戏公告
         */
        loadGameAnnouncement: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/loadGameAnnouncement.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.gameAnnouncement").html(data);
                }
            });
        },
        /**
         * 更多游戏公告
         */
        moreGameAnnouncement: function (e, option) {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
            $(e.currentTarget).unlock();
        },
        /**
         * 加载轮播图
         */
        loadCarousel: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/loadCarousel.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.right-asset").html(data);
                }
            });
        },
        /**
         * 更改提示语
         */
        changeMsg: function () {
            var transferOut = $("[name=transferOut]").val();
            var msg;
            if (transferOut == 'wallet') {
                msg = window.top.message.fund['transferForm.transferAmountCheck'];
            } else {
                msg = window.top.message.fund['transferForm.apiAmountInsufficientBalance'];
            }
            this.extendValidateMessage({"result.transferAmount": {remote: msg}});
        },
        gameDetail: function (e, option) {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
            $(e.currentTarget).unlock();
        },
        /**
         * 加载转账下拉
         */
        loadTransferPartial: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/playerTransfer/transfers.html?t=" + new Date().getTime(),
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    $(_this.formSelector + " div.left-asset").html(data);
                },
                error: function () {

                }
            });
        },
        linkApiUrl: function (e, option) {
            var status = option.status;
            if (status == 'true') {
                var msg = window.top.message.common['gameMaintainTryAgainLater1'];
                var start = new Date();
                var end = new Date();
                start.setTime(parseInt(option.mtstart));
                end.setTime(parseInt(option.mtend));
                var sTime = window.top.topPage.formatToMyDateTime(start, "yyyy-MM-dd HH:mm:ss");
                var eTime = window.top.topPage.formatToMyDateTime(end, "yyyy-MM-dd HH:mm:ss");
                // var msg = "<div style='line-height: 30px;margin: 20px;'>尊敬的客户您好：<p style='text-indent: 2em'>{0}将于{timezone} {1} - {2}进行维护，维护时间若有变动将另行通知。 给您带来的不便，请您谅解！</div>";
                msg = msg.replace("{0}", $(e.currentTarget).find("em").text()).replace("{1}", sTime).replace("{2}", eTime).replace("{timezone}", _that.transTimeZone($("#userTime").text()));
                window.top.topPage.showInfoMessage(msg);
            } else if (option.url) {
                window.open(option.url, "_blank");
            }
            $(e.currentTarget).unlock();
        },
        transTimeZone: function (timezone) {
            var trans;
            switch (timezone) {
                case "GMT+08:00":
                    trans = window.top.message.fund_auto['北京时间'];
                    break;
                case "GMT-04:00":
                    trans = window.top.message.fund_auto['美东时间'];
                    break;
                default:
                    trans = timezone;
            }

            return trans;
        },
        /**
         * 切换额度转换回调
         * @param e
         * @param option
         */
        changeAutoPayCallback: function (e, option) {
            var isAutoPay = this.getCookie("isAutoPay");
            if (option.data != isAutoPay) {
                this.setCookie("isAutoPay", option.data);
                window.top.topPage.showPage(window.top.location.hash.subString(1));
            }
        }
    });
});