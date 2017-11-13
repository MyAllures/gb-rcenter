define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({

        init: function () {
            this._super();
            this.checkPl3Handicap();
        },

        checkSubordinate : function (betCode,thisClassList){
            var _this = this;
            $("div.s-menu.second").hide();
            $("a.selected-btn.mui-active").removeClass("mui-active");
            thisClassList.toggle('mui-active');
            var dataCode=$("a.selected-btn.mui-active").attr("data-code");
            var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
            if($("a.selected-btn.main.mui-active").size()>0){
                dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            }
            if(    dataCode !="3star"
                && dataCode !="First2"
                && dataCode !="After2"
            //只有一个子菜单直接关闭遮照
            /*  && dataCode !="DingWeiDan"
             && dataCode !="BuDingWei"*/
            ){
                $('div.gfwf-bg').slideUp();
                $('div.selected-wrap').slideUp();
            }
            //三星
            if(betCode =="3star" && jspName==undefined){
                jspName="3star";
            }
            //前二
            if(betCode =="First2" && jspName==undefined){
                jspName="First2Zxfs";
            }
            //后二
            if(betCode =="After2" && jspName==undefined){
                jspName="After2Zxfs";
            }
            //定位胆
            if(betCode =="DingWeiDan" && jspName==undefined){
                jspName="YixingDwd";
            }
            //不定位
            if(betCode =="Sxymbdw" && jspName==undefined){
                jspName="Sxymbdw";
            }

            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },

        changeList : function(){
            var _this=this;
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "pl3_yixing_dwd","jspStr":"YixingDwd"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                    if(!_this.isOpen){
                        _this.closeHandicap();
                    }
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
                        if ((_this.code == 'fc3d' || _this.code == 'tcpl3') &&_this.isOpen && data.leftOpenTime >0){
                            _this.closeHandicap();//官方
                            _this.closePl3Handicap();//信用
                            $("#leftTime").parent().html("距离开盘时间还有：<font id='leftTime' >")
                            $("#leftTime").attr("data-time", data.leftOpenTime);
                            _this.isOpen = false;
                        }
                        if ((_this.code == 'fc3d' || _this.code == 'tcpl3') && !_this.isOpen&& data.leftOpenTime <=0){
                            var dtime = $("#leftTime").attr("data-time");
                            $("#leftTime").attr("data-time", dtime);
                            _this.isOpen = true;
                            _this.openHandicap();//官方
                            _this.openPl3Handicap();//信用
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


        showClearPopup:function () {

        },

        checkPl3Handicap:function () {
            if (!this.isOpen){
                this.closeHandicap();//传统
                this.closePl3Handicap();//信用
            }
        },

        /*==============================信用玩法封盘================================*/
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

    });
});