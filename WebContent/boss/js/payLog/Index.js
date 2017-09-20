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
        }


    });
});