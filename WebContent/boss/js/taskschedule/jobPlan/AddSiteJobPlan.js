/**
 * Created by mark on 15-7-14.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            $("[name='chkAll']",this.formSelector).click(function () {
                var checked = this.checked;
                $("[name='jobIds']").each(function (idx, item) {
                    item.checked = checked;
                })
            });

        },
        onPageLoad: function () {
            this._super();
            $('[data-toggle="popover"]', this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },
        checkSiteJob:function (e, opt) {
            var flag = false;
            $("[name='jobIds']").each(function (idx, item) {
                if(item.checked==true){
                    flag = true;
                    return;
                }
            });
            if(!flag){
                page.showPopover(e,{},"danger","请至少选择一个站点任务",true);
                return false
            }
            return flag;
        }
    });
});