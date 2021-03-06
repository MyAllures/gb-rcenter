/**
 * Created by jeff on 15-12-20.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();

        },
        /**
         * 预览编辑切换
         * @param event
         * @param option
         */
        toPreview : function( event , option ){
            var that = this;
            var edit = !!option.edit;
            if(edit){
                /*改变为编辑状态*/
                $("._preview").addClass("hide");
                $("._edit").removeClass("hide");
                if($(".reason-select").length>0) {
                    select.enable('.reason-select');
                }
            }else{
                /*切换为预览状态*/
                $("._edit").addClass("hide");
                $("._preview").removeClass("hide");
                if($(".reason-select").length>0){
                    select.disable('.reason-select');
                }
                that._changePreviewInner();
            }

            /*解锁按钮*/
            $(event.currentTarget).unlock();
            that.resizeDialog();
        },
        /**
         * 根据下拉设置值 内容值
         * @param event
         * @param option
         */
        setDisabledReason:function( event , option ){
            var $this = $(event.currentTarget);
            if($this.attr('holder')!=undefined && $this.attr('holder')!=""){
                $(".reason-content").html($this.attr('holder'));
                $("[name=groupCode]").val($this.attr('groupCode'));
            }else{
                $(".reason-content").html("");
                $("[name=groupCode]").val("");
            }
            //this.reasonPreviewMore.viewFailureDetail(event);
            this.resizeDialog();
            $this.unlock();

        },
        /**
         * 将编辑框里面的内容填充到预览标签中
         */
        _changePreviewInner:function(){
            $('[data-preview]').each(function(){
                var $this = $(this);
                $($this.data().preview).html($this.val());
            });
        },
        previewMore:function(event,option){
            if($("[name=groupCode]").val()){
                option.target === 'true' ? $(".previewMore_some").removeClass("hide"):$(".previewMore_some").addClass("hide");
                this.reasonPreviewMore.previewMore(event,option);
            }
            $(event.currentTarget).unlock();
        },
        validConfirm:function (e, opt) {
            var _this = this;
            var type = $("input[name=type]").val();
            var content;
            if(type=='agent') {
                content = window.top.message.agent['agent.account.disabled.content'];
            } else if(type=='topagent') {
                content = window.top.message.agent['topagent.account.disabled.content'];
            } else {
                content = window.top.message.agent['player.account.disabled.content'];
            }
            var msg = window.top.message.common['operation.success'];
            window.top.topPage.showConfirmDynamic(window.top.message.agent['player.account.disabled.tipsTitle'],
                content,window.top.message.setting['common.ok'],
                window.top.message.setting['common.cancel'],function(result){
                    if(result){
                        window.top.topPage.doAjax(e,opt);
                    }else{
                        _page.closeDialog();
                    }
            });
        }
    });
});