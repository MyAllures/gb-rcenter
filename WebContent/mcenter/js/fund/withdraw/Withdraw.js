/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage','gb/share/ListFiltersPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name='withdrawForm']";
            this._super(this.formSelector);
            //隐藏收款银行
            $(this.formSelector + " .show").children().addClass("hide");
            var open = $("#open").text();
            if(open){
                $("#openSearch").click();
            }
            this.queryCount();
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
            var url = root + "/fund/withdraw/count.html";
            if (isCounter) {
                url = url + "?isCounter=" + isCounter;
            }
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                type: 'POST',
                success: function (data) {
                    $("#withdrawpageDiv").html(data);
                    _this.initSelect();
                },
                error: function (data) {

                }
            })
        },
        queryByCondition: function (e, opt) {
            opt.isCount = true;
            this.query(e, opt);
            $(e.currentTarget).unlock();
        },
        /** 声音开关 */
        toneSwitch: function (e) {
            var tone = $('[name=switchVal]').val();
            if (e.key == tone) return;
            window.top.topPage.ajax({
                url: root + '/fund/withdraw/toneSwitch.html?paramVal='+e.key,
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
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var that = this;
            this.initShowDetail();
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

        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
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
            $("[name='fund-withdraw']").on("click", function () {
                $('[role="tooltip"]').hide();
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
         * 刷新
         * @param e
         */
        queryWithdrawRemark: function (e) {
            var target = e.currentTarget;
            var data_href = $(target).parents('.col-lg-12').prev().find("a[name=returnView]");
            $(data_href).click();
        },
        /**
         * 提现审核前先判断订单是否已锁定详情页面  和  提现审核详情页面
         *
         * @param vo
         * @return
         */
        withdrawAuditView: function (e, option) {
            var _this = this;
            var target = e.currentTarget;
            var id = option.dataId;
            var btnOption = {};
            var pageType = option.pageType;
            window.top.topPage.ajax({
                type: "post",
                url: root + "/fund/withdraw/isAuditPerson.html",
                data: {"search.id": id},
                success: function (data) {
                    if (data) {
                        // var username = data;
                        // window.top.topPage.showWarningMessage(username + "正在对该订单正在进行审核！", _this.viewWithdrawDetail(e, option));
                        _this.viewWithdrawDetail(e, option);
                    } else {
                        if (pageType == "detail") {
                            window.top.topPage.ajax({
                                type: "post",
                                url: root + "/fund/withdraw/withdrawAuditView.html?search.id=" + id + "&pageType=" + pageType,
                                data: {"search.id": id},
                                success: function (data) {
                                    $("#mainFrame").html(data);
                                }
                            })
                        } else {
                            btnOption.target = root + "/fund/withdraw/withdrawAuditView.html?search.id=" + id + "&pageType=" + pageType;
                            btnOption.callback = option.callback;
                            btnOption.text = window.top.message.fund_auto['快速取款审核'];
                            btnOption.size = "size-wide";
                            window.top.topPage.doDialog(e, btnOption);
                        }
                    }
                    $(target).unlock();
                }
            });
        },
        viewWithdrawDetail: function (e, option) {
            var btnOption = {};
            // $("#mainFrame").load(root+"/fund/withdraw/withdrawAuditView.html?search.id="+id+"&pageType=detail");
            var id = option.dataId;
            var pageType = option.pageType;
            btnOption.target = root + "/fund/withdraw/withdrawAuditView.html?search.id=" + id + "&pageType=" + pageType;
            btnOption.callback = option.callback;
            btnOption.text = window.top.message.fund_auto['查看取款详情'];
            btnOption.size = "size-wide";
            window.top.topPage.doDialog(e, btnOption);

        },

        //ajax加载分页数据 暂时保留，以后可能会用
        loadMoreRecord: function (e, opt) {
            var pageNumber = $("[name='paging.pageNumber']").val();
            $("[name='paging.pageNumber']").val(parseInt(pageNumber)+1);
            var tot = $("[name='paging.totalCount']").val();
            var pagingData = this.getCurrentFormData(e);
            window.top.topPage.ajax({
                data: pagingData,
                url: root+"/fund/withdraw/queryListByAjax.html",
                type: "POST",
                beforeSend: function () {
                    //$("#remark-add-more").addClass("hide");
                    //$("#loading-remark-data").removeClass("hide");
                },
                success: function (data) {
                    $(".table-tbody").append(data);
                    var licount = $(".table-tbody").find("tr").length;
                    if(licount>=tot){
                        $(".show-more-record").addClass("hide");
                    }else{
                        $(".show-more-record").removeClass("hide");
                    }
                }
            });
            $(e.currentTarget).unlock();
        },

        //用于鼠标滚动自动翻页
        scrollWindow: function () {
            var _this = this;
            var winH = $(window).height(); //页面可视区域高度
            var i = 1;
            $(window).scroll(function() {
                var pageH = $(document.body).height();
                var scrollT = $(window).scrollTop(); //滚动条top
                var aa = (pageH - winH - scrollT) / winH;
                if (aa < 0.02) {
                    var e = {};
                    var obj = document.getElementsByClassName("show-more-record");
                    obj.tagName="a";
                    e.currentTarget = obj;//$(".show-more-record");

                    _this.loadMoreRecord(e,{});
                }
            });
        },
        selectListChange : function (e) {
            var target = $(e.currentTarget).parent().parent().parent().parent().next();
            $(target).attr("name", e.key);
            $(target).attr("placeholder", e.key == 'search.username'?"多个账号，用半角逗号隔开":e.value);
        },
        /**
         * 锁定订单
         */
        lockOrder: function (e, opt) {
            var _this = this;
            var id = opt.objId;
            window.top.topPage.ajax({
                type: "post",
                url: root + "/fund/withdraw/lockOrder.html",
                data: {"search.id": id},
                dataType: "json",
                success: function (data) {
                    opt.placement = 'right';
                    if (data == true) {
                        opt.callback = function (e) {
                            $(".search_btn").click();

                        }
                        page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
                    } else {
                        page.showPopover(e, opt, 'danger', '本条订单已被其他管理员锁定！', true);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 取消锁定订单
         * @param e
         * @param opt
         */
        cancelLockOrder: function (e, opt) {
            var id = opt.objId;
            window.top.topPage.ajax({
                url: root + "/fund/withdraw/cancelLockOrder.html?search.id=" + id,
                dataType: "json",
                success: function (data) {
                    opt.placement = 'right';
                    if (data == true) {
                        opt.callback = function (e) {
                            $(".search_btn").click();
                        }
                        page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
                    } else {
                        page.showPopover(e, opt, 'danger', '本条订单已被其他管理员锁定！', true);
                    }
                    $(e.currentTarget).unlock();
                }
            })
        }
    });
});