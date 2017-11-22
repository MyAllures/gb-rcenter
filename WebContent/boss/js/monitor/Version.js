/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        /**
         * 切换版本号
         * @param e
         * @param opt
         */
        changeVersion:function (e, opt) {
            window.top.topPage.ajax({
                dataType:'json',
                data:{appKey:opt.appKey,appVersion:opt.appVersion},
                type:"post",
                url:root+'/Monitor/ChangeVersion.html',
                success:function(data){
                    if(data==true){
                        window.top.topPage.showSuccessMessage("操作成功!");
                    }else{
                        window.top.topPage.showSuccessMessage("操作失败!");
                    }
                }
            });
        }
    });
});