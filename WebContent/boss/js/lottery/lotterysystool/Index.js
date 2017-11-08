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
        _this:null,
        init: function () {
            this._super();
             _this = this;
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

                onText: window.top.message.content['floatPic.display.on'],
                offText: window.top.message.content['floatPic.display.off'],
                onSwitchChange: function (e, state) {

                    var _target = e.currentTarget;
                    var msg="关闭后, 当前站点配置的彩票状态非正常，不能跳转彩票页面，确认关闭吗？";

                    if (!$(_target).attr("isChanged")&&!state) {

                        window.top.topPage.ajax({
                            url: root + '/lotterySysTool/lotteryMaintain.html',
                            dataType: "json",
                            data: {"state":true},
                            success: function (data) {
                            }
                        });
                        return true;

                    }else if(!$(_target).attr("isChanged")&&state) {

                        var okLabel = window.top.message.setting['common.ok'];
                        var cancelLabel = window.top.message.setting['common.cancel'];
                        window.top.topPage.showConfirmDynamic(window.top.message.common['msg'], msg, okLabel, cancelLabel, function (confirm) {
                            if (confirm && !$(_target).attr("isChanged")) {
                                window.top.topPage.ajax({
                                    url: root + '/lotterySysTool/lotteryMaintain.html',
                                    dataType: "json",
                                    data: {"state":false},
                                    success: function (data) {
                                        $(_target).attr("isChanged", true);
                                        $(_target).bootstrapSwitch("state", !_target.checked);
                                    }
                                });
                            }
                        })

                    } else if($(_target).attr("isChanged")){
                        $(_target).removeAttr("isChanged");
                        return true;
                    }
                    return false;

                }
            });

        },
        cancelNoPayoutOrder: function (event,option) {
            var formobj =  $("#noPayoutOrderCancleForm")[0];
            var codename = $(formobj).find("span[prompt='prompt']").text();//彩种名称
            var code = $(formobj).find("input[name='search.code']").val();
            var expect = $(formobj).find("input[name='search.expect']").val();
            var siteId = $(formobj).find("input[name='search.siteId']").val();
            if (code == ''){
                page.showPopover(event,option,"danger","彩种不能选择为空",true);
                return;
            }
            if (expect == ''){
                page.showPopover(event,option,"danger","期号不能为空",true);
                return;
            }
            var context = '';
            if (siteId == ''){
                context = "您将对"+codename+expect+"期的所有未结算注单进行撤销,是否确认执行";
            }else {
                context = "您将对站点"+siteId+codename+expect+"期的所有未结算注单进行撤销,是否确认执行";
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
            var codename = $(formobj).find("span[prompt='prompt']").text();//彩种名称
            var code = $(formobj).find("input[name='search.code']").val();
            var expect = $(formobj).find("input[name='search.expect']").val();
            var siteId = $(formobj).find("input[name='search.siteId']").val();
            if (code == ''){
                page.showPopover(event,option,"danger","彩种不能选择为空",true);
                return;
            }
            if (expect == ''){
                page.showPopover(event,option,"danger","期号不能为空",true);
                return;
            }
            var context = '';
            if (siteId == ''){
                context = "您将对"+codename+expect+"期的所有已结算注单进行撤销,是否确认执行";
            }else {
                context = "您将对站点"+siteId+codename+expect+"期的所有已结算注单进行撤销,是否确认执行";
            }
            window.top.topPage.showConfirmMessage(context, function (confirm) {
                if (confirm) {
                    _this.query(event,option,formobj,null);
                } else {
                    $(event.currentTarget).unlock()
                }
            });


        },

        gatherOpenCode: function (event,option) {

            var form = $("#gatherOpenCodeForm");
            var date = form.find("input").val();
            var code = null;
            var codeName = form.find("span[prompt='prompt']").text();//彩种名称
            var context = "您将采集 "+codeName + " "+date+"的所有已开奖号码";

            $("#lotteryList li a").each(function(i){
                if($(this).text()==codeName){
                    code = $(this).attr("key");
                    return;
                }
            });

            window.top.topPage.showConfirmMessage(context, function (confirm) {
                if (confirm) {

                    window.top.topPage.ajax({
                        url: root + '/lotterySysTool/gatherOpenCode.html',
                        dataType: "json",
                        data: {"code":code,"date":date},
                        success: function (data) {
                            $(event.currentTarget).unlock();
                        }
                    });

                } else {
                    $(event.currentTarget).unlock();
                }
            });

            $(event.currentTarget).unlock();

        },

        payout:function (e,option) {
            var formobj =  $("#payoutForm")[0];
            var code = $(formobj).find("input[name='result.code']").val();
            var expect = $(formobj).find("input[name='result.expect']").val();
            var siteId = $(formobj).find("input[name='siteId']").val();
            var btnOption = {};
            var type=1;
            if (code == ''){
                e.page.showPopover(e,btnOption,"danger","彩种不能选择为空",true);
                return;
            }
            if (expect == ''){
                e.page.showPopover(e,btnOption,"danger","期号不能为空",true);
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
                        if (siteId == ''){
                            window.top.topPage.showConfirmMessage("你将对"+code+"彩种"+expect+"期全平台所有未结算的注单进行收到派彩,是否确认执行?",function () {
                                var formbj = $("#payoutForm")[0];
                                _this.query1(e,option,formbj,null,type);
                            });
                        }else {
                            window.top.topPage.showConfirmMessage("你将对"+siteId+"站点"+code+"彩种"+expect+"期全平台所有未结算的注单进行收到派彩,是否确认执行?",function () {
                                var formbj = $("#payoutForm")[0];
                                _this.query1(e,option,formbj,null,type);
                            });
                        }


                    }else{
                        e.page.showPopover(e,btnOption,"danger",data.msg,true);
                        return;
                    }

                }
            })
        },

        heavy:function (e,option) {
            var formobj =  $("#heavyForm")[0];
            var code = $(formobj).find("input[name='result.code']").val();
            var expect = $(formobj).find("input[name='result.expect']").val();
            var siteId = $(formobj).find("input[name='siteId']").val();
            var btnOption = {};
            var type=2;
            if (code == ''){
                e.page.showPopover(e,btnOption,"danger","彩种不能选择为空",true);
                return;
            }
            if (expect == ''){
                e.page.showPopover(e,btnOption,"danger","期号不能为空",true);
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
                        $("#opencode1").val(data.msg);
                        if (siteId == ''){
                            window.top.topPage.showConfirmMessage("你将对"+code+"彩种"+expect+"期全平台所有注单进行重新结算,侧操作可能导致玩家钱包余额为负数,是否确认执行?",function(){
                                var formbj = $("#heavyForm")[0];
                                _this.query1(e,option,formbj,null,type);
                            });
                        }else {
                            window.top.topPage.showConfirmMessage("你将对"+siteId+"站点"+code+"彩种"+expect+"期全平台所有注单进行重新结算,侧操作可能导致玩家钱包余额为负数,是否确认执行?",function () {
                                var formbj = $("#heavyForm")[0];
                                _this.query1(e,option,formbj,null,type);
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