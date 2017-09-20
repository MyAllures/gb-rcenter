/**
 * Created by jeff on 15-7-30.
 */
define(['common/BaseListPage','nestable','curl/curl/plugin/json','bootstrapswitch'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this._super();

        },
        bindEvent: function () {
            var that = this;
            this._super();
            //$("img[data-src]").nanoGallery('destroy');
        },
        onPageLoad: function () {
            this._super();
            this.initBootstrapSwitch();

            //this.initNestable();
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
                    var useStatus = $(event.currentTarget).attr("useStatus");
                    $this.bootstrapSwitch('indeterminate',true);
                    if(state){
                        window.top.topPage.showConfirmMessage(window.top.message.carousel['carousel.display.on.showfront'],function (bol) {
                            if(bol){
                                $this.bootstrapSwitch('state', state,true);
                                that.changeStatus(state,event);
                            }else{
                                $this.bootstrapSwitch('state', !state,true);
                            }
                        });
                    }else{
                        if(useStatus=='wait'){
                            window.top.topPage.showConfirmMessage(window.top.message.carousel["carousel.display.off.wait"],function (bol) {
                                if(bol){
                                    $this.bootstrapSwitch('state', state,true);
                                    that.changeStatus(state,event);
                                }else{
                                    $this.bootstrapSwitch('state', !state,true);
                                }
                            });
                        }else if(useStatus=='using'){
                            window.top.topPage.showConfirmMessage(window.top.message.carousel["carousel.display.off.using"],function (bol) {
                                if(bol){
                                    $this.bootstrapSwitch('state', state,true);
                                    that.changeStatus(state,event);
                                }else{
                                    $this.bootstrapSwitch('state', !state,true);
                                }
                            });
                        }
                    }


                });
        },

        changeStatus:function (state,event) {
            var that = this;
            window.top.topPage.ajax({
                type: "POST",
                url: root+"/content/cttCarousel/changeStatus.html",
                data:{'search.status':state,'search.id':$(event.currentTarget).val()},
                error: function (request) {
                },
                success: function (data) {
                    if(data === 'true'){
                        that.query(event);
                    }
                }
            });
        },
        nestableCallBack:function(e){

        },
        /**
         * 初始化 Nestable 拖动排序插件
         */
        initNestable:function(){
            $(".dd").nestable({
                listNodeName:'tbody',
                itemNodeName:'tr'
            });

            $(".dd").on('change', function() {
                var $this = $(this);
                //that.shortcutSave();
            });
        },
        /**
         * 批量删除 提示确认框
         * @param e
         * @param p
         */
        deleteBatch:function(e,p){
            var that = this;
            var topPage = window.top.topPage;
            var $this_btn = $(e.currentTarget);
            var confirmMessage_key,confirmMessage;

            if($("table tbody input[type=checkbox][data-use-status='using']:checked",this.getFirstParentByTag(e,"form")).length){
                confirmMessage_key = 'deleteUsingCarousel';
            }else if($("table tbody input[type=checkbox][data-use-status='wait']:checked",this.getFirstParentByTag(e,"form")).length){
                confirmMessage_key = 'deleteWaitUseCarousel';
            }else{
                confirmMessage_key = 'deleteConfirm';
            }
            confirmMessage = window.top.message.carousel[confirmMessage_key];
            topPage.showConfirmMessage(confirmMessage,function(bol){
                if(bol){
                    window.top.topPage.doAjax(e,p);
                }else{
                    $this_btn.unlock();
                }
            });
        },
        searchByUserStatus:function(e,p){

        }
    });
});