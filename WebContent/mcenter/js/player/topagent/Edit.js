/**
 * Created by jeff on 15-9-11.
 */
define(['common/BaseEditPage','mailAutoComplete'], function (BaseEditPage) {

    return BaseEditPage.extend({
        modal_dialog:$('#setRatio'),
        formSelector:'.operate-btn',
        init: function () {
            this._super();
            $(".inputMailList").mailAutoComplete();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var that = this;
            var modal_dialog =$('#setRatio');
            modal_dialog.modal({
                keyboard: true,//esc关闭
                show:false,//是否初始化完成就显示
            });
            modal_dialog.on("show.bs.modal",function(a,b,c,d){
                var $modal_body = $(".modal-body",modal_dialog);
                //remote:root+'/userAgent/editTopAgentPartial.html?search.userId='+$("[name='result.id']").val()
                if($modal_body.data('load')){
                    window.top.topPage.ajax({
                        url:root+'/userAgent/editTopAgentPartial.html',
                        data:{
                            'search.userId':$("[name='result.id']").val()
                        },
                        success:function(data){
                            $(".modal-body",modal_dialog).append(data);
                            $modal_body.data({load:false});
                            $("#validate_ratio").val('true');

                            /*改变自身*/
                            $("._batch").on("blur",function(){
                                var $this = $(this);
                                var $this_val = Number($this.val());
                                if(!$this.hasClass("error") && $this_val === $this_val){
                                    $("._self",$this.parents("td")).text(100 - $this_val+"%");
                                }
                            });

                        }

                    });
                }
            });
            /*用户名 填充到设置占成中*/
            $("input[name='sysUser.username']").on("blur",function(){
                var $this = $(this);
                if(!$this.hasClass("error")){
                    $("._userName").text($this.val());
                }
            });
        },
        openSetRatio:function(e,p){
            $('#setRatio').modal('show');
            $(e.currentTarget).unlock();
        },
        closeSetRatio:function(e,p){
            $('#setRatio').modal('hide');
            $(e.currentTarget).unlock();
        },
        batchSet:function(e,p){
            var $batchInput = $("#batchSetInput");
            if($("#batchSetInput").val()!=null&&$("#batchSetInput").val()!=""){
                var $batchInput_val = Number($("#batchSetInput").val());
                if(!$batchInput.hasClass("error")){
                    $('._batch').val($batchInput_val)
                    var self = 100 - $batchInput_val;
                    /*不是NaN*/
                    self === self && $('._self').text(self+"%");
                }
            }

            $(e.currentTarget).unlock();
        },
        cancelSetting:function( event , option ){
            $('#setRatio').modal('toggle');
            $(event.currentTarget).unlock();
        },
        changeConstellation:function( start , end , label ){
            /*
            水平座 121～218
            双鱼座 219～320
            牡羊座 321～420
            金牛座 421～521
            双子座 522～621
            巨蟹座 622～722
            狮子座 723～ 823
            处女座 824～ 922
            天秤座 923～1023
            天蝎座 1024～1122
            射手座 1123～1221
            摩羯座 1222～ 120
            */
            var constellation = this.getConstellation(start);
            select.setValue($("[name='sysUser.constellation']"),constellation);
        },
        getConstellation:function( start ){
            var day = start.startDate._d.getDate();
            var month = start.startDate._d.getMonth()+1;
            var code = month - (day < "102223444433".charAt(month - 1) - -19);
            switch(code) {
                case 0:
                case 12:
                    return 'capricorn';
                case 1:
                    return 'aquarius';
                case 2:
                    return 'pisces';
                case 3:
                    return 'aries';
                case 4:
                    return 'taurus';
                case 5:
                    return 'gemini';
                case 6:
                    return 'cancer';
                case 7:
                    return 'leo';
                case 8:
                    return 'virgo';
                case 9:
                    return 'libra';
                case 10:
                    return 'scorpio';
                case 11:
                    return 'sagittarius';
            }
        },
        myValidateForm: function (e,opt) {
            var flag = true;
            $("input[name$='ratio']").each(function (idx,ratio) {
                if($(ratio).val()==""){
                    flag = false;
                }
            });
            if(!flag){
                $(e.currentTarget).unlock();
                window.top.topPage.showWarningMessage(window.top.message.player['topAgent.edit.ratioNotNull']);
                return false;
            }

            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            //userAgentApis[11].ratio

            return true;
        },
        savePreview:function(e,opt){
            var _this = this;
            var data = _this.getCurrentFormData(e);
            window.top.topPage.ajax({
                url: root+'/userAgent/previewTopagent.html',
                data:data,
                cache: false,
                type: "POST",
                success: function (data) {
                    $('#setRatio').modal('toggle');
                    $("#editcontent-div").hide();
                    $("#editbody-div").append(data);
                    /*$("#editor",_this.formSelector).hide();
                    $(".modal-body").append(data);
                    $("#showPreviewDiv").removeClass("hide");
                    $("#confirmDiv").addClass("hide");
                    $("#previewBtnDiv").addClass("hide");
                    page.resizeDialog();*/
                }
            });
            $(e.currentTarget).unlock();
        },
        previewCallBack: function (e, opt) {

        },
        preStep: function (e, opt) {
            $("#editcontent-div").show();
            $("#preview-div").remove();
        }
    });
});

