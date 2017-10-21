/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $(this.formSelector).on("click", ".type-search-btn", function (event) {
                $(this).toggleClass("open");
                $(".type-search").toggle();
                event.stopPropagation();
            });

            $(this.formSelector).on("click", function () {
                $(".type-search").hide();
                _this.selCheckLength();
            });
            $(this.formSelector).on("click", ".type-search", function (event) {
                event.stopPropagation();
            });
        },
        changeTime: function (e, option) {
            $(".type-search").hide();
            var data = option.data;
            $("#searchDate").val(data);
            this.selCheckLength();
            $("#searchDiv button").removeClass("active");
            $(e.currentTarget).addClass("active");
            $(e.currentTarget).unlock();
        },
        selCheckLength: function () {
            var length = $("#checkTable input:checked", this.formSelector).length;
            if (length == 0) {
                $('.tranTypeNum').text(window.top.message.report_auto['请选择']);
            } else {
                $('.tranTypeNum').text(window.top.message.report_auto['已选'] + length + window.top.message.report_auto['项']);
            }
        },
        allCheck: function (e, option) {
            $(".type-search input[type='checkbox']").prop("checked", true);
            this.selCheckLength()
            $(e.currentTarget).unlock();
        },
        clearCheck: function (e, option) {
            $(".type-search input[type='checkbox']").prop("checked", false);
            this.selCheckLength()
            $(e.currentTarget).unlock();
        },
        highCheck: function (e, option) {
            $("#highlottery input[type='checkbox']").prop("checked", true);
            this.selCheckLength()
            $(e.currentTarget).unlock();
        },
        lowCheck: function (e, option) {
            $("#lowlottery input[type='checkbox']").prop("checked", true);
            this.selCheckLength()
            $(e.currentTarget).unlock();
        },
        query: function (e, option) {
            this.selCheckLength();
            $(".type-search").hide();
            var yearSpan = $("#searchYearSpan").text();
            if (yearSpan != 'undefined' && yearSpan != '') {
                var yearInput = $("#searchYear");
                if (yearSpan != '请选择') {
                    yearInput.val(yearSpan.replace(".0", ""));
                } else {
                    yearInput.val("");
                    page.showPopover(e,option,"danger","请选择要查询的年份",true);
                    return;
                }
            }
            var monthSpan = $("#searchMonthSpan").text();
            if (monthSpan != 'undefined' && monthSpan != '') {
                var monthInput = $("#searchMonth");
                if (monthSpan != '请选择') {
                    monthInput.val(monthSpan);
                } else {
                    monthInput.val("");
                }
            }


            this._super(e, option);
        },
        onPageLoad: function () {
            this._super();
            // this.queryStatMoney();
        },
        queryStatMoney:function () {
            //getCurrentFormData
            var formData = this.getCurrentFormData({"currentTarget":$(".search_btn")});
            window.top.topPage.ajax({
                url: root + "/LotteryBetOrderReport/queryStatMoney.html?t=" + new Date().getTime(),
                dataType: 'json',
                data:formData,
                success: function (data) {
                    $("#betAmount").text(data.betAmount);
                    $("#payoutAmount").text(data.payoutAmount);
                    $("#profitLoss").text(data.profitLoss);
                    $("#rabateAmount").text(data.rabateAmount);
                },
                error: function (data) {

                }
            })
        }
    });
});