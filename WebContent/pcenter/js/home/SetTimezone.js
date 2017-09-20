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
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            this.changeTimeByTimeZone();
        },

        changeTimeByTimeZone:function(){
            /*根据时区显示当前时间*/
            $("[name='result.defaultTimezone']").on("change",function(e){
                var $this = $(this);
                var value = $this.val();
                if(value){
                    window.top.topPage.ajax({
                        url:"index/getDateByTimezone.html",
                        data:{
                            "result.defaultTimezone":value,
                        },
                        type:"POST",
                        success:function(data){
                            $("._showDateByTimezone").text(value + " " +data);
                            $(e.currentTarget).unlock();
                        },
                        error:function(error){
                        }
                    })
                }
            });
        }
    });
})
;