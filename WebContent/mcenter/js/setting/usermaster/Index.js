define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $(this.formSelector).on("click", "#cleanRole", function () {
                $("[name = 'role']:checkbox").attr("checked", false);
                $(".icheckbox_square-blue ").removeClass("checked");
            });
        },
        //FixMe Add By Tony 需要加注释
        fightRoleId: function () {
            var roleIdArr=[];
            $("input[name='role']:checked").each(function () {
                roleIdArr.push( $(this).attr('roleId'));
            });
            $("#roleIdstr").val(roleIdArr);
            return true;
        }
    });

});