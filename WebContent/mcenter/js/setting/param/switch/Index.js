define(['common/BaseListPage', 'bootstrap-dialog'], function(BaseListPage) {
    var _this ;
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            _this=this;
        },
        onPageLoad: function () {
            _this=this;
            this._super();

            //显示与隐藏按钮
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                {
                    onSwitchChange: function(e,state) {
                        var _target = e.currentTarget;
                        var id = $(_target).attr("id");
                        var paramCode = $(_target).attr("paramCode");
                        var paramType = $(_target).attr("paramType");
                        var title = _this.getMsg(paramCode,state,paramType,1);
                        var _msg = _this.getMsg(paramCode,state,paramType,2);
                        var okLabel = window.top.message.setting['common.ok'];
                        var cancelLabel=window.top.message.setting['common.cancel'];
                        if(!state){
                            okLabel=window.top.message.setting['common.continue.close'];
                        }
                        if(!$(_target).attr("isChanged")) {
                            window.top.topPage.showConfirmDynamic(title,_msg,okLabel,cancelLabel, function (confirm) {
                                if(confirm){
                                    if(paramCode=='deposit' && !state){//存款稽核
                                        _msg=window.top.message.setting['system_settings.deposit.close'];
                                        window.top.topPage.showConfirmDynamic(title,_msg,window.top.message.setting['common.ok'],cancelLabel, function (confirm) {
                                            if(confirm){
                                                _this.saveSwitch(id,state,_target);
                                            }
                                        });
                                    }else if((paramCode=='player'||paramCode=='proxy'||paramCode=='closure'||paramCode=='points'||paramCode=='mall'||paramCode=='level')&& !state){//玩家注册
                                        window.top.topPage.doDialog(e,{
                                            target:root + "/param/closeReminder.html?id="+id,
                                            text:title,
                                            callback:function(e,opt){
                                                if(e.returnValue=='1'){
                                                    //$(_target).attr("isChanged", true);
                                                    //$(_target).bootstrapSwitch("state", !_target.checked);
                                                    _this.saveSwitch(id,state,_target);
                                                }else if(e.returnValue=='2'){
                                                    $("#massInformation").click();
                                                }
                                            }
                                        })
                                    }else{
                                        _this.saveSwitch(id,state,_target);
                                    }
                                }
                            });
                        }
                        else{
                            $(_target).removeAttr("isChanged");
                            return true;
                        }
                        return false;
                    }
                }
            );
        },
        bindEvent:function() {
            this._super();
            $("#li_top_4").addClass("active");
        },
        /**
         * 获取标题或提示信息
         * @param paramCode
         * @param state
         * @param type
         * @returns {string}
         */
        getMsg:function(paramCode,state,paramType,type){
            var msg = '';
            var title='';
            var t1 = paramType+'.open.title.'+paramCode;
            var t2 = paramType+'.open.msg.'+paramCode;
            var t3 = paramType+'.close.title.'+paramCode;
            var t4 = paramType+'.close.msg.'+paramCode;
            if(type==1){
                if(state){//开启
                    title=window.top.message.setting[t1];
                }else{
                    title=window.top.message.setting[t3];
                }
                return title;
            }else{
                if(state){//开启
                    msg=window.top.message.setting[t2];
                }else{
                    msg=window.top.message.setting[t4];
                }
                return msg;
            }
        },
        saveSwitch:function(id,state,_target){
            window.top.topPage.ajax({
                url: root + "/param/saveSwitch.html",
                dataType: 'json',
                cache: false,
                type: "get",
                data: {"id": id,state:state},
                success: function (data) {
                    if(data.state){
                        $(_target).attr("isChanged", true);
                        $(_target).bootstrapSwitch("state", !_target.checked);
                    }else{
                        window.top.topPage.showErrorMessage(data.msg);
                    }
                }
            });
        },


    });
});