/**
 * 查询模板条件
 */
define(['common/BasePage', 'bootstrap-dialog', 'serializeJSON'], function (BasePage, BootstrapDialog, SerializeJSON) {

    return BasePage.extend({
        init: function () {
            this.formSelector = "div[name=searchTemplate]";
            this._super(this.formSelector);
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            //选择模板搜索
            $(this.formSelector + " .searchByTemp").on("click", "a.chooseTemplate", function (e) {
                _this.searchByTemp(e);
            });

            //删除模板
            $(this.formSelector + " .searchByTemp").on("click", "a.deleteTemplate", function (e) {
                var option = {};
                _this.deleteItem(e, option);
            });
        },

        searchByTemp: function (e, option) {
            var $target = $(e.currentTarget);
            var selectVal = $target.attr("key");
            if (selectVal && selectVal != '') {
                var content = $target.parents().children("#content_" + selectVal).text();
                var selectName = $target.text();
                window.top.topPage.ajax({
                    loading: true,
                    url: window.top.topPage.getCurrentFormAction(e),
                    type: "post",
                    data: JSON.parse(content),
                    dataType: "html",
                    success: function (data) {
                        //保存返回按钮是否隐藏
                        var style = $("#mainFrame .return-btn").attr("style");
                        $("#mainFrame").html(data);
                        $("#mainFrame .return-btn").attr("style",style);
                        $(".searchByTemp").find("button").children("span[prompt=prompt]").text(selectName);

                        $target.unlock();
                    }
                });
            }
        },
        deleteItem: function (e, option) {
            var _this = this;
            var $target = $(e.currentTarget);
            var selectVal = $target.attr("key");
            var _e = {currentTarget: $(".searchByTemp").find("button")};
            option.code = $target.attr("code");
            if (selectVal && selectVal != '') {
                window.top.topPage.showConfirmMessage(window.top.message.common_auto["确认删除模板吗"], function (confirm) {
                    if (confirm) {
                        window.top.topPage.ajax({
                            url: root + "/sysSearchTemplate/delete.html",
                            data: {"search.id": selectVal},
                            type: 'POST',
                            dataType: 'JSON',
                            success: function (data) {
                                if (data.state) {
                                    page.showPopover(_e, {}, "success", data.msg, true);
                                    _this.refreshTemp(e, option);
                                } else {
                                    page.showPopover(_e, {}, "danger", data.msg, true);
                                }
                                $(e.currentTarget).unlock();
                            },
                            error: function (data) {
                                $(e.currentTarget).unlock();
                            }
                        });
                    }
                });
            } else {
                page.showPopover(_e, {}, "danger", window.top.message.common_auto["没有选择模板"], true);
            }
            $(e.currentTarget).unlock();
        },

        saveItem: function (e, option) {
            var _this = this;
            var $form = $(window.top.topPage.getCurrentForm(e));
            if (!$form.valid || $form.valid()) {
                BootstrapDialog.show({
                    title: window.top.message.common_auto["模板名称"],
                    message: "<div class='form-group clearfix line-hi34 m-b-sm m-t-md'><label class='col-xs-3 al-right'>" + window.top.message.common_auto["名称"] + "</label>" +
                    "<div class='col-xs-8'><input type='text' name='search.name'/></div></div>",
                    buttons: [{
                        label: window.top.message.common_auto["保存"],
                        cssClass: '',
                        action: function (dialog) {
                            var tempName = $("input[name='search.name']").val();
                            if (tempName && (tempName.length > 0 && tempName.length <= 30)) {
                                var param = $("input[name*='search.']").serialize();
                                var code = option.code;
                                window.top.topPage.ajax({
                                    url: root + "/sysSearchTemplate/saveTemp.html",
                                    data: {
                                        "result.name": tempName,
                                        "result.content": JSON.stringify(param),
                                        "result.code": code
                                    },
                                    dataType: 'json',
                                    type: 'POST',
                                    success: function (data) {
                                        if (data.state) {
                                            page.showPopover(e, {}, "success", data.msg, true);
                                            _this.refreshTemp(e, option);
                                        } else {
                                            page.showPopover(e, {}, "danger", data.msg, true);
                                        }
                                        $(this).unlock();
                                    }
                                });
                                dialog.close();
                            } else {
                                e.currentTarget = $(this);
                                page.showPopover(e, {}, "danger", window.top.message.common['pleaseEntry'], true);
                            }

                        }
                    }, {
                        label: window.top.message.common['cancel'],
                        action: function (dialog) {
                            dialog.close();
                        }
                    }]
                });
            }
            /* else {
             page.showPopover(e, {}, "danger", "查询条件验证不通过", true);
             }*/
            $(e.currentTarget).unlock();
        },
        /**
         * 刷新模板
         * @param e
         * @param option
         */
        refreshTemp: function (e, option) {
            var code = option.code;
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/sysSearchTemplate/refreshTemp.html",
                data: {"search.code": code},
                dataType: "JSON",
                success: function (data) {
                    var $select = $(".searchByTemp");
                    var html = $("#searchTemplateOption").render({
                        templates: data
                    });
                    $select.html(html);
                }
            });
        }
    });
});