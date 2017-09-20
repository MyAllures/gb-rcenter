/**
 * create by eagle
 */
define(['common/BaseListPage'], function(BaseListPage) {

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
        },

        getMonths: function (e) {

            var year = e.value;
            window.top.topPage.ajax({
                url:root+'/operation/stationbill/getMonths.html',
                type:"POST",
                dataType: "json",
                data: {"year": year},
                success:function(data) {
                    var $html = $("[selectdiv='month']");
                    $html.find("ul").html("");
                    if(data){
                        var i = 0;
                        for(d in data) {
                            if(i==0) {
                                $html.find("input[type='hidden']").val(data[d]);
                                $html.find("[prompt='prompt']").html(data[d]);
                            }
                            select.addOption($html,d,data[d]);
                            i++;
                        }
                    }
                    $(e.currentTarget).unlock()
                },
                error:function(data) {
                    $(e.currentTarget).unlock()
                }
            })
        }
    });
});