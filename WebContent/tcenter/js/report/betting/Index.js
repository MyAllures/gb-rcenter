/**
 * 投注记录
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function (title) {
            this.formSelector = "form[name='gameOrderForm']";
            var isCondition = $("input[name='search.searchCondition']").val();
            if (isCondition == "false") {
                this.noRecordMessage = window.top.message.report_auto['请输入查询条件'];
                $("._search").lock();
                $("._search").addClass("disabled");
                $("input[name='search.searchCondition']").val("true");
            }
            this._super(this.formSelector);
            this.reWrite();
            this.queryCount();
            //统计数据
            this.staticData();
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            var _selectGame = $("input[name='selectGameTypeText']").val();
            if (_selectGame != '') {
                $("#selectGame").text(_selectGame);
            }
        },

        /**
         * 统计
         */
        staticData: function () {
            var html = "";
            window.top.topPage.ajax({
                url: root + "/report/gameTransaction/statisticalData.html",
                data: $(this.formSelector).serialize(),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $("#effectSpan").text(data.effective);
                    $("#profitSpan").text(data.profit);
                    if (data.single) {
                        $("#singleSpan").text(data.single);
                    } else {
                        $("#singleSpan").text(0);
                    }
                    var contributionAmount = data.contribution;
                    if (contributionAmount && contributionAmount > 0) {
                        $("#contributionSpan").html('<a id="contribution">' + contributionAmount + '</a>')
                    } else {
                        $("#contributionSpan").text(0);
                    }
                    if (data.winning && data.winning > 0) {
                        $("#jackpotSpan").html('<a id="winningAmount">' + data.winning + '</a>')
                    } else {
                        $("#jackpotSpan").text(data.winning);
                    }
                }
            })
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

            $(this.formSelector).on("change", "#single", function () {
                $("#singleVal").attr("name", $(this).val());
            });

            $(this.formSelector).on("click", ".show-demand-b", function (e) {
                if ($(".show-demand-a").css("display") == "none") {
                    $(this).addClass("open");
                    $(".show-demand-a").show();
                } else if ($(".show-demand-a").css("display") == "block") {
                    $(this).removeClass("open");
                    $(".show-demand-a").hide();
                }
            });

            var _this = this;
            $(this.formSelector).on("click", "input[name='search.apiList']", function (e) {
                _this.chooseApi();
            });

            this.chooseGameTypeEvent();

            //游戏类型浮层失去焦点事件
            $(this.formSelector).on("click", function (e) {
                _this.hideApiAndGame();
            });
            $(this.formSelector).on("click", "#chooseGameType", function (e) {
                _this.preventEvent(e);
            });
            $(this.formSelector).on("click", "#chooseApi", function (e) {
                _this.preventEvent(e);
            });
            $(this.formSelector).on("click", "a#winningAmount", function (e) {
                var opt = {};
                _this.winningAmount(e, opt);
            });
            $(this.formSelector).on("click", "a#contribution", function (e) {
                var opt = {};
                _this.contribution(e, opt);
            });
        },

        preventEvent: function (e) {
            //阻止事件冒泡
            if (e.stopPropagation)
                e.stopPropagation();
            else
                e.cancelBubble = true;
        },

        /**
         * 选择游戏类型
         * @param e
         */
        chooseGame: function (e) {
            var $target = $(e.currentTarget);
            $target.toggleClass("open");
            $("#chooseGameType").find("div.type-search-game").toggle();
            $target.unlock();
            this.preventEvent(e);
        },

        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');
        },

        toExportHistory: function (e, opt) {
            if (e.returnValue == "showProcess") {
                var btnOption = {};
                btnOption.target = root + "/share/exports/showProcess.html";
                btnOption.text = window.top.message['export.exportdata'];
                btnOption.type = "post";
                btnOption.callback = function (e) {
                    $("#toExportHistory").click();
                };
                window.top.topPage.doDialog({}, btnOption);
            } else if (e.returnValue) {
                $("#toExportHistory").click();
            }
        },

        exportData: function (e, opt) {
            return $("#conditionJson").val();
        },

        validateData: function (e, opt) {
            if ($("[name='paging.totalCount']").val() == 0) {
                window.top.topPage.showWarningMessage(window.top.message.report_auto['查询无数据无法导出']);
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        },
        /**
         * 查询有彩池金额的投注
         * @param e
         * @param opt
         */
        winningAmount: function (e, opt) {
            $("input[name='search.beginWinningAmount']").val(0);
            $("input[name='paging.pageNumber']").val(1);
            opt.isCount = true;
            this.query(e, opt);
            this.staticData();
            $(e.currentTarget).unlock();
        },
        /**
         * 查询彩池贡献金
         * @param e
         * @param opt
         */
        contribution: function (e, opt) {
            $("input[name='search.beginContributionAmount']").val(0);
            $("input[name='paging.pageNumber']").val(1);
            opt.isCount = true;
            this.query(e, opt);
            this.staticData();
            $(e.currentTarget).unlock();
        },

        /**
         * 根据条件搜索（不包含彩池奖金条件）
         * @param e
         * @param opt
         */
        queryByCondition: function (e, opt) {
            $("input[name='search.beginWinningAmount']").val("");
            $("#searchTemp option").removeAttr("selected");
            $("#searchTemp option:eq(0)").attr("selected", "selected");
            $("input[name='paging.pageNumber']").val(1);
            opt.isCount = true;
            this.query(e, opt);
            this.staticData();
            $(e.currentTarget).unlock();
        },

        /**
         * 重写query方法
         * @param event
         * @param option
         */
        query: function (event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading: true,
                    url: window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: this.getCurrentFormData(event),
                    success: function (data) {
                        var $result = $(".search-list-container", $form);
                        $result.html(data);
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock()
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }
                });
                if (option && option.isCount) {
                    this.queryCount();
                } else {
                    this.queryCount("true");
                }
            } else {
                $(event.currentTarget).unlock();
            }
        },
        /**
         * 隐藏游戏类型浮层
         */
        hideApiAndGame: function () {
            $("#chooseApi").find("button.open").removeClass("open");
            $("#chooseApi").find(".type-search").hide();

            $("#chooseGameType").find("button.open").removeClass("open");
            $("#chooseGameType").find(".type-search").hide();

        },
        /**
         *选择游戏类型
         */
        openApi: function (e, option) {
            var $target = $(e.currentTarget);
            $target.toggleClass("open");
            $(".type-search").toggle();
            $target.unlock();
        },
        /**
         * 选择所有api
         */
        checkAllApi: function (e, option) {
            this.apiInit(e, true);
        },
        /**
         * 清除api
         */
        clearAllApi: function (e, option) {
            this.apiInit(e, false);
        },
        apiInit: function (e, obj) {
            $(".chooseApiTable").find("input[type=checkbox]").prop("checked", obj);
            $("#selectGame").text(window.top.message.report['operate.list.all']);
            if (obj) {
                $("#chooseApi").children("div.input-group").find("span[prompt=prompt]").text(window.top.message.report_auto['已选全部']);
            } else {
                $("#chooseApi").children("div.input-group").find("span[prompt=prompt]").text(window.top.message.report_auto['请选择']);
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 确定选择api
         */
        chooseApi: function (e, option) {
            var len = 0;
            var html = '';
            $(".chooseApiTable").find("input[type=checkbox]:checked").each(function () {
                html = html + '[' + $(this).next("span").text() + ']';
                len++;
            });
            if (len > 0) {
                $("#chooseApi span[prompt=prompt]").text(window.top.message.report_auto['已选中几项'].replace("[0]",len));
                $("#selectGame").text(html);
            } else {
                $("#chooseApi span[prompt=prompt]").text(window.top.message.report_auto['请选择']);
                $("#selectGame").text(window.top.message.report['operate.list.all']);
            }
        },
        /**
         * 选择所有游戏
         * @param e
         * @param option
         */
        checkAllGame: function (e, option) {
            this.gameTypeInit(e, true);
        },
        /**
         * 清除游戏
         * @param e
         * @param option
         */
        clearAllGame: function (e, option) {
            //游戏类型去掉选中颜色
            $(".bruce").addClass("btn-outline");
            this.gameTypeInit(e, false);
        },
        /**
         * 全部-游戏类型初始化
         *
         */
        gameTypeInit: function (e, obj) {
            $("#selectGame").text(window.top.message.report['operate.list.all']);
            $("input[name=gamecheck]").prop("checked", obj);
            $("input[name=apicheck]").prop("checked", obj);
            $("input[name='search.apitypeList']").val("");
            if (obj) {
                $("#chooseGameType").children("div.input-group").find("span[prompt=prompt]").text(window.top.message.report_auto['已选全部']);
            } else {
                $("#chooseGameType").children("div.input-group").find("span[prompt=prompt]").text(window.top.message.report_auto['请选择']);
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 选择游戏类型绑定事件
         */
        chooseGameTypeEvent: function () {
            var _this = this;
            //父项控制子项全选/全不选
            $(this.formSelector + " input[name='apicheck']").click(function (e) {
                var flag = this.checked;
                if (flag) {
                    $(this).parents('td').siblings("td").find("input").prop("checked", true);
                } else {
                    $(this).parents('td').siblings("td").find("input").prop("checked", false);
                }
                _this.chooseGameType(e);
            });

            //子项部分选影响父项
            $(this.formSelector + " input[name='gamecheck']").click(function (e) {
                var flag = this.checked;
                if (flag) {
                    $(this).parents('td').siblings("td").find("input").prop("checked", true);
                } else {
                    var m = $(this).parent().siblings().find("input:checked");
                    if (m.length == 0) {
                        $(this).parents('td').siblings("td").find("input").prop("checked", false);
                    }
                }
                _this.chooseGameType(e);
            });
        },
        /**
         * checkbox回填 数据格式 [{"apiId":"1","apiType":["01"]},{"apiId":"3","apiType":["01"]}]
         */
        reWrite: function () {
            var selectedJson = $("#apitypeList", parent.document).val();
            var objSelected;
            var gameTypeText = '';
            if (selectedJson != '') {
                objSelected = JSON.parse(selectedJson);
                var count = 0;
                $.each(objSelected, function (i, line) {
                    $("td[name='api_td']").each(function () {
                        var _that = $(this);
                        if (_that.data("id") == line.apiId) {
                            /*回选api*/
                            $(_that).find("input[name='apicheck']").prop("checked", true);
                            var apiName = $(_that).find("span.search-game-title b").text();
                            $.each(line.apiType, function (k, v) {
                                /*回选api下的apiType*/
                                $(_that).next().children().children("input[type=checkbox]").each(function () {
                                    var gameType = this;
                                    if ($(gameType).val() == v) {
                                        $(gameType).prop("checked", true);
                                        $(gameType.currentTarget).unlock();
                                        gameTypeText = gameTypeText + "[" + apiName + ' ' + $(gameType).parent().find("span").text() + "]";
                                        count++;
                                    }
                                });
                            });
                            $(_that.currentTarget).unlock();
                        }
                    })
                });
                $(this.formSelector + " #chooseGameType .input-group").find("span[prompt=prompt]").text(window.top.message.report_auto['已选择几项'].replace("[0]",count));
                var text = $("#selectGame").text().trim();
                if (!text || text == '') {
                    $("#selectGame").text(gameTypeText);
                }
            }
        },
        /**
         * 确定选择
         * @param e
         * @param option
         */
        chooseGameType: function (e, option) {
            var tabTitles = [];
            var gameType = [];
            var gameName = [];
            var tabTitle = {};
            var flag;
            $("td[name='api_td']").each(function () {
                //先判断该api下有gametype
                if ($(this).next().children().children("input[type=checkbox]").length > 0) {
                    tabTitle = {};
                    tabTitle.id = $(this).attr("data-id");
                    gameTypeArr = [];
                    gameNameArr = [];
                    flag = false;
                    if ($(this).children().children().prop("checked")) {
                        tabTitle.state = true;
                        flag = true;
                    }

                    $(this).next().children().children("input[type=checkbox]").each(function () {
                        if (this.checked) {
                            var apiTrObj = $(this).parents("tr").children()[0];
                            var selectObjText = $(apiTrObj).find("label").text() + " " + $(this).parent("label").text();
                            gameTypeArr.push($(this).val());
                            gameNameArr.push(selectObjText);
                            flag = true;
                        }
                    });
                    tabTitle.gameType = gameTypeArr;
                    tabTitle.gameName = gameNameArr;
                    if (flag) {
                        tabTitles.push(tabTitle);
                    }
                }
            });
            $(e.currentTarget).unlock();
            e.returnValue = tabTitles;
            this.apiVal(e);
        },
        /**
         * 确认选择游戏类型组装数据
         * @param e
         */
        apiVal: function (e) {
            var pageSelectGame = window.top.message.report_auto['全部游戏'];
            var arr = e.returnValue;
            if (arr && arr.length > 0) {
                var gameTypes = [];
                var selectGame = "";
                var apiId;
                var selectedList = [];
                var len = 0;
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
                            apiGameTypeRelation.gameType = gameTypes;
                            selectedList.push(apiGameTypeRelation);
                            gameTypes = [];
                        }
                        //取选中的gamtype 名称
                        if (index == 'gameName') {
                            $.each(value, function (i, v) {
                                selectGame = selectGame + "[" + v + "]";
                                len++;
                            })
                        }
                    });
                });
                if (selectGame.length > 0) {
                    pageSelectGame = selectGame;
                    $("input[name='selectGameTypeText']").val(pageSelectGame);
                    $("#chooseGameType").children(".input-group").find("span[prompt='prompt']").text(window.top.message.report_auto['已选中几项'].replace("[0]",len));
                }
            } else {
                $("input[name='selectGameTypeText']").val("");
                $("#chooseGameType").children(".input-group").find("span[prompt='prompt']").text(window.top.message.report_auto['请选择']);
            }
            $("#selectGame").text(pageSelectGame);

            $("#apitypeList").val(JSON.stringify(selectedList));
        },
        /**
         * 选择api类型
         * @param e
         * @param option
         */
        choseApiType: function (e, option) {
            var apiTypeId = option.data;
            if ($(e.currentTarget).hasClass("btn-outline")) {
                $(e.currentTarget).removeClass("btn-outline");
                $('label').children('input[type=checkbox][name=gamecheck]').each(function () {
                    if (apiTypeId.indexOf($(this).val()) > -1) {
                        $(this).prop("checked", true);
                    }
                });
            } else {
                $(e.currentTarget).addClass("btn-outline");
                $('label').children('input[type=checkbox][name=gamecheck]:checked').each(function () {
                   if (apiTypeId.indexOf($(this).val()) > -1) {
                        $(this).prop("checked", false);
                    }
                });
            }

            this.chooseGameType(e);
            $(e.currentTarget).unlock();
        },
        /**
         * 重置
         * @param e
         */
        resetCondition: function (e) {
            $("input[name='search.username']").val("");
            $("input[name='search.agentusername']").val("");
            $("input[name='search.topagentusername']").val("");
            $("input[name='search.searchGame']").val("");
            $("input[name='search.betId']").val("");
            $("input[name='search.createStart']").val("");
            $("input[name='search.createEnd']").val("");
            $("input[name='search.payoutStart']").val("");
            $("input[name='search.payoutEnd']").val("");
            $("input[name='search.beginSingleAmount']").val("");
            $("input[name='search.endSingleAmount']").val("");
            $("input[name='search.beginEffectiveTradeAmount']").val("");
            $("input[name='search.endEffectiveTradeAmount']").val("");
            $("input[name='search.beginProfitAmount']").val("");
            $("input[name='search.endProfitAmount']").val("");

            $("#apitypeList").val("");
            $("input[name=chooseGameText]").val("");
            $("input[name='search.profitAmount'][value='']").prop("checked", true);
            $("input[name='search.terminal'][value='']").prop("checked", true);
            $("input[name='search.orderState'][value='']").prop("checked", true);
            this.apiInit(e, false);
            this.gameTypeInit(e, false);
        },
        /**
         * 重新计算分页
         * @param e
         */
        queryCount: function (isCounter) {
            var _this = this;
            var url = root + "/report/gameTransaction/count.html";
            if (isCounter) {
                url = url + "?isCounter=" + isCounter;
            }
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                type: 'POST',
                success: function (data) {
                    $("#paginationDiv").html(data);
                    _this.initSelect();
                    $(_this.formSelector + " .search-wrapper [selectDiv]").attr("callback", "selectListChange");
                },
                error: function (data) {

                }
            })
        },
        /**
         *跳转其他分类的api
         * @param e
         * @param option
         */
        linkType: function (e, option) {
            var searchKey = $("[name=searchKeys]").val();
            var text = $("input[name='" + searchKey + "']").val();
            var url = option.url;
            if (url) {
                if (text) {
                    url = url + "&" + searchKey + "=" + text;
                }
                $("#mainFrame").load(root + url);
            }
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        }
    });
});