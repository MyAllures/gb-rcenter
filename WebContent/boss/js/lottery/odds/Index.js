/**
 * Created by fly on 15-10-12.
 */
define(['common/BaseListPage', 'WanSpinner'], function (BaseListPage) {

    return BaseListPage.extend({

        init: function (formSelector) {
            this.formSelector = "form[name=lotteryoddform]";
            this._super(this.formSelector);

        },
        onPageLoad: function () {
            this._super();
            var options = {
                maxValue: 10,
                minValue: 0,
                step: 0.01,
                inputWidth: 60,
                start: 1,
                plusClick: function(val) {},
                minusClick: function(val) {},
                exceptionFun: function(val) {},
                valueChanged: function(val) {}
            };


            if(!$("#searchDiv a").hasClass('ssc-active')){
                $("#searchDiv a").eq(0).trigger("click");
            }
            $(".wan-spinner-1").WanSpinner(options);




        },
        bindEvent: function () {
            var _this= this;
            this._super();
            $(this.formSelector).on("click", "#searchDiv a", function (e,opt) {
                var siteId = $("#search_id").val();
                if(!siteId){
                    return false;
                }
                var code = $(this).attr("code");
                if(code=='cqssc'||code=='tjssc'||code=='xjssc'){
                    $(".wfqh-btn").attr("style", "display:");
                    $("#gfwfqh").addClass("gfwfqh-wrap");
                    $("#jdwf").addClass("active");
                    $("#gfwf").removeClass("active");

                }else {
                    $(".wfqh-btn").attr("style", "display:none");
                    $("#gfwfqh").removeClass("gfwfqh-wrap");
                }
                $(this).attr('class', 'label ssc-label ssc-active');
                $(this).siblings().attr('class', 'label ssc-label');
                $("#lot_two_menu").load(root+'/lottery/odds/'+code+'/Index.html');
            });

            $(this.formSelector).on("click", "#wfqh-btn a", function () {
                var code = $("#searchDiv a.ssc-active").attr("code")
                $(this).siblings().removeClass('active');
                $(this).addClass("active");
                var i = $(this).attr('id');
                if(i=='gfwf'&& code.indexOf('gf')<0){
                    code+="gf";
                }else if(code.indexOf('gf')>0){
                    code = code.substr(0,(code.length-2));
                }
                $(_this).attr('class', 'label ssc-label ssc-active');
                $(_this).siblings().attr('class', 'label ssc-label');
                $("#lot_two_menu").load(root+'/lottery/odds/'+code+'/Index.html');
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
                    url:root+"/lottery/odds/oddContent.html?siteId="+siteId,
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

        /**
         * 保存赔率
         * @param e
         */
        saveLotteryOdd: function (e, option) {
            var siteId=$("#search_id").val();
            if(!siteId){
                return;
            }
            var $form = $(this.getCurrentForm(e));
            var $target = $(e.currentTarget);
            var validate = $form.validate();
            var array = [];
            var group = $form.find("td div.input-group");
            var oddObj;
            var $input;
            var odd;
            var ori;
            var obj;
            var limit;
            var data = {};
            for (var i = 0; i < group.length; i++) {
                oddObj = group[i];
                $input = $(oddObj).find("input.form-control");
                odd = Number($input.val());
                ori = Number($input.attr("data-value"));
                if (odd != ori) {
                    if (!$input.valid()) {
                        return;
                    }
                    limit = $input.attr("data-limit");
                    //超过赔率定义上限需提示
                    if (odd > limit) {
                        validate.settings.highlight.call(validate, $input, validate.settings.errorClass, validate.settings.validClass);
                        validate.showLabel($input, '赔率不能超过上限' + limit);
                        $target.unlock();
                        return;
                    }
                    obj = {
                        'id': $(oddObj).find("input[name$=id]").val(),
                        'odd': odd,
                        'betCode': null,
                        'betNum': null,
                        'siteId': siteId,
                        'code': null
                    };
                    array.push(obj);
                }
            }
            if (array.length <= 0) {
                e.page.showPopover(e, option, 'success', '保存成功', true);
                $target.unlock();
                return;
            }
            var url = root + "/lottery/odds/saveSiteLotteryOdds.html";
            data['lotteryOddJson'] = JSON.stringify(array);
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
                            odd = $input.val();
                            ori = $input.attr("data-value");
                            if (odd != ori) {
                                ori = $input.attr("data-value", odd);
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