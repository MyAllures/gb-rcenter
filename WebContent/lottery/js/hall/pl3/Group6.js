/**
 * 组六
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        onPageLoad: function () {
            this._super();
            this.refreshTableCommon($(".main-left input.hiddenCode").data('code'));
        },bindTdInput: function () {
            this._super();
            $('.table-common td.new-ball-st').on('click', function () {
                debugger;
                var num = $('.table-common td.bg-yellow').length;
                var odd = '';
                if(num >= 4 && num <= 8){
                    odd = $('.table-common table thead input.group6Odd_'+num).data("odd");
                }
                $('.table-common table thead .group6Odd').html(odd);
            })
        },clearTdInput : function(){
            this._super();
            $('.table-common table thead .group6Odd').html('');
        },
        getBetOrder:function(){
            var $num = $('.table-common td.bg-yellow');
            if($num.length == undefined || $num.length < 4 || $num.length > 8){
                layer.msg("请选择4~8个号码");
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
            return this.getBetForm($(".table-common input.group6Odd_"+$num.length),betNum.join(","));
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
        },
        getBetNumArray:function(){
            if($(".table-common td.bg-yellow").length == 0){
                layer.msg("请选择");
                return;
            }
            var flag = false;
            var betNum = [];
            var i = 0;
            $(".table-common tbody tr").each(function(){
                if($(this).find("td.bg-yellow").length != 1){
                    flag = true;
                    return;
                }
                betNum[i++]=$(this).find("td.bg-yellow").data("num");
            });
            if(flag){
                layer.msg("仅且只能选择一组号码");
                return;
            }
            var betAmount = $("input#inputMoney").val();
            if(betAmount == "" || betAmount == undefined || betAmount == null){
                layer.msg("请输入正确金额");
                return;
            }
            return betNum;
        }
    })
});