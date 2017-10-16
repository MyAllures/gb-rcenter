/**
 * 香港六合彩
 */
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
            this.quickSelect();
        },
        /**
         * 快选号码
         */
        quickSelect: function () {
            var _this = this;
            $(".main-right .table-common table tbody tr td input[type='checkbox']").click(function () {
                var isChecked = $(this).is(":checked");
                var arr = $(this).attr("data-nums");
                if (typeof arr == 'undefined') {
                    return;
                }
                arr = arr.split(",");
                if (isChecked) {
                    $.each(arr, function (index, value) {
                        _this.addYellow(value);
                    });
                } else {
                    $.each(arr, function (index, value) {
                        _this.removeYellow(value);
                    });
                }

            });
        },
        //组合函数
        combination : function (arr, size) {
            var allResult = [];
            if(arr.length >= size){
                this.combinationSelect(allResult,arr,0,new Array(),0,size);
            }
            return allResult;
        },
        combinationSelect : function(allResult,dataList,dataIndex,resultCode,resultIndex,resultLen){
            var resultCount = resultIndex + 1;
            if (resultCount > resultLen) { // 全部选择完时，输出组合结果
                allResult.push(resultCode.join(","));
                return;
            }
            var count = dataList.length + resultCount - resultLen;
            for (var i = dataIndex; i < count; i++) {
                resultCode[resultIndex] = dataList[i];
                this.combinationSelect(allResult,dataList, i + 1, resultCode, resultIndex + 1,resultLen);
            }
        },
        //六合彩封盘
        closeLhcHandicap: function () {
            console.log("六合彩封盘了");
            $("#subContent td").unbind("click");//移除变黄点击事件
            $(".kjanniu a").unbind("click");//快捷金额按钮移除点击事件
            $("#subContent td input").attr("placeholder","已封盘");
            $("#subContent td input").attr("disabled",true);
            $("#inputMoney").attr("disabled",true);
            $("#inputMoney").attr("placeholder","已封盘");
            $("#subContent td input[type='checkbox']").attr("disabled",true);
            $("#subContent button[type='submit']").unbind("click");
            $(".main-left .fr .T-tab a").unbind("click");
            if ($("#subContent td").hasClass("new-ball-st")){
                $("#subContent td").addClass("block-bet-btn");
            }
        },
        //六合彩开盘
        openLhcHandicap: function () {
            console.log("六合彩开盘了11")
            $("#subContent td input").attr("placeholder","");
            $("#subContent td input").attr("disabled",false);
            $("#inputMoney").attr("disabled",false);
            $("#inputMoney").attr("placeholder","");
            $("#subContent td input[type='checkbox']").attr("disabled",false);
            $("#subContent td").removeClass("block-bet-btn");
            this.init();
        },
        setShortcutkeyButton: function () {
            this._super();
            if(!page.isLhcOpen) {
                this.closeLhcHandicap();
            }
        }
    })
});

