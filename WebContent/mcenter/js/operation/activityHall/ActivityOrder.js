/**
 * Created by eagle on 15-8-27.
 */

define(['common/BaseListPage', 'nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseListPage,nestable) {

    return BaseListPage.extend({

        init:function() {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
            this.initNestable();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            this.initNestable();
        },
        /**
         * 拖动排序初始化
         * @see https://github.com/dbushell/Nestable
         */
        initNestable:function(){
            $(".dragdd").nestable({
                rootClass:'dragdd',
                listNodeName:'tbody',
                listClass:'dd-list1',
                itemNodeName:'tr',
                handleClass:'td-handle1',
                itemClass:'dd-item1',
                maxDepth:1
            });
        },
        saveActivityOrder: function(e,option) {
            var _this = this;
            var apiTypeOrder = {};
            var orderObj = [];
            var search = {};
            $("tbody tr").each(function(index,obj){
                orderObj.push({"classifyOrderNum":index+1,"orderNum":index+1,"id":$(obj).children("[name='activityId']").val()});
            });
            apiTypeOrder.orderList = orderObj;
            search.activityClassifyKey=$("input[name='search.activityClassifyKey']").val();//类别
            apiTypeOrder.search = search;
            window.top.topPage.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType:'json',
                data:JSON.stringify(apiTypeOrder),
                async:false,
                type:"post",
                url:root+'/activityHall/activity/order/saveOrder.html',
                success:function(data){
                    window.top.topPage.showSuccessMessage(window.top.message.common['save.success'], function (state) {
                        if(state){
                            // _this.goToLastPage();
                            window.top.topPage.goToLastPage(true);
                        }
                    });
                },
                error:function(data) {
                    window.top.topPage.showSuccessMessage(window.top.message.common['save.failed']);
                }
            });
            $(e.currentTarget).unlock();
        }
    });
});
