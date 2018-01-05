/*define(['common/BaseListPage'], function(BaseListPage) {*/
define(['common/BaseListPage','bootstrapswitch'], function(BaseListPage,Bootstrapswitch) {
    var _this=this;
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame #paramFrom";
            this._super("formSelector");
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var _this = this;
            $(".tab-pane").css("display","block");
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var id = $(_target).attr("sysParamId");
                        var module = $(_target).attr("module");
                        var paramType = $(_target).attr("paramType");
                        var siteId = $("#siteId").val();
                        var paramCode=$(_target).attr("paramCode");
                        var msg=state?"确认开启":"确认关闭吗？";
                        if (!$(_target).attr("isChanged")) {
                            var okLabel = window.top.message.setting['common.ok'];
                            var cancelLabel = window.top.message.setting['common.cancel'];
                            window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                window.top.topPage.ajax({
                                    url: root + '/site/detail/updateSysParamActive.html',
                                    dataType: "json",
                                    data: {"result.active": state, "result.siteId": siteId, "result.id": id,"result.paramCode":paramCode,"result.module":module,"result.paramType":paramType},
                                    success: function (data) {
                                        if (data.state) {
                                            page.showPopover(e, {
                                                "callback": function () {
                                                    _this.query(e);
                                                }
                                            }, "success",data.msg, true);
                                        } else {
                                            page.showPopover(e, {
                                                "callback": function () {
                                                    _this.query(e);
                                                }
                                            }, "danger",data.msg, true);
                                        }
                                    }
                                });
                                return true;
                            })
                        }
                    }
                });
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        }

    });
});