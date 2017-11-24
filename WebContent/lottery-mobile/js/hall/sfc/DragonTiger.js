define(['site/hall/sfc/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            this._super();
            _this = this;

        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="龙虎";
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='sm']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode1);
            $("span.x_1.gfwf-tit").text(BetCode1);
            $(".s-title.title1 span").text(BetCode1);
            $(".s-title.title2 span").text(BetCode1);
            $("#toobarTitle").text("传统玩法-"+BetCode1);
            $("a[data-code='sm'] span").text(BetCode1);
        },

        getOdds: function () {
            var url = root + '/' + this.type + '/getDragonTigerOdds.html';
            console.log("url=" + url)
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {code: _this.code},
                success: function (data) {
                    for (i = 0; i < data.length; i++) {
                        var ddata = data[i]['龙'];
                        var tdata = data[i]['虎'];
                        var dnum = ddata.betCode.substring(ddata.betCode.length - 2, ddata.betCode.length - 1);
                        var tnum = ddata.betCode.substring(ddata.betCode.length - 1, ddata.betCode.length);
                        $("div.bet-title.tablenum" + i).text(ddata.betNum +dnum +"vs" + tdata.betNum+tnum);
                        var tbdiv = $("div.bet-table-list.tablenum" + i + " table tbody tr td");
                        var dspan = $(tbdiv[0]).find("span");
                        var tspan = $(tbdiv[1]).find("span");
                        $(dspan[0]).text(ddata.betNum);
                        $(dspan[1]).text(ddata.odd);
                        $(tspan[0]).text(tdata.betNum);
                        $(tspan[1]).text(tdata.odd);
                        $(tbdiv[0]).attr("data-odds",ddata.odd);
                        $(tbdiv[0]).attr("data-bet-code",ddata.betCode);
                        $(tbdiv[0]).attr("data-bet-num",ddata.betNum);
                        $(tbdiv[0]).attr("data-play","sfc_dragon_tiger");
                        $(tbdiv[0]).attr("data-name",ddata.betNum+dnum+"vs"+tdata.betNum+tnum+"-龙");
                        $(tbdiv[1]).attr("data-odds",tdata.odd);
                        $(tbdiv[1]).attr("data-bet-code",tdata.betCode);
                        $(tbdiv[1]).attr("data-bet-num",tdata.betNum);
                        $(tbdiv[1]).attr("data-play","sfc_dragon_tiger");
                        $(tbdiv[1]).attr("data-name",ddata.betNum+dnum+"vs"+tdata.betNum+tnum+"-虎");
                    }
                }
            })
        }
    });
});