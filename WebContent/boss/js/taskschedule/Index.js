/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
        },

        initScheduler: function (e , option) {
            var $scheduler = $("input[name='search.scheduler']");
            var scheduler = select.getValue($scheduler);
            var text = select.getSelected($scheduler).text();
            if (window.confirm("调度器:" + text + ",确认初始化吗?初始化将覆盖原有的内容.")) {
                var _this = this;
                window.top.topPage.ajax({
                    url: root + "/taskSchedule/initTaskSchedule.html",
                    dataType: 'json',
                    data: {"search.scheduler": scheduler},
                    success: function (data) {
                        window.alert(data.msg);
                        $(e.currentTarget).unlock();
                    },
                    error: function (data) {
                        $(e.currentTarget).unlock();
                    }
                });
            } else {
                $(e.currentTarget).unlock();
            }

        }
    })
})
