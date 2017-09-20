define(['common/BaseEditPage', 'nestable', 'bootstrapswitch', 'css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseEditPage, nestable, Bootstrapswitch) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=cashFlowOrderForm]";
            this._super(this.formSelector);
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            var $bootstrapSwitch = $("[name='takeTurns']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                    {
                        onText: window.top.message.content['floatPic.display.on'],
                        offText: window.top.message.content['floatPic.display.off'],
                        onSwitchChange: function (e, state) {
                            if (state) {
                                var data = _this.changeTakeTurns(state);
                                $("tr.dd-item1 td").addClass("td-handle1");
                                return true;
                            } else {
                                window.top.topPage.showConfirmMessage("确认禁用金流顺序?", function (confirm) {
                                    if (confirm) {
                                        var data = _this.changeTakeTurns(state);
                                        $("td.td-handle1").removeClass("td-handle1");
                                        return true;
                                    } else {
                                        $bootstrapSwitch.bootstrapSwitch('state', true, true);
                                        return false;
                                    }
                                });
                            }
                        }
                    });

        },
        /**
         * 是否启用金流顺序
         * @param state
         */
        changeTakeTurns: function (state) {
            window.top.topPage.ajax({
                url: root + "/creditAccount/changeTakeTurns.html",
                data: {"state": state},
                dataType: 'json',
                success: function (data) {
                    return data;
                }
            })
        },
        onPageLoad: function () {
            this._super();
            this.initNestable();
        },
        /**
         * 拖动排序初始化
         * @see https://github.com/dbushell/Nestable
         */
        initNestable: function () {
            $(".dragdd").nestable({
                rootClass: 'dragdd',
                listNodeName: 'tbody',
                listClass: 'dd-list1',
                itemNodeName: 'tr',
                handleClass: 'td-handle1',
                itemClass: 'dd-item1',
                maxDepth: 1
            });
        },
        applyCashFlowOrder: function (e, option) {
            var _this = this;
            var cashOrder = {};
            cashOrder.takeTurns = $("input[name='takeTurns']").prop("checked");
            var orderObj = [];
            $("tbody tr").each(function (index, obj) {
                orderObj.push({
                    "sort": index + 1,
                    "id": $(obj).children("[name='result.id']").val()
                });
                cashOrder.cashFlowOrders = orderObj;
            });
            window.top.topPage.ajax({
                dataType: 'json',
                data: {"cashFlowOrder": JSON.stringify(cashOrder)},
                type: "post",
                url: root + '/creditAccount/saveCashFlowOrder.html',
                success: function (data) {
                    $(e.currentTarget).unlock();
                    if (data) {
                        window.top.topPage.showSuccessMessage(window.top.message.common['save.success']);
                    } else {
                        window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                    }
                }
            });
        },
        /**
         * 应用按钮条件验证
         * @param e
         * @param option
         * @returns {boolean}
         */
        validateCondition: function (e, option) {
            var takeTurns = $("input[name='takeTurns']").prop("checked");
            if (takeTurns != true) {
                window.top.topPage.showWarningMessage("请开启金流顺序");
                return false;
            }
            if ($("tbody tr").length == 0) {
                window.top.topPage.showWarningMessage("无收款账号不能应用金流顺序");
                return false;
            }
            return true;
        }
    })
});