/**
 * 资金管理-公司入款-存款审核
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
            this._super(this.formSelector);
            var _this=this;
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            this.copyText('[name="copy"]');
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
            btnOption.type = 'type-warning';
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
            btnOption.type = 'type-warning';
            btnOption.refresh = true;
            window.top.topPage.doDialog(e, btnOption);
        },
        /**
         * 下一条
         * @param e
         * @param option
         */
        next: function (e, option) {
            var id = option.data;
            window.top.topPage.ajax({
                url: root + "/fund/deposit/company/nextCheck.html?search.id=" + id,
                dataType: 'json',
                success: function (data) {
                    var state = data.state;
                    if (state == true) {
                        $("#mainFrame").load(root + "/fund/deposit/company/check.html?search.id=" + data.id);
                    } else {
                        e.page.showPopover(e, option, 'warning', "没有下一条了！", true);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        back: function (e, option) {
            //如果审核结束返回列表
            if (e.returnValue) {
                $("#mainFrame").load(root + "/fund/deposit/company/list.html");
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
            //$("textarea[name='result.checkRemark']").attr("readonly", true);
            $(e.currentTarget).unlock();
        },
        afterUpdateRemark: function (e, option) {
            if(option.data.state==true) {
                var checkRemark = $("textarea[name='result.checkRemark']").val();
                $("input[name=checkRemark]").val(checkRemark);
                //$("textarea[name='result.checkRemark']").attr("readonly", true);
                $("#editRemark").hide();
                $("#editRemark").prev("a").show();
            }
        }
    });
});