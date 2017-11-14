/**
 * 组选三
 */
define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },
        showTable : function(){
            $("a[data-code='zusan']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("组三");
            $("span.x_1.gfwf-tit").text("组三");
            $(".s-title.title1 span").text("组三");
            $(".s-title.title2 span").text("组三");
            $("#toobarTitle").text("信用玩法-组三");
            $("a[data-code='zusan'] span").text("组三");
        },


        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;
            /*==============================信用====================================*/
            //清除下注项
            mui("body").off('tap','a#del-bet1').on('tap', 'a#del-bet1', function () {
                page.resetBet();
            });
            //投注
            mui("body").off('tap','a#show-t').on("tap", 'a#show-t', function () {
                _this.betOrder();
            });

            //取消下注
            mui("body").off('tap','#cancel').on("tap", "#cancel", function () {
                $("#dingdan").html('');
                $("#dingdan").removeClass('mui-active');
            });
            //确认投注
            mui("body").off('tap','#confirmOrder').on("tap", "#confirmOrder", function () {

                _this.confirmOrder(_this.betForm);
            });

            //清除下注按钮点击事件
            mui("body").off('tap','a#del-bet').on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });

            mui(this.formSelector).on("tap", "a", function () {
                console.log("a")
                var type = $(this).attr("data-type");
                var betTitle = $(this).text();
                $("#bet-title").html(betTitle + "@<font id='pl' class='col-red'></font> (请选择5个及以上号码)");
                $("#betli a").removeClass("mui-active");
                $("#bet-title").each(function () {
                    $(this).attr("data-subCode", type);
                    var $tdBet = $(this).find("a[data-bet-num]");
                    $tdBet.each(function () {
                        var betNum = $(this).attr('data-bet-num');
                        $(this).attr("data-name", betTitle + "-" + betNum);
                    })
                });
                _this.getOdds();
            })
            mui("body").on('tap', 'li div a', function () {
                console.log("b")
                var seltd = Number($("li div a.mui-active").length);
                if (seltd > 4) {
                    $("#quantity").text(1);
                    var bet = oddsar[seltd];
                    $("font#pl").text(bet.odd);
                } else {
                    $("font#pl").text("");
                    $("#quantity").text(0);
                }
            });
        },


        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: "pl3_group3"},
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
            var num = $("div.group3-list .mui-active").length;
            var value = '';
            var length = 0;
            if (num >= 5 && num <= 10) {
                value = $("div.group3-list input.group3Odd_" + num).attr("data-odd");
                length = 1;
            }
            $("div.group3-list span.group3Odd").html(value);
            $("#quantity").text(length);
        },
        resetBet: function (thiz) {
            this._super();
            $("div.group3-list span.group3Odd").html('');
        },
        refreshBetTable: function (data) {
            for (var key in data.obj) {
                var value = data.obj[key];
                $("div.group3-list input.group3Odd_" + key).attr("data-odd", value.odd);
                $("div.group3-list input.group3Odd_" + key).attr("data-bet-code", value.betCode);
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
            var $num = $("div.group3-list .mui-active");
            if ($num == undefined || $num.length < 5) {
                this.toast("请选择5个及以上号码");
                return false;
            }
            if ($num.length > 10) {
                this.toast("无效选号,请重置号码后重新选号");
                return false;
            }
            return true;
        },
        getBetOrder: function () {
            var $num = $("div.group3-list .mui-active");
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var betAmount = Number($("input#inputMoney").val());
            var betNum = [];
            var i = 0;
            $num.each(function () {
                betNum[i++] = $(this).attr("data-num")
            });
            var $target = $("div.group3-list input.group3Odd_" + $num.length);
            var betForm = {
                code: this.code,
                expect: $('font#expect').text(),
                type: this.type,
                betOrders: [],
                quantity: 1,
                totalMoney: betAmount
            };
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