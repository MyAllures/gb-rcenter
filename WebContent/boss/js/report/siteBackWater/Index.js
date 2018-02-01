/**
 * 返水明细-添加选择
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
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
        onPageLoad: function (form) {
            this._super(form);
        },

        bindEvent : function() {
            this._super();
        },
        callBackQuery: function (event, opt) {
            var that = this;
            if (opt.data.state == true) {
                page.showPopover(event,{"callback":function () {
                    that.query(event);
                }},"success",window.top.message.common['operation.success'],true);
            }else{
                page.showPopover(event,{},"danger",window.top.message.common['operation.fail'],true);
                $(event.currentTarget).unlock();
            }
        }
    });
});
