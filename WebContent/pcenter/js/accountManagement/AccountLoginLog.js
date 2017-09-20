/**
 * Created by eagle on 15-10-29.
 */

define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this._super();
        },

        onPageLoad: function (e,option) {
            this._super();

            $("#mainFrame").on("click",".updatePwd", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
                $current.parent().addClass("select");
                $current.click();
            });
        },

        bindEvent: function () {
            this._super();
        }

    });
});