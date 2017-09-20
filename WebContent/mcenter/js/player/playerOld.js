define(['common/BaseListPage', 'site/player/player/tag/PlayerTag', 'moment', 'jqplaceholder'], function (BaseListPage, PlayerTag, Moment) {

    return BaseListPage.extend({

        playerTag: null,
        rankNum: 0,
        funLessMenu: ".wrapper .function-menu-hide",
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name='playerFormOld']";
            this.playerTag = new PlayerTag();
            this.noRecordMessage = window.top.message.common["find.norecord"];
            this._super(this.formSelector);
            this.initOrigin();
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
            $("#rakeback_list").on("click", function (e) {
                e.stopPropagation();
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var that = this;

            /**
             * 高级搜索下拉by kobe
             */
            $('.show-demand-b', that.formSelector).on('click', function () {
                $(this).toggleClass("open")
                $(".show-demand-a").toggle()
            });

            /**
             * 层级的选择by kobe
             */
            $('.playerRank li a').each(function () {
                var count = 1;
                $(this).on('click', function () {
                    var $input = $(this).find("input[type='checkbox']");
                    if (count % 2 == 0) {
                        $input.prop("checked", false);
                        that.rankNum--;
                    } else {
                        $input.prop("checked", true);
                        that.rankNum++;
                    }
                    count++
                    if (that.rankNum == 0) {
                        $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['请选择']);
                    } else {
                        $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['已选'] + that.rankNum + window.top.message.player_auto['项']);
                    }
                })
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
                    var url = $("#toDepoist").attr("href");
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
                url: root + '/fund/manual/fromPlayer.html?fromPlayerDetail=playerList',
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
        },

        changeKey2: function (e) {
            $('#operator2').attr('name', e.key).val('');
        },

        changeKey3: function (e) {
            $('#operator3').attr('name', e.key + 'Begin').val('');
            $('#operator4').attr('name', e.key + 'End').val('');
        },

        /**
         * 初始化终端勾选
         */
        initOrigin: function () {
            var createChannel = $("#createChannel").val();
            if (createChannel == "" || createChannel == null || typeof createChannel == "undefined") {
                $("input[name='search.createChannel'][value='']").prop('checked', true);
            } else {
                $("input[type='radio'][name='search.createChannel'][value='" + createChannel + "']").prop('checked', true);
            }
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
        }

    });

});