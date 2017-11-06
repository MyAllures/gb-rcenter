
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            _this=this;
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },

        getGfwfAllOdd: function () {
            var _this = this;
            ajaxRequest({
                url: root + '/pl3/getGfwfAllOdd.html',
                async:false,
                data: {code: _this.code},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        _this.gfwfPlJson = data;
                        _this.initSubPage();
                        if(!page.isCodeOpen) {
                            _this.closePl3GfwfHandicap();
                        }
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        },

        //官方玩法。
        clickGfwf: function(){
            var _this=this;
            //官方玩法。
            $(".group ul li p span").click(function () {
                $(".group ul li p span.acti").removeClass("acti");
                $(this).addClass("acti");
                var currentId = $(this).attr('data-play_id');
                if(currentId != null){
                    playId = currentId;
                }
                // 初始化子页面
                _this.initSubPage();
                if(!page.isCodeOpen) {
                    _this.closePl3GfwfHandicap();
                }
            });
        },

        selectFun_1num:function($obj,num){
            if ($.inArray(num, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]) >= 0) {
                $obj.addClass("acti");
            }
        },


        //封盘
        closePl3GfwfHandicap: function () {
            $("ul .numLine").addClass("block-bet-btn");
            $("textarea.content_tex").attr("readonly",true);
            $(".suiji1").removeAttr("onclick");
            $(".suiji5").removeAttr("onclick");
            $("a#tjzd").removeAttr("onclick");
            //开盘
        },
        openPl3GfwfHandicap: function () {
            $("ul .numLine").removeClass("block-bet-btn");
            $("textarea.content_tex").removeAttr("readonly");
            $(".suiji1").attr("onclick","page.PlayWay.getSuiji(1)");
            $(".suiji5").attr("onclick","page.PlayWay.getSuiji(5)");
            $("a#tjzd").attr("onclick","page.PlayWay.tjzd()");
            this.init();
        }

    })
});