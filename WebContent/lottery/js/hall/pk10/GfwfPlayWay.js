
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
                url: root + '/pk10/getGfwfAllOdd.html',
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
            if ($.inArray(num, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) >= 0) {
                $obj.addClass("acti");
            }
        },

        selectFun_2num :function($obj,num){
            if ($.inArray(num, [6, 7, 8, 9, 10]) >= 0) {
                $obj.addClass("acti");
            }
        },

        selectFun_3num :function($obj,num){
            if ($.inArray(num, [1, 2, 3, 4, 5]) >= 0) {
                $obj.addClass("acti");
            }
        },


        //删除重复号码
        delRrepet: function() {
            var _this = this;
            var textStr = $("div.content_jiang").find(".content_tex").val();
            if (typeof (textStr)!= "undefined") {
                var newArr = [], repeatArr = [], tempArr = [];
                textStr = textStr.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
                textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10,11,' ']/g, ','));
                textStr = $.trim(textStr.replace(/\s/g,""));
                var arr_new = textStr.split(',');
                for (var i = 0; i < arr_new.length; i++) {
                    if (arr_new[i].toString().length > 0) {
                        newArr.push(arr_new[i]);
                    }
                }
                repeatArr = newArr.duplicateNewPk10().uniqueArr();
                tempArr = newArr.uniqueArr();
                if (repeatArr.length > 0) {
                    _this.alertContext = "已删除掉重复号: " + repeatArr.join(" ");
                    $(".content_jiang .content_tex").val(tempArr.join(","));
                }
            }

        },

        teShuHaoClick : function () {
            var _this=this;

            $("span.gj").click(function () {
                var text=$(this).children('i').text();
                $("span.yj."+text).removeClass('acti');
                $("span.jj."+text).removeClass('acti');
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            });

            $("span.yj").click(function () {
                var text=$(this).children('i').text();
                $("span.gj."+text).removeClass('acti');
                $("span.jj."+text).removeClass('acti');
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            });

            $("span.jj").click(function () {
                var text=$(this).children('i').text();
                $("span.gj."+text).removeClass('acti');
                $("span.yj."+text).removeClass('acti');
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            });
        },

    })
});