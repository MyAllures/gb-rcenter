/**
 * Created by diego on 17-10-31.
 */
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        type:null,
        code:null,
        init: function () {
            this._super("#openNo");
            this.bindEventOther();
        },
        onPageLoad:function(){
            this.code =$("#czCode").val();
            this.type =$("#czType").val();
            this._super();

        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        bindEventOther:function(){
            var _this = this;
            $(this.formSelector).on("keyup","div#open-code-div input.m-xs", function (e) {
                _this.keyupFun($(this),e);
            }).on("paste","input.m-xs", function (e) {
                var txt = e.originalEvent.clipboardData.getData('Text');
                if(txt != undefined && txt != '' && txt.replace(/\D/g,'') != ''){
                    _this.createCopy($(this),txt.replace(/\D/g,''));
                }
                return false;
            });
        },
        //监听backspace事件
        keyupFun : function (thiz,e){
            var k = e.keyCode;
            thiz.val(thiz.val().replace(/\D/g,''));
            if(k == 8){             //8是backspace的keyCode
                if(thiz.val() == ''){
                    var prevThiz = thiz.prev();
                    var value = prevThiz.val();
                    var len = value == undefined || value == ''?0:value.length;
                    prevThiz.selectRange(len);
                }
            }else{
                var maxLength = parseInt(thiz.attr("maxlength"));
                var min = parseInt(thiz.attr("min"));
                var max = parseInt(thiz.attr("max"));
                if(thiz.val() != '' && thiz.val().length >= maxLength){
                    var value = parseInt(thiz.val());
                    if(value >= min && value <= max){
                        thiz.next("input.m-xs").focus();
                    }else{
                        thiz.val("");
                    }
                }
            }
        },

        //支持复制
        createCopy:function (thiz,txt) {
            var tempThiz = thiz;
            while (true){
                var maxLength = parseInt(tempThiz.attr("maxlength"));
                var min = parseInt(tempThiz.attr("min"));
                var max = parseInt(tempThiz.attr("max"));
                if(txt.length <= maxLength){
                    maxLength = txt.length;
                }
                var valueStr = txt.substring(0,maxLength);
                txt = txt.substring(maxLength);
                var parseValue = parseInt(valueStr);
                if(parseValue >= min && parseValue <= max){
                    tempThiz.val(valueStr);
                }else{
                    tempThiz.val("");
                }
                if(txt == '' || tempThiz.next("input.m-xs").length == 0){
                    return;
                }
                tempThiz = tempThiz.next("input.m-xs");
                tempThiz.focus();
            }
        },
        saveOpenCode:function (opt) {
            var _this = this;
            var openCodes = new Array();
            var type = $("#czType").val();
            var code = $("#czCode").val();
            var expect = $("#czExpect").val();
            var openTime = $("#czOpenTime").val();
            var _e = {
                currentTarget:$(opt.currentTarget),
                page:page
            };
            var checkFlag = false;
            $("input.m-xs").each(function(index,value){
                var maxLength = parseInt($(this).attr("maxlength"));
                var min = parseInt($(this).attr("min"));
                var max = parseInt($(this).attr("max"));
                var numStr = $(this).val();
                var num = parseInt(numStr);
                if( numStr == undefined || numStr == ''){
                    _e.page.showPopover(_e, {}, 'danger', '开奖号码不能为空', true);
                    checkFlag = true;
                    return false;
                }if(isNaN(num)){
                    _e.page.showPopover(_e, {}, 'danger', '开奖号码有误', true);
                    checkFlag = true;
                    return false;
                }
                if(numStr.length != maxLength){
                    _e.page.showPopover(_e, {}, 'danger', '开奖号码有误', true);
                    checkFlag = true;
                    return false;
                }if(num < min || num > max){
                    _e.page.showPopover(_e, {}, 'danger', '开奖号码有误', true);
                    checkFlag = true;
                    return false;
                }
                openCodes.push(numStr)
            });
            if(checkFlag){
                return;
            }
            if(code == 'hklhc' || code == 'cqxync' || code == 'gdkl10' || code == 'xyft' || code == 'bjkl8' || code == 'bjpk10' || code == 'jspk10'){
                for(var i = 0; i < openCodes.length; i++){
                    for(var j = i+1; j < openCodes.length; j++) {
                        if(openCodes[i] == openCodes[j]){
                            _e.page.showPopover(_e, {}, 'danger', '开奖号码不能重复', true);
                            return;
                        }
                    }
                }
            }
            var option = {};
            //window.top.topPage.ajax
            //ajaxRequest
            window.top.topPage.ajax({
                url: root + "/lotteryResult/saveOpenno.html",
                dataType: "json",
                data: {
                    'result.openCode': openCodes.join(","),
                    'result.code': code,
                    'result.expect': expect,
                    'result.type': type,
                    'result.openTime': openTime,

                },
                success: function(data) {
                    if(data.code==1){
                        _e.page.showPopover(_e, option, 'success', data.msg, true);
                         _this.closePage()
                    }else{
                        _e.page.showPopover(_e, option, 'danger', data.msg, true);
                    }
                }
            });
        }
    });
});
$.fn.selectRange = function(index) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(index, index);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', index);
            range.moveStart('character', index);
            range.select();
        }
    });
};
