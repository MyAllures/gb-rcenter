//模板页面
define(['common/BaseEditPage','bootstrapswitch','nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function(BaseEditPage) {

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
            this.initBootstrapSwitch();
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
        /**
         * 保存
         * @param e
         * @param p
         */
        updateCarouselSort:function(e,p){
            var that = this;
            $(e.currentTarget).unlock();
            window.top.topPage.ajax({
                type:"POST",
                contentType: "application/json",
                url:root+"/content/cttCarousel/resetSort.html",
                data:that._getDate(),
                success:function(data){
                    data = eval("("+data+")");
                    if(data.state){
                        window.top.topPage.showSuccessMessage(data.msg, function () {
                            $(".return-btn").click();
                        });
                    }else{
                        window.top.topPage.showErrorMessage(data.msg);
                        $(e.currentTarget).unlock();
                    }
                },
                error:function(e){

                }
            });
        },
        /**
         * 广告间隔时间
         */
        _getDate:function(){
            var result = [];
            var params = [];
            $('.dragdd').each(function(tbIdx,tb){
                $(tb).find("tbody").find("tr").each(function(trIdx,tr){
                    var tr = $(tr);
                    var dis = tr.is(":visible");
                    if(dis){
                        result.push({'orderNum':(trIdx+1),'id':tr.data("id"),'type':tr.data("type")});
                    }

                });
            });
            $('.times').each(function(index,obj){
                var param = {};
                $(obj).find("[type='hidden']").each(function(_index,_obj){
                    var $_this = $(_obj);
                    var _key = $_this.attr("name");
                    param[_key] = $_this.val();
                });
                params.push(param)

            });
            return JSON.stringify({'cttCarousels':result,"intervalTimes":params});
        },
        /**
         * 应用回调刷新
         * @param e
         * @param option
         */
        requery:function() {
            $("a.current").trigger("click");
        },
        /**
         * 初始化 BootstrapSwitch
         */
        initBootstrapSwitch:function() {
            var that = this;
            var $my_checkbox = $(this.formSelector + " input[name='my-checkbox']");
            that.unInitSwitch($my_checkbox).bootstrapSwitch();
        }
    });
});