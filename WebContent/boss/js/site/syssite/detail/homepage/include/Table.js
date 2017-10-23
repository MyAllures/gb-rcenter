/**
 * 管理首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function() {
            this._super();
            this.loadTableData();
        },

        /** 报表数据 */
        loadTableData: function () {
            var _this=this;
            window.top.topPage.ajax({
                url: root + '/site/detail/tableData.html',
                dateType: 'json',
                success: function (data) {
                    $('#table').html($('div.table', $(data)).html());
                    $('div#table [data-toggle="popover"]',_this.formSelector).popover({
                        trigger: 'hover',
                        html: true
                    });
                }
            });
        }
    });
});