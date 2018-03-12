//模板页面
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,
        init: function (title) {
            this.formSelector = "form";
            this._super();
            $("#tag1").click();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            var active=$("input[name='isReward.paramValue']").attr('active');
            $("input[name='isReward.paramValue'][value='"+active+"']").attr("checked",true);
            var isRewardActive=$("#isRewardActive").is(':checked');
            if(!isRewardActive){
                $("[name='rewardTheWay.paramValue']").attr('readonly','true');
                $("[name='rewardTheWay.paramValue']").val('');
                $("[name='rewardMoney.paramValue']").attr('readonly','true');
                $("[name='rewardMoney.paramValue']").val('');
                $("[name='audit.paramValue']").attr('readonly','true');
                $("[name='audit.paramValue']").val('');
            }
            var bonusActive=$("#bonusActive").is(':checked');
            if(!bonusActive){
                $("[name='bonusTrading.paramValue']").attr('readonly','true');
                $("[name='bonusTrading.paramValue']").val('');
                $("[name='bonusBonusMax.paramValue']").attr('readonly','true');
                $("[name='bonusBonusMax.paramValue']").val('');
                $("[name='bonusAudit.paramValue']").attr('readonly','true');
                $("[name='bonusAudit.paramValue']").val('');
            }
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
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $(this.formSelector).on("change", "#isRewardActive", function () {
                var stat=$(this).is(":checked");
                $("input[name='isReward.active']").val(stat);
                if(stat){
                    $("[name='rewardTheWay.paramValue']").removeAttr('readonly');
                    $("[name='rewardMoney.paramValue']").removeAttr('readonly');
                    $("[name='audit.paramValue']").removeAttr('readonly');
                }else{
                    $("[name='rewardTheWay.paramValue']").attr('readonly','true');
                    $("[name='rewardTheWay.paramValue']").val('');
                    $("[name='rewardMoney.paramValue']").attr('readonly','true');
                    $("[name='rewardMoney.paramValue']").val('');
                    $("[name='audit.paramValue']").attr('readonly','true');
                    $("[name='audit.paramValue']").val('');
                }
            });
            $(this.formSelector).on("change", "#bonusActive", function () {
                var stat=$(this).is(":checked");
                $("input[name='bonus.active']").val(stat);
                if(stat){
                    $("[name='bonusTrading.paramValue']").removeAttr('readonly');
                    $("[name='bonusBonusMax.paramValue']").removeAttr('readonly');
                    $("[name='bonusAudit.paramValue']").removeAttr('readonly');
                }else{
                    $("[name='bonusTrading.paramValue']").attr('readonly','true');
                    $("[name='bonusTrading.paramValue']").val('');
                    $("[name='bonusBonusMax.paramValue']").attr('readonly','true');
                    $("[name='bonusBonusMax.paramValue']").val('');
                    $("[name='bonusAudit.paramValue']").attr('readonly','true');
                    $("[name='bonusAudit.paramValue']").val('');
                }
            });
            //新增梯度
            $(this.formSelector).on("click", "#addTr", function () {
                var trNum=$(".bg-color").length-1;
                var addHtml="<tr class='bg-color' ind='"+parseInt(trNum+1)+"'><td><input tt='temp' class='form-control'  name='gradientTempList["+parseInt(trNum+1)+"].playerNum' type='text' value=''></td><td><div class=' clearfix content-width-limit-30 m-b-none'><div class='input-group'><input tt='temp' name='gradientTempList["+parseInt(trNum+1)+"].proportion' type='text' class='form-control' value=''><span class='input-group-addon'>%</span></div></div></td><td class='delTd'><a href='javascript:void(0)'>".concat(window.top.message.setting_auto['删除']).concat("</a></td></tr>")
                if(trNum<4){
                    $(".add").before(addHtml);
                }else{
                    window.top.topPage.showInfoMessage(window.top.message.setting["recommended.max5"]);
                }
            });
            //删除梯度
            $(this.formSelector).on("click", ".delTd", function () {
                $(this).parent().remove();
                $(".bg-color").each(function (index) {
                    var playerNum= $(this).find("input").attr("name","gradientTempList["+index+"].playerNum");
                    var proportion=$(this).children(1).children(0).children(0).children(0).attr("name","gradientTempList["+index+"].proportion");
                });
            });
            //切换语言
            $(this.formSelector).on("click","a[name='tag']", function () {
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".recommended").hide();
                $(".text_"+local+"_content").show();
                $(".text_"+local+"_rule").show();
            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceContent=$(".text_"+sourceLocal+"_content").val();
                var targetLocal=$(".current").attr("local");
                $(".text_"+targetLocal+"_content").val(sourceContent);

                var sourceContent=$(".text_"+sourceLocal+"_rule").val();
                var targetLocal=$(".current").attr("local");
                $(".text_"+targetLocal+"_rule").val(sourceContent);

            });
            //回复默认文案
            $(this.formSelector).on("click","#revert", function () {
                $(".defaultValue").each(function () {
                    $(this).next().val($(this).val());
                });
            });
            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "textarea", function (e,message) {
                if(message && $(this).is(":hidden")){
                    var attr = $(this).attr("tt");
                    $(".a_"+attr).formtip(message);
                    e.result=true;
                }
                else{
                    e.result=false;
                }
            });
            //修改编辑状态
            $(this.formSelector).on("click","a[name='tag']", function () {
                var local=$(this).attr("local");
                $(".rec").each(function (index) {
                    var ruleVal=$(".rule"+index).val();
                    var textVal=$(this).val();
                    var localCopy=$(this).attr('local');
                    if(textVal.length>0&&ruleVal.length>0){
                        $("#option"+localCopy).show();
                        $("#span"+localCopy).text(window.top.message.setting_auto['已编辑']);
                    }else{
                        $("#span"+localCopy).text(window.top.message.setting_auto['未编辑']);
                    }
                    if(local==localCopy){
                        $("#option"+localCopy).hide();
                    }
                    //编辑中
                    var currentLoacl=$(".current").attr("local");
                    $("#span"+currentLoacl).text(window.top.message.setting_auto['编辑中']);
                });

            });


        }
    });
});