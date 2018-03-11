/**
 * Created by snekey on 15-8-20.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this.formSelector="form";
            this._super();
        },
        onPageLoad:function () {
            this._super();
            this.initSwitch();
        },
        bindEvent: function () {
            this._super();
            //回车提交
            this.enterSubmit(".enter-submit");
        },
        getSelectIds:function(e,option)
        {
            return {'search.uuidCodes':this.getSelectIdsArray(e,option).join(",")};
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
                    var message = status ? window.top.message.setting['cttAnnouncement.displayOpen'] : window.top.message.setting['cttAnnouncement.displayClose']

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
                url:root+'/cttAnnouncement/changeStatus.html',
                type:'POST',
                dataType:'json',
                data:{
                    'result.display':e.status,
                    'result.id':$this.val(),
                    'result.announcementType':$this.attr('announcementType')
                },
                eventCall:function(opt){
                    _this.doChange(opt);
                },
                eventTarget : {currentTarget: $this[0], status: e.status},
                success:function(){
                    /*取消不确定状态*/
                    $this.bootstrapSwitch('indeterminate',false);
                    $("[title='search']").click();
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
    })
})
