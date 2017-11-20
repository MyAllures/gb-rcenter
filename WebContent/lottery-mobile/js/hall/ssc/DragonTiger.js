define(['site/hall/ssc/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            this._super();
            _this = this;

        },

        showTable : function(){
            $("div.s-menu.second").hide();
            $("#shuzipan").show();
            $("a[data-code='ssc_longhu']").addClass("mui-active");
            $("a[data-code='szp']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("龙虎");
            $("span.x_1.gfwf-tit").text("龙虎");
            $(".s-title.title1 span").text("龙虎");
            $(".s-title.title2 span").text("龙虎");
            $("#toobarTitle").text("信用玩法-龙虎");
            $("a[data-code='szp'] span").text("龙虎");
        },

        getOdds: function () {
            var url = root + '/' + this.type + '/getDragonTigerOdds.html';

            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {code: _this.code},
                success: function (data) {
                    for (i = 0; i < data.length; i++) {
                        var dnum = '';
                        var tnum = '';
                        if (i == 0) {
                            dnum = 1;
                            tnum = 2;
                            bettitle="万仟";
                        } else if (i == 1) {
                            dnum = 1;
                            tnum = 3;
                            bettitle="万佰";
                        } else if (i == 2) {
                            dnum = 1;
                            tnum = 4;
                            bettitle="万拾";
                        } else if (i == 3) {
                            dnum = 1;
                            tnum = 5;
                            bettitle="万个";
                        }  else if (i == 4) {
                            dnum = 2;
                            tnum = 3;
                            bettitle="仟佰";
                        } else if (i == 5) {
                            dnum = 2;
                            tnum = 4;
                            bettitle="仟拾";
                        } else if (i == 6) {
                            dnum = 2;
                            tnum = 5;
                            bettitle="仟个";
                        } else if (i == 7) {
                            dnum = 3;
                            tnum = 4;
                            bettitle="佰拾";
                        } else if (i == 8) {
                            dnum = 3;
                            tnum = 5;
                            bettitle="佰个";
                        } else if (i == 9) {
                            dnum = 4;
                            tnum = 5;
                            bettitle="拾个";
                        }
                        var ddata = data[i]['龙' ];
                        var tdata = data[i]['虎'];
                        var diedata = data[i]['和'];
                        $("div.bet-title.tablenum" + i).text(bettitle);
                        var tbdiv = $("div.bet-table-list.tablenum" + i + " table tbody tr td");
                        var dspan = $(tbdiv[0]).find("span");
                        var diespan = $(tbdiv[1]).find("span");
                        var tspan = $(tbdiv[2]).find("span");
                        $(dspan[0]).text(ddata.betNum);
                        $(dspan[1]).text(ddata.odd);
                        $(diespan[0]).text(diedata.betNum);
                        $(diespan[1]).text(diedata.odd);
                        $(tspan[0]).text(tdata.betNum);
                        $(tspan[1]).text(tdata.odd);
                        $(tbdiv[0]).attr("data-odds",ddata.odd);
                        $(tbdiv[0]).attr("data-bet-code",ddata.betCode);
                        $(tbdiv[0]).attr("data-bet-num",ddata.betNum);
                        $(tbdiv[0]).attr("data-play","dragon_tiger_tie");
                        $(tbdiv[0]).attr("data-name",bettitle+"-龙");
                        $(tbdiv[1]).attr("data-odds",diedata.odd);
                        $(tbdiv[1]).attr("data-bet-code",diedata.betCode);
                        $(tbdiv[1]).attr("data-bet-num",diedata.betNum);
                        $(tbdiv[1]).attr("data-play","dragon_tiger_tie");
                        $(tbdiv[1]).attr("data-name",bettitle+"-和");
                        $(tbdiv[2]).attr("data-odds",tdata.odd);
                        $(tbdiv[2]).attr("data-bet-code",tdata.betCode);
                        $(tbdiv[2]).attr("data-bet-num",tdata.betNum);
                        $(tbdiv[2]).attr("data-play","dragon_tiger_tie");
                        $(tbdiv[2]).attr("data-name",bettitle+"-虎");
                    }
                }
            })
        }
    });
});