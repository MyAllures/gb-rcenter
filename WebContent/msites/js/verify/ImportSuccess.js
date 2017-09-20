/**
 * Created by fei on 16-8-5.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        formSelector: 'form',

        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            $('[name=password]').val($('#ppw', parent.document).val());
            $('[name=captcha]').val($('#ppc', parent.document).val());
            this.gotIt();
        },
        bindEvent: function () {
            this._super();
        },  
        /** 知道了 */
        gotIt: function () {
            var $form = $('form#loginForm');
            var url = "/passport/login.html?t=" + new Date().getTime().toString(36);
            if ($('[name=username]', $form).val().trim() && $('[name=password]', $form).val().trim()) {
                window.top.topPage.ajax({
                    type: "POST",
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    url: url,
                    data: $form.serialize(),
                    dataType: "JSON",
                    success: function (data) {
                        console.log('Log in ' + data.success);
                    }
                })
            }
        },

        whatOs: function() {
            var ua = navigator.userAgent;
            if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
                return 'ios';
            } else if (/(app_android)/i.test(ua)) {
                return 'app_android';
            } else if (/(android)/i.test(ua)) {
                return 'android';
            } else {
                return 'pc';
            }
        },

        iKnow: function () {
            if (this.whatOs() != 'pc') {
                document.cookie = "ACCESS_TERMINAL=mobile;expires=0;path=/";
            }
            window.parent.location.href = '/';
        }

    });
});
