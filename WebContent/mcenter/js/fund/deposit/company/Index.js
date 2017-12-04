/**
 * Created by fei on 16-7-6.
 */
define(['common/BaseListPage', 'gb/share/ListFiltersPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this.formSelector = "form[name='companyDepositForm']";
            this._super(this.formSelector);
            this.queryCount();
        },

        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', window.top.message.fund_auto['复制成功'], true);
            });
            if($("#todaySales").val()=='true'){
                $("#todayTotal").text($("#todayTotalSource").text());
                $("#totalSumTarget").parent().parent().hide();
                $("#todayTotal").parent().parent().show();
            }else{
                $("#totalSumTarget").text($("#totalSumSource").text());
                $("#todayTotal").parent().parent().hide();
                $("#totalSumTarget").parent().parent().show();
            }
        },

        /**
         * 重写query方法
         * @param event
         * @param option
         */
        query: function (event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading: true,
                    url: window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: this.getCurrentFormData(event),
                    success: function (data) {
                        var $result = $(".search-list-container", $form);
                        $result.html(data);
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock()
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }
                });
                if (option && option.isCount) {
                    this.queryCount();
                } else {
                    this.queryCount("true");
                }

            } else {
                $(event.currentTarget).unlock();
            }
        },

        /**
         * 重新计算分页
         * @param e
         */
        queryCount: function (isCounter) {
            var _this = this;
            var url = root + "/fund/deposit/company/count.html";
            if (isCounter) {
                url = url + "?isCounter=" + isCounter;
            }
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                type: 'POST',
                success: function (data) {
                    console.info("data"+data);
                    console.info($("#companyDepositpageDiv"));
                    $("#companyDepositpageDiv").html(data);
                    _this.initSelect();
                    // $(_this.formSelector + " .search-wrapper [selectDiv]").attr("callback", "selectListChange");
                },
                error: function (data) {

                }
            })
        },

        /** 声音开关 */
        toneSwitch: function (e) {
            var tone = $('[name=switchVal]').val();
            if (e.key == tone) return;
            window.top.topPage.ajax({
                url: root + '/fund/deposit/company/toneSwitch.html?paramVal='+e.key,
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        $('[name=switchVal]').val(e.key);

                        var obj = {currentTarget:$("div[selectdiv='toneSwitch']")};
                        if (e.key == 0) {
                            page.showPopover(obj, {}, 'success', window.top.message.fund_auto['声音已开启'], true);
                        } else {
                            page.showPopover(obj, {}, 'success', window.top.message.fund_auto['声音已关闭'], true);
                        }
                    }
                }
            });
        },
        bindEvent: function () {
            this._super();
            var that = this;
            //复制按钮
            $("#searchtext").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });
            /**
             * 玩家层级选中
             */
            $("input[name='search.rankIds']", that.formSelector).change(function (e) {

                //显示勾选数量
                var rankNum = $("input[name='search.rankIds']:checked").length;
                if (rankNum == 0) {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['请选择']);
                } else {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['已选'] + rankNum + window.top.message.player_auto['项']);
                }
                var playerRanksMemory = [];
                //onPageLoad回填
                $("input[name='search.rankIds']:checked").each(function () {
                    playerRanksMemory.push($(this).val());
                })

                $("#playerRanksMemory").val(JSON.stringify(playerRanksMemory));

            });
            /**
             * 绑定下拉层级事件
             */
            $(".rank-btn", that.formSelector).on("click", function (e) {
                if ($(this).siblings(".dropdown-menu").css("display") == "none" || typeof $(this).siblings(".dropdown-menu").css("display") == "undefined") {
                    $(this).siblings(".dropdown-menu").css("display", "block");
                    $("div[selectdiv].open").removeClass("open");
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
                $("input[name='search.rankIds']").not("input:checked").prop('checked', true).change();
            });
            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='clear']").on('click', function () {
                $("input[name='search.rankIds']:checked").prop('checked', false).change();
            });
            $(that.formSelector).on('click', function (e) {
                $(".rank-btn").siblings(".dropdown-menu").css("display", "none");
            });
            $(".playerRank", that.formSelector).parent().on('click', function (e) {
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });
        },

        /** 确认审核成功 */
        confirmCheckPass: function (e, option) {
            var btnOption = {};
            btnOption.target = root + "/fund/deposit/check/checkSuccessPop.html?search.id=" + option.deposit_id;
            btnOption.callback = "query";
            btnOption.text = option.text;
            window.top.topPage.doDialog(e, btnOption);
        },
        /** 跳转至审核失败 */
        checkFailure: function (e, option) {
            var btnOption = {};
            btnOption.target = root + "/fund/deposit/check/checkFailurePop.html?search.id=" + option.deposit_id;
            btnOption.callback = "query";
            btnOption.text = option.text;
            window.top.topPage.doDialog(e, btnOption);
        },
        /** 回调：审核通过后回调到充值记录列表页面 */
        back: function (e) {
            if (window.top.page.status) {
                var sk = $('input.searchKey').attr('name');
                var kv = $('input.searchKey').val();
                var rt = $('[name="search.rechargeType"]').val();
                var rs = $('[name="search.rechargeStatus"]').val();

                var uri = root + "/fund/deposit/company/list.html?1=1";

                if (kv != null && kv != '') {uri += '&' + sk + '=' + kv;}
                if (rt != null && rt != '') {uri += '&search.rechargeType=' + rt}
                if (rs != null && rs != '') {uri += '&search.rechargeStatus=' + rs}

                //保存返回按钮是否隐藏
                var style = $("#mainFrame .return-btn").attr("style");
                $('#mainFrame').load(uri, function () {
                    $("#mainFrame .return-btn").attr("style",style);
                });

            }
        },
        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');

        },
        /**
         * 根据条件搜索（不包含彩池奖金条件）
         * @param e
         * @param opt
         */
        queryByCondition: function (e, opt) {
            opt.isCount = true;
            this.query(e, opt);
            $(e.currentTarget).unlock();
        },
        selectListChange : function (e) {
            var target = $(e.currentTarget).parent().parent().parent().parent().next();
            $(target).attr("name", e.key);
            $(target).attr("placeholder", e.key == 'search.username'?"多个账号，用半角逗号隔开":e.value);
        }
    });
});