define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.isGfwf();
        },


        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]);
            html += "<i class='lottery-block'>" + sum + "</i>";
            if (sum % 2 == 0) {
                html += "<i class='lottery-block'>双</i>";
            } else {
                html += "<i class='lottery-block'>单</i>";
            }
            if (sum > 22) {
                html += "<i class='lottery-block'>大</i>";
            } else {
                html += "<i class='lottery-block'>小</i>";
            }
            if (parseInt(numArr[0]) > parseInt(numArr[4])) {
                html += "<i class='lottery-block'>龙</i>";
            } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
                html += "<i class='lottery-block'>虎</i>";
            } else {
                html += "<i class='lottery-block'>和</i>"
            }
            $("#lastOpenCode").html(html);
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        $tdBet.each(function () {
                            var betNum = $(this).attr('data-bet-num');
                            var thisData = data[subCode];
                            var bet = thisData[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        },

        //传统,官方玩法切换
        isGfwf: function () {
            var _this = this;
            var lotteryGenra = $("input#lotteryGenra").val();
            mui("body").on("tap", "a#is-gfwf", function () {
                if(lotteryGenra ==1){
                var flag = $(this).attr("data-flag");
                _this.gotoUrl(root + '/' + _this.type + '/' + _this.code + '/index.html?betCode=&isGfwf='+flag);
                }
            });
        },

        /**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]);
                var ds;
                var dx;
                var lhh;
                if (sum % 2 == 0) {
                    ds="双";
                } else {
                    ds="单";
                }
                if (sum > 22) {
                    dx="大";
                } else {
                    dx="小";
                }
                if (parseInt(numArr[0]) > parseInt(numArr[4])) {
                    lhh="龙";
                } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
                    lhh="虎";
                } else {
                    lhh="和";
                }
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        sum: sum,
                        ds:ds,
                        dx:dx,
                        lhh:lhh
                    });
            });
            $("#recentHistory").html(openList);
        }

    });
});