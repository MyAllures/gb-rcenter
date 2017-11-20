define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
        },

        checkSubordinate:function(betCode,thisClassList){
            var _this = this;
            if(betCode !='szp' && betCode !='zxfs') {
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
                    $(".bet-table").html(data);
                }
            });
        },

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            html+='<span class="inline-list-2">';
            var sum=parseInt(numArr[0])+parseInt(numArr[1]);
            html+='<i class="lottery-block">'+sum+'</i>';
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
                        $("#toobarTitle").text("信用玩法-数字盘");
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
                        $("a[data-code='k3_tongxuan_santong']").addClass("mui-active");
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

    });
});