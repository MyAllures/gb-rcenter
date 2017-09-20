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
         * 删除梯度
         * @param event
         * @param option
         */
        deletePlan: function(event, option) {
            /* 当前按钮 */
            var $btn = $(event.currentTarget);
            /* 找到父级table */
            $btn.parents('tr').remove();
            /* 重算index */
            this.resetIndex();
            /* 解锁 */
            $btn.unlock();
        },

        /**
         * 新增梯度
         * @param event
         * @param option
         */
        createPlan: function(event, option) {
            var $tbl = $('._tables table');
            var _table_len = $tbl.find('.apiGrad').length;
            var canCreate = _table_len < this.maxGrads;
            /* 可以新增梯度 */
            if (canCreate) {
                /* 根据空table clone */
                var $newGrads = $("table#foolishlyTable .apiGrad").clone().removeAttr('id').removeClass("hide");
                /* 计算index */
                $newGrads = this.resetIndex($newGrads, _table_len);
                /* 填充 */
                $tbl.append($newGrads);
            } else {
                window.top.topPage.showInfoMessage(message.setting['rakeback.edit.maxPlan']);
            }

            $(event.currentTarget).unlock()
        },
        /**
         * 计算index
         * 如果obj不为空 只计算obj的index
         * obj 为空计算全部的
         * @param obj jquery对象
         * @param index 下标
         */
        resetIndex: function(obj, currentIndex) {
            if ( obj ){
                /* 判断是否是 jquery 对象 */
                var $obj = obj.val ? obj:$(obj);
                /* 每个需要提交的input */
                $obj.find('[data-name]').each( function (index, obj) {
                    var $this = $(this);
                    /* 替换下标 */
                    $this.prop('name',$this.data('name').replace('{n}',currentIndex));
                });
                /* 返回 */
                return $obj
            } else {
                /* 所有的table */
                $('._tables table').find('.apiGrad').each(function (index, obj) {
                    /* table */
                    var $table = $(this);
                    /* 每个需要提交的input */
                    $('[data-name]', $table).each(function() {
                        var $this = $(this);
                        /* 替换下标 */
                        $this.prop('name', $this.data('name').replace('{n}', index));
                    })
                });
            }
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
            var $_ratio = $('._ratio',$_game);
            /* 占成值 */
            var $_ratio_val = $_ratio.val();

            if ($_ratio.hasClass("error") && $_ratio_val) {
                $currentBtn.unlock();
                return;
            }
            if ($_ratio.val().indexOf('.') > 0) {
                /* 解决小数操作精度会缺失的问题 */
                var integerPart= $_ratio_val.split('.')[0];
                var decimalPart = $_ratio_val.split('.')[1];
                $_ratio_val = Number(integerPart + decimalPart.substring(0, 2) + (decimalPart.length < 2 ? '0' : '') + '.' + $_ratio_val.split('.')[1].substring(2, $_ratio_val.split('.')[1].length));
            } else {
                $_ratio_val = Number($_ratio_val) * 100;
            }

            /* is NaN && 表单验证未通过 */
            /*if ($_ratio_val !== $_ratio_val || $_ratio.hasClass("error")) {

            } else if ($_ratio_val <= 0 && option.post === 'sub') {

            } else */
            if ($_ratio_val < 100 * 100 || option.post === 'sub') {
                /* 如果小于100 :合法范围 */
                if (option.post === 'add') { /* 加 */
                    $_ratio_val += 50;
                } else { /* 减 */
                    $_ratio_val -= 50;
                }
            }

            ($_ratio_val / 100 >= 0 && $_ratio_val <= 100 * 100) && $_ratio.val($_ratio_val / 100 );
            $(event.currentTarget).unlock();
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
                    page.showPopover({currentTarget:$("[name='batch_ratio']")},{},"warning",window.top.message.setting_auto['返佣比例范围为0-100'],true);
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