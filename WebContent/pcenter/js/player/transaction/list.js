//模板页面
define(['common/BaseListPage'], function(BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectPure:null,
        init: function (title) {
            this.formSelector = "#mainFrame form";
            this.noRecordMessage=window.top.message.player_auto['请选择条件'];
            this._super(window.top.message.player_auto['更多备注']);
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

        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            var _this = this;


            //列表头下拉筛选
            $(this.formSelector ).on("change","select",function(event){
                _this.query(event);
            });
        },

        queryLogOfApiGameType: function (event,option) {
            var apiId = option.apiid;
            $("input[name='search.logType']").val("subLog");
            window.top.topPage.ajax({
                url: root + "/vPlayerGameOrder/apiList.html?search.apiId=" + apiId+"&type=subLog",
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                type: "post",
                data: this.getCurrentFormData(event),
                success: function (data) {
                    $("#mainFrame").html(data);

                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                    $(event.currentTarget).unlock();
                }
            });
        },
        queryByApi: function (event, option) {
            var apiId = option.apiid;
            window.top.topPage.ajax({
                url: root + "/vPlayerGameOrder/singleApiLog.html?search.apiId=" + apiId,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                type: "post",
                data: this.getCurrentFormData(event),
                success: function (data) {
                    $("#mainFrame").html(data);

                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                    $(event.currentTarget).unlock();
                }
            });

        },
        queryByApiSub: function (event, option) {
            var gametype = option.gametype;
            var apiId = $("input[name='apiId']").val();
            window.top.topPage.ajax({
                url: root + "/vPlayerGameOrder/singleApiLog.html?search.apiId=" +apiId +"&search.gameType="+gametype,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                type: "post",
                data: this.getCurrentFormData(event),
                success: function (data) {
                    $("#mainFrame").html(data);
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                    $(event.currentTarget).unlock();
                }
            });

        },

        queryGameType:function(){

        },
        query:function(e,p){
            this._super(e,p);
        }
    });
});