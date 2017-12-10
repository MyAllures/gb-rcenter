define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,Bootstrapswitch) {
    var _this ;
    return BaseListPage.extend({
        bootstrapswitch: Bootstrapswitch,
        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]')
                .bootstrapSwitch(
                    {
                        onText: '开启',
                        offText: '关闭',
                    }
                ).on('switchChange.bootstrapSwitch',function( event , status ){
                    var $this = $(this);
                    var id = $this.attr('apiId');
                    var _msgTitle;
                    $this.bootstrapSwitch('indeterminate',true);
                    if (status) {
                        _msgTitle="<h3 class='al-center'>确认继续开启转账吗?</h3>";
                    } else {
                        _msgTitle="<h3 class='al-center'>确认继续关闭转账吗?</h3>";
                    }
                    window.top.topPage.showConfirmDynamic("消息",_msgTitle,"确认","取消",function (confirm) {
                        if(confirm){
                            _this._changetransferState(event, event.currentTarget, confirm, id, status);
                            $this.bootstrapSwitch('indeterminate',false);
                        }else{
                            $this.bootstrapSwitch('indeterminate',false);
                            $this.bootstrapSwitch('state', !status,true);
                        }
                    })

                });

        },

        _changetransferState: function (e, _target, confirm, id, transferable) {
            var _this=this;
            if (confirm) {
                window.top.topPage.ajax({
                    url: root + "/api/changeTransfer.html",
                    type: "post",
                    dataType: "json",
                    data: {"result.id": id, "result.transferable": transferable},
                    success: function (data) {
                        if (data.state) {
                            $(_target).siblings('input').bootstrapSwitch('disabled', false);
                            $(_target).siblings('input').bootstrapSwitch('state', transferable);
                            $(_target).siblings('input').bootstrapSwitch('disabled', true);
                            $(_target).siblings('input').attr('transferable', transferable);
                        }
                    }
                });
            }
        },
        
        bindEvent : function() {
            this._super();
            var _this = this;

        },
        nextStep: function (e) {
            this.closePage();
            var url = root + '/cttDraft/editContent.html';
            $('.panel-default', window.parent.document).load(url, function () {

            });
        },
        myCallBack:function(e,btnOption){
            //opt.data.result.systemStatus
            if(e.returnValue!=null){
                var returnValue = e.returnValue;
                if(returnValue==true){
                    window.top.topPage.showSuccessMessage(window.top.message.common['operation.success'],function(){
                        window.top.page.query(e,btnOption);
                    });
                }else{
                    if(returnValue.indexOf("toSetScheme")>-1){
                        var param = e.returnValue.split("?");
                        if(param.length==2){
                            $("#tot").attr('href','/vContractScheme/list.html?'+param[1]);
                        }else{
                            $("#tot").attr('href','/vContractScheme/list.html');
                        }
                        //if(e.returnValue=="toSetScheme"){

                        $("#tot").click();
                    }else if(e.returnValue=="fromDisable"){
                        var msg = window.top.message.serve['apiManage.disableSuccess'];
                        window.top.topPage.showConfirmDynamic(window.top.message.common['manage'],msg,
                            window.top.message.common['OK'],window.top.message.common['cancel'], function (state) {
                                if(state){
                                    window.top.page.query(e,btnOption);
                                }
                            });
                    }
                }
            }else{

            }
        },
        turnOnTransfer:function(e){
            var top = window.top.topPage;
            top.ajax({
                url:root+"/api/changeAllTransfer.html?t="+new Date().getTime,
                type: "post",
                dataType: "json",
                data: {"result.transferable": true},
                success:function(data){
                    if(data==true){
                        top.showPage();
                    }else{
                        window.top.topPage.showErrorMessage("开启失败")
                    }
                    $(e.currentTarget).unlock();
                },
                error:function (error) {
                    $(e.currentTarget).unlock();
                }
            })
        },
        turnOffTransfer:function(e){
            var top = window.top.topPage;
            top.ajax({
                url:root+"/api/changeAllTransfer.html?t="+new Date().getTime,
                type: "post",
                dataType: "json",
                data: {"result.transferable": false},
                success:function(data){
                    if(data==true){
                        top.showPage();
                    }else{
                        window.top.topPage.showErrorMessage("开启失败")
                    }
                    $(e.currentTarget).unlock();
                },
                error:function (error) {
                    $(e.currentTarget).unlock();
                }
            })
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
