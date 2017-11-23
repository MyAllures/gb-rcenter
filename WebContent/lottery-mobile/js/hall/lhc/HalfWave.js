define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="半波";
            $("div.s-menu.second").hide();
            $("#tema").show();
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='tema']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode1);
            $("span.x_1.gfwf-tit").text(BetCode1);
            $(".s-title.title1 span").text(BetCode1);
            $(".s-title.title2 span").text(BetCode1);
            $("#toobarTitle").text("传统玩法-"+BetCode1);
            $("a[data-code='tema'] span").text(BetCode1);
        },

    });
});