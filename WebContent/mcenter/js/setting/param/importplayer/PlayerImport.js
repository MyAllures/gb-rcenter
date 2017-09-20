//模板页面
define(['common/BaseEditPage', 'bootstrapswitch'], function (BaseEditPage, Bootstrapswitch) {

    return BaseEditPage.extend({
        bootstrapswitch: Bootstrapswitch,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            $("#li_top_7").addClass("active");
            $("#playerFilename").change(function () {
                _this.showFileMsg();
            });

        },
        loadArea: function () {
            $("#mainFrame").load(root + window.location.hash.slice(1));
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
                    $("#importForm").append(data);
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
            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        }
});
});