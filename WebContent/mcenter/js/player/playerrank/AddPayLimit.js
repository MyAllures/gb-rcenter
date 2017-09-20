define(['gb/common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
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
        bindEvent: function () {
            var _this=this;
            $('form').on('submit',function(){
                return false;
            })
            //拼接复选框的值
            $(".payLimit").click(function(){
                var tt=$(this).attr("tt");
                var str="";
                $("input[name='accountId']").each(function(){
                    if($(this).is(":checked")){
                        str += $(this).val()+",";
                    }
                });
                if(str!=null&&str!=''){
                    str = str.substring(0,str.length-1);
                }
                var rankId = $("#rankId").val();
                $("#tot").attr('href','/playerRank/'+tt+'.html?strPayId='+str+'&rankId='+rankId);
                $("#tot").click();
            });
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        }

    })
});