define(['common/BaseListPage', 'autocompleter'], function (BaseListPage) {
    return BaseListPage.extend({

        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this =this;
            _this._updateCheckBox(event);
        },

        _updateCheckBox:function (e) {
            //相应字段有值checkbox为勾选且不可操作状态
            $("[name='search.channelCode']").on('input', function(e) {
                var channelCode = $("[name='search.channelCode']").val();
                if (channelCode){
                    $("#channelCode").prop('checked',true);
                }else {
                    $("#channelCode").prop('checked',false);
                }
            });
            $("#channelCode").on('click', function(e) {
                var channelCode = $("[name='search.channelCode']").val();
                if (channelCode){
                    e.preventDefault();
                    alert("搜索渠道时无法取消勾选！");
                }
            });
            $("[name='search.siteId']").on('input', function(e) {
                var siteId = $("[name='search.siteId']").val();
                if (siteId){
                    $("#siteId").prop('checked',true);
                }else {
                    $("#siteId").prop('checked',false);
                }
            });
            $("#siteId").on('click', function(e) {
                var siteId = $("[name='search.siteId']").val();
                if (siteId){
                    e.preventDefault();
                    alert("搜索站点时无法取消勾选！");
                }
            });
            $("[name='search.terminal']").on('click', function(e) {
                var terminal = $("[name='search.terminal']:checked").val();
                if (terminal){
                    $("#terminal").prop('checked',true);
                }else {
                    $("#terminal").prop('checked',false);
                }
            });
            $("#terminal").on('click', function(e) {
                var terminal = $("[name='search.terminal']:checked").val();
                if (terminal){
                    e.preventDefault();
                    alert("搜索终端时无法取消勾选！");
                }
            });
            $("[name='search.description']").on('change', function(e) {
                var description = $("[name='search.description']").val();
                if (description){
                    $("#description").prop('checked',true);
                }else {
                    $("#description").prop('checked',false);
                }
            });
            $("#description").on('click', function(e) {
                var description = $("[name='search.description']").val();
                if (description){
                    e.preventDefault();
                    alert("搜索描述时无法取消勾选！");
                }
            });
        },
        /**
         * 执行查询
         * @param event         事件对象
         */
        query : function(event) {
            var _this = this;
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
                        $(event.currentTarget).unlock();
                        _this.queryCount();
                    },
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
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
            var url = root + "/payLogAnalyze/count.html";
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
         * 重置表单
         * @param event
         */
        reset:function (event) {
            $("[name='search.channelCode']").val('');
            $("[name='search.siteId']").val('');
            $("[name='search.terminal']:checked").val('');
            $("[name='search.description']").val('');
            $("[name='search.errorType']").val('');
            $("[name='search.startTime']").val('');
            $("[name='search.endTime']").val('');
            $("#channelCode").prop('checked',false);
            $("#siteId").prop('checked',false);
            $("#terminal").prop('checked',false);
            $("#description").prop('checked',false);
        }


    });
});