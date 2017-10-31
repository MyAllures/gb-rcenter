define(['site/hall/GfwfCommon', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },

        checkNoSon:function(betCode,thisClassList){
            var _this = this;
            $("a.selected-btn.mui-active").removeClass("mui-active");
            thisClassList.toggle('mui-active');
            var dataCode=$("a.selected-btn.mui-active").attr("data-code");
            var dataPlayId=$("a.selected-btn.mui-active").attr("data-play_id");
            var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
            if($("a.selected-btn.main.mui-active").size()>0){
                dataPlayId=$("a.selected-btn.main.mui-active").attr("data-play_id");
                dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            }
            $('div.gfwf-bg').slideUp();
            $('div.selected-wrap').slideUp();
            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },

        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "pk10_zhixuan_qyfs","jspStr":"Pk10QianyiZxfs"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },

        getRandomNumber: function (len) {
            var list = [];
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10)+1;
                list[i] = num < 10?"0"+num:num;
            }
            return Template('template_lastOpenCode_gfwf', {numArr: list});
        },

    });
});