define(['site/hall/ssc/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            this._super();
            _this = this;

        },

        showTable : function(){
            var betCode=$("#gfwfBetCode").val();
            $("a[data-code='ssc_zuxuanliu']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#zuxuanliu").show();
            $("span.x_1.gfwf-tit").text("组选六");
            $(".s-title.title1 span").text("组选六");
            $(".s-title.title2 span").text(betCode);
            $("#toobarTitle").text("信用玩法-组选六");
            if(betCode =="ssc_zuxuanliu"){
                $("a[data-code='前三组选六']").addClass("mui-active");
            }else{
                $("#zuxuanliu a").removeClass("mui-active");
                $("a[data-code='"+betCode+"']").addClass("mui-active");
            }
            $(".x_3.gfwf-playName").text(betCode)
        },




        bindButtonEvents: function () {
            var _this=this;
            // mui("body").off('tap','a');
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
                $("#bet-title").html(betTitle + "@<font id='pl' class='col-red'></font> (请选择4~8个号码)");
                $("#betli a").removeClass("mui-active");
                $(".bet-table-list[data-subCode]").each(function () {
                    $(this).attr("data-subCode", type);
                    var $tdBet = $(this).find("td[data-bet-num]");
                    $tdBet.each(function () {
                        var betNum = $(this).attr('data-bet-num');
                        $(this).attr("data-name", betTitle + "-" + betNum);
                    })
                });
                _this.getOdds();
            })
            mui("body").off('tap', 'li#betli div a').on('tap', 'li#betli div a', function () {
                var seltd = Number($("li#betli div a.mui-active").length);
                if (seltd >= 4 && seltd < 9) {
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
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("a[data-bet-num]");
                        var $tds = $(this).find("td");
                        oddsar = data[subCode];
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
            if (seltd < 4 || seltd > 8) {
                this.toast("请选择4~8个号码");
                return false;
            }
            return true;
        },
        /**
         * 获取注单
         * @returns {{code: *, expect: (*|jQuery), type: *, betOrders: Array}}
         */
        getBetOrder: function () {
            var seltd = $("div.bet-table-list a.mui-active");
            var betNum = "";
            $.each(seltd, function (i, item) {
                betNum = betNum + $(this).data("bet-num") + ",";
            });
            if (betNum != '') {
                betNum = betNum.substring(0, betNum.length - 1);
            }
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var betAmount = Number($("input#inputMoney").val());
            var betForm = {
                code: code,
                expect: expect,
                type: type,
                betOrders: [],
                quantity: 0,
                totalMoney: 0
            };
            betForm.betOrders.push({
                code: code,
                expect: expect,
                betAmount: betAmount,
                betCode: $("#zuxuanliu a.mui-active").attr("data-type"),
                playCode: $("#zuxuanliu a.mui-active").attr("data-play"),
                betNum: betNum,
                odd: oddsar[Number(seltd.length)].odd,
                memo: $("#zuxuanliu a.mui-active").text() + "-" + betNum
            });
            betForm.totalMoney = betForm.totalMoney + betAmount;
            betForm.quantity = betForm.quantity + 1;
            return betForm;
        }

    });
});