define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        pagination: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super("#queryForm");
            this.formSelector = "form";
            _this = this;
            $('.search-list-container').load(root + "/payAccount/warningSettings/logs/2.html", function () {
                _this.onPageLoad();
            });
        },
        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
        },
        bindEvent: function () {
            //修改文本框值时验证
            $("form#editForm").on("blur", "#orangeAlert", (function (e) {
                if ($(this).valid()) {
                    var val = $(this).val();
                    if (val) {
                        val = parseInt(val);
                        var redAlert = parseInt($("#redAlert").val());
                        $("#redMinSpan").text(">"+val + "%");
                    } else {
                        $("#redMinSpan").text(">"+1 + "%");
                    }
                }
            }));
            this.popoverTip();
        },
        popoverTip: function () {
            $('form#editForm [data-toggle="popover"]').popover({
                trigger: 'hover',
                html: true
            });
        },
        /**
         * 绑定表单验证规则
         * @private
         */
        bindFormValidation: function () {
            var $form = $(this.formSelector);
            var rule = this.getValidateRule($form);
            if (rule) {
                if ($.data($form[0], "validator")) {
                    $.data($form[0], "validator", null);
                }
                $form.validate(rule);
            }
        },
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e)) || $(this.formSelector);
            return !$form.valid || $form.valid();
        },
        /**
         * 修改层级不足个数
         * @param e
         * @param option
         */
        editWarningCount: function (e, option) {
            //修改不足个数
            if ($("input[name='inadequateCount.paramValue']").is(":hidden")) {
                $(e.currentTarget).text(window.top.message.content_auto['取消']);
                $("input[name='inadequateCount.paramValue']").css("display", "inline-block");
            } else {
                $(e.currentTarget).text(window.top.message.content_auto['修改']);
                $("input[name='inadequateCount.paramValue']").val($("#warningCountSpan").text());
                $("input[name='inadequateCount.paramValue']").hide();
            }
            $("#warningCountSpan").toggle();
            $(e.currentTarget).unlock();
        },
        /**
         * 修改清零账号天数
         * @param e
         * @param option
         */
        editResetDays: function (e, option) {
            //修改清零账户天数
            if ($("input[name='resetDay.paramValue']").is(":hidden")) {
                $(e.currentTarget).text(window.top.message.content_auto['取消']);
                $("input[name='resetDay.paramValue']").css("display", "inline-block");
            } else {
                $(e.currentTarget).text(window.top.message.content_auto['修改']);
                $("input[name='resetDay.paramValue']").val($("#resetDaySpan").text());
                $("input[name='resetDay.paramValue']").hide();
            }
            $("#resetDayInputTip").toggle();
            $("#resetDaySpan").toggle();
            $(e.currentTarget).unlock();
        },
        saveWarningSettingBack: function (e, option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/payAccount/warningSettings/2.html",
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                loading: true,
                success: function (data) {
                    $("form#editForm").html(data);
                    _this.popoverTip();
                }
            })
        }
    });
});