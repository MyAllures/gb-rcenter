/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
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
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

        },
        onPageLoad: function () {
            this._super();
        },
        cancelNoPayoutOrderDiv: function (event,option) {
           this.query(event,option)
        },
        query : function(event,option) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        var obj = eval("("+data+")");
                        if (obj.state){
                            page.showPopover(event,option,"success",obj.msg,true);
                        }else{
                            page.showPopover(event,option,"danger",obj.msg,true);
                        }

                        // var $result=$(".search-list-container",$form);
                        // $result.html(data);
                        // event.page.onPageLoad();
                        // event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()
                    },
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
                return;

        },

    });
});