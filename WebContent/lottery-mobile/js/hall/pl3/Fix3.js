define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },
        showTable : function(){
            var gfwfBetCode=$("#gfwfBetCode").val();
            $("a[data-code='fix']").addClass("mui-active");
            $("a[data-code='"+gfwfBetCode+"']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#dingwei").show();
            $("span.x_1.gfwf-tit").text(gfwfBetCode);
            $(".s-title.title1 span").text(gfwfBetCode);
            $("#toobarTitle").text("传统玩法-定位");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-定位');
            }
            $(".x_3.gfwf-playName").text(gfwfBetCode)
            $(".s-title.title2 span").text(gfwfBetCode);
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
                    var zhonga = $("#betzhongli div a");
                    var weia = $("#betweili div a");
                    $("#betTitleDiv").html(betname + "(中3@<strong  class='col-red'>" + tdata.odd + "</strong>)");
                    toua.attr("data-odd", tdata.odd);
                    zhonga.attr("data-odd", tdata.odd);
                    weia.attr("data-odd", tdata.odd);
                    toua.attr("data-bet-code", tdata.betCode);
                    zhonga.attr("data-bet-code", tdata.betCode);
                    weia.attr("data-bet-code", tdata.betCode);
                    toua.attr("data-name", betname.substring(0, 1) + "位");
                    zhonga.attr("data-name", betname.substring(1, 2) + "位");
                    weia.attr("data-name", betname.substring(2, 3) + "位");
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
                $("#quantity").text(toua * weia * zhonga);
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
            for (var i = 0; i < toua.length; ++i) {
                for (var j = 0; j < zhonga.length; ++j) {
                    for (var k = 0; k < weia.length; ++k) {
                        betForm.betOrders.push({
                            code: code,
                            expect: expect,
                            betAmount: betAmount,
                            betCode: $("#dingwei a.mui-active").attr("data-type"),
                            playCode: $(toua[i]).attr("data-play"),
                            betNum: $(toua[i]).attr("data-bet-num") + "" + $(zhonga[j]).attr("data-bet-num") + "" + $(weia[k]).attr("data-bet-num"),
                            odd: $(toua[i]).attr("data-odd"),
                            memo: $(toua[i]).attr("data-name") + "-" + $(toua[i]).attr("data-bet-num") + "," + $(zhonga[j]).attr("data-name") + "-" + $(zhonga[j]).attr("data-bet-num") + "," + $(weia[k]).attr("data-name") + "-" + $(weia[k]).attr("data-bet-num")
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