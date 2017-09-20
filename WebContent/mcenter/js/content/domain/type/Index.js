/**
 * Created by jeff on 15-8-15.
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this.formSelector = 'form';
            this._super();
        },
        bindEvent: function () {
            this._super();
            //$('.')
        },
        onPageLoad: function () {
            this._super();
        },
        reloadDialog:function(){
            window.location.href =  window.location.href
        }
    });
});