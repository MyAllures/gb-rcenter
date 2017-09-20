/**
 * Created by bruce on 16-6-19.
 */
define(['site/personInfo/BasePersonInfo'], function(BasePersonInfo) {

    return BasePersonInfo.extend({

        init: function () {
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
                $(this).parent().parent().parent().children("p").html("<span class=flag-phone><span id=region_"+value+" "+"class=bank-img-block></span></span>"+txt);
                $(".guj-select ul").hide();
                $("[name='phoneCode']").val($(this).attr("data-code"));
            });

            $("#editForm").click(function(e){
                var ul = $("#editForm").find(".guj-select ul");
                if(ul.css("display")=="block") {
                    ul.slideUp("fast");
                }
            });
            //国际电话区号
        },

        onPageLoad: function (e,option) {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },
        
        /**
         * 邮箱验证下一步
         * @param e
         */
        updatePhoneNext:function(e) {
            var verificationCode = $("#phoneVerificationCode").val();
            var phone = $("#phoneCode").val();
            var _this = this;
            window.top.topPage.ajax({
                type: "GET",
                url: root+'/personInfo/updatePhoneCodeNext.html',
                data:{"code":verificationCode,"phone":phone},
                success: function(data) {
                    var datas = eval('('+data+')');
                    if(!datas.state) {
                        window.top.topPage.showWarningMessage(datas.msg);
                        return;
                    } else {
                        window.top.topPage.ajax({
                            type: "post",
                            url: root+'/personInfo/toBindPhone2.html',
                            success: function(data) {
                                $("#editForm").html(data);
                                _this.bindFormValidation();
                                _this.init();
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
         * 回调刷新账号设置页面
         * 此处回调如果碰上需要弹窗安全密码框(页面加载可能会空白)可以使用$(".sidebar-nav a[data='/personInfo/index.html']"，window.top.document).click();
         * @param e
         * @param options
         */
        mySaveCallBack:function(e,options){
            var _this = this;
            _this.closePage();
            var url = root+'/personInfo/index.html';
            window.top.topPage.ajax({
                type: "POST",
                url: url,
                success: function(data) {
                    $("#mainFrame",window.top.document).html(data);
                    $(e.currentTarget).unlock();
                },
                error: function(data) {
                    $(e.currentTarget).unlock();
                }
            });
        },

    });
});