//推荐js
define(['common/BaseListPage', 'Util'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectPure: null,
        init: function (title) {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            Util.ToolTip.init();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            this.copyText('a[name="copy"]');
        },
        /**
         * 切换推荐菜单
         * @param e
         * @param option
         */
        recommend: function (e, option) {
            var type = option.type;
            var target;
            var url = root + "/playerRecommendAward/recommend.html";
            var tab;
            var other;
            if (type) {
                target = $("#recommendRecord");
                url = url + "?type=" + type;
                other = $("#recommend");
                tab=$("#tab2")
            } else {
                target = $("#recommend");
                other = $("#recommendRecord");
                tab=$("#tab1");
            }
            if ($(target).children().length==0) {
                window.top.topPage.ajax({
                    url: url,
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    success: function (data) {
                        $(target).html(data);
                        $("ul.tab").find("a").removeClass("current");
                        $(tab).children().addClass("current");
                        $(other).hide();
                        $(target).show();
                        $(e.currentTarget).unlock();
                    }
                })
            } else {
                $("ul.tab").find("a").removeClass("current");
                $(tab).children().addClass("current");
                $(other).hide();
                $(target).show();
                $(e.currentTarget).unlock();
            }
        },
        query: function (e, option) {
            var url = root + "/playerRecommendAward/recommendRecord.html";
            window.top.topPage.ajax({
                url: url,
                data: this.getCurrentFormData(e),
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                type: "post",
                success: function (data) {
                    $(".search-list-container").html(data);
                    $(e.currentTarget).unlock();
                }
            })
        }
    });
});