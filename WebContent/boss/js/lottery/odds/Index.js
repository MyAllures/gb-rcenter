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
                if(code=='cqssc'||code=='tjssc'||code=='xjssc'||code=='bjpk10'||code=='ahk3'||code=='fc3d'||
                code=='tcpl3'||code=='jsk3'||code=='hbk3'||code=='gxk3'){
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
                var code = $("#searchDiv a.ssc-active").attr("code");
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
            var siteId = $("#search_id").val();
            if (!siteId) {
                e.page.showPopover(e, option, 'danger', '站点id不能为空', true);
                $(e.currentTarget).unlock();
                return;
            }
            var code = $("#searchDiv a.ssc-active").attr("code");
            var $form = $(this.getCurrentForm(e));
            var $target = $(e.currentTarget);
            var validate = $form.validate();
            var array = [];
            var group ;
            var oddObj;
            var $input;
            var odd;
            var ori;
            var obj;
            var limit;
            var data = {};
            var rebateObj;
            var cls = $("#gfwf.active");
            if (cls && cls.length>0) {
                var rebate;
                var rlimit;
                var $rinput;
                var baseNum;
                var rori;
                var minlimit;
                group = $form.find("div.tab-content table tbody td");
                var len = group.length/2;
                for (var i = 0; i < len; i++) {
                    oddObj = group[2*i];
                    rebateObj = group[2*i+1];
                    $input = $(oddObj).find("input.odd");
                    $rinput = $(rebateObj).find("input.rebate");
                    odd = Number($input.val());
                    ori = Number($input.attr("data-value"));
                    rebate = Number($rinput.val());
                    rori = Number($rinput.attr("data-value"));
                    baseNum = $(oddObj).find("input[name$=baseNum]").val();
                    minlimit = baseNum*rebate.toFixed(3);
                    if (odd != ori || rebate !=rori) {
                        if (!$input.valid()|| !$rinput.valid()) {
                            $target.unlock();
                            return;
                        }
                        limit = $input.attr("data-limit");
                        rlimit = $rinput.attr("data-limit");

                        if (rebate > rlimit) {
                            validate.settings.highlight.call(validate, $rinput, validate.settings.errorClass, validate.settings.validClass);
                            validate.showLabel($rinput, '返点比例不能超过上限' + rlimit);
                            $target.unlock();
                            return;
                        }

                        //超过赔率定义上限需提示
                        if (odd > limit || odd <=minlimit) {
                            validate.settings.highlight.call(validate, $input, validate.settings.errorClass, validate.settings.validClass);
                            validate.showLabel($input, '当前奖金不能超过上限' + limit+'不能小于等于'+minlimit);
                            $target.unlock();
                            return;
                        }
                        obj = {
                            'id': $(oddObj).find("input[name$=id]").val(),
                            'odd': odd,
                            'betCode': null,
                            'betNum': null,
                            'siteId': siteId,
                            'code': null,
                            'rebate':rebate,
                            'baseNum':baseNum
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
                                $input = $(oddObj).find("input.odd");
                                odd = $input.val();
                                $rinput = $(oddObj).find("input.rebate");
                                rebate = $rinput.val();
                                ori = $input.attr("data-value");
                                if (odd != ori) {
                                    ori = $input.attr("data-value", odd);
                                }
                                rori = $rinput.attr("data-value");
                                if (rebate != rori) {
                                    rori = $rinput.attr("data-value", rebate);
                                }
                            }
                        } else {
                            e.page.showPopover(e, option, 'danger', '保存失败', true);
                        }
                        $target.unlock();
                    }
                })
            } else{
                group = $form.find("td div.input-group");
                for (var i = 0; i < group.length; i++) {
                    oddObj = group[i];
                    $input = $(oddObj).find("input.form-control");
                    odd = Number($input.val());
                    ori = Number($input.attr("data-value"));
                    if (odd != ori) {
                        if (!$input.valid()) {
                            $target.unlock();
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
            }

        }



    });
});