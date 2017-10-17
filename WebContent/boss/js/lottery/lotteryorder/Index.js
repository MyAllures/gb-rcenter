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
            this.formSelector = "form[name=betorderform]";
            this._super(this.formSelector);

        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click", "#lotteryDiv li", function (e) {
                $("#lotteryDiv li").removeClass("active");
                $(this).addClass("active");
                var datacode = $(this).attr("data-code");
                var code = $(this).attr("code");
                $("#searchDiv a").addClass("hide");
                $("#searchDiv a[data-rel*='"+datacode+"']").removeClass("hide");
                $("#searchDiv a").removeClass("ssc-active");
                $("#searchDiv a[data-rel*='"+code+"']").addClass("ssc-active");
                $("#lotteryCode").val(code);
            });
        },
        onPageLoad: function () {
            this._super();
            /*var e = {currentTarget:$(".ssc-label").eq(0)};
            var opt = eval('(' + $('.ssc-label').attr('data-rel') + ')');
            if(!$(".ssc-label").hasClass('ssc-active')){
                this.queryByLottery(e,opt);
            }*/
            if($("#search_id").val()!=""){
                this.queryStatMoney();
            }
            $('[data-toggle="popover"]',this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },

        queryByLottery:function (e, opt) {
            if(!this.checkSiteId(e,opt)){
                return false;
            }
            var code = opt.code;
            if(code){
                $(".ssc-label").removeClass("ssc-active")
                $("#lotteryCode").val(code);
                this.query(e,opt);
                $(e.currentTarget).addClass("ssc-active");
            }else{

            }
            $(e.currentTarget).unlock();
        },

        checkSiteId:function (e, opt) {
            var siteId = $("#search_id").val();
            var code = opt.code;
            if(!siteId){
                if(!code){
                    opt.placement="left";
                }
                opt.callback=function () {
                    $("#search_id").focus();
                }
                page.showPopover(e,opt,"danger","站点ID不能为空",true);
                return false;
            }
            return true;
        },
        queryStatMoney:function () {
            //getCurrentFormData
            var formData = this.getCurrentFormData({"currentTarget":$(".btn-search-css")});
            window.top.topPage.ajax({
                url: root + "/lotteryBetOrder/queryStatMoney.html?t=" + new Date().getTime(),
                dataType: 'json',
                data:formData,
                success: function (data) {
                    $("#betAmount").text(data.betAmount);
                    $("#payoutAmount").text(data.payoutAmount);
                    $("#profitLoss").text(data.profitLoss);

                },
                error: function (data) {

                }
            })
        }
    });
});