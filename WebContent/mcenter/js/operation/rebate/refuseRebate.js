/**
 * Created by shisongbin on 15-9-16.
 */
define(['common/BaseEditPage','gb/share/ListFiltersPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init:function() {
            this._super();
        },

        bindEvent:function(){
            this._super();
            var _this = this;
        },
        reasonTitleChange:function(e){
            var value = e.key;
            $("textarea[name='reasonContent']").val(select.getSelected("[name='reasonTitle']").attr("holder"));
            $("input[name='groupCode']").val(select.getSelected("[name='reasonTitle']").attr("groupCode"));
            page.reasonPreviewMore.viewFailureDetail(e);
        },
        /**
         * 编辑模板
         * @param e
         * @param option
         */
        editTmpl: function (e, option) {
            window.top.topPage.closeDialog();
            $(window.top.page.parentTarget).next().children().click();
        },

        /**
         * 拒绝原因预览更多
         * @param e
         * @param option
         */
        //previewMore: function (e, option) {
        //    var next = $(e.currentTarget).next();
        //    var toggle = eval("(" + $(e.currentTarget).attr("data-rel") + ")").toggle;
        //    var rel = $(e.currentTarget).attr("data-rel");
        //    var _this = this;
        //    if (toggle == "true") {//收起预览更多内容
        //        $(e.currentTarget).parent().removeClass("show");
        //        $(e.currentTarget).parent().parent().next().hide();
        //        $(e.currentTarget).attr("data-rel", rel.replace('"toggle":"true"', '"toggle":"false"'));
        //        this.resizeDialog();
        //        $(e.currentTarget).unlock();
        //    } else {//展现预览更多内容
        //        var groupCode = $("input[name='groupCode']").val();
        //        $(e.currentTarget).attr("data-rel", rel.replace('"toggle":"false"', '"toggle":"true"'));
        //        window.top.topPage.ajax({
        //            url: root + '/share/reasonPreviewMore.html',
        //            data: {"tmplGroupCode": groupCode},
        //            success: function (data) {
        //                $(e.currentTarget).parent().addClass("show");
        //                $(e.currentTarget).parent().parent().next().html(data);
        //                _this.resizeDialog();
        //                $(e.currentTarget).unlock();
        //            },
        //            error: function () {
        //                $(e.currentTarget).unlock();
        //            }
        //        });
        //        $(e.currentTarget).parent().parent().next().show();
        //    }
        //},

        /**
         *  预览更多的内容更换语言，相应内容变化
         * @param e
         * @param option
         */
        //changeLocale: function (e, option) {
        //    var current = $(e.currentTarget).parent().parent().find("a.current");
        //    $(current).removeClass("current");
        //    $(e.currentTarget).addClass("current");
        //    var currentOption = eval("(" + $(current).data('rel') + ")");
        //    $("#" + currentOption.data).hide();
        //    $("#" + option.data).show();
        //    $(e.currentTarget).unlock();
        //},
        //
        ///**
        // * 更换预览更多的内容
        // * @param e
        // */
        //viewFailureDetail: function (e) {
        //    var toggle = eval("(" + $("a.dropdown-toggle").attr("data-rel") + ")").toggle;
        //    if (toggle == 'true') {
        //        var groupCode = $("input[name='groupCode']").val();
        //        window.top.topPage.ajax({
        //            url: root + '/share/reasonPreviewMore.html',
        //            data: {"tmplGroupCode": groupCode},
        //            success: function (data) {
        //                $(e.currentTarget).parent().parent().next().html(data);
        //            },
        //            error: function () {
        //            }
        //        });
        //    }
        //},
    });
});