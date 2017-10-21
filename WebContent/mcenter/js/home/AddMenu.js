/**
 * 管理首页-新增菜单js
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },

        /**
         * 选择或取消选择菜单
         * @param e
         */
        selectMenu: function (e) {
            var count = $(".add-shortcut-menu").find("a.selected").length;
            if(count<=20){

                $(e.currentTarget).toggleClass("selected");

                count = $(".add-shortcut-menu").find("a.selected").length;
                if(count>20){
                    $(e.currentTarget).toggleClass("selected");
                    var obj = {};
                    obj.currentTarget = $(".short-cut-count-tips");
                    page.showPopover(obj, {}, 'warning', window.top.message.home_auto['操作无效'], true);
                }else{
                    $("#selectCount").text(parseInt(count));
                }

            }else{
                var obj = {};
                obj.currentTarget = $(".short-cut-count-tips");
                page.showPopover(obj, {}, 'warning', window.top.message.home_auto['操作无效'], true);
            }
            $(e.currentTarget).unlock();

        },
        /**
         * 确认按钮
         *
         * @param e
         * @param option
         */
        confirmMenu: function (e, option) {
            if ($("a.selected").length > 20) {
                //操作无效，最多可添加20个快键方式
                page.showPopover(e, {}, 'warning', window.top.message.home_auto['操作无效'], true);
                //$("div.condition-wraper").show();
                this.resizeDialog();
                $(e.currentTarget).unlock();
            } else {
                var menus = [];
                $("a.selected").each(function () {
                    menus.push(eval("(" + $(this).attr("data-rel") + ")").data);
                });
                var _this = this;
                window.top.topPage.ajax({
                    url: root + '/home/confirmMenu.html',
                    type: "post",
                    data: {"menus": JSON.stringify(menus)},
                    dataType: "json",
                    success: function (data) {
                        var msgType = data.state == true ? 'success' : 'danger';
                        e.page.showPopover(e, option, msgType, data.msg, true);
                        /*
                         if (data.state) {
                         window.top.topPage.showSuccessMessage(data.msg, function () {window.top.topPage.closeDialog();});
                         _this.returnValue = true;
                         } else {
                         window.top.topPage.showErrorMessage(data.msg);
                         }*/
                        $(e.currentTarget).unlock();
                    },
                    error: function () {
                        $(e.currentTarget).unlock();
                    }
                });
            }
        },
    });
});