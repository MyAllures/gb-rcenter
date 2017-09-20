/**
 * 玩家信息-交易js
 */
define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=single_partial_form]";
            this._super(this.formSelector);
            /*$("form[name='single_partial_form']").validate({
             ignore: ".ignore"
             });*/
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        /**
         * 查询交易
         */
        /* searchSingleRecord: function (e) {
         var target = e.currentTarget;
         var url = root + '/playerSingleRecord/singleRecordList.html';
         var form = this.getCurrentForm(e);
         window.top.topPage.ajax({
         url: url,
         data: this.getCurrentFormData(e),
         success: function (data) {
         var div = $(form).children("div[name=singleRecordList]");
         $(div).html(data);
         $(target).unlock();
         },
         error: function (data) {
         $(target).unlock();
         }
         });
         },*/
        /**
         * 未结算记录/历史记录
         */
        singleRecord: function (e, option) {
            var refresh = $(this.getCurrentForm(e)).parent();
            $(refresh).html('<p style="text-align:center;"><img src="' + resRoot + '/images/022b.gif"></p>');
            window.top.topPage.ajax({
                url: option.action,
                success: function (data) {
                    $(refresh).html(data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },
        // 刷新同步时间
        recordRefresh: function (e, option) {
            var refresh = $(this.formSelector).children("div[name=singleRecordList]");
            $(refresh).html('<p style="text-align:center;"><img src="' + resRoot + '/images/022b.gif"></p>');
            window.top.topPage.ajax({
                url: $(this.formSelector).attr("action"),
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    $(refresh).html(data);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        }
    });

});