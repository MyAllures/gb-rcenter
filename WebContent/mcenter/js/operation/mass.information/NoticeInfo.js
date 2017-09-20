define(['common/BaseViewPage'], function (BaseViewPage) {

    return BaseViewPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        changeLang: function (e, option) {
            var locale = option.locale;
            var current;
            $(e.currentTarget).parent().parent().find("a").each(function () {
                if ($(this).hasClass("current")) {
                    current = this;
                }
            });
            $(current).removeClass("current");
            $(current).addClass("p-r-sm");
            $(e.currentTarget).addClass("current");
            $(e.currentTarget).removeClass("p-r-sm");
            var currentOption = eval("(" + $(current).data('rel') + ")");
            $("#" + currentOption.locale).hide();
            $("#" + locale).show();
            $(e.currentTarget).unlock();
        }
    });

});