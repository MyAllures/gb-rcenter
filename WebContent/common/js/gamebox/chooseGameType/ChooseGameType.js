/**
 * 游戏类型
 */

define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        /**
         * js初始化
         */
        init: function () {
            //父项控制子项全选/全不选
            $("input[name='apicheck']").click(function () {
                var flag = this.checked;
                if (flag) {
                    $(this).parents('td').siblings("td").find("input").prop("checked", true);
                } else {
                    $(this).parents('td').siblings("td").find("input").prop("checked", false);
                }
            });

            //子项部分选影响父项
            $("input[name='gamecheck']").click(function () {
                var flag = this.checked;
                if (flag) {
                    $(this).parents('td').siblings("td").find("input").prop("checked", true);
                } else {
                    var m = $(this).parent().siblings().find("input:checked");
                    if (m.length > 0) {
                        return;
                    } else {
                        $(this).parents('td').siblings("td").find("input").prop("checked", false);
                    }
                }
            });

            this.reWrite();
        },
        /**
         * 全选
         */
        checkAll: function (e) {
            $('label').children('input[type=checkbox]').prop("checked", true);
            $(e.currentTarget).unlock();
        },
        /**
         * 清楚所有
         */
        clearAll: function (e) {
            $('label').children('input[type=checkbox]').prop("checked", false);
            //游戏类型去掉选中颜色
            $(".bruce").addClass("btn-outline");
            $(e.currentTarget).unlock();
        },
        /**
         * api选择
         */
        choseApi: function (e, option) {
            var apiId = option.data;
            $('td').each(function () {
                if (apiId == $(this).attr("data-id")) {
                    $(this).children().children("input[type=checkbox]").prop("checked", true);
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 游戏类型选择
         */
        choseGameType: function (e, option) {
            var gameTypes = "," + option.gameTypes + ",";
            if ($(e.currentTarget).hasClass("btn-outline")) {
                $(e.currentTarget).removeClass("btn-outline");
                $('label').children('input[type=checkbox]').each(function () {
                    if (gameTypes.indexOf("," + $(this).val() + ",") > -1) {
                        $(this).prop("checked", true);
                    }
                });
            } else {
                $(e.currentTarget).addClass("btn-outline");
                $('label').children('input[type=checkbox]:checked').each(function () {
                    if (gameTypes.indexOf("," + $(this).val() + ",") > -1) {
                        $(this).prop("checked", false);
                    }
                });
            }


            $(e.currentTarget).unlock();
        },
        /**
         * 确定选择
         * @param e
         * @param option
         */
        choose: function (e, option) {
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
            this.closeChooseGameType(e);
            this.apiVal(e);
        },

        /*checkbox回填 数据格式 [{"apiId":"1","gameId":["01"]},{"apiId":"3","gameId":["01"]}]*/
        reWrite: function () {
            var selectedJson = $("#gametypeList", parent.document).val();
            var objSelected;
            if (selectedJson != '') {
                objSelected = JSON.parse(selectedJson);
                $.each(objSelected, function (i, line) {
                    $("td[name='api_td']").each(function () {
                        var _that = $(this);
                        if (_that.data("id") == line.apiId) {
                            /*回选api*/
                            $(_that).find("input[name='apicheck']").attr("checked", "checked");
                            $.each(line.gameId, function (k, v) {
                                /*回选api下的gameType*/
                                $(_that).next().children().children("input[type=checkbox]").each(function () {
                                    var gameType = this;
                                    if ($(gameType).val() == v) {
                                        $(gameType).attr("checked", "checked");
                                        $(gameType.currentTarget).unlock();
                                    }
                                })
                            });
                            $(_that.currentTarget).unlock();
                        }

                    })
                })
            }
        },

        closeChooseGameType: function (e) {
            if (!($(".type-search").is(":hidden"))) {
                $(".type-search").css("display", "none");
            }
            $(e.currentTarget).unlock();
        },

        apiVal: function (e) {
            var pageSelectGame = "全部游戏";
            var arr = e.returnValue;
            if (arr && arr.length > 0) {
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
                if (selectGame.length > 0) {
                    pageSelectGame = selectGame;
                    $("input[name='selectGameTypeText']").val(pageSelectGame);
                    $("#chooseGameType").children(".input-group").find("span[prompt='prompt']").text("已选中" + selectedList.length + "项");
                }
            } else {
                $("input[name='selectGameTypeText']").val("");
                $("#chooseGameType").children(".input-group").find("span[prompt='prompt']").text("请选择");
            }
            $("#selectGame").text(pageSelectGame);

            $("#gametypeList").val(JSON.stringify(selectedList));
        }
    });

});
