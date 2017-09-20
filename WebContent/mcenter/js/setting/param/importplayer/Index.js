/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            $("#li_top_7").addClass("active");
        },
        showImportList: function (e,opt) {
            $(".import_list").show();
            $(".import_list").removeClass("btn-outline");
            $(".import_introduce").hide();
            $(".import_introduce").addClass("btn-outline");
            $(".btn_list").removeClass("btn-outline");
            $(".btn_introduce").addClass("btn-outline");
            $(e.currentTarget).unlock();
        },
        showImportIntroduce : function (e,opt) {
            $(".import_introduce").show();
            $(".btn_introduce").removeClass("btn-outline");
            $(".import_introduce").removeClass("hide");
            $(".import_list").hide();
            $(".btn_list").addClass("btn-outline");
            $(e.currentTarget).unlock();
        }
    })
})
