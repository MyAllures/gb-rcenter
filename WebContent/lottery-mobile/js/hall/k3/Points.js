define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            $("a[data-code='ds']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("点数");
            $("span.x_1.gfwf-tit").text("点数");
            $(".s-title.title1 span").text("点数");
            $(".s-title.title2 span").text("点数");
            $("#toobarTitle").text("传统玩法-点数");
            $("a[data-code='ds'] span").text("点数");
        }

    });
});