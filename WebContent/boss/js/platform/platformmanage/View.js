define(['common/BasePage'], function(BasePage) {
    var _this=this;
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "#mainFrame form";
            this._super();
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
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $("ul li a","#mainFrame .panel").on("click",function(e){
                var $href = $(this).attr("data-href");
                $(".tab-content").addClass("hide");
                $("#tab-content"+$(this).attr("index")).load(root + $href);
                $("#tab-content"+$(this).attr("index")).removeClass("hide");
            });

            $(this.formSelector).on("click","table thead input[type=checkbox]", function (e) {
                e.page=_this;
                $("tbody input[type=checkbox]",_this.getFirstParentByTag(e,"table")).each(function(node,obj) {
                    var $this=$(obj);
                    if (e.currentTarget.checked && !$this.prop("disabled")) {
                        $this.parents('tr').addClass('open');
                    }
                    else
                    {
                        $this.parents('tr').removeClass('open');
                    }
                    if(!$this.prop("disabled")) {
                        obj.checked = e.currentTarget.checked;
                    }
                });
            });
        },

        painView:function(e,option) {
            if (e.returnValue==true) {
                $("#mainFrame").load(root+"/vPlatformManage/view.html?id="+$("[name='siteId']").val());
            }
        },

        requery:function(event,option) {
            if (event.returnValue==true)
                $("div.panel ul li.active a").trigger("click");
        },

        _requery:function(event,option) {
            $("div.panel ul li.active a").trigger("click");
        },

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
                        $("div.tab-pane div.function-menu-show").removeClass('show').addClass('hide');
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
        /**
         * 执行查询
         * @param event         事件对象
         */
        query : function(event,option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
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
        /**
         * 查询更多
         * @param event
         * @param option
         */
        showContact:function(e,opt){
            $("div.search-list-container").html(opt.data);
            e.page.onPageLoad();
        },
        accountCallback: function (e, opt) {
            var _this = this;
            if(opt.data.state){
                page.showPopover(e, {"callback": function (event,option) {
                    console.log(opt.data.url);
                    window.top.topPage.doDialog({page:_this},{text:window.top.message.common['msg'],
                        target: root + "/siteSubAccount/showUrl.html?username="+opt.data.username+"&host="+opt.data.host+"&secret="+opt.data.secret});
                },"placement":"left"}, 'success', '操作成功', true);
            }else{
                var msg = opt.data.msg;
                if(msg==null||msg==""){
                    msg = "操作失败";
                }

                page.showPopover(e, {"callback": function () {
                },"placement":"left"}, 'danger', msg, true);
            }
        }
    });
});