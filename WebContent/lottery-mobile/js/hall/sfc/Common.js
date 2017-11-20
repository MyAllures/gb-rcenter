define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
        },

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]) + parseInt(numArr[5]) + parseInt(numArr[6]) + parseInt(numArr[7]);
            html += "<span class='inline-list-2'>";
            html += "<i class='lottery-block'>" + sum + "</i>";
            if (sum % 2 == 0) {
                html += "<i class='lottery-block'>双</i>";
            } else {
                html += "<i class='lottery-block'>单</i>";
            }
            if (sum > 84) {
                html += "<i class='lottery-block'>大</i>";
            } else if(sum<84){
                html += "<i class='lottery-block'>小</i>";
            }else{
                html += "<i class='lottery-block'>和</i>";
            }
            // if (parseInt(numArr[0]) > parseInt(numArr[4])) {
            //     html += "<i class='lottery-block'>龙</i>";
            // } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
            //     html += "<i class='lottery-block'>虎</i>";
            // } else {
            //     html += "<i class='lottery-block'>和</i>"
            // }
            html += "</span>";
            $("#lastOpenCode").html(html);
        },



        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "twoside","jspStr":"TwoSide"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },

        checkSubordinate:function(betCode,thisClassList){
            var _this = this;
            if(betCode !='sm') {
                $("a.selected-btn.mui-active").removeClass("mui-active");
                thisClassList.toggle('mui-active');
                var dataCode = $("a.selected-btn.main.mui-active").attr("data-code");
                var jspName = $("a.selected-btn.main.mui-active").attr("data-jsp-name");
                _this.closeTop();
                _this.getBetTable(dataCode, jspName);
                _this.resetBet();
            }
        },



    });
});