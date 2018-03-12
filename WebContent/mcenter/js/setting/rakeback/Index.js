/**
 * Created by jeff on 15-9-17.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {

    return BaseListPage.extend({
        init:function () {
            this._super();
        },
        bindEvent:function () {
            this._super();
            //回车提交
            this.enterSubmit("._enter_submit");
        },
        onPageLoad:function () {
            this._super();
            this.initSwitch();
        },
        /**
         * 初始化开关
         */
        initSwitch:function(){
            var _this=this;
            /*所有开关页面*/
            var $switch = $(_this.formSelector + " input[name='my-checkbox']")
            /*
             * 开关改变状态事件
             * */
            _this.unInitSwitch($switch)
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch',function( event , status ){
                    var $this = $(this);
                    $this.bootstrapSwitch('indeterminate',true);
                    /*提示信息*/
                    var message = status ? window.top.message.setting['rakeback.list.StatusUsing'] : window.top.message.setting['rakeback.list.StatusStop']

                    window.top.topPage.showConfirmMessage( message , function( bol ){

                        if( bol ){
                            _this.doChange({currentTarget:$this[0],status:status,returnValue:true});
                        } else {
                            /*取消不确定状态*/
                            $this.bootstrapSwitch('indeterminate',false);
                            /*第三个参数为true 不会进入change事件*/
                            $this.bootstrapSwitch('state', !status,true);
                        }
                    });
                });
        },
        doChange:function(e){
            var _this=this;
            var $this= $(e.currentTarget);
            if(e.returnValue!=true){
                $this.bootstrapSwitch('indeterminate', false);
                $this.bootstrapSwitch('state', !e.status, true);
                return;
            }
            /*置为不确定状态*/

            window.top.topPage.ajax({
                url:root+'/setting/rakebackSet/changeStatus.html',
                type:'POST',
                dataType:'json',
                data:{
                    'result.status':Number(e.status),
                    'result.id':$this.val()
                },
                eventCall:function(opt){
                    _this.doChange(opt);
                },
                eventTarget : {currentTarget: $this[0], status: e.status},
                success:function(){

                    /*取消不确定状态*/
                    $this.bootstrapSwitch('indeterminate',false);

                    /*状态td*/
                    var $_status = $('._status',$this.parents('tr'));
                    /*改变状态*/
                    var data = eval('('+$_status.data('value'+Number(e.status)+"")+')');

                    $_status.text(data.value);
                    $_status.removeClass('co-red');
                    $_status.addClass(data.class&&data.class);

                },
                error:function(event, xhr, settings){
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
    });
});