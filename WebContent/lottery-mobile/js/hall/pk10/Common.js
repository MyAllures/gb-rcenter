define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
            this.checkIsSum();
            this.bindChangLong();
        },

        checkSubordinate:function(betCode,thisClassList){
            var _this = this;
            if(betCode !='szp' && betCode !='zxfs') {
                $("a.selected-btn.mui-active").removeClass("mui-active");
                thisClassList.toggle('mui-active');
                var dataCode = $("a.selected-btn.main.mui-active").attr("data-code");
                var jspName = $("a.selected-btn.main.mui-active").attr("data-jsp-name");
                _this.checkIsSum();
                _this.closeTop();
                _this.getBetTable(dataCode, jspName);
                _this.resetBet();
            }
        },

        checkIsSum :function () {
            var dataCode = $("a.selected-btn.main.mui-active").attr("data-code");
            if(dataCode !="championuUpSum"){
                $("#changLong").hide();
            }else{
                $("#changLong").show();
            }
        },

        changeList : function(){
            var _this=this;
            var lotteryGenra=$("#GenraType").val();
            var betCode="digitalDisk";
            var jspStr="DigitalDisk";
            if(lotteryGenra =="pk10_yixing_dwd"){
                betCode="pk10_yixing_dwd";
                jspStr="Pk10Dingweidan";
            }
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspStr},
                type: 'POST',
                success: function (data) {
                    if(betCode=="pk10_yixing_dwd"){
                        $("#gfwfBetCode").val("pk10_yixing_dwd");
                        _this.backGuanfangwanfa();
                    }
                    $(".bet-table").html(data);
                }
            });
        },

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            html+='<span class="inline-list-2">';
            var sum=parseInt(numArr[0])+parseInt(numArr[1]);
            html+='<i class="lottery-block">'+sum+'</i>';
            if(this.code == 'bjpk10' && sum == 11){
                html+='<i class="lottery-block">和</i><i class="lottery-block">和</i>';
            }else{
                if(sum%2==0){
                    html+='<i class="lottery-block">双</i>';
                }else{
                    html+='<i class="lottery-block">单</i>';
                }
                if(sum>=11){
                    html+='<i class="lottery-block">大</i>';
                }else{
                    html+='<i class="lottery-block">小</i>';
                }
            }
            if(parseInt(numArr[0])>parseInt(numArr[9])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[1])>parseInt(numArr[8])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[2])>parseInt(numArr[7])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[3])>parseInt(numArr[6])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[4])>parseInt(numArr[5])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            html+='</span>';
            $("#lastOpenCode").html(html);
        },

        getRandomNumber: function (len) {
            var list = [];
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10)+1;
                list[i] = num < 10?"0"+num:num;
            }
            return Template('template_lastOpenCode', {numArr: list});
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
                        $("a[data-code='digitalDisk']").addClass("mui-active");
                        $("a[data-code='szp']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").addClass("x_active");
                        $("a.x_3.mui-col-xs-6").removeClass("x_active");
                        $("#toobarTitle").text("传统玩法-数字盘");
                        $("#GenraType").val("digitalDisk");
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
                        $("#gfwfBetCode").val("pk10_yixing_dwd");
                        $("a[data-code='pk10_yixing_dwd']").addClass("mui-active");
                        $("a[data-code='zxfs']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").removeClass("x_active");
                        $("a.x_3.mui-col-xs-6").addClass("x_active");
                        $("#toobarTitle").text("官方玩法-定位胆");
                        $("#GenraType").val("pk10_yixing_dwd");
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
                    $("#gfwfBetCode").val("pk10_yixing_dwd");
                    $("a[data-code='pk10_yixing_dwd']").addClass("mui-active");
                    $("a[data-code='zxfs']").addClass("mui-active");
                    $("a.x_1.mui-col-xs-6").removeClass("x_active");
                    $("a.x_3.mui-col-xs-6").addClass("x_active");
                    $("#toobarTitle").text("官方玩法-定位胆");
                    $("#GenraType").val("pk10_yixing_dwd");
                }
            });
        },

        refreshView: function () {
            var _this = this;
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/getRecent100Records.html', {
                data: {code: _this.code},
                type: 'POST',
                success: function (data) {
                    if (data && data.length > 0) {
                        var dataa=eval("("+data+")")
                        _this.renderView(dataa);
                    }
                }
            });
        },


        renderView: function (data) {
                var arr_res = [];
                var n = 0;
                var td_col = 31;

                //第二选项卡中的变量值
                var arr_hzInfo = [];
                var tab2_td_col = 31;
                var tab2_n = 0;

                //第三个选项卡中的变量值
                var arr_dsInfo = [];
                var tab3_td_col = 31;
                var tab3_n = 0;

                for (var m = 0; m < data.length; m++) {
                    var result = {
                        qiHaoInfo: {content: '内容', flag_dx: '大小'}
                    };
                    var resultHz = {
                        hzInfo: {content: '内容', flag_hz: 0}
                    };
                    var resultDs = {
                        dsInfo: {content: '内容', flag_ds: '单双'}
                    };
                    arr_res[m] = result.qiHaoInfo; //初始化容器
                    arr_hzInfo[m] = resultHz.hzInfo; //初始化容器
                    arr_dsInfo[m] = resultDs.dsInfo; //初始化容器

                    var openCode = data[m].openCode.split(",");
                    var num1 = Tools.parseInt(openCode[0]);
                    var num2 = Tools.parseInt(openCode[1]);
                    var qiStr = data[m].expect;
                    var qiHaoma = data[m].openCode;
                    var qiContent = '第' + qiStr + '期, 号码' + qiHaoma;
                    var result_num = num1 + num2;

                    if (result_num > 11) {
                        arr_res[m].flag_dx = '大';
                    } else {
                        arr_res[m].flag_dx = '小';
                    }

                    arr_hzInfo[m].flag_hz = result_num; //存储冠亚和值

                    if (result_num % 2 == 0) {
                        arr_dsInfo[m].flag_ds = '双';
                    } else {
                        arr_dsInfo[m].flag_ds = '单';
                    }
                    arr_res[m].content = qiContent; //存储号码和期号
                    arr_hzInfo[m].content = qiContent;
                    arr_dsInfo[m].content = qiContent;
                }

                //遍历冠亚和大小写入表格中
                for (var i = 0; i < arr_res.length; i++) {
                    if (i > 0 && i < arr_res.length - 1) {
                        if (arr_res[i].flag_dx != arr_res[i - 1].flag_dx || n==6) {
                            td_col--; //发现前一个值不等换行 右移动一列单元格
                            n = 0;//发现前一个值不等换行 初始化为第一行
                        }

                        if (arr_hzInfo[i].flag_hz != arr_hzInfo[i - 1].flag_hz || tab2_n==6) {
                            tab2_td_col--;
                            tab2_n = 0;
                        }

                        if (arr_dsInfo[i].flag_ds != arr_dsInfo[i - 1].flag_ds || tab3_n==6) {
                            tab3_td_col--;
                            tab3_n = 0;
                        }
                    }

                    //第一个选项卡
                    if (td_col >= 0) {
                        if (arr_res[i].flag_dx == '小') {
                            $("#rmTr" + n + " td").eq(td_col).html("<i style='background-color:#e23b2a'>小</i>");
                            n++;
                        } else {
                            $("#rmTr" + n + " td").eq(td_col).html("<i style='background-color:#2a85e2'>大</i>");
                            n++;
                        }
                    }

                    //第二个选项卡
                    if (tab2_td_col >= 0) {
                        $("#rm2Tr" + tab2_n + " td").eq(tab2_td_col).html("<i style='background-color:#e23b2a'>"+arr_hzInfo[i].flag_hz+"</i>");
                        tab2_n++;
                    }

                    //第三个选项卡
                    if (tab3_td_col >= 0) {
                        if (arr_dsInfo[i].flag_ds == '单') {
                            $("#rm3Tr" + tab3_n + " td").eq(tab3_td_col).html("<i style='background-color:#e23b2a'>单</i>")
                            tab3_n++;
                        } else {
                            $("#rm3Tr" + tab3_n + " td").eq(tab3_td_col).html("<i style='background-color:#2a85e2'>双</i>");
                            tab3_n++;
                        }
                    }
                }

        },


        bindChangLong :function () {
            //单双
            mui('body').off("tap", ".ssc-method-label a.mui-control-item").on('tap', ".ssc-method-label a.mui-control-item", function() {
                var name = $(this).attr("data-name");
                if(name =="dx"){
                    $("#tab_1").show();
                    $("#tab_2").hide();
                    $("#tab_3").hide();
                }else if(name =="he"){
                    $("#tab_1").hide();
                    $("#tab_2").show();
                    $("#tab_3").hide();
                }else{
                    $("#tab_1").hide();
                    $("#tab_2").hide();
                    $("#tab_3").show();
                }
            });
        },


    });
});