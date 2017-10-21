/**
 * @version: 2.0.9
 * @author: Dan Grossman http://www.dangrossman.info/
 * @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: https://www.improvely.com/
 */

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['moment', 'jquery', 'exports'], function (momentjs, $, exports) {
            root.daterangepicker = factory(root, exports, momentjs, $);
        });

    } else if (typeof exports !== 'undefined') {
        var momentjs = require('moment');
        var jQuery = window.jQuery;
        if (jQuery === undefined) {
            try {
                jQuery = require('jquery');
            } catch (err) {
                if (!jQuery) throw new Error('jQuery dependency not found');
            }
        }

        factory(root, exports, momentjs, jQuery);

        // Finally, as a browser global.
    } else {
        root.daterangepicker = factory(root, {}, root.moment || moment, (root.jQuery || root.Zepto || root.ender || root.$));
    }

}(this, function (root, daterangepicker, moment, $) {

    var DateRangePicker = function (element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDateElement = options.startDateElement;
        this.endDateElement = options.endDateElement;
        this.startDate = moment("");//.startOf('day');
        this.endDate = moment("");//.endOf('day');
        this.timeZone = window.top.utcOffSet;
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            format: 'MM/dd/yyyy',
            separator: ' / ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function () {
        };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string')
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                '<div class="daterangepicker_input">' +
                '<div class="calendar-time">' +
                '<div></div>' +
                '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                '<div class="range_inputs">' +
                '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                '<button class="cancelBtn" type="button"></button>' +
                '</div>' +
                '</div>' +
                '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
                this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
                this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
                this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
                this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
                this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
                this.locale.customRangeLabel = options.locale.customRangeLabel;

        }
        //Add window.top.utcOffSet for 多时区

        if (typeof options.startDate === 'string' && options.isStart)
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string' && options.isEnd)
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.startDate === 'object' && options.isStart)
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object' && options.isEnd)
            this.endDate = moment(options.endDate);

        if (typeof options.startDate === 'function' && options.isStart) {
            var start = options.startDate.call();
            if (start) {
                this.startDate = moment(start);
            } else {
                this.startDate = moment(start);
            }
        }

        if (typeof options.endDate === 'function' && options.isEnd) {
            var end = options.endDate.call();
            if (end) {
                this.endDate = moment(end);
            } else {
                this.endDate = moment(end);
            }
        }


        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);
        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);
        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);
        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);
        if (typeof options.minDate === 'function')
            this.minDate = moment(options.minDate.call());
        if (typeof options.maxDate === 'function')
            this.maxDate = moment(options.maxDate.call());
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();


        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    start = end = null;
                if (val != "") {
                    if (options.isStart) {
                        start = moment(val, this.locale.format);
                    }
                    if (options.isEnd) {
                        end = moment(val, this.locale.format);
                    }
                    if (this.element.data().isEnd && end != null) {
                        this.setEndDate(end);
                    }
                    if (!this.element.data().isEnd && start != null) {
                        this.setStartDate(start);
                    }
                }
            }
        }

        // bind the time zone used to build the calendar to either the timeZone passed in through the options or the zone of the startDate (which will be the local time zone by default)
        if (typeof options.timeZone === 'string' || typeof options.timeZone === 'number') {
            if (typeof options.timeZone === 'string' && typeof moment.tz !== 'undefined') {
                this.timeZone = moment.tz.zone(options.timeZone).parse(new Date) * -1;  // Offset is positive if the timezone is behind UTC and negative if it is ahead.
            } else {
                this.timeZone = options.timeZone;
            }
        } else {
            this.timeZone = moment(this.startDate).utcOffset();
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate)) || (maxDate && start.isAfter(maxDate)))
                    continue;

                this.ranges[range] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li>' + range + '</li>';
            }
            //list += '<li>' + this.locale.customRangeLabel + '</li>';
            list += '</ul>';
            this.container.find('.ranges ul').remove();
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }
        this.container.find('.calendar-time').hide();

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (typeof options.ranges === 'undefined') {
            this.container.addClass('show-calendar');
        }
        if (options.ranges) {
            this.container.find('.calendar.left').hide();
        }

        this.container.removeClass('opensleft opensright').addClass('opens' + this.opens);

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && this.autoUpdateInput) {
            if (this.startDateElement && this.endDateElement && this.endDate.isValid() && this.element.data().isEnd && this.element.val()) {
                this.element.val(this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.data().isStart && this.startDate.isValid() && this.element.val()) {
                this.element.val(this.startDate.format(this.locale.format));
            } else if (!this.element.data().isStart && !this.element.data().isEnd && this.startDate.isValid() && this.element.val()) {
                this.element.val(this.startDate.format(this.locale.format));
            }
        }
    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function (startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate;

            if (this.maxDate && this.startDate.isAfter(this.maxDate))
                this.startDate = this.maxDate;

            this.updateMonthsInView();
        },

        setEndDate: function (endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (typeof this.element.data().minDate === 'function') {
                var min = this.element.data().minDate.call();
                if (min) {
                    this.minDate = moment(min);
                } else {
                    this.minDate = moment(min);
                }
            }

            if (this.endDate.isBefore(this.minDate))
                this.endDate = this.minDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate;

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            this.updateMonthsInView();
        },

        isInvalidDate: function () {
            return false;
        },

        updateView: function () {

            this.updateMonthsInView();
            this.updateCalendars();
        },

        updateMonthsInView: function () {
            if (this.startDate && this.startDate.isValid() && this.element.data().isStart) {
                this.leftCalendar.month = this.startDate.clone().date(2);
            } else if (this.endDate && this.endDate.isValid() && this.element.data().isEnd) {
                this.leftCalendar.month = this.endDate.clone().date(2);
            } else if (this.startDate && this.startDate.isValid()) {
                this.leftCalendar.month = this.startDate.clone().date(2);
            } else if (this.minDate && this.minDate.isValid()) {
                this.leftCalendar.month = this.minDate.clone().date(2);
            } else {
                if(this.element.data().isStart){
                    this.leftCalendar.month = moment().clone().date(2).hour(0).minute(0).second(0);
                }else if(this.element.data().isEnd){
                    this.leftCalendar.month = moment().clone().date(2).hour(0).minute(0).second(0);
                }else{
                    this.leftCalendar.month = moment().clone().date(2);
                }
            }
        },

        updateCalendars: function () {

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            var customRange = false;
            var i = 0;
            for (var range in this.ranges) {
                //ignore times when comparing dates if time picker is not enabled
                if (this.startDate.format('yyyy-MM-dd') == this.ranges[range][0].format('yyyy-MM-dd') && this.endDate.format('yyyy-MM-dd') == this.ranges[range][1].format('yyyy-MM-dd')) {
                    customRange = false;
                    this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                    break;
                }
                i++;
            }
            if (customRange) {
                this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                this.showCalendars();
            }

        },

        renderCalendar: function (side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = this.leftCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            // Possible patch for issue #626 https://github.com/dangrossman/bootstrap-daterangepicker/issues/626
            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]).utcOffset(this.timeZone);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('yyyy-MM-dd') == this.minDate.format('yyyy-MM-dd') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('yyyy-MM-dd') == this.maxDate.format('yyyy-MM-dd') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            this.leftCalendar.calendar = calendar;

            //
            // Display the calendar
            //
            if (typeof this.element.data().minDate === 'function') {
                this.minDate = moment(this.element.data().minDate.call());
            }
            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay))) {
                html += '<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" yyyy");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay))) {
                html += '<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit+1).startOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (this.element.data().isStart && calendar[row][col].format('yyyy-MM-dd') == this.startDate.format('yyyy-MM-dd'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.element.data().isEnd && this.endDate != null && calendar[row][col].format('yyyy-MM-dd') == this.endDate.format('yyyy-MM-dd'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },


        move: function () {
            var parentOffset = {top: 0, left: 0},
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                    - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function (e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function (e) {
                this.outsideClick(e);
            }, this);
            // Bind global datepicker mousedown for hiding and
            $(document)
                .on('mousedown.daterangepicker', this._outsideClickProxy)
                // also support mobile devices
                .on('touchend.daterangepicker', this._outsideClickProxy)
                // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
                .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
                // and also close when focus changes to outside the picker (eg. tabbing between controls)
                .on('focusin.daterangepicker', this._outsideClickProxy);

            if (!this.startDate && typeof this.element.data().startDate === 'function')
                this.startDate = moment(this.element.data().startDate.call());

            if (!this.endDate && typeof this.element.data().endDate === 'function')
                this.endDate = moment(this.element.data().endDate.call());

            if (!this.minDate && typeof this.element.data().minDate === 'function')
                this.minDate = moment(this.element.data().minDate.call());

            if (!this.maxDate && typeof this.element.data().maxDate === 'function')
                this.maxDate = moment(this.element.data().maxDate.call());

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function (e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }
            var callbackFlag = true;
            if (this.element.is('input') && this.autoUpdateInput) {
                if (this.startDateElement && this.endDateElement) {
                    if (this.element.data().isStart && this.element.val() && !this.startDate.isValid()) {
                        this.element.val("");
                        callbackFlag = false;
                    } else if (this.element.data().isStart && this.startDate.isValid()) {
                        this.element.val(this.startDate.format(this.locale.format));
                        this.endDateElement.trigger('keyup.daterangepicker');
                    } else if (this.endDate.isValid()) {
                        this.element.val(this.endDate.format(this.locale.format));
                    } else if (this.element.val() && !this.endDate.isValid()) {
                        this.element.val("");
                        callbackFlag = false;
                    }
                    this.element.trigger('change');
                    this.element.trigger('blur');
                } else if (this.startDate.isValid()) {
                    this.element.val(this.startDate.format(this.locale.format));
                    this.element.trigger('change');
                    this.element.trigger('blur');
                }
            } else {
                if (this.startDateElement && this.endDateElement && this.startDate.isValid() && this.endDate.isValid()) {
                    this.startDateElement.val(this.startDate.format(this.locale.format));
                    this.endDateElement.val(this.endDate.format(this.locale.format));
                } else if (this.startDateElement && !(this.startDate.isValid() || this.startDateElement.valid())) {
                    this.startDateElement.val("");
                    callbackFlag = false;
                } else if (this.endDateElement && !(this.endDate.isValid() || this.endDateElement.valid())) {
                    this.endDateElement.val("");
                    callbackFlag = false;
                }
                if(this.startDateElement) {
                    this.startDateElement.trigger('change');
                    this.startDateElement.trigger('blur');
                }
                if(this.endDateElement) {
                    this.endDateElement.trigger('change');
                    this.endDateElement.trigger('blur');
                }
            }

            //if a new date range was selected, invoke the user callback function
            if (callbackFlag = false && (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate)))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            $(document).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function (e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function (e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
            e.type == "focusin" ||
            target.closest(this.element).length ||
            target.closest(this.container).length ||
            target.closest('.calendar-table').length
            ) return;
            this.controlChanged();
        },

        showCalendars: function () {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function () {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function (e) {
            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
            }
        },

        clickRange: function (e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                var start = dates[0];
                var end = dates[1];

                //start.startOf('day');
                //end.endOf('day');
                this.setStartDate(start);
                this.setEndDate(end)
                this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function (e) {
            this.leftCalendar.month.subtract(1, 'month');
            this.updateCalendars();
        },

        clickNext: function (e) {
            this.leftCalendar.month.add(1, 'month');
            this.updateCalendars();
        },

        clickDate: function (e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = this.leftCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            //

            if (!this.element.data().isEnd) {
                this.setStartDate(date.clone());
            }
            if (this.element.data().isEnd) {
                this.setEndDate(date.clone());
            }
            this.clickApply();
            this.updateView();

        },

        clickApply: function (e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function (e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function (e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.' + leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            this.leftCalendar.month.month(month).year(year);
            this.updateCalendars();
        },

        controlChanged: function () {
            this.isShowing = true;
            if (!this.element.is('input') && !this.element.is('button')) return;
            if (!this.element.val().length) {
                if (this.element.data().isStart) {
                    this.startDate = moment("");
                } else if (this.element.data().isEnd) {
                    this.endDate = moment("");
                } else if(!this.ranges){
                    this.startDate = moment("");
                }
            } else {
                var start;
                var end;
                if (!this.startDateElement && !this.endDateElement) {
                    start = moment(this.element.val(), this.locale.format);
                    end = start;
                } else {
                    if (!this.element.data().isEnd) {
                        start = moment(this.element.val(), this.locale.format);
                    }
                    if (this.element.data().isEnd) {
                        end = moment(this.element.val(), this.locale.format);
                    }
                }
                if (!this.element.data().isEnd) {
                    this.setStartDate(start);
                }
                if (this.element.data().isEnd) {
                    this.setEndDate(end);
                }
                if (this.startDateElement && this.endDateElement) {
                    if(!this.startDate.isValid() && this.startDateElement && this.element.data().isStart){
                        this.element.val("");
                    }
                    if(!this.endDate.isValid() && this.endDateElement && this.element.data().isEnd){
                        this.element.val("");
                    }
                } else {
                    if(!this.startDate.isValid()){
                        this.element.val("");
                    }
                }
                this.updateView();
            }
            this.clickApply();
        },

        keydown: function (e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.controlChanged();
            }
        },

        remove: function () {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function (options, callback) {
        this.each(function () {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };

}));
