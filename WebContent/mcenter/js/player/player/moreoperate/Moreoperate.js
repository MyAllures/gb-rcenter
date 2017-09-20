define(['common/BaseEditPage','bootstrapswitch'], function(BaseEditPage,Bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //复选框
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function(event, state) {
                    $("#status").val(state);
                });
            //选择失败标题原因，相应失败内容在textarea里显示
            $(this.formSelector).on("change", "#reasonTitle", function (e) {
                var value = this.value;
                var reasonContent = select.getSelected('#reasonTitle').attr('holder');
                var groupCode = select.getSelected('#reasonTitle').attr('groupCode');
                $("#title").val(value);
                //$("#reasonContent").val(reasonContent);
                $("#reasonContent").val(reasonContent);
                $("#rContent").val(reasonContent);
                $("#groupCode").val(groupCode);
            });
            $('#s_reasonContent').val($('#s_rContent').val());
        },
        reasonTitleChange:function(e){
            var value = e.key;
            var reasonContent = select.getSelected('#reasonTitle').attr('holder');
            var groupCode = select.getSelected('#reasonTitle').attr('groupCode');
            $("#title").val(value);
            $("#reasonContent").html(reasonContent);
            $("#rContent").val(reasonContent);
            $("#groupCode").val(groupCode);
        },
        /**
         * 验证
         * @param e
         * @param btnOption
         * @returns {boolean}
         */
        myValidate:function(e,btnOption){
            var title = $("#title").val();
            var reasonContent = $("#rContent").val();
            var remark = $("#remark").val();
            var status = $("#status").val();
            var type = $("#type").val();//1停用 2踢出
            if(status!='true' && type==1){
                var msg = window.top.message.playerTag['openDisabledState'];
                window.top.topPage.showErrorMessage(msg);
                return false;
            }
            if(!title){
                //var msg = window.top.message.playerTag['kick_please_reason'];
                //window.top.topPage.showErrorMessage(msg);
                //return false;
            }
            return true;
        },
        yzStatus:function(){
            var status = $("#status").val();
            if(status=='true'){
                var msg = window.top.message.playerTag['closeDisabledState'];
                window.top.topPage.showErrorMessage(msg);
                return false;
            }
            return true;
        },
        /**
         * 异步保存停用
         * @param e
         * @param btnOption
         */
        saveDisable:function(){
            var url=root+"/player/view/saveOffline.html";
            var _this=this;
            window.top.topPage.ajax({
                url: url,
                data:window.top.topPage.getCurrentFormData(e),
                cache: false,
                type: "POST",
                dataType:"json",
                success: function (data) {
                    if(data.state){
                        _this.returnValue=true;
                        _this.closePage();
                        window.top.topPage.showSuccessMessage(data.msg,null);
                    }else{
                        window.top.topPage.showErrorMessage(data.msg,null);
                    }
                }
            });
        },
        sureDialog:function(e,btnOption){//提交
            this.cancelPreview(e,btnOption);
            this.saveDisable();
        },
        toTmplButton:function(e,btnOption){//
            var _this=this;
            _this.returnValue=true;
            _this.closePage(e,btnOption)
        },
        /**
         * 状态判断
         * @param e
         * @param btnOption
         * @returns {boolean}
         */
        offlineTakeSelectId:function(e,btnOption){
            var code = $("#code").val();
            var remark = $("#remark").val();
            if(!code){
                var msg = window.top.message.playerTag['chooseFreezeReasons'];
                window.top.topPage.showErrorMessage(msg);
                return false;
            }
            if(!remark){
                var msg = window.top.message.playerTag['fillInTheInformation'];
                window.top.topPage.showErrorMessage(msg);
                return false;
            }
            btnOption.target = btnOption.target.replace('{code}',code);
            btnOption.target = btnOption.target.replace('{remark}',remark);
            return true;
        },

        /**
         * 预览账号停用
         * @param e
         * @param option
         */
        previewDisable:function(e,option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root+'/player/view/disablePreview.html',
                data:{'username':$("[name='un']").text(),'title':$("#title").val(),"reasonContent":$("#reasonContent").val(),"remark":$("#remark").val()},
                cache: false,
                type: "POST",
                success: function (data) {
                    $("[name=editor]",_this.formSelector).hide();
                    $(_this.formSelector).append(data);
                }
            });
            $(e.currentTarget).unlock();
        },

        /**
         * 管理模板
         * @param e
         * @param option
         */
        tmpIndex:function(e,option) {
            this.closePage(e,option)
            this.returnValue = "tmpIndex";
        },
        /**
         * 强制踢出预览
         * @param e
         * @param opt
         */
        savePreview:function(e,opt){
            var _this = this;
            var title = $("#title").val();
            var reasonContent = $("#rContent").val();
            var remark = $("#remark").val();
            var status = $("#status").val();
            var type = $("#type").val();//1停用 2踢出
            var username=$("#username").val();

            var onLineId=$("#onLineId").val();
            var playerId=$("[name='result.entityUserId']").val();
            var data = {"title":title
                ,"reasonContent":reasonContent
                ,"remark":remark
                ,"type":2
                ,"username":username
                ,"onLineId":onLineId
                ,"playerId":playerId};

            window.top.topPage.ajax({
                url: root+'/player/view/disablePreview.html',
                data:data,
                cache: false,
                type: "POST",
                success: function (data) {
                    $("div.editor",_this.formSelector).hide();
                    $("div.preview").show();
                    $("div.modal-body",_this.formSelector).append(data);
                    page.resizeDialog();
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 上一步
         */
        //lastStep: function () {
        //    var _this = this;
        //    $("div.preview").hide();
        //    $("div.editor",_this.formSelector).show();
        //}
    })
});''