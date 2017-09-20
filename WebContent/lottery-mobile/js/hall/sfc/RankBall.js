define(['site/hall/sfc/AllSfc', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            this._super();
            _this = this;

        },
        getOdds: function () {
            var betCode = $("#lotteryBetCode").val();
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    console.log(data[betCode]);
                    $("div.bet-table > div > table > tbody tr td").each(function (i,item) {
                        var ii =i+1;
                        var td = $("#tdnum" + ii);
                        var spans = td.find("span");
                        var index;
                        if (ii<10){
                            index = "0"+ii;
                        }else {
                            index = ii + "";
                        }
                        var tdata = data[betCode][index];
                        $(spans[1]).text(tdata.odd);
                        td.attr("data-odds",tdata.odd);
                        td.attr("data-bet-code",tdata.betCode);
                        td.attr("data-bet-num",tdata.betNum);
                        td.attr("data-play","sfc_digital");
                        td.attr("data-name",$("a.mui-control-item.mui-active").text()+"-"+tdata.betNum);
                    });

                }
            })
        }
    });
});