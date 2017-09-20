//模板页面
define(['common/BaseEditPage','bootstrapswitch'], function(BaseEditPage,Bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
            //switch
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
                var type=$(this).attr("typeName");
                    $("#"+type).val(state);
                if(state){
                  $("#isShow"+type).show();
                }else{
                    $("#isShow"+type).hide();
                }
            });
            //加减
            $(this.formSelector).on("click",".up", function () {
                var note=$(this).parent().prev().prev();
                var max=$(this).attr("max");
                var re=/^[0-9].*$/;
                var baseNum=$(this).attr("baseNum");
                if(parseFloat(note.val())+parseFloat(baseNum)>parseFloat(max)){
                   return;
                }
                if(re.test(note.val())){
                    note.val(parseFloat(note.val())+parseFloat(baseNum));
                }else{
                    note.val(parseFloat(baseNum));
                }

            });
            //加减
            $(this.formSelector).on("click",".down", function () {
                var note=$(this).parent().prev().prev();
                var dowmNum=$(this).attr("dowmNum");
                var re=/^[0-9].*$/;
                if(parseInt(note.val())*100-parseInt(dowmNum*100)<=0){
                    return;
                }
                if(re.test(note.val())){
                    note.val((parseInt(note.val()*100)-parseInt(dowmNum*100))/100);
                }else{
                    note.val(0);
                }
                if(note.val().length>4){
                    note.val(0);
                }
            });
            $(".up").parent().parent();
        },
        savaPlayerSetting: function (e) {
            if (!this.validateForm(e)) {
                return;
            }
            page.returnValue = true;
            var _this = this;
            var cashOrder = {};
            var orderObj = [];
            $("input[name='isRequired']").each(function (index,obj) {
                var bulitIn=$(obj).attr("_bulitIn");
                var name=$(obj).attr("_name");
                var isRequired=$(obj).is(":checked");
                var isRegField=$("#field"+index).is(":checked");
                if($.trim(name).length>0) {
                    orderObj.push({
                        "bulitIn": bulitIn,
                        "id": index + 1,
                        "sort": index + 1,
                        "name": name,
                        "isRequired": bulitIn == "true" ? "0" : (isRequired ? "1" : "2"),
                        "isRegField": bulitIn == "true" ? "0" : (isRegField ? "1" : "2"),
                        "status": "1"
                    });
                }
            });
            cashOrder = orderObj;
            console.log(cashOrder);
            $("#fieldSortStr").val(JSON.stringify(cashOrder));
            return true;
        }
    });
});