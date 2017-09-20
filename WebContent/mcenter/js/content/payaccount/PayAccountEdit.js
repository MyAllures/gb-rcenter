define(['common/BaseEditPage', 'bootstrapswitch', 'nestable', 'css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseEditPage, Bootstrapswitch, nestable) {
    return BaseEditPage.extend({

        $radioval: null,

        $thisTurn: null,

        init: function () {
            this._super();
            $radioval = $("[name=takeTurns]").val();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            var _this = this;
            this.unInitSwitch($("[name='isTakeTurns']"))
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function (event, state) {
                    $thisTurn = $(this);
                    if (state) {
                        $("[name='takeTurnsStatus']").val("true");
                        $("input[type='radio']").removeAttr('disabled');
                    } else {
                        $.ajax({
                            url: root + '/vPayAccount/askRemeberInfo.html',
                            dataType: 'json',
                            success: function (data) {
                                if (data.code == 'pop') {
                                    $thisTurn.bootstrapSwitch('indeterminate', true);
                                    $("[data-rel*='remDialog']").trigger("click");
                                } else {
                                    $("[name='takeTurnsStatus']").val("false");
                                }
                                $("input[type='radio']").removeAttr('checked');
                                $("input[type='radio']").attr('disabled', "disabled");
                            }
                        });

                    }
                });

            this.initNestable();

            if ($("[name=takeTurns]:checked").val() == '1') {
                $("td.td-handle1").removeClass("td-handle1");
            }

            $("[name='takeTurns']").on("click", function (e) {
                $radioval = $(e.currentTarget).val();
                if ($radioval == '1') {
                    $("td.td-handle1").removeClass("td-handle1");
                } else {
                    $("tr.dd-item1 td").addClass("td-handle1");
                }
            });

            //扫码/线上切换
            $("[name='type']").on("click", function (e) {
                _this.changeType(e);
            });

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

        /**
         * 应用金流顺序
         * @param e
         * @param option
         */
        applyCashFlowOrder: function (e, option) {
            var _this = this;
            var cashOrder = {};
            cashOrder.isTakeTurns = $("[name='takeTurnsStatus']").val();
            cashOrder.takeTurns = $("input:radio[name='takeTurns']:checked").val();
            cashOrder.rankId = $("input[name='search.id']").val();
            var orderObj = [];
            $("tbody tr[data-id]").each(function (index, obj) {
                orderObj.push({
                    "sort": index + 1,
                    "payRankId": $(obj).children("[name='payRankId']").val(),
                    "payAccountId": $(obj).children("[name='payAccountId']").val()
                });
                cashOrder.orderObj = orderObj;
            });

            window.top.topPage.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(cashOrder),
                async: false,
                type: "post",
                url: root + '/vPayAccount/saveCashFlowOrder.html',
                success: function (data) {
                    if(data){
                        window.top.topPage.showSuccessMessage(window.top.message.common['save.success']);
                    }else{
                        window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                    }

                    _this.requery();
                },
                error: function (data) {
                    window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                }
            });
            $(e.currentTarget).unlock();
        },

        /**
         * 应用按钮条件验证
         * @param e
         * @param option
         * @returns {boolean}
         */
        validateCondition: function (e, option) {
            if ($("[name='takeTurnsStatus']").val() == "true") {
                var takeTurns = $("input:radio[name='takeTurns']:checked").val();
                if (typeof takeTurns == "undefined") {
                    window.top.topPage.showWarningMessage(window.top.message.content['payAccount.cash.order']);
                    return false;
                }
            }
            if ($("tbody tr").length == 0) {
                window.top.topPage.showWarningMessage(window.top.message.content['payAccount.cash.noinfo']);
                return false;
            }
            return true;
        },

        /**
         * 应用回调刷新
         * @param e
         * @param option
         */
        requery: function () {
            $("a.current").trigger("click");
        },

        /**
         * 确定关闭
         * @param e
         * @param option
         */
        rememberFn: function (e, option) {
            if ($("[name='next']").is(":checked")) {
                $.ajax({
                    url: root + '/vPayAccount/remember.html'
                });
            }
            this.returnValue = true;
            this.closePage(e, option);
        },

        /**
         * 关闭提示框回调函数
         * @param e
         * @param option
         */
        closeTurn: function (e, option) {
            if (e.returnValue == true) {
                $("[name='takeTurnsStatus']").val("false");
                $thisTurn.bootstrapSwitch('indeterminate', true);
                /*第三个参数为true 不会进入change事件*/
                $thisTurn.bootstrapSwitch('state', false, false);
            } else {
                /*取消不确定状态*/
                $thisTurn.bootstrapSwitch('indeterminate', false);
                /*第三个参数为true 不会进入change事件*/
                $thisTurn.bootstrapSwitch('state', true, true);
            }
        },
        /**
         * 选择线上/扫码
         * @param e
         */
        changeType: function (e) {
            var data = $(e.currentTarget).attr("data");
            $("[name='type']").removeClass("cur");
            $(e.currentTarget).addClass("cur");
            $(".table-responsive").hide();
            $("#" + data).show();
        }
        /*_validateFn:function(e,option) {
         if ($("tbody tr").length<=0) {
         window.top.topPage.showWarningMessage(window.top.message.content['payAccount.cash.noinfo']);
         return false;
         } else {
         return true;
         }
         }*/

    });
});
