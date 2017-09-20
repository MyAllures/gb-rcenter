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
            /**
             * 层级dropdown 异步获取数据
             */
            $('#domain_rank').on('show.bs.dropdown', function (e) {
                var $this = $(e.currentTarget);
                if($this.data().load){
                    window.top.topPage.ajax({
                        url:root+'/content/sysDomain/getRanks.html',
                        success:function(html){
                            $this.data('load',false);
                            $("#domain_rank_list").html(html);
                        }
                    })
                }
            });
            /**
             * 层级下拉 阻止事件
             */
            $("#domain_rank_list").on("click",function(e){
                e.stopPropagation();
            });
            $(this.formSelector).on("change","#searchType", function () {
                 var val=$(this).val();
                $("#searchInput").attr("name",val);
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
                        msg=window.top.message.content['sysdomain.showConfirmMessage.agent.off'];
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
        /**
         * 重置层级 数据
         * @param e
         * @param p
         * @returns {{ids: *, rankIds: string}}
         */
        domainRankReset:function(e,p){
            var ids = this.getSelectIds(e).ids;
            var rankIds = [];
            $('#domain_rank_list input[type=checkbox][name=rankId]:checked').each(function(index,obj){
                var $obj = $(obj);
                rankIds.push($obj.val());
            });
            return {'ids':ids,'rankIds':rankIds.join(',')};
        },
        /**
         * 重置层级判断有选中 层级&&列表数据有选中
         * @param e
         * @param p
         * @returns {boolean}
         */
        beforeResetRank:function(e,p){
            return  !!this.getSelectIds(e).ids.length && !!$('#domain_rank_list input[type=checkbox][name=rankId]:checked').length;
        },
        /**
         * 重置层级回调函数
         * @param e
         * @param p
         */
        resetRankCallback:function(e,p){
            this.query(e);
            $('#domain_rank_list input[type=checkbox][name=rankId]:checked').prop('checked',false)
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
            this.showConfirm(e,option,window.top.message.content['sysdomain.showConfirmMessage.agent.resolve']);
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
        }
    });
});