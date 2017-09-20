//模板页面
define(['common/BaseListPage'], function (BaseListPage) {
    var _this = this;
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "#mainFrame form";
            var isCondition = $("input[name='search.searchCondition']").val();
            if (isCondition == "false") {
                this.noRecordMessage = window.top.message.player_auto['请输入查询条件'];
                $("._search").lock();
                $("._search").addClass("disabled");
                $("input[name='search.searchCondition']").val("true");
            }
            this._super("formSelector");
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var _this=this;
            var _selectGame = $("input[name='selectGameTypeText']").val();
            //单选框赋值
            var profitAmount = $("#profitAmount").val();
            $("input[name='search.profitAmount'][value='" + profitAmount + "']").attr("checked", "true");
            var orderState = $("#orderState").val();
            $("input[name='search.orderState'][value='" + orderState + "']").attr("checked", "true");
            if (_selectGame != '') {
                $("#selectGame").text(_selectGame);
            }
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /**
         * 统计
         */
        staticData: function (e,option) {
            var len = $("div.con-total").children().length;
            var $target = $(e.currentTarget);
            if(len>0) {
                $("div.con-total").slideToggle();
                $target.unlock();
            } else {
                var html = "";
                window.top.topPage.ajax({
                    url: root + "/report/gameTransaction/statisticalData.html",
                    data: $(this.formSelector).serialize(),
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        var html = $("#gameOrderRender").render({data: data});
                        $("div.con-total").html(html);
                         $("div.con-total").slideToggle();
                        $target.unlock();
                    }
                });
            }
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var val = $("[name='search.siteId']").attr("val");
            $("[name='search.siteId']").val(val);
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $(this.formSelector).on("change", "#single", function () {
                $("#singleVal").attr("name", $(this).val());
            });

            $(this.formSelector).on("click", ".btn-advanced-down", function () {
                $(".advanced-options").slideToggle("10");
                $(this).parent().toggleClass("show");
            });
            /**
             * 有标签页时调用
             */
            this.initShowTab();
            /**
             * 有详细展开时调用
             */
            this.initShowDetail();
            /**
             * 数据输入相关的文本框进行数字输入限制
             */
            this.validateNumber();
            $(this.formSelector).on("change", "[name='search.profitAmount'],[name='search.orderState']", function () {
                _this.TimeCallBack();
            });
            $(this.formSelector).on('input propertychange', function () {
                _this.TimeCallBack();
            });
        },
        apiVal: function (e, option) {
            var arr = e.returnValue;
            var gameTypes = [];
            var selectGame = "";
            var apiId;
            var selectedList = [];
            $.each(arr, function (arrIndex, arrVal) {
                $.each(arrVal, function (index, value) {
                    //当前行的apiId
                    apiId = arrVal.id;
                    //取选中的gametype
                    if (index == 'gameType') {
                        var apiGameTypeRelation = {};
                        $.each(value, function (i, v) {
                            gameTypes.push(v);
                            apiGameTypeRelation.apiId = apiId;
                        });
                        //当前行已选的gametype
                        apiGameTypeRelation.gameId = gameTypes;
                        selectedList.push(apiGameTypeRelation);
                        gameTypes = [];
                    }
                    //取选中的gamtype 名称
                    if (index == 'gameName') {
                        $.each(value, function (i, v) {
                            selectGame = selectGame + "[" + v + "]"
                        })
                    }
                });
            });

            var pageSelectGame = window.top.message.report['VPlayerGameOrder.allGame'];
            if (selectGame.length > 0) {
                pageSelectGame = selectGame;
                $("._search").unlock();
                $("._search").removeClass("disabled");
            }
            $("#selectGame").text(pageSelectGame);
            $("input[name='selectGameTypeText']").val(pageSelectGame);
            $("#gametypeList").val(JSON.stringify(selectedList));
        },
        TimeCallBack: function () {
            var username;
            typeof($("input[name='search.username']").val()) != 'undefined' ? username = $("input[name='search.username']").val() : username;
            typeof($("input[name='search.agentusername']").val()) != 'undefined' ? username = $("input[name='search.agentusername']").val() : username;
            typeof($("input[name='search.topagentusername']").val()) != 'undefined' ? username = $("input[name='search.topagentusername']").val() : username;


            var beginSingleAmount = $("input[name='search.beginSingleAmount']").val();
            var endSingleAmount = $("input[name='search.endSingleAmount']").val();
            var beginEffectiveTradeAmount = $("input[name='search.beginEffectiveTradeAmount']").val();
            var endEffectiveTradeAmount = $("input[name='search.endEffectiveTradeAmount']").val();
            var beginProfitAmount = $("input[name='search.beginProfitAmount']").val();
            var endProfitAmount = $("input[name='search.endProfitAmount']").val();
            var betId = $("input[name='search.betId']").val();

            var createStart = $("input[name='search.createStart']").val();
            var payoutStart = $("input[name='search.payoutStart']").val();
            //派彩结果
            var profitAmount = $("input[name='search.profitAmount']:checked").val();
            //状态
            var orderState = $("input[name='search.orderState']:checked").val();
            var gametypeList = $("#gametypeList").val();
            var labelCheck = profitAmount || orderState;
            var check1 = gametypeList.length > 0 || createStart.length > 0 || payoutStart.length > 0 || endSingleAmount.length > 0 || username.length > 0 || beginSingleAmount.length > 0 || beginEffectiveTradeAmount.length > 0 || endEffectiveTradeAmount.length > 0 || beginProfitAmount.length > 0 || endProfitAmount.length > 0 || betId.length > 0;
            var check2 = typeof(labelCheck) == "undefined" ? false : labelCheck.length > 0;
            if (check1 || check2) {
                $("._search").unlock();
                $("._search").removeClass("disabled");
            } else {
                $("._search").lock();
                $("._search").addClass("disabled");
            }
        },
        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');

        },
        toExportHistory: function (e, opt) {
            if (opt.data&&opt.data.state) {
                setTimeout(function () {
                    $(e.currentTarget).unlock();
                    $("#toExportHistory").click();
                },1000);
            } else {
                if (e.returnValue) {
                    $("#toExportHistory").click();
                }
            }

        },
        exportData: function (e, opt) {
            var data = $("#conditionJson").val();
            return data;
        },
        validateData: function (e, opt) {
            if ($("[name='paging.totalCount']").val() == 0) {
                window.top.topPage.showWarningMessage(window.top.message.player_auto['查询无数据']);
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        },
        validateNumber: function () {
            var _this = this;
            $("input[name='search.beginSingleAmount'],input[name='search.endSingleAmount'],input[name='search.beginEffectiveTradeAmount'],input[name='search.endEffectiveTradeAmount'],input[name='search.beginProfitAmount'],input[name='search.endProfitAmount']")
                .on("keyup", function () {
                    if (!/^\d+[.]?\d*$/.test(this.value)) {
                        this.value = /^\d+[.]?\d*$/.exec(this.value);
                    }
                    _this.TimeCallBack();
                    return false;
                })
        },
        /**
         * 查询有彩池金额的投注
         * @param e
         */
        winningAmount: function (e, opt) {
            $("input[name='search.beginWinningAmount']").val(0);
            this.query(e, opt);
            $(e.currentTarget).unlock();
        },
        /**
         * 根据条件搜索（不包含彩池奖金条件）
         * @param e
         * @param opt
         */
        queryByCondition: function (e, opt) {
            $("input[name='search.beginWinningAmount']").val("");
            this.query(e, opt);
            $(e.currentTarget).unlock();
        }
    });
});