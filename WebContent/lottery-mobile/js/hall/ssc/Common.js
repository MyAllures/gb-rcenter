define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        name:null,
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
                $("#changLong").hide();
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
                        $("#changLong").show();
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
                        $("#changLong").hide();
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
            for (var k = 0; k < 6; ++k) {
                result[k] = {ds: [], dx: []};
            }
            var str = '';
             for(var xx=0;xx<6;xx++){
                 if(xx != 5){
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

                         var name = value % 2 == 0 ? "<i style='background-color:#2a85e2'>双</i>" : "<i style='background-color:#e23b2a'>单</i>";
                         var x = 0, y = 0;

                         if (result[5].ds.length != 0) {
                             var preObj = result[5].ds[i - 1];
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
                     str += '<table id="bottom_zs_table_zh_dx"  style="display:none;">';
                     str += '<tbody>';
                     for (var i = 0; i < json.length; ++i) {
                         var value = 0;
                         for (var j = 0, tmpArr = json[i].openCode.split(","); j < tmpArr.length; ++j) {
                             value += Tools.parseInt(tmpArr[j]);
                         }
                         var name = value >= 23 ? "<i style='background-color:#2a85e2'>大</i>" : "<i style='background-color:#e23b2a'>小</i>";
                         var x = 0, y = 0;

                         if (result[5].dx.length != 0) {
                             var preObj = result[5].dx[i - 1];
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

             }
            $("#changLongTable").html(str);

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
                    value:'3',
                    text: '第四球'
                }, {
                    value:'4',
                    text: '第五球'
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