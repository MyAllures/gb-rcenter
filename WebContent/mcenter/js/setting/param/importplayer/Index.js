/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            this.initSwitch();
            $("#li_top_7").addClass("active");
        },
        showImportList: function (e,opt) {
            $("#introduce-div").show();
            $("#introduce-div").removeClass("btn-outline");
            $("#process-div").hide();
            $("#process-div").addClass("btn-outline");
            $(".btn_list").removeClass("btn-outline");
            $(".btn_introduce").addClass("btn-outline");
            $(e.currentTarget).unlock();
        },
        showImportIntroduce : function (e,opt) {
            $("#process-div").show();
            $(".btn_introduce").removeClass("btn-outline");
            $("#process-div").removeClass("hide");
            $("#introduce-div").hide();
            $(".btn_list").addClass("btn-outline");
            $(e.currentTarget).unlock();
        },
        toImportPlayer:function (e,opt) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/userPlayerImport/playerImport.html",
                success: function (data) {
                    $("#content-div").html(data);
                    _this.bindFormValidation();
                    $("#playerFilename").change(function () {
                        _this.showFileMsg();
                    });
                }
            });
        },
        uploadFile: function (e, opt) {
            e.objId = 1;//$("#siteGameId").val();
            e.catePath = 'ImportPlayer';
            return this.uploadAllFiles(e, opt);
        },
        myCallBack : function (e,opt) {
            alert(opt.data.state);
        },
        getFormData:function(e,o){
            var data = new FormData();
            jQuery.each(jQuery('input[type=file]'), function(i, file) {
                data.append(file.name, file.files[0]);
            });
            return data;
        },
        saveImport: function (e,opt) {
            $("#importForm").submit();
            $(e.currentTarget).unlock();
        },
        doAjax:function(e,btnOption)
        {
            var _this=this;
            var option={
                cache: false,
                eventTarget: {currentTarget:e.currentTarget},
                url:  window.top.root+"/userPlayerImport/saveImport.html",
                timeout: 300000,
                beforeSend: function () {
                    $(".save-import").attr("disabled",true);
                },
                error: function(request, state, msg) {
                    $(e.currentTarget).unlock();
                    var message = msg;
                    if(request.responseJSON && request.responseJSON.message){
                        message = request.responseJSON.message;
                    }
                    if (request.status != 601) {
                        window.top.topPage.showErrorMessage(message);
                    }
                    $(e.currentTarget).unlock();
                    $(".save-import").attr("disabled",false);
                },
                success: function(data) {
                    $("#formDiv").hide();
                    $("#content-div").html(data);
                    $(e.currentTarget).unlock();
                    $(".save-import").attr("disabled",false);
                }
            };
            option.type="POST";
            option.contentType=false;
            option.processData=false;
            option.data=_this.getFormData(e,option);
            option.eventTarget={currentTarget: e.currentTarget};
            option.eventCall=function(e){
                window.top.topPage.ajax(option);
            };
            window.top.topPage.ajax(option);
        },
        showFileMsg: function () {
            $("#file-div").removeClass("hide");
            var f = document.getElementById("playerFilename").files;
            //上次修改时间
            //alert(f[0].lastModifiedDate);
            //名称
            $("#filename-span").html(f[0].name);
            //大小 字节
            $("#filesize-span").html(this.bytesToSize(f[0].size));
            //类型
            //alert(f[0].type);
        },
        bytesToSize: function (bytes) {
            if (bytes === 0) return '0 B';
            var k = 1000;
            sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            i = Math.floor(Math.log(bytes) / Math.log(k));
            var size = (bytes / Math.pow(k, i));//toFixed
            size = size.toFixed(1);
            return  size + " " + sizes[i];
            //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        myValidateForm: function (e,opt) {
            var f = document.getElementById("playerFilename").files;
            if(f&&f[0]&&f[0].size&&f[0].size>1024000){
                var obj = {};
                obj.currentTarget = $("#playerFilename");
                page.showPopover(obj, {}, "warning", window.top.message.setting_auto['仅支持'], true);
                $(e.currentTarget).unlock();
                return false;
            }
            var $form = $(window.top.topPage.getCurrentForm(e));
            if (!(!$form.valid || $form.valid())) {
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        },
        initSwitch:function(){
            var _this=this;
            var $switch = $("[name='my-checkbox']");
            _this.unInitSwitch($switch)
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch',function( event , status ){
                    var $this = $(this);
                    $this.bootstrapSwitch('indeterminate',true);
                    /*提示信息*/
                    var message = status ? window.top.message.setting_auto['确认开启吗'] : window.top.message.setting_auto['确认关闭吗']
                    window.top.topPage.showConfirmMessage( message , function( bol ){
                        if( bol ){
                            _this.doChange({currentTarget:$this[0],status:status,returnValue:true});
                        } else {
                            /*取消不确定状态*/
                            $this.bootstrapSwitch('indeterminate',false);
                            /*第三个参数为true 不会进入change事件*/
                            $this.bootstrapSwitch('state', !status,true);
                        }
                    });
                });
        },
        doChange:function (e) {
            var _this=this;
            var $this= $(e.currentTarget);
            if(e.returnValue!=true){
                $this.bootstrapSwitch('indeterminate', false);
                $this.bootstrapSwitch('state', !e.status, true);
                return;
            }
            window.top.topPage.ajax({
                url:root+'/vUserPlayerImport/changeStatus.html',
                type:'POST',
                dataType:'json',
                data:{
                    'nameVerification':e.status,
                },
                success:function(){
                    /*取消不确定状态*/
                    $this.bootstrapSwitch('indeterminate',false);
                },
            });
        }
    })
});
