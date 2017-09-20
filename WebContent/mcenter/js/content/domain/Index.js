/**
 * Created by jeff on 15-8-14.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {

    return BaseListPage.extend({
        status:{
            'true':'._enable',
            'false':'._disabled'
        },
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click",".dropdown-menu-stop", function (event) {
                event.stopPropagation();//阻止事件向上冒泡
            });
        },
        onPageLoad: function () {
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
                    var msg="";
                    if(status){
                       msg=window.top.message.content['sysdomain.showConfirmMessage.on'];
                    }else{
                        msg=window.top.message.content['sysdomain.showConfirmMessage.off'];
                    }
                    var message = status ? window.top.message.setting['rakeback.list.StatusUsing'] : window.top.message.setting['rakeback.list.StatusStop']

                    window.top.topPage.showConfirmMessage( msg , function( bol ){

                        if( bol ){
                            //ajax
                            var _show = status.toString();
                            var _hide = (!status).toString();
                            var $parent_tr = $($this).parents('tr');
                            _show = _this.status[_show];
                            _hide = _this.status[_hide];
                            window.top.topPage.ajax({
                                type: "POST",
                                url: root+"/content/sysDomain/changeStatus.html",
                                data:{'result.isEnable':status,'result.id':$(event.currentTarget).val()},
                                error: function (request) {
                                },
                                success: function (data) {
                                    $this.bootstrapSwitch('state', status,true);
                                    var data = eval('('+data+')')
                                    if(data.state){
                                        $this.bootstrapSwitch('state', status,true);
                                        $(_show,$parent_tr).removeClass('hide');
                                        $(_hide,$parent_tr).addClass('hide');
                                    }
                                }
                            });
                            //success
                        } else {
                            /*取消不确定状态*/
                            $this.bootstrapSwitch('indeterminate',false);
                            /*第三个参数为true 不会进入change事件*/
                            $this.bootstrapSwitch('state', !status,true);
                        }
                    });
                });
        },
        /**
         * 替换ids
         * @param e
         * @param opt
         * @returns {boolean}
         */
        replaceIds:function(e,opt){
            var ids =  this.getSelectIdsArray(e).join(",");
            opt.target =  opt.target.replace('{ids}',ids);
            return true;
        },
        deleteDomain:function(e,p){
            var confirmMessage,message_key;
            var that = this;
            message_key = !!$('.domain_enable:checked').length ? 'domain.deleteEnable' : 'domain.delete';
            confirmMessage = message.content[message_key];
            //this.query()
            window.top.topPage.showConfirmMessage(confirmMessage,function(b){
                if(b){
                    that.replaceIds(e,p);
                    window.top.topPage.doAjax(e,p);
                }else{
                    $(e.currentTarget).unlock();
                }
            });
            return false;
        },
        //解绑
        resolveConfirmMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['sysdomain.showConfirmMessage.resolve']);
        },
        //删除
        deleteMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['sysdomain.showConfirmMessage.delete']);
        },
        //取消
        cancelMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['sysdomain.showConfirmMessage.cancel.resolve']);
        },
        showConfirm: function (e,option,msg) {
            window.top.topPage.showConfirmMessage( msg , function( bol ){
                if(bol){
                    window.top.topPage.doAjax(e,option);
                }else{
                    $(e.currentTarget).unlock();
                }
            });
        } ,
        viewPrompt: function (e) {
            window.top.topPage.showSuccessMessage(window.top.message.content['sysdomain.agent.success'],this.closePage());

        },
    });
});