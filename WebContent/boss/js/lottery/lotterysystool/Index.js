/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $("body").on("click","ul.dropdown-menu li", function (e) {
                $(this).parent().parent().removeClass("open")
            });

        },
        onPageLoad: function () {
            this._super();

            this.unInitSwitch($('input[type=checkbox][name=my-checkbox]')).bootstrapSwitch({

                onText: "开",
                offText: "关",
                onSwitchChange: function (e, state) {

                    var _target = e.currentTarget;
                    var msg="关闭后, 当前站点配置的彩票状态非正常，不能跳转彩票页面，确认关闭吗？";

                    if (!$(_target).attr("isChanged")&&!state) {

                        var okLabel = window.top.message.setting['common.ok'];
                        var cancelLabel = window.top.message.setting['common.cancel'];
                        window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                            if (confirm && !$(_target).attr("isChanged")) {
                                window.top.topPage.ajax({
                                    url: root + '/lotterySysTool/lotteryMaintain.html',
                                    dataType: "json",
                                    data: {"state":false},
                                    success: function (data) {
                                        if(!data.state){
                                            page.showPopover(event,option,"danger",data.msg,true);
                                            return;
                                        }
                                        $(_target).attr("isChanged", true);
                                        $(_target).bootstrapSwitch("state", !_target.checked);
                                    }
                                });
                            }
                        });

                    }else if(!$(_target).attr("isChanged")&&state) {

                        window.top.topPage.ajax({
                            url: root + '/lotterySysTool/lotteryMaintain.html',
                            dataType: "json",
                            data: {"state":true},
                            success: function (data) {
                                if(!data.state){
                                    page.showPopover(event,option,"danger",data.msg,true);
                                }
                            }
                        });
                        return true;

                    } else if($(_target).attr("isChanged")){
                        $(_target).removeAttr("isChanged");
                        return true;
                    }
                    return false;

                }
            });

        },

        checkRevokeParam : function(formobj,event,option){
            var code = $(formobj).find("input[name='search.code']").val();
            var expect = $(formobj).find("input[name='search.expect']").val();
            var siteId = $(formobj).find("input[name='search.siteId']").val();
            if (code == ''){
                page.showPopover(event,option,"danger","彩种不能选择为空",true);
                return true;
            }if (expect == ''){
                page.showPopover(event,option,"danger","期号不能为空",true);
                return true;
            }
            if(isNaN(Number(expect))){
                page.showPopover(event,option,"danger","期号格式错误",true);
                return true;
            }if(siteId != '' && (isNaN(Number(siteId)) || !(Number(siteId)%1 === 0))){
                page.showPopover(event,option,"danger","站点id格式错误",true);
                return true;
            }
            return false;
        },
        cancelNoPayoutOrder: function (event,option) {
            var formobj =  $("#noPayoutOrderCancleForm")[0];
            if(this.checkRevokeParam(formobj,event,option)){
                return;
            }
            var _this = this;
            var codename = $(formobj).find("span[prompt='prompt']").text();//彩种名称
            var expect = $(formobj).find("input[name='search.expect']").val();
            var siteId = $(formobj).find("input[name='search.siteId']").val();
            var context = '';
            if (siteId == ''){
                context = "您将对"+codename+","+expect+"期的所有未结算注单进行撤单,是否确认执行?";
            }else {
                context = "您将对"+siteId+"站点,"+codename+","+expect+"期的所有未结算注单进行撤单,是否确认执行?";
            }
            window.top.topPage.showConfirmMessage(context, function (confirm) {
                if (confirm) {
                    _this.query(event,option,formobj,null);
                } else {
                    $(event.currentTarget).unlock()
                }
            });


        },
        cancelPayoutOrder: function (event,option) {
            var formobj =  $("#payoutOrderCancleForm")[0];
            if(this.checkRevokeParam(formobj,event,option)){
                return;
            }
            var _this = this;
            var codename = $(formobj).find("span[prompt='prompt']").text();//彩种名称
            var expect = $(formobj).find("input[name='search.expect']").val();
            var siteId = $(formobj).find("input[name='search.siteId']").val();
            var context = '';
            if (siteId == ''){
                context = "您将对"+codename+","+expect+"期的所有已结算注单进行撤销,是否确认执行?";
            }else {
                context = "您将对"+siteId+"站点,"+codename+","+expect+"期的所有已结算注单进行撤销,是否确认执行?";
            }
            window.top.topPage.showConfirmMessage(context, function (confirm) {
                if (confirm) {
                    _this.query(event,option,formobj,null);
                } else {
                    $(event.currentTarget).unlock()
                }
            });


        },
        /**
         * 补采
         * @param event
         * @param option
         */
        collectOpenCode: function (event,option) {

            var form = $("#collectOpenCodeForm");
            var date = form.find("input").val();
            var code = null;
            var codeName = form.find("span[prompt='prompt']").text();//彩种名称
            var context = "您将采集 "+codeName + ", "+date+"的所有已开奖号码";
            if(codeName=="请选择" || !date){
                page.showPopover(event,option,"danger","请选择彩种和日期",true);
                return;
            }

            $("#lotteryList li a").each(function(i){
                if($(this).text()==codeName){
                    code = $(this).attr("key");
                    return;
                }
            });

            window.top.topPage.showConfirmMessage(context, function (confirm) {

                if (confirm) {

                    window.top.topPage.ajax({
                        url: root + '/lotterySysTool/collectOpenCode.html',
                        dataType: "json",
                        data: {"result.code":code,"result.date":date},
                        success: function (data) {
                            if(data.state){
                                page.showPopover(event,option,"success","采集成功!",true);
                            }else {
                                page.showPopover(event,option,"danger",data.msg,true);
                            }
                        }
                    });
                }else{
                    $(event.currentTarget).unlock();
                }
            });
        },

        payout:function (e,option) {
            $("#opencode").val("");
            var formobj =  $("#payoutForm")[0];
            var code = $(formobj).find("input[name='result.code']").val();
            var expect = $(formobj).find("input[name='result.expect']").val();
            var siteId = $(formobj).find("input[name='siteId']").val();
            var codename = $(formobj).find("span[prompt='prompt']").text();//彩种名称
            var btnOption = {};
            var type=1;
            if (code == ''){
                e.page.showPopover(e,btnOption,"danger","彩种不能选择为空!",true);
                return;
            }
            if (expect == ''){
                e.page.showPopover(e,btnOption,"danger","期号不能为空!",true);
                return;
            }if(siteId != '' && (isNaN(Number(siteId)) || !(Number(siteId)%1 === 0))){
                e.page.showPopover(e,option,"danger","站点id格式错误",true);
                return;
            }
            var _this = this;
            window.top.topPage.ajax({
                dataType:'json',
                async:false,
                type:"post",
                data:{'code':code,'expect':expect},
                url:root+'/lotterySysTool/searchOpenCode.html',
                success:function (data) {

                    if (data.status){
                        $("#opencode").val(data.msg);
                        $("#opencode").attr("title",data.msg);
                        if (siteId == ''){
                            window.top.topPage.showConfirmMessage("你将对"+codename+"彩种"+expect+"期全平台所有未结算的注单进行手动派彩,是否确认执行?",function (bol) {
                                if(bol){
                                var formbj = $("#payoutForm")[0];
                                    _this.query1(e,option,formbj,null,type);
                                }else{
                                    $(e.currentTarget).unlock()
                                }
                            });
                        }else {
                            window.top.topPage.showConfirmMessage("你将对"+siteId+"站点"+codename+"彩种"+expect+"期所有未结算的注单进行手动派彩,是否确认执行?",function (bol) {
                                if(bol){
                                var formbj = $("#payoutForm")[0];
                                    _this.query1(e,option,formbj,null,type);
                                }else{
                                    $(e.currentTarget).unlock()
                                }
                            });
                        }

                    }else{
                        e.page.showPopover(e,btnOption,"danger",data.msg,true);
                    }

                }
            });
        },

        heavy:function (e,option) {
            $("#opencode1").val("");
            var formobj =  $("#heavyForm")[0];
            var code = $(formobj).find("input[name='result.code']").val();
            var expect = $(formobj).find("input[name='result.expect']").val();
            var siteId = $(formobj).find("input[name='siteId']").val();
            var btnOption = {};
            var codename = $(formobj).find("span[prompt='prompt']").text();//彩种名称
            var type=2;
            if (code == ''){
                e.page.showPopover(e,btnOption,"danger","彩种不能选择为空",true);
                return;
            }
            if (expect == ''){
                e.page.showPopover(e,btnOption,"danger","期号不能为空",true);
                return;
            }if(siteId != '' && (isNaN(Number(siteId)) || !(Number(siteId)%1 === 0))){
                e.page.showPopover(e,option,"danger","站点id格式错误",true);
                return;
            }
            var _this = this;
            window.top.topPage.ajax({
                dataType:'json',
                async:false,
                type:"post",
                data:{'code':code,'expect':expect,'siteId':siteId,'payoutSource':2},
                url:root+'/lotterySysTool/searchOpenCode.html',
                success:function (data) {

                    if (data.status){
                        $("#opencode1").val(data.msg);
                        $("#opencode1").attr("title",data.msg);
                        if (siteId == ''){
                            window.top.topPage.showConfirmMessage("你将对"+codename+"彩种"+expect+"期全平台所有注单进行重新结算,此操作可能导致玩家钱包余额为负数,是否确认执行?",function(bol) {
                                if (bol) {
                                var formbj = $("#heavyForm")[0];
                                    _this.query1(e, option, formbj, null, type);
                                }else{
                                    $(e.currentTarget).unlock()
                                }
                            });
                        }else {
                            window.top.topPage.showConfirmMessage("你将对"+siteId+"站点"+codename+"彩种"+expect+"期所有注单进行重新结算,此操作可能导致玩家钱包余额为负数,是否确认执行?",function (bol) {
                                if(bol){
                                var formbj = $("#heavyForm")[0];
                                    _this.query1(e,option,formbj,null,type);
                                }else{
                                    $(e.currentTarget).unlock()
                                }
                            });
                        }
                    }else{
                        e.page.showPopover(e,btnOption,"danger",data.msg,true);
                    }

                }
            })
        },
        query : function(event,option,formobj,callback) {
                window.top.topPage.ajax({
                    loading:true,
                    url:formobj.action,
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:$(formobj).serialize(),
                    success:function(data){
                        var obj = eval("("+data+")");
                        if (obj.state){
                            page.showPopover(event,option,"success",obj.msg,true);
                        }else{
                            page.showPopover(event,option,"danger",obj.msg,true);
                        }
                        if (callback != null){
                            eval("(" + callback + ")");
                        }

                        // var $result=$(".search-list-container",$form);
                        // $result.html(data);
                        // event.page.onPageLoad();
                        // event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()
                    },
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});

        },
        query1 : function(e,option,formobj,callback,type) {
            var url="/lotterySysTool/payout.html";
            if(type==2){
                url ="/lotterySysTool/heavy.html";
            }
            window.top.topPage.ajax({
                loading:true,
                url:root+url,
                headers: {
                    "Soul-Requested-With":"XMLHttpRequest"
                },
                type:"post",
                data:$(formobj).serialize(),
                success:function(data){
                    var obj = eval("("+data+")");
                    if (obj.state){
                        e.page.showPopover(e,option,"success",obj.msg,true);
                    }else{
                        e.page.showPopover(e,option,"danger",obj.msg,true);
                    }
                    if (callback != null){
                        eval("(" + callback + ")");
                    }
                    $(e.currentTarget).unlock()
                },
                error:function(data, state, msg){
                    window.top.topPage.showErrorMessage(data.responseText);
                }});

        }

    });
});