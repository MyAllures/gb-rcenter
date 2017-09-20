/**
 * 资金管理-提现管理审核
 */
define(['common/BaseEditPage', 'bootstrapswitch'], function (BaseEditPage,Bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.initAudit();
            this.buildValidForm();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        initAudit: function () {
            $("[name$='deductFavorable']").each(function (idx, item) {
                var name = $(item).attr("name");
                var val = window.parent.page.getTextValue(name);
                $(item).val(val);
            });
            $("[name$='administrativeFee']").each(function (idx, item) {
                var name = $(item).attr("name");
                var val = window.parent.page.getTextValue(name);
                $(item).val(val);
            });
        },
        showEditField: function (e, opt) {
            $(".fee-show-span").addClass("hide");
            $(".fee-money").removeClass("hide");
            $(e.currentTarget).addClass("hide");
            $(".hide-edit-field").removeClass("hide");
            $(e.currentTarget).unlock();
            this.resizeDialog();
        },
        hideEditField: function (e,opt) {
            $(".fee-show-span").removeClass("hide");
            $(".fee-money").addClass("hide");
            $(e.currentTarget).addClass("hide");
            $(".show-edit-field").removeClass("hide");

            $("[name$='deductFavorable']").each(function (idx, item) {
                var name = $(item).attr("name");//maxDeductFavorable
                var pre = name.substr(0,name.indexOf("."));
                var sourcename = pre + ".maxDeductFavorable";
                $(item).val($("[name='"+sourcename+"']").val());
            });
            $("[name$='administrativeFee']").each(function (idx, item) {
                var name = $(item).attr("name");//maxDeductFavorable
                var pre = name.substr(0,name.indexOf("."));
                var sourcename = pre + ".maxAdministrativeFee";
                $(item).val($("[name='"+sourcename+"']").val());
            });
            $(e.currentTarget).unlock();
            this.resizeDialog();
        },
        closeAuditPage: function (e,opt) {
            var allFavFee = 0;
            $("[name$='deductFavorable']").each(function (idx, item) {
                var name = $(item).attr("name");
                var val = $(item).val();
                allFavFee += parseFloat(val);
                window.parent.page.setTextValue(name,val);
            });
            var allAdminFee = 0;
            $("[name$='administrativeFee']").each(function (idx, item) {
                var name = $(item).attr("name");
                var val = $(item).val();
                allAdminFee += parseFloat(val);
                window.parent.page.setTextValue(name,val);
            });
            window.parent.page.setAuditFee("fav-fee-div","-"+ this.formatCurrency(allFavFee,false));
            window.parent.page.setAuditFee("admin-fee-div","-"+this.formatCurrency(allAdminFee,false));
            var counterFee = $("[name='counterFee']").val();
            var withdrawAmount = $("[name='withdrawAmount']").val();
            var acamount = withdrawAmount - counterFee - allAdminFee - allFavFee;
            if(acamount<=0){
                page.showPopover(e, {}, 'danger', "修改后取款金额小于0，不能取款", true);
                return;
            }
            var formatAmount = this.formatCurrency(acamount,true);
            window.parent.page.setAuditFee("actual-amount-div",formatAmount,acamount);
            this.closePage();
        },
        formatCurrency: function (val,strong) {
            val = val.toFixed(2);
            var dot = val.indexOf(".");
            if(dot>-1) {
                var preVal = val.substring(0, dot);
                var subVal = val.substring(dot);
                if(strong){
                    var valhtml = "<strong>" + preVal + "</strong>" + "<i>" + subVal + "</i>";
                    return valhtml;
                }else{
                    var valhtml = preVal + "<i>" + subVal + "</i>";
                    return valhtml;
                }
            }
            return val;
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
            //return false;

        },
        /**
         * 更改验证消息
         */
        bindFormValidation: function () {
            this._super();
            //this.withdrawAmountMsg();
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
                if(parseFloat($(item).val())<0){
                    var msg = "不能小于0";
                    page.showPopover(e,{},"danger",msg,true);
                }else if(parseFloat($(item).val())>parseFloat(maxVal)){
                    var msg = "请输入≤"+maxVal+window.top.message.fund_auto['的值'];
                    page.showPopover(e,{},"danger",msg,true);
                }else{
                    flag = true;
                }
            }else{
                var msg = window.top.message.fund_auto['不能为空'];
                page.showPopover(e,{},"danger",msg,true);
            }

            return flag;
        },
        /**
         * 更新取款金额的远程验证提示消息
         */
        buildValidForm: function () {
            var _this = this;

            $(".fee-money").each(function (idx, item) {
                $(item).blur(function () {
                    var flag = true;
                    $(".fee-money").each(function (idx, item) {
                        var _name = $(item).attr("name");
                        if(_name.indexOf("deductFavorable")>-1){
                            if(!_this.validFav(item, "maxDeductFavorable")){
                                flag = false;
                            }
                        }else if(_name.indexOf("administrativeFee")>-1){
                            if(!_this.validFav(item, "maxAdministrativeFee")){
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
        changeAuditFeeCallback: function (e, opt) {
            if(opt.data.state){
                this.closeAuditPage(e,opt);
            }else {
                var msg = window.top.message.fund_auto['修改稽核失败'];
                page.showPopover(e,{},"danger",msg,true);
            }
        },
        refreshAuditList: function (e, opt) {
            var withdrawId = opt.withdrawId;
            if(withdrawId){
                window.top.topPage.ajax({
                    url: root+"/fund/withdraw/refreshAuditList.html?withdraw.id="+withdrawId+"&search.id="+withdrawId,
                    beforeSend: function () {
                        //$(".update-audit-btn").html(window.top.message.fund_auto['正在更新']);
                    },
                    success: function (data) {
                        $("#modal-body").html(data);
                        var obj = {};
                        obj.currentTarget = $(".update-audit-btn");
                        page.showPopover(obj, {"placement":"left"}, 'success', window.top.message.fund_auto['更新完成'], true);
                        //$(".update-audit-btn").html(window.top.message.fund_auto['更新稽核']);
                    }
                });
            }
            $(e.currentTarget).unlock();
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