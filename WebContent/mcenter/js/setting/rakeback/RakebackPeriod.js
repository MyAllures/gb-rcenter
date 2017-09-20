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
            var c = $('[name=curPeriod]').val();
            if (!c || c.length == 0) {
                $('.settlement').find('a:last').addClass('cur');
                $('tbody td[id^=this]', this.formSelector).addClass('current');
                $('input[name="result.paramValue"]', this.formSelector).val(0);
            } else {
                $('.settlement').find('a#'+ c).addClass('cur');
                this._showSelectedDay(c);
            }
            var n = $('[name=newPeriod]').val();
            if (n && c != n) {
                if (n == '0') {
                    $('span#newTip').html(window.top.message.setting_auto['天天返']);
                } else {
                    $('span#newTip').html(window.top.message.setting_auto['月结'].replace("[0]",n));
                }
                $('.settlement').find('a#'+ n).addClass('next');
                this._showSelectedNextDay(n);
                $('span#newTip').removeClass('hide');
                $('span#nextDay').parent().show();
            } else {
                $('span#newTip').addClass('hide');
                $('span#nextDay').parent().hide();
            }
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
            this.changePeriod();
        },
        changePeriod: function () {
            var _this = this;
            $('.settlement a', this.formSelector).on('click', function (e) {
                $('a.next').removeClass('next');

                var n = $(this).attr('id');
                var c = $('[name=curPeriod]').val();
                if (n == c) {
                    $('span#newTip').addClass('hide');
                    _this._showSelectedDay(c);
                } else {
                    $(this).addClass('next');

                    if (n == '0') {
                        $('span#newTip').html(window.top.message.setting_auto['天天返']);
                    } else {
                        $('span#newTip').html(window.top.message.setting_auto['月结'].replace("[0]",n));
                    }
                    $('span#newTip').removeClass('hide');

                    _this._showSelectedNextDay(n);
                }
                
                var type = this.id;
                $('input[name="result.paramValue"]').val(type);
            })
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
            $('tbody td.allsel', this.formSelector).removeClass('allsel');
            switch(times) {
                case '0':
                    $('tbody td[id^=this]', this.formSelector).addClass('current');
                    countDay = window.top.message.common.everyday;
                    break;
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
            $('span#currDay', this.formSelector).text(countDay);
        },
        _showSelectedNextDay: function (times) {
            $('tbody td.allsel', this.formSelector).removeClass('allsel').addClass('current');
            var dayText = window.top.message.common.day;
            var countDay, monthEndDay = $('tbody td[id^=this]:last', this.formSelector).text();
            var c = $('[name=curPeriod]').val();
            switch(times) {
                case '0':
                    $('tbody td[id^=this]', this.formSelector).addClass('nextday');
                    $('tbody td.current', this.formSelector).removeClass('current').addClass('allsel');
                    countDay = window.top.message.common.everyday;
                    break;
                case '1':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    countDay = monthEndDay + dayText;
                    break;
                case '2':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    if (c == 0) {
                        $('tbody td[id$=15]', this.formSelector).addClass('allsel');
                    } else {
                        $('tbody td[id$=15]', this.formSelector).addClass('nextday');
                    }
                    countDay = 15 + dayText + '、' + monthEndDay + dayText;
                    break;
                case '3':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    if (c == 0) {
                        $('tbody td[id$=10]', this.formSelector).addClass('allsel');
                        $('tbody td[id$=20]', this.formSelector).addClass('allsel');
                    } else {
                        $('tbody td[id$=10]', this.formSelector).addClass('nextday');
                        $('tbody td[id$=20]', this.formSelector).addClass('nextday');
                    }
                    countDay = 10 + dayText + '、' + 20 + dayText + '、' + monthEndDay + dayText;
                    break;
                case '4':
                    $('tbody td.nextday', this.formSelector).removeClass('nextday');
                    if (c == 0) {
                        $('tbody td[id$=_7]', this.formSelector).addClass('allsel');
                        $('tbody td[id$=14]', this.formSelector).addClass('allsel');
                        $('tbody td[id$=21]', this.formSelector).addClass('allsel');
                    } else {
                        $('tbody td[id$=_7]', this.formSelector).addClass('nextday');
                        $('tbody td[id$=14]', this.formSelector).addClass('nextday');
                        $('tbody td[id$=21]', this.formSelector).addClass('nextday');
                    }
                    countDay = 7 + dayText + '、' + 14 + dayText + '、' + 21 + dayText + '、' + monthEndDay + dayText;
                    break;
            }
            $('tbody td[id^=this]:last', this.formSelector).addClass('allsel');
            $('span#nextDay', this.formSelector).text(countDay);
        }
    });
});