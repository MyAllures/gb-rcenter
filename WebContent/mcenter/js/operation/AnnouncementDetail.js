/**
 * Created by Orange on 2015-11-17
 */

define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            window.top.topPage.ajax({
                url: root + '/index/unReadMagNum.html',
                dataType: "json",
                async:false,
                success: function (data) {
                    $("#unReadCount").text(parseInt(data));
                }
            })

        }
    });

});
