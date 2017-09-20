/**基本投注玩法**/
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    return BasePage.extend({
        init: function () {
            this.formSelector = "#betOrderDiv";
        },
        styleInit: function () {
            this.templateBet();
            this.muiInit();
        },
        muiInit: function () {
            this._super();
            /*内容区域滚动*/
            mui('.mui-scroll-wrapper.middle-content-bat').scroll({
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: false //是否启用回弹
            });
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;
            //快速填充金额
            mui(this.formSelector).on('tap', 'a#quickFill', function () {
                var money = $("input#inputMoney").val();
                if (!money) {
                    return;
                }
                $("input[name=betAmount]").val(money);
            });
            //点击投注
            mui(this.formSelector).on("tap", "a#submit", function () {
                _this.placeOrder();
                $("#dingdan").addClass('mui-active');
            });
            //删除投注选项
            mui(this.formSelector).on("tap", "a.list-delete-btn", function () {
                $(this).parent(".mui-input-row").remove();
            });
            //取消下注
            mui("body").on("tap", "#cancel", function () {
                $("#dingdan").html('');
                $("#dingdan").removeClass('mui-active');
            });
            //确认投注
            mui("body").on("tap", "#confirmOrder", function () {
                var betForm = _this.getBetOrder();
                _this.confirmOrder(betForm);
            });
            mui(this.formSelector).on("tap", 'a[name=back]', function () {
                $("#betOrderDiv").hide();
                $("#offCanvasWrapper").show();
                sessionStorage.removeItem("betForm");
            });
            /**
             * 跳转页面
             */
            mui(this.formSelector).on('tap', 'a[data-href]', function () {
                _this.gotoUrl($(this).data('href'));
            });
        },
        /**
         * 关闭下注清单
         */
        closeConfirmOrder: function () {
            $("#dingdan").html('');
            $("#dingdan").removeClass('mui-active');
        },
        /**
         * 投注中间部分模板
         */
        templateBet: function () {
            var betForm = sessionStorage.betForm;
            var data = JSON.parse(betForm);
            var html = Template('template_bet', {data: data});
            $(this.formSelector + " .ber-order-list").html(html);
        },
        /**
         * 下注
         */
        placeOrder: function () {
            var betForm = this.getBetOrder();
            if (typeof betForm != 'object') {
                this.toast("请选择");
                return;
            }
            var len = $(".order-list-input input[name=betAmount]").length;
            if (betForm.betOrders.length == 0 && len <= 0) {
                this.toast("请选择");
                return;
            }
            if (betForm.betOrders.length == 0 && len > 0) {
                this.toast("请输入下注金额");
                return;
            }
            var content = Template('template_order', {data: betForm});
            $("#dingdan").html(content);
        },
        /**
         * 确定下注
         */
        confirmOrder: function (betForm) {
            var _this = this;
            var type = $("input[name=type]").val();
            var code = $("input[name=code]").val();
            if (typeof betForm != 'object') {
                return;
            }
            var ajaxData = {
                code: code,
                quantity: betForm.quantity,
                totalMoney: betForm.totalMoney,
                betOrders: []
            };
            $.each(betForm.betOrders, function (index, value) {
                ajaxData.betOrders.push({
                    expect: value.expect,
                    code: value.code,
                    betCode: value.betCode,
                    playCode: value.playCode,
                    betNum: value.betNum,
                    odd: value.odd,
                    betAmount: value.betAmount,
                    memo: ""
                });
            });

            mui.ajax(root + '/' + type + '/' + code + '/saveBetOrder.html', {
                data: {betForm: JSON.stringify(ajaxData)},
                dataType: 'json',
                type: 'POST',
                beforeSend: function () {
                    _this.closeConfirmOrder();
                    _this.showLoading();
                },
                success: function (data) {
                    var d = data.code[0];
                    //code代码为100表示成功
                    if (d && d.code && d.code == '100') {
                        _this.toast(d.msg);
                        sessionStorage.removeItem("betForm");
                        $("div.bet-table-list .mui-active").removeClass("mui-active");
                        $("#betOrderDiv").hide();
                        $("#offCanvasWrapper").show();
                        $(".balance").text(data.balance);
                    } else {
                        _this.toast(d.msg + '[' + d.code + ']');
                    }
                },
                complete: function () {
                    _this.hideLoading();
                }
            })
        },

        /**
         * 组装注单数据
         * @returns {{code: (*|jQuery), totalMoney: number, betOrders: Array, quantity: number}}
         */
        getBetOrder: function () {
            var code = $("input[name=code]").val();
            var betForm = {
                code: code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            $(".order-list-input input[name=betAmount]").each(function () {
                if ($(this).val()) {
                    var betAmount = parseFloat($(this).val());
                    //改为attr取值，防止值变动，这里的$(this).data值不变
                    betForm.betOrders.push({
                        code: code,
                        expect: $('input[name=expect]').val(),
                        betCode: $(this).attr('data-bet-code'),
                        playCode: $(this).attr('data-play'),
                        betNum: $(this).attr('data-bet-num'),
                        odd: $(this).attr("data-odds"),
                        betAmount: betAmount,
                        memo: $(this).attr("data-name")
                    });
                    betForm.totalMoney = betForm.totalMoney + betAmount;
                    betForm.quantity = betForm.quantity + 1;
                }
            });
            return betForm;
        }
    });
});