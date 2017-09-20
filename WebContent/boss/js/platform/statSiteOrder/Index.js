//模板页面
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super("更多备注");
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        /**
         * 执行查询siteUnsettledOrder
         */
        siteUnsettledOrder: function (e) {
            var top = window.top.topPage;
            top.ajax({
                url:root+"/statSiteOrder/siteUnsettledOrder.html?t="+new Date().getTime,
                type:"GET",
                data: $("form").serialize(),
                success:function(data){
                    if(data=="true"){
                        window.top.topPage.showInfoMessage("执行成功")
                    }else if(data=="false"){
                        window.top.topPage.showErrorMessage("操作太频繁")
                    }
                    $(e.currentTarget).unlock();
                },
                error:function (error) {
                    $(e.currentTarget).unlock();
                }
            })
        },

        /**
         * 执行查询siteUnsettledOrder
         */
        siteDistributeOrder: function (e) {
            var top = window.top.topPage;
            top.ajax({
                url:root+"/statSiteOrder/siteDistributeOrder.html?t="+new Date().getTime,
                type:"GET",
                data: $("form").serialize(),
                success:function(data){
                    if(data=="true"){
                        window.top.topPage.showInfoMessage("执行成功")
                    }else if(data=="false"){
                        window.top.topPage.showErrorMessage("操作太频繁")
                    }
                    $(e.currentTarget).unlock();

                },
                error:function (error) {
                    $(e.currentTarget).unlock();
                }
            })
        }

    });
});