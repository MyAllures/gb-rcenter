define(['site/hall/pl3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        oddsar:null,
        init: function () {
            this._super();
            _this = this;
        },

        showTable : function(){
            $("a[data-code='group3']").addClass("mui-active");
            $("a[data-code='zusan']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#zusan").show();
            $(".x_3.gfwf-playName").text("组三");
            $("span.x_1.gfwf-tit").text("组三");
            $(".s-title.title1 span").text("组三");
            $(".s-title.title2 span").text("组三");
            $("#toobarTitle").text("传统玩法-组三");
            $("a[data-code='zusan'] span").text("组三");
        },


        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;
            // mui("body").off('tap','a')

            mui("body").off('tap', 'div.bet-table-list td,div.bet-table-list .n-btn').on('tap', 'div.bet-table-list td,div.bet-table-list .n-btn', function () {
                _this.bindTdInput($(this));
            });

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

                if(_this.checkJinE()){
                    _this.confirmOrder(_this.betForm);
                }
            });

            //清除下注按钮点击事件
            mui("body").off('tap','a#del-bet').on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });

            mui(this.formSelector).off("tap", "a.mui-control-item[data-type]").on("tap", "a.mui-control-item[data-type]", function () {
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
            mui("body").off('tap', 'li#betli div a').on('tap', 'li#betli div a', function () {
                var seltd = Number($("li#betli div a.mui-active").length);
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
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: "pl3_group3"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var $tdBet = $(this).find("a[data-bet-num]");
                        var $tds = $(this).find("td");
                        oddsar = data["obj"];
                    });
                }
            })
        },
        /**
         * 验证是否符合下注条件
         * @returns {boolean}
         */
        checkBetOrder: function () {
            var isValid = this._super();
            if (!isValid) {
                return false;
            }
            var seltd = Number($("div.bet-table-list a.mui-active").length);
            if (seltd < 5) {
                this.toast("请选择5个及以上号码");
                return false;
            }

            var betForm = this.getBetOrder();
            if (typeof betForm != 'object') {
                return false;
            }
            if (betForm.betOrders.length == 0) {
                this.toast("请选择");
                return false;
            }
            return true;
        },
        /**
         * 获取注单
         * @returns {{code: *, expect: (*|jQuery), type: *, betOrders: Array}}
         */
        getBetOrder: function () {
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var betAmount = Number($("input#inputMoney").val());
            var seltd = $("div.bet-table-list a.mui-active");
            var betNum = "";
            $.each(seltd, function (i, item) {
                betNum = betNum + $(this).data("bet-num") + ",";
            })
            if (betNum != '') {
                betNum = betNum.substring(0, betNum.length - 1);
            }
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
                betAmount: betAmount,
                betCode: $("div.bet-table-list").attr("data-type"),
                playCode: $("div.bet-table-list").attr("data-play"),
                betNum: betNum,
                odd: oddsar[Number(seltd.length)].odd,
                memo: "组三-" + betNum
            });
            return betForm;
        }

    });
});