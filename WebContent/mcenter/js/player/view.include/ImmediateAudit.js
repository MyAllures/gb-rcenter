/**
 * 玩家信息-地址
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        select: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
            this.buildValidForm();
        },
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'left'
            });
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
        },
        showEditField: function (e, opt) {
            $(".fee-show-span").addClass("hide");
            $(".fee-money").removeClass("hide");
            $(".clear-all").addClass("hide");
            $("#disable-clear-all").removeClass("hide");
            $(".edit-field-btn").addClass("hide");
            $(".cancel-field-btn").removeClass("hide");
            $(".hide-edit-field").removeClass("hide");
            $(".fee-money").each(function (idx, item) {
                var money = $(item).val();
                money = money.replace(/,/g,"");
                $(item).val(money);
            })
            $(e.currentTarget).unlock();
            this.resizeDialog();
        },
        hideEditField: function (e,opt) {
            $(".fee-show-span").removeClass("hide");
            $(".fee-money").addClass("hide");
            $(e.currentTarget).addClass("hide");

            $(".edit-field-btn").removeClass("hide");

            $(".cancel-field-btn").addClass("hide");

            $("#disable-clear-all").addClass("hide");

            $(".clear-all").removeClass("hide");

            $("[name$='rechargeAuditPoints']").each(function (idx, item) {
                var name = $(item).attr("name");//maxDeductFavorable
                var pre = name.substr(0,name.indexOf("."));
                var sourcename = pre + ".maxRechargeAuditPoints";
                var oldval = $("[name='"+sourcename+"']").val();
                /*if(oldval.indexOf(".")>-1){
                    var point = oldval.substring(oldval.indexOf(".")+1);
                    if(parseInt(point)==0){
                        oldval = oldval.substring(0,oldval.indexOf("."));
                    }
                }*/
                $(item).val(oldval);
            });
            $("[name$='favorableAuditPoints']").each(function (idx, item) {
                var name = $(item).attr("name");//maxDeductFavorable
                var pre = name.substr(0,name.indexOf("."));
                var sourcename = pre + ".maxFavorableAuditPoints";
                $(item).val($("[name='"+sourcename+"']").val());
            });
            $(e.currentTarget).unlock();
            this.resizeDialog();
        },
        validFav: function (item,maxName) {
            var flag = false;
            var _name = $(item).attr("name");
            var pre = _name.substr(0,_name.indexOf("."));
            var sourcename = pre + "." + maxName;
            var maxVal = $("[name='"+sourcename+"']").val();
            var e = {};
            e.currentTarget = $(item);
            var fee = $(item).val();
            if(fee){
                if(isNaN(fee)){
                    var e = {};
                    e.currentTarget = $(item);
                    page.showPopover(e,{},"danger",window.top.message.player_auto['请输入数字'],true);
                }else{
                    if(parseFloat($(item).val())<0){
                        var msg = window.top.message.player_auto['不能小于0'];
                        page.showPopover(e,{},"danger",msg,true);
                    }else{
                        flag = true;
                    }

                }
            }else{
                var msg = window.top.message.player_auto['不能为空'];
                page.showPopover(e,{},"danger",msg,true);
            }

            return flag;
        },
        buildValidForm: function () {
            var _this = this;

            $(".fee-money").each(function (idx, item) {
                $(item).blur(function () {
                    var flag = true;
                    $(".fee-money").each(function (idx, item) {
                        var _name = $(item).attr("name");
                        if(_name.indexOf("rechargeAuditPoints")>-1){
                            if(!_this.validFav(item, "maxRechargeAuditPoints")){
                                flag = false;
                            }
                        }else if(_name.indexOf("favorableAuditPoints")>-1){
                            if(!_this.validFav(item, "maxFavorableAuditPoints")){
                                flag = false;
                            }
                        }

                    });
                    if (!flag) {

                        $(".btn-edit-audit").attr("disabled", true);
                    } else {
                        $(".btn-edit-audit").attr("disabled", false);
                    }
                });

            });
        },
        myValidateForm: function (e, opt) {
            var _this = this;
            var flag = true;
            $(".fee-money").each(function (idx, item) {
                if(!_this.validFav(item,"maxDeductFavorable")){
                    flag = false;
                }
                if(flag){
                    if(!_this.validFav(item,"maxAdministrativeFee")){
                        flag = false;
                    }
                }

            });
            return flag;

        },
        clearAllAuditPoing: function (e, opt) {
            $(".fee-money").val(0);
            return this.myValidateForm(e,opt);
        },
        clearCallback: function (e, opt) {
            var _this = this;
            if(opt.data.state){
                page.showPopover(e,{},"success",window.top.message.player_auto['操作成功'],true);
                setTimeout(function () {
                    _this.closePage();
                },1000);
            }else{
                var msg = window.top.message.player_auto['操作失败'];
                if(opt.data.msg){
                    msg = opt.data.msg;
                }
                page.showPopover(e,{},"danger",msg,true);
            }
        },
        toGameOrder: function (e, opt) {
            var startTime = opt.startTime;
            var endTime = opt.endTime;
            console.log("startTime:"+startTime);
            console.log("endTime:"+endTime);
            this.returnValue = "search.payoutStart="+startTime+"&search.payoutEnd="+endTime;
            this.closePage();
            $(e.currentTarget).unlock();
        },
        buildPostData: function (e, opt) {
            var dataVo = $(window.top.topPage.getFirstParentByTag(e, 'form')).serializeArray();
            var dataJson = this.convertToJson(dataVo);
            dataVo = JSON.stringify(dataJson);
            return {"dataJson":dataVo};
        }
    });

});