define(['common/BaseListPage', 'autocompleter'], function (BaseListPage) {
    var _this = this;
    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super("formSelector");

        },
    
        onPageLoad: function () {
            this._super();
        },
        /**E:\work\newspaces\rcenter\WebContent\boss\js\report\siteJackpot\Index.js
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var val = $("[name='search.siteId']").val();
            $("[name='search.siteId']").val(val);
            this._super();
            var _this = this;

            _this.querySiteInfo();
        },

        querySiteInfo:function () {
            var $form = $(this.formSelector);
            $(this.formSelector).on("blur","#siteId",function () {
                 if(!$form.valid || $form.valid()) {
                    var val = $("#siteId").val();
                    window.top.topPage.ajax({
                        loading: true,
                        url: root+"/report/gameTransaction/querySiteInfo.html",
                        type: "post",
                        data: {"siteId":val},
                        dataType:"JSON",
                        success: function (data) {
                            if (data) {
                                $("[selectdiv='search.centerId']").attr("value",data.centerUserId);
                                select.setValue($("[selectdiv='search.centerId']"), data.centerUserId);
                                $("[selectdiv='search.masterId']").attr("value",data.sysUserId);
                                $("[selectdiv='search.siteId']").attr("value",data.id);
                                select.ajaxList($("[selectdiv='search.masterId'] input"));
                            }
                        }
                    });
                 }
            })
        }


    });
});