define(['common/BaseEditPage', 'jqFileInput', 'css!themesCss/fileinput/fileinput', 'validate','bootstrapswitch'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: "开启",
                    offText: "关闭",
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var siteId = $(_target).attr("siteId");
                        var type = $(_target).attr("mold");
                        var msg = "";
                        if (state) {
                            msg = "该站点将开启转账,确认开启吗？"
                        }
                        else {
                            msg = "该站点将关闭转账,确认关闭吗？"
                        }
                        var okLabel = window.top.message.setting['common.ok'];
                        var cancelLabel = window.top.message.setting['common.cancel'];
                        if(!$(_target).attr("isChanged")) {
                            window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                if (confirm) {
                                    window.top.topPage.ajax({
                                        url: root + '/vSysCredit/transferSwitch.html',
                                        dataType: "json",
                                        data: {
                                            "result.paramValue": state,
                                            "result.siteId": siteId,
                                            "result.paramCode": type
                                        },
                                        success: function (data) {
                                            if (data) {
                                                $(_target).attr("isChanged", true);
                                                $(_target).bootstrapSwitch("state", !_target.checked);
                                                $("#status").removeClass("label-success");
                                                $("#status").addClass("label-danger");
                                            } else {
                                                page.showPopover(e, {
                                                    "callback": function () {

                                                    }
                                                }, "danger", "操作失败", true);
                                            }

                                        }
                                    });
                                }
                            });
                        }else if ($(_target).attr("isChanged")){
                            $(_target).removeAttr("isChanged");
                            return true;
                        }
                        return false;
                    }
                });
        },
    });
});