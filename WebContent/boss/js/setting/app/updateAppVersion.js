/**
 * Created by jeff on 15-10-20.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        selOptMap:null,
        init: function () {
            this._super();
            this.initVersionOption();
            if(this.selOptMap[$("#result_version").val()]){$("#cur_version").html(this.selOptMap[$("#result_version").val()].text);}
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
            if ('ios' == type) {
                the.initVersionOption("hidenIosVersion");
            } else if ('android' == type) {
                the.initVersionOption("hidenAndroidVersion");
            } else {
                $(".appUrl").val('');
            }
            //设置可选的内容
        },
        changeVersion:function (e) {
            var the = this;
            var key = e.key;
            var selObj = the.selOptMap[key];
            $("[name='search.versionName']").val(selObj.versionName);
            $("[name='search.appName']").val(selObj.appName);
            $("[name='search.appUrl']").val(selObj.appUrl);
            $("[name='search.memo']").val(selObj.versionMemo);

        },
        initVersionOption:function () {
            var the = this;
            the.selOptMap = {};
            var span = $("#selVersionDiv").find("button").find("span")[0];
            $(span).html("请选择版本号");
            $("[name='search.versionCode']").val("");
            var options = $("#selVersionDiv").find("ul")[0];
            $(options).html("");
            var optStr = $("#versions").html();
            var opts =eval("("+optStr+")");
            for(var i=0;i<opts.length;i++){
                var opt = opts[i];
                var option = $('<li role="presentation"><a role="menuitem" tabindex="-1" opt="'+opt+'" href="javascript:void(0)" key="'+opt.value+'">'+opt.text+'</a></li>');
                $(options).append(option);
                the.selOptMap[opt.value] = opt;
            }
        }
    });
});