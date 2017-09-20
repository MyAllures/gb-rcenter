/**
 * Created by fei on 16-6-24.
 */
/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();

        },
        bindEvent : function() {
            var _this=this;
            this._super();


            //给Body加一个Click监听事件
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
            this.resizeDialog();

        },
        

        
    });
});