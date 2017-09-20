define(['common/BaseListPage','bootstrapswitch','nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseListPage,Bootstrapswitch,nestable) {
    var _this ;
    return BaseListPage.extend({
        bootstrapswitch: Bootstrapswitch,
        lastOrder:null,
        init : function() {
            var this_ = this;
            this._super();

        },
        resetOrderNum: function () {
            $(".ng-hide").each(function (idx, item) {
                var hide = $(item).is(":hidden");
                if(!hide){
                    $(item).find(".order-num-td").each(function (order, td) {
                        $(td).html(order+1);
                    });
                }
            });
        },
        onPageLoad: function () {
            this._super();
            var this_ = this;
            this.initMutiNestable();
            $('.dragdd').nestable().on('change', function(){
                this_.autoSaveOrder();
            });
            $(".over").click(function(){
                $(this).attr("isThis","1");
                $(".over").each(function (idx, over) {
                    var nextBody = $(over).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide");
                    if($(over).attr("isThis")!="1"&&!$(nextBody).is(":hidden")){
                        $(over).toggleClass("open");
                    }
                });
                var tbody=$(this).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide");
                tbody.attr("aa",'1');
                $.each($("tbody.ng-hide",$(this).parent("td").parent("tr").parent("tbody").parent()),function(index,item){
                    if($(this).css("display")!="none" && $(this).attr("aa")!='1') {
                        $(this).toggle();
                        $(this).parent().find("tbody").find("tr").removeClass("open");
                    }
                });
                tbody.removeAttr("aa");
                tbody.toggle();
                $(this).removeAttr("isThis");
                $(this).toggleClass("open");

            });

        },
        initMutiNestable: function () {
            $(".dragdd").nestable({
                rootClass:'dragdd',
                listNodeName:'tbody',
                listClass:'dd-list1',
                itemNodeName:'tr',
                handleClass:'td-handle1',
                itemClass:'dd-item1',
                maxDepth:1
            });
        },
        bindEvent : function() {
            this._super();
            var _this = this;
        },
        deleteDocument: function (e, opt) {
            var id = opt.documentId;
            var msg = window.top.message.serve['help.deleteConfirm'];
            window.top.topPage.showConfirmDynamic(window.top.message.common['dialog.title.info'],msg
                ,window.top.message.content['help.continueToRemove'],window.top.message.setting['common.cancel'],function(result){
                    if(result){
                        window.top.topPage.ajax({
                            url: root+"/helpDocument/deleteHelpDocument.html",
                            dataType: 'json',
                            cache: false,
                            type: "get",
                            data: {"result.id": id},
                            success: function (data) {
                                if(data.status){
                                    window.top.topPage.showSuccessMessage(window.top.message.common['delete.success'],function(){
                                        window.top.page.query(e,opt);
                                    });
                                }else{
                                    window.top.topPage.showErrorMessage(window.top.message.common['delete.failed'],function(){
                                        window.top.page.query(e,opt);
                                    });
                                }
                            }
                        });
                    }
                });
            $(e.currentTarget).unlock();

        },
        autoSaveOrder: function () {
            var orderObj = this.getOrderList();
            this.ajaxSaveOrder(JSON.stringify(orderObj),true);
        },
        getOrderList: function () {
            var orderObj = [];
            $(".dd-list1").each(function (idx, item) {
                var flag = $(item).is(":hidden");
                if(!flag){
                    $(item).find("tr").each(function (order, tr) {
                        var id = $(tr).attr("data-id");
                        if(id){
                            orderObj.push({"orderNum":order+1,"id":parseInt(id)});
                        }
                    });
                }
            });
            return orderObj;
        },
        ajaxSaveOrder: function (json,isAuto) {
            var this_ = this;
            window.top.topPage.ajax({
                contentType: 'application/json',
                dataType:'json',
                data:json,
                async:false,
                type:"post",
                url:root+'/helpDocument/saveOrderList.html',
                success:function(data){
                    if(isAuto){
                        this_.resetOrderNum();
                    }else{
                        if(data){
                            window.top.topPage.showSuccessMessage(window.top.message.common['save.success'], function (state) {
                                $("#refresh-btn").click();
                            });
                        }else{
                            window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                        }
                    }

                },
                error:function(data) {
                    $(e.currentTarget).unlock();
                    window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                }
            });
        }
    });
});
