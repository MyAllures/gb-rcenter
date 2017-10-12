/**
 * Created by bruce on 16-7-11.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
            var _this=this;
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', window.top.message.report_auto['复制成功'], true);
            });
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },

        bindEvent: function () {
            this._super();

        },

        /**
         * 回调：审核通过后回调到充值记录列表页面
         */
        back: function (e, option) {
            if (e.returnValue) {
                var style = $("#mainFrame .return-btn").attr("style");
                $("#mainFrame").load(root + "/fund/deposit/online/list.html", function () {
                    $("#mainFrame .return-btn").attr("style",style);
                });
            }
        },

        /**
         * 编辑备注
         * @param e
         * @param option
         */
        editRemark: function (e, option) {
            $("#editRemark").show();
            $("[name='result.checkRemark']").removeAttr("readonly");
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
            var checkRemark = $("input[name=checkRemark]").val();
            $("textarea[name='result.checkRemark']").val(checkRemark);
            $("textarea[name='result.checkRemark']").attr("readonly", true);
            $(e.currentTarget).unlock();
        },
        /**
         * 保存备注回调
         * @param e
         * @param option
         */
        afterUpdateRemark: function (e, option) {
            if(option.data.state==true) {
                var checkRemark = $("textarea[name='result.checkRemark']").val();
                $("input[name=checkRemark]").val(checkRemark);
                $("textarea[name='result.checkRemark']").attr("readonly", true);
                $("#editRemark").hide();
                $("#editRemark").prev("a").show();
            }
        },
        /**
         * 审核通过
         * @param e
         * @param option
         */
        confirmCheckPass: function (e, option) {
            var remarkContent = $("textarea[name='result.checkRemark']").val();
            var id = option.data;
            var btnOption = {};
            btnOption.target = root + "/fund/deposit/check/checkSuccessPop.html?search.id=" + id;
            btnOption.callback = "goToLastPage";
            btnOption.text = option.text;
            btnOption.data = id;
            btnOption.refresh = true;
            window.top.topPage.remarkContent = remarkContent;
            window.top.topPage.doDialog(e, btnOption);
        },
        /**
         * 审核失败
         * @param e
         * @param option
         */
        checkFailure: function (e, option) {
            var id = option.data;
            var remarkContent = $("textarea[name='result.checkRemark']").val();
            window.top.topPage.remarkContent = remarkContent;
            var btnOption = {};
            btnOption.target = root + "/fund/deposit/check/checkFailurePop.html?search.id=" + id;
            btnOption.callback = "goToLastPage";
            btnOption.text = option.text;
            btnOption.data = id;
            btnOption.refresh = true;
            window.top.topPage.doDialog(e, btnOption);
        }
    });
});