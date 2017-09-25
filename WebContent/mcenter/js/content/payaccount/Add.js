define(['common/BaseEditPage', 'jqFileInput', 'css!themesCss/fileinput/fileinput'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
            var _this=this;
            this.initFileInput();
            var key,e;
            if ($("#resultId").val() != "") {
                key = $("[name='result.bankCode']").val();
                if (key != null && key != "") {
                    e = {};
                    e.key = key;
                    e.page = this;
                    e.currentTarget = $("a[key=" + key + "]");
                    e.jsLoad = true;
                    this.thirdChange(e);
                }
            } else {
                $("input[name='result.accountType']").val(1);
                $("[name='account2']").hide();
                key = $("[name='bankCode1']").val();
                if (key) {
                    e = {};
                    e.key = key;
                    e.page = this;
                    e.currentTarget = $("a[key=" + key + "]");
                    this.thirdChange(e);
                }
            }
            //鼠标移上去，展示文案
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
            //this.TimeCallBack();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件fullRank
            $(this.formSelector).on("change", "#fullRank", function () {
                var sta = $(this).is(':checked');
                $("input[name='result.fullRank']").val(sta);
                if (sta) {
                    //$(".allRank").addClass('hide');
                    //$("input[name='rank']").attr('checked', true);
                    $("input[name='rank']").each(function (idx, rank) {
                        rank.checked = true;
                    });
                } else {
                    $(".allRank").removeClass('hide');
                    $("input[name='rank']").attr('checked', false);
                }
            });
            $(this.formSelector).on("click", "input[name='rank']", function () {
                _this.test(this);
            })
            //银行充值
            $(this.formSelector).on("click", "a[name='bankList']", function () {
                var bankName = $(this).attr('bankName');
                var showName = $(this).attr('showName');
                var bankIcon = $(this).attr('bankIcon');
                $("#accountType").val("1");
                $("#bankCode").val(bankName);
                var bankHtml = "<span id='showName' bankCode='" + bankName + "' ><img src='" + bankIcon + "' >&nbsp;&nbsp;" + showName + "</span>";
                $("#showName").replaceWith(bankHtml);
            });
            //输完账号自动获取银行
            $(this.formSelector).on("blur", "[name='account1']", function () {
                //显示重新选择
                if ($(this).val().trim().length > 3) {
                    $("[name='result.bankCode']").show();
                }

                var account = $(this).val();
                $("#account").val(account);
                if (account.length > 3) {
                    window.top.topPage.ajax({
                        url: root + '/payAccount/getBankInfo.html',
                        dataType: "json",
                        data: {"search.bankCardBegin": account},
                        success: function (data) {
                            if (data.bank != null) {
                                select.setValue("#bankError", data.bank.bankName);
                                $("#bankCode").val(data.bank.bankName);
                                //删除子元素
                                $("#currenct").children().remove();
                                $(data.siteCurrencyList).each(function (index) {
                                    var siteCurrencyList = data.siteCurrencyList;
                                    var currency = "<label class='m-r-sm'><input name='currency' type='checkbox' class='i-checks' " +
                                        "value='" + siteCurrencyList[index].code + "'> " + window.top.message.common[siteCurrencyList[index].code] + "</label>";
                                    $("#currenct").append(currency);
                                });

                            }
                        }
                    });
                } else if (account.length == 0) {
                    $("#showName").text(window.top.message.content['payAccount.pleaseAccount']);
                }
            });
            /**
             * 保存账号
             */
            $(this.formSelector).on("input", ".account", function (e, message) {
                var val = $(this).val();
                $("#account").val(val);
            });
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "#bankCode", function (e, message) {
                var accountType = $("#accountType").val();
                if (message) {
                    if (accountType == "2") {
                        $("#thirdError").formtip(message);
                    }
                    if (accountType == "1") {
                        $("#bankError").formtip(message);
                    }
                    e.result = true;
                }
                else {
                    e.result = false;
                }
            });
            /**
             * 重写验证-账号
             */
            $(this.formSelector).on("validate", "#account", function (e, message) {
                var accountType = $("#accountType").val();
                if (message) {
                    $("[name='account" + accountType).formtip(message);
                    e.result = true;
                }
                else {
                    e.result = false;
                }
            });
            /**
             * 货币
             */
            $(this.formSelector).on("validate", "#currencyStr", function (e, message) {
                var currencyNum = $("input[name='currency']:checked").length;
                if (!currencyNum > 0) {
                    $(".currency").formtip(message);
                    e.result = true;
                }
            });
            /**
             * 层级
             */
            $(this.formSelector).on("validate", "#rankStr", function (e, message) {
                var currencyNum = $("input[name='rank']:checked").length;
                if (!currencyNum > 0) {
                    $(".rank").formtip(message);
                    e.result = true;
                }
            });
            /* 全局表单验证 */
            $(this.formSelector).on('input change', function () {
                _this.TimeCallBack();
            });
        },

        initFileInput: function () {
            this.unInitFileInput($('.file')).fileinput({
                showUpload: false,
                maxFileCount: 1,
                maxFileSize: 1024,
                mainClass: "input-group",
                removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                allowedFileExtensions: ['jpg', 'jpeg', 'png','gif'],
                msgInvalidFileExtension: window.top.message.content['floatPic.file.upload.msgInvalidFileExtension'],
                msgValidationError: window.top.message.content['floatPic.file.upload.msgValidationError'],
                msgSizeTooLarge: window.top.message.content['floatPic.file.upload.msgSizeTooLarge'],
            }).bind("filecleared", function (e) {
                e.fileInput.$container.prev().show();
            }).bind("fileloaded", function (e) {
                e.fileInput.$container.prev().hide();
                //如果为必填验证时需要加上这个
                //e.fileInput.$container.next().val("hasUploaded");
                e.fileInput.$container.parent().removeClass("error");
            });
        },

        /**
         * 图片上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadPic: function (e, opt) {
            e.objId = $('div.payCode').attr('data-value');
            e.catePath = 'qrCode';
            if (!this.uploadAllFiles(e, opt)) return false;
            if (!this.validateForm(e)) return false;
            return $('.file-error-message:visible').length <= 0;
        },

        savePlayer: function (e, opt) {
            this.uploadPic(e, opt);
            var accountType = $("#accountType").val();
            var bankCode = '';
            if (accountType == "1") {
                //给默认值-银行
                bankCode = $("#bankError").attr('value');
            } else {
                //第三方
                bankCode = $("#third").attr('value');
            }
            if ($("#bankCode").val() == "") {
                $("#bankCode").val(bankCode);
            }

            //拼装货币
            var currencyStr = "";
            $('input[name="currency"]:checked').each(function (index) {
                var val = $(this).val();
                if (index == 0) {
                    currencyStr = currencyStr + val;
                } else {
                    currencyStr = currencyStr + "," + val;
                }
            });
            $("#currencyStr").val(currencyStr);
            //拼装层级
            var rankStr = "";
            $('input[name="rank"]:checked').each(function (index) {
                var val = $(this).val();
                if (index == 0) {
                    rankStr = rankStr + val;
                } else {
                    rankStr = rankStr + "," + val;
                }

            });
            $("#rankStr").val(rankStr);
            if (!this.validateForm(e)) {
                return;
            }
            return true;
        },
        accountTypeChange: function (e) {
            var accountType = e.key;
            $("#bankError").attr("value", "");
            $("#third").attr("value", "");
            $("#bankCode").val("");
            $("#third").val("");
            var bankHtml = "<span id='showName'>" + window.top.message.content['payAccount.pleaseAccount'] + "</span>";
            $("[name='result.bankCode']").hide();
            $("#showName").replaceWith(bankHtml);
            if (accountType == "1") {
                $(".bank-div").show();
                $(".third").hide();
                $('div.qr-code').hide();
                $("div.showKey").hide();
                $("#accountSpan").text(window.top.message.content['账号']);
                $("#khx-div").removeClass("hide");
                //给默认值-银行
                select.setValue($("[selectdiv='result.bankCode1']"), $("#defaultBank").text());
                $("#bankCode").val($("#defaultBank").text());
                this.otherBank($("#defaultBank").text(), '');
            } else {
                $(".third").show();
                $(".bank-div").hide();
                var tchannel = $('[name="bankCode2"]').val();
                if (!tchannel) {
                    tchannel = 'other';
                    $("#bankCode").val(tchannel);
                }
                if(tchannel == 'bitcoin') {
                    $("div.showKey").show();
                    $("#accountSpan").text(window.top.message.content['地址']);
                }
                if (tchannel == 'other') {
                    $('div.qr-code').hide();
                } else {
                    $('div.qr-code').show();
                }
                $("#khx-div").addClass("hide");
            }
            //账号输入的显示和隐藏
            $(".account").hide();
            $("[name='account" + accountType + "']").removeClass("hide");
            $("[name='account" + accountType + "']").show();
            $("input[name='result.customBankName']").val('');
            $("input[name='customBankName']").val('');
        },
        /**
         * 公司入款其他银行单独处理
         * @param bankname
         */
        otherBank: function (bankname, name) {
            if (bankname == 'other_bank') {
                $("div[selectdiv='result.bankCode1']").parent().addClass("input-group-btn");
                if (!$("input[name='customBankName']").val()) {
                    $("input[name='customBankName']").val(name);
                }
                $("input[name='customBankName']").show();
            } else {
                $("div[selectdiv='result.bankCode1']").parent().removeClass("input-group-btn");
                $("input[name='customBankName']").val("");
                $("input[name='customBankName']").hide();
            }
        },
        thirdChange: function (e) {
            var _this = this;
            var name = $(e.currentTarget).text();
            if (name) {
                name = name.trim();
                if (!e.jsLoad) {
                    $("input[name='result.customBankName']").val(name);
                }

            }
            this.otherBank(e.key, name);
            $("#bankCode").val(e.key);
            $("div.showKey").hide();
            $("#accountSpan").text(window.top.message.content['账号']);
            if ($('[name="result.accountType"]').val() == '2'   ) {
                $('div.qr-code').show();
                //比特币展示比特币地址
                if(e.key == 'bitcoin') {
                    $("div.showKey").show();
                    $("#accountSpan").text(window.top.message.content['地址']);
                }
            } else {
                $('div.qr-code').hide();
            }

            //第三方充值
            window.top.topPage.ajax({
                url: root + '/payAccount/getThirdBank.html',
                dataType: "json",
                data: {"search.bankCode": e.key},
                success: function (data) {
                    $("#currenct").children().remove();
                    var currencys = $("#old-currency-div").text();
                    if (data.siteCurrencyList != null) {
                        //删除子元素
                        $(data.siteCurrencyList).each(function (index) {
                            var siteCurrencyList = data.siteCurrencyList;
                            var checked = "";
                            if (currencys) {
                                currencys = currencys.trim();
                                var curs = currencys.split(",");
                                for (var i = 0; i < curs.length; i++) {
                                    if (curs[i] == siteCurrencyList[index].code) {
                                        checked = "checked";
                                        break;
                                    }
                                }
                            }
                            var currency = "<label class='m-r-sm'><input name='currency' type='checkbox' class='i-checks' " + checked +
                                " value='" + siteCurrencyList[index].code + "'> " + window.top.message.common[siteCurrencyList[index].code] + "</label>";
                            $("#currenct").append(currency);
                        });
                    }
                    _this.TimeCallBack();
                }
            });
        },
        saveCallbak: function (e, opt) {
            if (opt.data.state) {
                window.top.topPage.goToLastPage(true);
            } else {
                if (opt.data.token) {
                    $("[name='token']").val(opt.data.token);
                }
            }

        },
        TimeCallBack: function () {
            var accountType = $("#accountType").val();
            var payName = $("input[name='result.payName']").val();
            var fullName = $("input[name='result.fullName']").val();
            //var disableAmount = $("input[name='result.disableAmount']").val();
            var currency = $("input[name='currency']:checked");
            var rank = $("input[name='rank']:checked");
            var fullRank = $("input[id='fullRank']:checked");
            var customBankName = $("input[name='result.customBankName']").val();
            var openAcountName = $("#openAcountName").val();
            var bankCode = $("[name='result.bankCode']").val();

            var account;
            if (accountType == '1') {
                account = $("input[name='account1']").val();
            } else {
                account = $("input[name='account2']").val();
            }
            if ((accountType == '1' ? true : customBankName.length > 0)
                && payName.length > 0
                && fullName.length > 0
                //&& disableAmount.length > 0
                && currency.length > 0
                && (rank.length > 0 || fullRank.length > 0)
                && account.length > 0) {
                $("._search").unlock();
                $("._search").removeClass("disabled");

            } else {
                $("._search").lock();
                $("._search").addClass("disabled");
            }

        },
        /*revertDepositTotal: function (e, opt) {
            var id = $("#resultId").val();
            window.top.topPage.ajax({
                url: root + '/payAccount/revertData.html',
                dataType: "json",
                data: {"id": id},
                success: function (data) {
                    if (data != null) {
                        $("[name='result.depositTotal']").val(data.depositDefaultTotal);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        revertDepositCount: function (e, opt) {
            var id = $("#resultId").val();
            window.top.topPage.ajax({
                url: root + '/payAccount/revertData.html',
                dataType: "json",
                data: {"id": id},
                success: function (data) {
                    if (data != null) {
                        $("[name='result.depositCount']").val(data.depositDefaultCount);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },*/
        deleteQrCode: function (e, opt) {
            $("#picUrl").parent().parent().hide();
            $("input[name='result.qrCodeUrl']").val("");
            $("._search").unlock();
            $("._search").removeClass("disabled");
        },
        test: function (obj) {
            if(! $(obj).prop('checked')){
                $('#fullRank').prop('checked',false);
            }else{
                var inputs= $('.i-checks');
                var dd =0;
                for (var i=0;i<inputs.length;i++){
                    if($(inputs[i]).prop('checked')){
                        dd=dd+1;
                    }else{
                        return;
                    }
                }
                if (dd==inputs.length){
                    $('#fullRank').prop('checked',true);
                }
            }
        }
    });
});