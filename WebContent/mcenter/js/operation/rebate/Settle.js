/**
 * 资金管理-充值审核
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

        },
        myValidateForm:function (e, opt) {
            if(!this.validateForm(e)){
                $(e.currentTarget).unlock();
                return false;
            }
            var total = $("[name='result.rebateTotal']").val();
            var actual = $("[name='result.rebateActual']").val();
            if(actual!=null&&actual!=""&&actual!="undefined"){
                if(total!=null&&total!=""&&total!="undefined"){
                    total = parseFloat(total);
                    actual = parseFloat(actual);
                    if(actual > total){
                        var msg = window.top.message.operation['operation.rebate.settle.big'];
                        window.top.topPage.showConfirmMessage(msg,function (state) {
                            if(state){
                                window.top.topPage.doAjax(e,opt);
                            }
                        })
                    }else{
                        return true;
                    }
                }else{
                    var msg = window.top.message.operation['operation.rebate.settle.rebateActual.error'];
                    page.showPopover(e,{},"warning",msg,true);
                }
            }else{
                var msg = window.top.message.operation['operation.rebate.settle.rebateTotal.error'];
                page.showPopover(e,{},"warning",msg,true);
            }
            $(e.currentTarget).unlock();
            return false;
        }
    });
});