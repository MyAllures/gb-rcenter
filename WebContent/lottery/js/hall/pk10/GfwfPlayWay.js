
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

        // 数字批量选择算法
        selectFun_1: function(obj) {
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                if ($.inArray(num, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11]) >= 0) {
                    $(this).addClass("acti");
                }
            });

            var objName = $(obj).parent().parent().parent().find("li").eq(0).find(".numLines").attr('class');
            var maName = '';
            if(typeof objName != 'undefined'){
                maName = objName.split(' ')[1];
                var objBtn = getCommonObj(obj, maName);
                var btnFlag = "quan";
                changeActi(btnFlag, objBtn);
            }

            this.renderZhushu();
        },
        selectFun_2: function(obj) {
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                if ($.inArray(num, [6, 7, 8, 9,10]) >= 0) {
                    $(this).addClass("acti");
                }
            });
            this.renderZhushu();
        },

        //右侧选择号码点击事件
        selectFun_3: function(obj) {
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                if ($.inArray(num, [ 1, 2, 3, 4, 5]) >= 0) {
                    $(this).addClass("acti");
                }
            });
            this.renderZhushu();
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
                var playcode = _this.getPlayCode();
                repeatArr = newArr.duplicateNew().uniqueArr();
                tempArr = newArr.uniqueArr();
                // }
                if (repeatArr.length > 0) {
                    _this.alertmsg("已删除掉重复号: " + repeatArr.join(" "));
                    $(".content_jiang .content_tex").val(tempArr.join(","));
                }
            }

        },

        // delRrepet: function() {
        //     var _this = this;
        //     // var xObj = $(obj).parent().parent().parent();
        //     // var textStr = $(xObj).find(".content_tex").val();
        //     var textStr = $("div.content_jiang").find(".content_tex").val();
        //     if (typeof (textStr)!= "undefined") {
        //         var newArr = [], repeatArr = [], tempArr = [];
        //         textStr = textStr.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
        //         textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10,11,' ']/g, ','));
        //         textStr = $.trim(textStr.replace(/\s/g,""));
        //         var arr_new = textStr.split(',');
        //         for (var i = 0; i < arr_new.length; i++) {
        //             if (arr_new[i].toString().length > 0) {
        //                 newArr.push(arr_new[i]);
        //             }
        //         }
        //         var playcode = _this.getPlayCode();
        //         // if (playcode == 'ssc_sanxing_zuxuan' || playcode == 'ssc_erxing_zuxuan') {//涓€浜涢渶瑕佹棤搴忓幓閲嶇殑鐜╂硶
        //         //     repeatArr = newArr.duplicateNewa().uniqueArra();
        //         //     tempArr = newArr.uniqueArra();
        //         // } else {
        //         repeatArr = newArr.duplicateNew().uniqueArr();
        //         tempArr = newArr.uniqueArr();
        //         // }
        //         if (repeatArr.length <= 0) {
        //             // _this.alertmsg("鏃犻噸澶嶅彿鐮侊紒");
        //         } else {
        //             _this.alertmsg("已删除掉重复号? " + repeatArr.join(" "));
        //             $(".content_jiang .content_tex").val(tempArr.join(","));
        //         }
        //     }
        //     //閲嶆柊璁＄畻娉ㄦ暟
        //     // _this.renderZhushu();
        // },

    })
});