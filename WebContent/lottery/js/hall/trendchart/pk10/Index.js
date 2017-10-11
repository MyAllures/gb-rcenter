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
                str += '<div class="cl-30 clean">';
                str += '<div class="left cl-31 number">' + data[i].expect + '</div>';
                str += '<div class="left cl-32 openCode" style="width:200px">' + data[i].openCode + '</div>';
                var kjData = data[i].openCode.split(",");

                for(var j = 0; j < kjData.length; ++j) {
                    var haoma = kjData[j];
                    var bc1 = 0;
                    var Left = 0;

                    str += '<div class="cl-35 cl-36">';
                    if(i < data.length - 1) {
                        bc1 = (data[i].openCode.split(",")[j]) - (data[i + 1].openCode.split(",")[j]);
                    }

                    if(bc1 > 0) {
                        Left = (bc1) * (-20);
                    } else if(bc1 < 0) {
                        bc1 = -bc1;
                    }
                    for(var k = 0; k < 10; ++k) {
                        str += '<var class="' + (j % 2 == 0 ? 'bg-1' : 'bg-2') + ' i_' + j + "_" + k + '">';
                        if(k == haoma - 1) {
                            str += '<i data-num="' + k + '" class="' + (j % 2 == 0 ? 'bg-4' : 'bg-5') + '">';
                            str += k + 1;
                            str += '<canvas class="zhexian" id="canvas' + i + j + '" width="' + (bc1 + 1) * 20 + '" height="32px" style="z-index: 10; left:' + Left + 'px; display: none;"></canvas>';
                            str += '</i>';
                        } else {
                            str += '<i></i>';
                        }
                        str += '</var>';
                    }

                    str += '</div>';
                }
                str += '</div>';
            }
            $("#zhexianData").html(str);

            for(var i = 0; i < data.length - 1; ++i) {
                for(var j = 0; j < 10; ++j) {
                    bc1 = Tools.parseInt(data[i].openCode.split(',')[j]) - Tools.parseInt(data[i + 1].openCode.split(',')[j]);
                    var Left = 0;
                    if(bc1 < 0) {
                        bc1 = -bc1;
                        Left = (bc1) * (-20);
                    }
                    var canvas = document.getElementById("canvas" + i + j);
                    var context =canvas.getContext("2d");
                    var bc1 = (data[i].openCode.split(',')[j]) - data[i + 1].openCode.split(',')[j];
                    if(bc1 < 0) {
                        context.moveTo(17, 13);
                        context.lineTo(canvas.width - 13, canvas.height - 8);
                    } else if(bc1 > 0) {
                        context.moveTo(canvas.width - 13, 13);
                        context.lineTo(8, canvas.height - 5);
                    } else {
                        context.moveTo(10, 12);
                        context.lineTo(10, 30);
                    }
                    if(j % 2 != 0) {
                        context.strokeStyle = "#cc0000";
                    }
                    context.stroke();
                }
            }
            if($("#checkboxZhexian").is(":checked")) {
                $(".zhexian").show();
            } else {
                $(".zhexian").hide();
            }

            // 遗漏
            _this.renderYilou(data);

            if($("#checkboxYlsj").is(":checked")) {
                $(".transparent").addClass("not-transparent");
            } else {
                $(".transparent").removeClass("not-transparent");
            }
        },
     renderYilou: function(data) {
         // 遗漏统计
         var yilou = [];
         for(var i = 0; i < 10; ++i) {
             yilou[i] = [];
             for(var j = 0; j < 10; ++j) {
                 yilou[i][j] = {
                     cxCs: 0, // 出现次数
                     maxLcCs: 0, // 最大连出次数
                     ylArr: [] // 遗漏次数
                 };
             }
         }

         for(var i = 0; i < 10; ++i) {
             for(var j = 0; j < 10; ++j) {
                 var obj = yilou[i][j];

                 var tmpYlCs = 0; // 连续遗漏次数
                 var tmpLcCs = 0; // 连出次数
                 var datalength = data.length-1;
                 $.each(data, function(index, value) {
                     var openCodeArr = value.openCode.split(",");
                     var tmpValue = Tools.parseInt(openCodeArr[i]);

                     if(tmpValue != j + 1 ) { // 遗漏
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
         }

         var str1 = '',
             str2 = '',
             str3 = '',
             str4 = '';
         for(var i = 0; i < 10; ++i) {
             for(var j = 0; j < 10; ++j) {
                 var obj = yilou[i][j];
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
         }

         $("#cxzcs").html(str1);
         $("#pjylz").html(str2);
         $("#zdylz").html(str3);
         $("#zdlcz").html(str4);

         var str5 = '';
         for(var i = 0; i < 3; ++i) {
             for(var j = 0; j < 10; ++j) {
                 str5 += '<tr>';
                 if(j == 0) {
                     if(i == 0) {
                         str5 += '<td rowspan="10">百位</td>';
                     } else if(i == 1) {
                         str5 += '<td rowspan="10">十位</td>';
                     } else if(i == 2) {
                         str5 += '<td rowspan="10">个位</td>';
                     }
                 }

                 str5 += '<td>' + (j + 1) + '</td>';

                 var obj = yilou[i][j];
                 // 出现次数
                 str5 += '<td>' + obj.cxCs + '</td>';

                 // 平均遗漏值&最大遗漏值
                 var maxYl = 0;
                 if(obj.ylArr.length > 0) {
                     var sumYl = 0;
                     $.each(obj.ylArr, function(index, value) {
                         sumYl += value;
                         maxYl = value > maxYl ? value : maxYl;
                     });
                     str5 += '<td>' + Math.floor(sumYl / obj.ylArr.length) + '</td>';
                     str5 += '<td>' + maxYl + '</td>';
                 } else {
                     str5 += '<td>0</td>';
                     str5 += '<td>0</td>';
                 }

                 // 最大连出值
                 str5 += '<td>' + obj.maxLcCs + '</td>';
                 str5 += '</tr>';
             }
         }
         $("#shuju4 table tbody").html(str5);

         // 遗漏数据
         for(var i = 0; i < 10; ++i) {
             for(var j = 0; j < 10; ++j) {
                 var tmpCount = 0;
                 var obj = $(".i_" + i + "_" + j + " i");
                 $(obj).each(function() {
                     if(typeof $(this).data('num') == 'undefined') {
                         tmpCount = tmpCount + 1;
                         $(this).html(tmpCount).addClass("transparent");
                     } else {
                         tmpCount = 0;
                     }
                 });
             }
         }

         // 遗漏分层
         for(var i = 0; i < 10; ++i) {
             for(var j = 0; j < 10; ++j) {
                 var tmpCount = 0;
                 var obj = $(".i_" + i + "_" + j + " i");
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
     },
        setzhifang: function (yData,option,data) {
            for(var i = 1; i <= 10; ++i) {
                yData[i - 1] = 0;
                option.xAxis.data.push(i);
            }
            $.each(data, function(index, value) {
                var openCode = value.openCode;
                var arr = openCode.split(",");

                for(var i = 0; i < arr.length; ++i) {
                    yData[Tools.parseInt(arr[i] - 1)]++;
                }
            });
        },
    })
});