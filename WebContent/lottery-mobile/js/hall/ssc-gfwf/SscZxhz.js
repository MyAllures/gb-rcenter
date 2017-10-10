define(['site/hall/ssc-gfwf/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        /**
         * 任选二-直选和值
         */
        content_ssc_renxuan2_zxhz: function () {
            var hzArr = [], checkStrArr = [];
            $.each($(".zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
                hzArr.push($.trim($(this).html()));
            });

            checkStrArr = getCheckboxValue();

            if (checkStrArr.length < 2) {
                Tools.alert("[任选二]至少需要选择2个位置");
                return -1;
            }

            return checkStrArr.join(',') + "|" + hzArr.join(",");
        },

        /**
         * 随机算法-任二直选和值
         */

        random_rx2zxhz: function () {
            var random_1 = parseInt(Math.random() * 19);

            $(".zxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
        }
    });
});