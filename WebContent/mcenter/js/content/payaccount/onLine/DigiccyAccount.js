define(['common/BaseEditPage', 'bootstrapswitch'], function (BaseEditPage, Bootstrapswitch) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=digiccyAccountForm]";
            this._super(this.formSelector);
        },
        onPageLoad: function () {
            this._super();
            var $bootstrapSwitch = $('input[type=checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                    {
                        onText: '使用',
                        offText: '停用'
                    });
        }
    })
});