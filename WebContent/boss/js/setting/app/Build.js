/**
 * Created by fei on 17-10-31.
 */
/**
 * Created by jeff on 15-10-20.
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
        uploadFile: function (e, opt) {
            e.objId = 0;
            e.catePath = 'appLogo';
            var flag = this.uploadAllFiles(e, opt);
            if(!flag){
                return false;
            }
            if (!this.validateForm(e)) {
                return false;
            }
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            return true;
        },
        buildAndroid: function (e) {
            window.top.topPage.ajax({
                url: root + "/build/android/package.html",
                data: this.getCurrentFormData(e),
                type: 'POST',
                dataType: 'JSON',
                success: function (data) {
                    if (data.state) {
                        $('#_param').val(data.param);
                        $('._android').show();
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },
        buildIos: function (e) {
            window.top.topPage.ajax({
                url: root + "/build/ios/package.html",
                data: this.getCurrentFormData(e),
                type: 'POST',
                dataType: 'JSON',
                success: function (data) {
                    if (data.state) {
                        $('#_pch').val(data.pch);
                        $('#_plist').val(data.plist);
                        $('#ios_tip').html('*请将下面文件另存为 <b class="co-red">app_' + data.code+ '_'+ data.version +'.plist</b>')
                        $('._ios').show();
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },
    })
});
