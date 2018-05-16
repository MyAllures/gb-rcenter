define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-特码",this.getSecondCode(),$("#temaab"),"special");
            this._super();

        },

        getSecondText:function () {
            return $("div#temaab a.mui-active span").text()==""?"特码A":$("div#temaab a.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="special"?"特码A":$("#gfwfBetCode").val();
        },


        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/linkCodeOdd.html';
            var subCode = $("a.mui-active[data-subCode]").attr("data-subCode");
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'betCode': subCode},
                success: function (data) {
                    _this.templateOdd(data);
                }
            })
        }
    });
});