/**
 * Created by jeff on 15-9-17.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /*最多梯度*/
        maxGrads:5,
        init: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });

            $("div._game",_this.formSelector).find("._ratio").blur(function () {
                _this.showErrorTips($(this));
            });
            $(document).click(function (e) {
                if($(".ratio_area").has(e.target).length==0 && !$(e.target).hasClass("batch_ratio") && $("#_contents").is(":visible")){
                    e.preventDefault();
                    $("#_contents").hide();
                    $(".ratio_area").html("");
                    return false;
                }
            });
        },
        onPageLoad: function () {
            this._super();
        },

        /**
         * 改变占成（上下按钮）
         * @param event
         * @param option
         */
        changeRatio: function(event, option) {
            /* 当前按钮 */
            var $currentBtn = $(event.currentTarget);
            /* 游戏二级类别 */
            var $_game = $currentBtn.parents('._game');
            /* 占成输入框 */
            var $_ratio = $('._ratio', $_game);
            /* 占成值 */
            var $_ratio_val = $_ratio.val();

            /*if ($_ratio.hasClass("error") && $_ratio_val) {
             $currentBtn.unlock();
             return;
             }*/

            if ($_ratio.val().indexOf('.') > 0) {
                /* 解决小数操作精度会缺失的问题 */
                var integerPart= $_ratio_val.split('.')[0];
                var decimalPart = $_ratio_val.split('.')[1];
                $_ratio_val = Number(integerPart+decimalPart.substring(0, 2) + (decimalPart.length < 2 ? '0' : '') + '.' + $_ratio_val.split('.')[1].substring(2, $_ratio_val.split('.')[1].length));
            } else {
                $_ratio_val = Number($_ratio_val) * 100;
            }

            /* is NaN && 表单验证未通过 */
            /*if( $_ratio_val !== $_ratio_val || $_ratio.hasClass("error")){

             }  else if ($_ratio_val <= 0 && option.post === 'sub'){

             } else*/
            /*如果小于100 :合法范围*/
            if ($_ratio_val < 100*100 || option.post === 'sub') {
                if (option.post === 'add') { /*加*/
                    $_ratio_val += 50;
                }  else { /*减*/
                    $_ratio_val -= 50;
                }
            }

            ($_ratio_val / 100 >= 0 && $_ratio_val <= 100 * 100) && $_ratio.val($_ratio_val / 100);
            var flag = this.showErrorTips($_ratio);
            $(event.currentTarget).unlock();


        },
        validRatioMaxValue:function (e, opt) {
            var _this = this;
            var errorCode = "";
            $(e.currentTarget).unlock();
            $("div._game",_this.formSelector).find("._ratio").each(function (idx, ratio) {
                var code = _this.validSingleRatio(ratio);
                if(code!=""){
                    errorCode = code;
                    $(ratio).addClass("error");
                }else{
                    $(ratio).removeClass("error");
                }
            });
            if(errorCode!=""){
                //代理本身的返佣有API未设置返佣比率
                if(errorCode=="2"){
                    var msg = window.top.message.agent['rebate.add.oldrebate.empty'];
                    page.showPopover(e,{},"danger",msg,true);
                    return false;
                }
                //超过最大值
                if(errorCode=="1"){
                    var msg = window.top.message.agent['rebate.add.maxlimit.tips'];
                    msg = this.formatStr(msg,'');
                    page.showPopover(e,{},"danger",msg,true);
                    return false;
                }
            }
            return true;
        },
        myValidateForm:function (e, opt) {
            $(e.currentTarget).lock();
            if(!this.validateForm(e)){
                $(e.currentTarget).unlock();
                return false;
            }
            if(!this.validRatioMaxValue(e,opt)){
                $(e.currentTarget).unlock();
                return false;
            }
            return true;
        },
        validSingleRatio:function (ratio) {
            var errorCode = "";
            var newVal = $(ratio).val();
            if(newVal!=null&&newVal!=""&&newVal!='undefined'){
                var oldVal  = this.getOldRatio(ratio);
                if(oldVal!=null&&oldVal!=""&&oldVal!='undefined'){
                    newVal = parseFloat(newVal);
                    oldVal = parseFloat(oldVal);
                    if(newVal>oldVal){
                        errorCode = "1";
                    }
                }else{
                    errorCode = "2";
                }

            }
            return errorCode;
        },
        showErrorTips:function (ratio) {
            var errorCode = this.validSingleRatio(ratio);
            var e = {};
            //代理本身的返佣有API未设置返佣比率
            if(errorCode=="2"){
                e.currentTarget = ratio;
                var msg = window.top.message.agent['rebate.add.oldrebate.empty'];
                page.showPopover(e,{},"danger",msg,true);
                $(ratio).addClass("error");
                return false;
            }
            //超过最大值
            if(errorCode=="1"){
                e.currentTarget = ratio;
                var oldVal  = this.getOldRatio(ratio);
                var msg = window.top.message.agent['rebate.add.maxlimit.tips'];
                msg = this.formatStr(msg,oldVal);
                page.showPopover(e,{},"danger",msg,true);
                $(ratio).addClass("error");
                return false;
            }
            $(ratio).removeClass("error");
            return true;
        },
        getOldRatio:function (ratio) {
            var newName = $(ratio).attr("name");
            var dot = newName.lastIndexOf(".");
            var preNewName = newName.substring(0,dot);
            var oldName = preNewName + ".oldRatio";
            var oldVal  = $("[name='"+oldName+"']").val();
            return oldVal;
        },
        batchUpdateRatio:function (e, opt) {
            $(".ratio_area").html("");
            this.initTimeSelector(e);
            this._SetInputPosition(e);
            $(e.currentTarget).unlock();
        },
        initTimeSelector:function (e) {
            var _this = this;
            var str = "<div class='hide' id=\"_contents\" style=\"padding:6px; background-color:#E3E3E3; font-size: 12px; border: 1px solid #777777;  left:?px; top:?px; width:?px; height:?px; z-index:1;\">";

            str += "<input type='number' name='batch_ratio' style='width: 100px'> <input name=\"queding\" type=\"button\" onclick=\"\" value=\"确认\" style=\"font-size:12px\" /></div>";
            $($(e.currentTarget).parent()).find(".ratio_area").html(str);

            $("[name='queding']").click(function (obj) {
                _this._select();
            });

        },
        _select:function () {
            var orgin = $("[name='batch_ratio']").val();
            if(orgin!=null&&orgin!=""){
                if(parseFloat(orgin)>100||parseFloat(orgin)<0){
                    page.showPopover({currentTarget:$("[name='batch_ratio']")},{},"warning","返佣比例范围为0-100",true);
                    return;
                }
                $($(_fieldname).parent().parent()).find("._ratio").val(orgin);
            }
            $("#_contents").addClass("hide");
            $(".ratio_area").html("");
        },
        _SetInputPosition:function (e) {
            _fieldname = $(e.currentTarget);
            var ttop = e.currentTarget.parentElement.offsetTop;    //TT控件的定位点高
            var thei = e.currentTarget.clientHeight;    //TT控件本身的高
            var tleft = e.currentTarget.parentElement.offsetLeft;    //TT控件的定位点宽
            $("#_contents").css("left", tleft+21);
            $("#_contents").css("top", thei);
            $("#_contents").removeClass("hide");
            //document.all._contents.style.visibility = "visible";
        }
    });
});