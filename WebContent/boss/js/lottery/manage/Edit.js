define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function (BaseEditPage) {
    var that;
    return BaseEditPage.extend({
        init: function () {
            this._super();
            var _this = this;
        },
        bindEvent:function(){
            that = this;
            this._super();

        },
        onPageLoad:function(){
            this._super();
        }
    })
});