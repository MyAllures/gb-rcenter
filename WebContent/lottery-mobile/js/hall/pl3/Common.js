define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({

        init: function () {
            this._super();
            this.checkPl3Handicap();
        },

        checkSubordinate : function (betCode,thisClassList){
            var _this = this;
            if(betCode !='zusan'){
                $("div.s-menu.second").hide();
                $("a.selected-btn.mui-active").removeClass("mui-active");
                thisClassList.toggle('mui-active');
                var dataCode=$("a.selected-btn.mui-active").attr("data-code");
                var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
                if($("a.selected-btn.main.mui-active").size()>0){
                    dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
                }
                if( //官方
                dataCode !="3star"
                && dataCode !="First2"
                && dataCode !="After2"
                //信用
                && dataCode !="fix"
                && dataCode !="comb"
                && dataCode !="sum"
                ){
                    _this.closeTop();
                }

                if(betCode =="3star" && jspName==undefined){//三星
                    jspName="3star";
                }else if(betCode =="First2" && jspName==undefined){//前二
                    jspName="First2Zxfs";
                }else if(betCode =="After2" && jspName==undefined){//后二
                    jspName="After2Zxfs";
                }else if(betCode =="DingWeiDan" && jspName==undefined){//定位胆
                    jspName="YixingDwd";
                }else if(betCode =="Sxymbdw" && jspName==undefined){//不定位
                    jspName="Sxymbdw";
                }else if(betCode =="fix" && jspName==undefined){
                    jspName="Fix1";
                    dataCode="百定位";
                }else if(betCode =="comb" && jspName==undefined){
                    jspName="Comb1";
                    dataCode="一字组合";
                }else if(betCode =="sum" && jspName==undefined){
                    jspName="Sum2";
                    dataCode="百十和数";
                }
                _this.getBetTable(dataCode,jspName);
                _this.resetBet();
            }
        },

        changeList : function(){
            var _this=this;
            var lotteryGenra=$("#GenraType").val();
            var betCode="百定位";
            var jspStr="Fix1";
            if(lotteryGenra =="pl3_yixing_dwd"){
                betCode="pl3_yixing_dwd";
                jspStr="YixingDwd";
            }
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspStr},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                    if(betCode=="pl3_yixing_dwd"){
                        $("#gfwfBetCode").val("pl3_yixing_dwd");
                        _this.backGuanfangwanfa();
                    }
                    $("#gfwfBetCode").val(betCode);
                    if(!_this.isOpen){
                        _this.closeHandicapGF();//官方
                        _this.closeHandicapXY();//信用
                    }

                }
            });
        },

        //传统,官方玩法切换
        isGfwf: function () {
            var _this = this;
            //信用
            mui("body").on("tap", "a.x_1.mui-col-xs-6", function () {
                mui.ajax(root + '/'+_this.type+'/'+_this.code+'/checkBetTable.html', {
                    data: {"jspStr": "BetAmount-xywf"},
                    type: 'POST',
                    success: function (data) {
                        _this.openXinyongwanfa(data);
                        $("a[data-code='fix']").addClass("mui-active");
                        $("a[data-code='百定位']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").addClass("x_active");
                        $("a.x_3.mui-col-xs-6").removeClass("x_active");
                        $("#toobarTitle").text("传统玩法-定位");
                        $("#GenraType").val("fix");
                        _this.changeList();
                    }
                });
            });
            //官方
            mui("body").on("tap", "a.x_3.mui-col-xs-6", function () {
                mui.ajax(root + '/'+_this.type+'/'+_this.code+'/checkBetTable.html', {
                    data: {"jspStr": "BetAmount-gfwf"},
                    type: 'POST',
                    success: function (data) {
                        _this.openGuanfangwanfa(data);
                        $("#gfwfBetCode").val("pl3_yixing_dwd");
                        $("a[data-code='pl3_yixing_dwd']").addClass("mui-active");
                        $("a[data-code='zxfs']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").removeClass("x_active");
                        $("a.x_3.mui-col-xs-6").addClass("x_active");
                        $("#toobarTitle").text("官方玩法-定位胆");
                        $("#GenraType").val("pl3_yixing_dwd");
                        _this.changeList();

                    }
                });
            });
        },

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]);
            html += "<i class='lottery-block'>" + sum + "</i>";
            if (sum % 2 == 0) {
                html += "<i class='lottery-block'>双</i>";
            } else {
                html += "<i class='lottery-block'>单</i>";
            }

            if (sum > 13) {
                html += "<i class='lottery-block'>大</i>";
            } else {
                html += "<i class='lottery-block'>小</i>";
            }
            $("#lastOpenCode").html(html);
        },


        /**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]);
                var ds;
                var dx;

                if (sum % 2 == 0) {
                    ds="双";
                } else {
                    ds="单";
                }

                if (sum > 13) {
                    dx="大";
                } else {
                    dx="小";
                }
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        sum: sum,
                        ds:ds,
                        dx:dx
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

                        if(_this.code == 'fc3d'){
                            if (_this.isOpen && data.leftOpenTime >0){
                                _this.closeHandicapGF();//官方
                                _this.closeHandicapXY();//信用
                                $("#leftTime").parent().html("距离开盘时间还有：<font id='leftTime' ></font>")
                                $("#leftTime").attr("data-time", data.leftOpenTime);
                                _this.isOpen = false;
                                _this.showClearPopups();
                            }else if (!_this.isOpen){
                                var dtime = $("#leftTime").attr("data-time");
                                $("#leftTime").parent().html("距离封盘时间还有：<font id='leftTime' ></font>")
                                $("#leftTime").attr("data-time", dtime);
                                _this.isOpen = true;
                                _this.openHandicapGF();//官方
                                _this.openHandicapXY();//信用
                            }
                        }else if(_this.code == 'tcpl3'){
                            if (_this.isOpen && data.leftOpenTime >0){
                                _this.closeHandicapGF();//官方
                                _this.closeHandicapXY();//信用
                                $("#leftTime").parent().html("距离开盘时间还有：<font id='leftTime' ></font>")
                                $("#leftTime").attr("data-time", data.leftOpenTime);
                                _this.isOpen = false;
                                _this.showClearPopups();
                            }else if(!_this.isOpen){
                                var dtime = $("#leftTime").attr("data-time");
                                $("#leftTime").parent().html("距离封盘时间还有：<font id='leftTime' ></font>")
                                $("#leftTime").attr("data-time", dtime);
                                _this.isOpen = true;
                                _this.openHandicapGF();//官方
                                _this.openHandicapXY();//信用
                            }
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
                this.closeHandicapGF();//传统
                this.closeHandicapXY();//信用
            }
        },

        //返回官方玩法投注条变化
        backGuanfangwanfa: function () {
            var _this=this;
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/checkBetTable.html', {
                data: {"jspStr": "BetAmount-gfwf"},
                type: 'POST',
                success: function (data) {
                    _this.openGuanfangwanfa(data);
                    $("a[data-code='DingWeiDan']").addClass("mui-active");
                    $("a[data-code='pl3_yixing_dwd']").addClass("mui-active");
                    $("a.x_1.mui-col-xs-6").removeClass("x_active");
                    $("a.x_3.mui-col-xs-6").addClass("x_active");
                    $("#toobarTitle").text("官方玩法-定位胆");
                    $("#GenraType").val("pl3_yixing_dwd");
                }
            });
        }

    });
});