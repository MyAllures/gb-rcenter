/**
 * Created by eagle on 15-10-12.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        maxRange: 30,
        ue: null,
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var that = this;
        },
        //改变红包条件
        changeConditionEvent:function () {
            var that = this;
            $(".has-condition-radio").click(function (item) {
                var hcrs = document.getElementsByName("activityRule.conditionType");
                if(hcrs.length>0){
                    for(var i=0;i<hcrs.length;i++){
                        var rdo = hcrs[i];
                        if(rdo.checked&&rdo.value!="3"){
                            if(rdo.value=='1'){
                                $("#deposit_type_title").html("单次存款金额");
                            }else{
                                $("#deposit_type_title").html("累计存款金额");
                            }
                            $("#money_condition").removeClass("hide");
                            $("#money_condition_add_btn").removeClass("hide");
                            $("#betCountMaxLimit_div").addClass("hide");
                            break;
                        }else{
                            $("#money_condition").addClass("hide");
                            $("#money_condition_add_btn").addClass("hide");
                            $("#betCountMaxLimit_div").removeClass("hide");
                        }
                    }
                }
            });
        },
        //红包剩余中奖率
        remainProbalilityEvent:function () {
            var that = this;
            $(that.formSelector).on("blur",".awards-rules-input-pro",function (e, msg) {
                var remain = that.getRemainProbability();
                var input = null;
                $("#awards_rules").find("tr:gt(0)").each(function (idx, tr) {
                    var ival = $(tr).find("td:eq(5)").find("input").val();
                    if(ival==null||ival==""){
                        input = $(tr).find("td:eq(5)").find("input");
                        return false;
                    }
                });
                that.setRemainProbalility(input);
            });
        },
        //红包剩余个数
        remainCountEvent:function () {
            var that = this;
            $(that.formSelector).on("input",".remain-count-txt",function (e, msg) {
                var newVal = $(e.currentTarget).val();
                var name = $(e.currentTarget).attr("name");
                var nameArr = name.split(".");
                var newName = nameArr[0]+".oldRemainCount";
                var oldCountName = nameArr[0]+".oldQuantity";
                var newCountName = nameArr[0]+".quantity";
                var showName = nameArr[0]+".showQuantity";
                var oldTotalCount = $("[name='"+oldCountName+"']").val();
                if(!newVal){
                    $("[name='"+showName+"']").text(oldTotalCount);
                    $("[name='"+newCountName+"']").val(oldTotalCount);
                    return;
                }
                var oldVal = $("[name='"+newName+"']").val();
                if(!oldVal){
                    oldVal = 0;
                }
                if(!isNaN(oldVal)&&!isNaN(newVal)&&!isNaN(oldTotalCount)){
                    var count = parseInt(newVal)-parseInt(oldVal);
                    oldTotalCount =parseInt(oldTotalCount)+parseInt(count);
                    $("[name='"+newCountName+"']").val(oldTotalCount);
                    $("[name='"+showName+"']").text(oldTotalCount);
                }
            });

        },

        onPageLoad: function () {
            this._super();
        },

        queryDisplayMoneyActivity:function (e, opt) {
            var _this = this;
            var code = opt.code;
            if(code!='money'){
                return _this.uploadFile(e,opt);
            }
            _this.validatePeriodArea(e,"validHasDisplay",opt);

            return false;
            //activityMessage.isDisplay
        },
        queryHasDisplayActivity:function (e, opt) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/operation/activity/queryExistMoneyActivity.html?id="+$("#activityMessageId").val(),
                type: "POST",
                dataType: "JSON",
                success: function (data) {
                    if (data.state) {
                        if($("[name='activityMessage.isDisplay']:checked").val()=='true'){
                            window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],
                                window.top.message.operation['activityMoneyDisplayTips'],
                                window.top.message.common['continue'], window.top.message.setting['common.cancel'], function (state) {
                                    if(state){
                                        if(_this.uploadFile(e,opt)){
                                            opt.closeDisplay = true;
                                            _this.activityRelease(e,opt);
                                        }else{
                                            $(e.currentTarget).unlock();
                                        }
                                    }
                                });
                        }else{
                            if(_this.uploadFile(e,opt)){
                                _this.activityRelease(e,opt);
                            }else{
                                $(e.currentTarget).unlock();
                            }
                        }
                    } else {
                        if(_this.uploadFile(e,opt)){
                            _this.activityRelease(e,opt);
                        }else{
                            $(e.currentTarget).unlock();
                        }
                    }
                }
            });
        },

        validateAwardRule:function (e, opt) {
            var ruleCount = $("#awards_rules").find("tr:gt(0)").length;
            if(ruleCount==0){
                return false;
            }
            return true;
        },

        validateCondition:function (e, opt) {
            var c_count = $("#money_condition").find("tr:gt(0)").length;
            if(c_count==0){
                return false;
            }
            return true;
        },


        addOpenPeriod:function (e, opt) {
            var tr = $("#hidden_open_period").find("tr:eq(0)").clone();
            var trlen = $("#open_period").find("tr:gt(0)").length;
            if(trlen>=50){
                var msg = ""+window.top.message.operation_auto['最多添加N个梯度']+"";
                msg =this.formatStr(msg,50);
                page.showPopover(e,opt,"danger",msg,true);
                return;
            }
            var temp = this.validAllOpenPeriod();
            if(!temp){
                page.showPopover({currentTarget:$("#open_period")},{},"danger",window.top.message.operation_auto['开放时段开始时间不能大于结束时间'],true);
                $(e.currentTarget).unlock();
                return false;
            }
            var td1 = window.top.message.operation_auto['时段']+(trlen+1);
            $(tr).find("td:eq(0)").html(td1);
            $(tr).find("input").each(function (idx, input) {
                var name = $(input).attr("name");
                name = name.replace("{n}",trlen);
                $(input).attr("name",name);
            });
            $("#open_period").append(tr);
            this.awardAmountEvent();
            this.awardCountEvent();
            $(e.currentTarget).unlock();

        },
        deleteTableRow:function (e, opt) {
            var _this = this;
            var table = $($(e.currentTarget).parent().parent().parent());
            $($(e.currentTarget).parent().parent()).remove();
            var trLen = $(table).find("tr:gt(0)").length;
            var tableId = $(table.parent()).attr("id");
            $(table).find("tr:gt(0)").each(function (idx, trItem) {
                $(trItem).find("td").each(function (ix, td) {
                    if(ix == 0 ){
                        if($(td).find("input").length==0){
                            var td1 = window.top.message.operation_auto['时段']+(idx+1);
                            $(td).html(td1);
                        }else{
                            var name = $(td).find("input").attr("name");
                            var p = /\[.*?\]/g;
                            name = name.replace(p,"["+idx+"]");
                            $(td).find("input").attr("name",name);
                        }
                    }else{
                        if($(td).find("input").length>0){
                            $(td).find("input").each(function (txtIdx, txt) {
                                var name = $(txt).attr("name");
                                var p = /\[.*?\]/g;
                                name = name.replace(p,"["+idx+"]");
                                $(txt).attr("name",name);
                            })

                        }

                    }

                });
                if((idx+1) == trLen && tableId == "awards_rules"){
                    var input = $(trItem).find("td:eq(4)").find("input");
                    _this.setRemainProbalility(input);
                }
            });
            this.calTotalMoneyAndCount();
            $(e.currentTarget).unlock();
        },
        addCondition:function (e, opt) {
            var _this = this;
            var tr = $("#hidden_money_condition").find("tr:eq(0)").clone();
            var trlen = $("#money_condition").find("tr:gt(0)").length;
            if(trlen>=30){
                var msg = ""+window.top.message.operation_auto['最多添加N个梯度']+"";
                msg =_this.formatStr(msg,30);
                page.showPopover(e,opt,"danger",msg,true);
                return;
            }
            $(tr).find("input").each(function (idx, input) {
                var name = $(input).attr("name");
                name = name.replace("{n}",trlen);
                $(input).attr("name",name);
            });
            $("#money_condition").append(tr);
            $(".condition-input-txt").blur(function () {
                _this.validateSameCondition();
            });
            $(e.currentTarget).unlock();
        },
        addAwardsRule:function (e, opt) {
            var _this  = this;
            var tr = $("#hidden_awards_rules").find("tr:eq(0)").clone();
            var trlen = $("#awards_rules").find("tr:gt(0)").length;
            if(trlen>=20){
                var msg = ""+window.top.message.operation_auto['最多添加N个梯度']+"";
                msg =_this.formatStr(msg,20);
                page.showPopover(e,opt,"danger",msg,true);
                return;
            }


            $(tr).find("input").each(function (idx, input) {
                var name = $(input).attr("name");
                name = name.replace("{n}",trlen);
                $(input).attr("name",name);
                if(idx==3){
                    _this.setRemainProbalility(input);
                }
            });
            $("#awards_rules").append(tr);
            $(".award_amount").blur(function () {
                _this.validAwardRule();
            });
            _this.awardAmountEvent();
            _this.awardCountEvent();
            $(e.currentTarget).unlock();
        },
        setRemainProbalility:function (input) {
            $("#awards_rules").find("tr:gt(0)").each(function (idx, tr) {
                $(tr).find("td:eq(5)").find("input").attr("placeholder","");
            });
            var allProbability =this.getRemainProbability();
            if(input){
                if(allProbability<0){
                    allProbability = 0;
                }
                $(input).attr("placeholder",window.top.message.operation_auto['剩']+allProbability);
            }else{
                if(allProbability<0){
                    var msg = ""+window.top.message.operation_auto['概率总和不能超过']+"";
                    msg = this.formatStr(msg,"100%");
                    $("#izjgl").text(msg);
                }else{
                    $("#izjgl").text(window.top.message.operation_auto['不中奖概率']+allProbability+" %");
                }
            }
        },
        getRemainProbability:function () {
            var allProbability = 100;
            $("#awards_rules").find("tr:gt(0)").each(function (idx, tr) {
                var probability = $(tr).find("td:eq(5)").find("input").val();
                if(probability && !isNaN(probability)){
                    allProbability = allProbability - probability;
                }

            });
            allProbability = allProbability.toFixed(2);
            return allProbability;
        },

        validateOpenPeriod:function (e) {
            var trobj = $(e.currentTarget).parent().parent().parent().parent().parent();
            var flag = this.validOpenPeriodByOneTr(trobj);
            if(!flag){
                $("#open-period-div").addClass("error");
                page.showPopover({currentTarget:$("#open_period")},{},"danger",window.top.message.operation_auto['开放时段开始时间不能大于结束时间'],true);
            }else{
                //$("#open-period-div").removeClass("error");
                //this.uploadFile(e,{});
                this.validatePeriodArea(e,"false",{});
            }
            this.calTotalMoneyAndCount();

        },
        validatePeriodArea:function (e,hasNextValid,opt) {
            var _this = this;
            var url = root + '/operation/activity/validatePeriodArea.html';
            var data = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                type: "POST",
                data: data,
                url: url,
                dataType:"JSON",
                success: function (data) {
                    if(data&&data.state){
                        $("#open-period-div").addClass("error");
                        var msg = window.top.message.operation_auto['两个时段重复'];
                        page.showPopover({currentTarget:$("#open_period")},{},"danger",msg,true);
                    }else{
                        if(hasNextValid!="false"){
                            if(hasNextValid=="validHasDisplay"){
                                _this.queryHasDisplayActivity(e,opt);
                            }else if(hasNextValid == "validRule"){
                                _this.activityRuleNext(e);
                            }

                        }else{
                            $("#open-period-div").removeClass("error");
                        }
                    }
                }
            });
            return false;
        },
        validOpenPeriodByOneTr:function (trobj) {
            if(!trobj){
                return true;
            }
            var sth = $(trobj).find("input:eq(0)").val();
            var stm = $(trobj).find("input:eq(1)").val();
            var eth = $(trobj).find("input:eq(2)").val();
            var etm = $(trobj).find("input:eq(3)").val();
            if(sth!=""&&eth!=""){
                if(parseInt(sth)>parseInt(eth)){
                    return false;
                }else if(parseInt(sth) == parseInt(eth)){
                    if(stm !="" && etm !=""){
                        if(parseInt(stm)>=parseInt(etm)){
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        validAllOpenPeriod:function () {
            var flag = true;
            var _this = this;
            $("#open_period").find("tr:gt(0)").each(function (idx, trobj) {
                flag = _this.validOpenPeriodByOneTr(trobj);
                if(flag==false){
                    return false;
                }
            });
            return flag;
        },
        validateSameCondition:function () {
            var tempArr = new Array();
            var flag = false;
            var num = 0;
            $("#money_condition").find("tr:gt(0)").each(function (idx,trRow) {
                var val1 = $(trRow).find("td:eq(0) input").val();
                var val2 = $(trRow).find("td:eq(1) input").val();
                if(val1!=""&&val2!=""){
                    var temp = parseFloat(val1)+"--"+parseFloat(val2);
                    if(tempArr.indexOf(temp)>-1){
                        flag = true;
                        num = idx+1;
                        return false;
                    }else{
                        tempArr.push(temp);
                    }
                }

            });
            if(flag){
                //$("#money_condition-div").addClass("error");
                $("#money_condition").find("tr:eq("+(num)+")").find("td").find("input").addClass("error");
                page.showPopover({"currentTarget":$("#money_condition").find("tr:eq("+(num)+")")},{},"danger",window.top.message.operation_auto['第'].replace("[0]",num),true);
                return false;
            }else{
                //$("#money_condition-div").removeClass("error");
                $("#money_condition").find("tr:gt(0)").find("td").find("input").removeClass("error");
            }
            flag = false;
            var field1Arr = new Array();
            var field2Arr = new Array();
            var field3Arr = new Array();
            $("#money_condition").find("tr:gt(0)").each(function (idx,trRow) {
                var val1 = $(trRow).find("td:eq(0) input").val();
                if(val1!=null&&val1!=""&&val1!="undefined"){
                    if(field1Arr.length==0){
                        field1Arr.push(val1);
                    }else{
                        var smaller = false;
                        if(parseFloat(val1)>0){
                            for(var i=0;i<field1Arr.length;i++){
                                if(parseFloat(field1Arr[i])>=parseFloat(val1)){
                                    smaller = true;
                                    break;
                                }
                            }
                            if(smaller){
                                flag = true;
                                num = idx+1;
                                return false;
                            }else {
                                field1Arr.push(val1);
                            }
                        }else{
                            var preVal = field1Arr[field1Arr.length-1];
                            if(parseFloat(preVal)!=0){
                                flag = true;
                                num = idx+1;
                                return false;
                            }
                            field1Arr.push(val1);
                        }

                    }
                }

                var val2 = $(trRow).find("td:eq(1) input").val();
                if(val2!=null&&val2!=""&&val2!="undefined"){
                    if(field2Arr.length==0){
                        field2Arr.push(val2);
                    }else{
                        var smaller = false;
                        for(var i=0;i<field2Arr.length;i++){
                            if(parseFloat(field2Arr[i])>parseFloat(val2)){
                                smaller = true;
                                break;
                            }
                        }
                        if(smaller){
                            flag = true;
                            num = idx+1;
                            return false;
                        }else {
                            field2Arr.push(val2);
                        }
                    }
                }

            });
            if(flag){
                //$("#money_condition-div").addClass("error");
                $("#money_condition").find("tr:eq("+(num)+")").find("td").find("input").addClass("error");
                page.showPopover({"currentTarget":$("#money_condition").find("tr:eq("+(num)+")")},{},"danger",window.top.message.operation_auto['第梯度的值要大于等于前面梯度的值'].replace("[0]",num),true);
                return false;
            }else{
                $("#money_condition").find("tr:gt(0)").find("td").find("input").removeClass("error");
                //$("#money_condition-div").removeClass("error");
            }

            return true;
        },
        validAwardRule:function () {
            var awardArr= new Array();
            var num = 0;
            var flag = false;
            $("#awards_rules").find("tr:gt(0)").each(function (tridx, trItem) {
                var val1 = $(trItem).find("td:eq(0) input").val();
                if(awardArr.length==0){
                    awardArr.push(val1);
                }else{
                    var smaller = false;
                    for(var i=0;i<awardArr.length;i++){
                        if(parseFloat(awardArr[i])==parseFloat(val1)){
                            smaller = true;
                            break;
                        }
                    }
                    if(smaller){
                        flag = true;
                        num = tridx+1;
                        return false;
                    }else {
                        awardArr.push(val1);
                    }
                }
            });
            if(flag){
                $("#awards_rules").find("tr:eq("+(num)+")").find("td").find("input").addClass("error");
                var msg = window.top.message.operation['activity.money.award.amount.repeat'];//"奖项金额不能重复";
                page.showPopover({"currentTarget":$("#awards_rules").find("tr:eq("+(num)+")")},{},"danger",msg,true);
                return false;
            }else{
                $("#awards_rules").find("tr:gt(0)").find("td").find("input").removeClass("error");
            }
            return true;
        },
        validPeriod:function () {
            var flag = false;
            var num = 0;
            var emptyTime = false;
            $("#open_period").find("tr:gt(0)").each(function (tridx, trItem) {
                var total = $(trItem).find("input").length;
                var count = 0;
                $(trItem).find("input").each(function (idx, ipt) {
                    if($(ipt).val()==""){
                        count ++;
                        num = tridx;
                        flag = true;
                        return;
                    }
                });
                if(count>0 && count<total){
                    emptyTime = true;
                    return false;
                }
            });
            if(emptyTime){
                var obj = {};
                obj.currentTarget=$("#open-period-div");
                var msg = window.top.message.operation['activity.money.period.empty'];
                page.showPopover(obj,{},"danger",msg,true);
                $("#open-period-div").addClass("error");
                return false;
            }else{
                $("#open-period-div").removeClass("error");
            }
            return true;
        },
        previewMoneyContent:function () {
            $("#preview_open_period").find("tr:gt(0)").remove();
            $("#open_period").find("tr:gt(0)").each(function (idx, item) {
                var a1 = $(item).find("td:eq(0)").text();
                var ah = $(item).find("td:eq(1) input:eq(0)").val();
                if(ah<10){
                    ah = "0"+ah;
                }
                var am = $(item).find("td:eq(1) input:eq(1)").val();
                if(am<10){
                    am = "0"+am;
                }
                var bh = $(item).find("td:eq(2) input:eq(0)").val();
                if(bh<10){
                    bh = "0"+bh;
                }
                var bm = $(item).find("td:eq(2) input:eq(1)").val();
                if(bm<10){
                    bm = "0"+bm;
                }
                $("#preview_open_period").append("<tr><td>" + a1 + "</td><td>" + ah+":"+am + "</td><td>" + bh+":"+bm + "</td></tr>");
            });

            $("#preview_money_condition").find("tr:gt(0)").remove();
            var hcs = document.getElementsByName("activityRule.conditionType");
            var isCheckHas = $("[name='activityRule.conditionType']:checked").val();
            if(isCheckHas!="3"){
                if(isCheckHas=='1'){
                    $("#condition_type_1").show();
                    $("#condition_type_2").hide();
                }else if(isCheckHas=='2'){
                    $("#condition_type_1").hide();
                    $("#condition_type_2").show();
                }
                $("#preview_bet_count_div").hide();
                $("#money_condition").find("tr:gt(0)").each(function (idx, item) {
                    var a1 = $(item).find("td:eq(0) input").val();
                    var a2 = $(item).find("td:eq(1) input").val();
                    var a3 = $(item).find("td:eq(2) input").val();
                    $("#preview_money_condition").append("<tr><td>".concat(window.top.message.operation_auto['满以上'].replace("[0]",a1)).concat("</td><td>").concat(window.top.message.operation_auto['达']).concat(a2).concat("</td><td>").concat(a3).concat(window.top.message.operation_auto['次']).concat("</td></tr>"));
                });
            }else{
                $("#preview_money_condition").hide();
                $("#preview_bet_count").text($("#bet_count").val());
                $("#preview_bet_count_div").show();
            }


            $("#preview_awards_rules").find("tr:gt(0)").remove();
            $("#awards_rules").find("tr:gt(0)").each(function (idx, item) {
                var a1 = $(item).find("td:eq(0) input").val();
                var a2 = $(item).find("td:eq(1) input").val();
                var a3 = $(item).find("td:eq(2) span").text();
                var a4 = $(item).find("td:eq(3) span").text();
                var a5 = $(item).find("td:eq(4) input").val();
                var a6 = $(item).find("td:eq(5) input").val();

                var a7 = "";
                if($("#activityMessageId").val()!=""){
                    a7 =$(item).find("td:eq(6) span").text();

                }
                var trhtml = "<tr><td>"+siteCurrencySign + a1 + "</td><td>" + a2 + "个</td><td>"
                    + a3 + "个</td><td>"+siteCurrencySign +a4+ "</td><td>"+a5+"倍</td><td>"+a6+"%</td>";
                if(a7!=""){
                    trhtml += "<td>"+a7+"</td>";
                }
                trhtml += "</tr>";
                $("#preview_awards_rules").append(trhtml);
            });
            var tr = $("#total_count_table").find("tr:eq(0)").clone();
            $(tr).find("td").removeAttrs("style");
            $(tr).find("td:eq(7)").remove();
            if($("#activityMessageId").val()==""){
                $(tr).find("td:eq(6)").remove();
            }
            $("#preview_awards_rules").append(tr);

        },
        //填写金额计算总额
        awardAmountEvent:function () {
            var that = this;
            $(".award_amount").each(function (idx,item) {
                $(item).blur(function (e) {
                    that.calTotalMoneyAndCount();
                });

            });

        },
        //填写时段数计算总额
        awardCountEvent:function () {
            var that = this;
            $(".award_count").each(function (idx,item) {
                $(item).blur(function (e) {
                    that.calTotalMoneyAndCount();
                });

            });

        },
        //计算所有总额
        calTotalMoneyAndCount:function () {
            var that = this;
            $(".award_amount").each(function (ix,amountItem) {
                that.calAwardRowMoney(amountItem);
                that.calColumnAwardAmount();
            });
            that.queryRemainCount();
        },
        //计算行总额
        calAwardRowMoney:function (amountObj) {
            var awardAmount = $(amountObj).val();
            var totalAmountObj = $($(amountObj).parent().parent()).find("td:eq(3)").find("span.award_total_amount");
            var awardCount = $($(amountObj).parent().parent()).find("td:eq(1)").find("input.award_count").val();
            var totalCountObj = $($(amountObj).parent().parent()).find("td:eq(2)").find("span.award_total_count");
            if(awardAmount && awardCount){
                var periods = this.queryTotalPeriod();
                var totalCount_ = parseInt(awardCount)*periods;
                $(totalCountObj).text(totalCount_);
                var totalAmount_ = parseFloat(awardAmount)*totalCount_;
                $(totalAmountObj).text(totalAmount_);
            }
        },
        //计算列总额
        calColumnAwardAmount:function () {
            var total = parseFloat(0);
            var totalCount = parseInt(0);
            var periods = this.queryTotalPeriod();
            $(".award_amount").each(function (idx,item) {
                var amount = $(item).val();
                if(amount && !isNaN(amount)){
                    total += parseFloat(amount);
                }
            });
            $(".award_count").each(function (idx,item) {
                var count = $(item).val();
                if(count && !isNaN(count)){
                    totalCount += parseFloat(count);
                }
            });
            var totalMoney = parseFloat(0);
            $(".award_amount").each(function (ax,at) {
                var amount = $(at).val();
                if(amount && !isNaN(amount)){
                    amount = parseFloat(amount);
                    $(".award_count").each(function (cx,ct) {
                        if(ax == cx){
                            var count = $(ct).val();
                            if(count && !isNaN(count)){
                                count = parseInt(count);
                                totalMoney += (amount * count * periods);
                            }
                        }
                    })
                }


            });

            total = total.toFixed(2);
            totalMoney = totalMoney.toFixed(2);
            $("#total_count_table").find("tr:eq(0)").find("td:eq(0)").find("span").text(total);
            $("#total_count_table").find("tr:eq(0)").find("td:eq(1)").find("span").text(totalCount);
            $("#total_count_table").find("tr:eq(0)").find("td:eq(2)").find("span").text(totalCount*periods);
            $("#total_count_table").find("tr:eq(0)").find("td:eq(3)").find("span").text(totalMoney);
            $("#totalPeriods").text(periods);
        },


        //计算总期数
        queryTotalPeriod:function () {
            var st = $("[name='activityMessage.startTime']").val();
            var et = $("[name='activityMessage.endTime']").val();
            var daysBettween = this.getDateDiff(st,et,'day');
            var periods = this.getPeriodCount();
            var totalPeriods = 0;
            if(daysBettween > 0 ){
                //要算上今天的剩余时段
                if(periods >0){
                    totalPeriods = daysBettween * periods + this.getRemainPeriodCount();
                }else{
                    totalPeriods = daysBettween + 1;
                }
            }else if(daysBettween == 0){
                if(periods>0){
                    //最后一天，有时段，计算剩余时段
                    totalPeriods = this.getRemainPeriodCount();
                }else{
                    //最一天，没有时段，为1
                    totalPeriods = 1;
                }
            }
            return totalPeriods;
        },
        //如果是活动最后一天，剩余时段数
        getRemainPeriodCount:function () {
            var nowTime = new Date();
            var periodArr = this.getPeriodList();
            var remain = 0;
            if(periodArr.length>0){
                for(var i=0;i<periodArr.length;i++){
                    var tempDate = periodArr[i];
                    if(tempDate.getTime()>nowTime.getTime()){
                        remain ++;
                    }
                }
            }
            return remain;
        },
        getPeriodList:function () {
            var trlen = $("#open_period").find("tr:gt(0)").length;
            var periodArr = [];
            if(trlen>0){
                $("#open_period",this.formSelector).find("tr:gt(0)").each(function (idx, period) {
                    var sh = $(period).find("input[name^='moneyOpenPeriods']")[0].value;
                    var sm = $(period).find("input[name^='moneyOpenPeriods']")[1].value;
                    var nowTime = new Date();
                    var eh = $(period).find("input[name^='moneyOpenPeriods']")[2].value;
                    var em = $(period).find("input[name^='moneyOpenPeriods']")[3].value;
                    if(sh&&sm&&eh&&em){
                        nowTime.setHours(parseInt(eh),parseInt(em),0,0);
                        periodArr.push(nowTime);
                    }

                });
            }
            return periodArr;
        },
        //计算时段个数
        getPeriodCount:function () {
            var periodCount = this.getPeriodList().length;
            return parseInt(periodCount);
        },
        //计算活动天数
        getDateDiff:function (startTime, endTime, diffType) {
            //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
            startTime = startTime.replace(/\-/g, "/");
            endTime = endTime.replace(/\-/g, "/");

            //将计算间隔类性字符转换为小写
            diffType = diffType.toLowerCase();
            var sTime =new Date(startTime); //开始时间
            var eTime =new Date(endTime); //结束时间

            var nowTime = new Date();
            //当活动还未结束，且开始时间小于当前时间，则开始时间视为当前时间
            //如果活动已结束，则按正常计算
            if(sTime.getTime()<nowTime.getTime()&&eTime.getTime()>nowTime){
                sTime = nowTime;
            }
            //作为除数的数字
            var timeType =1;
            switch (diffType) {
                case"second":
                    timeType =1000;
                    break;
                case"minute":
                    timeType =1000*60;
                    break;
                case"hour":
                    timeType =1000*3600;
                    break;
                case"day":
                    timeType =1000*3600*24;
                    break;
                default:
                    break;
            }
            return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
        },
        
        queryRemainCount:function () {
            //$("span#award_remain_count_").text();
            var activityMessageId = $("#activityMessageId").val();
            if(!activityMessageId){
                return;
            }
            window.top.topPage.ajax({
                url: root + "/activityMoneyAwardsRules/queryAwardRemainCount.html?search.activityMessageId="+activityMessageId,
                type: "POST",
                dataType: "JSON",
                success: function (dataList) {
                    if(dataList){
                        for(var i=0;i<dataList.length;i++){
                            var data = dataList[i];
                            $("span#award_remain_count_"+data.id).text(data.singleRemainCount);
                        }
                    }
                }
            });
        }
    });
});
