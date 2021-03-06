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
            $("table#checkTable input[type='checkbox']", _this.formSelector).change(function (e) {
                var  status = true;
                $("table#checkTable input[type='checkbox']", this.formSelector).each(function () {
                    if (!$(this).prop("checked")) {
                        status = false;
                        return false;
                    }
                })
                if (status) {
                    content = "<b style='color:#964e4e;'>".concat(window.top.message.report_auto['全部']).concat("</b>");
                }else {
                    var content = '';
                    var gpcstaus = true;
                    var gpccontent = '';
                    $("#highlottery input[type='checkbox']", this.formSelector).each(function () {
                        if (!$(this).prop("checked")) {
                            gpcstaus = false;
                        }else {
                        gpccontent  += $(this).parent().text()+"、";
                        }
                    })
                    if (gpcstaus){
                        gpccontent = "<b style='color:#964e4e;'>高频彩</b>、";
                    }
                    var dpcstaus = true;
                    var dpccontent = '';
                    $("#lowlottery input[type='checkbox']", this.formSelector).each(function () {
                        if (!$(this).prop("checked")) {
                            dpcstaus = false;
                        }else {
                        dpccontent  += $(this).parent().text()+"、";
                        }
                    })
                    if (dpcstaus){
                        dpccontent = "<b style='color:#964e4e;'>低频彩</b>、";
                    }
                    content = gpccontent + dpccontent;
                    if (content.trim() == "") {
                        content = '未选择彩种';
                    } else {
                        content = content.substr(0, content.length - 1);
                    }
                }
                $(".codeDisplay").html(content);
            })
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
            $(".type-search input[type='checkbox']").prop("checked", true).change();
            this.selCheckLength()
            $(e.currentTarget).unlock();
        },
        clearCheck: function (e, option) {
            $(".type-search input[type='checkbox']").prop("checked", false).change();
            this.selCheckLength()
            $(e.currentTarget).unlock();
        },
        highCheck: function (e, option) {
            $("#highlottery input[type='checkbox']").prop("checked", true).change();
            this.selCheckLength()
            $(e.currentTarget).unlock();
        },
        lowCheck: function (e, option) {
            $("#lowlottery input[type='checkbox']").prop("checked", true).change();
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
            this.queryStatMoney();
        },
        queryStatMoney:function () {
            var _this = this;
            //getCurrentFormData
            var formData = this.getCurrentFormData({"currentTarget":$(".search_btn")});
            window.top.topPage.ajax({
                url: root + "/LotteryBetOrderReport/queryStatMoney.html?t=" + new Date().getTime(),
                dataType: 'json',
                data:formData,
                success: function (data) {
                    $("#betCount").text(isNaN(data.betvolume)?0:data.betvolume);
                    $("#betAmount").text((data.betamount).toFixed(2));
                    $("#payoutAmount").text((data.payoutamount).toFixed(2));
                    $("#profitLoss").text((-data.profitloss).toFixed(2));
                    $("#rabateAmount").text((data.rabateamount).toFixed(2));
                },
                error: function (data) {

                }
            })
        },
        getMoneyFormat : function (amount) {
            if (amount == 0){
                amount = "0.00" ;
            }else {
                amount= (amount).toFixed(3);
                amount = amount.substring(0,amount.lastIndexOf('.')+3);
            }
            return amount;
        }
    });
});