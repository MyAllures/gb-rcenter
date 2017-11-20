define(['common/BaseListPage', 'bootstrapswitch', 'jsrender'], function (BaseListPage, Bootstrapswitch) {
    var _this;

    return BaseListPage.extend({
        rankTag: null,
        bootstrapswitch: Bootstrapswitch,

        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            _this = this;
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');

            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                    {
                        onText: window.top.message.content['floatPic.display.on'],
                        offText: window.top.message.content['floatPic.display.off'],
                        onSwitchChange: function (e, state) {
                            var _target = e.currentTarget;
                            var index = $(_target).attr("tt");
                            var id = $(_target).attr("creditAccountId");
                            var msg = "关闭后将无法用此账号收款,确认关闭吗?";
                            if (confirm(msg)!=true){
                                return false;
                            }

                            window.top.topPage.ajax({
                                url: root + '/creditAccount/changeStatus.html',
                                dataType: "json",
                                data: {"result.id": id, "state": state},
                                success: function (data) {
                                    if(state) {
                                        $("#status" + index).removeClass("label-danger");
                                        $("#status" + index).addClass("label-success");
                                        $("#status" + index).text('使用中');
                                    } else {
                                        $("#status" + index).removeClass("label-success");
                                        $("#status" + index).addClass("label-danger");
                                        $("#status" + index).text('已停用');
                                    }

                                }
                            });
                            return true;
                        }
                    });
        },

        bindEvent: function () {
            this._super();
            $("#searchtext").keydown(function (event) {
                if (event.keyCode == 13) {
                    $(".btn-query-css").click();
                }
            });
        },
        /**
         * 删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        deleteCallbak: function (e, option) {
            this.query(e, option);
        },
        /**
         * 删除确认框
         * @param e
         * @param option
         */
        confirmDel: function (e, option) {
            var msg = window.top.message.content['payAccount.deleteConfirm'];
            window.top.topPage.showConfirmMessage(msg, function (bol) {
                if (bol) {
                    window.top.topPage.doAjax(e, option);
                }
            });
        },
        hideSettingCallback: function (event, option) {
            if (event.returnValue) {
                $(event.currentTarget).next().click();
            }
        },
        myCallBack: function (e, opt) {
            alert(opt.data.state);
        }
    });
});