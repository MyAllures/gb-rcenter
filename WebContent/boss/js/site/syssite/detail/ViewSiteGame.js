define(['common/BasePage', 'common/Pagination'], function(BasePage,Pagination) {
    var _this=this;
    return BasePage.extend({
        pagination : null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "#viewSiteGameForm";
            this.pagination = new Pagination(this.formSelector);
            this._super(this.formSelector);
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
            this.pagination.processOrderColumnTag(this);
            $(".tab-content > .tab-pane").css("display","block");
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

            $("a","div.apitype").on("click",function(){
                var that = this;
                var _data = {'apiTypeId':$(this).attr("data-value"),'siteId':$("#siteId").val()};
                window.top.topPage.ajax({
                        loading:true,
                        url:root+'/site/detail/loadSiteGame.html',
                        data:_data,
                        headers: {
                            "Soul-Requested-With":"XMLHttpRequest"
                        },
                        type:"post",
                        success:function(data){
                            $(that).parents("div.apitype").find("a").addClass("btn-outline");
                            $(that).removeClass("btn-outline");
                            $("tbody").html(data);
                        },
                        error:function(data, state, msg){
                            window.top.topPage.showErrorMessage(data.responseText);
                        }}
                );
            });
        },

        /**
         * 执行查询
         * @param event         事件对象
         */
        query : function(event,option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        $("div.search-list-container").html(data);
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
        },
    });
});