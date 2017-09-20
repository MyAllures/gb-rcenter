/**
 * Created by cj on 15-8-24.
 */
define(['common/BaseEditPage',], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            this.checkNoRecords();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
        },
        /**
         * 操作回调，event.returnValue==true时才执行 showPage方法，
         * 其他的操作回调，请参考这里，不要任何时候都执行刷新操作
         * @param event
         */
        callBackQuery: function (event) {
            if (event.returnValue) {
                window.top.topPage.showPage();
            }
        },
        /**
         * 上传头像
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            e.objId = 1;
            e.catePath = 'headImage';
            return this.uploadAllFiles(e, opt);
        },
        /**
         * 根据日期获取星座
         * @param e
         */
        chooseConstellation: function (e) {
            var v = e.currentTarget.value.toString();
            var month = v.substring(v.indexOf('-') + 1, v.lastIndexOf('-'));
            var day = v.substring(v.lastIndexOf('-') + 1);
            var constell = this._getAstro(month, day);
            select.setValue($("[name='sysUser.constellation']"), constell);
        },
        /**
         * 根据month和day获取星座code
         * @param month
         * @param day
         * @returns {*}
         * @private
         */
        _getAstro: function (month, day) {
            var code = month - (day < "102223444433".charAt(month - 1) - -19);
            switch(code) {
                case 0:
                case 12:
                    return 'capricorn';
                case 1:
                    return 'aquarius';
                case 2:
                    return 'pisces';
                case 3:
                    return 'aries';
                case 4:
                    return 'taurus';
                case 5:
                    return 'gemini';
                case 6:
                    return 'cancer';
                case 7:
                    return 'leo';
                case 8:
                    return 'virgo';
                case 9:
                    return 'libra';
                case 10:
                    return 'scorpio';
                case 11:
                    return 'sagittarius';
            }
        }
    });
});