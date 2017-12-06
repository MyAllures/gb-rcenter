define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
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
        }


    });
});