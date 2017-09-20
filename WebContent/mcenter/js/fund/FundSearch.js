/**
 * 查询模板条件
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        timeInterval:null,
        init: function () {
            this.formSelector = "form";
            this._super(this.formSelector);
        },

        onPageLoad: function () {
            this._super();
            //鼠标移上去显示
            $('[data-toggle="popover"]',this.formSelector).popover({
                trigger: 'hover',
                placement: 'top',
                html:true
            });
        },

        bindEvent: function () {
            var _this=this;
            this._super();
            this.refreshTimer();
            //如果是默认的才要去隐藏不需要的筛选框

            if(!$(".show-demand-b").hasClass("open")){
                $(".searchType").removeClass("hide");
                $(".searchType").find("input").attr("disabled",false);

                $(".seniorSearch,.senior").addClass("hide");
                $(".seniorSearch,.senior").find("input").attr("disabled",true);
            }

            $(this.formSelector).on("click",".show-demand-b", function () {
                if($(this).hasClass("open")){
                    $(".searchType").addClass("hide");
                    $(".searchType").find("input").attr("disabled",true);

                    $(".seniorSearch,.senior").removeClass("hide");
                    $(".seniorSearch,.senior").find("input").attr("disabled",false);
                }else{
                    $(".searchType").removeClass("hide");
                    $(".searchType").find("input").attr("disabled",false);

                    $(".seniorSearch,.senior").addClass("hide");
                    $(".seniorSearch,.senior").find("input").attr("disabled",true);
                }
            });
            //设置几秒刷新
            $(_this.formSelector).on("click","#timer ul a", function () {
                var totalMillisecond = $(this).attr('data-value');
                $("#timer .hd").attr("data-value",totalMillisecond);
                $("#timer .hd").attr("totalMillisecond",totalMillisecond);
                window.clearInterval(_this.timeInterval);
                _this.refreshTimer();
            });
            //点击搜索之后,重置倒计时
            $(_this.formSelector).on("click",".fa-search,.search_btn", function () {
                $("#timer .hd").attr("totalMillisecond",-1);
            });

            //点击倒计时按钮刷新
            $(_this.formSelector).on("click","#refreshQuery", function () {
                $('.fa-search').click().children();
            });
            //重置输入框的提示语
            $(_this.formSelector).on("click",".show-demand-b", function () {
                $(".defaultSelect .form-control").each(function () {
                    var val = $(this).val();
                    if(val == ''){
                        var placeholder = $(this).parent().parent().find("button span:first").text();
                        if($(this).attr('name') == 'search.username'){
                            $(this).attr("placeholder","多个账号，用半角逗号隔开");
                        }else{
                            $(this).attr("placeholder",placeholder);
                        }

                    }
                });
            });
            $(_this.formSelector).on("keyup","input", function () {
                var val = $(this).val();
                $(this).val(val.trim());
            });

            $('.time-tooltip [data-toggle="tooltip"]').tooltip();
            $(".show-demand-b").click(function(){
                $(this).toggleClass("open")
                $(".show-demand-a").toggle();
                $(".advanced-hide").toggle();
                $(".search_1").toggleClass("col-sm-12")
                $(".search_1").toggleClass("col-sm-3")
                $(".search_2").toggleClass("col-sm-12")
                $(".search_2").toggleClass("col-sm-9")
                $(".search_2").toggleClass("template-menu")
                $(".checkTime").toggleClass("col-md-7")
                $(".checkTime").toggleClass("col-md-4")
            });
            $(".type-search-btn").click(function(){
                $(this).toggleClass("open")
                $(this).parents(".input-group").next(".type-search").toggle()
            });
            var open = $("#open").text();
            if(open && !$("#openSearch").hasClass("open")){
                $("#openSearch").click();
            }

        },
        refreshTimer: function () {
            var _this = this;
            var totalMillisecond =  $("#timer .hd").attr("totalMillisecond");
            if(totalMillisecond == undefined || totalMillisecond.length == 0){
                //不刷新
                $("#timer .hd").text(window.top.message.fund_auto['不刷新']);
                $("#timer .fa-refresh").removeClass('fa-spin');

            }else if(totalMillisecond == 'refresh') {
                $("#timer .hd").text(window.top.message.fund_auto['自动']);
                $("#timer .fa-refresh").addClass('fa-spin');
            }
            else if(totalMillisecond == '-1'){
                _this.refershHtml();
                $("#timer .hd").attr("totalMillisecond",$("#timer .hd").attr("data-value"));
                _this.refreshTimer();
            }else{
                $("#timer .fa-refresh").addClass('fa-spin');
                $("#timer .hd").text(totalMillisecond+window.top.message.fund_auto['秒']);
                $("#timer .hd").attr("totalMillisecond",totalMillisecond -= 1);
                _this.timeInterval = window.setTimeout(function() {
                    _this.refreshTimer();
                }, 1000);
            }
        },
        /**
         * 公共跳转资金记录方法
         */
        refershHtml: function() {
            var _this = this;
            window.top.topPage.ajax({
                //loading: true,
                url: $(_this.formSelector).attr("action"),
                type:'POST',
                data: $(_this.formSelector).serialize(),
                dataType: "html",
                headers: {
                    "Soul-Requested-With":"XMLHttpRequest"
                },
                success: function (data) {
                    $(".search-list-container").html(data);
                    $("#totalSumTarget").text($("#totalSumSource").text());
                    $("#todayTotal").text($("#todayTotalSource").text());
                    _this.onPageLoad();
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        }
    });
});