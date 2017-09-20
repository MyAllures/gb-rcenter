/**
 * Created by catban on 15-11-18
 */
define(['common/BaseListPage', 'autocompleter'], function (BaseListPage) {

    return BaseListPage.extend({
        rankNum: 0,
        apiNum: 0,
        init: function () {
            this.formSelector = "form[name='apiTrans']";
            this._super(this.formSelector);
            this.initOrigin();
            this.initRanks();
        },
        bindEvent: function () {
            var _that = this;
            this._super();
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
            $("input[name='search.apiList']", _that.formSelector).change(function (e) {
                if ($(this).prop('checked')) {
                    _that.rankNum++;
                } else {
                    _that.rankNum--;
                }
                if (_that.rankNum == 0) {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.common['请选择']);
                } else {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.common['已选'] + _that.rankNum + window.top.message.common['项']);
                }

                //显示选中的玩家层级
                var content = "";
                $("input[name='search.apiList']", _that.formSelector).each(function () {
                    if ($(this).prop("checked")) {
                        content += $(this).parent().text().trim() + "、";
                    }
                })
                if (content.trim() == "") {
                    content = window.top.message.report_auto['未筛选游戏类型'];
                } else {
                    content = content.substr(0, content.length - 1);
                }
                $(".rankDisplay").text(content);
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
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });

            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='all']").on('click', function () {
                $("input[name='search.apiList']").not("input:checked").prop('checked', true).change();
            });
            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='clear']").on('click', function () {
                $("input[name='search.apiList']:checked").prop('checked', false).change();
            });
            $(_that.formSelector).on('click', function (e) {
                $(".rank-btn").siblings(".dropdown-menu").css("display", "none");
            });
            $(".playerRank", _that.formSelector).parent().on('click', function (e) {
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });

            //玩家账号自动过滤空格
            $(this.formSelector).on("input", "input[name='search.username']", function (e) {
                $("input[name='search.username']").val($("input[name='search.username']").val().trim());

            });
            $(this.formSelector).on("input", "input[name='search.agentname']", function (e) {
                $("input[name='search.agentname']").val($("input[name='search.agentname']").val().trim());
            });
            $(this.formSelector).on("input", "input[name='search.topagentusername']", function (e) {
                $("input[name='search.topagentusername']").val($("input[name='search.topagentusername']").val().trim());

            });
             //交易号自动过滤空格
            $(this.formSelector).on("input", "input[name='search.transactionNo']", function (e) {
                $("input[name='search.transactionNo']").val($("input[name='search.transactionNo']").val().trim());
            });
        },

        onPageLoad: function () {
            this._super();
            var e = {currentTarget: $(".mediate-search-btn")};
            this.totalMoney(e);
        },

        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');

        },

        /**
         *统计金额
         */
        totalMoney: function (event, option) {
            var $totalContent = $(".total_content");
            window.top.topPage.ajax({
                url: root + '/report/fundsTrans/totalMoney.html',
                data: window.top.topPage.getCurrentFormData(event),
                type: 'POST',
                success: function (data) {
                    var data = eval('(' + data + ')');
                    if (data.totalMoney > 0) {
                        $('.total_money').addClass("co-green")
                    } else {
                        $('.total_money').addClass("co-red")
                    }
                    if (data.totalMoney != null) {
                        $('.total_money', $totalContent).text(data.totalMoney);
                    }
                    $('.total_count', $totalContent).text(data.totalCount);
                },
                error: function (err) {
                }
            });
        },
        /**
         * 重置表单
         */
        reset: function (event, option) {
            var userType = $("input[name='search.userTypes']").siblings('ul').find("a[key='search.username']").text();
            $("input[name='search.userTypes']").siblings('button').find("span[prompt='prompt']").text(userType);
            $('#operator').attr("name", "search.username").val('');
            $('#operator2').val('');
            $('.playerRank').find("button[data-type='clear']").trigger('click');
            $("input[name='search.startMoney']").val('');
            $("input[name='search.endMoney']").val('');
            $("input[name='search.beginCreateTime']").val('');
            $("input[name='search.endCreateTime']").val('');
            $("input[name='search.startTime']").val('');
            $("input[name='search.endTime']").val('');
            $(".allOrigin").prop("checked", true);
            $(event.currentTarget).unlock();
        },
        /**
         * 初始化玩家层级勾选
         */
        initRanks: function () {
            $("input.playerRanks").each(function () {
                $("input[name='search.apiList'][value='" + $(this).data('value') + "']").trigger('click');
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
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function(e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        }
    });
});