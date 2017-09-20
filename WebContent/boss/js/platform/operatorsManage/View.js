//运营商-详细js
define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "form";
            this._super(this.formSelector);
            this.initShowTab();
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
        },
        /**
         * 编辑资料后回调
         * @param e
         * @param option
         */
        editInfoCallback: function (e, option) {
            if (e.returnValue == true) {
                var url = this.getCurrentFormAction(e);
                var $form = $(this.getCurrentForm(e));
                window.top.topPage.ajax({
                    url: url,
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    success: function (data) {
                        $form.html(data);
                        $(e.currentTarget).unlock()
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(e.currentTarget).unlock();
                    }
                });
            }
        },
        /**
         * 查看完整联系方式
         */
        viewContact: function (e, option) {
            var data = option.data;
            $("#phoneSpan").text(data['110']);
            $("#mailSpan").text(data['201']);
            $("#skypeSpan").text(data['303']);
            $("#msnSpan").text(data['302']);
            $("#qqSpan").text(data['301']);
            $(e.currentTarget).hide();
        },
        accountCallback: function (e, opt) {
            var _this = this;
            if(opt.data.state){
                page.showPopover(e, {"callback": function (event,option) {
                    console.log(opt.data.url);
                    window.top.topPage.doDialog({page:_this},{text:window.top.message.common['msg'],
                        target: root + "/siteSubAccount/showUrl.html?username="+opt.data.username+"&host="+opt.data.host+"&secret="+opt.data.secret});
                },"placement":"left"}, 'success', '操作成功', true);
            }else{
                var msg = opt.data.msg;
                if(msg==null||msg==""){
                    msg = "操作失败";
                }

                page.showPopover(e, {"callback": function () {
                },"placement":"left"}, 'danger', msg, true);
            }
        }
    });
});