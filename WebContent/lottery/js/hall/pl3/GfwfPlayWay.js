
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

        selectFun_1num:function($obj,num){
            if ($.inArray(num, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]) >= 0) {
                $obj.addClass("acti");
            }
        },

    })
});