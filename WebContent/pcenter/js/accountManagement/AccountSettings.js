/**
 * Created by eagle on 15-10-29.
 */

define(['common/BaseEditPage','common/PasswordLevel','mailAutoComplete','css!regionCss/regions.css'], function(BaseEditPage,PasswordLevel,MailAutoComplete) {

    return BaseEditPage.extend({
        passwordLevel:null,
        select:null,
        delayTime:100,
        timer:'',

        init: function (title) {
            this._super();

            //国际电话区号
            $(".guj-select p").click(function() {
                var ul = $(this).next("ul");
                if (ul.css("display") == "none") {
                    ul.slideDown("fast");
                    return false;
                } else {
                    ul.slideUp("fast");
                }
            });


            $(".guj-select ul li a").click(function() {
                var txt = $(this).text();
                var value = $(this).attr("rel");
                //$(this).parentsUntil(".guj-select").children("p").html("<span class='flag " + value + "'></span>" + txt);
                $(this).parent().parent().parent().children("p").html("<span class=flag-phone><span id=region_"+value+" "+"class=bank-img-block></span></span>"+txt);
                $(".guj-select ul").hide();
                $("[name='phoneCode']").val($(this).attr("data-code"));
            });

            $("#phone").click(function(e){
                //if($(e.target).is(".guj-select p")) {return false;}
                var ul = $("#phone").find("ul");
                if(ul.css("display")=="block") {
                    ul.slideUp("fast");
                }
            });
            //国际电话区号
        },

        onPageLoad: function (e,option) {
            this._super();
            //玩家首页-左侧-个人信息-点击图标
            var isSign = $("[name=isSign]").val();
            var typeName = $("[name=typeName]").val();
            if(isSign=="true"){
                //银行卡
                if(typeName=="bankInfo"){
                    $("#bankInfo .set").attr("style","display: none;");
                    $("#bankInfo .shrink").attr("style","display: inline;");
                    $("#bankInfo .bottomline").attr("style","display: table-row;");
                }
                //email
                if(typeName=="email"){
                    $("#email .set").attr("style","display: none;");
                    $("#email .shrink").attr("style","display: inline;");
                    $("#email .bottomline").attr("style","display: table-row;");
                }
                //手机
                if(typeName=="phone"){
                    $("#phone .set").attr("style","display: none;");
                    $("#phone .shrink").attr("style","display: inline;");
                    $("#phone .bottomline").attr("style","display: table-row;");
                }
            }
            //安全密码
            if(typeName=="SecurityPwd"){
                $("#SecurityPwd .set").attr("style","display: none;");
                $("#SecurityPwd .shrink").attr("style","display: inline;");
                $("#SecurityPwd .bottomline").attr("style","display: table-row;");
            }

            if(_type==true) {
                $("#lgoin").css("display","");
                $("#set").hide();
                $("#shrink").show();
            }
            this.passwordLevel = new PasswordLevel();
            this._hour();
            this.initPhoneCaptcha();
            this.initEmailCaptcha();
            $(".inputMailList").mailAutoComplete();

            $("#mainFrame").on("click",".pInfo", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/personInfo/index.html']", window.top.document);
                $current.parent().addClass("select");
                $("#mainFrame").load(root + "/personalInfo/toUploadHeadPortrait.html");
            });
        },

        bindEvent: function () {
            this._super();
            var _this = this;

            //银行卡四位分割
            $("[name='bankcardNumber2']").on("keyup",function(){
                $("[name='bankcardNumber2']").val($("[name='bankcardNumber2']").val().replace(/\D/g,'').replace(/....(?!$)/g,'$& '));
                $("[name='bankcardNumber']").val(_this._trim($("[name='bankcardNumber2']").val(),"g"));
                $("[name='bankcardNumber']").valid();
            });

            //更换银行样式
            $('[name=addBankForm]').on("click", "label.bank", function (e) {
                $(_this.formSelector + " label.bank").removeClass("select");
                $(e.currentTarget).addClass("select");
            });

        },

        /**
         * 绑定多个表单验证
         */
        bindFormValidation: function () {

            var _this = this;
            $("form").each(function(index,item){
                var $form = $(item);
                var rule = _this.getValidateRule($form);
                if (rule) {
                    if($.data($form[0], "validator")) {
                        $.data($form[0], "validator", null);
                    }
                    $form.validate(rule);
                }
            })
        },

        /**
         * 设置和收起
         * @param e
         * @param option
         * @constructor
         */
        SetAndHide:function(e,option) {
            var $btn = $(e.currentTarget);
            if($btn.children(".set").is(":visible")) {
                $('.bottomline').hide();
                if($(".shrink").is(":visible")) {
                    $(".shrink").hide();
                    $(".set").show();
                }
                $btn.children(".set").hide();
                $btn.children(".shrink").show();
                $btn.parents('tr').next().show(100);
            } else {
                $btn.children(".set").show();
                $btn.children(".shrink").hide();
                $btn.parents('tr').next().hide(100);
            }

            $btn.unlock();
        },

        //登录密码
        updatePwd:function(e) {
            $("#modifypassword").hide();
            $("#updatePassword").show();
            $(e.currentTarget).unlock();
        },

        updatePwdPre:function(e) {
            $("#modifypassword").show();
            $("#updatePassword").hide();
            $(e.currentTarget).unlock();
        },

        //安全密码
        modifySecurityPwd:function(e) {
            $("#modifySecurityPwd").hide();
            $("#updateSecurityPwd").show();
            $(e.currentTarget).unlock();
        },

        //修改安全密码上一步
        modifySecurityPwdPre:function(e) {
            $("#modifySecurityPwd").show();
            $("#updateSecurityPwd").hide();
            $(e.currentTarget).unlock();
        },

        /**
         *  跳转到邮箱修改页面
         * @param e
         */
        changeEmailPage:function(e) {
            $("#email #validateRule").remove();
            var url = root+'/accountSettings/toUpdateEmail.html';
            var data = window.top.topPage.getCurrentFormData(e);
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                data:data,
                url: url,
                success: function(data) {
                    $("#toUpdateEmail").html(data);
                    _this.bindFormValidation();
                    //联系客服
                    _this.openCustomerService();
                    $(".inputMailList").mailAutoComplete();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        cancelUpdateEmail:function(e) {
            $("#email #validateRule").remove();
            var url = root+'/accountSettings/cancelUpdateEmail.html';
            window.top.topPage.ajax({
                type: "POST",
                url: url,
                success: function(data) {
                    $("#toUpdateEmail").html(data);
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },


        changePhone:function(e) {
            $("#phone #validateRule").remove();
            var url = root+'/accountSettings/toUpdatePhone.html';
            var data = window.top.topPage.getCurrentFormData(e);
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                data:data,
                url: url,
                success: function(data) {
                    $("#toUpdatePhone").html(data);
                    _this.bindFormValidation();
                    _this.init();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        clearPhone:function(e) {
            $("#phone #validateRule").remove();
            var url = root+'/accountSettings/toClearPhone.html';
            var data = window.top.topPage.getCurrentFormData(e);
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                data:data,
                url: url,
                success: function(data) {
                    $("#toUpdatePhone").html(data);
                    _this.bindFormValidation();
                    _this.init();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        toSecurityPwd:function(e) {
            var dataRel = eval('('+$(e.currentTarget).attr("data-rel")+')');
            var type = dataRel.contactWayType;
            var isSet = dataRel.isSet;
            var _this = this;
            var url = root+'/accountSettings/toSecurityPwd.html';
            window.top.topPage.ajax({
                type: "POST",
                data:{"contactWayType":type,"isSet":isSet},
                url: url,
                success: function(data) {
                    if(type=='phone') {
                        $("#toUpdatePhone").html(data);
                    } else {
                        $("#toUpdateEmail").html(data);
                    }
                    _this.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        toConfirmAnswers:function(e) {
            var dataRel = eval('('+$(e.currentTarget).attr("data-rel")+')');
            var type = dataRel.contactWayType;
            var isSet = dataRel.isSet;
            var _this = this;
            var url = root+'/accountSettings/toConfirmAnswers.html';
            window.top.topPage.ajax({
                type: "POST",
                data:{"contactWayType":type,"isSet":isSet},
                url: url,
                success: function(data) {
                    if(type=='phone') {
                        $("#toUpdatePhone").html(data);
                    } else {
                        $("#toUpdateEmail").html(data);
                    }
                    _this.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 邮箱验证下一步
         * @param e
         */
        updateEmailNext:function(e) {

            var emailCode = $("#verificationCode").val();
            var email = $("#emailCode").val();
            var _this = this;
            window.top.topPage.ajax({
                type: "GET",
                url: root+'/accountSettings/updateEmailCodeNext.html',
                data:{"emailCode":emailCode,"email":email},
                success: function(data) {
                    var datas = eval('('+data+')');
                    if(!datas.state) {
                        window.top.topPage.showWarningMessage(datas.msg);
                        return;
                    } else {
                        window.top.topPage.ajax({
                            type: "post",
                            url: root+'/accountSettings/toUpdateEmailCode.html',
                            success: function(data) {
                                $("#toUpdateEmail").html(data);
                                _this.bindFormValidation();
                                //邮箱下拉
                                $(".inputMailList").mailAutoComplete();
                                clearTimeout(_this.timer);
                                _this.delayTime = 100;
                            },
                            error: function(data) {
                                $(e.currentTarget).unlock();
                            }
                        });
                    }
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 安全问题答案确认
         * @param e
         */
        confirmQuestions:function(e) {

            $("#safeQuestion #validateRule").remove();
            var url = root+'/accountSettings/confirmQuestions.html';
            var data = window.top.topPage.getCurrentFormData(e);
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                data:data,
                url: url,
                success: function(data) {
                    $("#question").html(data);
                    _this.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 修改密保
         */
        modifySecretSecurity:function(e) {

            var url = root+'/accountSettings/showconfirmQuestions.html';
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                url: url,
                success: function(data) {
                    $("#question").html(data);
                    _this.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 回调刷新账号设置页面
         * @param e
         * @param options
         */
        mySaveCallBack:function(e,options){
            if(options.data.state) {
                var url = root+'/accountSettings/list.html';
                window.top.topPage.ajax({
                    type: "POST",
                    url: url,
                    success: function(data) {
                        $("#mainFrame").html(data);
                        $(e.currentTarget).unlock();
                    },
                    error: function(data) {
                        $(e.currentTarget).unlock();
                    }
                });
                this.refreshInfo();
            } else {
                var currentForm = window.top.topPage.getCurrentForm(e);
                if ($(currentForm).find("[name='token']") && $(currentForm).find("[name='token']").length > 0) {
                    $("[name='token']").val(options.data.token);
                }
            }
        },

        //刷新玩家左上角信息
        refreshInfo:function() {
            window.top.topPage.ajax({
                type: "GET",
                url: "index/content.html",
                success: function (data) {
                    $("#page-content").html(data);
                }
            });
        },

        /**
         * 安全问题选择
         * @param e
         */
        showQuestions2:function(e) {

            var url = root+'/accountSettings/confirmAnswer.html';
            var data = window.top.topPage.getCurrentFormData(e);
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                url: url,
                data:data,
                success: function(data) {
                    var datas = eval('(' + data + ')');
                    if(!datas.state) {
                        window.top.topPage.showErrorMessage(datas.msg);
                        if(datas.errorTimes>6) {
                            $(e.currentTarget).addClass("disable-gray ui-button-disable");
                        }else{
                            $(e.currentTarget).unlock();
                        }
                    } else {
                        _this.showQuestions(e);
                        $(e.currentTarget).unlock();
                    }
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 安全问题选择
         * @param e
         */
        showQuestions:function(e) {
            var url = root+'/accountSettings/showQuestions.html';
            var _this = this;
            window.top.topPage.ajax({
                type: "POST",
                url: url,
                success: function(data) {
                    $("#question").html(data);
                    _this.bindFormValidation();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

        /**
         * 跳转到修改页面
         * @param e
         */
        updateBankInfo:function(e,opt) {
            var _this = this;
            opt.url=root+'/accountSettings/updateBankInfo.html';
            opt.dataType="text";
            opt.callback=function(e,opt) {
                $("#updateBankInfo").html(opt.data);
                _this.bindEvent();
            }
            window.top.topPage.doAjax(e,opt);
            /*var url = root+'/accountSettings/updateBankInfo.html';
            var _this = this;
            window.top.topPage.doAjax({
                type: "get",
                url: url,
                success: function(data) {
                    $("#updateBankInfo").html(data);
                    //_this.bindFormValidation();
                    _this.bindEvent();
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });*/
        },

        /**
         * 清楚所有空格
         * @param str
         * @param is_global
         * @returns {*|string|XML|void}
         */
        _trim:function(str,is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g") {
                result = result.replace(/\s/g,"");
            }
            return result;
        },

        /**
         * 问候语显示
         * @private
         */
        _hour: function () {
            var _hours = new Date().getHours();
            if(_hours>=0&&_hours<6) {
                $("#_hourss").text(window.top.message.accountManagement_auto['凌晨好']);
            } else if(_hours>=6&&_hours<12) {
                $("#_hourss").text(window.top.message.accountManagement_auto['上午好']);
            } else if(_hours==12) {
                $("#_hourss").text(window.top.message.accountManagement_auto['中午好']);
            } else if(_hours>12&&_hours<18) {
                $("#_hourss").text(window.top.message.accountManagement_auto['下午好']);
            } else {
                $("#_hourss").text(window.top.message.accountManagement_auto['晚上好']);
            }
        },

        initPhoneCaptcha: function () {
            var _this = this;
            var url = null;
            $("#phone").on("click", "[reloadable]", function (e) {
                //lock
                var isLocked = $(e.currentTarget).isLocked();
                if (isLocked) {
                    return;
                }
                if (!url) {
                    url = e.currentTarget.src;
                }
                e.currentTarget.src = url + '?t=' + Math.random();
                $(e.currentTarget).prev().val("");
            });
        },

        initEmailCaptcha: function () {
            var _this = this;
            var url = null;
            $("#email").on("click", "[reloadable]", function (e) {
                //lock
                var isLocked = $(e.currentTarget).isLocked();
                if (isLocked) {
                    return;
                }
                if (!url) {
                    url = e.currentTarget.src;
                }
                e.currentTarget.src = url + '?t=' + Math.random();
                $(e.currentTarget).prev().val("");
            });
        },

        /**
         * 倒计时
         * @param that
         * @param e
         */
        countDown:function(that,e) {
            that.delayTime--;
            $(e.currentTarget).text(that.delayTime+window.top.message.accountManagement_auto['秒后重新获取']);
            if(that.delayTime==1) {
                that.timer='';
                that.delayTime = 100;
                $(e.currentTarget).text(window.top.message.accountManagement_auto['免费获取验证码']);
                $(e.currentTarget).removeClass("disable-gray");
                $(e.currentTarget).unlock();
            } else {
                that.timer = setTimeout(function() {
                    that.countDown(that,e);
                },1000);
            }
        },

        /**
         * 邮箱验证码
         */
        sendmCode:function(e) {

            var _this = this;
            var email = $("#emailCode").val();
            window.top.topPage.ajax({
                type:"POST",
                dataType:"json",
                url:root+'/accountSettings/getVerificationCode.html',
                data:{"email":email,"t":Math.random()},
                loading:true,
                success: function (data) {
                    if(!data.state) {
                        window.top.topPage.showWarningMessage(data.emailMsg);
                        $(e.currentTarget).unlock();
                        return;
                    }
                    $(e.currentTarget).text(window.top.message.accountManagement_auto['100秒后重新获取']);
                    $(e.currentTarget).addClass("disable-gray");
                    setTimeout(function() {
                        _this.countDown(_this,e);
                    },1000);
                    //$(e.currentTarget).unlock();
                },

               error:function(data){
                   $(e.currentTarget).unlock();
               }
            });
        },

        /**
         * reset
         */
        clearBankInput:function(e) {
            $("[name='bankcardNumber2']").val("");
            $("[name='bankcardNumber']").val("");
            $("[name='bankName']").val("");
            $("#bankInfo .select-arr").html('<span class="pay-bank"></span>');
            $("[name='bankDeposit']").val("");
            $("#updateBankInfo").find(".successsmall").remove();
            $("#updateBankInfo").find(".tips").remove();
            $("#updateBankInfo").find(".error").removeClass("error");
            $(e.currentTarget).unlock();

        },

        setSecurityPwd:function(e) {
            $("#bankInfo .bottomline").hide();
            $("#bankInfo .set").show();
            $("#bankInfo .shrink").hide();
            $("#SecurityPwd .set").hide();
            $("#SecurityPwd .shrink").show();
            $("#SecurityPwd .bottomline").show();
            $(e.currentTarget).unlock();
        },

        /**
         * 客户服务
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            window.top.topPage.customerService(e, option);
        },

        openCustomerService:function() {
            var _this = this;
            $('[name="customerService"]').click(function(e) {
                var url = $(e.currentTarget).attr("url");
                var option = {};
                option.url = url;
                _this.customerService(e,option);
            });
        },

        /**
         * 展示/收起部分银行
         * @param e
         * @param option
         */
        showMoreBank: function (e, option) {
            $("div[name=hideBank]").toggle();
            $(e.currentTarget).parent().parent().children().show();
            $(e.currentTarget).parent().hide();
            $(e.currentTarget).unlock();
        }
    });
});