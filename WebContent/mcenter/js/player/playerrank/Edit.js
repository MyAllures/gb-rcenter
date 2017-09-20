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
            //每输入一个字符就判断是不是数字，不是数字就清空内容边框变红
            $(this.formSelector).on("change","#riskMarker",function () {
                $("input[name='result.riskMarker']").val($(this).is(':checked'));
            });
        },
        saveGetVo: function (e) {
            var _this=this;
            window.top.topPage.ajax({
                url:root+"/playerRank/saveGetVo.html",
                dataType: "json",
                data : this.getCurrentFormData(e),
                type: 'post',
                success: function (data) {
                    _this.returnValue=data.result.id;
                    _this.closePage();
                }
            });

        }

    });
});