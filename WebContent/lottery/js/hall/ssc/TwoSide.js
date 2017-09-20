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
                url: root + '/ssc/getTwoSideOdd.html',
                data: {code: _this.code},
                success: function (data) {
                    console.log(data)
                    if (!$.isEmptyObject(data)) {
                        for (var i = 0; i < data.length; i++) {
                            var tableobj = $("div.table-common table.tablenum" + i);
                            var title = tableobj.find("thead > tr:nth-child(1) > th").text();
                            if (i == 5) {//总和
                                for (var j = 1; j < 5; j++) {
                                    var tdobj = tableobj.find("td.num" + j);
                                    var  key;
                                    if (j==1){
                                        key="总大";
                                    }else if(j==2) {
                                        key="总单";
                                    }else if(j==3) {
                                        key="总小";
                                    }else if(j==4) {
                                        key="总双";
                                    }
                                    var dataobj = data[i][key];
                                    tdobj.find("strong").text(dataobj.betNum);
                                    tdobj.find(".color-red").text(dataobj.odd);
                                    tdobj.find("input").attr("data-odds", dataobj.odd);
                                    tdobj.find("input").attr("data-bet-code", dataobj.betCode);
                                    tdobj.find("input").attr("data-bet-num", dataobj.betNum);
                                    tdobj.find("input").attr("data-name","总和-" + dataobj.betNum);
                                }
                            } else {
                                for (var j = 0; j < 6; j++) {
                                    var tdobj = tableobj.find("td.num" + j);
                                    var  key;
                                    if (j==0){
                                        key="大";
                                    }else if(j==1) {
                                        key="单";
                                    }else if(j==2) {
                                        key="质";
                                    }else if(j==3) {
                                        key="小";
                                    }else if(j==4) {
                                        key="双";
                                    }else if(j==5)  {
                                        key="合";
                                    }
                                    var dataobj = data[i][key];
                                    tdobj.find("strong").text(dataobj.betNum);
                                    tdobj.find(".color-red").text(dataobj.odd);
                                    tdobj.find("input").attr("data-odds", dataobj.odd);
                                    tdobj.find("input").attr("data-bet-code", dataobj.betCode);
                                    tdobj.find("input").attr("data-bet-num", dataobj.betNum);
                                    tdobj.find("input").attr("data-name", title + "-" + dataobj.betNum);
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