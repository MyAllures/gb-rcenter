/**
 * 运维——存款监控
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,bootstrapswitch) {

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
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            var _this = this ;
            $(".notify-action").click(function(){
                var _href = $(this).attr("data-action");
                var _data = $(this).attr("data-value");
                _this.notifyStationmaster(this,_href,_data);
            });
        },

        /**
         * siteId必填 更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         * showSuccessMessage
         */
        // validateForm: function (e) {
        //     var siteId = $("#siteId").val().trim();
        //     if (siteId==null||siteId==''){
        //         e.page.showPopover(e, {}, 'warning',"站点ID不能为空", true);
        //         return false;
        //     }
        //     var $form = $(window.top.topPage.getCurrentForm(e));
        //     return !$form.valid || $form.valid();
        // },

        /**
         * 发送信息通知站长
         * @param e
         * @param opt
         */
        notifyStationmaster:function (e,_href,_data) {
            var _this =this;
            window.top.topPage.ajax({
                dataType:'json',
                data:{"search.id":_data},
                type:"post",
                url:_href,
                success:function(data){
                    var obj = {currentTarget:$(e)};
                    if(data && data==true){
                        page.showPopover(obj,{},"success",'信息发送成功',true);
                    }else{
                        page.showPopover(obj,{},"danger",'信息发送失败',true);
                    }
                }
            });
        }
    });
});