define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            $("a[data-code='ds']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("长牌");
            $("span.x_1.gfwf-tit").text("长牌");
            $(".s-title.title1 span").text("长牌");
            $(".s-title.title2 span").text("长牌");
            $("#toobarTitle").text("信用玩法-长牌");
            $("a[data-code='ds'] span").text("长牌");
        }

    });
});