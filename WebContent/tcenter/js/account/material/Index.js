define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init: function () {
            this._super();
          /*  $("img").load(function(){
                var height = $(this).height();
                var width = $(this).width();
                this.parent().parent().next().children("span").text("尺寸："+height+"*"+width);
            });*/
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            this.copyText('a[name="copy"]');
            /*$("img").on("load",function(){
                var height = $(this).height();
                var width = $(this).width();
                this.parent().parent().next().children("span").text("尺寸："+height+"*"+width);
            });*/

            $("a.download").on("click",function(){
                var _this = this;
                var id = $(this).attr("id");
                window.top.topPage.ajax({
                    url:root+"/topCttMaterial/downloadPic.html?search.id="+id,
                    dataType:"json",
                    success:function(data) {
                    }
                })
            })
        },

        onPageLoad: function () {
            this._super();
            $("img").load(function(){
                var height = $(this).height();
                var width = $(this).width();
                $(this).parent().parent().next().children("span").text(window.top.message.account_auto['尺寸']+height+"*"+width);
            });
        },

    });
});