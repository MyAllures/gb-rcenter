/**
 * Created by snekey on 15-9-7.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
            this.formSelector = "#mainFrame form";
            this._super("formSelector");
        },

        bindEvent: function () {
            this._super();
        },
        onPageLoad:function(){
            this._super();
        },
        chooseUser: function (e,opt) {
            var url = root + '/operation/massInformation/chooseUser.html';
            window.top.topPage.ajax({
                type: "POST",
                data: this.getCurrentFormData(e),
                url: url,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    $("#mainFrame").html(data);
                },
                error: function (data) {
                  $(e.currentTarget).unlock();
                }
            });
        }
    })
})
