define(['site/hall/Common', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
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
            if (sum > 10) {
                html += "<i class='lottery-block'>大</i>";
            } else {
                html += "<i class='lottery-block'>小</i>";
            }
            $("#lastOpenCode").html(html);
        },

        checkNoSon:function(betCode,thisClassList){
            var _this = this;
            $("a.selected-btn.mui-active").removeClass("mui-active");
            thisClassList.toggle('mui-active');
            var dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            var dataPlayId=$("a.selected-btn.main.mui-active").attr("data-play_id");
            var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
            $('div.gfwf-bg').hide();
            $('div.selected-wrap').hide();
            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },

        changeList : function(){
            var lotteryGenra=$("#GenraType").val();
            var betCode="ssc_dianshu";
            var jspStr="Points";
            if(lotteryGenra =="k3_tongxuan_santong"){
                betCode="k3_tongxuan_santong";
                jspStr="K3Tongxuan";
            }
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspStr},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        }

    });
});