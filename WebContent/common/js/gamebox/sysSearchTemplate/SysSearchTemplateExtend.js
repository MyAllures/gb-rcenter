/**
 * 查询模板条件
 */
define(['gb/sysSearchTemplate/SysSearchTemplate','common/BasePage'], function (SysSearchTemplate,BasePage) {

    return SysSearchTemplate.extend({

        init: function () {
            this.formSelector = "div[name=searchTemplate]";
            this._super(this.formSelector);
        },
        searchByTemp: function (e, option) {
            var _this= this;
            var $target = $(e.currentTarget);
            var selectVal = $target.attr("key");
            if (selectVal && selectVal != '') {
                var data = $target.parents().find("#content_" + selectVal).text();
                var selectName = $target.text();
                window.top.topPage.ajax({
                    loading: true,
                    url: _this.getFirstFromAction(e),
                    type: "post",
                    data: JSON.parse(data),
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

        getFirstFromAction: function (e, tag) {
            var $form = e.currentTarget;
            while ($form && $form.tagName && $form.tagName.toLowerCase() != tag) {
                if ($form.parentElement) {
                    $form = $form.parentElement;
                } else {
                    break;
                }
            }
            return $("form:first",$form).attr("action");
        }
    });
});