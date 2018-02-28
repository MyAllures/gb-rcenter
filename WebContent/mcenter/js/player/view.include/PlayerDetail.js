/**
 * Created by cj on 15-9-15.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        repeatCount: 1,
        init: function (title) {
            this.formSelector = "form";
            this._super();
            this.queryPlayerAllSumMoney();
            this.querySearchCondition();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var _this = this;
            $("#mainFrame .return-btn").css("display", "");
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
            this.querySingleAndEffective();

        },
        querySingleAndEffective: function () {
            var _this = this;
            var userId = $("#userId").val();
            window.top.topPage.ajax({
                url: root + "/player/querySingleAndEffective.html?search.id=" + userId + "&t=" + new Date().getTime(),
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        $("#singleamount").text(data.singleamount);
                        $("#effectivetradeamount").text(data.effectivetradeamount);
                        $("#recentProfitAmout").text(data.profitamount);
                    } else {
                        $("#singleamount").text(0);
                        $("#effectivetradeamount").text(0);
                        $("#recentProfitAmout").text(0);
                    }
                },
                error: function (data) {

                }
            })

        },
        queryPlayerAllSumMoney: function () {
            var _this = this;
            var userId = $("#userId").val()
            window.top.topPage.ajax({
                url: root + "/player/queryPlayerMoney.html?playerId=" + userId + "&t=" + new Date().getTime(),
                dataType: 'json',
                success: function (data) {
                    $("#rechargeCount").text(data.depositcounttime);
                    $("#rechargeTotal").text(data.deposittotalmoney);
                    $("#withdrawCountTime").text(data.withdrawcounttime);
                    $("#withdrawTotalMoney").text(data.withdrawtotalmoney);
                    $("#favCount").text(data.favCount);
                    $("#favMoney").text(data.favMoney);
                    $("#totalProfitLoss").text(data.totalProfitLoss);
                },
                error: function (data) {

                }
            })

        },
        queryPlayerAllSumMoney: function () {
            var _this = this;
            var userId = $("#userId").val()
            window.top.topPage.ajax({
                url: root + "/player/queryPlayerMoney.html?playerId=" + userId + "&t=" + new Date().getTime(),
                dataType: 'json',
                success: function (data) {
                    $("#rechargeCount").text(data.depositcounttime);
                    if (data.deposittotalmoney) {
                        $("#rechargeTotal").text(data.deposittotalmoney);
                    } else {
                        $("#rechargeTotal").text(0);
                    }

                    $("#withdrawCountTime").text(data.withdrawcounttime);
                    if (data.withdrawtotalmoney) {
                        $("#withdrawTotalMoney").text(data.withdrawtotalmoney);
                    } else {
                        $("#withdrawTotalMoney").text(0);
                    }
                    $("#favCount").text(data.favCount);
                    $("#favMoney").text(data.favMoney);
                    $("#totalProfitLoss").text(data.totalProfitLoss);
                },
                error: function (data) {
                    $("#rechargeCount").text(0);
                    $("#rechargeTotal").text(0);
                    $("#withdrawCountTime").text(0);
                    $("#withdrawTotalMoney").text(0);
                    $("#favCount").text(0);
                    $("#favMoney").text(0);
                    $("#totalProfitLoss").text(0);
                }
            })

        },


        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            this.copyText('a[name="copy"]');
        },
        queryView: function (e) {
            var _this = this;
            var load = this.getCurrentForm(e).parentNode;
            window.top.topPage.ajax({
                data: this.getCurrentFormData(e),
                url: this.getCurrentFormAction(e),
                success: function (data) {
                    $(load).html(data);
                }
            });
        },
        /**
         * 保存成功后刷新页面
         * @param e
         */
        saveOkQueryView: function (e) {
            if (e.returnValue) {
                this.queryView(e);
            }
        },
        toPlayerEdit: function (e, opt) {
            var playerId = $("[name='result.id']").val();
            var url = root + "/player/getVUserPlayer.html?comeFrom=detail&search.id=" + playerId;
            var load = this.getCurrentForm(e).parentNode;
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    $(load).html(data);
                }
            });
            $(e.currentTarget).unlock();
        },
        editRealName: function (e, opt) {
            $("#real-name-detail").addClass("hide");
            $("#real-name-edit").removeClass("hide");
            $(e.currentTarget).unlock();
        },
        cancelEditRealName: function (e, opt) {
            $("#real-name-detail").removeClass("hide");
            $("#real-name-edit").addClass("hide");
            $(e.currentTarget).unlock();
        },
        updateRealName: function (e, opt) {
            var _this = this;
            var realName = $("[name='result.realName']").val();
            if (realName == null || realName == "") {
                var obj = {};
                obj.currentTarget = $("[name='result.realName']");
                page.showPopover(obj, {}, "warning", window.top.message.player_auto['真实姓名不能为空'], true);
                $(e.currentTarget).unlock();
                return;
            }
            var reg = /^[a-zA-Z0-9\u4E00-\u9FA5\u0800-\u4e00\·]{2,30}$/;
            /*/^[a-zA-Z][a-zA-Z\s\·]{0,28}[a-zA-Z]$|^[\u4e00-\u9fa5][\u4e00-\u9fa5\·]{0,28}[\u4e00-\u9fa5]$/;*/
            if (!reg.test(realName)) {
                var obj = {};
                obj.currentTarget = $("[name='result.realName']");
                var msg = window.top.message.player['realName.length'];
                page.showPopover(obj, {}, "warning", msg, true);
                $(e.currentTarget).unlock();
                return;
            }
            window.top.topPage.ajax({
                data: {"realName": realName, "result.id": $("#userId").val()},
                url: root + "/player/updatePlayerRealName.html",
                type: "POST",
                dataType: "JSON",
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e, {}, "success", window.top.message.player_auto['操作成功'], true);
                        setTimeout(function () {
                            var isDetection = $("#isDetection").val();
                            if (isDetection == "true") {
                                _this.showPlayerDetectionData(e, opt);
                            } else {
                                $("#show-real-name").text(realName);
                                _this.cancelEditRealName(e, opt);
                            }

                        }, 1500);

                    } else {
                        page.showPopover(e, {}, "danger", window.top.message.player_auto['操作失败'], true);
                    }
                }
            });
            $(e.currentTarget).unlock();
        },
        editPlayerStatus: function (e, opt) {
            $("#player-stauts-detail").addClass("hide");
            $("#palyer-status-edit").removeClass("hide");
            $(e.currentTarget).unlock();
        },
        cancelEditPlayerStatus: function (e, opt) {
            $("#player-stauts-detail").removeClass("hide");
            $("#palyer-status-edit").addClass("hide");
            $(e.currentTarget).unlock();
        },
        showSaveBtn: function (e, opt) {
            $(".save-status-btn").addClass("hide");
            var currentStatus = $("#current-status").val();
            if (e.key == '3' && currentStatus != '3') {
                $(".freeze-account-btn").removeClass("hide");
            } else if (e.key == '4' && currentStatus != '4') {
                if (currentStatus == '3') {
                    e.currentTarget = $("[selectdiv='result.playerStatus']");
                    page.showPopover(e, {}, "warning", window.top.message.player_auto['账号冻结不能再进行余额冻结'], true);
                } else {
                    $(".freeze-balance-btn").removeClass("hide");
                }

            } else if (e.key == '2' && currentStatus != '2') {
                $(".disable-account-btn").removeClass("hide");
            } else if (e.key == '1' && currentStatus != '1') {
                $(".save-normal-btn").removeClass("hide");
            }
            $(e.currentTarget).unlock();
        },
        updatePlayerStatus: function (e, opt) {
            var _this = this;
            var status = $("[name='result.playerStatus']").val();
            if (status == null || status == "") {
                var obj = {};
                obj.currentTarget = $("[selectdiv='result.playerStatus']");
                page.showPopover(obj, {}, "warning", window.top.message.player_auto['玩家状态不能为空'], true);
                $(e.currentTarget).unlock();
                return;
            }
            window.top.topPage.ajax({
                data: {"result.status": status, "result.id": $("#userId").val()},
                url: root + "/player/updatePlayerStatus.html",
                type: "POST",
                dataType: "JSON",
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e, {}, "success", window.top.message.player_auto['操作成功'], true);
                        setTimeout(function () {
                            _this.queryView(e);
                        }, 1500);

                    } else {
                        page.showPopover(e, {}, "danger", window.top.message.player_auto['操作失败'], true);
                    }
                }
            });
        },
        editPlayerRank: function (e, opt) {
            $("#player-rank-detail").addClass("hide");
            $("#player-rank-edit").removeClass("hide");
            $(e.currentTarget).unlock();
        },

        cancelEditPlayerRank: function (e, opt) {
            $("#player-rank-detail").removeClass("hide");
            $("#player-rank-edit").addClass("hide");
            $(e.currentTarget).unlock();
        },
        updatePlayerRank: function (e, opt) {
            var _this = this;
            var rankId = $("[name='result.rankId']").val();
            var oldRankId = $("[name='current-rank']").val();
            if (rankId == null || rankId == "") {
                var obj = {};
                obj.currentTarget = $("[selectdiv='result.rankId']");
                page.showPopover(obj, {}, "warning", window.top.message.player_auto['玩家层级不能为空'], true);
                $(e.currentTarget).unlock();
                return;
            }

            window.top.topPage.ajax({
                data: {"result.rankId": rankId, "result.oldRankId": oldRankId, "result.id": $("#userId").val()},
                url: root + "/player/updatePlayerRank.html",
                type: "POST",
                dataType: "JSON",
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e, {}, "success", window.top.message.player_auto['操作成功'], true);
                        setTimeout(function () {
                            _this.queryView(e);
                        }, 1500);

                    } else {
                        page.showPopover(e, {}, "danger", window.top.message.player_auto['操作失败'], true);
                    }
                }
            });
        },
        changeRank: function (e, opt) {
            var oldRankId = $("#current-rank").val();
            var newId = e.key;
            if (newId != "" && newId != oldRankId) {
                $(".btn-save-rank").removeClass("hide");
            } else {
                $(".btn-save-rank").addClass("hide");
            }
        },
        hidePersonalDetail: function (e, opt) {
            $(".hide-personaldata-btn").addClass("hide");
            $("#player-personal-detail").addClass("hide");
            $(".player-edit-btn").addClass("hide");
            $(".player-detection-btn").addClass("hide");
            $(".show-detail-btn").removeClass("hide");
            $(".same-name-span").addClass("hide");
            this.cancelEditRealName(e, opt);
            $(e.currentTarget).unlock();
        },
        showPersonalDetail: function (e, opt) {
            $(e.currentTarget).addClass("hide");
            $(".hide-personaldata-btn").removeClass("hide");
            $("#player-personal-detail").removeClass("hide");
            $(".player-detection-btn").removeClass("hide");
            $(".player-edit-btn").removeClass("hide");
            $(".same-name-span").removeClass("hide");
            $(e.currentTarget).unlock();
            //$(".update-real-name-btn").addClass("hide");
        },
        setPersonalData: function (e, opt) {
            var _this = this;
            if (opt.data.state && opt.data.playerId) {
                var id = opt.data.playerId;
                window.top.topPage.ajax({
                    url: root + "/player/showPersonalData.html?search.id=" + id,
                    success: function (data) {
                        $("#player-personal-detail").html(data);
                    }
                });
                $(e.currentTarget).unlock();
            }
        },
        showPlayerDetectionData: function (e, opt) {
            $(".same-name-span").removeClass("hide");
            var _this = this;
            var id = $("#userId").val();
            window.top.topPage.ajax({
                url: root + "/player/detect.html?search.id=" + id,
                success: function (data) {
                    $("#isDetection").val(true);
                    $("#personal-data-view").html(data);
                }
            });
            $(e.currentTarget).unlock();
        },
        hasRealName: function (e, opt) {
            var realName = $("[name='result.realName']").val();
            if (realName == null || realName == "") {
                page.showPopover(e, {}, "warning", window.top.message.player_auto['请先填写真实姓名'], true);
                return false;
            }
            return true;
        },
        hideBankcardList: function (e, opt) {
            $(e.currentTarget).addClass("hide");
            var data = opt.data;
            $("#" + data).addClass('hide');
            $(e.currentTarget).parent().find(".edit-bank-card-btn").addClass("hide");
            $(e.currentTarget).parent().find(".show-bankcard-btn").removeClass("hide");
            $(e.currentTarget).parent().find(".hide-bankcard-btn").addClass("hide");
            $(e.currentTarget).unlock();
        },
        showBankcardList: function (e, opt) {
            var data = opt.data;
            $("#" + data).removeClass('hide');
            $(e.currentTarget).parent().find(".edit-bank-card-btn").removeClass("hide");
            $(e.currentTarget).parent().find(".hide-bankcard-btn").removeClass("hide");
            $(e.currentTarget).addClass("hide");
            $(e.currentTarget).unlock();
        },
        loadMoreRemark: function (e, opt) {
            var tot = $("[name='paging.totalCount']").val();
            var pagingData = $("#remarkForm").serialize();
            window.top.topPage.ajax({
                data: pagingData,
                url: root + "/player/fetchRemarkList.html?paging.pageSize=50",
                type: "POST",
                beforeSend: function () {
                    $("#remark-add-more").addClass("hide");
                    $("#loading-remark-data").removeClass("hide");
                    //
                },
                success: function (data) {
                    $("#detail-remark-list").append(data);
                    var licount = $("#detail-remark-list").find("li").length;
                    if (licount >= tot) {
                        $("#remark-add-more").addClass("hide");
                        $("#loading-remark-data").addClass("hide");
                    } else {
                        $("#remark-add-more").removeClass("hide");
                        $("#loading-remark-data").addClass("hide");
                    }
                    $("[name='search.fromCount']").val(licount);
                }
            });
            $(e.currentTarget).unlock();
        },

        loadRemarkByType: function (e, opt) {
            $("[name='search.fromCount']").val(0);
            var type = opt.remarkType;
            if (type) {
                $("[name='search.remarkType']").val(type);
            } else {
                $("[name='search.remarkType']").val(type);
            }
            var pagingData = $("#remarkForm").serialize();
            window.top.topPage.ajax({
                data: pagingData,
                url: root + "/player/fetchRemarkList.html?paging.pageSize=10",
                type: "POST",
                success: function (data) {
                    $("#detail-remark-list").html("");
                    $("#detail-remark-list").append(data);
                    var licount = $("#detail-remark-list").find("li").length;
                    var newCount = $("[name='newTotalCount']").val();
                    $("[name='paging.totalCount']").val(newCount);
                    if (newCount > licount) {
                        $("#remark-add-more").removeClass("hide");
                    } else {
                        $("#remark-add-more").addClass("hide");
                    }
                    $("[name='search.fromCount']").val(licount);
                    if (type) {
                        $(".show-all-remark").removeClass("hide");
                        $(".show-part-remark").addClass("hide");
                    } else {
                        $(".show-all-remark").addClass("hide");
                        $(".show-part-remark").removeClass("hide");
                    }

                }
            });
            $(e.currentTarget).unlock();
        },

        delRemarkCallback: function (e, opt) {
            var _this = this;
            if (opt.data.state) {
                page.showPopover(e, {}, "success", window.top.message.player_auto['删除成功'], true);
                setTimeout(function () {
                    $($(e.currentTarget).parent().parent()).remove();
                }, 1500)

            } else {
                page.showPopover(e, {}, "danger", window.top.message.player_auto['删除失败'], true);
            }

        },
        hideApiData: function (e, opt) {
            $(".show-api-data-btn").removeClass("hide");
            $(".hide-data-btn").addClass("hide");
            //$("#withdraw-process-money").addClass("hide");
            //$("#show-popover-msg").addClass("hide");
            $("#api_data").addClass("hide");
            $(e.currentTarget).unlock();
        },
        showApiData: function (e, opt) {
            var _this = this;
            $(".show-api-data-btn").addClass("hide");
            $(".hide-data-btn").removeClass("hide");
            var id = $("[name='result.id']").val();
            if (!id || id == null || id == "" || id == undefined) {
                return;
            }
            var fromShowBtn = opt.fromShowBtn;
            var showLoading = opt.showLoading;
            if (showLoading) {
                $($(e.currentTarget).parent()).html('<a type="button" class="co-gray m-r-sm"><i class="fa fa-refresh" title="' + window.top.message.player_auto['刷新'] + '"></i>' + window.top.message.player_auto['获取中'] + '</a>');
            }
            var withdrawAmount = $("[name='withdrawAmount']").val();
            if (withdrawAmount > 0) {
                //$("#withdraw-process-money").removeClass("hide");
                //$("#show-popover-msg").removeClass("hide");
            }

            window.top.topPage.ajax({
                url: root + "/playerFunds/queryApiFundsRecord.html?type=all&search.playerId=" + id,
                success: function (data) {
                    $("#api_data").html(data);
                    $("#api_data").removeClass("hide");
                    var flag = $("[name='allIsNormal']").val();
                    //预留，须测试
                    console.log("fromShowBtn:" + fromShowBtn + ",flag:" + flag);
                    if (!fromShowBtn) {
                        if (flag == "false" && _this.repeatCount <= 3) {
                            setTimeout(function () {
                                _this.repeatCount++;
                                console.log("queryApiFundsRecord:" + _this.repeatCount);
                                _this.showApiData(e, opt);
                            }, 10000);
                        } else {
                            _this.getUserPlayer();
                            _this.repeatCount = 1;
                        }
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        getUserPlayer: function () {
            var id = $("[name='result.id']").val();
            if (!id || id == null || id == "" || id == undefined) {
                return;
            }
            window.top.topPage.ajax({
                url: root + "/player/queryUserPlayerById.html?search.id=" + id,
                dataType: "JSON",
                success: function (data) {
                    if (data) {
                        if (data.totalAsset) {
                            $("#total-asset").text(data.totalAsset);
                        }
                        if (data.balance) {
                            $("#wallet-balance").text(data.balance);
                        }
                    }
                }
            });
        },
        fetchSingleApiBalance: function (e, opt) {
            var playerId = opt.playerId;
            var apiId = opt.apiId;
            var showLoading = opt.showLoading;
            if (showLoading) {
                $("#api_balance_" + apiId).html(window.top.message.player_auto['获取中']);
            }
            window.top.topPage.ajax({
                url: root + "/playerFunds/refreshSingleApi.html?search.playerId=" + playerId + "&search.apiId=" + apiId,
                dataType: "JSON",
                success: function (data) {
                    if (data.money == null || data.money == "") {
                        $("#api_balance_" + apiId).html("￥0");
                    } else {
                        $("#api_balance_" + apiId).html("￥" + data.money);
                    }

                    $(e.currentTarget).unlock();
                }
            });
        },
        gotoGameOrder: function (e, opt) {
            if (e.returnValue) {
                var url = "/report/gameTransaction/init.html?isLink=true&outer=-1&search.username=" + $("#username").val() + "&searchKey=search.username&" + e.returnValue;
                $("#toGameOrder").attr("href", url);
                $("#toGameOrder").click();
            }
        },
        editRemark: function (e, opt) {
            $(".edit-btn-css").addClass("hide");
            $(".save-btn-css").removeClass("hide");
            $(".cancel-btn-css").removeClass("hide");
            $("[name='result.memo']").removeAttr("readonly");
            $(e.currentTarget).unlock();
        },
        cancelEdit: function (e, opt) {
            $(".edit-btn-css").removeClass("hide");
            $(".save-btn-css").addClass("hide");
            $(".cancel-btn-css").addClass("hide");
            $("[name='result.memo']").attr("readonly", true);
            $(".save-btn-css").addClass("hide");
            $(".cancel-btn-css").addClass("hide");
            $(".edit-btn-css").removeClass("hide");
            $("[name='result.memo']").val($("#old_memo").val());
            $(e.currentTarget).unlock();
        },
        afterSaveRemark: function (e, opt) {
            var _this = this;
            if (opt.data.state) {
                e.page.showPopover(e, {"callback": _this.queryView(e)}, 'success', window.top.message.common['operation.success'], true);
            } else {
                e.page.showPopover(e, {}, 'danger', window.top.message.common['operation.fail'], true);
            }
        },



        queryPlayerAgent:function (e, opt) {
            var _this = this;
            var playerId = $("[name='result.id']").val();
            if (!playerId || playerId == null || playerId == "" || playerId == undefined) {
                return;
            }
            window.top.topPage.ajax({
                url: root + "/player/queryUserPlayerById.html?search.id=" + playerId,
                dataType: "JSON",
                success: function (data) {
                    if(data){
                        _this.setSelectedValue("search.agentRanks",data.agentRank);
                        _this.setSelectedValue("result.agentId",data.agentId);
                    }
                }
            });
        },
        setSelectedValue:function (name,value) {
            $("div[selectdiv='"+name+"']").attr("value",value);
            $("[name='"+name+"']").val(value);
            var displayName = "";
            var selectItem;
            $("div[selectdiv='"+name+"']").find("a[role='menuitem']").each(function (idx, sel) {
                var key = $(sel).attr("key");
                if(key==value){
                    selectItem = sel;
                    displayName = $(sel).html();
                }
            });
            $("div[selectdiv='"+name+"']").find("span[prompt='prompt']").html(displayName);
            $(selectItem).click();
        },


        /**
         * 切换代理线 by kobe
         * @param e
         */
        editAgentLine: function (e, opt) {
            $("#agent-rank-detail").addClass("hide");
            $("#agent-rank-edit").removeClass("hide");
            this.queryPlayerAgent(e);
            $(e.currentTarget).unlock();
        },

        cancelEditAgentLine: function (e, opt) {
            $("#agent-rank-detail").removeClass("hide");
            $("#agent-rank-edit").addClass("hide");
            $(e.currentTarget).unlock();
        },

        changeAgentLine: function (e, opt) {
            var oldRankId = $("#current-agentRank").val();
            var newId = e.key;
            if (newId != "" && newId != oldRankId) {
                $(".btn-save-agent").removeClass("hide");
            } else {
                $(".btn-save-agent").addClass("hide");
            }
        },

        updateAgentLine: function (e, opt) {
            var _this = this;
            var agentId = $("[name='result.agentId']").val();
            var oldagentId = $("[name='current-agentRank']").val();
            var username = $(".player-name").text();
            if (agentId == null || agentId == "") {
                var obj = {};
                obj.currentTarget = $("[selectdiv='result.agentId']");
                page.showPopover(obj, {}, "warning", window.top.message.player_auto['代理不能为空'], true);
                $(e.currentTarget).unlock();
                return;
            }

            window.top.topPage.ajax({
                data: {"result.userAgentId": agentId, "oldagentId": oldagentId, "result.id": $("#userId").val(), "username": username},
                url: root + "/player/updateAgentLine.html",
                type: "POST",
                dataType: "JSON",
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e, {}, "success", window.top.message.player_auto['操作成功'], true);
                        setTimeout(function () {
                            _this.queryView(e);
                        }, 1500);

                    } else {
                        page.showPopover(e, {}, "danger", window.top.message.player_auto['操作失败'], true);
                    }
                }
            });
        },

        /**
         * 展示几级代理
         * @param e
         */
        querySearchCondition:function () {

            var _this = this;
            var rankHtml = '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" key="{0}">{1}</a></li>';
            window.top.topPage.ajax({
                url: root + "/rebateAgent/queryCondtion.html?t=" + new Date().getTime(),
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if(data.ranks){
                        $("div[selectdiv='search.agentRanks']").find("ul[role='menu']").html("");
                        for(var i=0;i<data.ranks.length;i++){
                            var rankMap = data.ranks[i];
                            var key = rankMap.key;
                            var val = rankMap.value;
                            var formatHtml = _this.formatStr(rankHtml,key,val);
                            $("div[selectdiv='search.agentRanks']").find("ul[role='menu']").append(formatHtml);
                        }
                    }
                },
                error: function (data) {

                }
            })
        },



    });
});