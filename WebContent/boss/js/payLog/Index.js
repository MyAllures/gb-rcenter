define(['common/BaseListPage', 'autocompleter'], function (BaseListPage) {
    var _this = this;
    return BaseListPage.extend({
        init: function (title) {
            this.formSelector = "#mainFrame form";
            var isCondition = $("input[name='search.searchCondition']").val();
            if (isCondition == "false") {
                this.noRecordMessage = "请输入查询条件";
                $("._search").lock();
                $("._search").addClass("disabled");
                $("input[name='search.searchCondition']").val("true");
            }
            this._super("formSelector");
            this.queryCount();
        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var val = $("[name='search.siteId']").val();
            $("[name='search.siteId']").val(val);
            this._super();
            var _this = this;
            _this.querySiteInfo();
        },
        toExportHistory: function (e, opt) {
            if (e.returnValue) {
                $("#toExportHistory").click();
            }
        },
        exportData: function (e, opt) {
            var data = $("#conditionJson").val();
            return data;
        },
        validateData: function (e, opt) {
            if ($("[name='paging.totalCount']").val() == 0) {
                window.top.topPage.showWarningMessage("查询无数据,无法导出");
                $(e.currentTarget).unlock();
                return;
            }
            var siteId = $("#siteId").val();
            if (!siteId || siteId == "") {
                window.top.topPage.showWarningMessage("请选择一个站点进行统计");
                $(e.currentTarget).unlock();
                return;
            }
            opt.target = opt.target.replace('{siteId}', siteId);
            return true;
        },
        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');
        },
        querySiteInfo:function () {
            $(this.formSelector).on("blur","#siteId",function () {
                var val = $("#siteId").val();
                window.top.topPage.ajax({
                    loading: true,
                    url: root+"/report/gameTransaction/querySiteInfo.html",
                    type: "post",
                    data: {"siteId":val},
                    dataType:"JSON",
                    success: function (data) {
                        if (data) {
                            $("[selectdiv='search.centerId']").attr("value",data.centerUserId);
                            select.setValue($("[selectdiv='search.centerId']"), data.centerUserId);
                            $("[selectdiv='search.masterId']").attr("value",data.sysUserId);
                            $("[selectdiv='search.siteId']").attr("value",data.id);
                            select.ajaxList($("[selectdiv='search.masterId'] input"));
                        }
                    }
                });
            })
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
            var url = root + "/payLog/count.html";
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
        }


    });
});