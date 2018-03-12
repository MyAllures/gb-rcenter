/**
 * 人工存入js
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
            $("#mainFrame .return-btn").css("display","");
        },

        onPageLoad: function () {

            this._super();
        },

        bindEvent: function () {
            this._super();
            this.copyText('a[name="copy"]');
        },

        /**
         * 编辑备注
         * @param e
         * @param option
         */
        editRemark: function (e, option) {
            $("#editRemark").show();
            $("textarea[name='remarkContent']").removeAttr("readonly");
            $(e.currentTarget).hide();
            $(e.currentTarget).unlock();
        },
        /**
         * 取消编辑
         * @param e
         * @param option
         */
        cancelEdit: function (e, option) {
            $("#editRemark").hide();
            $("#editRemark").prev("a").show();
            var checkRemark = $("input[name=originRemark]").val();
            $("textarea[name='remarkContent']").val(checkRemark);
            $("textarea[name='remarkContent']").attr("readonly", true);
            $(e.currentTarget).unlock();
        },
        updateRemarkBack: function (e, option) {
            $("#editRemark").hide();
            $("#editRemark").prev("a").show();
            $("input[name=originRemark]").val($("textarea[name='remarkContent']").val());
            $("textarea[name='remarkContent']").attr("readonly", true);
        }
    });
});