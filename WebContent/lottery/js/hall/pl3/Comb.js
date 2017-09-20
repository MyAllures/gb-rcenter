/**
 * 组合
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            $('.fix-type a').eq(0).click();
        },
        bindButtonEvents: function () {
            this._super();
            var _this = this;
            /**
             * 切换选项
             */
            $('.fix-type a').on('click', function () {
                if($(".main-left .table-common .isLoading").length > 0){
                    return;
                }
                $('.fix-type>a').removeClass('active');
                $("input#inputMoney").val("");
                $(this).addClass('active');
                _this.refreshTableCommon($(this).data('code'));
            })
        },
        getBetOrder:function(){
            var betCode = $(".main-left .fix-type a.active").data("code");
            if(betCode == "comb_one"){
                return this._super();
            }else if(betCode == "comb_two"){
                return this.getTwoBetOrder();
            }else if(betCode == "comb_three"){
                return this.getThreeBetOrder();
            }
            return undefined;
        },
        getTwoBetOrder:function(){
            var betNum = this.getBetNumArray();
            if (typeof betNum != 'object') {
                return;
            }
            var $betType = $(".main-left .table-common input.twoDiff");
            if(betNum[0] == betNum[1]){
                $betType = $(".main-left .table-common input.twoSame");
            }
            return this.getBetForm($betType,betNum[0]+''+betNum[1])
        },
        getThreeBetOrder:function(){
            var betNum = this.getBetNumArray();
            if (typeof betNum != 'object') {
                return;
            }
            var $betType = $(".main-left .table-common input.threeGroup6");
            if(betNum[0] == betNum[1] && betNum[0] == betNum[2] && betNum[1] == betNum[2]){
                $betType = $(".main-left .table-common input.threeSame");
            }else if(betNum[0] == betNum[1] || betNum[0] == betNum[2] || betNum[1] == betNum[2]){
                $betType = $(".main-left .table-common input.threeGroup3");
            }
            return this.getBetForm($betType,betNum[0]+''+betNum[1]+''+betNum[2])
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
            if($(".main-left .table-common td.bg-yellow").length == 0){
                layer.msg("请选择");
                return;
            }
            var flag = false;
            var betNum = [];
            var i = 0;
            $(".main-left .table-common table tbody tr").each(function(){
                if($(this).find(" td.bg-yellow").length != 1){
                    flag = true;
                    return;
                }
                betNum[i++]=$(this).find(" td.bg-yellow").data("num");
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