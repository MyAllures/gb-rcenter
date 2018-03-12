define(['poshytip', 'bootstrap-dialog', 'eventlock', 'jqcountdown', 'daterangepicker', 'moment', 'css!commonCss/chosen/chosen.css', 'css!commonCss/bootstrap-daterangepicker/daterangepicker.css'], function (Poshytip, BootstrapDialog, eventlock, jqcountdown, daterangepicker, Moment) {

    return Class.extend({
        /**
         * 用于远程验证数组时，获取当前验证的element的索引
         */
        rowIndex: null,
        /**
         * 上次事件对象目标，用于需要两次的重复调用时，比如执行某项操作时需要验证安全密码，安全密码验证完成后自动继续执行相关操作
         */
        parentTarget: null,
        /**
         * form选择器，主要目的是为了限定Jquery事件绑定的范围，防止重复绑定
         */
        formSelector: "",
        /**
         * 保存弹出框的返回值变量
         */
        returnValue: null,
        config: null,
        /**
         * 查无记录自定义信息
         */
        noRecordMessage: window.top.message.common["table.norecords"],
        imageSilde: function (e, opt) {
            //e.imgs = ["http://boss.dev.so:8080/fserver/files/test/1/1439360641408.jpg"];
            window.top.topPage.imageSilde(e, opt);
        },
        /**
         * 日期选择改变回调示例
         * @param option.startDate
         * @param option.endDate
         */
        dateChangeCallBack: function (e, option) {
            console.log('===========' + e.startDate.format(e.format) + ' - ' + e.endDate.format('MMMM D, YYYY'));
        },
        /**
         * 在控件的上方显示依哥提示弹出层
         * @param obj
         * @param type
         * @param msg
         */
        showPopover: function (e, btnOption, type, msg, withCountDown) {
            var $obj = $(e.currentTarget);
            var placement = "";
            if (btnOption && btnOption.placement) {
                placement = btnOption.placement;
            } else {
                placement = 'top';
            }
            $obj.popover({
                placement: placement,
                title: function () {
                    return "";
                },
                container: "body",
                html: true,
                template: "<div class='popover " + type + "' role='tooltip'><div class='arrow'></div><div class='popover-content'></div></div>",
                content: msg
            });
            e.popoverObj = $obj.popover('show');
            if (withCountDown == true) {
                window.top.topPage.showPopoverCountDown(e, btnOption);
            }
        },
        /**
         * 提示信息回调
         * @param e
         * @param btnOption
         */
        /*showPopoverCountDown: function (e, btnOption) {
         var $obj = $(e.currentTarget);
         var timeNext = new Date();
         timeNext.setTime(timeNext.getTime() + 1500);
         $obj.countdown(timeNext).on('finish.countdown', function () {
         $obj.popover("destroy");
         if (btnOption && btnOption.callback) {
         window.top.topPage.doPageFunction(e, btnOption.callback, btnOption);
         }
         });
         },*/
        /**
         * 初始化日期选择控件
         * @param ojb
         */
        initDatePick: function ($ojb) {
            var _this = this;
            $.each($ojb, function (index, item) {

                var $item = $(item);
                var $text = $("input[type='text']", $item);
                var data = eval("(" + $text.attr('data-rel') + ")");
                var optionRange = {};
                var optionStart = {};
                var optionEnd = {};
                var optionSinlge = {};

                var option = {};
                option.autoApply = true;
                option.utcOffSet = window.top.utcOffSet;
                option.timeZone = window.top.utcOffSet;
                option.locale = Moment().locales[window.top.language];
                option.locale.format = data.format || option.locale.format;
                option.drops = data.drops;
                option.callback = data.callback;

                if (data.maxDate) {
                    option.maxDate = data.maxDate;
                }
                if (data.opens == "left") {
                    option.opens == "right";
                }
                else if (data.opens == "right") {
                    option.opens == "left";
                } else {
                    option.opens = data.opens;
                }
                optionStart = $.extend(optionStart, option);
                optionEnd = $.extend(optionEnd, option);
                optionSinlge = $.extend(optionSinlge, option);
                optionRange = $.extend(optionRange, option);

                if (data) {

                    if (data.useRange == true) {
                        optionRange.ranges = {};
                        var momentToday = new Moment().locale(window.top.language).utcOffset(window.top.utcOffSet);
                        var momentYesterday = momentToday.clone().subtract(1, 'days');
                        var momentThisWeek = momentToday.clone().startOf('week');
                        var momentTDBYesterday = momentToday.clone().subtract(2, 'days');
                        var momentLastWeek = momentToday.clone().subtract(1, 'week');
                        var momentThisMonth = momentToday.clone().startOf('month');
                        var momentLastMonth = momentToday.clone().subtract(1, 'month');
                        var momentLast7Days = momentToday.clone().subtract(6, 'days');
                        var momentLast30Days = momentToday.clone().subtract(29, 'days');

                        if (data.today == true) {
                            optionRange.ranges[window.top.message.common["daterange.Today"]] =
                                [momentToday.startOf('day').format(data.format), momentToday.clone().subtract(-1, "days").startOf('day').format(data.format)];
                        }
                        if (data.yesterday == true) {
                            optionRange.ranges[window.top.message.common["daterange.Yesterday"]] =
                                [momentYesterday.startOf('day').format(data.format), momentYesterday.clone().subtract(-1, "days").startOf('day').format(data.format)];
                        }
                        if (data.beforeYesterday == true) {
                            optionRange.ranges[window.top.message.common["daterange.TheDayBeforeYesterday"]] =
                                [momentTDBYesterday.startOf('day').format(data.format), momentTDBYesterday.clone().subtract(-1, "days").startOf('day').format(data.format)];
                        }
                        if (data.thisWeek == true) {
                            optionRange.ranges[window.top.message.common["daterange.ThisWeek"]] =
                                [momentThisWeek.startOf('week').format(data.format), momentThisWeek.clone().subtract(-1, "week").startOf('day').format(data.format)];
                        }
                        if (data.lastWeek == true) {
                            optionRange.ranges[window.top.message.common["daterange.LastWeek"]] =
                                [momentLastWeek.startOf('week').format(data.format), momentLastWeek.clone().subtract(-1, "week").startOf('day').format(data.format)];
                        }
                        if (data.thisMonth == true) {
                            optionRange.ranges[window.top.message.common["daterange.ThisMonth"]] =
                                [momentThisMonth.startOf('month').format(data.format), momentThisMonth.clone().subtract(-1, "month").startOf('day').format(data.format)];
                        }
                        if (data.lastMonth == true) {
                            optionRange.ranges[window.top.message.common["daterange.LastMonth"]] =
                                [momentLastMonth.startOf('month').format(data.format), momentLastMonth.clone().subtract(-1, "month").startOf('day').format(data.format)];
                        }
                        if (data.last7Days == true) {
                            optionRange.ranges[window.top.message.common["daterange.Last7Days"]] =
                                [momentLast7Days.startOf('day').format(data.format), (data.useToday ? momentToday.clone().subtract(-1, "days").startOf('day').format(data.format)
                                    : momentYesterday.clone().subtract(-1, "days").startOf('day').format(data.format))];
                        }
                        if (data.last30Days == true) {
                            optionRange.ranges[window.top.message.common["daterange.Last30Days"]] =
                                [momentLast30Days.startOf('day').format(data.format), (data.useToday ? momentToday.clone().subtract(-1, "days").startOf('day').format(data.format)
                                    : momentYesterday.clone().subtract(-1, "days").startOf('day').format(data.format))];
                        }

                        if (data.useToday == true) {
                            optionRange.ranges[window.top.message.common["daterange.Today"]];
                        }

                        if (Object.keys(optionRange.ranges).length > 0) {
                            optionRange.startDate = optionRange.ranges[Object.keys(optionRange.ranges)[0]][0];
                            optionRange.endDate = optionRange.ranges[Object.keys(optionRange.ranges)[0]][1];
                        }
                        optionRange.startDateElement = $("input[name='" + data.startName + "']");
                        optionRange.endDateElement = $("input[name='" + data.endName + "']");
                    } else {
                        if (data.startDate) {
                            optionRange.startDate = data.startDate
                        }
                        if (data.minDate) {
                            optionSinlge.minDate = data.minDate;
                        }
                    }


                    //页面回退时回填数据
                    if (data.useRange) {
                        var startField = $("input[name='" + data.startName + "']");
                        var endField = $("input[name='" + data.endName + "']");

                        if (startField.length > 0 && endField.length > 0 && startField.val() != "" && endField.val() != "") {
                            startField.prop("value", startField.val());
                            endField.prop("value", endField.val());
                        }
                        if (data.startName == $text.attr("name")) {
                            optionStart.isStart = true;
                            optionStart.showDropdowns = data.showDropdowns;
                            optionStart.startDateElement = $("input[name='" + data.startName + "']");
                            optionStart.endDateElement = $("input[name='" + data.endName + "']");
                            optionStart.startDate = function () {
                                var startDate = $("input[name='" + data.startName + "']");
                                if (startDate.val()) {
                                    return startDate.val();
                                } else {
                                    if (data.startDate) {
                                        return data.startDate;
                                    } else {
                                        return "";
                                    }
                                }
                            };
                            if (data.minDate) {
                                optionStart.minDate = data.minDate;
                            }
                            startField.daterangepicker(optionStart);
                            startField.bind("apply.daterangepicker", function (e, picker) {
                                var start = picker.startDate;
                                var end = picker.endDate;
                                $text.attr("data-rel", JSON.stringify(data).replace(/"/g, "'"));
                                if (optionStart.callback) {
                                    window.top.topPage.doPageFunction(
                                        {
                                            currentTarget: $text[0],
                                            page: _this,
                                            format: optionStart.locale.format,
                                            startDate: start,
                                            endDate: end
                                        }, optionStart.callback, optionStart)
                                } else {
                                    console.log('New date range selected: ' + start.format('yyyy-MM-dd') + ' to ' + end.format('yyyy-MM-dd'));
                                }
                            });
                        }
                        if (data.endName == $text.attr("name")) {
                            optionEnd.isEnd = true;
                            optionEnd.showDropdowns = data.showDropdowns;
                            optionEnd.startDateElement = $("input[name='" + data.startName + "']");
                            optionEnd.endDateElement = $("input[name='" + data.endName + "']");
                            optionEnd.minDate = function () {
                                var startDate = $("input[name='" + data.startName + "']");
                                if (startDate.val()) {
                                    return startDate.val();
                                } else {
                                    if (data.minDate) {
                                        return data.minDate;
                                    } else {
                                        return "";
                                    }
                                }
                            };
                            var quickSelect = $item.next();
                            if (quickSelect.hasClass("daterangepickers")) {
                                if (data.minDate) {
                                    optionRange.minDate = data.minDate;
                                }
                                optionRange.singleDatePicker = false;
                                quickSelect.daterangepicker(optionRange);
                                quickSelect.bind("apply.daterangepicker", function (e, picker) {
                                    var start = picker.startDate;
                                    if (start._i) {
                                        picker.startDateElement.attr("value", start.format(picker.locale.format));
                                    }
                                    var end = picker.endDate;
                                    if (end._i) {
                                        picker.endDateElement.attr("value", end.format(picker.locale.format));
                                    }

                                    $text.attr("data-rel", JSON.stringify(data).replace(/"/g, "'"));
                                    if (optionEnd.callback) {
                                        window.top.topPage.doPageFunction(
                                            {
                                                currentTarget: $text[0],
                                                page: _this,
                                                format: optionEnd.locale.format,
                                                startDate: start,
                                                endDate: end
                                            }, optionEnd.callback, optionEnd)
                                    } else {
                                        console.log('New date range selected: ' + start.format('yyyy-MM-dd') + ' to ' + end.format('yyyy-MM-dd'));
                                    }
                                });
                            }
                            endField.daterangepicker(optionEnd);
                            endField.bind("apply.daterangepicker", function (e, picker) {
                                var start = picker.startDate;
                                var end = picker.endDate;
                                $text.attr("data-rel", JSON.stringify(data).replace(/"/g, "'"));
                                if (optionEnd.callback) {
                                    window.top.topPage.doPageFunction(
                                        {
                                            currentTarget: $text[0],
                                            page: _this,
                                            format: optionEnd.locale.format,
                                            startDate: start,
                                            endDate: end
                                        }, optionEnd.callback, optionEnd)
                                } else {
                                    console.log('New date range selected: ' + start.format('yyyy-MM-dd') + ' to ' + end.format('yyyy-MM-dd'));
                                }
                            });
                        }
                    } else {
                        $text.prop("value", $text.val());
                        optionSinlge.showDropdowns = data.showDropdowns;
                        $text.daterangepicker(optionSinlge);
                        $text.bind("apply.daterangepicker", function (e, picker) {
                            var start = picker.startDate;
                            var end = picker.endDate;
                            $text.attr("data-rel", JSON.stringify(data).replace(/"/g, "'"));
                            if (optionSinlge.callback) {
                                window.top.topPage.doPageFunction(
                                    {
                                        currentTarget: $text[0],
                                        page: _this,
                                        format: optionSinlge.locale.format,
                                        startDate: start,
                                        endDate: end
                                    }, optionSinlge.callback, optionSinlge)
                            } else {
                                console.log('New date range selected: ' + start.format('yyyy-MM-dd') + ' to ' + end.format('yyyy-MM-dd'));
                            }
                        });
                    }
                }
            });

        },
        /**
         * 刷新页面操作，负责显示刷新时间和间隔
         * @param e
         * @param opt
         * @returns {boolean}
         */
        refreshPage: function (e, opt) {
            var $target = $(e.currentTarget);
            if (opt.target == "query") {
                if (opt.callback == "") {
                    opt.callback = "setCountDown";
                    //function无callback，所以在这里执行setCountDown方法
                    window.top.topPage.doPageFunction(e, opt.callback, opt);
                } else {
                    opt.callback = function (e, opt) {
                        window.top.topPage.doPageFunction(e, opt.callback, opt);
                        e.page.setCountDown(e, opt);
                    };
                }
            }
            if ($target.hasClass("countdown")) {
                return false;
            }
            return true;
        },
        doRefreshPage: function (e, opt) {

        },
        /**
         * 设置刷新后的倒计时提示
         * @param e
         * @param opt
         */
        setCountDown: function (e, opt) {
            var $target = $(e.currentTarget);
            $target.addClass("countdown");
            var timenow = new Date();
            var timeNext = new Date();
            var refreshInterval = 100000;
            if (opt.refreshInterval && parseInt(opt.refreshInterval) > 0) {
                refreshInterval = parseInt(opt.refreshInterval);
            }
            timeNext.setTime(timeNext.getTime() + refreshInterval);

            $target.countdown(timeNext, function (event) {
                $target.unbind("mouseover").bind("mouseover", function (event) {
                    $target.popover({
                        trigger: 'hover',
                        content: window.top.message.common['last_refresh_time'] + window.top.topPage.formatToMyDateTime(timenow, window.top.dateFormat.daySecond)
                    });
                });
            });
            $target.removeClass("countdown");
        },
        /**
         * 处理查询无数据
         */
        checkNoRecords: function () {
            var _this = this;
            $.each($(".dataTable tbody", this.formSelector), function (index, item) {
                if ($("tr", item).length == 0) {
                    $(item).append("<tr><td class='no-content_wrap' colspan='" + $("th", $("thead tr", $(item).parent())).length + "'>" +
                        "<div><i class='fa fa-exclamation-circle'></i> " + _this.noRecordMessage + "</div></td></tr>")
                }
            })
        },
        /**
         * 返回上一个页面的回调
         * @param e
         * @param option
         */
        goToLastPage: function (e, option) {
            window.top.topPage.goToLastPage(option.refresh);
            $(e.currentTarget).unlock();
        },
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            var _this = this;
            //window.ZeroClipboard=ZeroClipboard;
            this.formSelector = formSelector || this.formSelector;
            //this.bindButtonEvents();
            //this.initCaptcha();
            config = {
                '.chosen-select': {},
                '.chosen-select-deselect': {allow_single_deselect: true},
                '.chosen-select-no-single': {disable_search_threshold: 10},
                '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
                '.chosen-select-width': {width: "95%"}
            };
            this.bindEvent();
            this.onPageLoad();
            if (window.top.topPage) {
                window.top.topPage.hashEvent.page = this;
            }


        },
        onPageLoad: function () {
            var _this = this;
            this.initSelect();
            this.initDatePick($("div.daterangepickers", this.formSelector));
            select.initAjaxList(select);
            $('.navbar-minimalize').unbind("click");
            $('.navbar-minimalize').click(function () {
                $("body").toggleClass("mini-navbar");
                _this.SmoothlyMenu();
            });
            //重新加载页面，把原来页面保留的提示框popover清除,因为原来的提示框非在formselector,故不加限制
            $(".popover").popover('destroy');
            this.initContentWidth();
            //解决IE浏览器,IFrame关闭失去焦点,无法输入问题-alvin on 2016-12-26.
            var fd = $(this.formSelector + " textarea,input:not('[name=\"paging.pageNumberText\"]'):not('.daterangepickers input'):not('[readonly]'):not('[type=radio]'):input:visible:enabled:first")[0];
            if (fd) {
                var value = $(fd).val();
                $(fd).focus().val(value);
            }

            $("html,body").scrollTop(0);
            //页面中点击？文案提示
            $('.help-popover', _this.formSelector).popover({
                trigger: 'hover'
            });
            $('.popover', _this.formSelector).popover();
        },
        /**
         * 前进后退清除内容，以便重新初始化
         */
        unInitFileInput: function ($ele) {
            //前进后退清除内容，以便重新初始化
            $.each($ele, function (index, item) {
                if ($(item).parent().hasClass("btn-file")) {
                    var $cont = $(item).parent().parent().parent().parent();
                    $cont.find('.file-drop-zone').off();
                    $(item).insertBefore($cont).off('.fileinput').removeData();
                    $cont.off().remove();
                }
            });
            return $ele;
        },
        /**
         * 前进后退清除内容，以便重新初始化
         * @param el
         */
        unInitSwitch: function ($bootstrapSwitch) {
            $.each($bootstrapSwitch, function (index, item) {
                var bootstrap = $(item).parent().parent();
                if (bootstrap.hasClass("bootstrap-switch")) {
                    $(item).insertBefore(bootstrap);
                    bootstrap.remove();
                }
            });
            return $bootstrapSwitch;
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            $(this.formSelector).bind("keydown", function (event) {
                var target, code, tag;
                if (!event) {
                    event = window.event; //针对ie浏览器
                    target = event.currentTarget;
                    code = event.keyCode;
                    if (code == 13) {
                        tag = target.tagName;
                        if (tag == "FORM" && event.target.tagName != 'TEXTAREA') {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
                else {
                    target = event.currentTarget; //针对遵循w3c标准的浏览器，如Firefox
                    code = event.keyCode;
                    if (code == 13) {
                        tag = target.tagName;
                        if (tag == "FORM" && event.target.tagName != 'TEXTAREA') {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
            });
            $(window).resize(function () {          //当浏览器大小变化时
                $("div.elli").addClass("hide");
                _this.initContentWidth();
            });
        },
        /**
         * 左侧菜单折叠
         */
        SmoothlyMenu: function () {
            if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                // Hide menu in order to smoothly turn on when maximize menu
                $('#side-menu').hide();
                // For smoothly turn on menu
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(500);
                    }, 100);
            } else if ($('body').hasClass('fixed-sidebar')) {
                $('#side-menu').hide();
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(500);
                    }, 300);
            } else {
                // Remove all inline style from jquery fadeIn function to reset menu state
                $('#side-menu').removeAttr('style');
                $('#side-menu > [data-toggle="tooltip"]').tooltip({
                    placement: right
                });
            }
        },
        /**
         * 自动绑定Button标签的所有按钮事件
         */
        bindButtonEvents: function () {
            window.top.topPage.bindButtonEvents(this, document);
        },
        selectContainer: '<div selectdiv="{name}" value="{selected}" class="{class}" initprompt="{initprompt}" callback="{callback}">' +
        '<input type="hidden" name="{name}" value="{value}" id="{id}">' +
        '<button type="button" class="{app}" data-toggle="dropdown" style="overflow: hidden;padding-right: 10px; max-width: 536px;{btnStyle}" aria-expanded="false">' +
        '<span prompt="prompt" style="display:inline-block;min-width: 60px;">{initprompt}</span> ' +
        '<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu" style="{ulStyle}" role="menu" aria-labelledby="dropdownMenu1">{items}</ul>' +
        '</div>',
        selectOption: '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" {data} key="{value}" style="white-space: normal;">{text}</a></li>',
        _initSelect: function ($el, change) {
            if ($el.length == 0) {
                return;
            }
            var _this = this;
            if ($el[0].tagName == "SELECT" && select.name == "select") {
                var items = "";
                var app = $el.attr('app' || "");
                if (typeof(app) == 'undefined') {
                    app = 'btn btn-default dropdown-toggle';
                }
                var sel = _this.selectContainer.replace('{value}', $el.val() || "")
                    .replace('{selected}', $("option:selected", $el).val() || "")
                    .replace('{initprompt}', $("option:selected", $el).text() || "")
                    .replace('{initprompt}', $("option:selected", $el).text() || "")
                    .replace('{callback}', $el.attr("callback") || "")
                    .replace('{class}', ($el.attr('class') || ""))
                    .replace('{name}', $el.attr('name') || "")
                    .replace('{name}', $el.attr('name') || "")
                    .replace('{id}', $el.attr('id') || "")
                    .replace('{app}', app)
                    .replace('{btnStyle}', $el.attr('btnStyle'))
                    .replace('{ulStyle}', $el.attr('ulStyle'));
                $("option", $el).each(function (index, opt) {
                    var data = "";
                    for (var i = 0; i < opt.attributes.length; i++) {
                        if (opt.attributes[i].name != "value") {
                            data += " " + opt.attributes[i].name + "='" + opt.attributes[i].value + "'";
                        }
                    }
                    items += _this.selectOption.replace('{data}', data)
                        .replace('{value}', opt.value)
                        .replace('{text}', $(opt).text());
                });

                var $sel = $(sel.replace('{items}', items));
                $sel.insertBefore($el);
                $el.remove();
                $el = $("input", $sel);
            }
            _this.bindSelectChange($el, change);
        },
        bindSelectChange: function ($input, change) {
            $input.change(function (e) {
                if (change && change.constructor == Function) {
                    change(e);
                }
                var $this = $(this);
                if ($this.valid) {
                    $this.valid();
                }
            });

        },
        /**
         * 下拉框初始调用
         */
        initSelect: function () {
            var _this = this;
            for (var selector in config) {
                _this.initSelectOne($(selector, this.formSelector));
            }
        },
        /**
         * 动态增加下拉框初始调用,绑定事件
         */
        initSelectOne: function ($item, selector, change, option) {
            var _this = this;
            $item.each(function (index, el) {
                var $el = $(el);
                if ($el[0].tagName == "SELECT")
                    _this._initSelect($el, change);
            });
        },
        /**
         * 标签展示
         */
        initShowTab: function () {
            $(this.formSelector, document).on('shown.bs.tab', function (e) {
                var activeTab = $(e.target);
                var isLoad = $(activeTab).attr("data-load");
                if (isLoad != '1') {
                    var tabId = $(activeTab).attr("href");
                    var url = $(activeTab).attr("data-href");
                    window.top.topPage.ajax({
                        url: url,
                        loading: true,
                        success: function (data) {
                            $(tabId).html(data);
                            $(activeTab).attr("data-load", "1");
                        },
                        error: function (data) {

                        }
                    })
                }
            });
        },
        /**
         * Resize Dailog 自适应
         */
        resizeDialog: function () {
            var dialog = null;
            $.each(window.top.topPage.bootstrapDialog.dialogs, function (id, dialogInstance) {
                var centWin = $("iframe", dialogInstance.$modalDialog)[0];
                if (dialogInstance.isRealized() && dialogInstance.isOpened() &&
                    centWin && centWin.contentWindow.location.href == window.location.href) {
                    dialog = dialogInstance;
                }
            });
            window.top.topPage.doResizeDialog(dialog);
        },
        /**
         * 检查一个Json对象是不是为空
         * @param obj
         * @returns {boolean}
         */
        isEmpty: function (obj) {
            return window.top.topPage.isEmpty(obj);
        },
        /**
         * 关闭当前对话框页面
         * @param e
         * @param option
         */
        closePage: function () {
            window.top.topPage.closeDialog();
        },
        /**
         * 获取顶级或者指定窗口的可用大小
         * @param win       指定的Window对象，为空时则取window.top对象
         * @returns {*[]}   尺寸的数字数组，如：[750 ,500]
         */
        getWindowSize: function (win) {
            return window.top.topPage.getWindowSize(win);
        },
        /**
         * 根据指定的区域大小计算居中的位置
         * @param offset    以逗号隔开的两个数字字符串，如：”700,400“
         * @param area      区域大小的数字数组，如：[750 ,500]
         * @returns {*[]}   位置的数字数组，如：[750 ,500]
         */
        getCenterOffset: function (offset, area) {
            return window.top.topPage.getCenterOffset(offset, area);
        },
        /**
         * 根据传入的字符串获取指定或默认区域大小
         * @param area      以逗号隔开的两个数字字符串，如：”700,400“
         * @returns {*[]}   区域大小的数字数组，如：[750 ,500]
         */
        getArea: function (area) {
            return window.top.topPage.getArea(area);
        },
        /**
         * 根据当前的时间对象获取所对应的Form对象
         * @param e         发起事件
         * @returns {*}     返回Form对象
         */
        getCurrentForm: function (e) {
            e.page = e.page || this;
            return window.top.topPage.getCurrentForm(e);
        },
        /**
         * 根据标签获取第一个父对象
         * @param e         事件对象
         * @param tag       标签
         * @returns {*}     返回第一个父Tag对象
         */
        getFirstParentByTag: function (e, tag) {
            e.page = e.page || this;
            return window.top.topPage.getFirstParentByTag(e, tag);
        },
        /**
         *获取当前事件Form对象的Action属性
         * @param e             事件对象
         * @returns {string}    Form的Action
         */
        getCurrentFormAction: function (e) {
            e.page = e.page || this;
            return window.top.topPage.getCurrentFormAction(e);
        },
        /**
         * 获取当前事件Form数据的serialize值
         * @param e             事件对象
         * @returns {*|jQuery}  Form数据serialize值
         */
        getCurrentFormData: function (e) {
            e.page = e.page || this;
            return window.top.topPage.getCurrentFormData(e);
        },
        currentMenuTitle: function (url) {
            return window.top.topPage.currentMenuTitle(url);
        },
        /**
         * 获取URL参数
         * @param para
         * @returns {*|返回参数值}
         */
        getUrlParam: function (para) {
            return window.top.topPage.getUrlParam(window.location, para);
        },
        /**
         * 获取站点跟路径
         * @returns {*}
         */
        getWebRootPath: function () {

            return window.top.topPage.getWebRootPath();
        },
        /**
         * 初始化验证码
         */
        initCaptcha: function () {
            var _this = this;
            var url = null;
            $(this.formSelector, document).on("click", "[reloadable]", function (e) {
                //lock
                var isLocked = $(e.currentTarget).isLocked();
                if (isLocked) {
                    return;
                }
                if (!url) {
                    url = e.currentTarget.src;
                }
                e.currentTarget.src = url + '?t=' + Math.random();
                $("input[name=code]").val("");
            });
        },
        /**
         * 获取表单验证规则
         * @param $form
         * @returns {*}
         */
        getValidateRule: function ($form) {
            var $ruleDiv = $form.find('div[id=validateRule]');
            if ($ruleDiv.length > 0) {
                var rule = eval("({" + $ruleDiv.text() + "})");
                rule.ignore = ".ignore";
                return rule;
            }
            return null;
        },

        parentTarget: undefined,

        /**
         * 判断给定的数组中不为空的元素是否小于给定的count值
         *
         * @param values 值数组
         * @param count 预期不为空的元素个数
         * @returns {boolean}
         */
        testNotBlankCount: function (values, count) {
            var c = 0;
            if (values.length) {
                for (i in values) {
                    (typeof values[i] == "object" ? values[i].val() : values[i]) && c++;
                }
            }
            return count != 0 && c < count;
        },
        /**
         * 图片预览
         * 预览soul button中的图片，img标签需要有 data-src 属性
         * @param e
         * @param p
         */
        previewImg: function (e, p) {
            var images = $('img', e.currentTarget);
            e.imgs = [];
            if (images[1]) {
                images.each(function (index, obj) {
                    e.imgs.push($(obj).attr('data-src'));
                })
            } else {
                e.imgs.push(images.attr('data-src'))
            }
            //e.imgs = [$('img',e.currentTarget).attr('data-src')];
            window.top.topPage.imageSilde(e, p);
            //$(e.currentTarget).unlock();
        },
        reloadCurrentTab: function (e, b) {
            var $current_tab = $('.nav-tabs .active', this.formSelector);
            var $current_a = $("a[data-toggle]", $current_tab);
            //$current_a.data({load:'2'});
            //$current_a.tab('show');//TODO
            var tabId = $current_a.attr("href");
            var url = $current_a.attr("data-href");
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    $(tabId).html(data);
                }
            });
            $(e.currentTarget).unlock();
        },
        initContentWidth: function () {
            $("div.elli").each(function (idx, item) {
                var width = $($(item).parent()).width();
                $(item).css("width", (width) + "px");
                if ($(item).attr("class").indexOf("hide") > -1) {
                    $(item).removeClass("hide");
                    $(item).css("display", '');
                } else {
                    $(item).css("display", '');
                }
                if ($(item).children().length == 0) {
                    $(item).attr("title", $(item).html());
                } else {
                    //超长异常信息有会有generated标签
                    if ($(item).children()[0].localName == 'generated') {
                        $(item).attr("title", $(item).html());
                    }
                }
            });

            $("div.scroll").each(function (idx, item) {
                var width = $($(item).parent()).width();
                $(item).css("width", (width) + "px");
                $(item).text($(item).text().trim());
            });
        },
        /**
         * 将表单对象转为json对象
         * @param formValues
         * @returns
         */
        convertToJson: function (formValues) {
            var result = {};
            for (var formValue, j = 0; j < formValues.length; j++) {
                formValue = formValues[j];
                var name = formValue.name;
                var value = formValue.value;
                if (name.indexOf('.') < 0) {
                    result[name] = value;
                    continue;
                } else {
                    var simpleNames = name.split('.');
                    // 构建命名空间
                    var obj = result;
                    for (var i = 0; i < simpleNames.length - 1; i++) {
                        var simpleName = simpleNames[i];
                        if (simpleName.indexOf('[') < 0) {
                            if (obj[simpleName] == null) {
                                obj[simpleName] = {};
                            }
                            obj = obj[simpleName];
                        } else { // 数组
                            // 分隔
                            var arrNames = simpleName.split('[');
                            var arrName = arrNames[0];
                            var arrIndex = parseInt(arrNames[1]);
                            if (obj[arrName] == null) {
                                obj[arrName] = []; // new Array();
                            }
                            obj = obj[arrName];
                            multiChooseArray = result[arrName];
                            if (obj[arrIndex] == null) {
                                obj[arrIndex] = {}; // new Object();
                            }
                            obj = obj[arrIndex];
                        }
                    }

                    if (obj[simpleNames[simpleNames.length - 1]]) {
                        var temp = obj[simpleNames[simpleNames.length - 1]];
                        obj[simpleNames[simpleNames.length - 1]] = temp;
                    } else {
                        obj[simpleNames[simpleNames.length - 1]] = value;
                    }

                }
            }
            return result;
        },
        /*
         * 设置cookie
         * @param c_name
         * @param value
         * @param expiredays
         * */
        setCookie: function (c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ";path=/" +
                ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
        },
        /**
         * 获取cookie
         * @param c_name cookie key
         */
        getCookie: function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start, c_end))
                }
            }
            return ""
        },
        formatStr: function () {
            var ary = [];
            for (var i = 1; i < arguments.length; i++) {
                ary.push(arguments[i]);
            }
            return arguments[0].replace(/\{(\d+)\}/g, function (m, i) {
                return ary[i];
            });
        },
        /**
         * 复制文本
         * @param copyObj
         */
        copyText: function (copyObj) {
            //复制按钮
            var clip = new clipboard(copyObj);
            clip.on('success', function (e) {
                e.clearSelection();
                e.currentTarget = e.trigger;
                var opt = {};
                var placement = $(e.currentTarget).attr("data-clipboard-placement");
                if (placement) {
                    opt.placement = placement;
                }
                page.showPopover(e, opt, 'success', window.top.message.fund_auto['复制成功'], true);
            });

            clip.on('error', function (e) {
                console.error('复制失败:', e.action);
            });

        },
        /**
         * enter回车提交
         * @param obj
         */
        enterSubmit: function (obj) {
            $(document).unbind('keyup');
            $(document).keyup(function(event){
                if(event.keyCode ==13 && $(obj+":visible")[0]!=undefined){
                    $(obj+":visible")[0].focus();
                    $(obj+":visible")[0].click();
                }
            });
        }
    });

});