//模板页面
define(['common/BaseEditPage', 'bootstrapswitch'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
            //switch
            this.unInitSwitch($("._switch")).bootstrapSwitch();
            //this.basicSettingIndex();
        },
        basicSettingIndex:function (e,opt) {
            var _this = this;
            $(".sys_tab_wrap").find("li").removeClass("active");
            $("#li_top_1").addClass("active");
            window.top.topPage.ajax({
                url: root + "/param/basicSettingIndex.html",
                success: function (data) {
                    $("#content-div").html(data);
                    $("#siteParam").attr("action", root + "/param/basicSettingIndex.html");
                    _this.bindSiteParamEvent();
                    _this.bindFormValidation();
                    page.onPageLoad();
                    $('.help-popover',_this.formSelector).popover();
                    if(e){
                        $(e.currentTarget).unlock();
                    }
                }
            });
        },
        preferenceIndex:function (e,opt) {
            var _this = this;
            $(".sys_tab_wrap").find("li").removeClass("active");
            $("#li_top_2").addClass("active");
            window.top.topPage.ajax({
                url: root + "/setting/preference/index.html",
                success: function (data) {
                    $("#content-div").html(data);
                    $("#siteParam").attr("action", root + "/setting/preference/index.html");
                    _this.bindPreferenceEvent();
                    _this.bindFormValidation();
                    page.onPageLoad();
                    if(e){
                        $(e.currentTarget).unlock();
                    }
                }
            });
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
            this.bindSiteParamEvent();
            this.qrSwitch();
            this.electricPin();
            this.encryptionSwitch();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            //短信开关
            $('input[name="sms-switch"]').on('switchChange.bootstrapSwitch', function(event, state) {
                $("#smsSwitch").val(state);
                if(state){
                    $(".smsTips0").remove();
                    $(".smsTips1").addClass("hidden");
                    $(".smsTips2").removeClass("hidden");
                    $("._smsSwitchIsShow").removeClass("hidden");
                }else{
                    $(".smsTips0").remove();
                    $(".smsTips1").removeClass("hidden");
                    $(".smsTips2").addClass("hidden");
                    $("._smsSwitchIsShow").addClass("hidden");
                }
            });

            //手机验证：开启显示隐藏信息
            $('input[name="sms-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
                var type=$(this).attr("typeName");
                $("#"+type).val(state);
                if(state){
                    $("#isShow"+type).show();
                }else{
                    $("#isShow"+type).hide();
                }
            });
        },
        bindSiteParamEvent:function () {
            var _this = this;
            $(this.formSelector).on("click", "#traSave", function () {
                window.top.topPage.ajax({
                    url: root + "/param/saveTrafficStatistics.html",
                    data:{"result.trafficStatistics":$("#trafficStatistics").val(),"result.id":$("#mstId").val()},
                    dataType: 'json',
                    success: function (data) {
                    }
                });
            })
            $(".yzmSelect").click(function(){
                var obj = $(this).children().children();
                var src = obj.attr("src");
                var captchaStyle = obj.attr("tt");
                $("#captchaStyleImg").attr("src",src);
                $("#captchaStyle").val(captchaStyle);
            })
            this.unInitSwitch($("[name='captchaGimpy']")).bootstrapSwitch({
                onText: window.top.message.content['floatPic.display.on'],
                offText: window.top.message.content['floatPic.display.off'],
            });
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch(
                    {
                        onSwitchChange: function (e, state) {
                            var area="nations."+$(this).attr("area");
                            var _target = e.currentTarget;
                            var type = $(_target).attr('mold');
                            if (type != "area" || !state && type == "area") {
                                var msg = "";
                                if (type == "area") {
                                    //
                                    msg = window.top.message.setting['basic.areaMsg'];
                                    msg= msg.replace("#",window.top.message.common[area]);
                                } else if (type == "language") {
                                    //开启
                                    msg = window.top.message.setting['basic.languageMsg.' + state];
                                } else if(type=='withdraw'){ //取款打款方式


                                }else {
                                    if (state) {
                                        msg = window.top.message.setting['basic.currencyMsg.' + state];
                                    } else {
                                        //货币

                                        msg = window.top.message.setting['basic.currencyMsg.' + state];
                                        msg = msg.replace("#", $(_target).attr("playerNum"));
                                    }
                                }
                                if (!$(_target).attr("isChanged")) {
                                    var status = $(_target).attr('status');
                                    if(status!='0'&&type=='language'){
                                        if (state) {
                                            _this.modifyText(_target, "1", state);
                                            return;
                                        }
                                    }
                                    window.top.topPage.showConfirmMessage(msg, function (confirm) {
                                        if (confirm) {
                                            $(_target).attr("isChanged", true);
                                            $(_target).bootstrapSwitch("state", !_target.checked);
                                            if(status=='0'){
                                                if(state){
                                                    _this.modifyText(_target, "1", state);
                                                    $(_target).attr('status','1');
                                                    return;
                                                }else{
                                                    $(_target).attr('status','0');
                                                    return;
                                                }
                                            }else{
                                                if (state) {
                                                    _this.modifyText(_target, "1", state);
                                                } else {

                                                    _this.modifyText(_target, "2", state);
                                                }
                                            }

                                        }
                                    });
                                }
                                else {
                                    $(_target).removeAttr("isChanged");
                                    return true;
                                }
                                return false;
                            } else {
                                //修改状态文字
                                _this.modifyText(_target, "1", state);
                            }


                        }
                    }
                );
            //这里初始化所有的事件
            //展开
            $(this.formSelector).on("click", ".more", function () {
                var className = $(this).attr("className");
                $(this).removeClass("more");
                $(this).addClass("stop");
                $("." + className).css("display", "block");
                $(this).addClass("dropup");
                var moreId=$(this).attr("moreId");
                $(moreId).text(window.top.message.setting['basic.stop']);
            });
            //收起
            $(this.formSelector).on("click", ".stop", function () {
                $(this).addClass("more");
                $(this).removeClass("stop");
                var className = $(this).attr("className");
                $("." + className).css("display", "none");
                $(this).removeClass("dropup");
                var moreId=$(this).attr("moreId");
                $(moreId).text(window.top.message.setting['basic.exhibition'+className]);
            });
            $(".dragdd").nestable({
                rootClass:'dragdd',
                listNodeName:'tbody',
                listClass:'dd-list1',
                itemNodeName:'tr',
                handleClass:'td-handle1',
                itemClass:'dd-item1',
                maxDepth:1
            });

            //切换语言
            $(this.formSelector).on("click","a[name='tag']", function () {
                var oldIdx=Number($(".current").attr("tagIndex"));
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".ann").hide();
                $(".content"+local).show();

                var tagIndex = $(this).attr("tagIndex");
                var langSize=Number($("[name='langSize']").val());
                if(oldIdx<tagIndex){
                    $(".previous_lang").removeClass("hide");
                    if(tagIndex == langSize){
                        $(".next_lang").addClass("hide");
                        //$(".preview").removeClass("hide");
                        _this.checkForNext();
                    }else{
                        $(".next_lang").removeClass("hide");
                    }
                }else if(oldIdx>tagIndex){
                    $(".preview").addClass("hide");
                    $(".next_lang").removeClass("hide");
                    if(tagIndex==1){
                        $(".previous_lang").addClass("hide");

                    }
                }

            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceContent=$(".siteTitle"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".siteTitle"+targetLocal).val(sourceContent);

                var sourceContent=$(".siteKeywords"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".siteKeywords"+targetLocal).val(sourceContent);

                var sourceContent=$(".siteDescription"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".siteDescription"+targetLocal).val(sourceContent);
            });
        },

        bindPreferenceEvent:function () {
            var $bootstrapSwitch = $("[name$='active'][type='checkbox']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onSwitchChange: function (e, state) {
                            var _target = e.currentTarget;
                            var $preferenceItem = $(_target).parents("tr:first").children("td:first").text();
                            var msg = "";
                            if (!$(_target).attr("isChanged")) {
                                if (state) {
                                    msg = (window.top.message.setting['preference.open']).replace("{item}",$preferenceItem);
                                } else {
                                    msg = (window.top.message.setting['preference.close']).replace("{item}",$preferenceItem);
                                }
                                window.top.topPage.showConfirmMessage(msg, function (confirm) {
                                    if (confirm) {
                                        $(_target).attr("isChanged", true);
                                        $(_target).bootstrapSwitch("state", !_target.checked);
                                        if (state) {
                                            $("#"+$(_target).attr("hidId")).val("true");
                                        } else {
                                            $("#"+$(_target).attr("hidId")).val("false");
                                        }
                                    }
                                });
                            } else {
                                $(_target).removeAttr("isChanged");
                                return true;
                            }
                            return false;
                        }
                    }
                );

            $("#remind input[type=checkbox]").on("click", function () {
                var paramValue = [];
                var checks = $(this).parent().parent().find("input[type=checkbox]");
                if ($(checks[0]).is(":checked"))
                    paramValue.push("1");
                if ($(checks[1]).is(":checked"))
                    paramValue.push("2");
                $(this).parent().siblings(":last").val(paramValue.join('#'));
            });

            $(".site-switch .dd-list dd").on("mouseover",function(){
                $(this).addClass("shut");
            });

            $(".site-switch .dd-list dd").on("mouseleave",function(){
                $(this).removeClass("shut");
            });
        },

        /**
         * 初始化输入框的文本事件,修改编辑状态
         */
        initEditContentEvent:function(){
            var $this = this;
            $(".titleSource,.contentSource").on("keyup",function(){
                $this.checkForNext();
            })
        },
        checkForNext: function () {
            var checkTitle = true;
            var checkContent = true;
            $(".titleSource").each(function (e) {
                if($(this).val() == ""){
                    checkTitle = false;
                    return;
                }
            });

            $(".contentSource").each(function(){
                if($(this).val() == ""){
                    checkContent = false;
                    return;
                }
            });
            if(checkTitle&&checkContent){
                var oldIdx=Number($(".current").attr("tagIndex"));
                var langSize=Number($("[name='langSize']").val());
                if(oldIdx==langSize){
                    $(".preview").removeClass("hide");
                }
            }else{
                $(".preview").addClass("hide");
            }
        },
        modifyText: function (_target, str, state) {
            var index = $(_target).attr('statusId');
            $("#" + index).text(window.top.message.setting['site_operate.' + str]);
            if (str == "1") {
                $("#" + index).removeClass("co-grayc2");
                $("#" + index).addClass("co-green");
            } else {
                $("#" + index).removeClass("co-green");
                $("#" + index).addClass("co-grayc2");
            }
            var url = $(_target).attr('address');
            window.top.topPage.ajax({
                url: root + url + "&result.status=" + (state ? "1" : "2"),
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        $(_target).attr("isChanged", true);
                        $(_target).bootstrapSwitch("state", !_target.checked);
                    }
                }
            });
        },
        loadArea: function () {
            $("#mainFrame").load(root + window.location.hash.slice(1));
        },
        validEmailInterface: function (e, opt) {
            var opt = {};
            var flag = this.validDataVal($("[name='result.serverAddress']"),false,128,window.top.message.setting_auto['邮件服务器'],opt);
            if(flag){
                flag = this.validDataVal($("[name='result.serverPort']"),false,5,window.top.message.setting_auto['服务器端口'],opt);
                if(flag){
                    flag = this.validDataVal($("[name='result.emailAccount']"),false,64,window.top.message.setting_auto['邮件发送账号'],opt);
                    if(flag){
                        flag = this.validDataVal($("[name='result.accountPassword']"),false,128,window.top.message.setting_auto['账号密码'],opt);
                    }
                }
            }
            if(flag){
                return true;
            }
            return false;
        },
        validSmsInterfaceParam: function (e, opt) {
            var smsSwitch = $("#smsSwitch").val();
            if(smsSwitch!="" && JSON.parse(smsSwitch)){
                return true;
            }else{
                $("#phoneParam").val(false);
                return true;
            }
            return false;
        },
        validDataVal: function (obj, empty, len, title,opt) {
            var val = $(obj).val();
            var e = {};
            e.currentTarget = obj;
            if(!empty){
                if(!val){
                    page.showPopover(e, opt, 'danger', title + window.top.message.setting_auto['不能为空'], true);
                    $(obj).focus();
                    return false;
                }else{
                    if(val.length>len){
                        page.showPopover(e, opt, 'danger', title + window.top.message.setting_auto['长度不能超过'].replace("[0]",len), true);
                        $(obj).focus();
                        return false;
                    }
                }
            }else{
                if(val&&val.length>len){
                    page.showPopover(e, opt, 'danger', title + window.top.message.setting_auto['长度不能超过'].replace("[0]",len), true);
                    $(obj).focus();
                    return false;
                }
            }
            return true;
        },

        validPCCustomerService:function () {
            var opt = {};
            opt.placement = 'bottom';
            var flag = this.validDataVal($("[name='pc.name']"),false,20,window.top.message.setting_auto['名称'],opt);
            if(flag){
                flag = this.validDataVal($("[name='pc.parameter']"),false,450,window.top.message.setting_auto['在线客服参数'],opt);
            }
            return flag;
        },

        validMobileCustomerService:function () {
            var opt = {};
            opt.placement = 'bottom';
            var flag = this.validDataVal($("[name='mobile.name']"),false,20,window.top.message.setting_auto['名称'],opt);
            if(flag){
                flag = this.validDataVal($("[name='mobile.parameter']"),false,450,window.top.message.setting_auto['在线客服参数'],opt);
            }
            return flag;
        },
        isRefresh:function () {
            if($("[name='siteI18ns[0].id']").val()==""){
                window.top.topPage.showPage();
            }
        },
        /*
        * 验证根据层级设置域名
        *
        * */
        validRankByDomain :function (e,opt) {
            _this=this;
            window.top.topPage.ajax({
                url: root + '/siteCustomerService/insertRankByDomain.html',
                dataType: "json",
                data: _this.getRankByDomainForm(e, opt),
                success: function (data) {
                    if (data.state) {
                        //page.showPopover(e,opt,"success",data.msg,true);
                        window.top.topPage.doAjax(e, opt);
                        return true;
                    } else {
                        page.showPopover(e,opt,"danger",data.msg,true);
                        return false;
                    }
                }
            });
        },


        /**
         * 恢复系统默认
         * @param e
         * @param option
         */
        resetPreference: function(e,option) {
            var _this = this;
            window.top.topPage.ajax({
                url:root+'/setting/preference/resetPreference.html',
                success:function(data){
                    page.showPopover(e,{"callback":function () {
                        _this.loadHtml();
                    }},"success",window.top.message.setting['reset.preference.success'],true);
                    //window.top.topPage.showSuccessMessage(window.top.message.setting['reset.preference.success']);

                },
                error:function(data) {
                    page.showPopover(e,{},"danger",window.top.message.setting['reset.preference.fail'],true);
                    //window.top.topPage.showSuccessMessage(window.top.message.setting['reset.preference.fail']);
                }
            });
            $(e.currentTarget).unlock();
        },

        /**
         * 操作成功后，ajax获取页面html refresh
         */
        loadHtml:function() {
            var obj = {};
            obj.currentTarget = $("#li_top_2").find("a")[0];
            this.preferenceIndex(obj)
        },

        /**
         * 回调,重新加载页面
         * @param e
         * @param option
         */
        reload:function(e,option) {
            if(e.returnValue){
                this.loadHtml();
            }

        },
        /**
         * 获取站点信息表单
         * @param e
         * @param opt
         * @returns {*|jQuery}
         */
        getSiteInfoFormData:function(e,opt){
            return $("input,textarea","#siteInfoDiv").serialize();
        },
        getPCFormData:function (e,opt) {
            return $("input,textarea","#pcCustomService").serialize();
        },
        getAppDomainFormData:function (e,opt) {
            return $("input,textarea","#appDownloadDomain").serialize();
        },
        getAccessDomainFormData:function (e,opt) {
            return $("input,textarea","#accessDomain").serialize();
        },
        getMobileFormData:function (e,opt) {
            return $("input,textarea","#mobileCustomService").serialize();
        },
        getValidCodeFormData:function (e, opt) {
            return $("input,textarea","#validCodeDiv").serialize();
        },
        getMobileStaticValidateForm:function (e,opt) {
            return $("input,textarea","#mobileTrafficStatistics").serialize();
        },
        getSaveContactValidateForm:function (e,opt) {
            return $("input,textarea","#saveContact").serialize();
        },
        getRankByDomainForm:function (e,opt) {
            return $("input,textarea","#open-period-div").serialize();
        },
        getSmsInterfaceParamDateForm:function (e,opt) {
            return $("input,textarea","#smsSetting").serialize();
        },
        /**
         * 获取统计代码表单
         * @param e
         * @param opt
         * @returns {{[result.trafficStatistics]: (*|jQuery)}}
         */
        getStaticValidateForm:function (e,opt) {
            return {"result.trafficStatistics":$("[name='result.trafficStatistics']").val()};
        },
        /**
         * 验证统计代码
         * @param event
         * @returns {boolean}
         */
        staticValidateForm:function(event) {
            var paramValue = $("[name='result.trafficStatistics']").val();
            if (paramValue)
                return true;
            else
                return false;
        },

        _validateForm:function(e,option) {
            var paramValue = $("[name='mstSites.mainLanguage']").val();
            if (paramValue)
                return true;
            else
                return false;
        },

        checkOne:function(e,option) {
            var chk = $("[name='result.paramValue']:checked").val();
            if (!chk) {
                window.top.topPage.showWarningMessage(window.top.message.setting['preference.choose.tone']);
                return false;
            } else {
                return true;
            }
        },
        electricPin:function () {
            var _this = this;
            this._super();
            var $bootstrapSwitch1 = $('input[type=checkbox][name=electric_pin]');
            this.unInitSwitch($bootstrapSwitch1).bootstrapSwitch({
                onText: window.top.message.content['floatPic.dislpay.on'],
                offText: window.top.message.content['floatPic.display.off'],
                onSwitchChange: function (e, state) {
                    var $this = $(this);
                    var _msg = "";
                    if (state) {
                        _msg = window.top.message.setting['confirm.open'];
                    } else {
                        _msg =  window.top.message.setting['confirm.close'];
                    }
                    $this.bootstrapSwitch('indeterminate', true);
                    var _target = e.currentTarget;//showConfirmMessage
                    window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                        if (confirm) {
                            //_this._changeDisplayState(event, event.currentTarget, confirm, id, status);
                            window.top.topPage.ajax({
                                url: root + '/param/telemarketing.html',
                                dataType: "json",
                                data: {"result.paramValue": state},
                                success: function (data) {
                                    if (data) {
                                        $(_target).attr("isChanged", true);
                                        $("#status").removeClass("label-success");
                                        $("#status").addClass("label-danger");
                                        page.showPopover({"currentTarget": $("#pcenter-msg-tips")}, {}, "success", "操作成功", true);
                                    } else {
                                        page.showPopover({"currentTarget": $("#pcenter-msg-tips")}, {}, "danger", "操作失败", true);
                                    }
                                }
                            });
                            $this.bootstrapSwitch('indeterminate', false);
                        } else {
                            $this.bootstrapSwitch('indeterminate', false);
                            $this.bootstrapSwitch('state', !state, true);
                        }
                    })

                }
            });
        },
        /**
         * 电销号码加密
         */
        encryptionSwitch:function () {
            var _this = this;
            this._super();
            var $bootstrapSwitchs = $('input[type=checkbox][name=encryption_switch]');
            this.unInitSwitch($bootstrapSwitchs).bootstrapSwitch({
                onText: window.top.message.content['floatPic.dislpay.on'],
                offText: window.top.message.content['floatPic.display.off'],
                onSwitchChange: function (e, state) {
                    var $this = $(this);
                    var _msg = "";
                    if (state) {
                        _msg = window.top.message.setting['confirm.open'];
                    } else {
                        _msg =  window.top.message.setting['confirm.close'];
                    }
                    $this.bootstrapSwitch('indeterminate', true);
                    var _target = e.currentTarget;//showConfirmMessage
                    window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                        if (confirm) {
                            //_this._changeDisplayState(event, event.currentTarget, confirm, id, status);
                            window.top.topPage.ajax({
                                url: root + '/param/encryptionSwitch.html',
                                dataType: "json",
                                data: {"result.paramValue": state},
                                success: function (data) {
                                    if (data) {
                                        $(_target).attr("isChanged", true);
                                        $("#status").removeClass("label-success");
                                        $("#status").addClass("label-danger");
                                        page.showPopover({"currentTarget": $("#pcenter-msg-tips")}, {}, "success", "操作成功", true);
                                    } else {
                                        page.showPopover({"currentTarget": $("#pcenter-msg-tips")}, {}, "danger", "操作失败", true);
                                    }
                                }
                            });
                            $this.bootstrapSwitch('indeterminate', false);
                        } else {
                            $this.bootstrapSwitch('indeterminate', false);
                            $this.bootstrapSwitch('state', !state, true);
                        }
                    })

                }
            });
        },

        /*
        * 是否需要登录后显示二维码的控制开关
        *
        * */
        qrSwitch:function () {
            var _this = this;
            this._super();
            var $bootstrapSwitch = $('input[type=checkbox][name=active]');
            this.unInitSwitch($bootstrapSwitch).bootstrapSwitch({
                onText: window.top.message.content['floatPic.dislpay.on'],
                offText: window.top.message.content['floatPic.display.off'],
                onSwitchChange: function (e, state) {
                    var $this = $(this);
                    var _msg = "";
                    if (state) {
                        _msg = window.top.message.setting['confirm.open'];
                    } else {
                        _msg =  window.top.message.setting['confirm.close'];
                    }
                    $this.bootstrapSwitch('indeterminate', true);
                    var _target = e.currentTarget;//showConfirmMessage
                    window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                        if (confirm) {
                            //_this._changeDisplayState(event, event.currentTarget, confirm, id, status);
                            window.top.topPage.ajax({
                                url: root + '/param/updateQrSwitch.html',
                                dataType: "json",
                                data: {"result.paramValue": state},
                                success: function (data) {
                                    if (data) {
                                        $(_target).attr("isChanged", true);
                                        $("#status").removeClass("label-success");
                                        $("#status").addClass("label-danger");
                                        page.showPopover({"currentTarget": $("#pcenter-msg-tips")}, {}, "success", "操作成功", true);
                                    } else {
                                        page.showPopover({"currentTarget": $("#pcenter-msg-tips")}, {}, "danger", "操作失败", true);
                                    }
                                }
                            });
                            $this.bootstrapSwitch('indeterminate', false);
                        } else {
                            $this.bootstrapSwitch('indeterminate', false);
                            $this.bootstrapSwitch('state', !state, true);
                        }
                    })

                }
            });
        },
        copyAppDomain:function (e, opt) {
            var tr = $("#app-domain-template").find("tr:eq(0)").clone();
            var trlen = $("#app-domain-table").find("tr:gt(0)").length;
            $(tr).find("input").each(function (idx, input) {
                var name = $(input).attr("name");
                name = name.replace("{n}",trlen);
                $(input).attr("name",name);
            });
            $("#app-domain-table").append(tr);
            $(e.currentTarget).unlock();

        },
        deleteAppDomain:function (e, opt) {
            var _this = this;
            var table = $($(e.currentTarget).parent().parent().parent());
            $($(e.currentTarget).parent().parent()).remove();
            var trLen = $(table).find("tr:gt(0)").length;
            var tableId = $(table.parent()).attr("id");
            $(table).find("tr:gt(0)").each(function (idx, trItem) {
                $(trItem).find("td").each(function (ix, td) {
                    if($(td).find("input").length>0){
                        $(td).find("input").each(function (txtIdx, txt) {
                            var name = $(txt).attr("name");
                            var p = /\[.*?\]/g;
                            name = name.replace(p,"["+idx+"]");
                            $(txt).attr("name",name);
                        })
                    }

                });
            });
            $(e.currentTarget).unlock();
        },









        /*
        * 验证联系方式
        *
        * */
        validationSettings:function (e) {
            var regPhone = new RegExp("^[0-9]{7,20}$");//验证电话号码
            var regQp = new RegExp("^[0-9]{5,20}$");//验证qq号码
            var regEmailSkyep = new RegExp("^.{0,30}$");//验证邮箱和Skyep
            var reg = new RegExp("^.{0,200}$");//验证版权信息

            var qq=document.getElementById("qqId").value;
            var phoneNumber=document.getElementById("phoneId").value;
            var Email=document.getElementById("emailId").value;
            var Skyep=document.getElementById("skyepId").value;
            var Copyright=document.getElementById("copyrightId").value.length;

            if (phoneNumber!=""&&!regPhone.test(phoneNumber)){
                e.page.showPopover(e,{},"warning","电话号码不合法,请输入7-20位纯数字",true);
                return false;
            }else if(qq!=""&&!regQp.test(qq)){
                e.page.showPopover(e,{},"warning","QQ号码不合法，请输入5-20位纯数字",true);
                return false;
            }else if(!regEmailSkyep.test(Email)){
                e.page.showPopover(e,{},"warning","邮箱不合法，请输入长度小于30个字符",true);
                return false;
            }else if(!regEmailSkyep.test(Skyep)){
                e.page.showPopover(e,{},"warning","Skyep账号不合法，请输入长度小于30个字符",true);
                return false;
            }else if(Copyright>200){
                e.page.showPopover(e,{},"warning","版权信息不合法，请输入长度小于200个字符",true);
                return false;
            }else {
                e.page.showPopover(e,{},"success","保存成功",true);
                return true;
            }
        },
        myCallBack : function (e,opt) {
            alert(opt.data.state);
        },
        getFormData:function(e,o){
            var data = new FormData();
            jQuery.each(jQuery('input[type=file]'), function(i, file) {
                data.append(file.name, file.files[0]);
            });
            return data;
        }


    });
});