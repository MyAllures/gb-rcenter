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
            var _this = this;

        },
        onPageLoad: function () {
            this._super();
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

        lotteryMaintain: function (event,option) {
           var formobj =  $("#lotteryMaintainForm")[0];
           this.query(event,option,formobj,"_this.updateSysParamValue(data)")
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

        updateSysParamValue:function(data){
            console.info(data);
        }

    });
});