/**
 * Created by fei on 16-6-24.
 */
/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
            if (!$('[name="search.siteId"]').val()) {
                $('a._search').addClass('disabled').lock();
            }
        },
        bindEvent : function() {
            this._super();
            var _this = this;
            _this.querySiteInfo();
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
        },

        changeRole: function(e) {
            $('input.roleName').attr('name', e.key);
        },

        querySiteInfo:function (e) {
            $(this.formSelector).on("blur","#siteId",function () {
                if (!$('[name="search.siteId"]').val()) {
                    $('a._search').addClass('disabled').lock();
                }else {
                    $('a._search').removeClass('disabled').unlock();
                }
            })
        }
    });
});