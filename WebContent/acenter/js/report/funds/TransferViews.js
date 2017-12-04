/**
 * Created by catban on 15-12-30.
 */
/**
 * 返水明细-添加选择
 */

define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', window.top.message.report_auto['复制成功'], true);
            });
        },
        queryGameOrder: function (event,option) {
            var username = $("input[name='search.username']").val();

            window.top.topPage.ajax({
                url: root + "/report/fundsLog/list.html?search.username="+username,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                type: "post",
                data: this.getCurrentFormData(event),
                success: function (data) {
                    $("#mainFrame").html(data);
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                    $(event.currentTarget).unlock();
                }
            });
        }


    });
});
