define(['common/BaseListPage','bootstrapswitch'], function(BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.initBootstrapSwitch();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            //回车提交
            this.enterSubmit(".enter-submit");

            $("#searchtext").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });
        },
        /**
         * 初始化 BootstrapSwitch
         */
        initBootstrapSwitch:function(){
            var that = this;
            var $my_checkbox = $(this.formSelector + " input[name='my-checkbox']");
            /*switch 插件事件*/
            that.unInitSwitch($my_checkbox)
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function(event, state) {
                    var $this = $(this);
                    var canAddSubAgent = $(event.currentTarget).val();
                    $this.bootstrapSwitch('indeterminate',true);
                    if(state){
                        var openMsg = window.top.message.common_auto['role.agent.addSubAgent.open'];
                        window.top.topPage.showConfirmMessage(openMsg,function (bol) {
                            if(bol){
                                $this.bootstrapSwitch('state', state,true);
                                that.changeStatus(state,event,$this);
                            }else{
                                $this.bootstrapSwitch('state', !state,true);
                            }
                        });
                    }else{
                        var closeMsg = window.top.message.common_auto['role.agent.addSubAgent.close'];
                        window.top.topPage.showConfirmMessage(closeMsg,function (bol) {
                            if(bol){
                                $this.bootstrapSwitch('state', state,true);
                                that.changeStatus(state,event,$this);
                            }else{
                                $this.bootstrapSwitch('state', !state,true);
                            }
                        });
                    }


                });
        },
        changeStatus:function (state,event,$this) {
            var that = this;
            window.top.topPage.ajax({
                type: "POST",
                url: root+"/userAgent/changeAddSubAgent.html",
                data:{'result.addSubAgent':state,'result.id':$(event.currentTarget).attr("agentId")},
                dataType:'json',
                error: function (request) {
                    $this.bootstrapSwitch('state', !state,true);
                },
                success: function (data) {
                    if(data.state == true){
                        that.query(event);
                    }else{
                        $this.bootstrapSwitch('state', !state,true);
                    }
                }
            });
        },
    });

});