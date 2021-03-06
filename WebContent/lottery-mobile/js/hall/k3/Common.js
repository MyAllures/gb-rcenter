define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
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

                if(parseInt(numArr[0]) == parseInt(numArr[1]) && parseInt(numArr[0]) == parseInt(numArr[2]) && parseInt(numArr[1]) == parseInt(numArr[2])){
                    ds="通吃";
                }else if (sum % 2 == 0) {
                    ds="双";
                } else {
                    ds="单";
                }

                if(parseInt(numArr[0]) == parseInt(numArr[1]) && parseInt(numArr[0]) == parseInt(numArr[2]) && parseInt(numArr[1]) == parseInt(numArr[2])){
                    dx="通吃";
                }else if (sum > 10) {
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

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]);
            html += "<i class='lottery-block'>" + sum + "</i>";
            if(parseInt(numArr[0]) == parseInt(numArr[1]) && parseInt(numArr[0]) == parseInt(numArr[2]) && parseInt(numArr[1]) == parseInt(numArr[2])){
                html += "<i class='lottery-block'>通吃</i>";
            }else if (sum % 2 == 0) {
                html += "<i class='lottery-block'>双</i>";
            } else if(sum % 2 != 0){
                html += "<i class='lottery-block'>单</i>";
            }

            if(parseInt(numArr[0]) == parseInt(numArr[1]) && parseInt(numArr[0]) == parseInt(numArr[2]) && parseInt(numArr[1]) == parseInt(numArr[2])){
                html += "<i class='lottery-block'>通吃</i>";
            }else if (sum > 10) {
                html += "<i class='lottery-block'>大</i>";
            } else if(sum <= 10){
                html += "<i class='lottery-block'>小</i>";
            }
            $("#lastOpenCode").html(html);
        },

        checkSubordinate:function(betCode,thisClassList){
            var _this = this;
            if(betCode !='ds' && betCode !='bzxh') {
                $("a.selected-btn.mui-active").removeClass("mui-active");
                thisClassList.toggle('mui-active');
                var dataCode = $("a.selected-btn.main.mui-active").attr("data-code");
                var jspName = $("a.selected-btn.main.mui-active").attr("data-jsp-name");

                _this.closeTop();
                _this.getBetTable(dataCode, jspName);
                _this.resetBet();
            }
        },

        changeList : function(){
            var _this=this;
            var lotteryGenra=$("#GenraType").val();
            var betCode="k3_dianshu";
            var jspStr="Points";
            if(lotteryGenra =="k3_tongxuan_santong"){
                betCode="k3_tongxuan_santong";
                jspStr="K3Tongxuan";
            }
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspStr},
                type: 'POST',
                success: function (data) {
                    if(betCode=="k3_tongxuan_santong"){
                        $("#gfwfBetCode").val("k3_tongxuan_santong");
                        _this.backGuanfangwanfa();
                    }
                    $(".bet-table").html(data);
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
                        $("a[data-code='k3_dianshu']").addClass("mui-active");
                        $("a[data-code='ds']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").addClass("x_active");
                        $("a.x_3.mui-col-xs-6").removeClass("x_active");
                        $("#toobarTitle").text("传统玩法-点数");
                        $("#GenraType").val("k3_dianshu");
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
                        $("#gfwfBetCode").val("k3_tongxuan_santong");
                        $("a[data-code='k3_tongxuan_santong']").addClass("mui-active");
                        $("a[data-code='bzxh']").addClass("mui-active");
                        $("a.x_1.mui-col-xs-6").removeClass("x_active");
                        $("a.x_3.mui-col-xs-6").addClass("x_active");
                        $("#toobarTitle").text("官方玩法-三同号通选");
                        $("#GenraType").val("k3_tongxuan_santong");
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
                    $("a[data-code='k3_tongxuan_santong']").addClass("mui-active");
                    $("a[data-code='bzxh']").addClass("mui-active");
                    $("a.x_1.mui-col-xs-6").removeClass("x_active");
                    $("a.x_3.mui-col-xs-6").addClass("x_active");
                    $("#toobarTitle").text("官方玩法-三同号通选");
                    $("#GenraType").val("k3_tongxuan_santong");
                }
            });
        }

    });
});