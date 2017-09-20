/**
 * Created by jeff on 15-8-27.
 */
define(['common/BaseEditPage','bootstrapswitch'], function (BaseEditPage) {

    return BaseEditPage.extend({
        formSelector:'body',
        /**
         * 当前预览的语言下标
         */
        langIndex:1,
        maxLangIndex:$('.lang').length,
        switch:null,
        init: function () {
            this._super();
            this.initSwitch();
        },
        bindEvent: function () {
            this._super();
            $('input.lang').eq(0).on("change",function(event){
               $('.preview').text($(this).val());
            });
            $("input[type='checkbox']").on("click",function(){
                var pid = $(this).attr('data-id');
                if ($(this).is(":checked")) {
                    $('#p_' + pid).val('true');
                } else {
                    $('#p_' + pid).val('false');
                }
            })
        },
        onPageLoad: function () {
            this._super();
        },
        initSwitch:function(e,p){
            var $my_checkbox = $(this.formSelector + " input[name='my-checkbox']");
            /*switch 插件事件*/
            this.unInitSwitch($my_checkbox)
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function(event, state) {
                    $(".playerAccountHide").val(state);
                });
        },
        /**
         * 切换语言
         * @param e
         * @param p
         */
        changeLang:function(e,p){
            this.maxLangIndex === this.langIndex   && (this.langIndex =0);
            var text = $('.lang').eq(this.langIndex).val();
            $('.preview').text(text);
            ++this.langIndex;
            $(e.currentTarget).unlock();
        },
        getData:function(){
            var playerRank = [];
            var contentLang = [];
            //是否隐藏账号
            $("input[name='my-checkbox']").bootstrapSwitch('state');
            //文案
            $('.lang').each(function(index,obj){
                var $obj = $(obj);
                contentLang.push({value:$obj.val(),locale:$obj.data('lang')})
            });
            $('.player_rank:checked').each(function(index,obj){
                playerRank.push({id:$(obj).val()})
            });
            var s = $('[name=SiteCustomerServiceId]').val();

            return JSON.stringify({playerRank:playerRank,contentLang:contentLang});
        },
        manageService:function( e , option ){
            var _this=this;
            _this.returnValue = true;
            this.closePage();
        }
    });
});