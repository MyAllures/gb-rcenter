//管理介绍人js
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
            var _this = this;
           /* $(this.formSelector+" input.introduceName").focus(function(){

            });*/
        },
        /**
         * 删除联系人
         * @param e
         * @param option
         */
        deleteIntorducer: function (e, option) {
            $.each($("form").validate().errorList, function (index, item) {
                $(item.element).poshytip('disable');
                $(item.element).poshytip('destroy');
            });
            var name = option.data;
            var _this = this;
            if (name) {
                window.top.topPage.ajax({
                    url: root + "/platform/operatorsManage/checkIntroducer.html",
                    data: {"referrals": name},
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data) {
                            window.top.topPage.showWarningMessage(window.top.message.platform['Introducer.notDelete']);
                            $(e.currentTarget).unlock();
                        } else {
                            $(e.currentTarget).parent().remove();
                            _this.resizeKey();
                        }
                        $(e.currentTarget).unlock();
                    },
                    error: function (data) {
                        $(e.currentTarget).unlock();
                    }
                })
            } else {
                $(e.currentTarget).parent().remove();
                $(e.currentTarget).unlock();
                this.resizeKey();
            }
        },
        /**
         * 新增联系人
         * @param e
         * @param option
         */
        addIntroducer: function (e, option) {
            $(e.currentTarget).parent().prev().after($("div[name=add]").children().clone());
            this.resizeKey();
            $(e.currentTarget).unlock();
        },
        resizeKey: function () {
            var count = 1;
            $("div.input-group").each(function () {
                $($(this).children("input.introduceName")).attr("name", "name[" + count + "]");
                count++;
            });
            $("input[name=len]").val(count - 2);
        },
        saveCallbak: function (e, option) {
            if(option.data.state==true) {
                this.returnValue = true;
                window.top.topPage.closeDialog();
            }
        },
    });
});