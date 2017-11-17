define(['site/hall/pk10/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            $("a[data-code='szp']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("冠亚和");
            $("span.x_1.gfwf-tit").text("冠亚和");
            $(".s-title.title1 span").text("冠亚和");
            $(".s-title.title2 span").text("冠亚和");
            $("#toobarTitle").text("信用玩法-冠亚和");
            $("a[data-code='szp'] span").text("冠亚和");
        }

    });
});