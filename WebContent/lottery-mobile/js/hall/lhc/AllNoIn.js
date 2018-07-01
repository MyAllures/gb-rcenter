define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-全不中",this.getSecondCode(),$("#quanbuzhong"),"allNoIn");
            this._super();

        },

        getSecondText:function () {
            return $("div#quanbuzhong a.mui-active span").text()==""?"五不中":$("div#quanbuzhong a.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="allNoIn"?"五不中":$("#gfwfBetCode").val();
        },

        getOdds: function () {
            page.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/allNoInOdd.html';
            var activeA = $("#quanbuzhong a.main.mui-active[data-subCode]");
            var subCode = activeA.attr("data-subCode");
            var minNum = activeA.attr("min-num");
            var title = activeA.text();
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'betCode': subCode},
                success: function (data) {
                    if(data[minNum]){
                        var bet = data[minNum];
                        $("#oddValue").text(bet.odd);
                    }
                    $("#minNum").text(minNum);
                    $("#lhc_title").text(title);
                }
            })
        },
        /**
         * 验证是否符合下注条件
         * @returns {boolean}
         */
        checkBetOrder: function () {
            var result = this._super();
            if(!result){
                return false;
            }
            var activeTds = $("div.bet-table-list .mui-active");
            var minNum = $("#minNum").text();
            if (activeTds.length < minNum) {
                this.toast("请至少选择"+minNum+"个号码");
                return false;
            }
            return true;
        },
        /**
         * 获取注单
         * @returns {{code: *, expect: (*|jQuery), type: *, betOrders: Array}}
         */
        getBetOrder: function () {
            var _this = this;
            var betAmount = $("input#inputMoney").val();
            betAmount = parseInt(betAmount);
            var betNumArr = new Array();
            var minNum = $("#minNum").text();
            $("div.bet-table-list .mui-active").each(function () {
                var num = $(this).attr("data-bet-num");
                if(num){
                    betNumArr.push(num);
                }
            });
            var chooseArr = this.combination(betNumArr, minNum);
            if(chooseArr.length>500){
                mui.toast("注数过大");
                return;
            }
            var expect = $('font#expect').text();
            var odd = $("#oddValue").text();
            var memo = $("#lhc_title").text();
            var playCode = $("#playCode"+minNum).val();
            var betCode = $("#quanbuzhong a.main.mui-active[data-subCode]").attr("data-subCode");
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            for(var i = 0; i < chooseArr.length; i++){
                var value = chooseArr[i];
                betForm.betOrders.push({
                    expect: expect,
                    code: _this.code,
                    betCode: betCode,
                    playCode: playCode,
                    betNum: value,
                    odd: odd,
                    betAmount: betAmount,
                    memo: memo+"- "+value
                });
                betForm.totalMoney += betAmount;
                betForm.quantity++;
            }
            return betForm;
        },
        //点击投注选项
        bindTdInput: function (obj) {
            var name = $("a.main.mui-active").attr("data-code");
            var num = parseInt($("a.main.mui-active").attr("min-num"));
            if(name=="五不中"){
                num =num+6;
            }else if(name=="六不中"){
                num =num+5;
            }else if(name=="七不中"){
                num =num+4;
            }else if(name=="八不中"){
                num =num+4;
            }else if(name=="九不中"){
                num =num+3;
            }else if(name=="十不中"){
                num =num+3;
            }else if(name=="十一不中"){
                num =num+3;
            }else if(name=="十二不中"){
                num =num+3;
            }
            var flag = $(obj).is('.not-selected');
            if (!flag) {
                $(obj).toggleClass('mui-active');
                if($("td.mui-active").length>num){
                    mui.toast("注数过大");
                    $(obj).removeClass('mui-active');
                }
            }
            var arrLength = $("div.bet-table-list .mui-active").length;
            $("#quantity").text(this.combinationNum(arrLength,$("#minNum").text()));
        }
    });
});