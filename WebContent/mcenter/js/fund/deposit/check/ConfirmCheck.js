/**
 * 资金管理-充值审核
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
            this.resizeDialog();
            $("input[name='search.checkRemark']").val(window.top.topPage.remarkContent);
            $(".btn-deposit-result-btn").focus();
        },
        /**
         * 选择失败标题原因，相应失败内容在textarea里显示
         * @param e
         */
        reasonTitleChange: function (e) {
            $("textarea[name='search.failureTitle']").val(select.getSelected("[name='failureTitle']").attr("holder"));
            $("input[name='groupCode']").val(select.getSelected("[name='failureTitle']").attr("groupCode"));
            page.reasonPreviewMore.viewFailureDetail(e);
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function () {
            this._super();
            ZeroClipboard.destroy();
            $(".global-zeroclipboard-container").remove();
            new ZeroClipboard($('a[name="copy"]'));
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

            //添加备注或者取消备注
            $(".addNotes a").click(function () {
                $(this).parent(".addNotes").hide();
                $(".delNotes").children('textarea').val('');
                $(".delNotes").show();
                page.resizeDialog();
            });
            $(".delNotes a").click(function () {
                $(this).parent(".delNotes").hide();
                $(".addNotes").show();
                page.resizeDialog();
            });
            $(document).keydown(function (event) {
                if(event.keyCode==32){
                    $(".btn-deposit-result-btn").click();
                }
            });
        },
        /**
         * 跳转至确认审核通过
         *
         * @param e
         */
        confirmCheckPass: function (e, option) {
            var remarkContent = $('textarea[name=remarkContent]').val();
            var id = $('input[name=id]').val();
            var btnOption = {};
            btnOption.target = root + "/fund/deposit/check/checkSuccessPop.html?search.id=" + id + "&remarkContent=" + remarkContent;
            btnOption.callback = "back";
            btnOption.text = option.text;
            window.top.topPage.remarkContent = remarkContent;
            window.top.topPage.doDialog(e, btnOption);
        },
        /**
         * 跳转至审核失败
         *
         * @param e
         */
        checkFailure: function (e, option) {
            var id = $('input[name=id]').val();
            var remarkContent = $('textarea[name=remarkContent]').val();
            window.top.topPage.remarkContent = remarkContent;
            var btnOption = {};
            btnOption.target = root + "/fund/deposit/check/checkFailurePop.html.html?search.id=" + id + "&remarkContent=" + remarkContent;
            btnOption.callback = "back";
            btnOption.text = option.text;
            window.top.topPage.doDialog(e, btnOption);
        },
        /**
         * 回调：审核通过后回调到充值记录列表页面
         */
        back: function (e, option) {
            if (window.top.page.status) {
                $('a[name=return]').click();
                window.top.page.status = false;
                window.top.topPage.remarkContent = null;
            }
        },
        saveCallbak: function (e, option) {
            window.top.page.status = option.data.state;
            if(option.data.state){
                $("span[id=unReadTaskCount]").text(parseInt($("span[id=unReadTaskCount]").text())-1);
            }
            this._super();
        }
    });
});