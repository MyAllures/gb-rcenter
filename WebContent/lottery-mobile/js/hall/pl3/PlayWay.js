define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.isGfwf();
        },
        //传统,官方玩法切换
        isGfwf: function () {
            var type = $("input[name='type']").val();
            var code = $("input[name='code']").val();
            var _this = this;
            var lotteryGenra = $("input#lotteryGenra").val();
            mui("body").on("tap", "a#is-gfwf", function () {
                if(lotteryGenra ==1) {
                    var flag = $(this).attr("data-flag");
                    _this.gotoUrl(root + '/' +type + '/' +code + '/index.html?betCode=&isGfwf='+flag);
                }
            });
        },

        showLastOpenCode: function (numArr) {
            var titles = [];
            var sum = 0;
            $.each(numArr,function(index,value){
                sum += parseInt(value);
            });
            titles[0] = sum;
            titles[1] = sum % 2 == 0?'双':'单';
            titles[2] = sum > 13?'大':'小';
            var html = Template('template_lastOpenCode', {numArr: numArr,titles:titles});
            $("#lastOpenCode").html(html);
        },/**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var titles = [];
                var sum = 0;
                $.each(numArr,function(index,value){
                    sum += parseInt(value);
                });
                titles[0] = sum;
                titles[1] = sum % 2 == 0?'双':'单';
                titles[2] = sum > 13?'大':'小';
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        titles:titles
                    });
            });
            $("#recentHistory").html(openList);
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
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
        }

    });
});