/**
 * Created by Orange on 2015-11-17
 */

define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        onPageLoad: function () {

        },
        closePageToDomain:function () {
            window.top.topPage.closeDialog();
            window.open(root+"/operation/domainCheckData/getDomainCount.html", '_blank');
        }
    });

});
