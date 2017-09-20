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

            if($("#read").val()=='true'){
                var unReadMsgCount=$("#unReadMsgCount").text();
                $("#unReadMsgCount").text(parseInt(unReadMsgCount)-1);
            }

        }
    });

});
