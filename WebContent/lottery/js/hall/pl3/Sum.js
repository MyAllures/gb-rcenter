/**
 * 和数
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            $('.fix-type a').eq(0).click();
        },
        bindButtonEvents: function () {
            var _this = this;
            this._super();
            /**
             * 切换选项
             */
            $('.fix-type a').on('click', function () {
                if($(".main-left .table-common .isLoading").length > 0){
                    return;
                }
                $('.fix-type>a').removeClass('active');
                $("input#inputMoney").val("");
                $(this).addClass('active');
                _this.refreshTableCommon($(this).data('code'))
            })
        }
    })
});