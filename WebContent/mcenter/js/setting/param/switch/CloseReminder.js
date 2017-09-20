define(['common/BaseEditPage', 'bootstrap-dialog'], function(BaseEditPage,BootstrapDialog) {
    var _this ;
    return BaseEditPage.extend({
        bootstrapDialog: BootstrapDialog,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            _this=this;
        },
        onPageLoad: function () {
            this._super();
        },
        bindEvent:function() {
            this._super();
            $("a[name='tab_name']").click(function(){
                $("#curLanguage").val($(this).attr("tt"));
                $("a[name='tab_name']").removeClass("current");
                $(this).addClass("current");
                var tt= $(this).attr("tt");
                var t = "div_"+tt;
                $(".hfsj-wrap").hide();
                $("#"+t).show();

                $("a[name='tab_name']").each(function (index) {
                    var tt= $(this).attr("tt");
                    var id = "area_"+tt;
                    var val = $("#"+id).val();
                    if(val!=null && $.trim(val)!=''){
                        $("#span_"+tt).text(window.top.message.setting['switch.CloseReminder.edited']);
                    }else{
                        $("#span_"+tt).text(window.top.message.setting['switch.CloseReminder.unedited']);
                    }
                });
                $("#span_"+tt).text(window.top.message.setting['switch.CloseReminder.editing']);

            });
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "textarea", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    $("#a_"+attr).formtip(message);
                    e.result=true;
                }
                else{
                    e.result=false;
                }
            });
        },
        updateSwitch:function(e,opt){
            this.returnValue='1';
            window.top.topPage.closeDialog();
        },
        goToNotice:function(e,opt){
            this.returnValue='2';
            window.top.topPage.closeDialog();
        },
        CloseReminderChange:function(e){
            var val = e.key;
            if(val=='2'){
                $(".timecss").show();
            }else{
                $(".timecss").hide();
            }
            _this.resizeDialog();
        },
        changeCurrentLang:function(e,p){
            try{
                var curIndex = $("#curLanguage").val();
                var allTags = $("a[name='tab_name']").length;
                if(curIndex<allTags-1){
                    curIndex++;
                    $("#a_"+curIndex).click();
                }else{
                    curIndex=0;
                    $("#a_"+curIndex).click();
                }
            }finally{
                $(e.currentTarget).unlock();
            }

        }

    });
});