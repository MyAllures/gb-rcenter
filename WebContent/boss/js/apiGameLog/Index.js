/**
 * 资金管理-充值管理列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
            this.queryCount();
        },
        bindEvent: function () {
            var _this = this;
        },
        /**
         * 执行查询
         * @param event         事件对象
         */
        query : function(event) {
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
                        var $result=$(".search-list-container",$form);
                        $result.html(data);
                        event.page.onPageLoad();
                        event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
                this.queryCount();
            } else {
                $(event.currentTarget).unlock();
            }
        },
        /**
         * 重新计算分页
         * @param e
         */
        queryCount: function () {
            var _this = this;
            var url = root + "/apiGameLog/count.html";
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                type: 'POST',
                success: function (data) {
                    $("#paginationDiv").html(data);
                    _this.initSelect();
                    $(_this.formSelector + " .search-wrapper [selectDiv]").attr("callback", "selectListChange");
                },
                error: function (data) {

                }
            })
        },

        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        }

    });
});