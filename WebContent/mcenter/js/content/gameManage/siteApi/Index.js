/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
            var _this = this;
        },

        toSiteApiRecord:function(e,opt){
            var siteApiId = opt.siteApiId;
            $("#tot").attr('href','/report/operate/fromGameManage.html?search.apiId='+siteApiId);
            $("#tot").click();
        }
    })
})
