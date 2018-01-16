/**
 * 运维——存款监控
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,bootstrapswitch) {

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
        bindEvent : function() {
            this._super();
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var siteId = $("input[name='siteId']").val().trim();
            if (siteId==null||siteId==''){
                e.page.showPopover(e, {}, 'warning',"站点ID不能为空", true);
                return false;
            }
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        /**
         *
         * @param event         事件对象
         */
        queryCallBack : function() {
            $("#mainFrame").load(root + "/rechargeMonitorParam/list.html");
        }
    });
});