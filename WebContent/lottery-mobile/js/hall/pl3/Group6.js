/**
 * 组选六
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: "pl3_group6"},
                type: 'POST',
                success: function (data) {
                    //todo 增加data判空
                    _this.refreshBetTable(data);
                    _this.hideLoading();
                }
            })
        },
        bindTdInput: function (obj) {
            this._super(obj);
            var num = $("div.group6-list .mui-active").length;
            var value = '';
            var length = 0;
            if (num >= 4 && num <= 8) {
                value = $("div.group6-list input.group6Odd_" + num).attr("data-odd");
                length = 1;
            }
            $("div.group6-list span.group6Odd").html(value);
            $("#quantity").text(length);
        },
        resetBet: function (thiz) {
            this._super(thiz);
            $("div.group6-list span.group6Odd").html('');
        },
        refreshBetTable: function (data) {
            for (var key in data.obj) {
                var value = data.obj[key];
                $("div.group6-list input.group6Odd_" + key).attr("data-odd", value.odd);
                $("div.group6-list input.group6Odd_" + key).attr("data-bet-code", value.betCode);
            }
        },
        /**
         * 验证是否符合下注条件
         * @returns {boolean}
         */
        checkBetOrder: function () {
            var isValid = this._super();
            if(!isValid) {
                return false;
            }
            var $num = $("div.group6-list .mui-active");
            if ($num == undefined || $num.length < 4 || $num.length > 8) {
                this.toast("请选择4~8个号码");
                return false;
            }
            return true;
        },
        /**
         * 获取注单组装数据
         * @returns {{code: null, expect: (*|jQuery), type: null, betOrders: Array, quantity: number, totalMoney: number}}
         */
        getBetOrder: function () {
            var $num = $("div.group6-list .mui-active");
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var betAmount = Number($("input#inputMoney").val());
            var betForm = {
                code: code,
                expect: expect,
                type: type,
                betOrders: [],
                quantity: 1,
                totalMoney: betAmount
            };
            var i = 0;
            var betNum = [];
            $num.each(function () {
                betNum[i++] = $(this).attr("data-num")
            });
            var $target = $("div.group6-list input.group6Odd_" + $num.length);
            betForm.betOrders.push({
                code: code,
                expect: expect,
                betCode: $target.attr("data-bet-code"),
                playCode: $target.attr("data-play"),
                betNum: betNum.join(","),
                odd: $target.attr("data-odd"),
                memo: $target.attr("data-name") + "-" + betNum,
                betAmount: betAmount
            });
            return betForm;
        }
    });
});