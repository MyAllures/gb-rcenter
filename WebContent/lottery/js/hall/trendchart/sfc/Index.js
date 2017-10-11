define(['site/hall/trendchart/LotteryTrendChart'], function (BasePage) {
    return BasePage.extend({
        init: function () {
            this._super();
        },
        zhexian: function (data) {//折线
            var _this =  this;
            var str = '';
            for(var i = 0; i < data.length; i++) {
                // qihao
                str += '<div class="cl-30 clean">';
                str += '<div class="left cl-31 number">' + data[i].expect + '</div>';
                str += '<div class="left cl-32 openCode" style="width:150px">' + data[i].openCode + '</div>';
                var kjData = data[i].openCode.split(",");

                var tmp = [];
                $.each(kjData, function(index, value) {
                    tmp[Tools.parseInt(value)] = 1;
                });

                str += '<div class="cl-35 cl-36">';
                for(var j = 1; j <= 20; ++j) {
                    var s = j >= 11 ? 'bg-1' : 'bg-2';
                    var s2 = j >= 11 ? 'bg-4' : 'bg-5';
                    if(tmp[j] == 1) {
                        str += '<var class="' + s + ' i_' + j + '"><i data-num="' + j + '" class="' + s2 + '">' + j + '</i></var>';
                    } else {
                        str += '<var class="' + s + ' i_' + j + '"><i></i></var>';
                    }
                }

                // 012路
                var str1 = [],
                    str2 = [],
                    str3 = [];
                for(var j = 1; j <= 20; ++j) {
                    if(tmp[j] == 1) {
                        if(j % 3 == 0) {
                            str1.push(j);
                        } else if(j % 3 == 1) {
                            str2.push(j);
                        } else {
                            str3.push(j);
                        }
                    }
                }
                str += '<var><i style="width:100px">' + str1.join("&nbsp;") + '</i></var>';
                str += '<var><i style="width:100px">' + str2.join("&nbsp;") + '</i></var>';
                str += '<var><i style="width:100px">' + str3.join("&nbsp;") + '</i></var>';

                //跨度
                var kuadu = 0;
                $.each(kjData, function(index1, value1) {
                    $.each(kjData, function(index2, value2) {
                        var tmp = Math.abs(Tools.parseInt(value1) - Tools.parseInt(value2));
                        kuadu = tmp > kuadu ? tmp : kuadu;
                    })
                });
                str += '<var><i style="width:97px">' + kuadu + '</i></var>';

                str += '</div>';
            }
            $("#zhexianData").html(str);
            // 遗漏
            this.renderYilou(data);

            if($("#checkboxYlsj").is(":checked")) {
                $(".transparent").addClass("not-transparent");
            } else {
                $(".transparent").removeClass("not-transparent");
            }
    },
     renderYilou: function(data) {
         // 遗漏统计
         var yilou = [];
         for(var j = 1; j <= 20; ++j) {
             yilou[j] = {
                 cxCs: 0, // 出现次数
                 maxLcCs: 0, // 最大连出次数
                 ylArr: [] // 遗漏次数
             };
         }

         var tmpArr = [];

         $.each(data, function(index, value) {
             tmpArr[index] = [];
             for(var i = 1; i <= 20; ++i) {
                 tmpArr[index][i] = 0;
             }
             var openCodeArr = value.openCode.split(",");
             $.each(openCodeArr, function(index2, value2) {
                 tmpArr[index][Tools.parseInt(value2)]++;
             });
         });

             var datalength = data.length-1;
         for(var j = 1; j <= 20; ++j) {
             var obj = yilou[j];
             var tmpYlCs = 0; // 连续遗漏次数
             var tmpLcCs = 0; // 连出次数
             $.each(tmpArr, function(index, value) {
                 var tmpValue = Tools.parseInt(value[j]);

                 if(tmpValue != 1) { // 遗漏
                     tmpYlCs++;
                     tmpLcCs = 0;
                     if (index==datalength){
                         obj.ylArr.push(tmpYlCs);
                     }
                 } else { // 中
                     obj.cxCs++;
                     tmpLcCs++;
                     if(tmpYlCs !=0){
                         obj.ylArr.push(tmpYlCs);
                     }
                     tmpYlCs = 0;
                 }
                     if(tmpLcCs > obj.maxLcCs) {
                         obj.maxLcCs = tmpLcCs;
                     }
             });
         }
         var str1 = '',
             str2 = '',
             str3 = '',
             str4 = '';
         for(var j = 1; j <= 20; ++j) {
             var obj = yilou[j];
             // 出现次数
             str1 += '<var><i>' + obj.cxCs + '</i></var>';

             // 平均遗漏值&最大遗漏值
             var maxYl = 0;
             if(obj.ylArr.length > 0) {
                 var sumYl = 0;
                 $.each(obj.ylArr, function(index, value) {
                     sumYl += value;
                     maxYl = value > maxYl ? value : maxYl;
                 });
                 str2 += '<var><i>' + Math.floor(sumYl / obj.ylArr.length) + '</i></var>';
                 str3 += '<var><i>' + maxYl + '</i></var>';
             } else {
                 str2 += '<var><i>0</i></var>';
                 str3 += '<var><i>0</i></var>';
             }

             // 最大连出值
             str4 += '<var><i>' + obj.maxLcCs + '</i></var>';
         }

         str1 += '<var><i style="width:100px"></i></var>';
         str1 += '<var><i style="width:100px"></i></var>';
         str1 += '<var><i style="width:100px"></i></var>';
         str1 += '<var><i style="width:97px"></i></var>';
         str2 += '<var><i style="width:100px"></i></var>';
         str2 += '<var><i style="width:100px"></i></var>';
         str2 += '<var><i style="width:100px"></i></var>';
         str2 += '<var><i style="width:97px"></i></var>';
         str3 += '<var><i style="width:100px"></i></var>';
         str3 += '<var><i style="width:100px"></i></var>';
         str3 += '<var><i style="width:100px"></i></var>';
         str3 += '<var><i style="width:97px"></i></var>';

         $("#cxzcs").html(str1);
         $("#pjylz").html(str2);
         $("#zdylz").html(str3);
         $("#zdlcz").html(str4);

         // 遗漏数据
         for(var i = 1; i <= 20; ++i) {
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
         for(var i = 1; i <= 20; ++i) {
             var obj = $(".i_" + i + " i");
             for(var j = obj.length - 1; j >= 0; --j) {
                 var o = obj[j];
                 if(typeof $(o).data('num') == 'undefined') {
                     $(o).parent().addClass("ylfc");
                 } else {
                     break;
                 }
             }
         }

         if($("#checkboxYlfc").is(":checked")) {
             $(".ylfc").addClass("ylfc-bg");
         } else {
             $(".ylfc").removeClass("ylfc-bg");
         }
     },
        setzhifang: function (yData,option,data) {
            for(var i = 0; i < 20; ++i) {
                yData[i] = 0;
                option.xAxis.data.push(i+1);
            }
            $.each(data, function(index, value) {
                var openCode = value.openCode;
                var arr = openCode.split(",");
                for(var i = 0; i < arr.length; ++i) {
                    yData[Tools.parseInt(arr[i]-1)]++;
                }
            });
        }
    })
});