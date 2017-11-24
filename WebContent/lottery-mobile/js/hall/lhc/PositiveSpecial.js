define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='positiveSpecial']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#zhengmate").show();
            $(".x_3.gfwf-playName").text(BetCode);
            $("span.x_1.gfwf-tit").text(BetCode);
            $(".s-title.title1 span").text("正码特");
            $(".s-title.title2 span").text(BetCode);
            $("#toobarTitle").text("传统玩法-正码特");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-正码特');
            }
        },


        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/positiveSpecialOdd.html';
            var subCode = $("a.mui-active[data-subCode]").attr("data-subCode");
            var betTitle = $("a.mui-active[data-subCode]").text();
            var _this = this;
            $(".bet-title").text(betTitle);
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