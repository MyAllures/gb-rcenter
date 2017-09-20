define(['common/BaseListPage'], function(BaseListPage) {
    var _this=this;
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        noRecordMessage:window.top.message.common["find.norecord"],
        init: function (title) {
            this.formSelector = "#mainFrame form";
            this._super("formSelector");
            this.noRecordMessage = window.top.message.common["find.norecord"];
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            $(".tab-pane").css("display","block");
            /*$("ul li a","div.panel").on("click",function(e){
                var $href = $(this).data("href");
                $("#mainFrame").load(root+$href);
            });*/
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //this.querySiteInfo();
        },

        /*requery:function(event,option) {
            $("#mainFrame").load(window.top.topPage.getCurrentFormAction(event));
        },

        reloadView:function(e,option){
            if(e.returnValue){
                var id = $("[name=id]").val();
                $("#mainFrame").load(root+"/vSiteMasterManage/viewBasic.html?search.id="+id);
            }
        },*/

        getSelectIdsArray:function(e,option)
        {
            var checkedItems = [],counter = 0;
            $("table tbody input[type=checkbox]",this.getCurrentForm(e)).not("[name=my-checkbox]").each(function(node,obj) {
                if(obj.checked) {
                    checkedItems[counter] = obj.value;
                    counter++;
                }
            });

            return checkedItems;
        },

        getSelectIds:function(e,option)
        {
            return {ids:this.getSelectIdsArray(e,option).join(",")};
        },

        /**
         * 搜索查询
         * @param event
         * @param option
         */
        searchQuery:function(event,option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:root+$("div.panel ul li.active a").attr("data-href"),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        $("div.search-list-container").html(data);
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
        },

        runCallback:function(event,option) {
            if(option.data.state){
                page.showPopover(event,{},"success","操作成功",true);
                this.query(event);
            }else{
                var msg = "操作失败";
                if(option.data.msg){
                    msg = option.data.msg;
                }
                page.showPopover(event,{},"danger",msg,true);
            }
        },

        beforeInitJob: function (e, opt) {
            var _this = this;
            var siteId = $("[name='search.siteId']").val();
            var jobCode = $("#jobCode").val();
            window.top.topPage.showConfirmDynamic("提示","确定按所选条件进行重置吗?重置后所有任务配置的时间点将被还原!","确认","取消", function (state) {
                if(state){
                    window.top.topPage.doAjax(e,opt);
                }
            })
            /*if(siteId!=null&&siteId!=""){
                if(jobCode!=null&&jobCode!=""){
                    window.top.topPage.showConfirmDynamic("提示","您选择了站点ID和任务代码,将只重置该站点的该任务,确认执行？","确认","取消", function (state) {
                        if(state){
                            window.top.topPage.doAjax(e,opt);
                        }
                    })
                }else{
                    window.top.topPage.showConfirmDynamic("提示","请确认重置所选站点的所有任务吗？<br/>重置后所有任务配置的时间点将被还原！","确认","取消", function (state) {
                        if(state){
                            window.top.topPage.doAjax(e,opt);
                        }
                    })
                }

            }else{

                if(jobCode!=null&&jobCode!=""){
                    var msg = "确认重置所有站点任务{0}吗?";
                    msg = _this.formatStr(msg,jobCode);
                    window.top.topPage.showConfirmDynamic("提示",msg,"确认","取消", function (state) {
                        if(state){
                            window.top.topPage.doAjax(e,opt);
                        }
                    })
                }else{
                    window.top.topPage.showConfirmDynamic("提示","您未选择站点。<br/>请确认重置所有站点的任务吗？<br/>重置后所有任务配置的时间点将被还原！","确认","取消", function (state) {
                        if(state){
                            window.top.topPage.doAjax(e,opt);
                        }
                    })
                }
            }*/
            return false;
        },
        querySiteInfo:function () {
            var $form = $(this.formSelector);
            $(this.formSelector).on("blur","#siteId",function () {
                if(!$form.valid || $form.valid()) {
                    var val = $("#siteId").val();
                    window.top.topPage.ajax({
                        loading: true,
                        url: root+"/report/gameTransaction/querySiteInfo.html",
                        type: "post",
                        data: {"siteId":val},
                        dataType:"JSON",
                        success: function (data) {
                            if (data) {
                                $("[selectdiv='search.centerId']").attr("value",data.centerUserId);
                                select.setValue($("[selectdiv='search.centerId']"), data.centerUserId);
                                $("[selectdiv='search.masterId']").attr("value",data.sysUserId);
                                $("[selectdiv='search.siteId']").attr("value",data.id);
                                select.ajaxList($("[selectdiv='search.masterId'] input"));
                            }
                        }
                    });
                }
            })
        }


    });
});