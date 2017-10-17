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
        }
    })
});

