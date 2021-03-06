define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable(this.getSecondText(),"传统玩法-定位",$("#gfwfBetCode").val(),$("#dingwei"),"fix");
            this._super();
        },
        getSecondText:function () {
            return $("div#dingwei a.mui-active").attr("data-code");
        },

        getOdds: function () {
            var subCode = $("#dingwei a.mui-active").data("type");
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {'betCode': subCode},
                type: 'POST',
                success: function (data) {
                    var betname = $("#dingwei a.mui-active").text();
                    var tdata = data["obj"];
                    var toua = $("#bettouli div a");
                    var weia = $("#betweili div a");
                    $("#betTitleDiv").html(betname + "(中2@<strong  class='col-red'>" + tdata.odd + "</strong>)");
                    toua.attr("data-odd", tdata.odd);
                    weia.attr("data-odd", tdata.odd);
                    toua.attr("data-bet-code", tdata.betCode);
                    weia.attr("data-bet-code", tdata.betCode);
                    toua.attr("data-name", betname.substring(0, betname.length - 3) + "位");
                    weia.attr("data-name", betname.substring(1, betname.length -2) + "位");

                }
            })
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
                $("input#inputMoney").blur();
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

            mui("li.screen-munber").off('tap','a').on('tap', 'a', function () {
                _this.bindTdInput(this);
            });
            //清除下注按钮点击事件
            mui("body").off('tap','a#del-bet').on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });
        },
        //点击投注选项
        bindTdInput : function(thiz){
            var flag=$(thiz).is('.not-selected');
            if (!flag){
                $(thiz).toggleClass('mui-active');
            }
            var toua = Number($("#bettouli div a.mui-active").length);
            var weia = Number($("#betweili div a.mui-active").length);
            if(!page.isOpen) {
                toua=0;
                weia=0;
            }
            if (toua > 0 && weia > 0) {
                $("#quantity").text(toua * weia);
            } else {
                $("#quantity").text(0);
            }
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
            var betForm = {
                code: code,
                expect: expect,
                type: type,
                betOrders: [],
                quantity: 0,
                totalMoney: 0
            };
            var toua = $("#bettouli div a.mui-active");
            var weia = $("#betweili div a.mui-active");
            for (var i = 0; i < toua.length; ++i) {
                for (var j = 0; j < weia.length; ++j) {
                    betForm.betOrders.push({
                        code: code,
                        expect: expect,
                        betAmount: betAmount,
                        betCode: $("#dingwei a.mui-active").attr("data-type"),
                        playCode: $(toua[i]).attr("data-play"),
                        betNum: $(toua[i]).attr("data-bet-num") + "" + $(weia[j]).attr("data-bet-num"),
                        odd: $(toua[i]).attr("data-odd"),
                        memo: $(toua[i]).attr("data-name") + "-" + $(toua[i]).attr("data-bet-num") + "," + $(weia[j]).attr("data-name") + "-" + $(weia[j]).attr("data-bet-num")
                    });
                    betForm.totalMoney = betForm.totalMoney + betAmount;
                    betForm.quantity = betForm.quantity + 1;
                }
            }
            return betForm;
        },

    });
});