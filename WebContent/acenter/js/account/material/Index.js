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

            /*$("img").on("load",function(){
                var height = $(this).height();
                var width = $(this).width();
                this.parent().parent().next().children("span").text("尺寸："+height+"*"+width);
            });*/
            //复制按钮
            this.copyText('a[name="copy"]');

            $("a.download").on("click",function(){
                var _this = this;
                var id = $(this).attr("id");
                window.top.topPage.ajax({
                    url:root+"/cttMaterial/downloadPic.html?search.id="+id,
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