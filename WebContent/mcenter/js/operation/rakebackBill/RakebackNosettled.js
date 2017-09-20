/**
 * 未出账单返水列表
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
        /**
         * 回调：选择字段回调
         */
        back: function (e, option) {
            var _this = this;
            if (e.returnValue) {
                window.top.topPage.ajax({
                    url: this.getCurrentFormAction(e),
                    data: {'filterData': JSON.stringify(e.returnValue)},
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    success: function (data) {
                        if (data) {
                            $('.search-list-container').html(data);
                            e.page.onPageLoad();
                        }
                        $(e.currentTarget).unlock();
                    },
                    error: function (data) {
                        $(e.currentTarget).unlock();
                    }
                })
            }
        }
    });
});
