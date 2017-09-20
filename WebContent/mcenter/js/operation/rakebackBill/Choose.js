/**
 * 返水明细-添加选择
 */

define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        /**
         * js初始化
         */
        init: function () {
            this.formSelector = "form";
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
            var gameType = option.data;
            $('label').children('input[type=checkbox]').each(function () {
                if (gameType == $(this).attr("data-parent")) {
                    $(this).prop("checked", true);
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 确定选择
         * @param e
         * @param option
         */
        choose: function(e, option) {
            var tabTitles = [];
            var gameType = [];
            var tabTitle = {};
            var flag;
            $("td[name='api_td']").each(function () {
                tabTitle = {};
                tabTitle.id = $(this).attr("data-id");
                gameType = [];
                flag = false;
                if($(this).children().children().prop("checked")) {
                    tabTitle.state = true;
                    flag = true;
                }
                $(this).next().children().children("input[type=checkbox]").each(function (){
                    if(this.checked) {
                        gameType.push($(this).val());
                        flag = true;
                    }
                });
                tabTitle.gameType = gameType;
                if(flag) {
                    tabTitles.push(tabTitle);
                }
            });
            $(e.currentTarget).unlock();
            this.returnValue=tabTitles;
            window.top.topPage.closeDialog();
        }
    });

});
