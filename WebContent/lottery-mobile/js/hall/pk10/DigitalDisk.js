define(['site/hall/pk10/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            $("a[data-code='szp']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("数字盘");
            $("span.x_1.gfwf-tit").text("数字盘");
            $(".s-title.title1 span").text("数字盘");
            $(".s-title.title2 span").text("数字盘");
            $("#toobarTitle").text("传统玩法-数字盘");
            $("a[data-code='szp'] span").text("数字盘");
        }

    });
});