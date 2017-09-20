//编辑运营商
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
        },
        /**
         * 介绍人管理回调
         * @param e
         * @param option
         */
        introducerCallback: function (e, option) {
            if (e.returnValue) {
                var $selectDiv = $(e.currentTarget).parent().prev();
                window.top.topPage.ajax({
                    url: root + '/platform/operatorsManage/seachIntroducer.html',
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
        },
        chooseConstellation: function (Start, End, Label) {
            var array = Start.currentTarget.value.split("-");
            var month = array[1];
            var day = array[2];
            var constell = this._getAstro(month, day);
            select.setValue($("[selectdiv='sysUser.constellation']"), constell);
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
            switch (code) {
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