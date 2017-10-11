define(['site/hall/trendchart/LotteryTrendChart'], function (LotteryTrendChart) {
    return LotteryTrendChart.extend({
        init: function () {
            this._super();
        },
        zhexian: function (data) {
            var _this = this;
            var str = '';
            for(var i = 0; i < data.length; i++) {
                // qihao
                str += '<div class="cl-30 clean" style="width:1680px；height:42px;line-height:42px;">';
                str += '<div class="left cl-31 number" style="height:42px;line-height:42px;">' + data[i].expect + '</div>';

                var arr1 = [],
                    arr2 = [];
                var kjData = data[i].openCode.split(",");
                var tmp = [];
                for(var j = 0; j < 20; ++j) {
                    tmp[Tools.parseInt(kjData[j])] = 1;
                    if(j < 10) {
                        arr1.push(kjData[j]);
                    } else {
                        arr2.push(kjData[j]);
                    }
                }
                str += '<div class="left cl-32 openCode" style="width:180px;height:42px;">' + arr1.join(",") + "<br>" + arr2.join(",") + '</div>';

                str += '<div class="cl-35 cl-36">';
                for(var j = 1; j <= 80; ++j) {
                    if(typeof tmp[j] != 'undefined' && tmp[j] == 1) {
                        str += '<var class="i_' + j + '"><i style="height:17px;margin-top:12px;margin-bottom:12px;" data-num="' + j + '" class="bg-5">' + j + '</i></var>';
                    } else {
                        str += '<var class="i_' + j + '"><i style="height:17px;margin-top:12px;margin-bottom:12px;"></i></var>';
                    }
                }
                str += '</div>';
            }
            $("#zhexianData").html(str);
            _this.renderYilou(data);

            if($("#checkboxYlsj").is(":checked")) {
                $(".transparent").addClass("not-transparent");
            } else {
                $(".transparent").removeClass("not-transparent");
            }
        },
     renderYilou: function(data) {
         for(var i = 1; i <= 80; ++i) {
             var tmpCount = 0;
             var obj = $(".i_" + i + " i");
             $(obj).each(function() {
                 if(typeof $(this).data('num') == 'undefined') {
                     tmpCount = tmpCount + 1;
                     $(this).html(tmpCount).addClass("transparent");
                 } else {
                     tmpCount = 0;
                 }
             });
         }

         // 遗漏分层
         for(var i = 1; i <= 80; ++i) {
             var tmpCount = 0;
             var obj = $(".i_" + i + " i");
             for(var k = obj.length - 1; k >= 0; --k) {
                 var tmpObj = $(obj).eq(k);
                 if(typeof $(tmpObj).data('num') == 'undefined') {
                     $(tmpObj).parent().addClass("ylfc")
                 } else {
                     break;
                 }
             }
         }
     }
    })
});