define(['common/BaseEditPage','bootstrapswitch'], function(BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        /**
         * 游戏标签回调查询
         * */
        queryTag: function (e) {
            window.top.topPage.ajax({
                url: root + '/vGame/manageGameTag.html',
                headers: {
                    "Soul-Requested-With":"XMLHttpRequest"
                },
                success: function (data) {
                    if(data){
                        $("#gameTag").html(data);
                    }
                }
            });
        }
    });
});