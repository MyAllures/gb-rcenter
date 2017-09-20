/**
 * Created by catban on 15-12-16.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },
        onPageLoad:function(){
            this._super();
        },
        previewChange: function (e,opt) {
            var url = root + '/setting/currency/alterRatePreview.html';
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

                }
            });//走啊啊啊啊啊啊啊
            $(e.currentTarget).unlock();
        },
        lastStep: function (e,opt) {
            var opType = $("input[name='opType']").val();
            var url = root +"/setting/currency/updateRate.html?opType="+opType;
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

                }
            });
            $(e.currentTarget).unlock();
        }
    })
})
