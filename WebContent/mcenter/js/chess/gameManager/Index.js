/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage', 'bootstrapswitch'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.initSwitch();
        },

        myCallBack: function (e, opt) {
            var _this = this;
            if (opt.data.state) {
                window.topPage.showSuccessMessage(window.top.message.common['operation.success'], function (state) {
                    if (state) {
                        _this.callBackQuery(e);
                    }
                });
            } else {
                window.topPage.showErrorMessage(window.top.message.common['operation.fail'], function (state) {
                    if (state) {
                        _this.callBackQuery(e);
                    }
                });
            }
            $(e.currentTarget).unlock();

        },

        initSwitch: function () {
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var siteId = $(_target).attr("siteId");
                        var gameId = $(_target).attr("gameId");
                        var apiId = $(_target).attr("apiId");
                        var apiTypeId = $(_target).attr("apiTypeId");
                        var msg = state ? "确认启用吗？" : "确认停用吗？" + '<br><span class="m-l co-grayc2">' + "(停用后该游戏将在前端隐藏，同时玩家无法再往停用游戏里转账！)" + '</span>';
                        if (!$(_target).attr("isChanged")) {
                            var okLabel = window.top.message.setting['common.ok'];
                            var cancelLabel = window.top.message.setting['common.cancel'];
                            window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                if (confirm && !$(_target).attr("isChanged")) {
                                    window.top.topPage.ajax({
                                        url: root + '/chessSiteGame/updateStatus.html',
                                        dataType: "json",
                                        data: {
                                            "search.status": state ? "normal" : "disable",
                                            "search.siteId": siteId,
                                            "search.gameId": gameId,
                                            "search.apiId": apiId,
                                            "search.apiTypeId": apiTypeId
                                        },
                                        success: function (data) {
                                            if (data.state) {
                                                page.showPopover(e, {
                                                    "callback": function () {
                                                        _this.query(e);
                                                    }
                                                }, "success", data.msg, true);
                                            } else {
                                                page.showPopover(e, {
                                                    "callback": function () {
                                                        _this.query(e);
                                                    }
                                                }, "danger", data.msg, true);
                                            }
                                        }
                                    });
                                }
                                return true;
                            })
                        } else if ($(_target).attr("isChanged")) {
                            $(_target).removeAttr("isChanged");
                            return true;
                        }
                        return false;
                    }
                });
        }
    });
});
