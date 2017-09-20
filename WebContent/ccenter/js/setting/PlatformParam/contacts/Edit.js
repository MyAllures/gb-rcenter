define(['common/BaseEditPage'], function (BaseEditPage) {
    var _this;
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            _this = this;
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        /**
         * 重新加载职位下拉框
         */
        reselect: function (e, option) {
            if (e.returnValue) {
                var $selectDiv = $(e.currentTarget).parent().prev();
                window.top.topPage.ajax({
                    url: root + '/ccenter/vSiteContacts/queryPositionList.html',
                    dataType: 'json',
                    success: function (data) {
                        select.clearOption($selectDiv);
                        if (data && data.length > 0) {
                            for (var i = 0; data[i]; i++) {
                                select.addOption($selectDiv, data[i].name, data[i].name);
                            }
                            //select.setValue($selectDiv, data[0].name)
                        } else {
                            $selectDiv.find("[prompt='prompt']").html($selectDiv.attr("initprompt"))
                        }
                    },
                    error: function (data) {

                    }
                });
            }
        }
    })
});