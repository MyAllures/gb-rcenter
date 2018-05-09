/**
 * Created by jeff on 15-8-14.
 */
define(['common/BaseListPage', 'bootstrapswitch'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click", ".dropdown-menu-stop", function (event) {
                event.stopPropagation();//阻止事件向上冒泡
            });
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            var $bootstrapSwitchs = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitchs)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var $this = $(this);
                        $this.bootstrapSwitch('indeterminate', true);
                        var _target = e.currentTarget;
                        var id = $(_target).attr("id");
                        var _msg = "";
                        if (state) {
                            _msg = "确认启用";
                        } else {
                            _msg = "确认禁用";
                        }
                        window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                            if (confirm) {
                                window.top.topPage.ajax({
                                    type: "POST",
                                    url: root + '/gameApiProvider/setProxy.html',
                                    dataType: "json",
                                    data: {"result.id": id, "result.proxy": state},
                                    success: function (data) {
                                        if (data.state) {
                                            _this.query(e);
                                            $(_target).attr("isChanged", true);
                                            $("#status").removeClass("label-success");
                                            $("#status").addClass("label-danger");
                                        } else {
                                            page.showPopover(e, {
                                                "callback": function () {
                                                    _this.query(e);
                                                }
                                            }, "danger", "操作失败", true);
                                        }
                                    }
                                });
                                $this.bootstrapSwitch('indeterminate', false);
                            } else {
                                $this.bootstrapSwitch('indeterminate', false);
                                $this.bootstrapSwitch('state', !state, true);
                            }
                        })
                    }
                })
        },
        showConfirm: function (e, option, msg) {
            var _this = this;
            var _target = e.currentTarget;
            var proxyLine = e.key;
            var id = $("td.checkId", $(_target).parents("tr")).text();
            window.top.topPage.showConfirmMessage(msg, function (bol) {
                if (bol) {
                    window.top.topPage.ajax({
                        url: root + '/gameApiProvider/updateProxyLine.html',
                        dataType: "json",
                        data: {"search.id": id, "proxyLine": proxyLine},
                        success: function (data) {
                            if (data.state) {
                                alert("切换成功！");
                            } else {
                                alert("切换失败！");
                                _this.query(e);
                            }
                        }
                    })
                } else {
                    $(e.currentTarget).unlock();
                }
            });
        },
        switchProxy: function (e, option) {
            var _this = this;
            _this.showConfirm(e, option, '确定切换代理线吗？')
        }
    });
});