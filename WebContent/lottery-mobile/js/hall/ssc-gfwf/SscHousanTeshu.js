define(['site/hall/ssc-gfwf/PlayWay-gfwf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            $("a[data-code='ssc_sanxing_hs']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#housan").show();
            $("span.x_1.gfwf-tit").text("后三");
            $(".s-title.title1 span").text("后三");
            $("#housan a").removeClass("mui-active");
            $("a[data-code='ssc_sanxing_zuxuan_hsts']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("特殊号")
            $(".s-title.title2 span").text("特殊号");
        },


        /*=====================================特殊号========================================*/
        /**
         * 注数-特殊号
         */
        zhushu_h3tsh :function () {
            var tsArr = [];
            $.each($("a.n-btn.teshu.mui-active"), function (index, value) {
                tsArr.push($.trim($(this).html()));
            });
            var zlLength = tsArr.length;
            if (zlLength <= 0) {
                return 0;
            }
            return tsArr.length;
        },


        /**
         * 后三组选-特殊号
         */
        content_h3tsh: function (){
            var thArr = [];
            $.each($("a.n-btn.teshu.mui-active"), function (index, value) {
                thArr.push($.trim($(this).html()));
            });
            if (thArr.length <= 0) {
                alert("至少选择1注号码才能投注");
                return false;
            }
            return thArr.join("|");
        },

        /**
         * 随机算法-后三特殊号
         */
        random_h3tsh :function () {
            var random_1 = parseInt(Math.random() * 3);
            $("a.n-btn.teshu").removeClass("mui-active").eq(random_1).addClass("mui-active");
        },

        getBetOddl: function(){
            var _this=this;
            var odd = $("#betContent_playPl").text();
            if (odd.indexOf('|') > 0) {
                var arrOdd=odd.split('|');
                var betCode=_this.getBetCode();
                var l = $("a.n-btn.teshu.mui-active").length;
                var teshuIndex;
                var teshuName;
                if (l == 1) {
                    $("a.n-btn.teshu.mui-active").each(function () {
                        teshuName = $(this).html();
                    });
                    if (teshuName == '豹子') {
                        teshuIndex = 0;
                    } else if (teshuName == '顺子') {
                        teshuIndex = 1;
                    } else if (teshuName == '对子') {
                        teshuIndex = 2;
                    }
                }else {
                    teshuName = $("a.n-btn.teshu.mui-active").html();
                    if (teshuName == '豹子') {
                        teshuIndex = 0;
                    } else if (teshuName == '顺子') {
                        teshuIndex = 1;
                    } else if (teshuName == '对子') {
                        teshuIndex = 2;
                    }
                }
                odd=arrOdd[teshuIndex];
            }
            return odd;
        }

    });
});