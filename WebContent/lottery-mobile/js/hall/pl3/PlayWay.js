    define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        isPl3Open:true,
        init: function () {
            this._super();
            this.isGfwf();
            this.checkPl3Handicap();
        },
        //传统,官方玩法切换
        isGfwf: function () {
            var type = $("input[name='type']").val();
            var code = $("input[name='code']").val();
            var _this = this;
            var lotteryGenra = $("input#lotteryGenra").val();
            mui("body").on("tap", "a#is-gfwf", function () {
                if(lotteryGenra ==1) {
                    var flag = $(this).attr("data-flag");
                    _this.gotoUrl(root + '/' +type + '/' +code + '/index.html?betCode=&isGfwf='+flag);
                }
            });
        },

        showLastOpenCode: function (numArr) {
            var titles = [];
            var sum = 0;
            $.each(numArr,function(index,value){
                sum += parseInt(value);
            });
            titles[0] = sum;
            titles[1] = sum % 2 == 0?'双':'单';
            titles[2] = sum > 13?'大':'小';
            var html = Template('template_lastOpenCode', {numArr: numArr,titles:titles});
            $("#lastOpenCode").html(html);
        },/**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var titles = [];
                var sum = 0;
                $.each(numArr,function(index,value){
                    sum += parseInt(value);
                });
                titles[0] = sum;
                titles[1] = sum % 2 == 0?'双':'单';
                titles[2] = sum > 13?'大':'小';
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        titles:titles
                    });
            });
            $("#recentHistory").html(openList);
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        $tdBet.each(function () {
                            var betNum = $(this).attr('data-bet-num');
                            var thisData = data[subCode];
                            var bet = thisData[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        },

        getHandicap:function ( ) {
            if (this.isRunning) {
                return;
            }
            var _this = this;
            var url = root + '/commonLottery/getExpect.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                async: false,
                data: {'code': this.code},
                beforeSend: function () {
                    _this.isRunning = true;
                },
                success: function (data) {
                    if (data) {
                        var expect = $("#expect").text();
                        $("#expect").html(data.expect);
                        $("#leftTime").attr("data-time", data.leftTime);
                        if ((_this.code == 'fc3d' || _this.code == 'tcpl3') &&_this.isPl3Open && data.leftOpenTime >0){
                            _this.closePl3Handicap();
                            $("#leftTime").parent().html("距离开盘时间还有：<font id='leftTime' >")
                            $("#leftTime").attr("data-time", data.leftOpenTime);
                            _this.isPl3Open = false;
                            // _this.showClearPopups();
                        }
                        if ((_this.code == 'fc3d' || _this.code == 'tcpl3') && !_this.isPl3Open&& data.leftOpenTime <=0){
                            var dtime = $("#leftTime").attr("data-time");
                            $("#leftTime").attr("data-time", dtime);
                            _this.isPl3Open = true;
                            _this.openPl3Handicap();
                        }
                        if (typeof callback == 'function') {
                            callback();
                        }
                    } else { //handicap为空
                        $(".mui-table-view-cell.mui-collapse").html('sorry,该彩票暂停!');
                    }
                },
                complete: function () {
                    _this.isRunning = false;
                }
            })
        },
        closePl3Handicap:function () {
                mui("body").off('tap', 'div.bet-table-list td,div.bet-table-list .n-btn');
                $("div.bet-table-list .n-btn").attr("style","color: #c1c1c1!important");
                $(".fengPan").addClass("disabled");
                // $("div.fix-div.two-word-fix").addClass("disabled");
                $("#inputMoney").attr("placeholder","已封盘");
                $("#inputMoney").attr("disabled",true);
                $("a#show-t").addClass("disabled-btn");
                $("a#show-t").attr("id","show_t");
        },
        openPl3Handicap:function () {
            // mui("body").on('tap', 'div.bet-table-list td,div.bet-table-list .n-btn');
            // $("div.bet-table-lists td,div.bet-table-lists .n-btn").attr("style","");
            $("div.bet-table-list .n-btn").attr("style","color:");
            $(".fengPan").removeClass("disabled");
            $("#inputMoney").attr("placeholder","");
            $("#inputMoney").attr("disabled",false);
            $("a#show_t").removeClass("disabled-btn");
            $("a#show_t").attr("id","show-t");
            /** 小彩种 */
            this.code = $(this.formSelector + ' input[name=code]').val();
            this.type = $(this.formSelector + " input[name=type]").val();
            this.betCode = $(this.formSelector + " .ssc-method-list .ssc-method-label a.mui-active").attr("data-code");
            this.getOpenHistory();
            // this.muiInit();
            this.iosGoBack();
            this.init();
            if(this.os == 'pc') {
                //已应对在h5下金额输入框不能输入
                $("input#inputMoney").focus();
            }
        },
        showClearPopup:function () {

        },
        showClearPopups: function () {
            console.log("封盘了")
            if (this.clearPopFlag) {
                return;
            }
            mui.toast("当前期已封盘，请等待下期开盘.");
            var time = 5;
            var _this = this;
            this.clearPopLayer = setInterval(function () {
                if (time == 0) {
                    _this.closeClearPopup();
                    return;
                }
                $(".clearBet_time").html(time);
                --time;
            }, 1000)
        },
        checkPl3Handicap:function () {
            if (!this.isPl3Open){
                this.closePl3Handicap();
            }
        }

    });
});