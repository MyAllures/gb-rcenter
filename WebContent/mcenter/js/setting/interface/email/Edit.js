define(['common/BaseEditPage'], function(BaseEditPage) {
    var _this;
    return BaseEditPage.extend({
        select:null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            _this=this;
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $(this.formSelector).on("change", ".all_rank", function () {
                var val=$(this).prop("checked");
                $(".rank").prop("checked",val);
            });
            $(this.formSelector).on("change", ".rank", function () {
                var val=$(this).prop("checked");
                if(val){
                    //是否需要选中全部层级
                    var rankCount=$("#rankCount").val();
                    var rankStatus=$(".rankStatus [type=checkbox]:checked").length;
                    if(rankCount==rankStatus){
                        $(".all_rank").prop("checked",true);
                    }
                }else{
                    $(".all_rank").prop("checked",val);
                }
            });
        },
        saveValid: function (e) {
            //拼装层级
            var rankStr = "";
            $('input[name="rank"]:checked').each(function (index) {
                var val = $(this).val();
                if (index == 0) {
                    rankStr = rankStr + val;
                } else {
                    rankStr = rankStr + "," + val;
                }

            });
            $("#rankIds").val(rankStr);
            if (!this.validateForm(e)) {
                return;
            }
            return true;
        }
    })
});