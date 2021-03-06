/**
 * Created by eagle on 15-10-12.
 */
define(['site/operation/activity/ActivityMoneyContent', 'jqFileInput', 'UE.I18N.' + window.top.language, 'css!themesCss/fileinput/fileinput'], function (Money, fileinput) {
    return Money.extend({
        maxRange: 30,
        ue: null,
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var that = this;
            //标签未编辑和已编辑
            $(".title").on("keyup", function (e) {
                that.updateText(e);
            });

            $(".condition-input-txt").blur(function () {
                that.validateSameCondition();
            });
            $(".award_amount").blur(function (e) {
                that.validAwardRule();
            });

            that.remainCountEvent();
            that.remainProbalilityEvent();
            that.changeConditionEvent();
            that.awardAmountEvent();
            that.awardCountEvent();
            that.buildOtherEvent();
            /**
             * kobe----却换pc和手机终端
             */
            $(this.formSelector).on("click", "#pc-terminal", function(e) {
                $(".pc").show();
                $(".mb").hide();
                $("#pc-terminal").removeClass("btn-default");
                $("#mb-terminal").addClass("btn-default");
                $(".mb .tab-pane").removeClass('active');
                var tab = $(".pc li.active a").attr('href');
                $(tab).addClass('active');
            });
            $(this.formSelector).on("click", "#mb-terminal", function(e){
                $(".pc").hide();
                $(".mb").show();
                $("#mb-terminal").removeClass("btn-default");
                $("#pc-terminal").addClass("btn-default");
                $(".pc .tab-pane").removeClass('active');
                var tab = $(".mb li.active a").attr('href');
                $(tab).addClass('active');
            });

        },

        buildOtherEvent:function () {
            var that = this;
            /**
             * 解决提示不准确的问题
             */
            $(that.formSelector).on("validate", ".title,.activityContentFile,.activityAffiliated,.contents", function (e, message) {
                if (message) {
                    if (!$(this).parents('.tab-pane').hasClass('active')) {
                        if ($(this).parents('.terminal').hasClass('pc')){
                            $("#pc-terminal").formtip(message);
                        }else {
                            $("#mb-terminal").formtip(message);
                        }
                        /*$("#a_" + $(this).attr("bbb")).formtip(message);*/
                        e.result = true;
                    }
                }
                else {
                    e.result = false;
                }
            });


            $(that.formSelector).on("validate", "#prank", function (e, message) {
                if (message) {
                    if ($(this).is(":hidden")) {
                        $("#playerRank").formtip(message);
                        e.result = true;
                    }
                }
                else {
                    e.result = false;
                }
            });


            /**
             * 首存送单选切换
             */
            $(that.formSelector).on("click", "input[name='ｍosaicGold']", function (e) {
                if (this.value == 'false') {
                    $(".fd_percentageHandsel").attr("disabled", true);
                    $(".fd_regularHandsel").attr("disabled", false);
                    $("#preferentialAmountLimit").css("display", "none");
                    $("input[data-name='percentageHandsel[{n}].preferentialValue']").removeClass("error");
                } else {
                    $(".fd_percentageHandsel").attr("disabled", false);
                    $(".fd_regularHandsel").attr("disabled", true);
                    $("#preferentialAmountLimit").css("display", "");
                    $("input[data-name='regularHandsel[{n}].preferentialValue").removeClass("error");
                }
            });

            /**
             * 层级全选
             */
            $("#levels").click(function (e, opt) {
                var id_array = new Array();
                $("#playerRank input[type='checkbox']").each(function (item, obj) {
                    if (!$(this).prop("disabled")) {
                        obj.checked = e.currentTarget.checked;
                        if (e.currentTarget.checked) {
                            id_array.push($(this).val());
                        }
                    }
                });
                var ids = id_array.join(',');
                $("input[name='rank']").val(ids);
            });

            /**
             * 全选后点击某个checkbox 去掉全选选中
             */
            $("[name='activityRule.rank']").on("click", function (e) {
                if (!this.checked) {
                    $("#levels").attr("checked", false);
                }

                var id_array = new Array();
                $("#playerRank input[type='checkbox']").each(function (item, obj) {
                    if (!$(this).prop("disabled")) {
                        if (obj.checked) {
                            id_array.push($(this).val());
                        }
                    }
                });
                var ids = id_array.join(',');
                $("input[name='rank']").val(ids);
            });
        },

        onPageLoad: function () {

            /**
             * 上传组件初始化
             */
            this._super();
            var _this = this;
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });

            _this.unInitFileInput($('.file'))
                .fileinput({
                    showUpload: false,
                    maxFileCount: 1,
                    maxFileSize: 1024,
                    //minImageWidth: 630,
                    //minImageHeight: 350,
                    //maxImageWidth: 630,
                    //maxImageHeight: 350,
                    mainClass: "input-group",
                    removeLabel: window.top.message.operation['activity.file.upload.remove'],
                    browseLabel: window.top.message.operation['activity.file.upload.browse'] + '&hellip;',
                    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
                    msgInvalidFileExtension: window.top.message.operation['activity.file.upload.msgInvalidFileExtension'],
                    msgValidationError: window.top.message.operation['activity.file.upload.msgValidationError'],
                    msgSizeTooLarge: window.top.message.operation['activity.file.upload.msgSizeTooLarge'],
                    //msgImageWidthSmall: window.top.message.operation['activity.file.size.widthError'],
                    //msgImageHeightSmall: window.top.message.operation['activity.file.size.heightError'],
                    //msgImageWidthLarge: window.top.message.operation['activity.file.size.widthError'],
                    //msgImageHeightLarge: window.top.message.operation['activity.file.size.heightError']
                }).bind("filecleared", function (e) {
                e.fileInput.$container.prev().show();
                e.fileInput.$container.next().val(e.fileInput.$container.next().next().val());
                e.fileInput.$container.parent().next().children().attr("src", "");
                _this.updateText(e);
                //e.fileInput.$container.parent().addClass("error");
                //page.resizeDialog();
            }).bind("fileloaded", function (e) {
                e.fileInput.$container.prev().hide();
                e.fileInput.$container.next().val("hasUploaded");
                e.fileInput.$container.parent().removeClass("error");
                _this.updateText(e);
                //page.resizeDialog();
            });
            /**
             * 预览图片副本
             */
            $.each($(".file1"), function (index, item) {
                window.top.topPage.initFileWithPreview(item, $("#aa_" + index), {
                    //maxImageWidth:630,
                    //maxImageHeight:350,
                    //minImageWidth:630,
                    //minImageHeight:350,
                    maxFileSize: 1024,
                    allowedFileExtensions: ['.jpg', '.jpeg', '.png', '.gif']
                });
            });

            $.each($(".file2"), function (index, item) {
                window.top.topPage.initFileWithPreview(item, $("#dd_" + index), {
                    maxFileSize: 1024,
                    allowedFileExtensions: ['.jpg', '.jpeg', '.png', '.gif']
                });
            });

            this.initUEditor();
            this.checkHandsel();

        },

        //未编辑,已编辑
        updateText: function (e, index) {
            var $current_tab = $('[aria-expanded=true]');
            var $tab_span = $current_tab.find("span");
            var index;
            if (e == 'contentchange') {
                index = index;
            } else {
                index = $(e.currentTarget).attr("bbb");
            }
            var title_val = $("#title" + index).val();
            var img2 = $("[name='activityMessageI18ns[" + index + "].activityAffiliated']").val();
            var activityDescription_val = UE.getEditor('editContent' + index).hasContents();
            if (title_val.trim() && img2.trim() && activityDescription_val) {
                $tab_span.text(window.top.message.operation_auto['已编辑']);
            } else {
                $tab_span.text(window.top.message.operation_auto['未编辑']);
            }
        },


        /**
         * 重载表单验证方法
         * @param e
         * @returns {*}
         */
        validateForm: function (e) {
            var isValide = this._super(e);
            var that = this;
            if (isValide) {
                $.each($(".file"), function (index, item) {
                    if ($(this).parent().parent().parent().parent().hasClass("has-error")) {
                        isValide = false;
                        //$("#a_"+$(this).attr("bbb")).formtip("afafds"); 此处暂时注释掉，如果需要提示该语句可以解决
                    }
                });
            }
            var temp = that.validAllOpenPeriod();
            if(!temp){
                $("#open-period-div").addClass("error");
                page.showPopover({currentTarget:$("#open_period")},{},"danger",window.top.message.operation_auto['开放时段开始时间不能大于结束时间'],true);
            }else{
                $("#open-period-div").removeClass("error");
            }
            var condition = that.validateSameCondition();
            var rules = that.validAwardRule();
            var period = that.validPeriod();
            return isValide && temp && condition && rules &&period;
        },
        /**
         * 救济金优惠名额数量
         */
        placesNumberChange: function (e) {
            if (e.key == 'false') {
                //select.clearValue("[name='activityRule.placesNumber']");
                $("[name='activityRule.placesNumber']").val("");
            } else {
                select.setValue("[name='activityRule.placesNumber']", "0");
            }
            $("#placesNumbers").css("display", e.key == 'false' ? "table" : "none");
            $("#placesNumber_tips").css("display", e.key == 'false' ? "table" : "none");
        },

        /**
         * 编辑功能的时候初始化默认选中单选框
         */
        checkHandsel: function () {
            if ($(".fd_percentageHandsel").val() != "") {
                $("#percentageHandsel").attr("checked", "checked")
                $("#preferentialAmountLimit").css("display", "");
                $(".fd_regularHandsel").attr("disabled", true);
                $(".fd_percentageHandsel").attr("disabled", false);
            }
            if ($(".fd_regularHandsel").val() != "") {
                $("#regularHandsel").attr("checked", "checked")
                $(".fd_percentageHandsel").attr("disabled", true);
                $("#preferentialAmountLimit").css("display", "none");
                $(".fd_regularHandsel").attr("disabled", false);
            }
        },

        /**
         *
         * 初始化富文本框
         */
        initUEditor: function () {
            var _this = this;

            for (var i = 0; i < languageCounts; i++) {
                if( $("div._editArea"+i).length>0) {
                    this.ue = UE.getEditor('editContent' + i);
                } else {
                    UE.delEditor('editContent' + i);
                    this.ue = UE.getEditor('editContent' + i, {
                        toolbars: [
                            [
                                'source','anchor', 'undo', 'redo', 'bold', 'indent', 'italic', 'underline', 'strikethrough', 'subscript', 'fontborder',
                                'superscript', 'formatmatch', 'blockquote', 'pasteplain', 'selectall', 'preview', 'horizontal', 'removeformat', 'time',
                                'date', 'unlink', 'insertrow', 'insertcol', 'mergeright', 'mergedown', 'deleterow', 'deletecol', 'splittorows', 'splittocols',
                                'splittocells', 'deletecaption', 'inserttitle', 'mergecells', 'deletetable', 'cleardoc', 'insertparagraphbeforetable',
                                'fontfamily', 'fontsize', 'paragraph', 'edittable', 'edittd', 'link', 'spechars', 'searchreplace', 'justifyleft', 'justifyright',
                                'justifycenter', 'justifyjustify', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'fullscreen',
                                'directionalityltr', 'directionalityrtl', 'rowspacingtop', 'rowspacingbottom', 'imagenone', 'imageleft', 'imageright',
                                'imagecenter', 'lineheight', 'edittip ', 'customstyle', 'autotypeset', 'touppercase', 'tolowercase', 'background', 'inserttable',
                                'simpleupload', 'insertimage'
                            ]
                        ],
                        imageUrlPrefix: window.top.imgRoot + "/files/",
                        urlParam: 'objId=' + i + '&catePath=activityPic',
                        enableAutoSave: false, /*是否自动保存*/
                        initialFrameWidth: ($(window.document).width() * .6), /*初始化编辑器宽度*/
                        initialFrameHeight: 200, /*初始化编辑器高度*/
                        autoHeightEnabled: false, /*是否自动长高*/
                        autoFloatEnabled: true, /*toolbar 是否固定 */
                        elementPathEnabled: false,
                        maximumWords: 1000000000,
                        index: i,
                        wordCount: false
                    });

                }
                this.ue.addListener("contentChange", function (e) {
                    var index = this.options.index;
                    var areaClassName = '._editArea' + index;
                    this.sync();
                    $($(areaClassName)[1]).valid();
                    $("textarea").text( UE.getEditor('editContent'+index).getContent());
                    _this.updateText(e, index);
                });
            }
        },

        /**
         * 图片上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            e.objId = 1;
            e.catePath = 'headImage';
            $(e.currentTarget).unlock();
            var flag = this.uploadAllFiles(e, opt);
            if(!flag){
                $(e.currentTarget).unlock();
                return false;
            }

            if (!this.validateForm(e)) {
                return false;
            }
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            return true;
        },


        /**
         * 活动内容页面下一步
         * @param e
         */
        activityContentNext: function (e) {
            var _this = this;
            var code = $("#code").val();
            if (code == 'back_water') {
                $("#step1").hide();
                $("#step2").show();
                $(e.currentTarget).unlock();
            } else {
                window.top.topPage.ajax({
                    type: "Get",
                    url: root + '/operation/activity/activityRule.html',
                    data: {"result.code": code},
                    success: function (data) {
                        datas = eval('(' + data + ')');
                        //$("#playerRank").text('');//先去除层级数据避免二次追加
                        //$.each(datas.playerRanks, function (index, item) {
                        //    $("#playerRank").append('<label class="m-r-sm"><input type="checkbox" class="i-checks" name="activityRule.rank" value="' + item.id + '">' + item.rankName + '</label>');
                        //    $("[name='activityRule.rank']").on("click",function(){
                        //        if(!this.checked) {
                        //            $("#levels").attr("checked", false);
                        //        }
                        //    })
                        //}),
                        $("#validateRule").text(datas.activityRuleForm);
                        $("#step1").hide();
                        $("#step2").show();
                        page.bindFormValidation();
                        _this.calTotalMoneyAndCount();
                        $(e.currentTarget).unlock();
                    },
                    error: function (data) {
                        $(e.currentTarget).unlock();
                    }
                });
            }
        },

        /**
         * 活动规则页面上一步
         * @param e
         */
        activityRulePre: function (e) {
            var code = $("#code").val();
            window.top.topPage.ajax({
                type: "Get",
                url: root + '/operation/activity/activityRulePre.html',
                data: {"result.code": code},
                success: function (data) {
                    $("#validateRule").text(data);
                    $("#step1").show();
                    $("#step2").hide();
                    page.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },
        activityRuleNextValidate:function (e, opt) {
            var that = this;
            if(!this.validateForm(e)){
                $(e.currentTarget).click();
                return false;
            }
            if(opt.code=='money'){

                var rpb = that.getRemainProbability();
                if(rpb<0){
                    var pro_txt = $(".awards-rules-input-pro")[0];
                    var obj = {currentTarget:pro_txt};
                    var msg = ""+window.top.message.operation_auto['概率总和不能超过']+"";
                    msg = this.formatStr(msg,"100%");
                    page.showPopover(obj,{},'danger',msg,true);
                    return false;
                }
                var type = $("[name='activityRule.conditionType']:checked").val();

                if(type!='3') {
                    if (!that.validateCondition(e, opt)) {
                        var pro_txt = $("#money_condition");
                        var obj = {currentTarget: pro_txt};
                        var msg = window.top.message.operation['Activity.money.awardrules.notempty'];
                        page.showPopover(obj, {}, 'danger', msg, true);
                        return false;
                    }

                }
                if (!that.validateAwardRule(e, opt)) {
                    var pro_txt = $("#awards_rules");
                    var obj = {currentTarget: pro_txt};
                    var msg = window.top.message.operation['Activity.money.awardrules.notempty'];
                    page.showPopover(obj, {}, 'danger', msg, true);
                    return false;
                }
            }
            that.validatePeriodArea(e,"validRule",opt);
            return false;
        },
        /**
         * 活动规则页面下一步
         * @param e
         */
        activityRuleNext: function (e) {
            $("#step2").hide();
            $("#step3").show();

            //预览界面赋值
            $("#previewCode").text($("#name").val() + '-' + $("#introduce").val());//活动类型
            $("#previewPAL").text($("#rulePAL").val());//赠送彩金上限

            $("#previewDepositWay").remove();
            $("#preDepositWay").append('<div class="col-sm-5" id="previewDepositWay"></div>');
            $("[name='activityRule.depositWay']:checked").each(function (index, item) {//存款方式
                $("#previewDepositWay").append($(this).parent().text() + '&nbsp;');
            });

            $("#previewRank").remove();
            $("#rank").append('<div class="col-sm-5" id="previewRank"></div>');
            $("[name='activityRule.rank']:checked").each(function (index, item) {//参与层级
                if (!$(this).prop("disabled")) {
                    $("#previewRank").append($(this).parent().text() + '&nbsp;');
                }
            });

            if ($("[name='activityMessage.isDisplay']:checked").val() == 'true') {//前端展示
                $("#previewDisplay").text(window.top.message.operation_auto['展示']);
            } else {
                $("#previewDisplay").text(window.top.message.operation_auto['不展示']);
            }
            $("#previewActivityClass").text(select.getSelected("[name='activityMessage.activityClassifyKey']").text());// 活动分类
            $("#previewActivityTime").text($("[name='activityMessage.startTime']").val() + '-' + $("[name='activityMessage.endTime']").val());// 活动时间

            var claimPeriod = $("[name='activityRule.claimPeriod']").val();
            if (claimPeriod == 'NaturalDay') {
                $("#previewClaimPeriod").text(window.top.message.operation_auto['一日']);//申领周期
            } else if (claimPeriod == 'NaturalWeek') {
                $("#previewClaimPeriod").text(window.top.message.operation_auto['一周']);
            } else if (claimPeriod == 'NaturalMonth') {
                $("#previewClaimPeriod").text(window.top.message.operation_auto['一月']);
            } else if (claimPeriod == 'ActivityCycle') {
                $("#previewClaimPeriod").text(window.top.message.operation_auto['活动周期']);
            }

            var effectiveTime = $("[name='activityRule.effectiveTime']").val();
            if (effectiveTime == 'OneDay') {
                $("#previewEffectiveTime").text(window.top.message.operation_auto['天内'].replace("[0]",1));//有效时间
            } else if (effectiveTime == 'TwoDays') {
                $("#previewEffectiveTime").text(window.top.message.operation_auto['天内'].replace("[0]",2));
            } else if (effectiveTime == 'ThreeDays') {
                $("#previewEffectiveTime").text(window.top.message.operation_auto['天内'].replace("[0]",3));
            } else if (effectiveTime == 'SevenDays') {
                $("#previewEffectiveTime").text(window.top.message.operation_auto['天内'].replace("[0]",7));
            } else if (effectiveTime == 'ThirtyDays') {
                $("#previewEffectiveTime").text(window.top.message.operation_auto['天内'].replace("[0]",30));
            } else if (effectiveTime == 'ActivityCycle') {
                $("#previewEffectiveTime").text(window.top.message.operation_auto['活动周期']);
            }

            //优惠名额数量
            if ($("[name='placesNumber']").val() == 'true') {
                $("#previewPlacesNumber").text(window.top.message.operation_auto['无限制']);
            } else {
                $("#previewPlacesNumber").text($("[name='activityRule.placesNumber']").val());
            }
            //是否审核
            if ($("[name='activityRule.isAudit']").val() == 'true') {//前端展示
                $("#previewIsAudit").text(window.top.message.operation_auto['是']);
            } else {
                $("#previewIsAudit").text(window.top.message.operation_auto['否']);
            }
            //是否申请
            if ($("[name='activityRule.isNeedApply']").val() == 'true') {//前端展示
                $("#previewisNeedApply").text(window.top.message.operation_auto['是']);
            } else {
                $("#previewisNeedApply").text(window.top.message.operation_auto['否']);
            }
            //优惠条件
            var code = $("#code").val();
            if (code == 'back_water') {//返水优惠
                $("#previewRakeback").text($("#backWater").text());
                $("#activityBackWaterTable").html($("#backWaterTable").clone());
            }
            if (code == 'regist_send') {// 注册送
                var texts = $("#regist_send").find("tr:eq(2)").find("td:eq(0)").text();
                var textval = $("[name='activityWayRelation.preferentialValue']").val();
                $("#registSendCaijin").text(texts + textval);

                var texts2 = $("#regist_send").find("tr:eq(2)").find("td:eq(1)").text();
                var textval2 = $("[name='activityWayRelation.preferentialAudit']").val();
                if (textval2 != "") {
                    $("#registSendJihe").text(textval2 + texts2);
                } else {
                    $("#registSendJihe").text("---");
                }

            }
            if (code == 'effective_transaction') {//有效交易量
                $("#effectiveTr").find("tr:gt(1)").remove();
                $("#first_deposit").find("tr:gt(1)").each(function (index, item) {
                    var a1 = $(item).find("td:eq(0) input").val();
                    var a2 = $(item).find("td:eq(1) input").val();
                    var a3 = $(item).find("td:eq(2) input").val();
                    if (a3 != "") {
                        $("#effectiveTr").append("<tr><td>".concat(window.top.message.operation_auto['满以上'].replace("[0]",a1)).concat("</td><td>").concat(window.top.message.operation_auto['送']).concat(a2).concat("</td><td>").concat(a3).concat(window.top.message.operation_auto['倍']).concat("</td></tr>"));
                    } else {
                        a3 = "---";
                        $("#effectiveTr").append("<tr><td>".concat(window.top.message.operation_auto['满以上'].replace("[0]",a1)).concat("</td><td>").concat(window.top.message.operation_auto['送']).concat(a2).concat("</td><td>").concat(a3).concat(window.top.message.operation_auto['倍']).concat("</td></tr>"));
                    }

                });
            }
            if (code == 'relief_fund') {//救济金
                $("#reliefund").find("tr:gt(1)").remove();
                $("#first_deposit").find("tr:gt(1)").each(function (index, item) {
                    var a1 = $(item).find("td:eq(0) input").val();
                    var a2 = $(item).find("td:eq(1) input").val();
                    var a3 = $(item).find("td:eq(2) input").val();
                    var a4 = $(item).find("td:eq(3) input").val();
                    var a5 = $(item).find("td:eq(4) input").val();
                    if (a5 != "") {
                        $("#reliefund").append("<tr><td>".concat(window.top.message.operation_auto['满以上'].replace("[0]",a1)).concat("</td><td>").concat(window.top.message.operation_auto['剩余以下'].replace("[0]",a2)).concat("</td><td>").concat(window.top.message.operation_auto['达以上'].replace("[0]",a3)).concat("</td><td>").concat(window.top.message.operation_auto['送']).concat(a4).concat("</td><td>").concat(a5).concat(window.top.message.operation_auto['送']).concat("</td></tr>"));
                    } else {
                        a5 = "---";
                        $("#reliefund").append("<tr><td>".concat(window.top.message.operation_auto['满以上'].replace("[0]",a1)).concat("</td><td>").concat(window.top.message.operation_auto['剩余以下'].replace("[0]",a2)).concat("</td><td>").concat(window.top.message.operation_auto['达以上'].replace("[0]",a3)).concat("</td><td>").concat(window.top.message.operation_auto['送']).concat(a4).concat("</td><td>").concat(a5).concat(window.top.message.operation_auto['送']).concat("</td></tr>"));
                    }

                });
            }
            if (code == 'first_deposit' || code == 'deposit_send') {//首存送 存就送
                var aa;
                if ($("[name='ｍosaicGold']:checked").val() == 'true') {
                    aa = window.top.message.operation_auto['按比例赠送彩金'];
                } else {
                    aa = window.top.message.operation_auto['固定赠送彩金CNY'];
                }
                $("#firstAndDeposit").find("tr:gt(0)").remove();
                $("#firstAndDeposit").append("<tr><td>".concat(window.top.message.operation_auto['存款金额CNY']).concat("</td><td>").concat(aa).concat("</td><td>").concat(window.top.message.operation_auto['优惠稽核']).concat("</td></tr>"));
                $("#first_deposit").find("tr:gt(1)").each(function (index, item) {
                    var a1 = $(item).find("td:eq(0) input").val();
                    var a2;
                    if ($("[name='ｍosaicGold']:checked").val() == 'true') {
                        a2 = $(item).find("td:eq(1) input").val() + "%";
                    } else {
                        a2 = window.top.message.operation_auto['送'] + $(item).find("td:eq(2) input").val();
                    }
                    var a3 = $(item).find("td:eq(3) input").val();
                    if (a3 != "") {
                        $("#firstAndDeposit").append("<tr><td>满" + a1 + "以上</td><td>" + a2 + "</td><td>" + a3 + "倍</td></tr>");
                    } else {
                        a3 = "---";
                        $("#firstAndDeposit").append("<tr><td>满" + a1 + "以上</td><td>" + a2 + "</td><td>" + a3 + "</td></tr>");
                    }

                });
            }
            if (code == 'profit_loss') {//盈亏送
                //盈利
                $("#previewprofit").find("tr:gt(1)").remove();
                $("#first_deposit").find("tr:gt(1)").each(function (index, item) {
                    var a1 = $(item).find("td:eq(0) input").val();
                    var a2 = $(item).find("td:eq(1) input").val();
                    var a3 = $(item).find("td:eq(2) input").val();

                    if (a3 != "") {
                        $("#previewprofit").append("<tr><td>满" + a1 + "以上</td><td>送" + a2 + "</td><td>" + a3 + "倍</td></tr>");
                    } else {
                        a3 = "---";
                        $("#previewprofit").append("<tr><td>满" + a1 + "以上</td><td>送" + a2 + "</td><td>" + a3 + "</td></tr>");
                    }

                });
                //亏损
                $("#previewloss").find("tr:gt(1)").remove();
                $("#loss").find("tr:gt(1)").each(function (index, item) {
                    var a1 = $(item).find("td:eq(0) input").val();
                    var a2 = $(item).find("td:eq(1) input").val();
                    var a3 = $(item).find("td:eq(2) input").val();
                    if (a3 != "") {
                        $("#previewloss").append("<tr><td>".concat(window.top.message.operation_auto['满以上'].replace("[0]",a1)).concat("</td><td>").concat(window.top.message.operation_auto['送']).concat(a2).concat("</td><td>").concat(a3).concat(window.top.message.operation_auto['倍']).concat("</td></tr>"));
                    } else {
                        a3 = "---";
                        $("#previewloss").append("<tr><td>".concat(window.top.message.operation_auto['满以上'].replace("[0]",a1)).concat("</td><td>").concat(window.top.message.operation_auto['送']).concat(a2).concat("</td><td>").concat(a3).concat(window.top.message.operation_auto['倍']).concat("</td></tr>"));
                    }

                });
            }
            if(code=="money"){
                this.previewMoneyContent();
            }

            // 活动名称，图片，内容
            for (i = 0; i < languageCounts; i++) {
                $("#previewActivityName" + i).text($("[name='activityMessageI18ns[" + i + "].activityName']").val());
                /*主图*/
                if ($("#activityAffiliatedImg" + i + ' ' + "img").attr("src") == "") {
                    var src1 = $("#activityAffiliatedImage" + i + ' ' + "img").attr('src');
                    $("#previewActivityAffiliateImg" + i + ' ' + "img").attr('src', src1);
                } else {
                    var src2 = $("#activityAffiliatedImg" + i + ' ' + "img").attr('src');
                    $("#previewActivityAffiliateImg" + i + ' ' + "img").attr('src', src2);
                }
                $("#previewActivityDesc" + i).html($("[name='activityMessageI18ns[" + i + "].activityDescription']").val());
            }
            $(e.currentTarget).unlock();
        },

        /**
         * 活动预览上一步
         * @param e
         */
        activityPreviewPre: function (e) {
            var code = $("#code").val();
            window.top.topPage.ajax({
                type: "Get",
                url: root + '/operation/activity/activityPreviewPre.html',
                data: {"result.code": code},
                success: function (data) {
                    $("#validateRule").text(data);
                    $("#step3").hide();
                    $("#step2").show();
                    page.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 获取活动Id
         * @param event
         * @param opt
         */
        getActivityMessageId: function (event, opt) {
            $('input[name=activityMessageId]').val(opt.data.activityMessageId);
            $("[name='token']").val(opt.data.token);
        },

        /**
         * 新增活动规则和优惠
         * @param e
         * @param option
         */
        addActivityRule: function (e, option) {
            var _tr_len = $("#first_deposit").find("tr").length - 2;
            var canCreate = _tr_len < this.maxRange;
            if (canCreate) {
                /*tr clone*/
                var _tr = $("#first_deposit").find("tr:eq(2)").clone(true);
                _tr.find("button").removeClass("disabled");
                _tr.find("input").val("");
                _tr = this.resetIndex(_tr, _tr_len)
                $("#first_deposit").find("tr:last").after(_tr);
            } else {
                var _message = window.top.message.operation_auto['最多10个区间'];
                window.top.topPage.showInfoMessage(_message);
            }
            $(e.currentTarget).unlock();
        },

        addActivityRule2: function (e, option) {
            var _tr_len = $("#loss").find("tr").length - 2;
            var canCreate = _tr_len < this.maxRange;
            if (canCreate) {
                /*tr clone*/
                var _tr = $("#loss").find("tr:eq(2)").clone(true);
                _tr.find("button").removeClass("disabled");
                _tr.find("input").val("");
                _tr = this.resetIndex2(_tr, _tr_len)
                $("#loss").find("tr:last").after(_tr);
            } else {
                var _message = window.top.message.operation_auto['最多10个区间'];
                window.top.topPage.showInfoMessage(_message);
            }
            $(e.currentTarget).unlock();
        },

        /**
         * 计算index
         * 如果obj不为空 只计算obj的index
         * obj 为空计算全部的
         * @param obj jquery对象
         * @param index 下标
         */
        resetIndex: function (obj, currentIndex) {

            if (obj) {
                /*判断是否是 jquery 对象*/
                var $obj = obj.val ? obj : $(obj);
                /*每个需要提交的input*/
                $obj.find('[data-name]').each(function (index, obj) {
                    var $this = $(this);
                    /*替换下标*/
                    $this.prop('name', $this.data('name').replace('{n}', currentIndex));
                });
                /*返回*/
                return $obj
            } else {
                /*所有的table*/
                $('.fd').each(function (index, obj) {
                    /*table*/
                    var $tr = $(this);
                    /*每个需要提交的input*/
                    $('[data-name]', $tr).each(function () {
                        var $this = $(this);
                        /*替换下标*/
                        $this.prop('name', $this.data('name').replace('{n}', index));
                    })
                });
            }
        },

        resetIndex2: function (obj, currentIndex) {

            if (obj) {
                /*判断是否是 jquery 对象*/
                var $obj = obj.val ? obj : $(obj);
                /*每个需要提交的input*/
                $obj.find('[data-name]').each(function (index, obj) {
                    var $this = $(this);
                    /*替换下标*/
                    $this.prop('name', $this.data('name').replace('{n}', currentIndex));
                });
                /*返回*/
                return $obj
            } else {
                /*所有的table*/
                $('.fd2').each(function (index, obj) {
                    /*table*/
                    var $tr = $(this);
                    /*每个需要提交的input*/
                    $('[data-name]', $tr).each(function () {
                        var $this = $(this);
                        /*替换下标*/
                        $this.prop('name', $this.data('name').replace('{n}', index));
                    })
                });
            }
        },

        /**
         * 删除优惠条件
         * @param e
         * @param option
         */
        deleteActivityRule: function (e, option) {
            $(e.currentTarget).parent().parent().remove();
            this.resetIndex();
            $(e.currentTarget).unlock();
        },

        deleteActivityRule2: function (e, option) {
            $(e.currentTarget).parent().parent().remove();
            this.resetIndex2();
            $(e.currentTarget).unlock();
        },

        /**
         * 赠送彩金上限
         * @param event
         * @param option
         */
        changeRatio: function (event, option) {

            var pal = Number.parseInt(Number($("#rulePAL").val()));

            if (option.post == 'add') {
                pal += 1;
            }

            if (option.post == 'sub') {
                if (pal == 0) {
                    $("#rulePAL").val(pal);
                } else {
                    pal -= 1;
                }
            }
            $("#rulePAL").val(pal);
            $(event.currentTarget).unlock();
        },

        /**
         * 预览发布
         * @param e
         */
        activityRelease: function (e, btnOption) {
            var url = root + '/operation/activity/activityRelease.html?closeDisplay='+btnOption.closeDisplay;
            var data = window.top.topPage.getCurrentFormData(e);
            // $(".activityRelease").addClass("ui-button-disable disabled");
            window.top.topPage.ajax({
                type: "POST",
                data: data,
                url: url,
                success: function (data) {
                    datas = eval('(' + data + ')');
                    e.returnValue = datas.state;
                    if (datas.state) {
                        e.page.showPopover(e, btnOption, 'success', datas.okMsg, true);
                    } else {
                        e.page.showPopover(e, btnOption, 'danger', datas.errMsg, true);
                    }
                },
                error: function (data) {
                    // $(".activityRelease").removeClass("ui-button-disable disabled");
                }
            });
        },

        /**
         * 发布后跳转到成功或失败页面
         * @param state
         */
        showLastStepPage: function (e, option) {
            // $(".activityRelease").removeClass("ui-button-disable disabled");
            if (e.returnValue) {
                $("#step3").hide();
                $("#step4").show();
            } else {
                $("#step3").hide();
                $("#step5").show();
            }
        },

        /**
         * 优惠活动：活动内容下一步直接到预览界面
         * @param e
         */
        activityContentTypeNext: function (e) {
            $("#step1").hide();
            $("#step3").show();

            //预览界面赋值
            $("#previewCode").text($("#name").val() + '-' + $("#introduce").val());//活动类型

            $("#previewRank").remove();
            $("#rank").append('<div class="col-sm-5" id="previewRank"></div>');
            $("[name='activityRule.rank']:checked").each(function (index, item) {//参与层级
                $("#previewRank").append($(this).parent().text() + '&nbsp;');
            });

            if ($("[name='activityMessage.isDisplay']:checked").val() == 'true') {//前端展示
                $("#previewDisplay").text(window.top.message.operation_auto['展示']);
            } else {
                $("#previewDisplay").text(window.top.message.operation_auto['不展示']);
            }
            $("#previewActivityClass").text(select.getSelected("[name='activityMessage.activityClassifyKey']").text());// 活动分类
            $("#previewActivityTime").text($("[name='activityMessage.startTime']").val() + '-' + $("[name='activityMessage.endTime']").val());// 活动时间

            // 活动名称，图片，内容
            for (i = 0; i < languageCounts; i++) {
                $("#previewActivityName" + i).text($("[name='activityMessageI18ns[" + i + "].activityName']").val());
                /*主图*/
                if ($("#activityAffiliatedImg" + i + ' ' + "img").attr("src") == "") {
                    var src1 = $("#activityAffiliatedImage" + i + ' ' + "img").attr('src');
                    $("#previewActivityAffiliateImg" + i + ' ' + "img").attr('src', src1);
                } else {
                    var src2 = $("#activityAffiliatedImg" + i + ' ' + "img").attr('src');
                    $("#previewActivityAffiliateImg" + i + ' ' + "img").attr('src', src2);
                }
                $("#previewActivityDesc" + i).html($("[name='activityMessageI18ns[" + i + "].activityDescription']").val());
            }
            $(e.currentTarget).unlock();
        },

        /**
         * 优惠活动：活动内容类型上一步预览
         * @param e
         */
        activityContentTypePreviewPre: function (e) {
            var code = $("#code").val();
            window.top.topPage.ajax({
                type: "Get",
                url: root + '/operation/activity/activityPreviewPre.html',
                data: {"result.code": code},
                success: function (data) {
                    $("#validateRule").text(data);
                    $("#step3").hide();
                    $("#step1").show();
                    page.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 编辑活动分类后对活动分类更新下拉框
         * @param e
         * @param option
         */
        changeClassification: function (e, option) {
            var _this = this;
            if (e.returnValue) {
                window.top.topPage.ajax({
                    url: root + "/operation/activityType/refreshSiteI8n.html",
                    success: function (data) {
                        var $html = $(e.currentTarget).parents('._i18n');
                        $html.find("ul").html("");
                        $html.find("[prompt='prompt']").html(window.top.message.operation_auto['选择分类']);
                        if (data) {
                            data = eval("(" + data + ")");
                            for (var i = 0; data[i]; i++) {
                                select.addOption($html, data[i].key, data[i].value);
                            }
                        }
                        $(e.currentTarget).unlock();
                    },
                    error: function () {
                        $(e.currentTarget).unlock();
                    }
                });
            }
        }


    });
});
