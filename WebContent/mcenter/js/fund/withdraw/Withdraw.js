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
            this.doFormData();
            this.queryCount();
            this.doStatistics();
        },

        /**
         * 请求数据
         */
        doFormData: function() {
            var _this = this;
            window.top.topPage.ajax({
                //loading: true,
                url: $(_this.formSelector).attr("action"),
                type:'POST',
                data: $(_this.formSelector).serialize(),
                dataType: "html",
                headers: {
                    "Soul-Requested-With":"XMLHttpRequest"
                },
                success: function (data) {
                    _this.renderData(data);
                    _this.onPageLoad();
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        },

        /**
         * 请求统计数据
         */
        doStatistics: function() {
            var _this = this;
            window.top.topPage.ajax({
                //loading: true,
                url: root+'/fund/withdraw/withdrawStatistics.html',
                type:'POST',
                data: $(_this.formSelector).serialize(),
                dataType: "html",
                headers: {
                    "Soul-Requested-With":"XMLHttpRequest"
                },
                success: function (data) {
                    var json = JSON.parse(data);
                    if(json.isTodaySales){
                        $("#todayTotal",_this.formSelector).text(json.todayTotal);
                        $("#totalSumTarget",_this.formSelector).parent().parent().hide();
                        $("#todayTotal",_this.formSelector).parent().parent().show();
                    }else{
                        $("#totalSumTarget",_this.formSelector).text(json.totalSum);
                        $("#todayTotal",_this.formSelector).parent().parent().hide();
                        $("#totalSumTarget",_this.formSelector).parent().parent().show();
                    }
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        },

        /**
         * 渲染表单数据
         */
        renderData:function (data) {
            var _this=this;
            var $result = $("#editable tbody", _this.formSelector);
            try {
                var json = JSON.parse(data);
                if(json.result) {
                    var html = $("#VPlayerWithdrawListVo",_this.formSelector).render({data:json.result});
                    $result.html(html);
                }
            }catch (err){
                console.info(err);
            }
        },

        /**
         * 重写query方法
         * @param event
         * @param option
         */
        query: function (event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            var _this=this;
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
                        _this.renderData(data);
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock();
                        if(event.goType==undefined || event.goType==-2){
                            _this.queryCount();
                        }else{
                            _this.queryCount(true);
                        }
                        _this.doStatistics();
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
                    _this.pagination.bindSelectChange(page)
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
            this.copyText('a[name="copy"]');
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
            this.copyText('a[name="copy"]');
        },

        /**
         * 重写query中onPageLoad方法，为了查询回调函数带上下拉框样式
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            _this.rewrite();
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
            $("[name='fund-withdraw']").on("click", function () {
                $('[role="tooltip"]').hide();
            });
        },
        /**
         * 获取勾选玩家id
         * @param e
         * @param opt
         * @returns {boolean}
         */
        getSelectPlayerIds: function (e, opt) {
            var ids = this.getSelectIdsArray(e).join(",");
            opt.target = opt.target.replace('{playerIds}', ids);
            return true;
        },
        /**
         * 获取层级选项的value
         * @param e
         * @returns {{rankId: (*|jQuery), ids: (string|*)}}
         */
        playerRankPost: function (e) {
            var checked_rank = $("#player_rank ul.rank_ul li input[type='radio']:checked").val();
            var ids = this.getSelectIdsArray(e).join(",");
            return {'rankId': checked_rank, 'ids': ids};
        },

        /**
         * 获取层级选项的value
         * @param e
         * @returns {{rankId: (*|jQuery), ids: (string|*)}}
         */
        playerRekebackPost: function (event, option) {
            var rakebackId = $("#player_rakeback li input[type='radio']:checked").val();
            var ids = this.getSelectIdsArray(event).join(",");
            if (rakebackId === '0') {
                return {'ids': ids}
            }
            return {'rakebackId': rakebackId, 'ids': ids};
        },
        /**
         * 玩家层级回填
         * @param e
         */
        rewrite: function (e) {
            var playerRanksMemory = $("#playerRanksMemory").val();
            if (playerRanksMemory != "") {
                var playerRanksMemory = JSON.parse(playerRanksMemory);
                $.each(playerRanksMemory, function (i, line) {
                    $("input[name='search.rankIds'][value='" + line + "']:not(:checked)").prop("checked", true).change();
                })
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
        },
        /**
         * 出款详情页面
         */
        withdrawStatusView: function (e, option) {
            var btnOption = {};
            var id = option.dataId;
            btnOption.target = root + "/fund/withdraw/withdrawStatusView.html?search.id=" + id;
            btnOption.callback = "viewCallback";
            btnOption.text = "易收付出款审核";
            btnOption.size = "size-wide";
            window.top.topPage.doDialog(e, btnOption);

        },
        /**
         *保存出款账户后刷新页面
         */
        reloadMainFrame:function (e,opt) {
            if (e.returnValue == true) {
                $("#mainFrame").load(root + "/fund/withdraw/withdrawList.html");
            }
        },
        viewCallback:function (e,opt) {
            if(e.returnValue){
                this.query(e,opt);
            }
        }
    });
});