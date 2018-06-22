/**
 * Created by mark on 15-7-14.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        /**
         * 保存后回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        saveCallbak: function (e, option) {
            if (option && option.data && option.data.state) {
                this.returnValue = true;
                window.top.topPage.closeDialog();
            }
        },

        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $chartName = $("#jobPlanRunTime").parent().parent();
            var startDate = $chartName.find("input[name='jobStartDate']").val();
            var endDate = $chartName.find("input[name='jobEndDate']").val();
            if (startDate === "" || endDate === "") {
                window.top.topPage.showErrorMessage("开始和结束日期都不能为空!", null, true);
                return false;
            }
            var maxDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 35));
            if (new Date(endDate) > maxDate) {
                window.top.topPage.showErrorMessage("时间跨度不能超过35天!", null, true);
                return false;
            }
            return true;
        }
    });
});