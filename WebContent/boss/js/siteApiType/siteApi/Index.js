/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            _this.initSwitch();
        },

        toSiteApiRecord:function(e,opt){
            var siteApiId = opt.siteApiId;
            $("#tot").attr('href','/report/operate/fromGameManage.html?search.apiId='+siteApiId);
            $("#tot").click();
        },

        initSwitch:function() {
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var siteId = $(_target).attr("siteId");
                        var apiId = $(_target).attr("apiId");
                        var msg = state ? "确认启用吗？" : "确认禁用吗？";
                        if (!$(_target).attr("isChanged")) {
                            var okLabel = window.top.message.setting['common.ok'];
                            var cancelLabel = window.top.message.setting['common.cancel'];
                            window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                if (confirm && !$(_target).attr("isChanged")) {
                                    window.top.topPage.ajax({
                                        url: root + '/vSiteApiTypeRelation/updateOwnIcon.html',
                                        dataType: "json",
                                        data: {
                                            "search.ownIcon":state,
                                            "search.siteId": siteId,
                                            "search.apiId": apiId,
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
    })
})
