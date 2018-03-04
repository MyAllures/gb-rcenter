/**
 * 定位
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            $('.fix-type a').eq(0).click();
        },
        bindButtonEvents: function () {
            var _this = this;
            this._super();
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
                _this.refreshTableCommon($(this).data('code'))
            })
        },
        fillData:function(){
            var places = [];
            var betCode = $(".main-left .fix-type a.active").data("code");
            if(betCode == "pl3_hundred_ten"){
                places[0]='百位';
                places[1]='十位';
            }else if(betCode == "pl3_hundred_one"){
                places[0]='百位';
                places[1]='个位';
            }else if(betCode == "pl3_ten_one"){
                places[0]='十位';
                places[1]='个位';
            } else if(betCode == "pl3_hundred_ten_one"){
                places[0]='百位';
                places[1]='十位';
                places[2]='个位';
            }
            if(places.length != 0){
                var i = 0;
                $(".main-left .table-common tbody tr[data-name]").each(function() {
                    $(this).attr("data-name",places[i]);
                    $(this).find("td.pointer:eq(0)").html(places[i++]);
                });
            }
        },
        getBetOrder:function(){
            var betCode = $(".main-left .fix-type a.active").data("code");
            if(betCode == "pl3_hundred" || betCode == "pl3_ten" || betCode == "pl3_one"){
                return this._super();
            }else if(betCode == "pl3_hundred_ten" || betCode == "pl3_hundred_one" || betCode == "pl3_ten_one" || betCode == "pl3_hundred_ten_one"){
                return this.getTwoAndThreeBetOrder();
            }
            return undefined;
        },
        getTwoAndThreeBetOrder:function(){
            var allGroup = this.getAllGroup();
            if (typeof allGroup != 'object') {
                return;
            }
            var _this = this;
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            var betAmount = $("input#inputMoney").val();
            var memo = $(".main-left .table-common input.lottery").data("name");
            var odd = $(".main-left .table-common input.lottery").data("odd");
            var betCode = $(".main-left .table-common input.lottery").data("bet-code");
            var playCode = $(".main-left .table-common input.lottery").data("play");
            var expect = $('i#expect').text();
            var code = this.code;
            for(var index = 0; index < allGroup.length; index++){
                var betNum = allGroup[index];
                betForm.betOrders.push({
                    expect: expect,
                    code: code,
                    betCode: betCode,
                    playCode: playCode,
                    betNum: betNum,
                    odd: odd,
                    betAmount: betAmount,
                    memo: memo+"-"+betNum
                });
                betForm.totalMoney = add(betForm.totalMoney, betAmount);
                betForm.quantity = add(betForm.quantity, 1);
            }
            if(betForm.quantity>500){
                layer.msg("注数过大");
                return;
            }
            return betForm;
        },
        getAllGroup:function(){
            if($(".main-left .table-common tbody tr td.bg-yellow").length == 0){
                layer.msg("请选择");
                return;
            }
            var groupList = [];
            var flag = false;
            var i = 0;
            $(".main-left .table-common tbody tr").each(function(){
                var inputList = [];
                var j = 0;
                $(this).find("td.bg-yellow").each(function(){
                    inputList[j++] = $(this).data("name");
                });
                if(inputList.length == 0){
                    flag = true;
                    return;
                }
                groupList[i++] = inputList;
            });
            if(flag){
                layer.msg("至少选择一组号码");
                return;
            }
            var betAmount = $("input#inputMoney").val();
            if(betAmount == "" || betAmount == undefined || betAmount == null){
                layer.msg("请输入正确金额");
                return;
            }
            var allBetGroup=[];
            this.doAllBetGroup(groupList,0,allBetGroup,[]);
            return allBetGroup;
        },
        //递归获取所有勾选号码组合
        doAllBetGroup:function(arr, depth, allBetGroup, betGroup){
            for (var i = 0; i < arr[depth].length; i++) {
                betGroup[depth] = arr[depth][i]
                if (depth != arr.length - 1) {
                    this.doAllBetGroup(arr, depth + 1, allBetGroup,betGroup);
                } else {
                    allBetGroup.push(betGroup.join(''))
                }
            }
        }
    })
});