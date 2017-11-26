define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            $("a[data-code='ds']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("围骰/全骰");
            $("span.x_1.gfwf-tit").text("围骰/全骰");
            $(".s-title.title1 span").text("围骰/全骰");
            $(".s-title.title2 span").text("围骰/全骰");
            $("#toobarTitle").text("传统玩法-围骰/全骰");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-围骰/全骰');
            }
            $("a[data-code='ds'] span").text("围骰/全骰");
        }

    });
});