define(['common/BaseEditPage','bootstrapswitch'], function(BaseEditPage) {
    var _this=this;
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = " #mainFrame  #viewSiteBasicForm";
            this._super();
            $(".tab-content > .tab-pane").css("display","block");
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
            this.cdnSwitch();
            this.selectValue();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $("#cdnUrlSelected").change(function () {
                _this.selectValue();
            });

        },
        /**
         * cdn开关
         */
        cdnSwitch:function () {
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var $this = $(this);
                        var _target = e.currentTarget;
                        var id = $(_target).attr("sysParamId");
                        var module = $(_target).attr("module");
                        var paramType = $(_target).attr("paramType");
                        var siteId = $("#siteId").val();
                        var paramCode=$(_target).attr("paramCode");
                        var msg=state?"确认开启":"确认关闭吗？";
                        var paramValue= $(_target).attr("paramValue");
                        $this.bootstrapSwitch('indeterminate', true);
                        if (!$(_target).attr("isChanged")) {
                            window.top.topPage.showConfirmMessage(msg, function (confirm) {
                                if (confirm) {
                                    window.top.topPage.ajax({
                                        url: root + '/site/detail/updateParamValue.html',
                                        dataType: "json",
                                        data: {
                                            "result.paramValue": state,
                                            "result.siteId": siteId,
                                            "result.id": id,
                                            "result.paramCode": paramCode,
                                            "result.module": module,
                                            "result.paramType": paramType
                                        },
                                        success: function (data) {
                                            if (data.state) {
                                                page.showPopover(e, {}, "success", data.msg, true);
                                            } else {
                                                page.showPopover(e, {}, "danger", data.msg, true);
                                            }
                                        }
                                    });
                                    $this.bootstrapSwitch('indeterminate', false);
                                } else {
                                    $this.bootstrapSwitch('indeterminate', false);
                                    $this.bootstrapSwitch('state', !state, true);
                                }
                            })
                        }else {
                            $(_target).removeAttr("isChanged");
                            return true;
                        }
                    }
                });
        },
        selectValue:function () {
            var cdnUrlValue=$("#cdnUrlSelected").val();
            $("#cdnUrlValue").val(cdnUrlValue);
        },
        /**
         * 更新cdn url
         */
        updateCdnUrl:function (e) {
            var _this=this;
            var siteId = $("#siteId").val();
            var id = $("#cdnUrlValue").attr("sysParamId");
            var module = $("#cdnUrlValue").attr("module");
            var paramType = $("#cdnUrlValue").attr("paramType");
            var paramCode=$("#cdnUrlValue").attr("paramCode");
            var paramValue= $("#cdnUrlValue").val();
            if (paramValue==null||paramValue==""){
                page.showPopover(e,{},"warning","CDN URL不能为空",true);
                $(e.currentTarget).unlock();
                return;
            }
            window.top.topPage.ajax({
                url: root + '/site/detail/updateCdnUrl.html',
                dataType: "json",
                data: {
                    "result.siteId": siteId,
                    "result.id": id,
                    "result.paramCode": paramCode,
                    "result.module": module,
                    "result.paramType": paramType,
                    "result.paramValue": paramValue
                },
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e,{},"success","保存成功",true);
                    } else {
                        page.showPopover(e,{},"warning","保存失败",true);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        }
    });
});