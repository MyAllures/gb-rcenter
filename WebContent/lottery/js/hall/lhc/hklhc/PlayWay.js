/**
 * 香港六合彩
 */
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
            this.quickSelect();
        },
        /**
         * 快选号码
         */
        quickSelect: function () {
            var _this = this;
            $(".main-right .table-common table tbody tr td input[type='checkbox']").click(function () {
                var isChecked = $(this).is(":checked");
                var arr = $(this).attr("data-nums");
                if (typeof arr == 'undefined') {
                    return;
                }
                arr = arr.split(",");
                if (isChecked) {
                    $.each(arr, function (index, value) {
                        _this.addYellow(value);
                    });
                } else {
                    $.each(arr, function (index, value) {
                        _this.removeYellow(value);
                    });
                }

            });
        }
    })
});

