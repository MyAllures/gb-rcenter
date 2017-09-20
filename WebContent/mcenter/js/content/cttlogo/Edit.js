/**
 * Created by snekey on 15-8-10.
 */
define(['common/BaseEditPage', 'site/content/carousel/UploadImage', 'validate'], function (BaseEditPage, UploadImage) {
    return BaseEditPage.extend({
        hint: false,
        uploadImage: null,
        init: function () {
            this._super();

        },
        bindEvent: function () {
            this._super();
            var _this = this;
            //判断默认logo的状态
            if($('#hasUsing').val()=="false"){//${views.content['logo.status.using']}
                $("#default").attr("class","co-green");
                $("#default").text(window.top.message.content['logo.status.using']);
            }else{
                $("#default").text(window.top.message.content['logo.status.toBeUse']);
            }
        }

    })
})
