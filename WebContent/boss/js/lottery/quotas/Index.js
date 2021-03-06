/**
 * Created by fly on 15-10-12.
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector ||"#mainFrame form";
            this._super();
        },

        onPageLoad: function () {
            this._super();

            if(!$("#searchDiv a").hasClass('ssc-active')){
                $("#searchDiv a").eq(0).trigger("click");
            }
        },

        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click", "#searchDiv a", function (e,opt) {
                var siteId = $("#search_id").val();
                if(!siteId){
                    return false;
                }
                var code=$(this).attr('code');
                $(this).attr('class', 'label ssc-label ssc-active');
                $(this).siblings().attr('class', 'label ssc-label');
                $("#editable_wrapper").load(root+'/lottery/quotas/'+code+'/Index.html?siteId='+siteId);
            });
            $(this.formSelector).on("click", "#lotteryDiv li", function (e) {
                $("#lotteryDiv li").removeClass("active");
                $(this).addClass("active");
                var datacode = $(this).attr("data-code");
                var code = $(this).attr("code");
                $("#searchDiv a").attr("style", "display:none");
                $("#searchDiv a[data-code='"+datacode+"']").attr("style", "display:");
                $("#searchDiv a[code='"+code+"']").click();
            });
            $(this.formSelector).on("click", "#comitSearch", function (e,opt) {
                var siteId=$("#search_id").val();
                if(!siteId){
                    page.showPopover(e,opt,"danger","站点ID不能为空",true);
                    return;
                }
                $.ajax({
                    url:root+"/lottery/quotas/quotasContent.html?siteId="+siteId,
                    type: "post",
                    dataType: "json",
                    success:function(data){
                        if(data){
                            $(".col-lg-12").css('display','block');
                            $('#norecord').css('display','none');
                            if($('.ssc-label').hasClass('ssc-active')){
                                $('.ssc-active').click();
                            }else{
                                $("#firstOne").click();
                            }
                        }else{
                            $(".col-lg-12").css('display','none');
                            $('#norecord').css('display','block');
                        }
                    },
                })
            });
        },

        validateForm: function (e,opt) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            var siteId=$("#search_id").val();
            if(!siteId){
                page.showPopover(e,opt,"danger","站点ID不能为空",true);
                return;
            }
            return !$form.valid || $form.valid();
        },
        /**
         * 保存限额
         * @param e
         */
        saveLotteryQuotas: function (e, option) {
            var siteId=$("#search_id").val();
            if(!siteId){
                return;
            }
            var $form = $(this.getCurrentForm(e));
            var $target = $(e.currentTarget);
            var code;
            var array = [];
            var group = $($form.find("table")[0]).find("tbody tr");
            var oddObj;
            var $input;
            var numQuota;
            var betQuota;
            var playQuota;
            var ori1;
            var ori2;
            var ori3;
            var obj;
            var data = {};
            for (var i = 0; i < group.length; i++) {
                oddObj = group[i];
                $input = $(oddObj).find("input.form-control");
                numQuota = Number($($input[0]).val());
                betQuota = Number($($input[1]).val());
                playQuota = Number($($input[2]).val());
                ori1 = Number($($input[0]).attr("data-value"));
                ori2 = Number($($input[1]).attr("data-value"));
                ori3 = Number($($input[2]).attr("data-value"));
                code=$(oddObj).find("input[name$=code]").val();
                if (!$input.valid()) {
                    $target.unlock();
                    return;
                }
                if ('hklhc' != code && (numQuota != ori1||betQuota!=ori2||playQuota!=ori3)) {
                    obj = {
                        'id': $(oddObj).find("input[name$=id]").val(),
                        'code':code,
                        'playCode':$(oddObj).find("input[name$=playCode]").val(),
                        "numQuota":numQuota,
                        "betQuota":betQuota,
                        "playQuota":playQuota,
                        'siteId': siteId
                    };
                    array.push(obj);
                }else if('hklhc' == code && (numQuota != ori1||betQuota!=ori2)){
                    obj = {
                        'id': $(oddObj).find("input[name$=id]").val(),
                        'code':code,
                        'playCode':$(oddObj).find("input[name$=playCode]").val(),
                        "numQuota":numQuota,
                        "betQuota":betQuota,
                        'siteId': siteId
                    };
                    array.push(obj);
                }
            }
            if (array.length <= 0) {
                e.page.showPopover(e, option, 'success', '保存成功', true);
                window.setTimeout(function (){
                    e.popoverObj.popover("destroy");}, 300);
                $target.unlock();
                return;
            }
            var url = root + "/lottery/quotas/updateQuotas.html";
            data['lotteryQuotaJson'] = JSON.stringify(array);
            window.top.topPage.ajax({
                url: url,
                data: data,
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.state == true) {
                        e.page.showPopover(e, option, 'success', '保存成功', true);
                        //修改还原数据
                        for (var i = 0; i < group.length; i++) {
                            oddObj = group[i];
                            $input = $(oddObj).find("input.form-control");
                            numQuota = Number($($input[0]).val());
                            betQuota = Number($($input[1]).val());
                            playQuota = Number($($input[2]).val());
                            ori1 = Number($($input[0]).attr("data-value"));
                            ori2 = Number($($input[1]).attr("data-value"));
                            ori3 = Number($($input[2]).attr("data-value"));
                            if (numQuota != ori1) {
                                ori1 = $($input[0]).attr("data-value", numQuota);
                            }
                            if (betQuota != ori2) {
                                ori2 = $($input[1]).attr("data-value", betQuota);
                            }
                            if (playQuota != ori3) {
                                ori3 = $($input[2]).attr("data-value", playQuota);
                            }
                        }
                    } else {
                        e.page.showPopover(e, option, 'danger', '保存失败', true);
                    }
                    $target.unlock();
                }
            })
        },

    });
});