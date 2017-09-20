/**
 * 选择游戏类型
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super(this.formSelector);

        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

            /**
             * api选项
             */
            $("input[name=api]").on("click", function () {
                var isCheck = $(this).is(':checked');
                var api = $(this).attr("api");
                if (isCheck) {
                    $("#api" + api).find("input[name=gameType]").prop("checked", true);
                } else {
                    $("#api" + api).find("input[name=gameType]").prop("checked", false);
                }
            });
        },
        /**
         * 全选
         * @param e
         * @param option
         */
        checkAll: function (e, option) {
            $("#game").find("input[type=checkbox]").prop("checked", true);
            $(e.currentTarget).unlock();
        },
        /**
         * 清空
         * @param e
         * @param option
         */
        clearAll: function (e, option) {
            $("#game").find("input[type=checkbox]").prop("checked", false);
            $(e.currentTarget).unlock();
        },
        /**
         * 确认选择
         * @param e
         * @param option
         */
        choose: function (e, option) {
            //组装选择游戏i
            var datas = [];
            var apiIds = [];
            var data = {};
            data.gameType = [];
            //显示已选择游戏
            var selects = [];
            var select = {};
            var id;
            $("input[name=gameType]:checked").each(function () {
                id = $(this).attr("api");
                if (jQuery.inArray(id, apiIds) == -1) {
                    if (data.id) {
                        datas.push(data);
                    }
                    data = {};
                    data.id = id;
                    data.gameType = [];
                    apiIds.push(id);
                }
                var gameType = $(this).val();
                data.gameType.push(gameType);

                select = {};
                select.name = $(this).attr("apiname");
                select.typename = $(this).attr("typename");
                selects.push(select);
            });
            if (data) {
                datas.push(data);
            }
            var returnValue = {};
            returnValue.json = JSON.stringify(datas);
            returnValue.selects = selects;
            this.returnValue = returnValue;
            this.selects = selects;
            $(e.currentTarget).unlock();
            window.top.topPage.closeDialog();
        },
        /**
         * 选择api下游戏
         * @param e
         * @param option
         */
        choseApi: function (e, option) {
            var data = option.data;
            $("#api" + data).find("input[type=checkbox]").prop("checked", true);
            $(e.currentTarget).unlock();
        },
        /**
         * 选择游戏类型下游戏
         * @param e
         * @param option
         */
        choseGameType: function (e, option) {
            var data = option.data;
            $("input[name=gameType]").each(function () {
                if ($(this).attr("data") == data) {
                    $(this).prop("checked", true);
                }
            });
            $(e.currentTarget).unlock();
        }
    });
});