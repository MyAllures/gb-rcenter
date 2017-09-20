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
            });
            $(this.formSelector).on("click", ".type-search", function (event) {
                event.stopPropagation();
            });
            $("#comitSearch").click(function (e,opt) {
                var siteId=$("#search_id").val();
                if(!siteId){
                    page.showPopover(e,opt,"danger","站点ID不能为空",true);
                    return;
                }
                $.ajax({
                    url:root+"/LotteryBetOrderReport/getbetYear.html?siteSearchID="+siteId,
                    type: "get",
                    success:function(data){
                        if (data != null){
                            var years = eval(data);
                            $("#searchDiv").css('display','block');
                            $("#tishiDiv").css('display','block');
                            $('#betrecord').css('display','block');

                            $("#sitesearchid").val(siteId);
                            var lis ="";
                            for (var i=0;i<years.length;i++){
                                $("#yearUl").append(" <li role='presentation'><a  role='menuitem' tabindex='-1' >"+years[i]+"</a></li>")
                            }
                        }
                    },
                })
            });
        },
        changeTime: function (e, option) {
            $(".type-search").hide();
            var data = option.data;
            $("#searchDate").val(data);
            $("#searchDiv button").removeClass("active");
            $(e.currentTarget).addClass("active");
            $(e.currentTarget).unlock();
        },
        allCheck: function (e, option) {
            $(".type-search input[type='checkbox']").prop("checked", true);
            $("#typesearchdiv button").removeClass("active");
            $(e.currentTarget).blur();
            $(e.currentTarget).unlock();
        },
        clearCheck: function (e, option) {
            $(".type-search input[type='checkbox']").prop("checked", false);
            $(e.currentTarget).blur();
            $(e.currentTarget).unlock();
        },
        highCheck: function (e, option) {
            $("#highlottery input[type='checkbox']").prop("checked", true);
            $(e.currentTarget).blur();
            $(e.currentTarget).unlock();
        },
        lowCheck: function (e, option) {
            $("#lowlottery input[type='checkbox']").prop("checked", true);
            $(e.currentTarget).blur();
            $(e.currentTarget).unlock();
        },
        query: function (e, option) {
            $(".type-search").hide();
            var yearSpan = $("#searchYearSpan").text();
            if (yearSpan != 'undefined' && yearSpan != '') {
                var yearInput = $("#searchYear");
                if (yearSpan != '请选择') {
                    yearInput.val(yearSpan.replace(".0", ""));
                } else {
                    yearInput.val("");
                }
            }
            var monthSpan = $("#searchMonthSpan").text();
            if (monthSpan != 'undefined' && monthSpan != '' && monthSpan != '请选择') {
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

        }
    });
});