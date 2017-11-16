define(['site/hall/Common', 'site/plugin/template'], function (Common, Template) {
    return Common.extend({
        init: function () {
            this._super();
        },

        checkSubordinate:function(betCode,thisClassList){
            var _this = this;
            if(betCode !='s5') {
                $("a.selected-btn.mui-active").removeClass("mui-active");
                thisClassList.toggle('mui-active');
                var dataCode = $("a.selected-btn.main.mui-active").attr("data-code");
                var jspName = $("a.selected-btn.main.mui-active").attr("data-jsp-name");
                _this.closeTop();
                _this.getBetTable(dataCode, jspName);
                _this.resetBet();
            }
        },

        getRandomNumber:function(len){
            var tmpStr = '<span class="inline-list-kl8">';
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10);
                tmpStr += '<i class="lottery-ball">' + num + '</i>';
            }
            tmpStr += '</span>';
            return tmpStr;
        },

        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "选5","jspStr":"Selection5"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },



    });
});