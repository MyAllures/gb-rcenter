/**
 * Created by catban on 2016/2/17 0017.
 */

define(['common/BaseListPage','bootstrapswitch'],function(BaseListPage,Bootstrapswitch){
    var _this ;
    return BaseListPage.extend({
        bootstrapswitch: Bootstrapswitch,

        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            _this = this;
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                {
                    onText: window.top.message.content['floatPic.display.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var _target = e.currentTarget;
                        var recomendId=$(_target).attr("recomendId");
                        if (!$(_target).attr("isChanged")&&!state) {
                            //关闭
                            window.top.topPage.ajax({
                                url: root + '/sportRecommendedSite/changeDisplayData.html',
                                dataType: "json",
                                data: {
                                    "result.sportRecommendedId":recomendId,
                                    "status":"2"
                                },
                                success: function (data) {
                                    window.top.topPage.showSuccessMessage(window.top.message.common["operation.success"],null);
                                    $(_target).attr("isChanged", true);
                                    $(_target).bootstrapSwitch("state", !_target.checked);
                                }
                            })
                        } else if(!$(_target).attr("isChanged")&&state) {
                            //开启
                            window.top.topPage.ajax({
                                url: root + '/sportRecommendedSite/changeDisplayData.html',
                                dataType: "json",
                                data:{
                                    "result.sportRecommendedId":recomendId,
                                    "status":"1"
                                },
                                success: function (data) {
                                    window.top.topPage.showSuccessMessage(window.top.message.common["operation.success"],null);
                                }
                            });

                            return true;
                        }else if($(_target).attr("isChanged")){
                            $(_target).removeAttr("isChanged");
                            return true;
                        }
                        return false;
                    }
                });

        },
        bindEvent:function() {
            this._super();
        }

    });
});