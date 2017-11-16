define(['site/hall/pk10/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            $("a[data-code='szp']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("双面");
            $("span.x_1.gfwf-tit").text("双面");
            $(".s-title.title1 span").text("双面");
            $(".s-title.title2 span").text("双面");
            $("#toobarTitle").text("信用玩法-双面");
            $("a[data-code='szp'] span").text("双面");
        }

    });
});