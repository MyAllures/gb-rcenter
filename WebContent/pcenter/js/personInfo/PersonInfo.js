/**
 * Created by eagle on 15-10-29.
 */

define(['site/personInfo/BasePersonInfo'/*,'css!regionCss/regions.css'*/], function(BasePersonInfo) {

    return BasePersonInfo.extend({
        select:null,

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
                $(this).parent().parent().parent().children("p").html("<span class=flag-phone><span id=region_"+value+" "+"class=bank-img-block></span></span>"+txt);
                $(".guj-select ul").hide();
                $("[name='phoneCode']").val($(this).attr("data-code"));
            });

            $("#personInfo").click(function(e){
                var ul = $("#personInfo").find(".guj-select ul");
                if(ul.css("display")=="block") {
                    ul.slideUp("fast");
                }
            });
            //国际电话区号
        },

        onPageLoad: function (e,option) {
            this._super();
            this._hour();

             $("#submitInfo").find("a").addClass("disable-gray ui-button-disable");
             $("#mainFrame").on("change",".field-input",function() {
                $(".field-input").each(function(index,item){
                    var tempItem = $(item)[0];
                    var val = '';
                    if (tempItem.tagName == 'SELECT') {
                        val = tempItem.value;
                    } else {
                        if (tempItem.type == 'radio') {
                            val = tempItem.checked;
                        } else {
                            val = tempItem.value;
                        }
                    }
                    if (val) {
                        $("#submitInfo").find("a").removeClass("disable-gray ui-button-disable");
                        return false;
                    } else {
                        $("#submitInfo").find("a").addClass("disable-gray ui-button-disable");
                    }
                })
             });

            /*if (!$("[name='phone.contactValue']").val()) {
                $(".phoneVerificationCode").addClass("disable-gray ui-button-disable");
            }
            $("[name='phone.contactValue']").change(function (e) {
                if (!$(e.currentTarget).val() || $(e.currentTarget).hasClass("error")) {
                    $(".phoneVerificationCode").addClass("disable-gray ui-button-disable");
                } else {
                    $(".phoneVerificationCode").removeClass("disable-gray ui-button-disable");
                }
            })*/
            
        },

        bindEvent: function () {
            this._super();
        },

        /**
         * 根据日期获取星座
         * @param e
         */
        chooseConstellation: function (e) {
            var $constellation = $('[name="result.constellation"]');
            if ($constellation.next() && ($constellation.next().hasClass('mark successsmall') ||
                $constellation.next().hasClass('tips orange'))) {
                $constellation.next().remove();
            }
            var v = e.currentTarget.value.toString();
            if (v) {
                $("#submitInfo").find("a").removeClass("disable-gray ui-button-disable");
            }
            var month = v.substring(v.indexOf('-') + 1, v.lastIndexOf('-'));
            var day = v.substring(v.lastIndexOf('-') + 1);
            var constell = this._getAstro(month, day);
            $constellation.val(constell);
        },

        /**
         * 根据month和day获取星座code
         * @param month
         * @param day
         * @returns {*}
         * @private
         */
        _getAstro: function (month, day) {
            var code = month - (day < "102223444433".charAt(month - 1) - -19);
            switch(code) {
                case 0:
                case 12:
                    return 'capricorn';
                case 1:
                    return 'aquarius';
                case 2:
                    return 'pisces';
                case 3:
                    return 'aries';
                case 4:
                    return 'taurus';
                case 5:
                    return 'gemini';
                case 6:
                    return 'cancer';
                case 7:
                    return 'leo';
                case 8:
                    return 'virgo';
                case 9:
                    return 'libra';
                case 10:
                    return 'scorpio';
                case 11:
                    return 'sagittarius';
            }
        },

        /**
         * 绑定多个表单验证
         */
        /*bindFormValidation: function () {

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
        },*/

        /**
         * 个人资料
         * @param e
         */
        updatePerson:function(e,option) {
            $("#submitInfo").find("a").addClass("disable-gray ui-button-disable");
            var _msgTitle="<h3 class='al-center'>"+window.top.message.personInfo_auto['确认提交吗']+"</h3><div class='al-center'>"+window.top.message.personInfo_auto['提交后不能自行修改只能联系客服修改']+"</div>";
            window.top.topPage.showConfirmDynamic(window.top.message.personInfo_auto['消息'],_msgTitle,window.top.message.personInfo_auto['提交'],window.top.message.personInfo_auto['返回修改'],function (confirm) {
                if (confirm) {
                    window.top.topPage.ajax({
                        url: root+"/personInfo/updatePersonInfo.html",
                        dataType: 'json',
                        cache: false,
                        type: "post",
                        data: $("#personInfo").serialize(),
                        success: function (data) {
                                /*window.top.topPage.showSuccessMessage(data.msg,function(){
                                    window.location.hash = "#/personalInfo/view.html";
                                    location.reload();
                                });*/
                            if (data.state) {
                                option.callback = 'mySaveCallBack';
                                page.showPopover(e, option, 'success', data.msg, true);
                            } else {
                                page.showPopover(e, option, 'danger', data.msg, true);
                            }

                            //$(e.currentTarget).lock();
                        },
                        error:function(data) {
                            $(e.currentTarget).unlock();
                        }
                    });
                } else {
                    $("#submitInfo").find("a").removeClass("disable-gray ui-button-disable");
                    $(e.currentTarget).unlock();
                }

            })
        },

        /**
         * 回调刷新账号设置页面
         * @param e
         * @param options
         */
        mySaveCallBack:function(e,options){
            $(".sidebar-nav a[data^='/personInfo/index.html']").click();
        },

        /**
         * 回调刷新账号设置页面
         * @param e
         * @param options
         */
        bankSaveCallBack:function(e,options){
            if(e.returnValue) {
                $(".sidebar-nav a[data^='/personInfo/index.html']").click();
            }
        },
        /**
         * 问候语显示
         * @private
         */
        _hour: function () {
            var _hours = new Date().getHours();
            if(_hours>=0&&_hours<6) {
                $("#_hourss").text(window.top.message.personInfo_auto['凌晨好']);
            } else if(_hours>=6&&_hours<12) {
                $("#_hourss").text(window.top.message.personInfo_auto['上午好']);
            } else if(_hours==12) {
                $("#_hourss").text(window.top.message.personInfo_auto['中午好']);
            } else if(_hours>12&&_hours<18) {
                $("#_hourss").text(window.top.message.personInfo_auto['下午好']);
            } else {
                $("#_hourss").text(window.top.message.personInfo_auto['晚上好']);
            }
        },
    });
});