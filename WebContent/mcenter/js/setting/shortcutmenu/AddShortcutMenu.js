/**
 * Created by jeff on 15-8-9.
 */
define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        formSelector:'*',
        sort:1,
        userMaxShortcutMenu:Number($("#userMaxShortcutMenu").val()),
        init: function () {
            this._super();
            this.bindEvent();
        },
        bindEvent: function () {
            var that = this;
            var maxSort;
            /*得到当前最大排序*/
            $('.add-players a[data-early]').each(function(){
                //var $this = $(this);
                var data_sort = Number($(this).attr("data-sort"));
                !!maxSort?(maxSort < data_sort && (maxSort = data_sort) ):(maxSort = data_sort)
            })
            /*默认排序从1开始*/
            that.sort = maxSort||1;
            $(".add-shortcut-menu dd a").off('click').click(function() {
                var $this = $(this);
                /*当新选中*/
                if(!$this.hasClass('selected')/*&& !$this.attr("data-early")*/){
                    $this.attr('data-sort',++that.sort)
                }
                $this.toggleClass("selected");
                if($(".add-shortcut-menu dd a.selected").length>that.userMaxShortcutMenu){
                    $("#shotcutMenu_add_error_label").show();
                }else{
                    $("#shotcutMenu_add_error_label").hide();
                }
            });


        },
        onPageLoad: function () {

        },
        revertDefault:function(e,p){
            var that = this;
            // 判断当前是否为默认
            window.top.topPage.ajax({
                type: "GET",
                url: root+"/userShortcutMenu/isDefaultMenu.html",
                error: function (request) {
                },
                success: function (data) {
                    if(data === 'false'){
                        window.top.topPage.showConfirmMessage(window.top.message.userShortcutMenu['revertConfirm'],function(bol){
                            if(bol){
                                window.top.topPage.ajax({
                                    type: "GET",
                                    url: root+"/userShortcutMenu/revertDefault.html",
                                    error: function (request) {
                                    },
                                    success: function (data) {
                                        that.closePage();
                                    }
                                });
                            }
                            $(e.currentTarget).unlock();
                        });
                    }else{
                        window.top.topPage.showWarningMessage(window.top.message.userShortcutMenu['isDefault']);
                        $(e.currentTarget).unlock();
                    }
                }
            });
        },
        saveShortcutMenu:function(){
            //构建参数
            var shortcutMenu_insert = [];
            var shortcutMenu_update = [];
            var shortcutMenu_delete = [];
            var that = this;
            var updateTotalCount = 0;
            var position = $("[name=position]").val();
            $('a.selected').each(function(){
                var $this = $(this);
                if($this.attr('data-shortcut-id') && !!$this.attr('data-default')){
                    shortcutMenu_update.push({'resourceId':$this.attr('data-id'),'sort':$this.attr('data-sort'),id:$this.attr('data-shortcut-id'),'position':position});
                }else{
                    shortcutMenu_insert.push({'resourceId':$this.attr('data-id'),'sort':$this.attr('data-sort'),'position':position});
                }
            });
            $('a[data-early]').not('.selected').each(function () {
                var $this = $(this);
                if(!!$this.attr('data-default')){
                    shortcutMenu_delete.push($this.attr('data-shortcut-id'));
                }
            });
            updateTotalCount = shortcutMenu_insert.length + shortcutMenu_update.length;
            if(shortcutMenu_insert.length + shortcutMenu_update.length > this.userMaxShortcutMenu){
                $("#shotcutMenu_add_error_label").show();
                return ;
            }
            var listVo = {
                'insertUserShortcutMenus':shortcutMenu_insert,
                'updateUserShortcutMenus':shortcutMenu_update,
                'deleteUserShortcutMenuIds':shortcutMenu_delete,
                'updateTotalCount':updateTotalCount
            }
            var ajaxData = JSON.stringify(listVo);
            /*提交修改内容*/
            window.top.topPage.ajax({
                contentType: 'application/json',
                type:"POST",
                url:root+"/userShortcutMenu/updateShortcutMenu.html",
                dataType:"JSON",
                data:ajaxData,
                error:function(){
                },
                success:function(){
                    that.closePage();
                }
            })
        }
    });
});