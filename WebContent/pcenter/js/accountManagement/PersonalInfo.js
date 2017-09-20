/**
 * Created by eagle on 15-10-29.
 */

define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this._super();
        },

        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();

            //禁用星座下拉
            //$('[name="result.constellation"]').attr("disabled","disabled");
        },

        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        /**
         * 根据日期获取星座
         * @param e
         */
        chooseConstellation: function (e) {
            var v = e.currentTarget.value.toString();
            var month = v.substring(v.indexOf('-') + 1, v.lastIndexOf('-'));
            var day = v.substring(v.lastIndexOf('-') + 1);
            var constell = this._getAstro(month, day);
            $('[name="result.constellation"]').val(constell);
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

        //提交
        sureDialog:function(e,btnOption){
            this.returnValue=true;
            e.returnValue=true;
            this.closePage(e,btnOption)
        },

        /**
         * 更新个人信息
         * @param e
         * @param option
         */
        updatePersonInfo:function(e,option) {
            if (!this.validateForm(e)) {
                return false;
            }

            var timezoneStatus = $("#timezoneStatus").val();
            var realNameStatus = $("#realNameStatus").val();
            var currencyStatus = $("#currencyStatus").val();

            if(timezoneStatus==0 || realNameStatus==0 || currencyStatus==0) {//弹出确认窗
                var oldTimezone = $("select[name='result.defaultTimezone']").val();
                var oldRealName = $("input[type='text'][name='result.realName']").val();
                var oldCurrency = $("select[name='result.defaultCurrency']").val();
                if(oldTimezone || oldRealName || oldCurrency) {//此三项不填
                    if(timezoneStatus==0){
                        var oldTimezone = $("select[name='result.defaultTimezone']").val();
                    }else{
                        var oldTimezone = $("input[name='result.defaultTimezone']").val();
                    }
                    oldTimezone=oldTimezone.replace('+','A').replace('-','D');
                    var oldRealName = $("input[name='result.realName']").val();
                    if(currencyStatus==0){
                        var oldCurrency = $("select[name='result.defaultCurrency']").val();
                    }else{
                        var oldCurrency = $("input[name='result.defaultCurrency']").val();
                    }

                    var url = "timezoneStatus="+timezoneStatus+"&realNameStatus="+realNameStatus+"&currencyStatus="+currencyStatus+"&oldTimezone="+
                            oldTimezone+"&oldRealName="+oldRealName+"&oldCurrency="+oldCurrency;
                        url = encodeURI(encodeURI(url));
                    option.target = option.target.replace('{xxx}',url);

                    window.top.topPage.doDialog(e,option);
                    $(e.currentTarget).unlock();
                } else {
                    e.returnValue=true;
                    this.updatePerson(e,option);
                }
            } else {
                e.returnValue=true;
                this.updatePerson(e,option);
            }
        },

        updatePerson:function(e,option) {
            if(!e.returnValue){
                return;
            }
            var url=root+"/personalInfo/updatePersonInfo.html";
            window.top.topPage.ajax({
                url: url,
                dataType: 'json',
                cache: false,
                type: "post",
                data: $("#personInfo").serialize(),
                success: function (data) {
                    if(data.state){
                        window.top.topPage.showSuccessMessage(data.msg,function(){
                            /*var url=root+"/personalInfo/view.html";
                            window.top.topPage.ajax({
                                url: url,
                                type: "post",
                                success: function (data) {
                                    $("#mainFrame").html(data);
                                    var locale = $("#defaultLocale").attr("data-local");
                                    var localeArray = locale.split("_");
                                    window.top.topPage.ajax({
                                        url: root + '/index/language/change.html',
                                        dataType: 'json',
                                        cache: false,
                                        data: {'lang': localeArray[0], 'country': localeArray[1]},
                                        type: "get",
                                        success: function (data) {
                                            window.location.hash = "#/personalInfo/view.html";
                                            location.reload();
                                        }
                                    });
                                },
                                error:function(data) {
                                }
                            })*/
                            window.location.hash = "#/personalInfo/view.html";
                            location.reload();

                        });
                        $(e.currentTarget).unlock();
                    }else{
                        window.top.topPage.showErrorMessage(data.msg,null);
                        $(e.currentTarget).unlock();
                    }

                    /*if(data.state){
                        window.top.topPage.showSuccessMessage(data.msg,function(){
                            window.top.location.reload();
                        });
                        $(e.currentTarget).unlock();
                    }else{
                        window.top.topPage.showErrorMessage(data.msg,null);
                        $(e.currentTarget).unlock();
                    }*/
                },
                error:function(data) {
                    window.top.topPage.showErrorMessage(data.msg,null);
                    $(e.currentTarget).unlock();
                }
            });
        }
    });
});