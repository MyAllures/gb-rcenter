define(['site/hall/ssc/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this.showTable(this.getSecondText(),"传统玩法-三字定位",$("#gfwfBetCode").val(),$("#sanzidingwei"),"ssc_sanzidingwei");
            this._super();
        },

        getSecondText:function () {
            return $("div#sanzidingwei a.mui-active").attr("data-code")==undefined?"万千百":$("div#sanzidingwei a.mui-active").attr("data-code");
        },

        getOdds: function () {
            // $(".screen-munber a").removeClass("mui-active");
            var subCode = $("#sanzidingwei a.mui-active").data("type");
            var url = root + '/' + this.type + '/' + this.code + '/getTwoOrThreeDigitalOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {'subCode': subCode},
                type: 'POST',
                success: function (data) {
                    var betname = $("#sanzidingwei a.mui-active").text();
                    var tdata = data["中3"];
                    var toua = $("#bettouli div a");
                    var zhonga = $("#betzhongli div a");
                    var weia = $("#betweili div a");
                    $("#betTitleDiv").html(betname + "定位(中3@<strong  class='col-red'>" + tdata.odd + "</strong>)");
                    toua.attr("data-odd", tdata.odd);
                    zhonga.attr("data-odd", tdata.odd);
                    weia.attr("data-odd", tdata.odd);
                    toua.attr("data-bet-code", tdata.betCode);
                    zhonga.attr("data-bet-code", tdata.betCode);
                    weia.attr("data-bet-code", tdata.betCode);
                    $("#touwei").text(betname.substring(0, betname.length - 2));
                    $("#zhongwei").text(betname.substring(1, betname.length - 1));
                    $("#weiwei").text(betname.substring(2, betname.length));
                    toua.attr("data-name", betname.substring(0, betname.length - 2) + "位");
                    zhonga.attr("data-name", betname.substring(1, betname.length - 1) + "位");
                    weia.attr("data-name", betname.substring(2, betname.length) + "位");
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
        bindTdInput: function (thiz) {
            var flag = $(thiz).is('.not-selected');
            if (!flag) {
                $(thiz).toggleClass('mui-active');
            }
            var toua = Number($("#bettouli div a.mui-active").length);
            var zhonga = Number($("#betzhongli div a.mui-active").length);
            var weia = Number($("#betweili div a.mui-active").length);
            if (toua > 0 && weia > 0 && zhonga > 0) {
                if(toua * weia * zhonga>500){
                    $(thiz).toggleClass('mui-active');
                    mui.toast("注数过大");
                    return;
                }else{
                    $("#quantity").text(toua * weia * zhonga);
                }


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
            var zhonga = $("#betzhongli div a.mui-active");
            var weia = $("#betweili div a.mui-active");
            if(toua.length*zhonga.length*weia.length>500){
                mui.toast("注数过大");
                return;
            }
            for (var i = 0; i < toua.length; ++i) {
                for (var j = 0; j < zhonga.length; ++j) {
                    for (var k = 0; k < weia.length; ++k) {
                        betForm.betOrders.push({
                            code: code,
                            expect: expect,
                            betAmount: betAmount,
                            betCode: $("#sanzidingwei a.mui-active").attr("data-type"),
                            playCode: $(toua[i]).attr("data-play"),
                            betNum: $(toua[i]).attr("data-bet-num") + "" + $(zhonga[j]).attr("data-bet-num") + "" + $(weia[k]).attr("data-bet-num"),
                            odd: $(toua[i]).attr("data-odd"),
                            memo: $(toua[i]).attr("data-name") + "-" + $(toua[i]).attr("data-bet-num") + " " + $(zhonga[j]).attr("data-name") + "-" + $(zhonga[j]).attr("data-bet-num") + " " + $(weia[k]).attr("data-name") + "-" + $(weia[k]).attr("data-bet-num")
                        });
                        betForm.totalMoney = betForm.totalMoney + betAmount;
                        betForm.quantity = betForm.quantity + 1;
                    }
                }
            }
            return betForm;
        }
    });
});