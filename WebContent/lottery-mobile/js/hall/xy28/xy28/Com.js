define(['site/hall/xy28/xy28/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="混合";
            if(BetCode=="hh "){
                BetCode1="混合";
            }else if(BetCode=="hztm"){
                BetCode1="和值特码";
            }

            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='hh']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode1);
            $("span.x_1.gfwf-tit").text(BetCode1);
            $(".s-title.title1 span").text(BetCode1);
            $(".s-title.title2 span").text(BetCode1);
            $("#toobarTitle").text("信用玩法-"+BetCode1);
            $("a[data-code='hh'] span").text(BetCode1);
        },
    });
});