/**
 * Created by fei on 16-7-6.
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function (e) {
            this.formSelector = "form";
            this._super();
            var obj = {currentTarget: $(".queryAnalyze")};
            this.query(obj);
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $(".help-popover").popover('destroy');
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                width:"200px",
                html: true
            });
        },
        bindEvent: function () {
            this._super();
            var _this=this;
            $(this.formSelector).on("keyup","input", function () {
                var val = $(this).val();
                $(this).val(val.trim());
            });

            //$(this.formSelector).on("mouseleave",".searchToday", function () {
            //    var val = $("#staticEnd").text();
            //    $(this).text(val);
            //});
            //$(this.formSelector).on("mouseenter",".searchToday", function () {
            //    $(this).text(window.top.message.analyze_auto['今日分析']);
            //});
        },
        //重置输入框
        refreshInput : function (e) {
            $("#searchDiv",this.formSelector).find("input").val("");
            $(e.currentTarget).unlock();
        },
        //获取有效交易量
        effectivePlayerCount: function (event,option) {
            $(event.currentTarget).text(window.top.message.analyze_auto['分析中']);
            var value = $(event.currentTarget).parent().attr("data-value");
            var json = this.getCurrentFormData(event);
            json=json+value;
            window.top.topPage.ajax({
                //loading:true,
                url:root+"/analyzePlayer/effectivePlayerCount.html",
                type:"post",
                data:json,
                success:function(data){
                    $(event.currentTarget).prev().text(data);
                    $(event.currentTarget).text(window.top.message.analyze_auto['分析']);
                    $(event.currentTarget).unlock();
                },
                error:function(data, state, msg){
                }
            });
        },
        //获取当前页有效交易量
        effectivePlayerCountAll: function (event,option) {
            $(".analyzeButton").click();
            $(event.currentTarget).unlock();
        },
        //重置输入框
        staticToday : function (event,option) {
            window.top.topPage.ajax({
                //loading:true,
                url:root+"/analyzePlayer/staticToday.html",
                type:"post",
                data:"",
                success:function(data){
                    var staticEnd = $("#staticEnd").text();
                    $(event.currentTarget).unlock();
                    if(staticEnd == data){
                        page.showPopover(event, {}, 'fail', window.top.message.analyze_auto['分析间隔不能小于10分钟'], true);
                    }else{
                        page.showPopover(event, {}, 'success', window.top.message.analyze_auto['分析成功'], true);
                        $("#staticEnd,#searchToday").text(data);
                    }
                },
                error:function(data, state, msg){
                    $(event.currentTarget).unlock();
                }
            });
        },
    });
});