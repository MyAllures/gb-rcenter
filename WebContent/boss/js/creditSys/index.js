/**
 * 资金管理-提现管理列表
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
        getSelectIdsArray:function(e,option)
        {
            var checkedItems = [],counter = 0;
            $("table tbody input[type=checkbox]",this.getCurrentForm(e)).not("[name=my-checkbox]").each(function(node,obj) {
                if(obj.checked) {
                    checkedItems[counter] = obj.value;
                    counter++;
                }
            });

            return checkedItems;
        },

        getSelectIds:function(e,option)
        {
            return {ids:this.getSelectIdsArray(e,option).join(",")};
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
                                            url: root + '/vSysCredit/fetchSiteId.html',
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
                                    $(_target).bootstrapSwitch("state", _target.checked);
                                    $("#status").removeClass("label-success");
                                    $("#status").addClass("label-danger");
                                })
                            }else if(!$(_target).attr("isChanged")&&state) {
                                window.top.topPage.showConfirmDynamic(window.top.message.common['msg'],"该站点将禁止转账,确认禁止吗?",okLabel, cancelLabel, function (confirm) {
                                window.top.topPage.ajax({
                                    url: root + '/vSysCredit/fetchSiteId.html',
                                    dataType: "json",
                                    data: {"result.paramValue": state, "result.siteId": payRankId,"result.paramCode":type},
                                    success: function (data) {
                                        if(data){
                                            $(_target).attr("isChanged", true);
                                            // $(_target).bootstrapSwitch("state", !_target.checked);
                                            $("#status").removeClass("label-success");
                                            $("#status").addClass("label-danger");
                                            _this.query(e);
                                        }else{
                                            page.showPopover(e,{"callback":function () {
                                                _this.query(e);
                                            }},"danger","操作失败",true);
                                        }
                                    }
                                })
                                });
                                return true;
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

    });
});