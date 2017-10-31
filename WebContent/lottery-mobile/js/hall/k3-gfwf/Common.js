define(['site/hall/GfwfCommon', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
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
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "k3_tongxuan_santong","jspStr":"K3Tongxuan"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        }

    });
});