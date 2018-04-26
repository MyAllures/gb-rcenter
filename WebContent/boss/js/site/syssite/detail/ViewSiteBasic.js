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
            // this.selectValue();
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
                        // $this.bootstrapSwitch('indeterminate', true);
                        if (!$(_target).attr("isChanged")) {
                            $("#cdnSwitchState").val(state);
                        }else {
                            $(_target).removeAttr("isChanged");
                            return false;
                        }
                    }
                });
        },

        selectValue:function () {
            var cdnUrlValue=$("#cdnUrlSelected").val();
            $("#cdnUrlValue").val(cdnUrlValue);
        },

        /**
         * 更新cdn url和开关
         */
        updateCdnParam:function (e) {
            var _this=this;
            //开关参数
            var id = $("#cdnSwitch").attr("sysParamId");
            var module = $("#cdnSwitch").attr("module");
            var paramType = $("#cdnSwitch").attr("paramType");
            var siteId = $("#siteId").val();
            var paramCode=$("#cdnSwitch").attr("paramCode");
            var state = $("#cdnSwitchState").val();
            var paramValue= state;

            //url参数
            var url_siteId = $("#siteId").val();
            var url_id = $("#cdnUrlValue").attr("sysParamId");
            var url_module = $("#cdnUrlValue").attr("module");
            var url_paramType = $("#cdnUrlValue").attr("paramType");
            var url_paramCode=$("#cdnUrlValue").attr("paramCode");
            var url_paramValue= $("#cdnUrlValue").val();
            var cdnSwitchState=$("#cdnSwitchState").val();
            if (cdnSwitchState=='true'){
                if (url_paramValue==null||url_paramValue==""){
                    page.showPopover(e,{},"warning","CDN URL不能为空",true);
                    $(e.currentTarget).unlock();
                    return;
                }
            }
            window.top.topPage.ajax({
                url: root + '/site/detail/updateCdnParam.html',
                dataType: "json",
                data: {
                    "search.siteId": siteId,
                    "search.id": id,
                    "search.paramCode": paramCode,
                    "search.module": module,
                    "search.paramType": paramType,
                    "search.paramValue": paramValue,
                    "result.siteId": url_siteId,
                    "result.id": url_id,
                    "result.paramCode": url_paramCode,
                    "result.module": url_module,
                    "result.paramType": url_paramType,
                    "result.paramValue": url_paramValue
                },
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e,{},"success","保存成功",true);
                    } else {
                        page.showPopover(e,{},"warning","保存失败",true);
                    }
                    $(e.currentTarget).unlock();
                },error:function () {
                    $(e.currentTarget).unlock();
                }

            });
            $(e.currentTarget).unlock();
        },
    });
});