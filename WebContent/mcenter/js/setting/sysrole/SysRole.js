/**
 * Created by tom on 15-8-4.
 */
define(['common/BaseEditPage','bootstrapswitch'], function(BaseEditPage,Bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            this.bindEvent();
        },
        bindEvent:function()
        {
            this._super();
            this.unInitSwitch($("#status"))
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function(event, state) {
                    if (state) {
                        $("[name='result.status']").val("1");
                    } else {
                        $("[name='result.status']").val("2");
                    }
                });

        }
    });
});


