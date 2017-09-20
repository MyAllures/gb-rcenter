//账号冻结
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "form";
            this._super(this.formSelector);
            if (window.top.freezeContent != null) {
                $("textarea[name='sysUser.freezeContent']").val(window.top.freezeContent);
                window.top.freezeContent = null;
            }
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
        },
        /**
         * 提交预览冻结
         * @param e
         * @param option
         */
        preview: function (e, option) {
            var id = $("input[name='search.id']").val();
            var freezeContent = $("textarea[name='sysUser.freezeContent']").val();
            var freezeTime = $("[name=freezeTime]").val();
            window.top.freezeContent = freezeContent;
            window.location.href = root + "/platform/operatorsManage/previewFreeze.html?search.id=" + id + "&freezeTime=" + freezeTime;
        }
    });
});