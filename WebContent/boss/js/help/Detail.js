define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function (BaseEditPage) {
    var that;
    return BaseEditPage.extend({
        ue:null,
        langObj:{},
        sendType:null,
        $currentLang:$(".lang.current"),
        languageJson :null,
        ue:[],
        /**能自动保存**/
        canSave:true,
        init: function () {
            this._super();
            var _this = this;
        },
        bindEvent:function(){
            that = this;
            this._super();
            //修改编辑状态
            $(this.formSelector).on("click","a[name='tag']", function () {
                var local=$(this).attr("lname");
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                $(".ann").hide();
                $(".content"+local).show();
                var tabIndex = $(this).attr("lnum");
                $("#curLanguage").val(tabIndex);
            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceIndex = $(this).attr("index");
                var targetIndex = $(".current").attr("lnum");
                if(targetIndex){
                    targetIndex--;
                }
                var sourceContent = that.getSendContent(sourceIndex);
                that.setSendContent(targetIndex,sourceContent);

            });

        },
        onPageLoad:function(){
            this._super();
        },
        /**
         * 返回列表
         * @param e
         * @param option
         */
        goToList:function(e,option){
            var _this = this;
            _this.goToLastPage(e,option);
            $(e.currentTarget).unlock();
        },
        toDocumentList: function (e,opt) {
            if(opt.data.state){
                $("#reback_btn").click();
            }
        }

    })
});