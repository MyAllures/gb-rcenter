//模板页面
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        maxRange:10,

        init: function (title) {
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
            //$("#levels").click(function(){
            //    $("#playerRank input[type='checkbox']").prop('checked',$(this).prop('checked'));
            //})
        },

        /**
         * 活动规则页面下一步按钮
         * @param e
         */
        activityRuleNext:function(e) {
            var url = root+'/operation/activity/activityPreview.html';
            var data = window.top.topPage.getCurrentFormData(e);
            window.top.topPage.ajax({
                type: "POST",
                data:data,
                url: url,
                success: function(data) {
                    $("#mainFrame").html(data);
                    $(e.currentTarget).unlock();
                },
                error: function(data) {

                }
            });
        },

        /**
         * 活动规则页面上一步按钮
         * @param e
         */
        //activityRulePre:function(e) {
        //    var url = root+'/operation/activity/activityRulePre.html';
        //    var data = window.top.topPage.getCurrentFormData(e);
        //    window.top.topPage.ajax({
        //        type: "POST",
        //        data:data,
        //        url: url,
        //        success: function(data) {
        //            $("#mainFrame").html(data);
        //        },
        //        error: function(data) {
        //
        //        }
        //    });
        //},

        /**
         * 活动规则页面下一步
         * @param e
         */
        //activityRuleNext:function(e) {
        //    $("#step2").hide();
        //    $("#step3").show();
        //    //预览界面赋值
        //    $("#previewCode").text($("#name").val()+'-'+$("#introduce").val());//活动类型
        //    $("#previewPAL").text($("#rulePAL").val());//赠送彩金上限
        //
        //    //if($("#previewRank").text() == "") {
        //    $("#previewRank").remove();
        //    $("#rank").append('<div class="col-sm-5" id="previewRank"></div>');
        //    $("[name='activityRule.rank']:checked").each(function () {//参与层级
        //        $("#previewRank").append($(this).val() + ',');
        //    })
        //    //}
        //
        //    if($("[name='activityMessage.isDisplay']:checked").val() == 'true') {//前端展示
        //        $("#previewDisplay").text(window.top.message.operation_auto['展示']);
        //    } else {
        //        $("#previewDisplay").text(window.top.message.operation_auto['不展示']);
        //    }
        //    $("#previewActivityClass").text($("[name='activityMessage.activityClassifyKey']").val());// 活动分类
        //    $("#previewActivityTime").text($("[name='activityMessage.startTime']").val()+'-'+$("[name='activityMessage.endTime']").val());// 活动时间
        //
        //    // 活动名称，图片，内容
        //    for(i=0;i<languageCounts;i++) {
        //        $("#previewActivityName"+i).text($("[name='activityMessageI18ns["+i+"].activityName']").val());
        //        //$("#previewImg"+i +' '+ "img").attr("src",$("#tab"+i +' '+ "img").attr("src"));
        //        //$("#previewImg"+i).append(($("#tab"+i +' '+ "img")[0]));
        //        //$("#previewImg"+i).append(($("#tab"+i +' '+ "img")[0]));
        //        $("#previewActivityDesc"+i).html($("[name='activityMessageI18ns["+i+"].activityDescription']").val());
        //    }
        //    $(e.currentTarget).unlock();
        //},

        /**
         * 活动预览上一步
         * @param e
         */
        activityPreviewPre:function(e) {
            $("#step3").hide();
            $("#step2").show();
            $(e.currentTarget).unlock();
        },


        /**
         * 新增活动规则和优惠
         * @param e
         * @param option
         */
        addActivityRule: function (e, option) {
            var _tr_len = $("tr").length-2;
            var canCreate = _tr_len < this.maxRange;
            if( canCreate ){
                /*tr clone*/
                var _tr = $("tr:eq(2)").clone(true);
                _tr.find("button").removeClass("disabled")
                $("tr:last").after(_tr);
            }else{
                var _message = window.top.message.operation_auto['最多10个区间'];
                window.top.topPage.showInfoMessage(_message);
            }
            $(e.currentTarget).unlock();
        },

        /**
         * 删除优惠条件
         * @param e
         * @param option
         */
        deleteActivityRule: function (e, option) {
            //$(e.currentTarget).parent().parent().remove();
            $(event.target).closest('tr').remove();
            $(event.currentTarget).unlock();
        },

        /**
         * 赠送彩金上限
         * @param event
         * @param option
         */
        changeRatio:function(event,option) {

            var pal = Number.parseInt(Number($("#rulePAL").val()));

            if(option.post=='add') {
                pal +=1;
            }

            if(option.post=='sub') {
                if(pal==0) {
                    $("#rulePAL").val(pal);
                } else {
                    pal -=1;
                }
            }
            $("#rulePAL").val(pal);
            $(event.currentTarget).unlock();
        }

        //getSelectLevels:function(e,option)
        //{
        //    var checkedItems = [],counter = 0;
        //    $("#playerRank input[type=checkbox]").each(function(node,obj) {
        //        if(obj.checked) {
        //            checkedItems[counter] = obj.value;
        //            counter++;
        //        }
        //    });
        //    return checkedItems;
        //},
    });
});