//模板页面
define(['common/BaseEditPage'], function (BaseEditPage) {

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
            //var startTime=$("#startTime").val();
            //var endTime=$("#endTime").val();
            //var payAccountId=$("#payAccountId").val();
            //window.top.topPage.ajax({
            //    url: root + '/fund/rechargeOnline/getThawVal.html',
            //    dataType: "json",
            //    async:false,
            //    data: {"payAccountId": payAccountId,"startTime":startTime,"endTime":endTime},
            //    success: function (data) {
            //        console.log(data.orderNum);
            //        $("#statistics").text(window.top.message.content['payAccount.thaw.8']+data.orderNum+window.top.message.content['payAccount.thaw.9']+data.currency+data.totalAmount);
            //    }
            //})
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件

        },
        /**
         * 示例删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        saveCallbak: function (e, option) {
            page.returnValue = e.returnValue;
            this.closePage();
        }
    });
});