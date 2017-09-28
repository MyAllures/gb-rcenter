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
                $("#lhc_title").text(title);

                ajaxRequest({
                    url: root + '/lhc/hklhc/getLhcBet.html',
                    data: {"subCode": subCode},
                    dataType: "json",
                    success: function (data) {

                        var bet = null;

                        if(data[title]){
                            bet = data[title];
                            $("#oddValue").text(bet.odd);
                        }

                        var numJson = {"二":2, "三":3,"四":4,"五":5,"六":6,"七":7,"八":8,"九":9,"十":10,"十一":11};

                        var minNum = numJson[title.substring(0,2)];

                        if(minNum>10){
                            minNum = minNum;
                        }else{
                            minNum = numJson[title.substring(0,1)];
                        }

                        $("#minNum").text(minNum);

                        $(".lhc-ztm tr").each(function (i) {

                            var $tr = $(this).find("input");
                            $($tr).each(function () {

                                $(this).attr("data-odds", bet.odd);
                                $(this).attr("data-bet-code", bet.betCode);
                                $(this).attr("data-play",$("#playCode").val());
                                $(this).attr("data-bet-num",bet.betNum);
                            })

                        });

                        var tdList = $(".main-left .table-common tbody tr td.hx-list");
                        tdList.removeClass("bg-yellow");
                        tdList.each(function() {
                            $(this).find("input").attr("checked",false);
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

            var minNum = $("#minNum").text();

            if (betForm.betOrders.length < minNum) {
                layer.msg("请至少选择"+minNum+"个号码");
                return;
            }

            if(!$("#inputMoney").val()){
                layer.msg("请选择金额！");
                return;
            }
            //下注数组
            var betNumArr = new Array();

            for(var index in betForm.betOrders){
                betNumArr.push(betForm.betOrders[index].betNum);
            }

            //组合数组
            var chooseArr = this.choose(betNumArr,minNum);

            betForm.quantity = chooseArr.length;
            betForm.totalMoney = chooseArr.length * $("#inputMoney").val();

            var title = $("#lhc_title").text();
            var betAmount = $("#inputMoney").val();
            var odd = $("#oddValue").text();

            var content = '<p class="place-tip">共计：￥<b> ' + betForm.totalMoney + ' </b>/<b> ' + betForm.quantity + ' </b>&nbsp;注，您确定要下注吗？</p>';

            var betOrder = betForm.betOrders[0];
            betForm.betOrders = [];

            $.each(chooseArr, function (index, value) {
                //[ 三全中-1,2,3 ] @650 X 50
                betOrder.betNum = value.toString();
                betForm.betOrders.push(jQuery.extend(true, {}, betOrder));
                content += '<p><span>[&nbsp;' + title+'-'+ value + '&nbsp;]</span><span>&nbsp;@' + odd  +'&nbsp;X&nbsp;' + betAmount +'</span></p>';
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
            // 点击变黄
            $(".main-left .table-common tbody tr td.hx-list").click(function() {
                var xz = $(this).hasClass("bg-yellow");
                if (xz == true) {
                    $(this).removeClass("bg-yellow");
                    $(this).children("input").attr("checked",false);
                } else{
                    $(this).addClass("bg-yellow");
                    $(this).children("input").attr("checked",true);
                };
            });
        },

        //如果有特殊玩法除了重置页面input之外的其他操作,请继承该js,重写该方法
        clearTdInput : function(){
            page.reset();
            $(".main-left .table-common input").attr("checked",false);
        },

        choose : function (arr, size) {
            var allResult = [];
            (function (arr, size, result) {
                var arrLen = arr.length;
                if (size > arrLen) {
                    return;
                }
                if (size == arrLen) {
                    allResult.push([].concat(result, arr))
                } else {
                    for (var i = 0; i < arrLen; i++) {
                        var newResult = [].concat(result);
                        newResult.push(arr[i]);

                        if (size == 1) {
                            allResult.push(newResult);
                        } else {
                            var newArr = [].concat(arr);
                            newArr.splice(0, i + 1);
                            arguments.callee(newArr, size - 1, newResult);
                        }
                    }
                }
            })(arr, size, []);
            return allResult;
        }

    })


});

