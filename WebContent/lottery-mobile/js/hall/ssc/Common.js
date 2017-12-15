define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
            this.bindChangLong();
        },

        /**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]);
                var ds;
                var dx;
                var lhh;
                if (sum % 2 == 0) {
                    ds="双";
                } else {
                    ds="单";
                }
                if (sum > 22) {
                    dx="大";
                } else {
                    dx="小";
                }
                if (parseInt(numArr[0]) > parseInt(numArr[4])) {
                    lhh="龙";
                } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
                    lhh="虎";
                } else {
                    lhh="和";
                }
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        sum: sum,
                        ds:ds,
                        dx:dx,
                        lhh:lhh
                    });
            });
            $("#recentHistory").html(openList);
        },

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]);
            html += "<i class='lottery-block'>" + sum + "</i>";
            if (sum % 2 == 0) {
                html += "<i class='lottery-block'>双</i>";
            } else {
                html += "<i class='lottery-block'>单</i>";
            }
            if (sum > 22) {
                html += "<i class='lottery-block'>大</i>";
            } else {
                html += "<i class='lottery-block'>小</i>";
            }
            if (parseInt(numArr[0]) > parseInt(numArr[4])) {
                html += "<i class='lottery-block'>龙</i>";
            } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
                html += "<i class='lottery-block'>虎</i>";
            } else {
                html += "<i class='lottery-block'>和</i>"
            }
            $("#lastOpenCode").html(html);
        },

        changeList : function(){
            var _this=this;
            var lotteryGenra=$("#GenraType").val();
            var betCode="ssc_shuzipan";
            var jspStr="DigitalDisk";
            if(lotteryGenra =="ssc_yixing_dwd"){
                betCode="ssc_yixing_dwd";
                jspStr="SscWuxing";
            }
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspStr},
                type: 'POST',
                success: function (data) {
                    if(betCode=="ssc_yixing_dwd"){
                        $("#gfwfBetCode").val("ssc_yixing_dwd");
                        _this.backGuanfangwanfa();
                    }
                    $(".bet-table").html(data);
                }
            });
        },

        checkSubordinate : function (betCode,thisClassList) {
            var _this = this;
            if(betCode !='zxfs' && betCode !='szp'){
                $("a.selected-btn.mui-active").removeClass("mui-active");
                thisClassList.toggle('mui-active');
                var dataCode=$("a.selected-btn.mui-active").attr("data-code");
                var dataPlayId=$("a.selected-btn.mui-active").attr("data-play_id");
                var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
                if($("a.selected-btn.main.mui-active").size()>0){
                    dataPlayId=$("a.selected-btn.main.mui-active").attr("data-play_id");
                    dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
                }
                if( //官方
                    dataCode !="ssc_sanxing_hs"
                    && dataCode !="ssc_sanxing_qs"
                    && dataCode !="ssc_erxing"
                    && dataCode !="ssc_budingwei"
                    && dataCode !="ssc_daxiaodanshuang"
                    && dataCode !="R2"
                    && dataCode !="R3"
                    && dataCode !="R4"
                    //信用
                    && dataCode !="ssc_yizidingwei"
                    && dataCode !="ssc_erzidingwei"
                    && dataCode !="ssc_sanzidingwei"
                    && dataCode !="ssc_yizizuhe"
                    && dataCode !="ssc_zuxuansan"
                    && dataCode !="ssc_zuxuanliu"
                    && dataCode !="ssc_kaudu"
                ){
                    _this.closeTop();
                }
                //官方
                if(betCode =="ssc_sanxing_hs" && jspName==undefined){//后三初始化
                    jspName="SscHousan";
                }else if(betCode =="ssc_sanxing_qs" && jspName==undefined){//前三初始化
                    jspName="SscQiansan";
                }else if(betCode =="ssc_erxing" && jspName==undefined){//前二初始化
                    jspName="SscQianer";
                }else if(betCode =="ssc_budingwei" && jspName==undefined){//不定位初始化
                    jspName="SscBudingwei";
                }else if(betCode =="R2" && jspName==undefined){//任选二初始化
                    jspName="SscR2Zxfs";
                }else if(betCode =="R3" && jspName==undefined){//任选三初始化
                    jspName="SscR3Zxfs";
                }else if(betCode =="R4" && jspName==undefined){//任选四初始化
                    jspName="SscR4Zxfs";
                }else if(betCode =="ssc_daxiaodanshuang" && jspName==undefined){//大小单双初始化
                    jspName="SscDaxiaodanshuangErxing";
                }
                //信用
                else if(betCode =="ssc_yizidingwei" && jspName==undefined){
                    jspName="OneDigital";
                    dataCode="万";
                }else if(betCode =="ssc_erzidingwei" && jspName==undefined){
                    jspName="TwoDigital";
                    dataCode="万千";
                }else if(betCode =="ssc_sanzidingwei" && jspName==undefined){
                    jspName="ThreeDigital";
                    dataCode="万千百";
                }else if(betCode =="ssc_yizizuhe" && jspName==undefined){
                    jspName="OneCombination";
                    dataCode="全五一字";
                }else if(betCode =="ssc_zuxuansan" && jspName==undefined){
                    jspName="GroupThree";
                    dataCode="前三组选三";
                }else if(betCode =="ssc_zuxuanliu" && jspName==undefined){
                    jspName="GroupSix";
                    dataCode="前三组选六";
                }else if(betCode =="ssc_kaudu" && jspName==undefined){
                    jspName="Span";
                    dataCode="前三跨度";
                }
                _this.getBetTable(dataCode,jspName);
                _this.resetBet();
            }
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
                        $("a[data-code='ssc_shuzipan']").addClass("mui-active");
                        $("a[data-code='szp']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").addClass("x_active");
                        $("a.x_3.mui-col-xs-6").removeClass("x_active");
                        $("#toobarTitle").text("传统玩法-数字盘");
                        $("#GenraType").val("ssc_shuzipan");
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
                        $("#gfwfBetCode").val("ssc_yixing_dwd");
                        $("a[data-code='ssc_yixing_dwd']").addClass("mui-active");
                        $("a[data-code='zxfs']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").removeClass("x_active");
                        $("a.x_3.mui-col-xs-6").addClass("x_active");
                        $("#toobarTitle").text("官方玩法-定位胆");
                        $("#GenraType").val("ssc_yixing_dwd");
                        _this.changeList();

                    }
                });
            });
        },

        //返回官方玩法投注条变化
        backGuanfangwanfa: function () {
            var _this=this;
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/checkBetTable.html', {
                data: {"jspStr": "BetAmount-gfwf"},
                type: 'POST',
                success: function (data) {
                    _this.openGuanfangwanfa(data);
                    $("a[data-code='ssc_yixing_dwd']").addClass("mui-active");
                    $("a[data-code='zxfs']").addClass("mui-active");
                    $("a.x_1.mui-col-xs-6").removeClass("x_active");
                    $("a.x_3.mui-col-xs-6").addClass("x_active");
                    $("#toobarTitle").text("官方玩法-定位胆");
                    $("#GenraType").val("ssc_yixing_dwd");
                }
            });
        },

        refreshView: function () {
            var _this = this;
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/getRecent30Records.html', {
                data: {code: _this.code},
                success: function (data) {
                    if (data && data.length > 0) {
                        _this.renderView(data);
                        /*_this.changeTable();*/
                    }
                }
            });
        },





        renderView: function (json) {

            var result = [];
            for (var i = 0; i < 5; ++i) {
                result[i] = {ds: [], dx: []};
            }
            var str = '';
            /*$("#bottom_zs_table_head tbody tr th").each(function () {*/
            for(var j=0;j<5;j++){
                    // 单双
                    str += '<table id="bottom_zs_table_' + j + '_ds" width="100%" border="0" class="resultLoad" style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = 0;
                        console.log(json[i].openCode)
                        for (var j = 0, tmpArr = json[i].openCode.split(","); j < tmpArr.length; ++j) {
                            value += Tools.parseInt(tmpArr[j]);
                        }

                        var name = value % 2 == 0 ? '<font style="color:#e70f0f;">双</font>' : '<font style="color:#58adff;">单</font>';
                        var x = 0, y = 0;

                        if (result[5].ds.length != 0) {
                            var preObj = result[5].ds[i - 1];
                            if (preObj.name == name) {
                                x = preObj.x;
                                y = preObj.y + 1;
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[5].ds.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[5].ds, function (index, value) {
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
                    str += '<table id="bottom_zs_table_' + j + '_dx" width="100%" border="0" class="resultLoad" style="display:none;">';
                    str += '<tbody>';
                    for (var i = 0; i < json.length; ++i) {
                        var value = 0;
                        for (var j = 0, tmpArr = json[i].openCode.split(","); j < tmpArr.length; ++j) {
                            value += Tools.parseInt(tmpArr[j]);
                        }
                        var name = value >= 23 ? '<font style="color:#e70f0f;">大</font>' : '<font style="color:#58adff;">小</font>';
                        var x = 0, y = 0;

                        if (result[5].dx.length != 0) {
                            var preObj = result[5].dx[i - 1];
                            if (preObj.name == name) {
                                x = preObj.x;
                                y = preObj.y + 1;
                            } else {
                                x = preObj.x + 1;
                                y = 0;
                            }
                        }
                        result[5].dx.push({
                            name: name,
                            x: x,
                            y: y
                        });
                    }

                    var maxX = 30;
                    var maxY = 0;
                    $.each(result[5].dx, function (index, value) {
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
            /*});*/
            console.log(str);

            $("#bottom_zs_table_content").html(str);
            for (var i = 0; i < 6; ++i) {
                var value = result[i];

                var pre = i == 5 ? 'zh' : i;
                $.each(value.ds, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
                $.each(value.dx, function (index, value) {
                    $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                });
            }
        },

        bindChangLong :function () {
            //绑定长龙第几球
            mui("body").on("tap", "#showUserPicker", function () {
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
                    value:'3',
                    text: '第四球'
                }, {
                    value:'4',
                    text: '第五球'
                }
                ]);
                typePicker.pickers[0].setSelectedIndex($("#showUserPicker").val());
                typePicker.show(function (e) {
                    $("#showUserPicker").text(e[0].text);
                    $("#showUserPicker").attr("data-num",e[0].value);
                })
            });

        },




    });
});