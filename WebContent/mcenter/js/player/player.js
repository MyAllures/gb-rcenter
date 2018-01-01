define(['common/BaseListPage', 'site/player/player/tag/PlayerTag', 'moment', 'jqplaceholder', 'jsrender'], function (BaseListPage, PlayerTag, Moment, jsrender) {

    return BaseListPage.extend({

        playerTag: null,
        funLessMenu: ".wrapper .function-menu-hide",
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name='playerForm']";
            this.playerTag = new PlayerTag();
            this.noRecordMessage = window.top.message.common["find.norecord"];
            this._super(this.formSelector);
            this.initRanks();
            //this.initPlayerViewButton();
            //this.closeView();
            this.doFormData();
            this.queryCount();
        },
        /**
         * 异步加载后需调用方法
         */
        synQueryPageLoad: function () {
            //注：这里不能调用onPageLoad方法，会重复定义排序等方法
            $('[data-toggle="popover"]', this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
            this.pagination.changeOrderColumnClass();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
            /*返水方案下拉*/
            $('#player_rakeback').on('show.bs.dropdown', function (e) {
                var ids = window.top.page.getSelectIdsArray(e).join(",");
                /*如果选中的id为空 不请求*/
                if (ids && !$("#rakeback_list").text().trim()) {
                    window.top.topPage.ajax({
                        type: "GET",
                        url: root + "/player/rakeback/list.html?t=" + Math.random(),
                        data: {'ids': ids},
                        error: function (request) {

                        },
                        success: function (data) {
                            $("#rakeback_list").html(data);
                        }
                    });

                } else {
                    /*去掉选中 继续使用*/
                    $("#rakeback_list [type=radio]").prop("checked", false)
                }
            });
            this.rewrite();
        },

        /**
         * 请求数据
         */
        doFormData: function () {
            var _this = this;
            window.top.topPage.ajax({
                //loading: true,
                // url: $(_this.formSelector).attr("action"),
                url: root + "/player/doData.html",
                type: 'POST',
                data: $(_this.formSelector).serialize(),
                dataType: "html",
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    _this.renderData(data);
                    _this.synQueryPageLoad();
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        },

        /**
         * 渲染表单数据
         */
        renderData: function (data) {
            var _this = this;
            var $result = $("#editable tbody", _this.formSelector);
            var json = JSON.parse(data)
            var html = $("#VUserPlayerListVo").render({data: json.result});
            $result.html(html);
        },

        /**
         * 重新计算分页
         * @param e
         */
        queryCount: function (isCounter) {
            var _this = this;
            var url = root + "/player/count.html";
            if (isCounter) {
                url = url + "?isCounter=" + isCounter;
            }
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                type: 'POST',
                success: function (data) {
                    $("#playerPage").html(data);
                    _this.initSelect();
                    _this.pagination.bindSelectChange(window.top.page);
                },
                error: function (data) {

                }
            })
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var that = this;
            $("#rakeback_list", this.formSelector).on("click", function (e) {
                e.stopPropagation();
            });

            /**
             * 高级搜索下拉by kobe
             */
            $('.show-demand-b', that.formSelector).on('click', function () {
                $(this).toggleClass("open")
                $(".show-demand-a").toggle();
                var ele = $('[name="search.fundTypes"]');
                var ele4 = $('[name="search.favorableTypes"]');
                var favorableType = $('#favorableType').val();
                var fundType = $('#fundType').val();
                if ($(this).hasClass("open")) {
                    select.addOption(ele4, 'search.rakeback', window.top.message.player_auto['返水总额']);
                    select.addOption(ele4, 'search.favorableTotal', window.top.message.player_auto['优惠总额']);
                    select.addOption(ele4, 'search.totalProfitLoss', window.top.message.player_auto['总盈亏']);
                    var values;
                    if (favorableType == 'search.rakeback' || fundType == 'search.rakeback') {
                        values = window.top.message.player_auto['返水总额'];
                        favorableType = 'search.rakeback';
                    } else if (favorableType == 'search.favorableTotal' || fundType == 'search.favorableTotal') {
                        values = window.top.message.player_auto['优惠总额'];
                        favorableType = 'search.favorableTotal';
                    } else if (favorableType == 'search.totalProfitLoss' || fundType == 'search.totalProfitLoss') {
                        values = window.top.message.player_auto['总盈亏'];
                        favorableType = 'search.totalProfitLoss';
                    } else {
                        favorableType = 'search.rakeback';
                        values = window.top.message.player_auto['返水总额'];
                    }
                    select.setValue(ele4, favorableType, values);
                    select.clearOption(ele, '');
                    select.addOption(ele, 'search.walletBalance', window.top.message.player_auto['钱包余额']);
                    select.addOption(ele, 'search.totalAssets', window.top.message.player_auto['总资产']);
                    if (fundType != null && fundType != "") {
                        var value;
                        if (fundType == 'search.walletBalance') {
                            value = window.top.message.player_auto['钱包余额'];
                        } else if (fundType == 'search.totalAssets') {
                            value = window.top.message.player_auto['总资产'];
                        } else {
                            fundType = 'search.walletBalance';
                            value = window.top.message.player_auto['钱包余额'];
                        }
                        select.setValue(ele, fundType, value);
                    } else {
                        select.setValue(ele, 'search.walletBalance', window.top.message.player_auto['钱包余额']);
                    }


                    $("#rechargeTotalBegin").attr('name', 'search.rechargeTotalBegin');
                    $("#rechargeTotalEnd").attr('name', 'search.rechargeTotalEnd');
                    $("#txTotalBegin").attr('name', 'search.txTotalBegin');
                    $("#txTotalEnd").attr('name', 'search.txTotalEnd');


                    $("#rechargeCountBegin").attr('name', 'search.rechargeCountBegin');
                    $("#rechargeCountEnd").attr('name', 'search.rechargeCountEnd');
                    $("#txCountBegin").attr('name', 'search.txCountBegin');
                    $("#txCountEnd").attr('name', 'search.txCountEnd');
                } else {
                    select.clearOption(ele4, '');
//                    select.addOption(ele, 'search.rakeback', window.top.message.player_auto['返水总额']);
//                    select.addOption(ele, 'search.favorableTotal', window.top.message.player_auto['优惠总额']);
//                    select.addOption(ele, 'search.totalProfitLoss', window.top.message.player_auto['总盈亏']);
                    select.addOption(ele, 'search.rechargeTotal', window.top.message.player_auto['存款总额']);
                    select.addOption(ele, 'search.txTotal', window.top.message.player_auto['取款总额']);
                    if (fundType == 'search.totalAssets') {
                        select.setValue(ele, 'search.totalAssets', window.top.message.player_auto['总资产']);
                    }
                    $("#txTotalBegin").attr('name', '');
                    $("#txTotalEnd").attr('name', '');
                    $("#rechargeTotalBegin").attr('name', '');
                    $("#rechargeTotalEnd").attr('name', '');

                    $("#rechargeCountBegin").attr('name', '');
                    $("#rechargeCountEnd").attr('name', '');
                    $("#txCountBegin").attr('name', '');
                    $("#txCountEnd").attr('name', '');
                }
            });

            /**
             * 创建新的筛选条件内容展开或关闭
             * condition-wraper
             */
            $(".condition-wraper .add").click(function () {
                $(this).hide();
                $(".condition-options-wraper.sx").slideToggle();
                $(".cancel-create").show();
            });
            $(".condition-wraper .cancel-create").click(function () {
                $(this).hide();
                $(".condition-options-wraper.sx").slideToggle();
                $(".add").show();
            });
            $("#rank_list", that.formSelector).on("click", function (e) {
                e.stopPropagation();
            });

            $('#player_rank', that.formSelector).on('show.bs.dropdown', function (e) {
                window.top.topPage.ajax({
                    type: "POST",
                    url: root + "/userPlayer/getRankList.html",
                    data: {
                        "search.playerIds": that.getSelectIdsArray(e).join(",")
                    },
                    success: function (data) {
                        $("#rank_list").html(data);
                        $('.player_rank_li .tag_checkbox').checkboxX({
                            enclosedLabel: true//checkbox 在label中需要置为true
                        });
                    }
                });
            });
            $("#searchtext").keydown(function (event) {
                if (event.keyCode == 13) {
                    $(".btn-query-css").click();
                }
            });


            /**
             * 玩家层级选中
             */
            $("input[name='search.playerRanks']", that.formSelector).change(function (e) {

                //显示勾选数量
                var rankNum = $("input[name='search.playerRanks']:checked").length;
                if (rankNum == 0) {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['请选择']);
                } else {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['已选'] + rankNum + window.top.message.player_auto['项']);
                }
                var playerRanksMemory = [];
                //onPageLoad回填
                $("input[name='search.playerRanks']:checked").each(function () {
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
                $("input[name='search.playerRanks']").not("input:checked").prop('checked', true).change();
            });
            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='clear']").on('click', function () {
                $("input[name='search.playerRanks']:checked").prop('checked', false).change();
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
            $("[name='search.username']").blur(function (e) {
                var $username = $(e.currentTarget);
                if ($username && $username.val()) {
                    $username.val($username.val().replace(/\s+/g, ""));
                }
            });
        },
        /**
         * 示例删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        deleteCallbak: function (e, option) {
            window.top.page.bootstrapDialog.dialogs[$(document.body).attr("DialogId")].close();
        },
        /**
         * 示例删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        saveCallbak: function (e, option) {
            window.top.page.bootstrapDialog.dialogs[$(document.body).attr("DialogId")].close();
        },
        /**
         * 弹出框替换内容
         * @param e
         */
        replace: function (e) {
            var target = e.target;
            var href = $(target).attr("data-href");
            window.location.href = href;
            $(target).unlock();
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
         * 玩家列表-通过代理或总代理来搜索
         * @param e
         * @param option
         * @private
         */
        queryByAgentName: function (e, option) {
            var _target = e.currentTarget;
            var v = $(_target).text().trim();
            var _form = window.top.topPage.getCurrentForm(e);
            var param = option.post;
            $(_form).find('input[type=hidden][name$=gentName]').remove();
            $(_form).append('<input type="hidden" name="search.' + param + '" value="' + v + '">');
            e.page = window.top.page;
            window.top.page.query(e);
            $(_target).unlock();
        },

        selectListChange: function (e) {
            var textname = e.key;
            $("#searchtext").val("");
            if ('search.agentName' == textname) {
                $("#searchtext").attr("placeholder", message.player['input.tip']);
            } else {
                $("#searchtext").attr("placeholder", e.value);
            }
            $("#searchtext").attr('name', e.key);
        },

        /**
         * 通过过滤筛选条件来替换层级和解锁按钮
         * @param e
         * @param option
         */
        showFiltersCallBack: function (e, option) {
            this._super(e, option);
            var inputValue = $("input:hidden[value='levelLock']").siblings("input:hidden[value='true']").val();
            if (inputValue) {
                $("._unlockrank").removeClass('hidden');
                $('#player_rank_dropdown').hide();
                //FIXME by cj 此处功能等层级状态的筛选条件加上后，自己测试一下
                //TODO

            } else {
                $('#player_rank_dropdown').show();
                $("._unlockrank").addClass('hidden');
            }
        },
        unlockRankCallBack: function (e) {
            $('#player_rank_dropdown').show();
            $("._unlockrank").addClass('hidden');
        },
        toTmpl: function (e, btnOption) {
            if (e.returnValue) {
                $("#tot").attr('href', '/noticeTmpl/tmpIndex.html');
                $("#tot").click();
            }
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
         * 返水方案
         * @param event
         * @param option
         */
        changeCheckedRakeback: function (event, option) {
            return !!$("#player_rakeback li input[type='radio']:checked").length;
        },
        toExportHistory: function (e, opt) {
            if (opt.data && opt.data.state) {
                $(".search-params-div").html("");
                $(e.currentTarget).attr("disabled", true);
                page.showPopover(e, {
                    "callback": function () {
                        $("#toExportHistory").click();
                        $(e.currentTarget).attr("disabled", false);
                    }
                }, "success", "导出中...", true);

            } else {
                if (e.returnValue == "showProcess") {
                    var btnOption = {};
                    btnOption.target = root + "/share/exports/showProcess.html";
                    btnOption.text = window.top.message['export.exportdata'];
                    btnOption.type = "post",
                        btnOption.callback = function (e) {
                            $("#toExportHistory").click();
                        };
                    window.top.topPage.doDialog({}, btnOption);
                } else if (e.returnValue == 'clearContract') {
                    this.query(e, opt);
                } else if (e.returnValue) {
                    $("#toExportHistory").click();
                }
            }

        },
        myCallback: function (e, opt) {
            if (e.returnValue == 'returnPage') {
                $(".interfaceSet").click();
            }
        },
        getPlayerIds: function (e, opt) {
            var _this = this;
            var ids = this.getSelectIdsArray(e).join(",");
            window.top.topPage.ajax({
                type: "POST",
                url: root + "/player/getUserNames.html?t=" + Math.random(),
                data: {'ids': ids},
                dataType: "JSON",
                error: function (request) {

                },
                success: function (data) {
                    if (data.usernames) {
                        _this.doPostToDepoist(data.usernames);
                    }

                }
            });
            $(e.currentTarget).unlock();
        },
        doPostToDepoist: function (usernames) {
            var data = {"username": usernames};
            window.top.topPage.ajax({
                url: root + '/fund/manual/index.html?hasReturn=true&fromPlayerDetail=playerList',
                data: data,
                cache: false,
                type: "POST",
                success: function (data) {
                    $("#mainFrame").html(data);
                }
            });
        },
        clearExportParam: function (e, opt) {
            $("#searchtext").val("");
            $(".search-params-div").html("");
            return true;
        },
        /**
         * add by kobe
         */
        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');
            if (e.key == 'search.username') {
                $('#operator').attr('placeholder', window.top.message.player_auto['多个账号']);
            } else {
                $('#operator').attr('placeholder', '');
            }
        },

        changeKey2: function (e) {
            $('#operator2').attr('name', e.key).val('');
        },

        changeKey3: function (e) {
            $('#operator3').attr('name', e.key + 'Begin').val('');
            $('#operator4').attr('name', e.key + 'End').val('');
        },

        changeKey4: function (e) {
            $('#operator7').attr('name', e.key + 'Begin').val('');
            $('#operator8').attr('name', e.key + 'End').val('');
        },
        /**
         * 初始化玩家层级勾选
         */
        initRanks: function () {
            $("input.playerRanks").each(function () {
                $("input[name='search.playerRanks'][value='" + $(this).data('value') + "']").trigger('click');
            })
        },
        /**
         * 检查ToolBar的显示状态
         * @param e
         */
        toolBarCheck: function (e) {
            this._super(e);
            var $funLessMenu = $(this.funLessMenu, this.getCurrentForm(e));
            if (e == undefined) {
                $funLessMenu.css("display", "").removeClass('hide').addClass('show');
                return;
            }

            if (!this.getSelectIdsArray(e).length) {
                $funLessMenu.css("display", "").removeClass('hide').addClass('show');
            }
            else {
                $funLessMenu.css("display", "").removeClass('show').addClass('hide');
            }
        },
        /**
         * 重置表单
         */
        reset: function (event, option) {
            var userType = $("input[name='search.userTypes']").siblings('ul').find("a[key='search.username']").text();
            $("input[name='search.userTypes']").siblings('button').find("span[prompt='prompt']").text(userType);
            $('#operator').attr("name", "search.username").val('');
            $("input[name='search.createTimeBegin']").val('');
            $("input[name='search.createTimeEnd']").val('');
            $("input[name='search.bankcardNumber']").val('');
            $("input[name='search.realName']").val('');
            var fundType = $("input[name='search.fundTypes']").siblings('ul').find("a[key='search.walletBalance']").text();
            $("input[name='search.fundTypes']").siblings("button").find("span[prompt='prompt']").text(fundType);
            $("#operator3").val('');
            $("#operator4").val('');
            $('.playerRank').find("button[data-type='clear']").trigger('click');
            $("#playerRanksMemory").val('');
            $("input[name='search.rakebackId']").siblings("button").find("span[prompt='prompt']").text(window.top.message.player_auto['全部']);
            $("input[name='search.loginTimeBegin']").val('');
            $("input[name='search.loginTimeEnd']").val('');
            $("input[name='search.rechargeTotalBegin']").val('');
            $("input[name='search.rechargeTotalEnd']").val('');
            var message = $("input[name='search.messages']").siblings('ul').find("a[key='search.remarks']").text();
            $("input[name='search.messages']").siblings('button').find("span[prompt='prompt']").text(message);
            $("#operator2").val('');
            $("input[name='search.lastLoginIpv4']").val('');
            $("input[name='search.registerSite']").val('');
            $("input[name='search.txTotalBegin']").val('');
            $("input[name='search.txTotalEnd']").val('');
            $("input[name='search.noLoginTime']").val('');
            $("input[name='search.registerIpv4']").val('');
            $("input[name='search.createChannel'][value='']").prop("checked", true);
            var favorableType = $("input[name='search.favorableTypes']").siblings('ul').find("a[key='search.rakeback']").text();
            $("input[name='search.favorableTypes']").siblings("button").find("span[prompt='prompt']").text(favorableType);
            $("#operator7").val('');
            $("#operator8").val('');

            $("#rechargeCountBegin").val('');
            $("#rechargeCountEnd").val('');
            $("#txCountBegin").val('');
            $("#txCountEnd").val('');

            $(event.currentTarget).unlock();
        },
        getSelectIdsArray: function (e, option) {
            var checkedItems = [], counter = 0;
            $("table tbody input[type=checkbox]", this.getCurrentForm(e)).not("[name='search.playerRanks']").each(function (node, obj) {
                if (obj.checked) {
                    checkedItems[counter] = obj.value;
                    counter++;
                }
            });

            return checkedItems;
        },
        freezenAccount: function (e, opt) {
            var data = this.getSelectIds(e, opt);
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/player/changeStatus.html',
                data: data,
                dataType: 'json',
                type: "POST",
                success: function (data) {
                    if (data.state) {
                        _this.query(e);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $username = $("input[name='search.username']");
            if ($username && $username.val()) {
                $username.val($username.val().replace(/\s+/g, ""));
            }
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
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
                    $("input[name='search.playerRanks'][value='" + line + "']:not(:checked)").prop("checked", true).change();
                })
            }
        },
        /**
         * 重写query方法
         * @param event
         * @param option
         */
        query: function (event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            var _this = this;
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading: true,
                    // url: window.top.topPage.getCurrentFormAction(event),
                    url: root + "/player/doData.html",
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: this.getCurrentFormData(event),
                    success: function (data) {
                        _this.renderData(data);
                        $(event.currentTarget).unlock();
                        //注：这里不能调用onPageLoad方法，会重复定义排序等方法
                        _this.synQueryPageLoad();
                        if (event.goType == undefined || event.goType == -2) {
                            _this.queryCount();
                        } else {
                            _this.queryCount(true);
                        }
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

    });

});