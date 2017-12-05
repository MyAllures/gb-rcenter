define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-正码特",this.getSecondCode(),$("#zhengmate"),"positiveSpecial");
            this._super();

        },

        getSecondText:function () {
            return $("div#zhengmate a.mui-active span").text()==""?"正码一":$("div#zhengmate a.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="positiveSpecial"?"正码一":$("#gfwfBetCode").val();
        },


        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/positiveSpecialOdd.html';
            var subCode = $("a.mui-active[data-subCode]").attr("data-subCode");
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'subCode': parseInt(subCode)},
                success: function (data) {
                    _this.templateOdd(data);
                }
            })
        }
    });
});