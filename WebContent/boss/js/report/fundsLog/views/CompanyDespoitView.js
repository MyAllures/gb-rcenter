/**
 * 资金管理-公司入款-存款详细
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