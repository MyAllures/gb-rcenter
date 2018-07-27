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
            var that = this;
        },
        onPageLoad: function () {
            this._super();
            this.bindFormValidation();
            var _this = this;
            var success = $("#success").val();
            if (success == "false") {
                window.top.topPage.showWarningMessage($("#errMsg").val(), function () {
                    _this.closePage();
                });
            }
        },
        previewRole: function (event, option) {
            this.returnValue = 'role';
            this.closePage();
        },
        /**
         * 验证表单
         * @param e
         * @returns {boolean|*}
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        addAppresult: function (data) {
            if (data && data == 'true') {

            }
        },
        changeKey: function (e) {
            var the = this;
            var type = e.key;
            if (type) {
                the.initVersionOption();
            } else {
                var span = $("#selVersionDiv").find("button").find("span")[0];
                $(span).html("请选择版本号");
                $("[name='search.versionCode']").val("");
                var options = $("#selVersionDiv").find("ul")[0];
                $(options).html("");
            }
            //设置可选的内容
        },

        initVersionOption: function () {
            var the = this;
            var span = $("#selVersionDiv").find("button").find("span")[0];
            $(span).html("请选择版本号");
            $("[name='search.versionCode']").val("");
            var options = $("#selVersionDiv").find("ul")[0];
            $(options).html("");

            var appType = $("[name='search.appType']").val();
            var boxType = $("[name='search.boxType']").val();
            var ajaxOption = {
                "search.appType" : appType,
                "search.boxType" : boxType
            };
            window.top.topPage.ajax({
                url: root + '/siteAppUpdate/getVersionByTypoe.html',
                type: 'POST',
                dataType: 'json',
                data:ajaxOption,
                success: function (data) {
                    if(data){
                        var opts =eval("("+data.versions+")");
                        for(var i=0;i<opts.length;i++){
                            var opt = opts[i];
                            var option = $('<li role="presentation"><a role="menuitem" tabindex="-1" opt="'+opt+'" href="javascript:void(0)" key="'+opt.value+'">'+opt.text+'</a></li>');
                            $(options).append(option);
                        }
                    }
                },
                error: function (data) {

                }
            });

        }
    });
});