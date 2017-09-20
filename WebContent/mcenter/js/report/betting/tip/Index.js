/**
 * 小费列表
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({

        init: function () {
            this.formSelector = "form[name='tipForm']";
            this._super(this.formSelector);
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            $(this.formSelector).on("click", "input[name='search.apiIds']", function (e) {
                _this.chooseApi(e);
            });
            $(this.formSelector).on("click", function (e) {
                _this.hideApi();
            });
            $(this.formSelector).on("click", "#chooseApi", function (e) {
                _this.preventEvent(e);
            })
        },
        preventEvent: function (e) {
            //阻止事件冒泡
            if (e.stopPropagation)
                e.stopPropagation();
            else
                e.cancelBubble = true;
        },
        onPageLoad: function () {
            this._super();
            this.staticData();
        },
        /**
         * 统计
         */
        staticData: function () {
            var html = "";
            window.top.topPage.ajax({
                url: root + "/report/betting/vPlayerGameTipOrder/statisticalData.html",
                data: $(this.formSelector).serialize(),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $("#tipSum").text(data.sumTip);
                }
            })
        },
        /**
         * 重写query方法
         * @param e
         * @param option
         */
        query: function (e, option) {
            var beginTime = $("input[name='search.beginTime']").val();
            var endTime = $("input[name='search.endTime']").val();
            var $form = $(window.top.topPage.getCurrentForm(e));
            //this.hideApi();
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading: true,
                    url: window.top.topPage.getCurrentFormAction(e),
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: this.getCurrentFormData(e),
                    success: function (data) {
                        var $result = $(".search-list-container", $form);
                        $result.html(data);
                        e.page.onPageLoad();
                        $(e.currentTarget).unlock()
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(e.currentTarget).unlock();
                    }
                });
            }

        },
        /**
         * 隐藏游戏类型浮层
         */
        hideApi: function () {
            $("#chooseApi").find("button.open").removeClass("open");
            $("#chooseApi").find(".type-search").hide();
        },
        /**
         * 选择所有api
         * @param e
         * @param option
         */
        checkAllApi: function (e, option) {
            this.apiInit(e, true);
        },
        /**
         * 清除api
         * @param e
         * @param option
         */
        clearAllApi: function (e, option) {
            this.apiInit(e, false);
        },
        /**
         * 初始化游戏类型
         * @param e
         * @param obj
         */
        apiInit: function (e, obj) {
            $("#chooseApi .chooseApiTable").find("input[type=checkbox]").prop("checked", obj);
            $("#apiName").text(window.top.message.report['operate.list.all']);
            if (obj) {
                $("#chooseApi").children("div.input-group").find("span[prompt=prompt]").text(window.top.message.report_auto['已选全部']);
            } else {
                $("#chooseApi").children("div.input-group").find("span[prompt=prompt]").text(window.top.message.report_auto['请选择']);
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 确定选择api
         */
        chooseApi: function (e, option) {
            var len = 0;
            var html = '';
            $(".chooseApiTable").find("input[type=checkbox]:checked").each(function () {
                html = html + '[' + $(this).next("span").text() + ']';
                len++;
            });
            if (len > 0) {
                $("#chooseApi span[prompt=prompt]").text(window.top.message.report_auto['已选中'] + len + window.top.message.report_auto['项']);
                $("#apiName").text(html);
            } else {
                $("#chooseApi span[prompt=prompt]").text(window.top.message.report_auto['请选择']);
                $("#apiName").text(window.top.message.report['operate.list.all']);
            }
        },
        /**
         *选择游戏类型
         */
        openApi: function (e, option) {
            var $target = $(e.currentTarget);
            $target.toggleClass("open");
            $(".type-search").toggle();
            $target.unlock();
        },
        /**
         * 重置
         * @param e
         */
        /**resetCondition: function (e) {
            $("input[name='search.beginTime']").val("");
            $("input[name='search.endTime']").val("");


            this.apiInit(e, false);
        }*/

        /**
         *跳转其他分类的api
         * @param e
         * @param option
         */
        linkType: function (e, option) {
            var text = $("input[name='search.username']").val();
            var url = option.url;
            if (url) {
                if (text) {
                    url = url + "&search.username=" + text;
                }
                $("#mainFrame").load(root + url);
            }
        }
    });
});