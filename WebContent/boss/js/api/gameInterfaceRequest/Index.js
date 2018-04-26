/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({

        init: function () {
            this._super();
            this._querySearchCondition()
        },

        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        _querySearchCondition: function () {

            var _this = this;
            var providerHtml = '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" key="{0}">{1}</a></li>';
            window.top.topPage.ajax({
                url: root + "/gameApiInterfaceRequest/queryAPIId.html?t=" + new Date().getTime(),
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.providerIds) {
                        $("div[selectdiv='search.providerIds']").find("ul[role='menu']").html("");
                        for (var i = 0; i < (data.providerIds).length; i++) {
                            var providerMap = data.providerIds[i];
                            var key = providerMap.dictCode;
                            var val = providerMap.remark;
                            var formatHtml = _this.formatStr(providerHtml, key, val);
                            $("div[selectdiv='search.providerIds']").find("ul[role='menu']").append(formatHtml);
                        }
                    }
                },
                error: function (data) {

                }
            })
        },
    })
})
