define(['common/BaseListPage','bootstrapswitch','lazyload'], function (BaseListPage,Bootstrapswitch) {

    return BaseListPage.extend({

        init: function () {
            this._super();
            $("img.lazy").lazyload({effect: "fadeIn"});
        },

        bindEvent: function () {
            this._super();
            var _this = this;

        },

        onPageLoad: function () {
            this._super();
            this.unInitSwitch($("[name='status']"))
                .bootstrapSwitch(
                {
                    onText: window.top.message.content_auto['启用'],
                    offText: window.top.message.content_auto['停用']
                }
            ).on('switchChange.bootstrapSwitch', function(event, state) {
                    $.ajax({
                        url:root+'/cttMaterialText/showHideMaterial.html',
                        data:{'result.status':state},
                        dataType:'json',
                        success:function(data) {
                        }
                    });
                });
        },

        query:function(e,option) {
            $("#mainFrame").load(root+"/cttMaterialText/list.html");
        },
        bannerCallback: function (e, opt) {
            if(e.returnValue){
                this.query(e,opt);
                setTimeout(function () {
                    $("#bannerli").click();
                },500);

            }

        },
        deleteCallback: function (e, opt) {
            this.query(e,opt);
            setTimeout(function () {
                $("#bannerli").click();
            },500);
        },
        wenanCallback: function (e, opt) {
            if(e.returnValue){
                this.query(e,opt);
                setTimeout(function () {
                    $("#wenanli").click();
                },500);

            }

        }
    });
});