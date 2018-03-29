//模板页面
define(['common/BaseEditPage','bootstrapswitch','nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function(BaseEditPage,Bootstrapswitch,nestable) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,

        init: function (title) {
            this.formSelector = "form";
            this._super();
            /*$('.help-popover').popover();*/
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
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
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
        saveFloatOrder: function(e,option) {
            var _this = this;
            var floatOrder = {};
            var orderObj = [];
            $("tbody tr").each(function(index,obj){
                orderObj.push({"order":index+1,"objectId":$(obj).children("[name='floatType']").val()});
                floatOrder.orderList = orderObj;
            });
            window.top.topPage.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType:'json',
                data:JSON.stringify(floatOrder),
                async:false,
                type:"post",
                url:root+'/cttFloatPic/saveFloatOrder.html',
                success:function(data){
                    window.top.topPage.showSuccessMessage(window.top.message.common['save.success'], function (state) {
                        $(".return-btn").click();
                    });
                    //_this.requery();
                },
                error:function(data) {
                    window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 应用回调刷新
         * @param e
         * @param option
         */
        requery:function() {
            $("a.current").trigger("click");
        }
    });
});