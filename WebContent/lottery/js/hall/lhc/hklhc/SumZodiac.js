define(['site/hall/lhc/hklhc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playCode:null,
        betCode:null,
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
            var _this = this;
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
                                $(this).attr("data-bet-num",bet.betNum);
                            })

                        });

                        var tdList = $(".main-left .table-common tbody tr td.hx-list");
                        tdList.removeClass("bg-yellow");
                        tdList.each(function() {
                            $(this).find("input").attr("checked",false);
                        });

                        _this.playCode=$("#playCode").val();
                        _this.betCode=bet.betCode;

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
            var minNum = $("#minNum").text();
            if ($(".main-left .table-common td.bg-yellow").length < minNum) {
                layer.msg("请至少选择"+minNum+"个号码");
                return;
            }
            var betAmount = $("input#inputMoney").val();
            if(betAmount == "" || betAmount == undefined || betAmount == null){
                layer.msg("请输入正确金额");
                return;
            }
            betAmount = parseInt(betAmount);
            var betNumArr = new Array();
            $(".main-left .table-common td.bg-yellow").each(function () {
                var num = $(this).children("strong:first-child").text();
                if(num){
                    betNumArr.push(num);
                }
            });
            var chooseArr = this.combination(betNumArr, minNum);

            var expect = $('i#expect').text();
            var odd = $("#oddValue").text();
            var memo = $("#lhc_title").text();

            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            var count = chooseArr.length;
            for(var i = 0; i < count; i++){
                var value = chooseArr[i];
                betForm.betOrders.push({
                    expect: expect,
                    code: _this.code,
                    betCode: _this.betCode,
                    playCode: _this.playCode,
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

        //组合函数
        combination : function (arr, size) {
            var allResult = [];
            if(arr.length >= size){
                var temp = new Array(size)
                temp[size-1]="";
                this.combinationSelect(allResult,arr,0,temp,0);
            }
            return allResult;
        },
        combinationSelect : function(allResult,dataList,dataIndex,resultCode,resultIndex){
            var resultLen = resultCode.length;
            var resultCount = resultIndex + 1;
            if (resultCount > resultLen) { // 全部选择完时，输出组合结果
                allResult.push(resultCode.join(","));
                return;
            }
            var count = dataList.length + resultCount - resultLen;
            for (var i = dataIndex; i < count; i++) {
                resultCode[resultIndex] = dataList[i];
                this.combinationSelect(allResult,dataList, i + 1, resultCode, resultIndex + 1);
            }
        }

    })


});

