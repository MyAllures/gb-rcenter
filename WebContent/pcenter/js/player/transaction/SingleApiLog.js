//模板页面
define(['common/BaseListPage'], function(BaseListPage){

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectPure:null,
        init : function() {
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
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            var _this = this;
            //这里初始化所有的事件
            /**
             * 有标签页时调用
             */
            this.initShowTab();
            $(this.formSelector).on("change","select",function(event){
                _this.query(event);
            })
        },
        queryByGame: function (event, option) {
            var orderid = option.orderid;
            window.top.topPage.ajax({
                url: root + "/vPlayerGameOrder/gameRecordDetail.html?betId=" + orderid,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                type: "post",
                data: this.getCurrentFormData(event),
                success: function (data) {
                    $("#mainFrame").html(data);

                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                    $(event.currentTarget).unlock();
                }
            });

        },
        query:function(e,p){
            this._super(e,p);
        }

    });
});