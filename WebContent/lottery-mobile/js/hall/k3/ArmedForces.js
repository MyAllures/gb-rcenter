define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            $("a[data-code='ds']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("三军");
            $("span.x_1.gfwf-tit").text("三军");
            $(".s-title.title1 span").text("三军");
            $(".s-title.title2 span").text("三军");
            $("#toobarTitle").text("传统玩法-三军");
            $("a[data-code='ds'] span").text("三军");
        }


    });
});