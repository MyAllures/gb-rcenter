/**
 * Created by fei on 17-4-10.
 */
define(['site/common/PagingQuery'], function (PagingQuery) {
    return PagingQuery.extend({
        init: function () {
            this._super();
            this.fetchProfit();
            $("div.loader", parent.document).remove();
        },
        bindButtonEvents: function () {
            var _this = this;
            this._super();
            $("input#starttime").on("click", function () {
                laydate({'istime': true, 'format': 'YYYY-MM-DD hh:mm:ss'});
            });
            $("input#endtime").on("click", function () {
                laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})
            });
            $("select[name='search.code']").on("change", function () {
                _this.gotoPage(1, $(this));
            });
            $("select[name='search.status']").on("change", function () {
                _this.gotoPage(1, $(this));
            });
            $("select[name='search.transactionType']").on("change", function () {
                _this.gotoPage(1, $(this));
            });
            //查询资金记录
            $("a#queryFund").click(function () {
                _this.query($(this));
            });
            $(".button_4").click(function () {
                searchday($(this).attr("data-searchid"));
            });
            //查询投注记录
            $("#queryBetOrder").click(function () {
                _this.query($(this));
            });
        },
        afterQuery:function(){
            this._super();
            this.fetchProfit();
        },
        fetchProfit: function () {
            var data = $("#lottery-bet-order-form").serialize();
            $.ajax({
                type: "post",
                url: root + '/lotteryBetOrder/fetchProfit.html',
                data: data,
                dataType: 'json',
                success: function (data) {
                    $("#totalMoney").text((data.betamount).toFixed(2));
                    $("#totalWinOrLoseMoney").text((data.profitloss).toFixed(2));
                    $("#totalRebateAmount").text((data.betrebate).toFixed(2));
                }
            });
        }

    })
});

