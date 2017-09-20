/**
 * 运营管理-返水结算-拒绝返水
 */
define(['common/BaseEditPage', 'gb/share/ListFiltersPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        status: null,
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //var _this = this;
            //选择失败标题原因，相应失败内容在textarea里显示
        },
        reasonTitleChange:function(e){
            var value = e.key;
            $("textarea[name='reasonContent']").val(select.getSelected("[name='reasonTitle']").attr("holder"));
            $("input[name='groupCode']").val(select.getSelected("[name='reasonTitle']").attr("groupCode"));
            page.reasonPreviewMore.viewFailureDetail(e);
        }
    });
});