define(['common/BaseListPage', 'jsrender'], function (BaseListPage) {
    var _this;

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectIds:null,
        _fieldname:null,
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
            if(document.all._contents){
                document.all._contents.style.visibility = "hidden";
            }
            $(".time-input-txt",this.formSelector).click(function (e) {
                if($("#_contents")){
                    $("#_contents").remove();
                }
                var v1,v2,v3;
                var oldVal = $(e.currentTarget).val();
                if(oldVal){
                    var vals = oldVal.split(":");
                    v1 = vals[0];
                    v2 = vals[1];
                    v3 = vals[2];
                }
                _this.initTimeSelector(v1,v2,v3);
                _this._SetTime(e.currentTarget);
            });
        },

        bindEvent: function () {
            this._super();
            _this = this;
        },
        initTimeSelector:function (hh,mi,ss) {
            var _this = this;
            var str = "<div id=\"_contents\" style=\"padding:6px; background-color:#E3E3E3; font-size: 12px; border: 1px solid #777777;  position:absolute; left:?px; top:?px; width:?px; height:?px; z-index:1; visibility:hidden\">";

            str += "<select name=\"_hour\">";
            for (h = 0; h <= 9; h++) {
                str += "<option value=\"0" + h + "\">0" + h + "</option>";
            }
            for (h = 10; h <= 23; h++) {
                str += "<option value=\"" + h + "\">" + h + "</option>";
            }
            str += "</select>时<select name=\"_minute\">";
            for (m = 0; m <= 9; m++) {
                str += "<option value=\"0" + m + "\">0" + m + "</option>";
            }
            for (m = 10; m <= 59; m++) {
                str += "<option value=\"" + m + "\">" + m + "</option>";
            }
            str += "</select>分<select name=\"_second\">";
            for (s = 0; s <= 9; s++) {
                str += "<option value=\"0" + s + "\">0" + s + "</option>";
            }
            for (s = 10; s <= 59; s++) {
                str += "<option value=\"" + s + "\">" + s + "</option>";
            }
            str += "</select>秒 <input name=\"queding\" type=\"button\" onclick=\"\" value=\"确认\" style=\"font-size:12px\" /></div>";
            $("#time-td").append(str);
            if(hh){
                $("[name='_hour']").val(hh);
            }
            if(mi){
                $("[name='_minute']").val(mi);
            }
            if(ss){
                $("[name='_second']").val(ss);
            }
            $("[name='queding']").click(function (e) {
                _this._select();
            });

        },
        _SetTime:function (tt) {
            _fieldname = tt;
            var ttop = tt.parentElement.offsetTop;    //TT控件的定位点高
            var thei = tt.clientHeight;    //TT控件本身的高
            var tleft = tt.parentElement.offsetLeft;    //TT控件的定位点宽
            $("#_contents").css("left", tleft+21);
            $("#_contents").css("top", ttop + 180);
            document.all._contents.style.visibility = "visible";
        },
        _select:function () {
            var newVal = document.all._hour.value + ":" + document.all._minute.value + ":" + document.all._second.value;
            var oldval = _fieldname.value;
            if(newVal!=oldval){
                _fieldname.value = document.all._hour.value + ":" + document.all._minute.value + ":" + document.all._second.value;
                this.doUpdateField({currentTarget:_fieldname},null);
            }
            document.all._contents.style.visibility = "hidden";
        },
        doUpdateField:function (e, opt) {
            var _this = this;
            var id = $(e.currentTarget).attr("objId");
            var fieldName = $(e.currentTarget).attr("objName");
            var val = $(e.currentTarget).val();
            var data = {"search.id":id,"fieldName":fieldName,"fieldValue":val};
            window.top.topPage.ajax({
                dataType:'json',
                data:data,
                type:"post",
                url:root+'/lotteryHandicap/updateByFieldName.html',
                success:function(data){
                    if(data.state){
                        page.showPopover(e,opt,"success","更新成功",true);
                    }else{
                        var msg = "删除失败";
                        if(data.msg){
                            msg = data.msg;
                        }
                        page.showPopover(e,opt,"danger",msg,true);
                    }
                },
                error:function(data) {

                }
            });
        }
    });
})