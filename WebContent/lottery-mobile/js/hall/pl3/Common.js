define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({

        init: function () {
            this._super();
            this.bindChangLong();
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
                        _this.closeHandicapXY();//信用
                        _this.closeHandicapGF();//官方
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
                    if (!_this.isOpen){
                        $("#show-t-gfwf").addClass("disabled");
                    }
                }
            });
        },

        refreshView: function () {
            var _this = this;
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/getRecent30Records.html', {
                data: {code: _this.code},
                type: 'POST',
                success: function (data) {
                    if (data && data.length > 0) {
                        var dataa=eval("("+data+")")
                        dataa.reverse();
                        _this.renderView(dataa);
                    }
                }
            });
        },

        renderView: function (json) {
            var _this=this;
            var result = [];
            for (var k = 0; k < 4; ++k) {
                result[k] = {ds: [], dx: []};
            }
            var str = '';
            for(var xx=0;xx<4;xx++){
                if(xx != 3){
                    // 单双
                    str += '<table id="bottom_zs_table_' + xx + '_ds"  style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = Tools.parseInt(json[i].openCode.split(",")[Tools.parseInt(xx)]);

                        var name = value % 2 == 0 ? "<i style='background-color:#2a85e2'>双</i>" : "<i style='background-color:#e23b2a'>单</i>";
                        var x = 0, y = 0;

                        if (result[Tools.parseInt(xx)].ds.length != 0) {
                            var preObj = result[Tools.parseInt(xx)].ds[i - 1];
                            if (preObj.name == name) {
                                if (preObj.y>4){
                                    x = preObj.x +1;
                                    y = 0;
                                }else {
                                    x = preObj.x;
                                    y = preObj.y + 1;
                                }
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[Tools.parseInt(xx)].ds.push({
                            name: name,
                            x: x,
                            y: y,
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[Tools.parseInt(xx)].ds, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY +1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX + 1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';
                    // 大小
                    str += '<table id="bottom_zs_table_' + xx + '_dx"  style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = json[i].openCode.split(",")[Tools.parseInt(xx)];
                        var name = value >= 5 ? "<i style='background-color:#2a85e2'>大</i>" : "<i style='background-color:#e23b2a'>小</i>";
                        var x = 0, y = 0;

                        if (result[xx].dx.length != 0) {
                            var preObj = result[Tools.parseInt(xx)].dx[i - 1];
                            if (preObj.name == name) {
                                if (preObj.y>4){
                                    x = preObj.x +1;
                                    y = 0;
                                }else {
                                    x = preObj.x;
                                    y = preObj.y + 1;
                                }
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[xx].dx.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[xx].dx, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY +1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX +1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';
                }else{
                    //总和
                    // 单双
                    str += '<table id="bottom_zs_table_zh_ds"   style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = 0;
                        for (var j = 0, tmpArr = json[i].openCode.split(","); j < tmpArr.length; ++j) {
                            value += Tools.parseInt(tmpArr[j]);
                        }

                        var name = value % 2 == 0 ? '<font style="color:#e70f0f;">双</font>' : '<font style="color:#58adff;">单</font>';
                        var x = 0, y = 0;

                        if (result[3].ds.length != 0) {
                            var preObj = result[3].ds[i - 1];
                            if (preObj.name == name) {
                                if (preObj.y>4){
                                    x = preObj.x +1;
                                    y = 0;
                                }else {
                                    x = preObj.x;
                                    y = preObj.y + 1;
                                }
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[3].ds.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[3].ds, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY + 1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX + 1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';


                    // 大小
                    str += '<table id="bottom_zs_table_zh_dx"  style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = 0;
                        for (var j = 0, tmpArr = json[i].openCode.split(","); j < tmpArr.length; ++j) {
                            value += Tools.parseInt(tmpArr[j]);
                        }
                        var name = value >= 14 ? '<font style="color:#e70f0f;">大</font>' : '<font style="color:#58adff;">小</font>';
                        var x = 0, y = 0;

                        if (result[3].dx.length != 0) {
                            var preObj = result[3].dx[i - 1];
                            if (preObj.name == name) {
                                if (preObj.y>4){
                                    x = preObj.x +1;
                                    y = 0;
                                }else {
                                    x = preObj.x;
                                    y = preObj.y + 1;
                                }
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[3].dx.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[3].dx, function (index, value) {
                        if (value.x > maxX) {
                            maxX = value.x;
                        }
                        if (value.y > maxY) {
                            maxY = value.y;
                        }
                    });

                    for (var i = 0; i < maxY + 1; ++i) {
                        str += '<tr class="resultLoad">';
                        for (var j = 0; j < maxX + 1; ++j) {
                            str += '<td>&nbsp;</td>';
                        }
                        str += '</tr>';
                    }
                    str += '</tbody>';
                    str += '</table>';
                }

            }
            $("#changLongTable").html(str);

            for (var i = 0; i < 4; ++i) {
                var value = result[i];
                var pre = i == 3 ? 'zh' : i;
                $.each(value.ds, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
                $.each(value.dx, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
            }
            var num1 = $("#qiuu").attr("data-num");
            var name = $("div.ssc-method-label a[data-name].mui-active").attr("data-name");
            if(name ==undefined){
                name = _this.name;
            }
            $('#bottom_zs_table_' + num1 + '_'+name).show();
        },





        bindChangLong :function () {
            var _this=this;
            //绑定长龙第几球
            mui("body").off("tap", "#qiuu").on("tap", "#qiuu", function () {
                var name = $("div.ssc-method-label a[data-name].mui-active").attr("data-name");
                if(name != undefined){
                    _this.name=name;
                }
                var typePicker = new mui.PopPicker();
                typePicker.setData([{
                    value:'0',
                    text: '第一球'
                }, {
                    value:'1',
                    text: '第二球'
                }, {
                    value:'2',
                    text: '第三球'
                }, {
                    value:'zh',
                    text: '总和'
                }
                ]);
                typePicker.show(function (e) {
                    $("div.ssc-method-label a[data-name='"+_this.name+"']").addClass("mui-active");
                    $("#qiuu").text(e[0].text);
                    $("#qiuu").attr("data-num",e[0].value);
                    $("#changLongTable table").hide();
                    $('#bottom_zs_table_' + e[0].value + '_'+_this.name).show();
                });
            });
            //选择球时，点取消和背景退出事件
            mui('body').on('tap', '.mui-poppicker-btn-cancel, .mui-backdrop', function() {
                $("div.ssc-method-label a[data-name='"+_this.name+"']").addClass("mui-active");
                var num = $("#qiuu").attr("data-num");
                $("#changLongTable table").hide();
                $('#bottom_zs_table_' + num + '_'+ _this.name).show();
            });
            //大小
            mui('body').off("tap", "#daxiao").on('tap', '#daxiao', function() {
                $("#danshuang").removeClass("mui-active")
                var num = $("#qiuu").attr("data-num");
                $("#changLongTable table").hide();
                $('#bottom_zs_table_' + num + '_dx').show();
            });

            //单双
            mui('body').off("tap", "#danshuang").on('tap', '#danshuang', function() {
                $("#daxiao").removeClass("mui-active")
                var num = $("#qiuu").attr("data-num");
                $("#changLongTable table").hide();
                $('#bottom_zs_table_' + num + '_ds').show();
            });

        },


    });
});