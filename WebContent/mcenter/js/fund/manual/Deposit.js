/**
 * 资金管理-手工存取
 */
define(['common/BaseEditPage', 'jschosen'], function (BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super("form");
            this.changeRechargeType();
            this.changeAuditType();
            this.changeFavorableType();
            this.changeFavorableAuditType();
            this.userNamesCont();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //计算输入玩家账号人数
            $(this.formSelector).on("input", "textarea[name='userNames']", function () {
                _this.userNamesCont();
            });
            //选择类型关联对应稽核类型
            $(this.formSelector).on("change", "[name='result.rechargeType']", function (e) {
                _this.changeRechargeType();
                _this.changeAuditType();
            });
            //选择优惠类型关联对应稽核类型
            $(this.formSelector).on("change", "[name='favorableType']", function (e) {
                _this.changeFavorableType();
                _this.changeFavorableAuditType();
            });
            //选中稽核类型
            $(this.formSelector).on("change", "[name='result.isAuditRecharge']", function (e) {
                _this.changeAuditType();
            });
            //选中优惠稽核类型
            $(this.formSelector).on("change", "[name='playerFavorable.isAuditFavorable']", function (e) {
                _this.changeFavorableAuditType();
            });
        },
        /**
         * 优惠稽核类型变更
         */
        changeFavorableAuditType: function () {
            var auditType = $("input[name='playerFavorable.isAuditFavorable']:checked").val();
            if (auditType == 'false') {
                $("#favorableAuditMultipleDiv").hide();
                $("input[name='playerFavorable.auditFavorableMultiple']").prop("disabled", true);
            } else {
                $("input[name='playerFavorable.auditFavorableMultiple']").removeAttr("disabled");
                $("#favorableAuditMultipleDiv").show();
            }
        },
        /**
         * 稽核类型变更
         */
        changeAuditType: function () {
            var auditType = $("input[name='result.isAuditRecharge']:checked").val();
            if (auditType == 'false') {
                $("#auditMultipleDiv").hide();
                $("input[name=auditMultiple]").prop("disabled", true);
            } else {
                $("input[name=auditMultiple]").removeAttr("disabled");
                $("#auditMultipleDiv").show();
            }
        },
        /**
         * 计算输入玩家账号人数
         */
        userNamesCont: function () {
            var userNames = $.trim($("textarea[name=userNames]").val());
            var count = 0;
            if (userNames != "") {
                var last = userNames.charAt(userNames.length - 1);
                if (last == '\n') {
                    userNames = userNames.substring(0, userNames.length - 1);
                }
                var newString = "";
                var spilt = userNames.split(",");
                for (var i = 0; i < spilt.length; i++) {
                    //
                    var newStr = spilt[i].replace(/^\s+|\s+$/g, '');
                    newString += newStr + ",";
                    if (spilt[i] != '') {
                        count++;
                    }
                }
                if (newString != "") {
                    newString = newString.substring(0, newString.length - 1);
                    $("textarea[name=userNames]").val(newString);
                }
            }

            $("#userCount").text(count);
        },
        /**
         * 类型变更
         */
        changeRechargeType: function () {
            var rechargeType = $("[name='result.rechargeType']").val();
            //人工存取-免稽核、存款稽核（默认选中）
            if (rechargeType == 'manual_deposit') {
                $("input[name='result.isAuditRecharge'][value='true']").prop("checked", true);
                $("#spanTips").hide();
                $("#spanTips2").hide();
            } else if (rechargeType == 'manual_payout') {//派彩-免稽核（默认选中）、存款稽核、优惠稽核
                $("input[name='result.isAuditRecharge'][value='false']").prop("checked", true);
                $("#spanTips").hide();
                $("#spanTips2").show();
            } else if (rechargeType == 'manual_other') {//其他-免稽核、存款稽核（默认选中）、优惠稽核
                $("input[name='result.isAuditRecharge'][value='true']").prop("checked", true);
                $("#spanTips").hide();
                $("#spanTips2").hide();
            }
        },
        /**
         * 类型变更
         */
        changeFavorableType: function () {
            var favorableType = $("[name='favorableType']").val();
            if (favorableType == 'manual_favorable') {//优惠活动-优惠稽核（默认选中）
                $("input[name='playerFavorable.isAuditFavorable'][value='true']").prop("checked", true);
                $("#spanTips3").show();
                $("#spanTips4").hide();
                $("#favorableTr").show();
            } else if (favorableType == 'manual_rakeback') {//返水-免稽核、优惠稽核（默认选中）
                $("input[name='playerFavorable.isAuditFavorable'][value='true']").prop("checked", true);
                $("#spanTips3").show();
                $("#spanTips4").hide();
                $("#favorableTr").hide();
            } else if (favorableType == 'manual_payout') {//派彩-免稽核（默认选中）、存款稽核、优惠稽核
                $("input[name='playerFavorable.isAuditFavorable'][value='false']").prop("checked", true);
                $("#spanTips3").hide();
                $("#spanTips4").show();
                $("#favorableTr").hide();
            } else if (favorableType == 'manual_other') {//其他-免稽核、存款稽核（默认选中）、优惠稽核
                $("input[name='playerFavorable.isAuditFavorable'][value='true']").prop("checked", true);
                $("#spanTips3").hide();
                $("#spanTips4").hide();
                $("#favorableTr").hide();
            }
        },

        onPageLoad: function () {
            this._super();
            $('[data-toggle="popover"]', this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
            $('[name=activityId]', this.formSelector).chosen({
                no_results_text: window.top.message.fund_auto['没有找到']
            });
            $("[name=activityId]", this.formSelector).chosen().change(function (item) {
                $("input[name=activityName]").val($(this).find("option:selected").text());
            });
            $("[name=activityId]", this.formSelector).next(".chosen-container").attr("style", "width:100%;min-width:200px;max-width=300px;");
            $("[name=activityId]", this.formSelector).next(".chosen-container").children(".chosen-single").attr("style", "height:42px;line-height:40px;");
        },
        /**
         * 确定
         * @param e
         * @param option
         */
        submit: function (e, option) {
            var _this = this;
            window.top.topPage.showConfirmMessage(option.msg, function (result) {
                if (result) {
                    _this.deposit(e, option, _this);
                }
                else {
                    $(e.currentTarget).unlock();
                }
            })
        },
        deposit: function (e, option, obj) {
            obj.formatUserNames();
            window.top.topPage.ajax({
                url: root + "/fund/manual/manualDeposit.html",
                data: obj.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var state = data.state;
                    var msg = data.msg;
                    var userNames = data.userNames;
                    var operateFails = data.operateFails;
                    var failNum = data.failNum;
                    var successNum = data.successNum;
                    if (state == false && userNames) {
                        var btnOption = {};
                        var names = encodeURI(encodeURI(userNames.toString()));
                        btnOption.target = root + "/fund/manual/check.html?userNames=" + names;
                        btnOption.text = option.text;
                        window.top.topPage.doDialog(e, btnOption);
                    } else if (state == false && msg) {
                        option.callback = "back";
                        e.page.showPopover(e, option, 'danger', msg, true);
                        $(e.currentTarget).unlock();
                    } else if (state == true && operateFails) {
                        var btnOption = {};
                        btnOption.target = root + "/fund/manual/error.html?operateFails=" + operateFails.toString() + "&failNum=" + failNum + "&successNum=" + successNum;
                        btnOption.text = option.text;
                        btnOption.callback = "back";
                        window.top.topPage.doDialog(e, btnOption);
                    } else {
                        option.callback = "back";
                        e.page.showPopover(e, option, 'success', msg, true);
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 格式化玩家账号（在excel直接一列复制文档时，直接可以增加多个用户）
         */
        formatUserNames: function () {
            var userNames = $("[name=userNames]").val();
            var s = userNames.split(/\r?\n/);
            var username = '';
            for (var i = 0; i < s.length; i++) {
                if (s[i] != '' && s[i].indexOf(',') < 0) {
                    s[i] = s[i].replace(/\s/g, "");
                    username = username + s[i] + ',';
                } else if (s[i] != '') {
                    s[i] = s[i].replace(/\s/g, "");
                    username = username + s[i];
                }
            }
            var last = username.charAt(username.length - 1);
            if (last == ',') {
                username = username.substring(0, username.length - 1);
            }
            $("[name=userNames]").val(username);
        },
        /**
         * 回调
         * @param e
         * @param option
         */
        back: function (e, option) {
            var hasRetrun = $("[name='hasRetrun']").val();
            if (hasRetrun) {
                var fromPlayerDetail = $("[name='fromPlayerDetail']").val();
                var playerId = $("[name='playerId']").val();
                if (fromPlayerDetail == "true" && playerId) {
                    $("#mainFrame").load(root + "/player/playerDetail.html?search.id=" + playerId);
                } else if (fromPlayerDetail == "playerList") {
                    $("#mainFrame").load(root + "/player/list.html");
                } else {
                    $(".return-btn").click();
                }
            } else {
                $("#mainFrame").load(root + "/fund/manual/index.html");
            }
        },
        changeSale: function (e) {
            var $target = $(e.currentTarget);
            $("input[name=activityName]").val($target.text());
        }
    });
});