
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        type:null,
        code:null,
        init: function () {
            this._super("#openNo");
            this.bindEventOther();
        },
        onPageLoad:function(){
            this.code =$("#czCode").val();
            this.type =$("#czType").val();
            this._super();

        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

        },
        // closePage: function () {
        //     window.top.topPage.closeDialog();
        // },
        bindEventOther:function(){
            var _this = this;
            $(this.formSelector).on("keydown","input.m-xs", function (e) {
                _this.createOpenNo(_this.code,_this.type);
            }).on("paste","input.m-xs", function (e) {
                var txt = e.originalEvent.clipboardData.getData('Text');
                _this.createCopy(txt,_this.code,_this.type);
                return false;
            });
        },
        createOpenNo:function (code,type) {
            if(type=='pk10' || type=='lhc' || type=='sfc' || type=='keno'){

                var txts=$("input.m-xs");

                for(var i = 0; i<txts.length;i++){
                    var t = txts[i];
                    t.index = i;
                    t.onkeyup=function(){
                        this.value=this.value.replace(/\D/g,'');
                        var varStr=this.value+"";
                        if(varStr.length==2){
                            if(this.value !="" && this.value>=1 && this.value<11){
                                var next = this.index + 1;
                                if(next > txts.length - 1) return;
                                txts[next].focus();
                            }else{
                                this.value="";
                            }
                        }
                        if(next==undefined){
                            if(this.value==""){
                                txts[this.index - 1].focus();
                            }
                        }
                    }
                }

            }else  if(type=='ssc'||type=='k3'|| type=='pl3'||code=='xy28'){
                var txts=$("input.m-xs");
                for(var i = 0; i<txts.length;i++){
                    var t = txts[i];
                    t.index = i;
                    t.onkeyup=function(){
                        this.value=this.value.replace(/\D/g,'');
                        if(this.value !="" && this.value>=0 && this.value<11){
                            var next = this.index + 1;
                            if(next > txts.length - 1) return;
                            txts[next].focus();
                        }else{
                            this.value="";
                        }
                        if(next==undefined){
                            if(this.value==""){
                                txts[this.index - 1].focus();
                            }
                        }
                    }
                }
            }
        },
        //支持复制
        createCopy:function (txt,code,type) {
            var s=0;
          var txts=txt.replace(/\D/g,'');
            if(type=='pk10' || type=='lhc' || type=='sfc' || type=='keno'){
                var txts_i=$("input.m-xs");
                var n=0;
                for(var j=0;j<txts_i.length;j++){
                    if(txts[n]!=undefined && txts[n+1]!=undefined){

                        $(txts_i[j]).val(txts[n]+txts[n+1]);
                        if($(txts_i[j]).val()>11){
                            $(txts_i[j]).val("");
                            n=n+2;
                        }else{
                            n=n+2;
                        }

                    }else if(txts[n]!=undefined && txts[n+1]==undefined){
                        $(txts_i[j]).val(txts[n]);
                        break;
                    }else if(txts[n]==undefined){
                        break;
                    }

                }

            }
            else  if(type=='ssc'||type=='k3'|| type=='pl3'||code=='xy28'){
              var txts_i=$("input.m-xs");
                for(var j=0;j<txts_i.length;j++){
                    $(txts_i[j]).val(txts[j]);

                }
            }

        },
        // getCurrentFormData:function () {
        //     var _this = this;
        //     var openCode = "";
        //     $("input.m-xs").each(function(index,value){
        //         openCode += $(this).val();
        //     });
        //     var id = $("#objId").val();
        //     return {
        //         id : id,
        //         openCode:openCode
        //     };
        // },
        validateForm:function () {
            alert("test");
            return false;
        },
        saveOpenCode:function (opt) {
            var _this = this;
            var openCode = "";
            var type = $("#czType").val();
            var code = $("#czCode").val();
            var expect = $("#czExpect").val();
            $("input.m-xs").each(function(index,value){
                openCode += $(this).val()+",";
            });
            var _e = {
                currentTarget:$(opt.currentTarget),
                page:page
            };
            var option = {};
            //window.top.topPage.ajax
            //ajaxRequest
            window.top.topPage.ajax({
                url: root + "/lotteryResult/saveOpenno.html",
                dataType: "json",
                data: {
                    'result.openCode': openCode,
                    'result.code': code,
                    'result.expect': expect,
                    'result.type': type,
                },
                success: function(data) {

                    if(data.code==1){
                        _e.page.showPopover(_e, option, 'success', data.msg, true);
                         _this.closePage()
                    }else{
                        _e.page.showPopover(_e, option, 'danger', data.msg, true);
                    }
                },
            });
        },




    });
});/**
 * Created by diego on 17-10-31.
 */
