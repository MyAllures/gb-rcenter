define(['common/BaseListPage', 'bootstrap-dialog'], function(BaseListPage,BootstrapDialog) {
    var _this ;
    return BaseListPage.extend({
        bootstrapDialog: BootstrapDialog,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            _this=this;
        },
        bindEvent:function() {
            this._super();
            $("#li_top_3").addClass("active");
        },
        /**
         * 删除验证
         * @param e
         * @param option
         */
        /**
         * OK("0","OK"),
         * ONLY("1",window.top.message.setting_auto['在展示且为唯一展示']),
         * NO_ONLY("2",window.top.message.setting_auto['当不为唯一展示时']),
         * BLANK("3",window.top.message.setting_auto['前台也一个都没有展示时']),
         */
        validateDelete:function(e,option){
            var id = option.key;
            window.top.topPage.ajax({
                url: root+"/siteCustomerService/validateDelete.html",
                dataType: 'json',
                cache: false,
                type: "get",
                data:{"id":id},
                success: function (data) {
                    if(data.state){
                        if(data.delStatus=="0"){
                            window.top.topPage.doAjax(e, option);
                        }else if(data.delStatus=="1"){
                            var msg = window.top.message.setting['siteCustomerService.Index.del.ONLY'];
                            _this.confirmMessage(e,option,msg,true);
                        }else if(data.delStatus=="2"){
                            var msg = window.top.message.setting['siteCustomerService.Index.del.NO_ONLY'];
                            _this.confirmMessage(e,option,msg,false);
                        }else{
                            //window.top.topPage.doAjax(e, option);
                            var msg = window.top.message.setting['siteCustomerService.Index.del.BLANK'];
                            _this.confirmMessage(e,option,msg,false);
                            //_this.toSetting(e,option);
                        }

                    }else{
                        window.top.topPage.showErrorMessage(data.msg);
                    }
                }
            });
            return false;
        },
        confirmMessage:function(e,option,message,bo){
            window.top.topPage.bootstrapDialog.show({
                type: BootstrapDialog.TYPE_PRIMARY,
                title: window.top.message.setting['common.message'],
                message: message,
                buttons: [{
                    label: window.top.message.setting['common.delete'],
                    action: function (dialog) {
                        window.top.topPage.doAjax(e, option);
                        dialog.close();
                    }
                }, {
                    label: window.top.message.setting['common.cancel'],
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        },
        toSetting:function(e,option){
            _this=this;
            window.top.topPage.bootstrapDialog.show({
                type: BootstrapDialog.TYPE_PRIMARY,
                title: window.top.message.setting['common.message'],
                message: window.top.message.setting['siteCustomerService.Index.del.toSetting.prompt'],
                buttons: [{
                    label: window.top.message.setting['siteCustomerService.Index.del.toSetting'],
                    action: function (dialog) {
                        $("#pic").click();
                        dialog.close();

                    }
                }, {
                    label: window.top.message.setting['common.cancel'],
                    action: function (dialog) {
                        dialog.close();
                        _this.query(e, option);
                    }
                }]
            });
            return false;
        },
        showMsg: function (e,option) {
            _this=this;
            if(option.data.state=='toSetting'){
                this.toSetting(e,option)
            }else{
                window.top.topPage.showSuccessMessage(window.top.message.setting_auto['删除成功'], function () {
                    _this.query(e, option);
                });
            }
        }
    });
});