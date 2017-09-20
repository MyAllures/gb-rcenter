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
            this.formSelector = "#mainFrame form";
            this._super();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },

        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
            //选项卡切换
            $(".tabList li").each(function(index){
                $(this).on("click",function(){
                    var tabindex = $(this).attr("index");
                   $(".tab"+tabindex).removeClass("tabbox");
                   $(".tab"+tabindex).css("display","block");
                   $(".tab"+tabindex).find("ul li").removeClass("active");
                   $(".tab"+tabindex).find("ul li").eq(tabindex).addClass("active");
                   $(".tabbox").css("display","none");
                   $(".tab"+tabindex).addClass("tabbox");
                })
            });
            //显示与隐藏按钮
            var $bootstrapSwitch = $("input[type='checkbox'][name='my-checkbox']")
                .bootstrapSwitch(
                {
                    onText: '启用',
                    offText: '停用'
                }
            ).on('switchChange.bootstrapSwitch',function( event , status ){
                    var $this = $(this);
                    var id = $this.attr('bid');
                    var _states = $this.attr('states');
                    $this.bootstrapSwitch('indeterminate',true);
                    _msg  ="停用后，该支付接口下的收款账户将无法使用，站长也无法添加该支付接口的收款账户！";
                    if (status) {
                        _msgTitle="<h3 class='al-center'>确认启用吗?</h3><div class='al-center'>启用后，该支付接口下的收款账户将恢复正常使用！</div>";
                    } else {
                        _msgTitle="<h3 class='al-center'>请谨慎操作！</h3><div class='al-center'>"+_msg+"</div>";
                    }
                    window.top.topPage.showConfirmDynamic("消息",_msgTitle,"确认","取消",function (confirm) {
                        if(confirm){
                            _this._changeDisplayState({currentTarget:$this[0],status:status,returnValue:true}, event.currentTarget, confirm, id, status);
                            $this.bootstrapSwitch('indeterminate',false);
                        }else{
                            $this.bootstrapSwitch('indeterminate',false);
                            $this.bootstrapSwitch('state', !status,true);
                        }
                    })

                });

        },
        //删除
        deleteMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['pay.delete']);
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
         * 执行查询
         * @param event         事件对象
         */
        queryByType : function(event,option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            var type=option.type;
            $("#searchType").val(type);
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        $(event.currentTarget).siblings().removeClass("ssc-active");
                        $(event.currentTarget).addClass("ssc-active");
                        var $result=$(".search-list-container",$form);
                        $result.html(data);
                        event.page.onPageLoad();
                        event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
        },
        _changeDisplayState: function (e, _target, confirm, id, isUse) {
            var _this=this;
            var $this = $(e.currentTarget);
            var url;
            /*置为不确定状态*/
            if(e.returnValue!=true){
                $this.bootstrapSwitch('indeterminate', false);
                $this.bootstrapSwitch('state', !e.status, true);
                return;
            }
            if(e.status){
                url = "/payApi/changeUseStatusUnuseSecurityPwd.html";
            }else{
                url = "/payApi/changeUseStatus.html"
            }
            if (confirm) {
                window.top.topPage.ajax({
                    url: root + url,
                    type: "post",
                    dataType: "json",
                    data: {"result.id": id, "result.isUse": isUse},
                    eventCall:function(opt){
                        _this._changeDisplayState(opt);
                    },
                    eventTarget : {currentTarget: $this[0], status: e.status},
                    success: function (data) {
                        if (data.state) {
                            $(_target).siblings('input').bootstrapSwitch('disabled', false);
                            $(_target).siblings('input').bootstrapSwitch('state', isUse);
                            $(_target).siblings('input').bootstrapSwitch('disabled', true);
                            //window.top.page.query({currentTarget:e.currentTarget,page:_this});
                        }
                    },
                    error: function (event) {
                        if(event.status==601) {//需要权限密码验证

                        }else {
                            /*取消不确定状态*/
                            $this.bootstrapSwitch('indeterminate', false);
                            /*将状态置回*/
                            $this.bootstrapSwitch('state', !e.status, true);
                        }
                    }
                });
            }
        }


    });
});