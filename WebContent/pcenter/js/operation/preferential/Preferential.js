/**
 * Created by eagle on 15-10-28.
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        init:function() {
            this._super();
        },

        onPageLoad: function () {
            this._super();

        },

        bindEvent: function () {
            this._super();
        },

        saveCallBack: function (e, option) {
            this.returnValue = true;
            e.page.query(e, option);
            window.top.topPage.closeDialog();
        },

        /**
         * 活动弹窗
         * @param e
         * @param option
         */
        openActivity:function(e,option) {
            if (option.url) {
                var iWidth = 850;                          //弹出窗口的宽度;
                var iHeight = 950;                       //弹出窗口的高度;
                //获得窗口的垂直位置
                var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
                //获得窗口的水平位置
                var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
                var params = 'width=' + iWidth
                        + ',height=' + iHeight
                        + ',top=' + iTop
                        + ',left=' + iLeft
                        + ',directories=no'
                        + ',location=yes'
                        + ',menubar=yes'
                        + ',resizable=no'
                        + ',scrollbars=yes'
                        + ',status=no'
                        + ',titlebar=yes'
                        + ',toolbar=yes';
                window.open(option.url, '_blank', params);
            }
            $(e.currentTarget).unlock();
        }
    });

});
