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
            var li = $(".sys_tab_wrap").find("li");
            var id;
            if (li.length > 0) {
                var liClass = $(".sys_tab_wrap").find(".active");
                //var id = $($(".sys_tab_wrap").find("li")[0]).attr("id");
                if (liClass.length == 0) {
                    id = $($(".sys_tab_wrap").find("li")[0]).attr("id");
                } else {
                    id = $(liClass).attr("id");
                }
                var obj = {};
                obj.currentTarget = $($(".sys_tab_wrap").find("li")[0]).find("a")[0];
                if (id == "li_top_1") {
                    this.basicSettingIndex(obj);
                } else if (id == "li_top_2") {
                    this.preferenceIndex(obj);
                } else if (id == "li_top_3") {
                    this.playerImportIndex(obj);
                }
            }
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
        playerImportIndex:function (e,opt) {
            var _this = this;
            $(".sys_tab_wrap").find("li").removeClass("active");
            $("#li_top_3").addClass("active");
            window.top.topPage.ajax({
                url: root + "/vUserPlayerImport/list.html",
                success: function (data) {
                    $("#content-div").html(data);
                    $("#siteParam").attr("action", root + "/vUserPlayerImport/list.html");
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
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {

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
                var yzmValue = obj.attr("tt");
                $("#yzm").attr("src",src);
                $("#yzmValue").val(yzmValue);
            })
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
        validSmsInterface: function (e, opt) {
            var opt = {};
            var flag = this.validDataVal($("[name='sms.fullName']"),false,64,window.top.message.setting_auto['接口名称'],opt);
            if(flag){
                flag = this.validDataVal($("[name='sms.extJson']"),false,500,window.top.message.setting_auto['请求扩展参数'],opt);
                if(flag){
                    flag = this.validDataVal($("[name='sms.username']"),false,20,window.top.message.setting_auto['接口用户名'],opt);
                    if(flag){
                        flag = this.validDataVal($("[name='sms.password']"),false,20,window.top.message.setting_auto['接口密码'],opt);
                        if(flag){
                            flag = this.validDataVal($("[name='sms.dataKey']"),true,64,window.top.message.setting_auto['接口密钥长度'],opt);
                        }
                    }
                }
            }
            if(flag){
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
        //导入玩家的JS
        showImportList: function (e,opt) {
            $("#introduce-div").removeClass("hide");
            $("#process-div").addClass("hide");
            $(".import_list").removeClass("btn-outline");

            $(".import_introduce").addClass("btn-outline");
            $(".btn_list").removeClass("btn-outline");
            $(".btn_introduce").addClass("btn-outline");
            $(e.currentTarget).unlock();
        },
        showImportIntroduce : function (e,opt) {
            $("#process-div").removeClass("hide");
            $("#introduce-div").addClass("hide");
            $(".btn_introduce").removeClass("btn-outline");
            $(".import_introduce").removeClass("hide");

            $(".btn_list").addClass("btn-outline");
            $(e.currentTarget).unlock();
        },
        toImportPlayer:function (e,opt) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/userPlayerImport/playerImport.html",
                success: function (data) {
                    $("#content-div").html(data);
                    _this.bindFormValidation();
                    $("#playerFilename").change(function () {
                        _this.showFileMsg();
                    });
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
        uploadFile: function (e, opt) {
            e.objId = 1;//$("#siteGameId").val();
            e.catePath = 'ImportPlayer';
            return this.uploadAllFiles(e, opt);
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
        },
        saveImport: function (e,opt) {
            $("#importForm").submit();
            $(e.currentTarget).unlock();
        },
        doAjax:function(e,btnOption)
        {
            var _this=this;
            var option={
                cache: false,
                eventTarget: {currentTarget:e.currentTarget},
                url:  window.top.root+"/userPlayerImport/saveImport.html",
                timeout: 300000,
                beforeSend: function () {
                    $(".save-import").attr("disabled",true);
                },
                error: function(request, state, msg) {
                    $(e.currentTarget).unlock();
                    var message = msg;
                    if(request.responseJSON && request.responseJSON.message){
                        message = request.responseJSON.message;
                    }
                    if (request.status != 601) {
                        window.top.topPage.showErrorMessage(message);
                    }
                    $(e.currentTarget).unlock();
                    $(".save-import").attr("disabled",false);
                },
                success: function(data) {
                    $("#content-div").html(data);
                    //$("#formDiv").hide();
                    //$("#importForm").append(data);
                    $(e.currentTarget).unlock();
                    $(".save-import").attr("disabled",false);
                }
            };
            option.type="POST";
            option.contentType=false;
            option.processData=false;
            option.data=_this.getFormData(e,option);
            option.eventTarget={currentTarget: e.currentTarget};
            option.eventCall=function(e){
                window.top.topPage.ajax(option);
            };
            window.top.topPage.ajax(option);
        },
        showFileMsg: function () {
            $("#file-div").removeClass("hide");
            var f = document.getElementById("playerFilename").files;
            //上次修改时间
            //alert(f[0].lastModifiedDate);
            //名称
            $("#filename-span").html(f[0].name);
            //大小 字节
            $("#filesize-span").html(this.bytesToSize(f[0].size));
            //类型
            //alert(f[0].type);
        },
        bytesToSize: function (bytes) {
            if (bytes === 0) return '0 B';
            var k = 1000;
            sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            i = Math.floor(Math.log(bytes) / Math.log(k));
            var size = (bytes / Math.pow(k, i));//toFixed
            size = size.toFixed(1);
            return  size + " " + sizes[i];
            //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        myValidateForm: function (e,opt) {
            var f = document.getElementById("playerFilename").files;
            if(f&&f[0]&&f[0].size&&f[0].size>10240000){
                var obj = {};
                obj.currentTarget = $("#playerFilename");
                page.showPopover(obj, {}, "warning", window.top.message.setting_auto['仅支持'], true);
                $(e.currentTarget).unlock();
                return false;
            }
            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        }

    });
});