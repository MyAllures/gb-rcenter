/**
 * 第一球
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
            //点击变黄
            $(".main-left .table-common tbody tr td").click(function () {
                var val = $(".main-left .fl input").val();
                if (typeof val == 'undefined' || !val) {
                    val = '';
                }
                if (val != '') {
                    var index = $(this).index();
                    if ($(this).hasClass("bg-yellow")) {
                        if ($(this).hasClass("peilv")) {
                            $(this).removeClass("bg-yellow");
                            $(this).parent().find("td").eq(index - 1).removeClass("bg-yellow");
                            $(this).parent().find("td").eq(index + 1).find("input").val("");
                        } else if ($(this).hasClass("betname")) {
                            $(this).removeClass("bg-yellow");
                            $(this).parent().find("td").eq(index + 1).removeClass("bg-yellow");
                            $(this).parent().find("td").eq(index + 2).find("input").val("");
                        }
                    } else {
                        if ($(this).hasClass("peilv")) {
                            $(this).addClass("bg-yellow");
                            $(this).parent().find("td").eq(index - 1).addClass("bg-yellow");
                            $(this).parent().find("td").eq(index + 1).find("input").val(val);
                        } else if ($(this).hasClass("betname")) {
                            $(this).addClass("bg-yellow");
                            $(this).parent().find("td").eq(index + 1).addClass("bg-yellow");
                            $(this).parent().find("td").eq(index + 2).find("input").val(val);
                        }
                    }
                }
            });
        },
        getoddsa: function () {
            var _this = this;
            var chnNumChar = {
                0: "一",
                1: "二",
                2: "三",
                3: "四",
                4: "五",
                5: "六",
                6: "七",
                7: "八"
            };
            ajaxRequest({
                url: root + '/sfc/getTwoSideOdds.html',
                data: {code: _this.code},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        for (i = 0; i < data.length; i++) {
                            var datatbody;
                            if (i == 8) {//总和
                                datatbody = $($(".main-left .table-common tbody")[2]);
                                var tdpls = datatbody.find("tr td.peilv");
                                for (j = 0; j < tdpls.length; j++) {
                                    var tddata;
                                    if (j != 3 && j != 7) {
                                        var tddata;
                                        var dataPlay;
                                        if (j == 0) {
                                            tddata = data[i]['总单'];
                                            dataPlay = "sfc_sum8_single_double";
                                        } else if (j == 1) {
                                            tddata = data[i]['总大'];
                                            dataPlay = "sfc_sum8_big_small";
                                        } else if (j == 2) {
                                            tddata = data[i]['总尾大'];
                                            dataPlay = "sfc_sum8_mantissa_big_small";
                                        } else if (j == 4) {
                                            tddata = data[i]['总双'];
                                            dataPlay = "sfc_sum8_single_double";
                                        } else if (j == 5) {
                                            tddata = data[i]['总小'];
                                            dataPlay = "sfc_sum8_big_small";
                                        } else if (j == 6) {
                                            tddata = data[i]['总尾小'];
                                            dataPlay = "sfc_sum8_mantissa_big_small";
                                        }
                                        $(tdpls[j]).find("strong").text(tddata.odd);
                                        var index = $(tdpls[j]).index();
                                        $(tdpls[j]).parent().find("td").eq(index - 1).find("strong").text(tddata.betNum);
                                        var inputobj = $(tdpls[j]).parent().find("td").eq(index + 1).find("input");
                                        inputobj.attr("data-code", tddata.code);
                                        inputobj.attr("data-bet-code", tddata.betCode);
                                        inputobj.attr("data-bet-num", tddata.betNum);
                                        inputobj.attr("data-odds", tddata.odd);
                                        inputobj.attr("data-play", dataPlay);
                                        inputobj.attr("data-name", $($(".main-left .table-common thead")[2]).find("tr th").text() + "-" + tddata.betNum);
                                    }
                                }
                            } else {//第1-8球
                                var tbody;
                                if (i >= 0 && i < 4) {
                                    tbody = $($(".main-left .table-common tbody")[0]);
                                } else {
                                    tbody = $($(".main-left .table-common tbody")[1]);
                                }
                                var tdpls = tbody.find("tr td.peilv.tdnum" + i);
                                for (j = 0; j < tdpls.length; j++) {
                                    var tdata;
                                    var dataPlay;
                                    if (j == 0) {
                                        tdata = data[i]['大'];
                                        dataPlay = "sfc_big_small";
                                    } else if (j == 1) {
                                        tdata = data[i]['小'];
                                        dataPlay = "sfc_big_small";
                                    } else if (j == 2) {
                                        tdata = data[i]['单'];
                                        dataPlay = "sfc_single_double";
                                    } else if (j == 3) {
                                        tdata = data[i]['双'];
                                        dataPlay = "sfc_single_double";
                                    } else if (j == 4) {
                                        tdata = data[i]['尾大'];
                                        dataPlay = "sfc_mantissa_big_small";
                                    } else if (j == 5) {
                                        tdata = data[i]['尾小'];
                                        dataPlay = "sfc_mantissa_big_small";
                                    } else if (j == 6) {
                                        tdata = data[i]['合单'];
                                        dataPlay = "sfc_sum_single_double";
                                    } else if (j == 7) {
                                        tdata = data[i]['合双'];
                                        dataPlay = "sfc_sum_single_double";
                                    }
                                    $(tdpls[j]).find("strong").text(tdata.odd);
                                    var index = $(tdpls[j]).index();
                                    $(tdpls[j]).parent().find("td").eq(index - 1).find("strong").text(tdata.betNum);
                                    var inputobj = $(tdpls[j]).parent().find("td").eq(index + 1).find("input");
                                    inputobj.attr("data-code", tdata.code);
                                    inputobj.attr("data-bet-code", tdata.betCode);
                                    inputobj.attr("data-bet-num", tdata.betNum);
                                    inputobj.attr("data-odds", tdata.odd);
                                    inputobj.attr("data-play", dataPlay);
                                    inputobj.attr("data-name", "第" + chnNumChar[i] + "球" + "-" + tdata.betNum);

                                }
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