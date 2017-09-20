define(['gb/common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.bindCheckBx();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
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
                $("#tot").attr('href','/playerRank/payLimit.html?strPayId='+str+'&rankId='+rankId);
                $("#tot").click();
            });
        },
        /**
         * 勾选上个页面选中的内容
         */
        bindCheckBx: function () {
            var strPayId = $("#strPayId").val();
            if(strPayId==null || strPayId==''){
                return;
            }
            var str = strPayId.split(",");
            for(var i= 0;i<str.length;i++){
                var idname = 'check_'+str[i];
                $("#"+idname).prop('checked',true);
            }
        }
    })
});