/**
 * 跨度
 */
define(['site/hall/ssc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.getoddsa();
        },
        bindButtonEvents: function () {
            this._super();
            var _this = this;
            $('.comb-type a').on('click', function () {
                $('.comb-type>a').removeClass('active');
                $(this).addClass('active');
                $("#inputMoney").val("");
                _this.getoddsa();
            });
            $("#subContent .btns .btn-2").click(function () {
                _this.clearTdInput();
                $("span#pl").text("");
            });
        },
        getoddsa: function () {
            var _this = this;
            var allcheck = $("div.table-common table td.bg-yellow");
            allcheck.removeClass("bg-yellow");
            var betCode = $('.comb-type a.active').data('code');
            var code = this.code;
            $("div.table-common table thead tr:nth-child(1) th strong").html($("div#betCodeDiv a.active").text()+"@<span id='pl' class='pl red'></span>");
            ajaxRequest({
                url: root + '/ssc/getBetOdds.html',
                data: {code: code, betCode: betCode},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        var oddsar = eval(data);
                        $.each($(".main-left .table-common tbody tr td.new-ball-st"), function (i, item) {
                            $(this).on('click', function () {
                                _this.setOddText(oddsar);
                            });
                        })

                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        }, setOddText: function (obj) {
            var selck = $("div.table-common table td.bg-yellow").length;
            var ifjx = true;
            $.each(obj, function (i, item) {
                if (ifjx) {
                    if (selck == item.betNum) {
                        $("span#pl").text(item.odd);
                        ifjx = false;
                    } else {
                        $("span#pl").text("");
                    }
                }

            })
        },
        getBetOrder: function () {
            var _this = this;
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            var selck = $("div.table-common table td.bg-yellow").length;
            if (Number(selck) < 5) {
                layer.msg("请选择五个及以上号码");
                return;
            }
            var betAmount = $("input#inputMoney").val();
            if (betAmount == ''){
                layer.msg("请填写下注金额");
                return;
            }
            if (typeof betAmount != 'undefined' && betAmount != '') {
                //改为attr取值，防止值变动，这里的$(this).data值不变
                betForm.betOrders.push({
                    expect: $('i#expect').text(),
                    code: _this.code,
                    betCode: $("#betCodeDiv a.active").data("code"),
                    playCode: lotteryPlay,
                    betNum: _this.getBetNumber(),
                    odd: _this.getBetODD(),
                    betAmount: betAmount,
                    memo: $("#betCodeDiv a.active").text() + _this.getBetNumber()
                });
                betForm.totalMoney = betAmount;
                betForm.quantity = 1;
            }

            return betForm;
        }, /**获取赔率*/
        getBetODD: function () {
            var oddtext = $("div.table-common table thead tr:nth-child(1) th strong").text();
            return oddtext.split("@")[1];
        }, /**获取勾选的复选框数字*/
        getBetNumber: function () {
            var betNum = "";
            $("div.table-common table td.bg-yellow").each(function () {
                betNum = betNum + $(this).data("num") + ",";
            })
            if (betNum != '') {
                betNum = betNum.substring(0, betNum.length - 1);
            }
            return betNum;
        }
    })
});