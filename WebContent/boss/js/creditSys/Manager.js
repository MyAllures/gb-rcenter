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
            this.transferSwitch();
            this.enableTransferLimit();
            this.isDemo();
        },

        /**
         * 禁用转账开关
         */
        transferSwitch:function () {
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
                            msg = "该站点将关闭转账,确认关闭吗？"
                        }
                        else {
                            msg = "该站点将开启转账,确认开启吗？"
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
        /**
         * 转账上限停止转账功能开关
         */
        enableTransferLimit:function () {
            var _this = this;
            var $bootstrapSwitch1 = $('input[type=checkbox][name=my-checkbox1]');
            this.unInitSwitch($bootstrapSwitch1)
                .bootstrapSwitch({
                    onText: "开启",
                    offText: "关闭",
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var siteId = $(_target).attr("siteId");
                        var type = $(_target).attr("mold");
                        var msg = "";
                        if (state) {
                            msg = "确认开启该站点转账上限停止转账功能？"
                        }
                        else {
                            msg = "确认关闭该站点转账上限停止转账功能？"
                        }
                        var okLabel = window.top.message.setting['common.ok'];
                        var cancelLabel = window.top.message.setting['common.cancel'];
                        if(!$(_target).attr("isChanged")) {
                            window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                if (confirm) {
                                    window.top.topPage.ajax({
                                        url: root + '/vSysCredit/enableTransferLimit.html',
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
        /**
         * 演示站(禁止转账)开关
         */
        isDemo:function () {
            var _this = this;
            var $bootstrapSwitch2 = $('input[type=checkbox][name=my-checkbox2]');
            this.unInitSwitch($bootstrapSwitch2)
                .bootstrapSwitch({
                    onText: "开启",
                    offText: "关闭",
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var siteId = $(_target).attr("siteId");
                        var type = $(_target).attr("mold");
                        var msg = "";
                        if (state) {
                            msg = "确认开启该站点演示站(禁止转账)开关？"
                        }
                        else {
                            msg = "确认关闭该站点演示站(禁止转账)开关？"
                        }
                        var okLabel = window.top.message.setting['common.ok'];
                        var cancelLabel = window.top.message.setting['common.cancel'];
                        if(!$(_target).attr("isChanged")) {
                            window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                if (confirm) {
                                    window.top.topPage.ajax({
                                        url: root + '/vSysCredit/isDemo.html',
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
        }
    });
});