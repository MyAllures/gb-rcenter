
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

        //删除重复号码
        delRrepet: function() {
            var _this = this;
            var textStr = $("div.content_jiang").find(".content_tex").val();
            if (typeof (textStr)!= "undefined") {
                var newArr = [], repeatArr = [], tempArr = [];
                textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
                var arr_new = textStr.split(",");
                for (var i = 0; i < arr_new.length; i++) {
                    if (arr_new[i].toString().length > 0) {
                        newArr.push(arr_new[i]);
                    }
                }
                var playcode = _this.getPlayCode();
                if (playcode == 'pl3_sanxing_zuxuan' || playcode == 'pl3_erxing_zuxuan') {//一些需要无序去重的玩法
                    // repeatArr = newArr.duplicateNewa();
                    // tempArr = newArr.uniqueArra();
                    tempArr = newArr.sortArrayUnique();
                } else {
                    // repeatArr = newArr.duplicateNew();
                    // tempArr = newArr.uniqueArrByzx();
                    tempArr = newArr.arrayUnique();
                }
                if (tempArr[1].length > 0) {
                    _this.alertContext = "已删除掉重复号: " + tempArr[1].join(" ")
                }
                $(".content_jiang .content_tex").val(tempArr[0].join(" "));
            }
        },


        //封盘
        closePl3GfwfHandicap: function () {
            $("ul .numLine").addClass("block-bet-btn");
            $("textarea.content_tex").attr("readonly",true);
            $("a#suiji1").removeAttr("onclick");
            $("a#suiji1").addClass("disabled-btn");
            $("a#suiji5").removeAttr("onclick");
            $("a#suiji5").addClass("disabled-btn");
            $("a#tjzd").removeAttr("onclick");
            $("a#tjzd").addClass("disabled-btn");
            $("a#qrtz").removeAttr("onclick");
            $("a#qrtz").addClass("disabled-btn");
            //开盘
        },
        openPl3GfwfHandicap: function () {
            $("ul .numLine").removeClass("block-bet-btn");
            $("textarea.content_tex").removeAttr("readonly");
            $("a#suiji1").attr("onclick","page.PlayWay.getSuiji(1)");
            $("a#suiji1").removeClass("disabled-btn");
            $("a#suiji5").attr("onclick","page.PlayWay.getSuiji(5)");
            $("a#suiji5").removeClass("disabled-btn");
            $("a#tjzd").attr("onclick","page.PlayWay.tjzd()");
            $("a#tjzd").removeClass("disabled-btn");
            $("a#qrtz").attr("onclick","page.PlayWay.buyBtn()");
            $("a#qrtz").removeClass("disabled-btn");
            this.init();
        }

    })
});