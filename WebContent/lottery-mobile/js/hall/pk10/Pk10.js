define(['site/hall/PlayWay','site/plugin/template'], function (PlayWay,Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        getRandomNumber: function (len) {
            var list = [];
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10)+1;
                list[i] = num < 10?"0"+num:num;
            }
            return Template('template_lastOpenCode', {numArr: list});
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
        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            html+='<span class="inline-list-2">';
            var sum=parseInt(numArr[0])+parseInt(numArr[1]);
            html+='<i class="lottery-block">'+sum+'</i>';
            if(sum%2==0){
                html+='<i class="lottery-block">双</i>';
            }else{
                html+='<i class="lottery-block">单</i>';
            }
            if(sum>=11){
                html+='<i class="lottery-block">大</i>';
            }else{
                html+='<i class="lottery-block">小</i>';
            }
            if(parseInt(numArr[0])>parseInt(numArr[9])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[1])>parseInt(numArr[8])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[2])>parseInt(numArr[7])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[3])>parseInt(numArr[6])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[4])>parseInt(numArr[5])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            html+='</span>';
            $("#lastOpenCode").html(html);
        }
    });
});