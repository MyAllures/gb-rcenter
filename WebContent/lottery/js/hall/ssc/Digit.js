/**
 * 一字组合
 */
define(['site/hall/ssc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.getBetOdds();
        },
        bindButtonEvents: function () {
            this._super();
            var _this = this;
        },
        getBetOdds: function () {
            var _this = this;
            ajaxRequest({
                url: root + '/ssc/getDigitOdd.html',
                data: {code: _this.code},
                success: function (data) {
                    console.log(data)
                    if (!$.isEmptyObject(data)) {
                        for (var i = 0; i < data.length; i++) {
                            var tableobj = $("div.table-common table.tablenum"+i);
                            var title = tableobj.find("thead > tr:nth-child(1) > th").text();
                            for (var j = 0; j < 10; j++) {
                                var tdobj = tableobj.find("td.num"+j);
                                var dataobj = data[i][j];
                                tdobj.find("strong").text(dataobj.betNum);
                                tdobj.find(".color-red").text(dataobj.odd);
                                tdobj.find("input").attr("data-odds",dataobj.odd);
                                tdobj.find("input").attr("data-bet-code",dataobj.betCode);
                                tdobj.find("input").attr("data-bet-num",dataobj.betNum);
                                tdobj.find("input").attr("data-name",title+"-"+dataobj.betNum);
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