define(['site/common/BasePage'], function (BasePage) {
    return BasePage.extend({
        init: function () {
            this._super();
            this.bindButtonEvents();
            this.onPageLoad();
        },
        bindButtonEvents: function () {
            var _this = this;
            $(".lot-fre-type").on("click", "a", function () {
                var type = $(this).attr("data-type");
                _this.queryLotteryByFrequency(type);
                $(".lot-fre-type.acti").removeClass("acti");
                $(this).parent(".lot-fre-type").addClass("acti");
            });
            $("#subContent").on("click", ".lottery-code-span a", function () {
                var type = $(this).attr("data-type");
                var code = $(this).attr("data-code");
                _this.loadLotteryResult(type, code);
            });
            this.bindLotteryIndex();
        },bindLotteryIndex:function () {
            var _this = this;
            $("#search-list-container").on("click","a.a1",function(){
                var url = $(this).data("page");
                _this.getPage(url);
            });
        },getPage: function (url) {
            parent.index.getPage(url);
        },
        onPageLoad: function () {
            $('div.loader', parent.document).remove();
        },
        queryLotteryByFrequency: function (fid) {
            var _this = this;
            var url = root + '/lotteryResultHistory/queryLotteryByFrequency.html';
            if (fid) {
                url = url + "?search.lotteryFrequencyId=" + fid;
            }
            if (fid != "search") {
                $.ajax({
                    type: "post",
                    url: url,
                    timeout: 60000,
                    success: function (data) {
                        $("#subContent").html(data);
                        _this.bindLotteryIndex();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    },
                    beforeSend: function () {
                        _this.showLoading();
                    },
                    complete: function () {
                        $('div.loader').remove();
                    }
                });
            }
        },
        loadLotteryResult: function (type, code) {
            var _this = this;
            $.ajax({
                type: "post",
                url: root + '/lotteryResultHistory/queryLotteryResultByCode.html?search.code=' + code + "&search.type=" + type,
                timeout: 60000,
                success: function (data) {
                    $("#search-list-container").html(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
                beforeSend: function () {
                    _this.showLoading();
                },
                complete: function () {
                    $('div.loader').remove();
                    $("[name='search.code']").val(code);
                    $("[name='search.type']").val(type);
                    $(".lottery-code-span").removeClass("acti");
                    $("#lottery_code_" + code).addClass("acti");
                }
            });
        }
    })
});