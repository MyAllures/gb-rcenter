/**
 * Created by Faker on 16-11-09
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this.formSelector = "form[name=fundRecordForm]";
            this._super(this.formSelector);
            //this.initRanks();
            this.initOrigin();
            if ($(".fundsLog").css("display") == 'block') {
                this.initSum();
            }
        },
        onPageLoad: function () {
            this._super();
            $('[data-toggle="popover"]', this.formSelector).popover({
                trigger: 'hover',
                html: true
            })
            this.reWrite();
        },
        bindEvent: function () {
            var _that = this;
            /**
             * 资金类型下拉
             */
            $('.type-search-btn', _that.formSelector).on('click', function (e) {
                $(this).toggleClass("open");
                $(".type-search").toggle();
                $(".rank-btn").siblings(".dropdown-menu").css("display", "none");
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });
            /**
             * 绑定下拉层级事件
             */
            $(".rank-btn", _that.formSelector).on("click", function (e) {
                if ($(this).siblings(".dropdown-menu").css("display") == "none" || typeof $(this).siblings(".dropdown-menu").css("display") == "undefined") {
                    $(this).siblings(".dropdown-menu").css("display", "block");
                } else {
                    $(this).siblings(".dropdown-menu").css("display", "none");
                }
                $(".type-search").css("display", "none");
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });
            $(document).on('click', function (e) {
                $(".type-search", _that.formSelector).css("display", "none");
                $(".rank-btn", _that.formSelector).siblings(".dropdown-menu").css("display", "none");
            });
            //阻止事件冒泡
            $(".type-search", _that.formSelector).on('click', function (e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });
            $(".playerRank", _that.formSelector).parent().on('click', function (e) {
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });
            $(".type-search", _that.formSelector).find(".tranType").change(function (e) {
                /**
                 * 资金类型显示选择条数
                 */
                var length = $(".tranType:checked", this.formSelector).length;
                if (length == 0) {
                    $('.tranTypeNum').text(window.top.message.report_auto['请选择']);
                } else {
                    $('.tranTypeNum').text(window.top.message.report_auto['已选'] + length + window.top.message.report_auto['项']);
                }
                //单个资金类型触发分类变化
                var isall = true;
                $(e.currentTarget).parents("td").find(".tranType").each(function () {
                    if (!$(this).prop("checked")) {
                        isall = false;
                        return false;
                    }
                })
                $(".Ptype[data-type='" + $(e.currentTarget).data("type") + "']").prop("checked", isall);
                _that.TransParent();
                _that.displayTrans();

                var fundTypeMemory = [];
                $(".tranType:checked", this.formSelector).each(function () {
                    var fundTypeRelation = {};
                    fundTypeRelation.name = this.name;
                    fundTypeRelation.value = $(this).val();
                    fundTypeMemory.push(fundTypeRelation);
                })
                $("#fundTypeMemory").val(JSON.stringify(fundTypeMemory));
            });
            /**
             * 资金类型全选/反选/所有存款/所有取款/公司入款/线上支付
             */
            $(".type-search div button", _that.formSelector).on('click', function () {
                var type = $(this).data('type');
                if (type == 'all') {
                    $('.type-search').find(".tranType").each(function (e) {
                        if (!$(this).prop('checked')) {
                            $(this).prop('checked', true).change();
                        }
                    })
                } else if (type == 'clear') {
                    $('.type-search').find(".tranType").each(function (e) {
                        if ($(this).prop('checked')) {
                            $(this).prop('checked', false).change();
                        }
                    })
                } else if (type == 'deposit') {
                    if ($(this).hasClass('btn-outline')) {
                        $("input.deposit").not("input:checked").prop("checked", true).change();
                        $(this).removeClass('btn-outline');
                    } else {
                        $("input.deposit:checked").prop("checked", false).change();
                        $(this).addClass('btn-outline');
                    }
                } else if (type == 'withdraw') {
                    if ($(this).hasClass('btn-outline')) {
                        $("input.withdraw").not("input:checked").prop("checked", true).change();
                        $(this).removeClass('btn-outline');
                    } else {
                        $("input.withdraw:checked").prop("checked", false).change();
                        $(this).addClass('btn-outline');
                    }
                } else if (type == 'checkCompany') {
                    if ($(this).hasClass('btn-outline')) {
                        $("input.checkCompany").not("input:checked").prop("checked", true).change();
                        $(this).removeClass('btn-outline');
                    } else {
                        $("input.checkCompany:checked").prop("checked", false).change();
                        $(this).addClass('btn-outline');
                    }
                } else if (type == 'checkOnline') {
                    if ($(this).hasClass('btn-outline')) {
                        $("input.checkOnline").not("input:checked").prop("checked", true).change();
                        $(this).removeClass('btn-outline');
                    } else {
                        $("input.checkOnline:checked").prop("checked", false).change();
                        $(this).addClass('btn-outline');
                    }
                }
            });
            $(".Ptype", _that.formSelector).on('click', function (e) {
                if ($(this).prop("checked")) {
                    $(".tranType[data-type='" + $(e.currentTarget).data("type") + "']").not("input:checked").prop("checked", true).change();
                } else {
                    $(".tranType[data-type='" + $(e.currentTarget).data("type") + "']:checked").prop("checked", false).change();
                }
            })
            /**
             * 高级搜索下拉
             */
            $('.show-demand-b', _that.formSelector).on('click', function () {
                $(this).toggleClass("open")
                $(".show-demand-a").toggle()
            });
            /**
             * 玩家层级选中
             */
            $("input[name='search.playerRanks']", _that.formSelector).change(function (e) {
                var rankLength = $("input[name='search.playerRanks']:checked", _that.formSelector).length;
                if (rankLength == 0) {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.report_auto['请选择']);
                } else {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.report_auto['已选'] + rankLength + window.top.message.report_auto['项']);
                }

                //显示选中的玩家层级
                var content = "";
                $("input[name='search.playerRanks']", _that.formSelector).each(function () {
                    if ($(this).prop("checked")) {
                        content += $(this).parent().text().trim() + "、";
                    }
                })
                if (content.trim() == "") {
                    content = window.top.message.report_auto['未筛选玩家层级'];
                } else {
                    content = content.substr(0, content.length - 1);
                }
                $(".rankDisplay").text(content);
            })
            /**
             * 柜员机和柜台同时出现
             */
            $('#atm_money', _that.formSelector).change(function () {
                if ($(this).prop('checked')) {
                    $(this).siblings('input').attr('name', 'search.transactionWays');
                } else {
                    $(this).siblings('input').removeAttr('name');
                }
            });

            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='all']").on('click', function () {
                $("input[name='search.playerRanks']").not("input:checked").prop('checked', true).change();
            });
            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='clear']").on('click', function () {
                $("input[name='search.playerRanks']:checked").prop('checked', false).change();
            });

            //玩家账号自动过滤空格
            $(this.formSelector).on("input", "input[name='search.usernames']", function (e) {
                $("input[name='search.usernames']").val($("input[name='search.usernames']").val().trim());

            });
            //交易号自动过滤空格
            $(this.formSelector).on("input", "input[name='search.transactionNo']", function (e) {
                $("input[name='search.transactionNo']").val($("input[name='search.transactionNo']").val().trim());
            });
            //来源终端改动触发
            $("input[name='search.origin']").change(function (e) {
                $("#originMemory").val($("input[name='search.origin']:checked").val());
            });
            $("[name='search.usernames']").blur(function (e) {
                var $username = $(e.currentTarget);
                if ($username && $username.val()) {
                    $username.val($username.val().replace(/\s+/g, ""));
                }
            });
        },
        /**
         * 切换账号类型时,修改name值,并重置输入框
         */
        changeKey: function (e) {
            $('#operator').val('');
        },
        /*重写query方法*/
        query: function (event) {
            var _that = this;
            var $form = $(window.top.topPage.getCurrentForm(event));
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading: true,
                    url: root + "/report/vPlayerFundsRecord/fundsLog.html",
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: this.getCurrentFormData(event),
                    success: function (data) {
                        var $summary = $(".summary", $form);
                        var $fundsLog = $(".fundsLog", $form);
                        if (_that.isSummary(event)) {
                            $summary.css("display", "block");
                            $fundsLog.css("display", "none");
                            $summary.html(data);
                        } else {
                            $fundsLog.css("display", "block");
                            $summary.css("display", "none");
                            $(".search-list-container", $fundsLog).html(data);
                            _that.initSum();
                        }
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock()
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }
                });
            } else {
                $(event.currentTarget).unlock();
            }

        },
        /**
         * 通过条件判断显示那个页面
         */
        isSummary: function (event) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if ($("input[name='search.usernames']", $form).val().trim() == "" &&
                $("input[name='search.transactionNo']", $form).val().trim() == "" &&
                $(".tranType:checked", $form).length == 0 &&
                $("input[name='search.startCreateTime']", $form).val().trim() == "" &&
                $("input[name='search.endCreateTime']", $form).val().trim() == "" &&
                $("input[name='search.playerRanks']:checked", $form).length == 0 &&
                $("input[name='search.startMoney']", $form).val().trim() == "" &&
                $("input[name='search.endMoney']", $form).val().trim() == "" &&
                $("input[name='search.origin']:checked", $form).val() == "") {
                return true;
            } else {
                false;
            }
        },
        /**
         * 展示搜索资金类型的条件
         */
        displayTrans: function () {
            //展示选中的资金类型
            var content = "";
            var status = true;
            $(".tranType", this.formSelector).each(function () {
                if (!$(this).prop("checked")) {
                    status = false;
                    return false;
                }
            })
            if (status) {
                content = "<b style='color:#964e4e;'>".concat(window.top.message.report_auto['全部']).concat("</b>");
            } else {
                /*status = true;
                 $(".deposit",this.formSelector).each(function () {
                 if (!$(this).prop("checked")) {
                 status = false;
                 return false;
                 }
                 })
                 $(".tranType",this.formSelector).not(".deposit").each(function () {
                 if ($(this).prop("checked")) {
                 status = false;
                 return false;
                 }
                 })
                 if (status) {
                 content = "<b style='color:#964e4e;'>所有存款</b>、";
                 } else {
                 status = true;
                 $(".withdraw",this.formSelector).each(function () {
                 if (!$(this).prop("checked")) {
                 status = false;
                 return false;
                 }
                 })
                 $(".tranType",this.formSelector).not(".withdraw").each(function () {
                 if ($(this).prop("checked")) {
                 status = false;
                 return false;
                 }
                 })
                 if (status) {
                 content = "<b style='color:#964e4e;'>所有取款</b>、";
                 } else {*/
                for (var i = 1; i <= 5; i++) {
                    if ($(".Ptype[data-type='" + i + "']").prop("checked")) {
                        content += "<b style='color:#964e4e;'>" + $(".Ptype[data-type='" + i + "']").siblings("span").text().trim() + "</b>、";
                    } else {
                        $(".tranType[data-type='" + i + "']:checked").each(function () {
                            content += $(this).siblings("span").text() + "、";
                        })
                    }
                }
                if ($(".backWater", this.formSelector).prop("checked")) {
                    content += "<b style='color:#964e4e;'>" + $(".backWater").siblings("span").text().trim() + "</b>、";
                }
                if ($(".backMoney", this.formSelector).prop("checked")) {
                    content += "<b style='color:#964e4e;'>" + $(".backMoney").siblings("span").text().trim() + "</b>、";
                }
                /*}
                 }*/
            }
            if (content.trim() == "") {
                content = window.top.message.report_auto['未筛选资金类型'];
            } else {
                content = content.substr(0, content.length - 1);
            }
            $(".tranDisplay", this.formSelector).html(content);
        },
        /**
         * 资金记录触发第一排分类按钮
         */
        TransParent: function () {
            var status = true;
            $(".deposit", this.formSelector).each(function () {
                if (!$(this).prop('checked')) {
                    $("button[data-type='deposit']").addClass('btn-outline');
                    status = false;
                    return false;
                }
            })
            if (status) {
                $("button[data-type='deposit']").removeClass('btn-outline');
            }

            status = true;
            $(".withdraw", this.formSelector).each(function () {
                if (!$(this).prop('checked')) {
                    $("button[data-type='withdraw']").addClass('btn-outline');
                    status = false;
                    return false;
                }
            })
            if (status) {
                $("button[data-type='withdraw']").removeClass('btn-outline');
            }

            status = true;
            $(".checkCompany", this.formSelector).each(function () {
                if (!$(this).prop('checked')) {
                    $("button[data-type='checkCompany']").addClass('btn-outline');
                    status = false;
                    return false;
                }
            })
            if (status) {
                $("button[data-type='checkCompany']").removeClass('btn-outline');
            }

            status = true;
            $(".checkOnline", this.formSelector).each(function () {
                if (!$(this).prop('checked')) {
                    $("button[data-type='checkOnline']").addClass('btn-outline');
                    status = false;
                    return false;
                }
            })
            if (status) {
                $("button[data-type='checkOnline']").removeClass('btn-outline');
            }
        },
        /**
         * 初始化玩家层级勾选
         */
        initRanks: function () {
            $("input.playerRanks", this.formSelector).each(function () {
                $("input[name='search.playerRanks'][value='" + $(this).data('value') + "']").trigger('click');
            })
        },
        /**
         * 初始化终端勾选
         */
        initOrigin: function () {
            var origin = $("#origin").val();
            if (origin == "" || origin == null || typeof origin == "undefined") {
                $("input[name='search.origin'][value='']").prop('checked', true);
            } else {
                $("input[type='radio'][name='search.origin'][value='" + origin + "']").prop('checked', true);
            }
        },
        /**
         * 重置表单
         */
        resetFundsLog: function (e) {
            $("[name='search.userTypes']").val('username');
            var userType = $("[name='search.userTypes']").siblings('ul').find("a[key='username']").text().trim();
            $("[name='search.userTypes']").siblings('button').find("span[prompt='prompt']").text(userType);
            $("[name='search.usernames']").val('');
            $("[name='search.transactionNo']").val('');
            $(".type-search button[data-type='clear']").trigger('click');
            $("[name='search.startTime']").val('');
            $("[name='search.endTime']").val('');
            $(".allOrigin").prop("checked", true);
            $("[name='search.startMoney']").val('');
            $("[name='search.endMoney']").val('');
            $("[name='search.startCreateTime']").val('');
            $("[name='search.endCreateTime']").val('');
            $("[name='search.orderType']").val('');
            $("[name='search.comp']").val('');
            $("#fundTypeMemory").val('');
            $("#originMemory").val('');
            $(e.currentTarget).unlock();
        },
        /**
         * 初始化表头总计信息
         */
        initSum: function () {
            var data = $("form").serialize();
            if ($("#player_favorable").val() == '1') {
                data += "&search.favorable=true";
            }
            window.top.topPage.ajax({
                loading: false,
                url: root + "/report/vPlayerFundsRecord/initSum.html",
                type: "post",
                data: data,
                dataType: "html",
                success: function (data) {
                    $(".total_money").removeClass("fa fa-refresh fa-spin");
                    $(".total_money").html(data);
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },

        /**
         * checkbox回填
         */
        reWrite: function () {
            if ($("#atm_money").prop("checked") == false) {
                $(".type-search input[value='atm_counter']").removeAttr("name");
                $(".type-search input[value='atm_recharge']").removeAttr("name");
            }
            var fundTypeMemory = $("#fundTypeMemory", this.formSelector).val();
            var transactionType = $("input[name='search.transactionType']").val();
            if (fundTypeMemory && fundTypeMemory!='[]') {
                var originMemory = $("#originMemory", this.formSelector).val();
                if (fundTypeMemory != '') {
                    var fundTypeMemory = JSON.parse(fundTypeMemory);
                    $.each(fundTypeMemory, function (i, line) {
                        $(".tranType[name='" + line.name + "'][value='" + line.value + "']:not(:checked)").prop("checked", true).change();
                    })
                }
                $("#origin").val(originMemory);
            } else if (transactionType) {
                $("input.i-checks[transaction-type^=" + transactionType + "]").prop("checked", true).change();
            }
        }
    });
});