/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
            $("#goOpenResult").click(function () {
                var rel=eval('(' + $('.ssc-active').data('rel') + ')');
                var type=  rel.type;
                var code=  rel.code;
                $("#mainFrame").load(root+'/lotteryResult/doPartList.html?search.code='+code+'&search.type='+type);
            })
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click", "#lotteryDiv li", function (e,opt) {
                $("#lotteryDiv li").removeClass("active");
                $(this).addClass("active");
                var datacode = $(this).attr("data-code");
                var code = $(this).attr("code");
                var type = $(this).attr("type");
                $("#searchDiv a").addClass("hide");
                $("#searchDiv a[data-rel*='"+datacode+"']").removeClass("hide");
                $("#searchDiv a[data-rel*='weikaijiang']").removeClass("hide");
                $("#searchDiv a").removeClass("ssc-active");
                $("#searchDiv a[data-rel*='"+code+"']").addClass("ssc-active");
                $("#searchDiv a[data-rel*='"+code+"']").click();
            });
        },
        queryByLottery:function (e, opt) {
            var code = opt.code;
            var type = opt.type;
            $("#updateTime").addClass("hide");
            $("[name='betorderform']").attr("action",root+"/lotteryResult/list.html");
            $("[name='result.expect']").val("");
            $("[name='result.openTime']").val("");
            $("[name='result.openingTime']").val("");
            $("[name='result.closeTime']").val("");
            $("[name='search.queryStartDate']").val("");
            $("[name='search.queryEndDate']").val("");
            var name = $(e.currentTarget).text();
            $("#lottery_type_name").text(name);

            var html = this.createOpenCode(code,type);
            $("#openNumber").html(html);

            if(code){
                $("#not-open-result-div").addClass("hide");
                if(code=='hklhc' || code=='tcpl3' || code=='fc3d'){
                    $("#query-time-div").addClass("hide");
                }else{
                    if($("[name='search.queryDate']").val()==""){
                        var date = this.setQueryDate(0);
                        $("[name='search.queryDate']").val(date);
                    }
                     $("#query-time-div").removeClass("hide");
                }
                //$("#query-time-div").removeClass("hide");
                $(".ssc-label").removeClass("ssc-active")
                $("#lotteryCode").val(code);
                $("#lotteryType").val(type);
                $("[name='result.code']").val(code);
                $("[name='result.type']").val(type);
                this.query(e,opt);
                $(e.currentTarget).addClass("ssc-active");
            }
            $(e.currentTarget).unlock();
        },
        queryResultByDate:function (e, opt) {
            var day = parseInt(opt.days);
            var date = this.setQueryDate(day);
            $("[name='search.queryDate']").val(date);
            this.query(e);
        },
        setQueryDate:function (day) {
            var myDate=new Date();
            myDate.setDate(myDate.getDate()+day);
            myDate.setHours(0);
            myDate.setMinutes(0);
            myDate.setSeconds(0);
            var fmt = dateFormat.day;
            var time = window.top.topPage.formatDateTime(myDate,fmt);
            return time;
        },
        createOpenCode:function (code,type) {
            var html="";
            if(type=='pk10'){
                for(var i=0;i<=9;i++){
                    html+='<select name="result.openCode"><option value="">--</option>'
                    for(var j=1;j<=10;j++){
                        if(j==10){
                            html +='<option value='+j+'>'+j+'</option>';
                        }else{
                            html +='<option value=0'+j+'>0'+j+'</option>';
                        }

                    }
                    html+='</select>';
                }
                $("#openNumber").attr("colspan","3");
            }else  if(type=='ssc'){
                for(var i=0;i<=4;i++){
                    html+='<select name="result.openCode"><option value="">--</option>'
                    for(var j=0;j<=9;j++){
                        html +='<option value='+j+'>'+j+'</option>';
                    }
                    html+='</select>';
                }
                $("#openNumber").attr("colspan","1.5");
            }else  if(type=='k3'){
                for(var i=0;i<=2;i++){
                    html+='<select name="result.openCode"><option value="">--</option>'
                    for(var j=1;j<=6;j++){
                        html +='<option value='+j+'>'+j+'</option>';
                    }
                    html+='</select>';
                }
                $("#openNumber").attr("colspan","1");
            }else  if(type=='lhc'){
                for(var i=0;i<=6;i++){
                    html+='<select name="result.openCode"><option value="">--</option>'
                    for(var j=1;j<=49;j++){
                        if(j>=10){
                            html +='<option value='+j+'>'+j+'</option>';
                        }else{
                            html +='<option value=0'+j+'>0'+j+'</option>';
                        }
                    }
                    html+='</select>';
                }
                $("#openNumber").attr("colspan","3");
            }else if(type=='pl3'||code=='xy28'){
                for(var i=0;i<=2;i++){
                    html+='<select name="result.openCode"><option value="">--</option>'
                    for(var j=0;j<=9;j++){
                        html +='<option value='+j+'>'+j+'</option>';
                    }
                    html+='</select>';
                }
                $("#openNumber").attr("colspan","1");
            }else if(type=='sfc') {
                for(var i=0;i<=7;i++){
                    html+='<select name="result.openCode"><option value="">--</option>'
                    for(var j=1;j<=20;j++){
                        if(j<10){
                            html +='<option value='+0+j+'>'+0+j+'</option>';
                        }else {
                            html +='<option value='+j+'>'+j+'</option>';
                        }

                    }
                    html+='</select>';
                }
                $("#openNumber").attr("colspan","3");
            }else if(type=='keno'){
                for(var i=0;i<=19;i++){
                    html+='<select name="result.openCode"><option value="">--</option>'
                    for(var j=1;j<=80;j++){
                        if(j<10){
                            html +='<option value='+0+j+'>'+0+j+'</option>';
                        }else {
                            html +='<option value='+j+'>'+j+'</option>';
                        }

                    }
                    html+='</select>';
                }
                $("#openNumber").attr("colspan","7");
            }
            return html;
        },
        doQuery:function (e, opt) {
            $("[name='search.code']").val(e.key);
            $("#not-open-result-div").removeClass("hide");
            //$("#query-time-div").addClass("hide");
            this.query(e);
        },
        queryNotOpenResult:function (e, opt) {
            // $("#lotteryCode").val("");
            // $("#lotteryType").val("");
            // $("[name='result.openingTime']").val("");
            // $("[name='result.closeTime']").val("");
            // $("[name='result.expect']").val("");
            // $("[name='result.openTime']").val("");
            // c
            // $("[name='result.type']").val("");
             $("[name='search.queryDate']").val("");
            // $("[name='search.queryStartDate']").val("");
            // $("[name='search.queryEndDate']").val("");
            // $("#lottery_type_name").text("");
            $("#query-time-div").addClass("hide");
            $("#not-open-result-div").removeClass("hide");
            $(".ssc-label").removeClass("ssc-active");
            var sela = $("#searchDiv a:visible:not(:last)");
            var codelist = new  Array();
            sela.each(function () {
               var datarel = $(this).attr("data-rel");
                var json  = eval("("+datarel+")");
                codelist.push(json.code);
            });
            // var jsonstr = JSON.stringify(codelist).replace(/"/g,'').replace('[','').replace(']','');
            var code = $("[name='result.code']").val();
            var type = $("[name='result.type']").val();

            var expect = $("[name='search.expect']").val();
            var queryStartDate = $("[name='search.queryStartDate']").val();
            var queryEndDate = $("[name='search.queryEndDate']").val();

            //search.expect search.queryStartDate search.queryEndDate

            window.top.topPage.ajax({
                type:"post",
                url:root+'/lotteryResult/queryLotteryResultNotOpen.html',
                data:{'search.code':code,'search.type':type,'search.expect':expect,'search.queryStartDate':queryStartDate,'search.queryEndDate':queryEndDate},
                success:function(data){
                     $("[name='betorderform']").attr("action",root+"/lotteryResult/queryLotteryResultNotOpen.html");
                    $(".search-list-container").html(data);
                    page.onPageLoad();
                    $(e.currentTarget).unlock();
                },
                error:function(data) {
                    $(e.currentTarget).unlock();
                }
            });
            $(e.currentTarget).addClass("ssc-active");

        },

        editSscRecord:function (e, opt) {
            var _this = this;
            var id = opt.objId;
            var data = {"search.id":id};
            window.top.topPage.ajax({
                dataType:'json',
                data:data,
                type:"post",
                url:root+'/lotteryResult/queryLotteryResult.html',
                success:function(data){
                    if(data.state&&data.result){
                        $("#updateTime").removeClass("hide");
                        $("[name='result.type']").val(data.result.type);
                        $("[name='result.code']").val(data.result.code);
                        $("[name='result.expect']").attr("readonly","readonly");
                        $("[name='result.expect']").val(data.result.expect);
                        var rot = data.openTime;
                        $("[name='result.openTime']").val(rot);
                        $("[name='result.openingTime']").val(data.openingTime);
                        $("[name='result.closeTime']").val(data.closeTime);
                        var selectHtml = _this.createOpenCode(data.result.code,data.result.type);
                        $("#openNumber").html(selectHtml);
                        var openCode = data.result.openCode;
                        if(openCode!=null&&openCode!=""&&openCode!="undefined"){
                            var type = data.result.type;
                            var codes = openCode.split(",");
                            for(var i=0;i<codes.length;i++){
                                var newNum = codes[i];
                                if(type=='lhc' || type=='pk10'){
                                    var num = parseInt(codes[i]);
                                    if(num<10){
                                        newNum = "0"+num;
                                    }
                                }
                                $($("[name='result.openCode']")[i]).val(newNum);
                            }
                        }
                        $("#lottery_type_name").text(data.lotteryName);
                    }
                    $(e.currentTarget).unlock();
                },
                error:function(data) {
                    $(e.currentTarget).unlock();
                }
            });
            $(e.currentTarget).unlock();
        },
        payout:function (e, opt) {
            var _this = this;
            var id = opt.objId;
            var data = {"search.id":id};
            window.top.topPage.ajax({
                dataType:'json',
                data:data,
                type:"post",
                url:root+'/lotteryResult/payout.html',
                success:function(data){
                    if(data.state){
                        e.page.showPopover(e,opt,"success",data.msg,true);
                    }else {
                        e.page.showPopover(e,opt,"danger",data.msg,true);
                    }
                },
                error:function(data) {
                    e.page.showPopover(e,opt,"danger",data.msg,true);
                }
            });
        },
        checkOpenTime:function (e,opt) {
            // var _e = {
            //     currentTarget:$(opt.currentTarget),
            //     page:page
            // };
            // var option = {};
            var openTime = $("#czOpenTime").val();
            var flag = false;
            window.top.topPage.ajax({
                url: root + "/lotteryResult/checkOpenTime.html",
                dataType: "json",
                async:false,
                data: {
                    'result.openTime': openTime,
                },
                success: function(data) {
                    if(data.code==1){
                        // e.page.showPopover(e,opt, 'success', data.msg, true);
                        flag = true;
                    }else{
                        e.page.showPopover(e,opt, 'danger', data.msg, true);
                        flag = false;
                    }
                }
            });
            return flag;
        }
    });
});