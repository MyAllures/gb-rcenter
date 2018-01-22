/**
 * 资金管理-手工存取
 */
define(['common/BaseEditPage', 'autocompleter'], function (BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super("form");
            this.changeType();
            var username = $("input[name=username]").val();
            if (username) {
                this.queryBalance();
            }
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //选择类型关联对应类型
            $(this.formSelector).on("change", "[name='result.withdrawType']", function (e) {
                _this.changeType();
            });
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
            //实时查询玩家账号
            this.queryUserName();
        },
        /**
         * 选择类型
         */
        changeType: function () {
            var withdrawType = $("[name='result.withdrawType']").val();
            if (withdrawType == 'manual_payout') {//派彩-免稽核（默认选中）、存款稽核、优惠稽核
                $("#spanTips").show();
            } else {
                $("#spanTips").hide();
            }
        },
        /**
         * 提交订单
         * @param e
         * @param option
         */
        submit: function (e, option) {
            var _this = this;
            window.top.topPage.showConfirmMessage(option.msg, function (result) {
                if (result) {
                    _this.withdraw(e, option, _this);
                }
                else {
                    $(e.currentTarget).unlock();
                }
            })
        },
        withdraw: function (e, option, obj) {
            window.top.topPage.ajax({
                url: root + "/fund/manual/manualWithdraw.html",
                dataType: 'json',
                data: obj.getCurrentFormData(e),
                type: 'POST',
                success: function (data) {
                    if (data.state == true) {
                        e.page.showPopover(e, option, "success", data.msg, true);
                        e.returnValue = data.id;
                    } else {
                        e.page.showPopover(e, option, "danger", data.msg, true);
                    }
                }
            });
        },
        /**
         *回调
         */
        back: function (e, option) {
            var hasRetrun = $("[name='hasRetrun']").val();
            if (hasRetrun) {
                var fromPlayerDetail = $("[name='fromPlayerDetail']").val();
                var playerId = $("[name='playerId']").val();
                if (fromPlayerDetail == "true" && playerId) {
                    $("#mainFrame").load(root + "/player/playerView.html?search.id=" + playerId);
                } else {
                    $(".return-btn").click();
                }
            } else {
                if (e.returnValue) {
                    var $target = $("#withdraw");
                    var url = "/fund/manual/index.html?type=withdraw";
                   /* window.top.topPage.pages[url] = {
                        lastHash: url,
                        hashEvent: $target,
                    };*/
                    //window.top.topPage.lastHash = url;
                    window.top.topPage.hashEvent = $target;
                    window.location.hash = "/fund/manual/withdrawView.html?search.id=" + e.returnValue;
                } else {
                    $("#manual").load(root + "/fund/manual/withdraw.html");
                }
            }
        },
        /**
         * 更改规则
         * @param $form
         * @returns {*}
         */
        getValidateRule: function ($form) {
            var rule = this._super($form);
            var _this = this;
            if (rule && rule.rules['username']) {
                rule.rules['username'].remote = {
                    url: root + '/fund/manual/checkUserName.html',
                    cache: false,
                    type: 'POST',
                    data: {
                        'username': function () {
                            return $("input[name='username']").val();
                        }
                    },
                    complete: function (data) {
                        if (data.responseText == "true") {
                            _this.queryBalance();
                        }
                    }
                }
            }
            return rule;
        },
        /**
         * 查询钱包余额
         */
        queryBalance: function (username) {
            if (!username) {
                username = $("input[name='username']").val()
            }
            window.top.topPage.ajax({
                url: root + '/fund/manual/walletBalance.html',
                data: {"username": username},
                dataType: 'json',
                success: function (data) {
                    var currency = data.defaultCurrency;
                    var money = data.walletBalance;
                    var decimals = data.decimals;
                    $("#integerMoney").text(currency + money);
                    $("#decimalsMoney").text(decimals);

                    var ele = $("input[name='result.withdrawAmount']");
                    $.data(ele[0], "previousValue", null);
                    if ($(ele).val()) {
                        ele.valid();
                    }
                },
                error: function () {

                }
            });
        },
        /**
         * 查询玩家账号
         */
        queryUserName: function () {
            var username = $("input[name='username']");
            var _this = this;
            $(username).autocompleter({
                highlightMatches: true,
                source: root + "/fund/manual/queryUserName.html",
                template: '{{ label }}',
                hint: true,
                empty: false,
                limit: 5,
                callback: function (event, ui) {
                    _this.queryBalance(event);
                }
            });
            $(".autocompleter").attr("style", "border:none");
            $("input[name='username']").blur(function(){
                $(".autocompleter").addClass("autocompleter-closed");
            });
        },
    });
});