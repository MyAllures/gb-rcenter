/**
 * Created by bruce on 16-7-11.
 */
define(['common/BaseEditPage','zeroClipboard'], function (BaseEditPage,ZeroClipboard) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', '复制成功', true);
            });
        }

    });
});