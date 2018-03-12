/**
 * 出款账户
 */
define(['common/BaseEditPage','bootstrapswitch'], function (BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            this.initSwitch();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

        },
        initSwitch:function(){
            var _this=this;
            var $bootstrapSwitch = $("[name='my-checkbox']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.common['enable'],
                        offText: window.top.message.common['forbidden'],
                        onSwitchChange: function (e, state) {
                            $("[name='result.active']").val(state);
                        }
                    }
                );
        },
        accountValidateForm: function (e,opt) {
            var isActive = $("[name='result.active']").val();
            var withdrawChannel=$("#withdrawChannel").val();
            var merchantCode=$("#merchantCode").val();
            var platformId=$("#platformId").val();
            var key=$("#key").val();
            if(isActive=="true"){
                if (withdrawChannel==null||withdrawChannel==""){
                    page.showPopover(e,opt,"danger","出款渠道不能为空",true);
                    return false;
                }else if (merchantCode==null||merchantCode==""){
                    page.showPopover(e,opt,"danger","商户号不能为空",true);
                    return false;
                }else if (key==null||key==""){
                    page.showPopover(e,opt,"danger","秘钥不能为空",true);
                    return false;
                }
            }
            return true;
        },
        /**
         * 示例删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        saveCallbak: function (e, option) {
            if (e.returnValue == true) {
                this.returnValue=true;
                window.top.topPage.closeDialog();
            }
        }

    });
});