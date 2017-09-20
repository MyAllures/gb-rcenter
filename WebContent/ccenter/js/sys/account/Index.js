/**
 * Created by jeff on 15-11-22.
 */
define(['common/BaseListPage','jqFileInput', 'css!themesCss/fileinput/fileinput'], function (BaseListPage,Fileinput) {

    return BaseListPage.extend({
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },

        callBackQuery: function (event) {
            window.top.topPage.ajax({
                type: "POST",
                url: root + '/index/getAvatar.html',
                success: function(data) {
                    var url = $('div.img img').attr('src');
                    if (url != null && url != '') {
                        url = url.substring(0, url.indexOf('headImage'));
                        $('img.avatar-48').attr('src', url + data);
                    }
                }
            });
            if (event.returnValue) {
                window.top.topPage.showPage();
            }
        }
    });
});