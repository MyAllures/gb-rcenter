/**
 * Created by fly on 15-10-12.
 */
define(['common/BaseListPage', 'WanSpinner'], function (BaseListPage) {

    return BaseListPage.extend({

        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector || "#mainFrame form";
            this._super();
            $("#lotteryDiv li").click(function (e) {
                $("#lotteryDiv li").removeClass("active");
                $(this).addClass("active");
                var datacode = $(this).attr("data-code");
                var code = $(this).attr("code");
                $("#searchDiv a").attr("style", "display:none");
                $("#searchDiv a[data-code='"+datacode+"']").attr("style", "display:");
                $("#searchDiv a[code='"+code+"']").click();
            });
        },

        onPageLoad: function () {
            this._super();
            var options = {
                maxValue: 10,
                minValue: 0,
                step: 0.01,
                inputWidth: 60,
                start: 1,
                plusClick: function (val) {
                },
                minusClick: function (val) {
                },
                exceptionFun: function (val) {
                },
                valueChanged: function (val) {
                }
            };

            $("#searchDiv a").click(function (e) {
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
                    $("#gfwf").removeClass("active");
                }

                $(this).attr('class', 'label ssc-label ssc-active');
                $(this).siblings().attr('class', 'label ssc-label');
                $("#lot_two_menu").load(root + '/lottery/odds/' + code + '/Index.html');
            });

            $(this.formSelector).on("click", "#wfqh-btn a", function () {
               var $target = $("#searchDiv a.ssc-active");
                var code = $target.attr("code");
                $(this).siblings().removeClass('active');
                $(this).addClass("active");
                var i = $(this).attr('id');
                if(i=='gfwf'&& code.indexOf('gf')<0){
                    code+="gf";
                }else if(code.indexOf('gf')>0){
                    code = code.substr(0,(code.length-2));
                }
                $target.attr('class', 'label ssc-label ssc-active');
                $target.siblings().attr('class', 'label ssc-label');
                $("#lot_two_menu").load(root+'/lottery/odds/'+code+'/Index.html');
            });


            if (!$("#searchDiv a").hasClass('ssc-active')) {
                $("#searchDiv a").eq(0).trigger("click");
            }


            $(".wan-spinner-1").WanSpinner(options);


        },

        bindEvent: function () {
            this._super();
        },
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        /**
         * 保存赔率
         * @param e
         */
        saveLotteryOdd: function (e, option) {
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
            var rebateObj;
            var cls = $("#gfwf.active");
            var code ;
            var betNum;
            if(cls && cls.length>0){
                var rebate;
                var rlimit;
                var $rinput;
                var rori;
                var baseNum;
                var minlimit;
                var sameRebate = Number($("input#sameRebate").val());
                var sameRebate1 = Number($("input#sameRebate1").val());
                var sameRebate2 = Number($("input#sameRebate2").val());
                var betCode;
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
                    minlimit = baseNum*rebate;
                    minlimit = minlimit.toFixed(3);
                    betCode = String($(oddObj).find("input[name$=betCode]").val());
                    code = String($(oddObj).find("input[name$=code]").val());
                    betNum = String($(oddObj).find("input[name$=betNum]").val());

                    if (!$input.valid()|| !$rinput.valid()) {
                        $target.unlock();
                        return;
                    }
                    //三星（一星，三星统一用二星的返点比例）混合组选（组六统一用组三返点比例）混合和值（统一用组三的返点比例）
                    if(("ssc_sanxing_zhixuan_hszh"==betCode && "三星"==betNum)||
                        ("ssc_sanxing_zhixuan_hszh"==betCode && "一星"==betNum)||
                        ("ssc_sanxing_zhixuan_qszh"==betCode && "三星"==betNum)||
                        ("ssc_sanxing_zhixuan_qszh"==betCode && "一星"==betNum)||
                        ("ssc_sanxing_zuxuan_hshhzx"==betCode && "组六"==betNum)||
                        ("ssc_sanxing_zuxuan_qshhzx"==betCode && "组六"==betNum)||
                        ("pl3_sanxing_zuxuan_hhzx"==betCode&& "组六"==betNum)||
                        ("ssc_sanxing_zuxuan_qsts"==betCode && "豹子"==betNum)||
                        ("ssc_sanxing_zuxuan_qsts"==betCode && "对子"==betNum)||
                        ("ssc_sanxing_zuxuan_hsts"==betCode && "豹子"==betNum)||
                        ("ssc_sanxing_zuxuan_hsts"==betCode && "对子"==betNum)){
                        rebate = sameRebate;
                    }else if(("ssc_sanxing_zuxuan_hszxhz"==betCode && "组六"==betNum)||
                        ("pl3_sanxing_zuxuan_zxhz"==betCode&& "组六"==betNum)||
                        ("ssc_sanxing_zuxuan_qszxhz"==betCode&& "组六"==betNum)){
                        rebate = sameRebate1;
                    }else if(("ssc_sanxing_zuxuan_hszxbd"==betCode&& "组六"==betNum)||
                        ("ssc_sanxing_zuxuan_qszxbd"==betCode&& "组六"==betNum)){
                        rebate = sameRebate2;
                    }
                    if (odd != ori || rebate !=rori) {
                        limit = $input.attr("data-limit");
                        rlimit = $rinput.attr("data-limit");
                        //返点比例上限提示
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
                            'betCode': betCode,
                            'betNum': betNum,
                            'code': code,
                            'rebate':rebate,
                            'baseNum':baseNum,
                            'oldOdd':ori,
                            'oldRebate':rori
                        };
                        array.push(obj);
                    }
                }
                if (array.length <= 0) {
                    e.page.showPopover(e, option, 'success', window.top.message.common['save.success'], true);
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
                            e.page.showPopover(e, option, 'success', window.top.message.common['save.success'], true);
                            //修改还原数据
                            for (var i = 0; i < group.length; i++) {
                                oddObj = group[2*i];
                                rebateObj = group[2*i+1];
                                $input = $(oddObj).find("input.odd");
                                odd = $input.val();
                                $rinput = $(rebateObj).find("input.rebate");
                                rebate = $rinput.val();
                                sameRebate = Number($("input#sameRebate").val());
                                sameRebate1 = Number($("input#sameRebate1").val());
                                sameRebate2 = Number($("input#sameRebate2").val());
                                betCode = String($(oddObj).find("input[name$=betCode]").val());
                                betNum = String($(oddObj).find("input[name$=betNum]").val());
                                ori = $input.attr("data-value");
                                if (odd != ori) {
                                    ori = $input.attr("data-value", odd);
                                }
                                if(("ssc_sanxing_zhixuan_hszh"==betCode && "三星"==betNum)||
                                    ("ssc_sanxing_zhixuan_hszh"==betCode && "一星"==betNum)||
                                    ("ssc_sanxing_zhixuan_qszh"==betCode && "三星"==betNum)||
                                    ("ssc_sanxing_zhixuan_qszh"==betCode && "一星"==betNum)||
                                    ("ssc_sanxing_zuxuan_hshhzx"==betCode && "组六"==betNum)||
                                    ("ssc_sanxing_zuxuan_qshhzx"==betCode && "组六"==betNum)||
                                    ("pl3_sanxing_zuxuan_hhzx"==betCode&& "组六"==betNum)||
                                    ("ssc_sanxing_zuxuan_qsts"==betCode && "豹子"==betNum)||
                                    ("ssc_sanxing_zuxuan_qsts"==betCode && "对子"==betNum)||
                                    ("ssc_sanxing_zuxuan_hsts"==betCode && "豹子"==betNum)||
                                    ("ssc_sanxing_zuxuan_hsts"==betCode && "对子"==betNum)){
                                    rebate = sameRebate;
                                }else if(("ssc_sanxing_zuxuan_hszxhz"==betCode && "组六"==betNum)||
                                    ("pl3_sanxing_zuxuan_zxhz"==betCode&& "组六"==betNum)||
                                    ("ssc_sanxing_zuxuan_qszxhz"==betCode&& "组六"==betNum)){
                                    rebate = sameRebate1;
                                }else if(("ssc_sanxing_zuxuan_hszxbd"==betCode&& "组六"==betNum)||
                                    ("ssc_sanxing_zuxuan_qszxbd"==betCode&& "组六"==betNum)){
                                    rebate = sameRebate2;
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
            }else {
                var lhca = $("input#lhca");
                var islhca = false;
                if (lhca && lhca.length>0) { // 六合彩ａ盘
                    group = $form.find("td div.input-group:even");
                    islhca = true
                }
                for (var i = 0; i < group.length; i++) {
                    oddObj = group[i];
                    $input = $(oddObj).find("input.form-control");
                    odd = Number($input.val());
                    ori = Number($input.attr("data-value"));
                    betCode = String($(oddObj).find("input[name$=betCode]").val());
                    code = String($(oddObj).find("input[name$=code]").val());
                    betNum = String($(oddObj).find("input[name$=betNum]").val());

                    if (!$input.valid()) {
                        $target.unlock();
                        return;
                    }
                    if (!islhca && odd != ori) {
                        limit = $input.attr("data-limit");
                        //超过赔率定义上限需提示
                        if (odd > limit) {
                            validate.settings.highlight.call(validate, $input, validate.settings.errorClass, validate.settings.validClass);
                            validate.showLabel($input, window.top.message.lottery_auto['赔率不能超过上限'] + limit);
                            $target.unlock();
                            return;
                        }
                        obj = {
                            'id': $(oddObj).find("input[name$=id]").val(),
                            'odd': odd,
                            'betCode': betCode,
                            'betNum': betNum,
                            'siteId': null,
                            'code': code,
                            'oldOdd':ori
                        };
                        array.push(obj);
                    }else if (islhca) {
                        var $rinput = $(oddObj).parent("td").next().find("input.form-control");
                        rebate = Number($rinput.val());
                        rori = Number($rinput.attr("data-value"));

                        if (odd != ori || rebate !=rori) {
                            limit = $input.attr("data-limit");
                            rlimit = Number($rinput.attr("data-limit"));
                            if (odd > limit) {
                                validate.settings.highlight.call(validate, $input, validate.settings.errorClass, validate.settings.validClass);
                                validate.showLabel($input, '赔率不能超过上限' + limit);
                                $target.unlock();
                                return;
                            }
                            if (rebate > rlimit) {
                                validate.settings.highlight.call(validate, $rinput, validate.settings.errorClass, validate.settings.validClass);
                                validate.showLabel($rinput, '返点不能超过上限' + rlimit);
                                $target.unlock();
                                return;
                            }
                            obj = {
                                'id': $(oddObj).find("input[name$=id]").val(),
                                'odd': odd,
                                'betCode': betCode,
                                'betNum': betNum,
                                'siteId': null,
                                'rebate':rebate,
                                'code': code,
                                'oldOdd':ori,
                                'oldRebate': rori
                            };
                            array.push(obj);
                        }

                    }
                }
                if (array.length <= 0) {
                    e.page.showPopover(e, option, 'success', window.top.message.common['save.success'], true);
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
                            e.page.showPopover(e, option, 'success', window.top.message.common['save.success'], true);
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
        },
        batchUpdateValue:function (e, opt) {
            var val = $("#defaultValue").val();
            if(val){
                if(!isNaN(val)){
                    if(parseFloat(val)<=0){
                        page.showPopover(e,{},"danger",window.top.message.player_auto['请输入大于0的正数'],true);
                    }else{
                        $("input[name$='odd']").val(val);
                    }
                }else{
                    page.showPopover(e,{},"danger",window.top.message.player_auto['请输入数字'],true);
                }

            }
            $(e.currentTarget).unlock();
        }

    });
});