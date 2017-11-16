define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        payout:function (e, option) {
            var siteId=$("#siteId").val();
            var code=$("[name='code']").val();
            var expect=$("[name='expect']").val();
            var $target = $(e.currentTarget);
            var _this = this;
            window.top.topPage.ajax({
                type: "post",
                url: root + '/lotteryPayoutRecord/payout.html',
                data: {'search.siteId': siteId,"search.code":code,"search.expect":expect},
                success: function (data) {
                    data=eval("("+data+")");
                    var msg=data.msg;
                    var state=data.state;
                    if (data.state == true) {
                        e.page.showPopover(e, option, 'success', msg, true);
                    }else {
                        _this.returnValue = false;
                        e.page.showPopover(e, option, 'danger', msg, true);
                    }
                    $target.unlock();
                }
            })
        }
    });
});