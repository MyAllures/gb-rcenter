/**
 * Created by tom on 15-12-8.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
            var isAllAssume = true;
            var objs = $("[name*='isAssume']");
            for(var i=0;i<objs.length;i++) {
                if (!$(objs[i]).prop("checked")) {
                    isAllAssume = false;
                }
            }
            if (isAllAssume) {
                $("[name='allApi']").prop("checked",true);
            }
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            var _this = this;
            $("[name='MinusGrad']").bind("click",_this.minusGradFn);
            $("[name='MinusSaleGrad']").bind("click",_this.minusSaleGradFn);
            $("[name='ReturnSaleGrad']").bind("click",_this.returnSaleGradFn);
            $("#AddGrad").bind("click",function(){
                var ctd = $(this).parents("tr").children("td");
                if (ctd.length==23) {
                    window.top.topPage.showWarningMessage("最多新增至20个梯度");
                    return;
                } else {
                    var $addTd = $(this).parent("td");
                    var index = $addTd.prev("td").attr("td-index");
                    // 隐藏新增按钮前一个‘剪号’图标
                    $addTd.prev("td").find("[name='MinusGrad']").parent().css("display","none");
                    // 循环克隆列对象
                    $.each($("td[td-index='"+index+"']"),function(idx,cont){
                        // 修改克隆对象“索引”属性
                        var nextIndex = parseInt(index)+1;
                        var $td = $(cont).clone();
                        $td.attr("td-index",nextIndex);
                        if (idx==0) {
                            // 第一个对象是头td ; 修改name 和 value 的属性值
                            $.each($td.find("input"),function(i,obj) {
                                $td.find("input:eq("+i+")").val(parseInt($(obj).val())+100);
                                var $inputName = $(obj).attr("name");
                                var replaceName = $inputName.substring(0,$inputName.indexOf("[")+1)+nextIndex+$inputName.substr($inputName.indexOf("]"));
                                $td.find("input:eq("+i+")").attr("name",replaceName);
                            });
                        } else {
                            // 梯度的input
                            $.each($td.find("input"),function(i,obj) {
                                var $name = $(obj).attr("name");
                                // var replaceKey = $inputKey.substring(0,$inputKey.lastIndexOf("_")+1)+nextIndex;
                                var replaceName = $name.replace("["+index+"].ratio","["+nextIndex+"].ratio")
                                $td.find("input:eq("+i+")").attr("name",replaceName);
                            });
                        }
                        $(cont).next("td").before($td);
                    });
                    var colspanlen = $("td[name='AddGrad']").attr("colspan");
                    $("td[name='AddGrad']").attr("colspan",parseInt(colspanlen)+1);
                    $addTd.prev("td").find("[name='MinusGrad']").parent().css("display","");
                    $addTd.prev("td").find("[name='MinusGrad']").bind("click",_this.minusGradFn);
                }
            });

            $("button[name='AddMinusSale']").bind("click",function(){
                var ctd = $(this).parents("tr").children("td");
                if (ctd.length==21) {
                    window.top.topPage.showWarningMessage("最多新增至20个梯度");
                    return;
                } else {
                    var $addTd = $(this).parent("td");
                    var index = $addTd.prev("td").attr("td-minus-index");
                    // ‘剪号’图标表示隐藏
                    $addTd.prev("td").find("[name='MinusSaleGrad']").parent().css("display","none");
                    // 循环克隆列对象
                    $.each($("td[td-minus-index='"+index+"']"),function(idx,cont){
                        // 修改克隆对象“索引”属性
                        var nextIndex = parseInt(index)+1;
                        var $td = $(cont).clone();
                        $td.attr("td-minus-index",nextIndex);
                        $td.find("input").val();
                        var $inputName = $td.find("input").attr("name");
                        var replaceName = $inputName.substring(0,$inputName.indexOf("[")+1)+nextIndex+$inputName.substr($inputName.indexOf("]"));
                        $td.find("input").attr("name",replaceName);
                        $(cont).next("td").before($td);
                    });
                    $addTd.prev("td").find("[name='MinusSaleGrad']").parent().css("display","");
                    $addTd.prev("td").find("[name='MinusSaleGrad']").bind("click",_this.minusSaleGradFn);
                }
            });

            $("button[name='AddReturnSale']").bind("click",function(){
                var ctd = $(this).parents("tr").children("td");
                if (ctd.length==21) {
                    window.top.topPage.showWarningMessage("最多新增至20个梯度");
                    return;
                } else {
                    var $addTd = $(this).parent("td");
                    var index = $addTd.prev("td").attr("td-return-index");
                    // ‘剪号’图标表示隐藏
                    $addTd.prev("td").find("[name='ReturnSaleGrad']").parent().css("display","none");
                    // 循环克隆列对象
                    $.each($("td[td-return-index='"+index+"']"),function(idx,cont){
                        // 修改克隆对象“索引”属性
                        var nextIndex = parseInt(index)+1;
                        var $td = $(cont).clone();
                        $td.attr("td-return-index",nextIndex);
                        $td.find("input").val();
                        var $inputName = $td.find("input").attr("name");
                        var replaceName = $inputName.substring(0,$inputName.indexOf("[")+1)+nextIndex+$inputName.substr($inputName.indexOf("]"));
                        $td.find("input").attr("name",replaceName);
                        $(cont).next("td").before($td);
                    });
                    $addTd.prev("td").find("[name='ReturnSaleGrad']").parent().css("display","");
                    $addTd.prev("td").find("[name='ReturnSaleGrad']").bind("click",_this.returnSaleGradFn);
                }
            });

            $("[name='minusType']").bind("click",function(){
                if ($(this).is(":checked")) {
                    $("[name*='minusFavourableGradsList']").removeAttr("readonly");
                    //$("[name*='minusPercentFavourableGradsList']").removeAttr("readonly");
                    $("[name='minusFavourable.favourableType']").val("1");
                } else {
                    $("[name*='minusFavourableGradsList']").attr("readonly",true);
                    //$("[name*='minusPercentFavourableGradsList']").attr("readonly",true);
                    $("[name='minusFavourable.favourableType']").val('');
                    $("[name*='minusFavourableGradsList']").val('');
                    //$("[name*='minusPercentFavourableGradsList']").val('');
                }
            });

            $("[name='returnType']").bind("click",function(){
                if ($(this).is(":checked")) {
                    $("[name*='returnFavourableGradsList']").removeAttr("readonly");
                    $("[name='returnFavourable.favourableLimit']").removeAttr("readonly");
                    $("[name='returnFavourable.favourableType']").val("2");
                } else {
                    $("[name*='returnFavourableGradsList']").attr("readonly",true);
                    $("[name*='returnFavourableGradsList']").val('');
                    $("[name='returnFavourable.favourableLimit']").attr("readonly",true);
                    $("[name='returnFavourable.favourableLimit']").val('');
                    $("[name='returnFavourable.favourableType']").val('');
                }
            });

            $("input[type='checkbox'][name^='contractApiList']").bind("click",function(){
                if ($(this).is(":checked")) {
                    $(this).val("true");
                } else {
                    $(this).val("false");
                }
            });

            $("[name='allApi']").bind("click",function(){
                if ($(this).is(":checked")) {
                    $.each($("input[type='checkbox'][name^='contractApiList']"),function(i,obj){
                        if (!$(obj).is(":checked")) {
                            $(obj).trigger("click");
                        }
                    })
                } else {
                    $.each($("input[type='checkbox'][name^='contractApiList']"),function(i,obj){
                        if ($(obj).is(":checked")) {
                            $(obj).trigger("click");
                        }
                    })
                }
            });

            $("[name='minusFavourable.favourableWay']").bind("click",function(){
                var wayValue = $(this).val();
                if (wayValue=='1') {
                    /*$("#returnMinusValue").css("display","block");
                    $("#returnMinusValue").attr("disabled","false");
                    $("#returnMinusPercentValue").css("display","none");
                    $("#returnMinusPercentValue").attr("disabled","true");*/
                    $("p.minusFavourable").html("");
                    $("#minusTip").hide();
                } else {
                    /*$("#returnMinusValue").css("display","none");
                    $("#returnMinusValue").attr("disabled","true");
                    $("#returnMinusPercentValue").css("display","block");
                    $("#returnMinusPercentValue").attr("disabled","false");*/
                    $("p.minusFavourable").html("%");
                    $("#minusTip").show();
                }
            });

            $("[name='returnFavourable.favourableWay']").bind("click",function(){
                var wayValue = $(this).val();
                if (wayValue=='1') {
                    $("p.returnFavourable").html("");
                    $("#div_limit").hide();
                    $("[name='returnFavourable.favourableLimit']").val('');
                } else {
                    $("p.returnFavourable").html("%");
                    $("#div_limit").show();
                }
            });

        },

        minusGradFn:function(e){
            var index;
            var ctd = $(this).parents("tr").children("td");
            if (ctd.length==4) {
                window.top.topPage.showWarningMessage("第一个梯度不可删除");
                return;
            } else {
                $(this).parents("td").prev("td").find("[name='MinusGrad']").parent().css("display","");
                index = $(this).parents("td").attr("td-index");
            }
            $(this).parents("tbody").find("td[td-index='"+index+"']").remove();
        },

        minusSaleGradFn:function(e) {
            var index;
            var ctd = $(this).parents("tr").children("td");
            if (ctd.length==2) {
                window.top.topPage.showWarningMessage("第一个梯度不可删除");
                return;
            } else {
                $(this).parents("td").prev("td").find("[name='MinusSaleGrad']").parent().css("display","");
                index = $(this).parents("td").attr("td-minus-index");
            }
            $(this).parents("tbody").find("td[td-minus-index='"+index+"']").remove();
        },

        returnSaleGradFn:function(e) {
            var index;
            var ctd = $(this).parents("tr").children("td");
            if (ctd.length==2) {
                window.top.topPage.showWarningMessage("第一个梯度不可删除");
                return;
            } else {
                $(this).parents("td").prev("td").find("[name='ReturnSaleGrad']").parent().css("display","");
                index = $(this).parents("td").attr("td-return-index");
            }
            $(this).parents("tbody").find("td[td-return-index='"+index+"']").remove();
        },

        onPageLoad: function () {
            this._super();
            if ($("[name='minusType']").is(":checked")) {
                $("[name*='minusFavourableGradsList']").removeAttr("readonly");
                //$("[name*='minusPercentFavourableGradsList']").removeAttr("readonly");
            } else {
                $("[name*='minusFavourableGradsList']").attr("readonly",true);
                //$("[name*='minusPercentFavourableGradsList']").attr("readonly",true);
            }
            if ($("[name='returnType']").is(":checked")) {
                $("[name*='returnFavourableGradsList']").removeAttr("readonly");
            } else {
                $("[name*='returnFavourableGradsList']").attr("readonly",true);
                $("[name='returnFavourable.favourableLimit']").attr("readonly",true);
            }
            $.each($("input[type='checkbox'][name^='contractApiList']"),function(i,obj){
                if ($(obj).is(":checked")) {
                    $(obj).val("true");
                } else {
                    $(obj).val("false");
                }
            })
        },

        preview:function(e,option) {
            var _this=this;
            window.top.topPage.ajax({
                url : root + "/vContractScheme/preview.html",
                type : "post",
                cache : false,
                loading: true,
                data:window.top.topPage.getCurrentFormData(e),
                success: function (data) {
                    $("[name='content']").css("display","none");
                    $("#editForm").append(data);
                    $('.help-popover',_this.formSelector).popover();
                },
                error : function(err) {
                    console.info(err);
                    window.top.topPage.showErrorMessage(err);
                }
            });
            $(e.currentTarget).unlock();
        },

        returnEdit:function(e,option) {
            $("[name='content']").css("display","");
            $("[name='preview']").remove();
            $(e.currentTarget).unlock();
        },

        queryList:function(e,option) {
            $("#mainFrame").load(root+"/vContractScheme/list.html");
        },

        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        _validateForm: function(e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            var valid = !$form.valid || $form.valid();
            if (valid) {
                $.each($("#head").find("input[type='text']"),function(index,ele){
                    var ary = [];
                    ary[index] = ele;
                    if (index!=0) {
                        var minusNum = parseFloat($(ele).val())-parseFloat($(ary[index-1]).val());
                        if (minusNum<0) {
                            $(ele).addClass("error");
                            valid = false;
                            $(ary[index-1]).formtip(window.top.message.platform['nextgrad.morethan.pregrad']);
                        }
                    }
                });
                $.each($("#minusSaleHead").find("input[type='text']"),function(index,ele){
                    var ary = [];
                    ary[index] = ele;
                    if (index!=0) {
                        var minusNum = parseFloat($(ele).val())-parseFloat($(ary[index-1]).val());
                        if (minusNum<0) {
                            $(ele).addClass("error");
                            valid = false;
                            $(ary[index]).formtip(window.top.message.platform['nextgrad.morethan.pregrad']);
                        }
                    } else {
                        var needMore = parseFloat($(ele).val())*10000-parseFloat($("[name='result.ensureConsume']").val());
                        if (needMore<0) {
                            $(ele).addClass("error");
                            valid = false;
                            $(ary[index]).formtip(window.top.message.platform['firstgrad.morethan.ensureConsume']);
                        }
                    }
                });
                $.each($("#returnSaleHead").find("input[type='text']"),function(index,ele){
                    var ary = [];
                    ary[index] = ele;
                    if (index!=0) {
                        var minusNum = parseFloat($(ele).val())-parseFloat($(ary[index-1]).val());
                        if (minusNum<0) {
                            $(ary[index]).addClass("error");
                            valid = false;
                            $(ary[index]).formtip(window.top.message.platform['nextgrad.morethan.pregrad']);
                        }
                    } else {
                        var needMore = parseFloat($(ele).val())*10000-parseFloat($("[name='result.ensureConsume']").val());
                        if (needMore<0) {
                            $(ele).addClass("error");
                            valid = false;
                            $(ary[index]).formtip(window.top.message.platform['firstgrad.morethan.ensureConsume']);
                        }
                    };
                });
                if ($("[name='minusFavourable.favourableWay']:checked").val()=='2') {
                    $.each($("#returnMinusValue").find("input[type='text']"),function(index,ele){
                        if (!($(ele).val()>=0 && $(ele).val()<=100)) {
                            $(ele).addClass("error");
                            valid = false;
                            $(ele).formtip(window.top.message.platform['sale.value.percent.limit']);
                        }
                    })
                };
                if ($("[name='returnFavourable.favourableWay']:checked").val()=='2') {
                    $.each($("#returnSaleValue").find("input[type='text']"),function(index,ele){
                        if (!($(ele).val()>=0 && $(ele).val()<=100)) {
                            $(ele).addClass("error");
                            valid = false;
                            $(ele).formtip(window.top.message.platform['sale.value.percent.limit']);
                        }
                    })
                }
            }
            return valid;
        }
    });
});