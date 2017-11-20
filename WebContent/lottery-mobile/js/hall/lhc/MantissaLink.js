define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        lhcBet:null,
        init: function () {
            this._super();
        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='mantissaLink']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#weishulian").show();
            $(".x_3.gfwf-playName").text(BetCode);
            $("span.x_1.gfwf-tit").text(BetCode);
            $(".s-title.title1 span").text("尾数连");
            $(".s-title.title2 span").text(BetCode);
            $("#toobarTitle").text("信用玩法-尾数连");
        },



        getOdds: function () {
            var _this = this;
            page.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/mantissaLinkOdd.html';
            var activeA = $("#weishulian a.main.mui-active[data-subCode]");
            var subCode = activeA.attr("data-subCode");
            var minNum = activeA.attr("min-num");
            var title = activeA.text();
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'betCode': subCode},
                success: function (data) {
                    _this.lhcBet = data;
                    $("#lhc_title").text(title);
                    $("#minNum").text(minNum);
                    $(".bet-table-list td[data-bet-num]").each(function () {
                        var betNum = $(this).attr('data-bet-num');
                        var bet = data[betNum];
                        $(this).attr("data-odds", bet.odd);
                        $(this).attr("data-bet-code", bet.betCode);
                        $(this).children("span:last-child").text(bet.odd);
                    });

                }
            })
        },
        /**
         * 投注
         */
        betOrder: function () {
            if (!this.checkBetOrder()) {
                return;
            }
            var activeTds = $("div.bet-table-list .mui-active");
            var minNum = $("#minNum").text();
            if (activeTds.length < minNum) {
                this.toast("请至少选择"+minNum+"个号码");
                return;
            }
            var betForm = this.getBetOrder();
            this.betForm = betForm;
            var _this = this;
            sessionStorage.betForm = JSON.stringify(betForm);

            this.placeOrder(betForm);
            $("#dingdan").addClass('mui-active');
            //重新操作表单
            mui("body").off('tap','a.mui-btn.mui-btn-red').on('tap', 'a.mui-btn.mui-btn-red', function () {
                if($("div.mui-input-row.zd-wrap").size()>1){
                    $("#zhushu_new").text($("#zhushu_new").text()-1);
                    $("#zongjine_new").text($("#zongjine_new").text()-$(this).parents("li.mui-table-view-cell").find("input").val());
                    var len=$(this).parent().parent().index()-1;
                    _this.betForm.betOrders.splice(len,1);
                    $(this).parent().parent().remove();
                    _this.betForm.totalMoney=$("#zongjine_new").text();
                    _this.betForm.quantity=_this.betForm.quantity-1;
                }else{
                    $("#dingdan").html('');
                    $("#dingdan").removeClass('mui-active');
                }
            });
            $(".mui-input-numbox.jinge").keyup(function() {
                var sum = 0;
                $(".mui-input-numbox.jinge").each(function(index,value){
                    _this.betForm.betOrders[index].betAmount = Number($(this).val());
                    sum += Number($(this).val());
                })
                $("#zongjine_new").text(sum);
                _this.betForm.totalMoney=sum;
            });
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

            var expect = $('font#expect').text();
            var memo = $("#lhc_title").text();
            var playCode = $("#playCode"+$("#minNum").text()).val();
            var betCode = $("#weishulian a.main.mui-active[data-subCode]").attr("data-subCode");
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            for(var i = 0; i < chooseArr.length; i++){

                var value = chooseArr[i];
                var arrayMin = new Array();
                var valueArr = value.split(",");
                for(var index in valueArr){
                    arrayMin.push(this.lhcBet[valueArr[index]].odd);
                }
                var odd = eval("Math.min(" + arrayMin.toString() + ")");

                betForm.betOrders.push({
                    expect: expect,
                    code: _this.code,
                    betCode: betCode,
                    playCode: playCode,
                    betNum: value,
                    odd: odd,
                    betAmount: betAmount,
                    memo: memo+"-"+value
                });
                betForm.totalMoney += betAmount;
                betForm.quantity++;
            }
            return betForm;

        },
        //点击投注选项
        bindTdInput: function (obj) {
            var flag = $(obj).is('.not-selected');
            if (!flag) {
                $(obj).toggleClass('mui-active');
            }
            var arrLength = $("div.bet-table-list .mui-active").length;
            $("#quantity").text(this.combinationNum(arrLength,$("#minNum").text()));
        }
    });
});