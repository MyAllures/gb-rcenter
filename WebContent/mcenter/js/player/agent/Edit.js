/**
 * Created by jeff on 15-9-7.
 */
define(['common/BaseEditPage','mailAutoComplete','bootstrapswitch'], function (BaseEditPage) {

    return BaseEditPage.extend({
        listVo:null,
        lastAgentUserName:'',
        init: function () {
            this.formSelector="form";
            this._super();
            $(".inputMailList").mailAutoComplete();
        },
        bindEvent: function () {
            this._super();
            var that = this;
        },
        onPageLoad: function () {
            this._super();
            var _defaultAgent = $("#_defaultAgent").val();
            if(_defaultAgent!=null&&_defaultAgent!=""&&_defaultAgent!='undefine'){
                this.getAgentRate(_defaultAgent);
            }
            this.initSwitch();
            this.initSwitch1();
            //change
        },
        changeAgent:function( event , option ){
            var that = this;

            var $select = $("[selectdiv=agentUserId]");
            var $this = $(this);
            var value = select.getValue($select);
            /*如果没有error 代理存在 并且和上次输入内容不同时　请求*/
            if(!$select.hasClass('error') && that.lastAgentUserName !== value.trim()){
                that.lastAgentUserName = value;
                that.getAgentRate(value);
            }else if(!$select.val()){
                /*如果为空　置为请选择总代*/
                $('.forAgentSelect').html($(".chooseAAgent").html()).trigger("chosen:updated");
            }
        },
        getAgentRate: function (value) {
            var replaceSelect = ["rakeback","rebate"];
            var editType = $("[name=editType]").val();
            window.top.topPage.ajax({
                url:root+"/userAgent/getSomeByTop.html",
                type:"GET",
                dataType:"json",
                data:{
                    "search.userId":value,
                    "editType":editType
                },
                success:function(data){
                    /*构建下拉*/

                    for(var i = 0;replaceSelect[i];i++){
                        var list = data.vPrograms[replaceSelect[i]];
                        var html = list ? $(".chooseAOption option"):$(".chooseAgentNoData option");
                        if ($("."+replaceSelect[i]) && $("."+replaceSelect[i]).length > 0) {
                            for(var ii = 0;html&&html[ii];ii++){
                                //select.addOption("."+replaceSelect[i],html[ii].value,html[ii].innerHTML);
                                select.clearOption("."+replaceSelect[i],html[ii].innerHTML);
                            }

                            for(var ii = 0;list&&list[ii];ii++){
                                select.addOption("."+replaceSelect[i],list[ii].programId,list[ii].name);
                            }
                        }


                    }
                },
                error: function (status) {
                    console.log(status);
                }

            });
        },
        toQA:function(){
            alert(window.top.message.player_auto['暂无对应链接地址']);
        },
        myValidateForm:function (e, opt) {
            if(!this.validateForm(e)){
                $(e.currentTarget).unlock();
                return false;
            }
            if($("[name='result.id']").val()==""){
                return true;
            }
            var oldRebateId = $("#oldRebateId").val();
            var newRebateId = $("[name='userAgentRebate.rebateId']").val();
            if(oldRebateId!=newRebateId){
                window.top.topPage.showConfirmMessage(window.top.message.player['agent.edit.rebate.modify'],function (state) {
                    if(state){
                        window.top.topPage.doAjax(e,opt);
                    }
                })
            }else{
                window.top.topPage.doAjax(e,opt);
            }
            return false;
        },
        /**
         * 初始化开关
         */
        initSwitch:function(){
            var _this=this;
            var $bootstrapSwitch = $("[name='my-checkbox']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.common['enable'],
                        offText: window.top.message.common['forbidden'],
                        onSwitchChange: function (e, state) {
                            $("[name='result.addNewPlayer']").val(state);
                        }
                    }
                );
        },
        initSwitch1:function(){
            var _this=this;
            var $bootstrapSwitch = $("[name='my-checkbox1']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.common['enable'],
                        offText: window.top.message.common['forbidden'],
                        onSwitchChange: function (e, state) {
                            $("[name='result.viewCapitalRecord']").val(state);
                        }
                    }
                );
        },

    });
});