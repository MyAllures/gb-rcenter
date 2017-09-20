/**
 * 龙虎
 */
define(['site/hall/sfc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.getoddsa();
        },
        bindButtonEvents: function () {
            this._super();
            var _this = this;
            /**
             * 点击td变黄
             */
            $(".main-left .table-common tbody tr.peilv td").click(function () {
                var val = $(".main-left .fl input").val();
                if (typeof val == 'undefined' || !val) {
                    val = '';
                }
                if (val != '') {
                    var index = $(this).index();
                    if ($(this).hasClass("bg-yellow")) {
                        $(this).removeClass("bg-yellow");
                        $(this).parent().prev().find("td").eq(index).removeClass("bg-yellow");
                        $(this).parent().next().find("td").eq(index).find("input").val("");
                    } else {
                        $(this).addClass("bg-yellow");
                        $(this).parent().prev().find("td").eq(index).addClass("bg-yellow");
                        $(this).parent().next().find("td").eq(index).find("input").val(val);
                    }
                }
            });
            $(".main-left .table-common tbody tr.pname td").click(function () {
                var val = $(".main-left .fl input").val();
                if (typeof val == 'undefined' || !val) {
                    val = '';
                }
                if (val != '') {
                    var index = $(this).index();
                    if ($(this).hasClass("bg-yellow")) {
                        $(this).removeClass("bg-yellow");
                        $(this).parent().next().find("td").eq(index).removeClass("bg-yellow");
                        $(this).parent().next().next().find("td").eq(index).find("input").val("");
                    } else {
                        $(this).addClass("bg-yellow");
                        $(this).parent().next().find("td").eq(index).addClass("bg-yellow");
                        $(this).parent().next().next().find("td").eq(index).find("input").val(val);
                    }
                }
            });
        },//获取赔率数据
        getoddsa: function () {
            var _this = this;
            var code = this.code;
            ajaxRequest({
                url: root + '/sfc/getDragonTigerOdds.html',
                data: {code: code},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        for (i = 0; i < data.length; i++) {
                            var ddata = data[i]['龙'];
                            var tdata = data[i]['虎'];
                            var dnum = ddata.betCode.substring(ddata.betCode.length - 2, ddata.betCode.length - 1);
                            var tnum = ddata.betCode.substring(ddata.betCode.length - 1, ddata.betCode.length);
                            var tdpls = $(".main-left .table-common tbody tr.peilv.tablenum" + i + " td");
                            for (j = 0; j < tdpls.length; j++) {
                                var szdata = '';
                                var tdnum = '';
                                if (j == 0) {
                                    szdata = ddata;
                                    tdnum = dnum;
                                } else if (j == 1) {
                                    szdata = tdata;
                                    tdnum = tnum;
                                }
                                var index = $(tdpls[j]).index();
                                $(tdpls[j]).find("span").text(szdata.odd);
                                $(tdpls[j]).parent().prev().find("td").eq(index).text(szdata.betNum+tdnum);
                                var inputobj = $(tdpls[j]).parent().next().find("td").eq(index).find("input");
                                inputobj.attr("data-code", szdata.code);
                                inputobj.attr("data-bet-code", szdata.betCode);
                                inputobj.attr("data-bet-num", szdata.betNum);
                                inputobj.attr("data-odds", szdata.odd);
                                inputobj.attr("data-play", lotteryPlay);
                                inputobj.attr("data-name", "龙" + dnum + "vs虎" + tnum + "-" + szdata.betNum);
                            }
                        }
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        }
    })
});