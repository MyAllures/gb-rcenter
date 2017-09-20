define(['site/hall/PlayWay','site/plugin/template'], function (PlayWay,Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        getRandomNumber:function(len){
            var list = [];
            var sum = 0;
            for (var i = 0; i < len; ++i) {
                var value = Math.floor(Math.random() * 10);
                list[i] = value;
                sum += value;
            }
            var tmpStr = Template('template_lastOpenCode', {numArr:list,sum:sum});
            return tmpStr;
        },/**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var sum = 0;
                $.each(numArr, function (ind, val) {
                    sum += parseInt(val);
                });
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        sum:sum
                    });
            });
            $("#recentHistory").html(openList);
        },
        /**
         * 获取赔率
         */
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdd.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        $tdBet.each(function(){
                            var betNum = $(this).attr('data-bet-num');
                            var thisData=data[subCode];
                            var bet = thisData[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        },
        showLastOpenCode: function (openCodeArr) {
            var tmpStr = '';
            var sum = 0;
            var colorBg = 'lottery-ball';

            $.each(openCodeArr, function(index, value) {
                sum += parseInt(value);

                if(index < 2){
                    tmpStr += '<span  class="lottery-ball">' + value + '</span><span class="plus">+</span>';
                } else{
                    tmpStr += '<span  class="lottery-ball">' + value + '</span><span class="plus">=</span><span class="lottery-ball xy28-num" num="'+sum +'">' + sum + '</span>';
                }

            });
            $("#lastOpenCode").html(tmpStr);
        }
    });
});