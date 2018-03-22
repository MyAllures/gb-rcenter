/**
 * 买分——大额监控
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,bootstrapswitch) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },
        getSiteIds:function(e,option)
        {
            var siteIds;
            $("table tbody input[type=checkbox]",this.getCurrentForm(e)).not("[name=my-checkbox]").each(function(node,obj) {
                if(obj.checked) {
                    siteIds = obj.value + ',';
                }
            });

        },
        editDefultProfit:function(e,option){
            var siteIds = this.getSelectIdsArray(e);
            window.top.topPage.doDialog({page:this},{text:"默认额度管理",target: root + "/vSysCredit/editDefaultProfit.html?siteIds="+siteIds,callback:"query"});
            $(e.currentTarget).unlock();
        },
        editMaxProfit:function(e,option){
            var siteIds = this.getSelectIdsArray(e);
            window.top.topPage.doDialog({page:this},{text:"额度上限管理",target: root + "/vSysCredit/editMaxProfit.html?siteIds="+siteIds,callback:"query"});
            $(e.currentTarget).unlock();
        },
        creditLine:function(e,option){
            var siteIds = this.getSelectIdsArray(e);
            window.top.topPage.doDialog({page:this},{text:"授信额度管理",target: root + "/vSysCredit/creditLine.html?siteIds="+siteIds,callback:"query"});
            $(e.currentTarget).unlock();
        },

        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('a.needLock').addClass('disabled').lock();
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
            $(".tab-pane").css("display","block");
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                    {
                        onText: "开启",
                        offText: "关闭",
                        onSwitchChange: function (e, state) {
                            var _target = e.currentTarget;
                            var payRankId = $(_target).attr("payRankId");
                            var type=$(_target).attr("mold");
                            var msg="";
                            if(type=="disable_transfer"){
                                msg="该站点将开启转账,确认开启吗？"
                            }
                            var okLabel = window.top.message.setting['common.ok'];
                            var cancelLabel = window.top.message.setting['common.cancel'];
                            if (!$(_target).attr("isChanged")&&!state) {
                                window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                                    console.log(1);
                                    if (confirm && !$(_target).attr("isChanged")) {
                                        window.top.topPage.ajax({
                                            url: root + '/vSysCredit/transferSwitch.html',
                                            dataType: "json",
                                            data: {"result.paramValue": state, "result.siteId": payRankId,"result.paramCode":type},
                                            success: function (data) {
                                                if(data){
                                                    $(_target).attr("isChanged", true);
                                                    $(_target).bootstrapSwitch("state", _target.checked);
                                                    $("#status").removeClass("label-success");
                                                    $("#status").addClass("label-danger");
                                                    _this.query(e);
                                                }else{
                                                    page.showPopover(e,{"callback":function () {
                                                        _this.query(e);
                                                    }},"danger","操作失败",true);
                                                }

                                            }
                                        });
                                    }
                                })
                            }else if(!$(_target).attr("isChanged")&&state) {
                                window.top.topPage.showConfirmDynamic(window.top.message.common['msg'],"该站点将禁止转账,确认禁止吗?",okLabel, cancelLabel, function (confirm) {
                                    if (confirm && !$(_target).attr("isChanged")) {
                                        window.top.topPage.ajax({
                                            url: root + '/vSysCredit/transferSwitch.html',
                                            dataType: "json",
                                            data: {
                                                "result.paramValue": state,
                                                "result.siteId": payRankId,
                                                "result.paramCode": type
                                            },
                                            success: function (data) {
                                                if (data) {
                                                    $(_target).attr("isChanged", true);
                                                    $(_target).bootstrapSwitch("state", _target.checked);
                                                    $("#status").removeClass("label-success");
                                                    $("#status").addClass("label-danger");
                                                    _this.query(e);
                                                } else {
                                                    page.showPopover(e, {
                                                        "callback": function () {
                                                            _this.query(e);
                                                        }
                                                    }, "danger", "操作失败", true);
                                                }
                                            }
                                        })
                                    }
                                });
                            }
                            else if($(_target).attr("isChanged")){
                                $(_target).removeAttr("isChanged");
                                return true;
                            }
                            return false;
                        }
                    });
        },
        //成功
        successMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['is.handle.success']);
        },
        failMessage: function (e,option){
            this.showConfirm(e,option,window.top.message.content['is.handle.fail']);
        },
        showConfirm: function (e,option,msg) {
            window.top.topPage.showConfirmMessage( msg , function( bol ){
                if(bol){
                    window.top.topPage.doAjax(e,option);
                }else{
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        }
    });
});
