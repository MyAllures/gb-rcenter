define(['common/BasePage', 'common/Pagination'], function(BasePage,Pagination) {
    return BasePage.extend({
        pagination : null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "#viewSiteLogsForm";
            this.pagination = new Pagination(this.formSelector);
            this._super(this.formSelector);
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
            this.pagination.processOrderColumnTag(this);
            $(".tab-content > .tab-pane").css("display","block");
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this=this;
            //绑定所有table的列头选择事件
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
                _this.toolBarCheck(e);

            });

            $(this.formSelector).on("click","table tbody input[type=checkbox]", function (e) {
                var $funMoreMenu= $(".function-menu-show",window.top.topPage.getCurrentForm(e));
                if(!_this.getSelectIdsArray(e).length)
                {
                    $funMoreMenu.css("display","").removeClass('show').addClass('hide');
                }
                else
                {
                    $funMoreMenu.css("display","").removeClass('hide').addClass('show');
                }
            });
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
         * 检查ToolBar的显示状态
         * @param e
         */
        toolBarCheck:function(e)
        {
            var $funMoreMenu= $(".function-menu-show",this.getCurrentForm(e))
            if(e==undefined)
            {
                $funMoreMenu.css("display","").removeClass('show').addClass('hide');
                return;
            }

            if(!this.getSelectIdsArray(e).length)
            {
                $funMoreMenu.css("display","").removeClass('show').addClass('hide');
            }
            else
            {
                $funMoreMenu.css("display","").removeClass('hide').addClass('show');
            }
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
        changeKey: function (e) {
            $('#operator').attr('name', e.key).val('');

        },

    });
});