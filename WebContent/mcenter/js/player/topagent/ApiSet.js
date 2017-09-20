/**
 * Created by jeff on 15-9-11.
 */
define(['common/BaseEditPage','mailAutoComplete'], function (BaseEditPage) {
//<%--//测试用--%>
    return BaseEditPage.extend({
        modal_dialog:$('#setRatio'),
        formSelector:'.operate-btn',
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var that = this;
            var $modal_body = $(".modal-body");
            //remote:root+'/userAgent/editTopAgentPartial.html?search.userId='+$("[name='result.id']").val()
            if($modal_body.data('load')){
                window.top.topPage.ajax({
                    url:root+'/userAgent/editTopAgentPartial.html',
                    data:{
                        'search.userId':$("[name='result.id']").val()
                    },
                    success:function(data){
                        $(".modal-body").append(data);
                        //$("#validate_ratio").val('true');
                        page.resizeDialog();
                        /*改变自身*/
                        $("._batch").on("blur",function(){
                            var $this = $(this);
                            var $this_val = Number($this.val());
                            if(!$this.hasClass("error") && $this_val === $this_val){
                                $("._self",$this.parents("td")).text(100 - $this_val+"%");
                            }
                        });

                    }

                });
            }
        }

    });
});

