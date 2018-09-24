/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage', 'nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseListPage) {
    return BaseListPage.extend({

        selectIds:null,
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var _this=this;
            this.initNestable();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            this.initNestable();
        },

        getSelectIds: function (e,opt) {
            selectIds = this.getSelectIdsArray(e);
            return true;
        },
        getIds: function () {
            return selectIds;
        },
        saveSync:function () {
            window.alert(this);
            window.top.topPage.ajax({
                url: root+'gameI18n/saveSync.html',
                cache: false,
                type: "GET",
                success: function (data) {
                    window.alert(data.msg);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 拖动排序初始化
         * @see https://github.com/dbushell/Nestable
         */
        initNestable:function(){
            $(".dragdd").nestable({
                rootClass:'dragdd',
                listNodeName:'tbody',
                listClass:'dd-list1',
                itemNodeName:'tr',
                handleClass:'td-handle1',
                itemClass:'dd-item1',
                maxDepth:1
            });
        },
        /**
         * 保存排序顺序
         * @param e
         * @param option
         */
        saveGameOrder: function (e, option) {
            var _this = this;
            var apiTypeOrder = {};
            var orderObj = [];
            $(".dd-item1").each(function (index, obj) {
                orderObj.push({
                    "orderNum": index + 1,
                    "id": $(obj).find("[name='gameId']").val()
                });
            });
            apiTypeOrder.entities = orderObj;
            window.top.topPage.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(apiTypeOrder),
                async: false,
                type: "post",
                url: root + '/vGame/saveGameOrder.html',
                success: function (data) {
                    window.top.topPage.showSuccessMessage(window.top.message.common['save.success'], function (state) {
                        if (state) {
                            // _this.goToLastPage();
                            window.top.topPage.goToLastPage(true);
                        }
                    });
                },
                error: function (data) {
                    window.top.topPage.showSuccessMessage(window.top.message.common['save.failed']);
                }
            });
            $(e.currentTarget).unlock();
        }
    })
})
