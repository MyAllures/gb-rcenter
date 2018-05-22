/**
 * Created by jeff on 15-10-20.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            var that = this;
            $("#site_id_txt").on("change", function () {
                that.changeSite();
            });
        },
        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
            var _this = this;
            var success = $("#success").val();
            if (success == "false") {
                window.top.topPage.showWarningMessage($("#errMsg").val(), function () {
                    _this.closePage();
                });
            }
        },
        validateForm:function(){
            return true;
        },
        previewRole: function (event, option) {
            this.returnValue = 'role';
            this.closePage();
        },
        changeSite: function () {
            var the = this;
            var siteId = $("#site_id_txt").val();
            if (!isNaN(siteId) && siteId.indexOf(".") == -1) {
                window.top.topPage.ajax({
                    url: root + "/siteAppUpdate/fetchH5Color.html?site_id=" + siteId,
                    type: "get",
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        $("[name='result.id']").val(data.id);
                        $("[name='result.siteId']").val(siteId);
                        $("[name='result.paramValue']").val(data.paramValue);
                    },
                    error: function (err) {
                        window.top.topPage.showErrorMessage("获取参数失败，请稍后再试.");
                    }
                });
            } else {
                window.top.topPage.showWarningMessage("请输入正确的站点ID");
            }
        }
    });
});