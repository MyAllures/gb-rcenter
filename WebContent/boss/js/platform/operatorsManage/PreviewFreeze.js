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
            $("div[name=freezeContent]").text(window.top.freezeContent);
            $("input[name='sysUser.freezeContent']").val(window.top.freezeContent);
            window.top.freezeContent = null;
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
        },
        /**
         * 返回上一步
         * @param e
         * @param option
         */
        previous: function (e, option) {
            var id = $("input[name='search.id']").val();
            var isFreeze = $("input[name=isFreeze]").prop("checked");
            var freezeContent = $("input[name='sysUser.freezeContent']").val();
            var freezeTime = $("[name=freezeTime]").val();
            window.top.freezeContent = freezeContent;
            window.location.href = root + "/platform/operatorsManage/freeze.html?search.id=" + id + "&sysUser.freezeContent=" + freezeContent + "&freezeTime=" + freezeTime;
        }
    });
});