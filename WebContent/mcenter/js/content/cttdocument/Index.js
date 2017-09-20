define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,Bootstrapswitch) {
    var _this ;
    return BaseListPage.extend({
        bootstrapswitch: Bootstrapswitch,
        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch();

            $(".over").click(function(){
                var tt=$(this).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide");
                tt.attr("aa",'1');
                $.each($("tbody.ng-hide",$(this).parent("td").parent("tr").parent("tbody").parent()),function(index,item){
                    if($(this).css("display")!="none" && $(this).attr("aa")!='1') {
                        $(this).toggle();
                        $(this).parent().find("tbody").find("tr").removeClass("open");
                    }
                });
                tt.removeAttr("aa");
                tt.toggle();
                $(this).toggleClass("open");
                //$(".orderChildCss").toggle();
                if($(this).attr("childCount")==0){
                    $(".orderChildCss").attr("href","javascript:void(0);");
                    $(".orderChildCss").css("display","none");
                }else{
                    var dis = tt.css("display");
                    if(dis!='none'){
                        $(".orderChildCss").show();
                    }else{
                        $(".orderChildCss").hide();
                    }
                    //$(".orderChildCss").css("display",dis);
                    var href = "/vCttDocument/toOrderList.html?search.parentId=";//orderChildCss
                    var docId = $(this).attr("docId");
                    if(docId!=""){
                        href = href + docId;
                        $(".orderChildCss").attr("href",href);
                    }else{
                        $(".orderChildCss").attr("href","javascript:void(0);");
                    }
                }
            });

            this.showChild();
        },
        showChild: function () {
            var openId = $("#openId").val();
            $(".over").each(function(){
                var docId = $(this).attr("docId");
                if(openId!=""&&openId==docId){
                    $(this).click();
                }
            });
        },
        bindEvent : function() {
            this._super();
            var _this = this;
            $(this.formSelector).on("switchChange.bootstrapSwitch", 'input[name="my-checkbox"]',function(e,state) {
                var $this = $(this);
                $this.bootstrapSwitch('indeterminate',true);
                var id=$this.attr("documentId");
                var status;
                if(state){
                    status = "on";
                }else{
                    status = "off";
                }
                window.top.topPage.ajax({
                    url: root+"/vCttDocument/updateStatus.html",
                    dataType: 'json',
                    cache: false,
                    type: "get",
                    data: {"result.id": id,"result.status":status},
                    success: function (data) {
                        if(data.state){
                            //_this.query(event,option);
                            //window.top.page.query({currentTarget:e.currentTarget,page:_this});
                            window.top.topPage.showSuccessMessage(window.top.message.common['operation.success'],function(){
                                window.top.page.query({currentTarget:e.currentTarget,page:_this});
                            });
                        }else{
                            window.top.topPage.showErrorMessage(data.errMsg,function(){
                                //$this.bootstrapSwitch('indeterminate',false);
                                $this.bootstrapSwitch('state', !state,true);
                                //window.top.page.query({currentTarget:e.currentTarget,page:_this});
                            });


                        }
                    }
                });
            });
        },
        goNext:function(e,btnOption){
            if(e.returnValue!=null && e.returnValue.length>5){
                $("#tot").attr('href','/cttDocumentI18n/editContent.html');
                $("#tot").click();
            }else{
                window.top.page.query(e,btnOption);
            }
        },
        deleteDocument:function(e,btnOption){
            var _this = this;
            var id = btnOption.documentId;
            var status = btnOption.status;
            var isParent = btnOption.isParent;
            var subSize = btnOption.subSize;
            var checkStatus=btnOption.checkStatus;
            if(isParent=="true"){
                if(subSize>0){
                    window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],window.top.message.content['document.deleteParentTips'],window.top.message.common['continueToRemove'],window.top.message.common['cancel'],function(state){
                        if(state){
                            _this.ajaxDelete(id,e,btnOption);
                        }
                    });
                }else{
                    if(checkStatus=='1'&&status=="on"){
                        window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],window.top.message.content['document.deleteNoShowTips'],window.top.message.common['continueToRemove'],window.top.message.common['cancel'],function(success){
                            if(success){
                                _this.ajaxDelete(id,e,btnOption);
                            }
                        });
                    }else{
                        window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],window.top.message.common['delete.deleteConfirm'],window.top.message.common['continueToRemove'],window.top.message.common['cancel'],function(success){
                            if(success){
                                _this.ajaxDelete(id,e,btnOption);
                            }
                        });
                    }
                }

            }else{
                _this.deleteEvent(id,status,checkStatus,isParent,e,btnOption);
            }
            $(e.currentTarget).unlock();

        },
        deleteEvent:function(id,status,checkStatus,isParent,e,btnOption){
            var _this = this;
            if(checkStatus=='1'&&status=="on"){
                window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],window.top.message.content['document.deleteNoShowTips'],window.top.message.common['continueToRemove'],window.top.message.common['cancel'],function(success){
                    if(success){
                        _this.ajaxDelete(id,e,btnOption);
                    }
                });
            }else{
                window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],window.top.message.common['delete.deleteConfirm'],window.top.message.common['continueToRemove'],window.top.message.common['cancel'],function(success){
                    if(success){
                        _this.ajaxDelete(id,e,btnOption);
                    }
                });

            }
        },
        ajaxDelete:function(id,e,btnOption){
            window.top.topPage.ajax({
                url: root+"/vCttDocument/deleteCttDocument.html",
                dataType: 'json',
                cache: false,
                type: "get",
                data: {"result.id": id},
                success: function (data) {
                    if(data.status){
                        window.top.topPage.showSuccessMessage(window.top.message.common['delete.success'],function(){
                            window.top.page.query(e,btnOption);
                        });
                    }else{
                        if(data.errMsg!=""){
                            window.top.topPage.showErrorMessage(window.top.message.common['delete.failed']+":"+data.errMsg,function(){
                                window.top.page.query(e,btnOption);
                            });
                        }else{//
                            window.top.topPage.showErrorMessage(window.top.message.content['document.deleteError'],function(){
                                window.top.page.query(e,btnOption);
                            });
                        }
                    }
                }
            });
        }
    });
});
