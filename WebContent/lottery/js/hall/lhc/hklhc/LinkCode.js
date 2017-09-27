define(['site/hall/lhc/hklhc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            $(".main-left .fr .T-tab a.active").click();
        },
        bindButtonEvents: function () {
            this._super();
            this.getLinkCode();
        },
        /**
         * 六合彩正码特跳转子页面
         */
        getLinkCode: function () {
            $(".main-left .fr .T-tab a").click(function () {
                $(".main-left .fr .T-tab a").removeClass("active");
                $(this).addClass("active");
                var subCode = $(this).attr("subCode");
                var title = $(this).text();
                $("#current_lhc").val(title);

                ajaxRequest({
                    url: root + '/lhc/hklhc/getLhcBet.html',
                    data: {"subCode": subCode},
                    dataType: "json",
                    success: function (data) {
                        var bet = data[title];
                        $("#oddValue").text(bet.odd);
                        $(".lhc-ztm tr").each(function (i) {
                            var $tr = $(this).find("input");
                            $($tr).each(function () {
                                //$(this).parent("td").prev().find("strong").html(bet.odd);
                                $(this).attr("data-odds", bet.odd);
                                $(this).attr("data-bet-code", bet.betCode);
                                //$(this).attr("data-name", title + "-" + $(this).attr("data-name"));
                                $(this).attr("data-play",$("#playCode").val());
                                $(this).attr("data-bet-num",bet.betNum);
                            })

                        });
                    },
                    error: function (e) {
                        console.log("error");
                    }
                });
                $(".main-left .fl input").val("");
            });
        },
        /** 获取注单 */
        getBetOrder: function () {
            var _this = this;
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            $(".main-left .table-common input").each(function () {
                if ($(this).attr("checked")!=undefined) {
                    //改为attr取值，防止值变动，这里的$(this).data值不变
                    betForm.betOrders.push({
                        expect: $('i#expect').text(),
                        code: _this.code,
                        betCode: $(this).attr('data-bet-code'),
                        playCode: $(this).attr('data-play'),
                        betNum: $(this).attr('data-name'),
                        odd: $(this).attr("data-odds"),
                        betAmount: $("#inputMoney").val(),
                        memo: $(this).attr("data-name")
                    });
                }
            });
            return betForm;
        },

        /** 下注 */
        placeOrder: function () {
            var _this = this;
            var betForm = this.getBetOrder();
            if (typeof betForm != 'object') {
                return;
            }
            if (betForm.betOrders.length < 3) {
                layer.msg("请至少选择３个号码");
                return;
            }
            if(!$("#inputMoney").val()){
                layer.msg("请选择金额！");
                return;
            }

            var betNumArr = new Array();

            for(var index in betForm.betOrders){
                betNumArr.push(betForm.betOrders[index].betNum);
            }

            var combinationArr = queue(betNumArr, 3);

            var arrangementArr = new Array();

            for(var i=0;i<combinationArr.length;i++){
                if(!contains(arrangementArr,combinationArr[i])){
                    arrangementArr.push(combinationArr[i]);
                    betForm.totalMoney = add(betForm.totalMoney, $("#inputMoney").val());
                    betForm.quantity = add(betForm.quantity, 1);
                }
            }

            var title = $("#current_lhc").val();
            var betAmount = $("#inputMoney").val();
            var odd = $("#oddValue").text();

            var content = '<p class="place-tip">共计：￥<b> ' + betForm.totalMoney + ' </b>/<b> ' + betForm.quantity + ' </b>&nbsp;注，您确定要下注吗？</p>';

            var betOrder = betForm.betOrders[0];
            betForm.betOrders = [];

            $.each(arrangementArr, function (index, value) {
                //[ 三全中-1,2,3 ] @650 X 50
                betOrder.betNum = value.toString();
                betForm.betOrders.push(jQuery.extend(true, {}, betOrder));
                content += '<p><span>[&nbsp;' + title+'-'+ value + '&nbsp;]</span><span>&nbsp;@' + odd + '&nbsp;X&nbsp;' + betAmount + '</span></p>';
            });

            // 询问框
            layer.confirm(content, {
                btn: ['确认', '取消'], //按钮
                title: "<font color='red'>" + $('i#expect').text() + "期</font>下注清单"
            }, function () {
                _this.confirmOrder(betForm);
            });

            $(".layui-layer-title").addClass('place-title');
            $(".layui-layer-close").addClass('place-close');
        },

        bindTdInput : function(){
            $(".main-left .table-common tbody tr td.new-ball-st").click(function () {
                if ($(this).hasClass("bg-yellow")) {
                    $(this).removeClass("bg-yellow");
                    $(this).find("input").attr("checked",false);
                } else {
                    $(this).addClass("bg-yellow");
                    $(this).find("input").attr("checked",true);
                }
            });
        },

        //如果有特殊玩法除了重置页面input之外的其他操作,请继承该js,重写该方法
        clearTdInput : function(){
            page.reset();
            $(".main-left .table-common input").attr("checked",false);
        }

    })
});

function queue(arr, size) {
    if (size > arr.length) { return; }
    var allResult = [];

    (function (arr, size, result) {
        if (result.length == size) {
            allResult.push(result);
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                var newArr = [].concat(arr),
                    curItem = newArr.splice(i, 1);
                arguments.callee(newArr, size, [].concat(result, curItem));
            }
        }
    })(arr, size, []);

    return allResult;
}

function  contains(array, element) {
    for(var i=0;i<array.length;i++){
        if(array[i].sort().toString()==element.sort().toString()){
            return true;
        }
    }
    return false;
}