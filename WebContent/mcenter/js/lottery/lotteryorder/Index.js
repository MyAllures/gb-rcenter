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
        },
        onPageLoad: function () {
            this._super();
            var e = {currentTarget:$(".ssc-label").eq(0)};
            var opt = eval('(' + $('.ssc-label').attr('data-rel') + ')');
            this.queryStatMoney();
        },

        queryByLottery:function (e, opt) {
            var type = opt.type;
            if(type){
                $(".ssc-label").removeClass("ssc-active")
                $("#lotteryType").val(type);
                this.query(e,opt);
                $(e.currentTarget).addClass("ssc-active");
            }else{

            }
            $(e.currentTarget).unlock();
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