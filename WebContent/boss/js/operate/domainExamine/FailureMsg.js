/**
 * Created by ke on 15-7-1.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            $(this.formSelector).on("keyup","#reasonContent", function () {
                var reasonContent=$(this).val();
                $("#num").text(reasonContent.length);
            });
        },
        onPageLoad:function(){
            this._super();
            var ids = window.parent.page.getCheckIds();
            $("#checkIds").val(ids);
        }

    });
});