define(['common/BaseListPage'], function(BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            $("#searchtext").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });

        },
        callbackquery: function (e,option) {
            if (e.returnValue==true) {
                this.query(e,option);
            } else if (e.returnValue=='tmpIndex') {
                $("#mainFrame").load(root+"/noticeTmpl/tmpIndex.html");
            }
        }
    });

});
