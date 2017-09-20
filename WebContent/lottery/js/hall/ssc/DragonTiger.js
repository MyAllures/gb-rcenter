/**
 * 龙虎
 */
define(['site/hall/ssc/PlayWay'], function (PlayWay) {
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
            $(".main-left .table-common tbody tr td.peilv").click(function () {
                var val = $(".main-left .fl input").val();
                if (typeof val == 'undefined' || !val) {
                    val = '';
                }
                if (val != ''){
                if ($(this).hasClass("bg-yellow")) {
                    $(this).removeClass("bg-yellow");
                    $(this).prev().find("input").length == 0 && $(this).prev().html() != '&nbsp;' && (typeof $(this).prev().html() != 'undefined' && $(this).prev().html().indexOf('和数') < 0) && $(this).prev().removeClass("bg-yellow");
                    $(this).next().find("input").val("");
                } else {
                    $(this).addClass("bg-yellow");
                    $(this).prev().find("input").length == 0 && $(this).prev().html() != '&nbsp;' && (typeof $(this).prev().html() != 'undefined' && $(this).prev().html().indexOf('和数') < 0) && $(this).prev().addClass("bg-yellow");
                    $(this).next().find("input").val(val);
                }
                }
            });
        },//获取赔率数据
        getoddsa: function () {
            var _this = this;
            var code = this.code;
            ajaxRequest({
                url: root + '/ssc/getDragonTigerOdds.html',
                data: {code: code},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        for (i = 0; i < data.length; i++) {
                            var dnum = '';
                            var tnum = '';
                            var bettitle='';
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
                            }else if (i == 4) {
                                dnum = 2;
                                tnum = 3;
                                bettitle="仟佰";
                            }else if (i == 5) {
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

                            var ddata = data[i]['龙'];
                            var diedata = data[i]['和'];
                            var tdata = data[i]['虎'];
                            var tdpls = $(".main-left .table-common tbody tr td.peilv.dragon_tiger_" + dnum + tnum);
                            var tdjes = $(".main-left .table-common tbody tr td.jine.dragon_tiger_" + dnum + tnum);
                            for (j = 0; j < tdpls.length; j++) {
                                var szdata = '';
                                if (j == 0) {
                                    szdata = ddata;
                                } else if (j == 1) {
                                    szdata = diedata;
                                } else {
                                    szdata = tdata;
                                }
                                $(tdpls[j]).find("strong").text(szdata.odd);
                                $(tdpls[j]).attr("data-code", szdata.code);
                                $(tdpls[j]).attr("data-bet-code", szdata.betCode);
                                $(tdpls[j]).attr("data-bet-num", szdata.betNum);
                                $(tdpls[j]).attr("data-odds", szdata.odd);
                                $(tdjes[j]).find("input").attr("data-code", szdata.code);
                                $(tdjes[j]).find("input").attr("data-bet-code", szdata.betCode);
                                $(tdjes[j]).find("input").attr("data-bet-num", szdata.betNum);
                                $(tdjes[j]).find("input").attr("data-odds", szdata.odd);
                                $(tdjes[j]).find("input").attr("data-play",lotteryPlay);
                                $(tdjes[j]).find("input").attr("data-name",bettitle+"-"+szdata.betNum);
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