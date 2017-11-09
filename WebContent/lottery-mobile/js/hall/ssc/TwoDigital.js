define(['site/hall/ssc-gfwf/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();
            this.bindEvent();

        },

        showTable : function(){
            var betCode=$("#gfwfBetCode").val();
            console.log(betCode);
            $("a[data-code='ssc_erzidingwei']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#erzidingwei").show();
            $("span.x_1.gfwf-tit").text("二字定位");
            $(".s-title.title1 span").text("二字定位");
            $(".s-title.title2 span").text("万千定位");
            $("#toobarTitle").text("信用玩法-二字定位");
            if(betCode =="ssc_erzidingwei"){
                $("a[data-code='万千']").addClass("mui-active");
                $(".x_3.gfwf-playName").text("万千定位");
            }else{
                $("#erzidingwei a").removeClass("mui-active");
                $("a[data-code='"+betCode+"']").addClass("mui-active");
            }
            $(".x_3.gfwf-playName").text(betCode+"定位")
            $(".s-title.title2 span").text(betCode+"定位");
        },

        getOdds: function () {
            // (".screen-munber a").removeClass("mui-active");
            var subCode = $("#erzidingwei a.mui-active").data("type");
            var url = root + '/' + this.type + '/' + this.code + '/getTwoOrThreeDigitalOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {'subCode': subCode},
                type: 'POST',
                success: function (data) {
                    var betname = $("#erzidingwei a.mui-active").text();
                    var tdata = data["中2"];
                    console.log(tdata.odd+"a");
                    var toua = $("#bettouli div a");
                    var weia = $("#betweili div a");
                    $("#betTitleDiv").html(betname + "(中2@<strong  class='col-red'>" + tdata.odd + "</strong>)");
                    toua.attr("data-odd", tdata.odd);
                    weia.attr("data-odd", tdata.odd);
                    toua.attr("data-bet-code", tdata.betCode);
                    weia.attr("data-bet-code", tdata.betCode);
                    toua.attr("data-name", betname.substring(0, betname.length - 1) + "位");
                    weia.attr("data-name", betname.substring(1, betname.length) + "位");

                }
            })
        },
        bindEvent: function () {
            mui("#betCodeDiv").on('tap', 'a', function () {
                $("#betCodeDiv a").removeClass("mui-active");
                $(this).addClass("mui-active");
                _this.getOdds();
            });
            //清除下注按钮点击事件
            mui("body").on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });
        },//点击投注选项
        bindTdInput : function(thiz){
            var flag=$(thiz).is('.not-selected');
            if (!flag){
                $(thiz).toggleClass('mui-active');
            }
            var toua = Number($("#bettouli div a.mui-active").length);
            var weia = Number($("#betweili div a.mui-active").length);
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
                        betCode: $("#betCodeDiv a.mui-active").attr("data-type"),
                        playCode: $(toua[i]).attr("data-play"),
                        betNum: $(toua[i]).attr("data-bet-num") + "" + $(weia[j]).attr("data-bet-num"),
                        odd: $(toua[i]).attr("data-odd"),
                        memo: $(toua[i]).attr("data-name") + "-" + $(toua[i]).attr("data-bet-num") + " " + $(weia[j]).attr("data-name") + "-" + $(weia[j]).attr("data-bet-num")
                    });
                    betForm.totalMoney = betForm.totalMoney + betAmount;
                    betForm.quantity = betForm.quantity + 1;
                }
            }
            return betForm;
        }
    });
});