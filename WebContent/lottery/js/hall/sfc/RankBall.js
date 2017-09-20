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
            var betCode = $('#lotteryBetCode').val();
            var code = this.code;
            ajaxRequest({
                url: root + '/sfc/getBetOdds.html',
                data: {code: code, betCode: betCode},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        var oddsar = eval(data);
                        $.each(oddsar, function (i, item) {
                            if (i < 21) {
                                var tdpls = $("#peilv" + Number(i));
                                var inputindex = $(tdpls).index() + 1;
                                var numindex = $(tdpls).index() - 1;
                                var inputobj = $(tdpls).parent().find("td").eq(inputindex).find("input");
                                var strongobj = $(tdpls).parent().find("td").eq(numindex).find("strong");
                                $(tdpls).find("strong").text(item.odd);
                                strongobj.text(i);
                                inputobj.attr("data-code", item.code);
                                inputobj.attr("data-bet-code", item.betCode);
                                inputobj.attr("data-bet-num", item.betNum);
                                inputobj.attr("data-odds", item.odd);
                                inputobj.attr("data-play", $("#lotteryPlay").val());
                                inputobj.attr("data-name", $('p.kuaiqian span.acti').text() + "-" + item.betNum);
                            }

                        })

                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        }
    })
});