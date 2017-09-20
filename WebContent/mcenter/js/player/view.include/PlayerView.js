define(['common/BasePage', 'site/player/player/tag/PlayerTag', 'moment', 'jqplaceholder'], function (BasePage, PlayerTag, Moment) {

    return BasePage.extend({
        playerTag: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "div[name=playerViewDiv]";
            this.playerTag = new PlayerTag();
            this._super(this.formSelector);
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            /**
             * 玩家详情页-删除单个标签
             * @param e
             */
            _this.deleteTag();

            //玩家检测查看备注链接到玩家详细备注　add by eagle 20151220
            var extendLinks = $("#remark").attr("data-link");
            if (extendLinks == 'yes') {
                var tabId = $("#remark").attr("href");
                var url = $("#remark").attr("data-href");
                window.top.topPage.ajax({
                    url: url,
                    success: function (data) {
                        $(tabId).html(data);
                        $(".panel-options li").removeClass();
                        $("#remark").parent().addClass("active");
                        $("#remark").attr("aria-expanded", true);
                        $(".panel-body").children().children().removeClass("active");
                        $(tabId).addClass("active");
                    },
                    error: function (data) {

                    }
                })
            }
            //add end

        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            this.initShowTab();
            var that = this;
        },

        deleteTag: function () {
            $(".deleteTag").on("click", function (e) {
                var id = $(this).attr("data-id");
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/player/deleteTag.html",
                    data: {"search.id": id},
                    dataType: "json",
                    success: function (data) {
                        if (data.state) {
                            //$("[name=returnView]").click();
                            $(e.currentTarget).parent().remove();
                        }
                    },
                    error: function (data) {
                        //$("[name=returnView]").click();
                    }
                })
            });
        },


        /**
         * 玩家详细，修改玩家标签刷新
         * @param e
         */
        queryView: function (e) {
            var _this = this;
            var load = this.getCurrentForm(e).parentNode;
            window.top.topPage.ajax({
                data: this.getCurrentFormData(e),
                url: this.getCurrentFormAction(e),
                success: function (data) {
                    $(load).html(data);
                    _this.deleteTag();
                },
                error: function (data) {

                }
            });
        },
        reloadView: function (event, option) {
            if (event.returnValue) {
                $("#reloadView").click();
            }
        },
        reloadViewWithoutReturnValue: function (event, option) {
            //if(event.returnValue){
            $("#reloadView").click();
            //}
        },
        queryPlayerDetail: function (e) {
            $("[name=returnView]").click();
        },
        /**
         * 为了编辑玩家成功后刷新页面，因为window.page.query不存在时不刷新页面
         * @param e
         */
        query: function (e, option) {
            $("a[name=returnMain]").click();
        }
    });

});