/**
 * Created by jeff on 15-9-15.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        formSelector:'body',
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.changeSelf();
        },
        /*批量设置*/
        setBatch:function(e,p){batchSetInput
            var $batchSetInput = $("#batchSetInput")
            var batchSetInput_val = Number($batchSetInput.val());
            if(batchSetInput_val && !$batchSetInput.hasClass("error")){
                $('._batch').val(batchSetInput_val);
                $("._self").text(100 - batchSetInput_val +"%");
            }
            $(e.currentTarget).unlock();
        },
        changeSelf:function(){
            $("._batch").on("blur",function(){
                var $this = $(this);
                var $this_val = Number($this.val());
                if(!$this.hasClass("error") && $this_val === $this_val){
                    $("._self",$this.parents("td")).text(100 - $this_val+"%");
                }
            });
        }
    });
});