define(['gb/common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.delRole();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            this._super();
            //add-shortcut-menu
            $(".compile-add").click(function () {
                $(".compile-li-tag").toggleClass("open");
                _this.resizeDialog();
            });
            //add-shortcut-menu
            $(".compile-li-tag a").click(function () {
                var tagId = $(this).attr('tagId');
                var tagName = $(this).text();
                if ($(this).hasClass('selected')) {
                    //删除标签
                    $("#tag_" + tagId).remove();
                } else {
                    //增加标签
                    var tagLabel = "<span name='roleTag' tagId=" + tagId + " id='tag_" + tagId + "'>  " + tagName + "    </span>";
                    $('#roleSelectTag').append(tagLabel);
                    _this.delRole();

                }
                $(this).toggleClass("selected");
                _this.resizeDialog();
            });
        },
        /**
         * 拼装标签CODE
         */
        pieceRole: function () {　
            var Selected = $("#roleSelectTag").children();
            var selectVal = "";
            $(Selected).each(function (index) {
                var tagId = $(this).attr('tagId');
                if (index == 0) {
                    selectVal = tagId;
                }
                if (index > 0) {
                    selectVal = selectVal + ',' + $(this).attr('tagId');
                }
            });
            $('#roleIdStr').attr('value', selectVal);
            return true;
        },
        /**
         * 删除权限标签
         */
        delRole:function(){
            $("#roleSelectTag span").click(function () {
                var tagId = $(this).attr('tagId');
                $(this).remove();
                $("#role_" + tagId).attr("class","");
            });
        }
    })
});