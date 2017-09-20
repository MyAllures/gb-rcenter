/**
 * Created by cj on 15-9-17.
 */
define(['common/BaseEditPage'], function(BaseEditPage) {

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
            this.selPeriod();
        },
        selPeriod: function () {
            var c = $('input[name=curPeriod]').val();
            if (!c || c.length == 0) {
                $('.settlement').find('a:first').addClass('cur');
                $('tbody td[id$=15]', this.formSelector).addClass('current');
                $('input[name="sysParam[0].paramValue"]', this.formSelector).val(1);
            } else {
                $('.settlement').find('a#'+ c).addClass('cur');
                this._showSelectedDay(c);
            }

            var n = $('[name=newPeriod]').val();
            if (n && c != n) {
                $('.settlement').find('a#'+ n).addClass('next');
                $('span#newTip').removeClass('hide');
                $('span#nextDay').parent().show();
                this._showSelectedNextDay(n);
            } else {
                $('span#nextDay').parent().hide();
                $('span#newTip').addClass('hide');
            }
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
            this.changePeriod();
            $("input[name$='paramValue']", this.formSelector).keyup(function(){
                $(this).val($(this).val().replace(/\D|^0/g,''));
                $(this).val().length>8?$(this).val($(this).val().substring(0,8)):'';
            }).bind("paste", function(){
                $(this).val($(this).val().replace(/\D|^0/g,''));
                $(this).val().length>8?$(this).val($(this).val().substring(0,8)):'';
            });
        },

        changePeriod: function () {
            var _this = this;
            $('.settlement a', this.formSelector).on('click', function (e) {
                $('a.next').removeClass('next');

                var c = $('[name=curPeriod]').val();
                var n = $(this).attr('id');
                if (c == n) {
                    $('span#newTip').addClass('hide');
                    $('span#nextDay').parent().hide();
                    _this._showSelectedDay(c);
                } else {
                    $(this).addClass('next');
                    $('b#newPeriod').text(n);
                    $('span#newTip').removeClass('hide');
                    $('span#nextDay').parent().show();
                    _this._showSelectedNextDay(n);
                }

                $('input[name="sysParam[0].paramValue"]').val(n);
            });
        },

        /**
         * 根据次数选中日期
         * @param times
         * @private
         */
        _showSelectedDay: function (times) {
            var dayText = window.top.message.common.day;
            var countDay, monthEndDay = $('tbody td[id^=this]:last', this.formSelector).text();
            $('tbody td.nextday', this.formSelector).removeClass('nextday');
            switch(times) {
                case '1':
                    $('tbody td.current', this.formSelector).removeClass('current');
                    countDay = monthEndDay + dayText;
                    break;
                case '2':
                    $('tbody td.current', this.formSelector).removeClass('current');
                    $('tbody td[id$=15]', this.formSelector).addClass('current');
                    countDay = 15 + dayText + '、' + monthEndDay + dayText;
                    break;
                case '3':
                    $('tbody td.current', this.formSelector).removeClass('current');
                    $('tbody td[id$=10]', this.formSelector).addClass('current');
                    $('tbody td[id$=20]', this.formSelector).addClass('current');
                    countDay = 10 + dayText + '、' + 20 + dayText + '、' + monthEndDay + dayText;
                    break;
                case '4':
                    $('tbody td.current', this.formSelector).removeClass('current');
                    $('tbody td[id$=_7]', this.formSelector).addClass('current');
                    $('tbody td[id$=14]', this.formSelector).addClass('current');
                    $('tbody td[id$=21]', this.formSelector).addClass('current');
                    countDay = 7 + dayText + '、' + 14 + dayText + '、' + 21 + dayText + '、' + monthEndDay + dayText;
                    break;
            }
            $('tbody td[id^=this]:last', this.formSelector).removeClass('allsel').addClass('current');
            $('#clearDay').text(countDay);
        },

        _showSelectedNextDay: function (times) {
            var dayText = window.top.message.common.day;
            var countDay, monthEndDay = $('tbody td[id^=this]:last', this.formSelector).text();
            switch(times) {
                case '1':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    countDay = monthEndDay + dayText;
                    break;
                case '2':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    $('tbody td[id$=15]', this.formSelector).addClass('nextday');
                    countDay = 15 + dayText + '、' + monthEndDay + dayText;
                    break;
                case '3':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    $('tbody td[id$=10]', this.formSelector).addClass('nextday');
                    $('tbody td[id$=20]', this.formSelector).addClass('nextday');
                    countDay = 10 + dayText + '、' + 20 + dayText + '、' + monthEndDay + dayText;
                    break;
                case '4':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    $('tbody td[id$=_7]', this.formSelector).addClass('nextday');
                    $('tbody td[id$=14]', this.formSelector).addClass('nextday');
                    $('tbody td[id$=21]', this.formSelector).addClass('nextday');
                    countDay = 7 + dayText + '、' + 14 + dayText + '、' + 21 + dayText + '、' + monthEndDay + dayText;
                    break;
            }
            $('tbody td[id^=this]:last', this.formSelector).addClass('allsel');
            $('#nextDay').text(countDay);
        },

        validateForm:function(e,option) {
            var min = $("input[name='sysParam[1].paramValue']").val();
            if (!min) {
                window.top.topPage.showWarningMessage(window.top.message.setting['rebate.setting.minNotNull']);
                return false;
            }
            var max = $("input[name='sysParam[2].paramValue']").val();
            if (!max) {
                window.top.topPage.showWarningMessage(window.top.message.setting['rebate.setting.maxNotNull']);
                return false;
            }
            if (parseInt(max)<=parseInt(min)) {
                window.top.topPage.showWarningMessage(window.top.message.setting['rebate.setting.minPassMax']);
                return false;
            }
            if(min.length>8 || max.length>8) {
                window.top.topPage.showWarningMessage(window.top.message.setting['rebate.edit.maxRakebackRange']);
                return false;
            }
            return true;
        },
    });
});