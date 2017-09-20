define(['common/BaseEditPage'], function(BaseEditPage) {
    var _this;
    return BaseEditPage.extend({
        select:null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            _this=this;
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        saveValid: function (e) {
            //拼装层级
            var rankStr = "";
            $('input[name="rank"]:checked').each(function (index) {
                var val = $(this).val();
                if (index == 0) {
                    rankStr = rankStr + val;
                } else {
                    rankStr = rankStr + "," + val;
                }

            });
            $("#rankIds").val(rankStr);
            if (!this.validateForm(e)) {
                return;
            }
            return true;
        }
    })
});