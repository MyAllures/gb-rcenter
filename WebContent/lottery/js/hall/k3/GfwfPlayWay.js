/**
 * 时时彩js
 */
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            _this=this;
            this._super();
        },
        onPageLoad: function () {
            this._super();
            // page.refreshView();
        },

        getGfwfAllOdd: function () {
            var _this = this;
            ajaxRequest({
                url: root + '/k3/getGfwfAllOdd.html',
                async:false,
                data: {code: _this.code},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        _this.gfwfPlJson = data;
                        _this.initSubPage();
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
            });
        },

        teShuHaoClick : function () {
            var _this=this;
            // 内容点击，触发统计注数函数（二同号单选）
            $(".Pick ul li span.erbutong").click(function () {
                var text=parseInt($(this).text())*11;
                $(".Pick ul li span.ertonghao."+text).removeClass('acti');
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            });

            // 内容点击，触发统计注数函数（二同号单选）
            $(".Pick ul li span.ertonghao").click(function () {
                var text=parseInt($(this).text())/11;
                $(".Pick ul li span.erbutong."+text).removeClass('acti');
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            });
        },

    })
});