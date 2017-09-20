/**
 * Created by jeff on 15-10-10.
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /*是否需要统计金额*/
        hasCount: true,
        init: function () {
            this._super();
            var siteId = $("#fundTypeSelect");
            if (siteId.length > 0) {
                select.setIndex(siteId, 0);
            }
            /*$('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });*/
        },
        bindEvent: function () {
            this.formSelector = "#fundsLog";
            var val = $("[name='siteId']").attr("val");
            $("[name='siteId']").val(val);

            var _that = this;
            this._super(this.formSelector);

            /*改变订单类别 账号类别*/
            $('.changeSearchInputName').on('change', function (event, obj) {
                var $this = $(this);
                var _data = $(this).data();
                $(_data.parent).find(_data.target).prop('name', $this.val());
            });
            /*禁止form提交*/
            $(this.formSelector).on('submit', function () {
                var $search_btn = $("._search_btn");
                //var opt = eval("(" + $search_btn.data('rel') + ")");
                //_that.query({page:window.page,currentTarget:$("._search_btn")},opt);
                $("._search_btn").click();
                return false;
            });
            //$(this.formSelector).submit(function(){
            //    debugger;
            //    return false;
            //})

            /**
             * 数据输入相关的文本框进行数字输入限制
             */
            this.validateNumber();

            /**
             * 资金类型全选
             */
            $('input[name=allSelect]').on('change', function () {
                _that.selectFundType();
            });

            /**
             * 资金类型所有存款
             */
            $('input[name=allDeposit]').on('change', function () {
                _that.selectFundType();
            });

            /**
             * 资金类型所有取款
             */
            $('input[name=allWithdraw]').on('change', function () {
                _that.selectFundType();
            });
        },
        /**
         * 资金类型选择
         */
        selectFundType: function () {
            var allSelect = $('input[name=allSelect]:checked').val();
            var allDeposit = $('input[name=allDeposit]:checked').val();
            var allWithdraw = $('input[name=allWithdraw]:checked').val();
            if (allSelect == 'true') {
                $("input[name='search.fundTypes']").prop("checked", true);
            } else {
                $("input[name='search.fundTypes']").prop("checked", false);
                if (allDeposit == 'true') {
                    $("input.deposit").prop("checked", true);
                } else {
                    $("input.deposit").prop("checked", false);
                }
                if (allWithdraw == 'true') {
                    $("input.withdraw").prop("checked", true);
                } else {
                    $("input.withdraw").prop("checked", false);
                }
            }
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /*高级筛选 按钮*/
        advancedFilter: function (event, option) {
            var $btn = $(event.currentTarget);
            $(".advanced-options").slideToggle("10");
            $btn.parent().toggleClass("show");
            $btn.unlock();
        },
        changeType: function (event) {
            var $fundTypeCheckboxs = $('#fundTypeCheckboxs');
            var $fundTypeSelect = $("#fundTypeSelect");
            switch (event.key) {
                case '':
                    $fundTypeCheckboxs.find("input[type=checkbox]").prop('checked', false);
                    break;
                case 'earning':
                    /*收入*/
                    $fundTypeCheckboxs.find("input[type=checkbox]").prop('checked', false);
                    $fundTypeCheckboxs.find('.earning').prop('checked', true);
                    break;
                case 'expend':
                    /*支出*/
                    $fundTypeCheckboxs.find("input[type=checkbox]").prop('checked', false);
                    $fundTypeCheckboxs.find('.expend').prop('checked', true);
                    break;
                case 'all':
                    /*全部*/
                    $fundTypeCheckboxs.find("input[type=checkbox]").prop('checked', true);
                    break;
                default:
                    /**/
                    break;
            }
            var allCheckbox = $('input[type="checkbox"]', $fundTypeCheckboxs);
            allCheckbox.on('click', function () {
                select.clearValue($fundTypeSelect);
                var checkedLength = $("input[type='checkbox']:checked", $fundTypeCheckboxs).length;
                if (allCheckbox.length === checkedLength) {
                    select.setValue($fundTypeSelect, 'all');
                }
            });
        },
        /*重写query方法*/
        query: function (e, p) {

            var $totalContent = $(".total_content");

            /*调用父类的query*/
            this._super(e, p);

            /*如果查询过列表改变 需要重新统计*/
            this.hasCount = true;

            /*如果是显示的就隐藏*/
            $totalContent.hide('normal');
        },
        resetHiddenValue: function (e,opt) {
            /*$("input[type=hidden][name^='search.']").val("");
            $("[name=outer]").val("");
            $("[name=comp]").val("");*/
            return true;
        },
        totalMoney: function (event, option) {

            var _that = this;

            /*显示统计金额*/
            var $totalContent = $(".total_content");

            /*当前按钮*/
            var $currentBtn = $(event.currentTarget);

            /*需要加载才去获取*/
            if (_that.hasCount && $totalContent.is(':hidden')) {
                window.top.topPage.ajax({
                    url: root + '/report/fundsLog/totalMoney.html',
                    data: window.top.topPage.getCurrentFormData(event),
                    type: 'POST',
                    success: function (data) {

                        /*转换为对象*/
                        var data = eval('(' + data + ')');

                        /*填充*/
                        if (data.totalMoney > 0) {
                            $('.total_money').addClass("co-green")
                        } else {
                            $('.total_money').addClass("co-red")
                        }
                        $('.total_money', $totalContent).text(data.totalMoney);
                        $('.total_count', $totalContent).text(data.totalCount);
                        /*展示*/
                        $totalContent.slideToggle();

                        /*统计过 置为false*/
                        _that.hasCount = false;

                        /*解锁*/
                        $currentBtn.unlock();
                    },
                    error: function (err) {
                        $currentBtn.unlock();
                    }
                });
            } else {

                /*展示||隐藏*/
                $totalContent.slideToggle();

                /*解锁*/
                $currentBtn.unlock();

            }

        },
        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');
        },
        changeKey2: function (e) {
            $('#operator2').attr('name', e.key).val('');
        },
        toExportHistory: function (e, opt) {
            if (opt.data&&opt.data.state) {
                $("#toExportHistory").click();
            }
        },
        exportData: function (e, opt) {
            var data = $("#conditionJson").val();
            return data;
        },
        validateData: function (e, opt) {
            if ($("[name='paging.totalCount']").val() == 0) {
                window.top.topPage.showWarningMessage(window.top.message.report_auto['查询无数据']);
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        },
        validateNumber: function () {
            var _this = this;
            $("input[name='search.startMoney'],input[name='search.endMoney']  ")
                .on("keyup", function () {
                    if (!/^\d+[.]?\d*$/.test(this.value)) {
                        this.value = /^\d+[.]?\d*$/.exec(this.value);
                    }
                    return false;
                })
        }
    });
});