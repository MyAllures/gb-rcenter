/**
 * 组三
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        onPageLoad: function () {
            this._super();
            this.refreshTableCommon($(".main-left input.hiddenCode").data('code'));
        },bindTdInput: function () {
            this._super();
            $('.table-common td.new-ball-st').on('click', function () {
                var num = $('.table-common td.bg-yellow').length;
                var odd = '';
                if(num >= 5 && num <= 10){
                    odd = $('.table-common input.group3Odd_'+num).data("odd");
                }
                $('.table-common .group3Odd').html(odd);
            })
        },clearTdInput : function(){
            this._super();
            $('.table-common .group3Odd').html('');
        },
        getBetOrder:function(){
            var $num = $('.table-common td.bg-yellow');
            if($num.length == undefined || $num.length < 5){
                layer.msg("请选择5个及以上号码");
                return;
            }if($num.length > 10){
                layer.msg("无效选号,请重置号码后重新选号");
                return;
            }
            var betAmount = $("input#inputMoney").val();
            if(betAmount == "" || betAmount == undefined || betAmount == null){
                layer.msg("请输入正确金额");
                return;
            }

            var betNum = [];
            var i = 0;
            $num.each(function(){
                betNum[i++] = $(this).data("num")
            });
            return this.getBetForm($(".table-common input.group3Odd_"+$num.length),betNum.join(","));
        },
        getBetForm:function($betType,betNum){
            var _this = this;
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            betForm.betOrders.push({
                expect: $('i#expect').text(),
                code: _this.code,
                betCode: $betType.data("bet-code"),
                playCode: $betType.data("play"),
                betNum: betNum,
                odd: $betType.data("odd"),
                betAmount: $("input#inputMoney").val(),
                memo: $betType.data("name")+"-"+betNum
            });
            betForm.totalMoney = add(betForm.totalMoney, $("input#inputMoney").val());
            betForm.quantity = add(betForm.quantity, 1);
            return betForm;
        }
    })
});