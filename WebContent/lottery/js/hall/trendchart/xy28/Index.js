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
                str += '<div class="left cl-32 openCode">' + data[i].openCode + '</div>';
                var kjData = data[i].openCode.split(",");
                var num1 = parseInt(kjData[0]);
                var num2 = parseInt(kjData[1]);
                var num3 = parseInt(kjData[2]);

                var tmpArr = [];
                $.each(kjData, function(index, value) {
                    tmpArr[parseInt(value)] = 1;
                });
                for(var j = 0; j < 10; ++j) {
                    if(tmpArr[j] == 1) {
                        str += '<var><i class="bg-red">' + j + '</i></var>';
                    } else {
                        str += '<var><i>' + j + '</i></var>';
                    }
                }

                var sum = num1 + num2 + num3;
                for(var j = 0; j < 28; ++j) {
                    str += '<var class="i_' + j + '">';
                    if(j == sum) {
                        str += '<i data-num="' + j + '" class="bg-red">';
                        str += j;

                        var bc1 = 0;
                        var Left = 0;
                        if(i < data.length - 1) {
                            var nextOpenCode = data[i + 1].openCode.split(",");
                            var nextSum = parseInt(nextOpenCode[0]) + parseInt(nextOpenCode[1]) + parseInt(nextOpenCode[2]);

                            bc1 = sum - nextSum;
                            if(bc1 > 0) {
                                Left = (bc1) * (-20);
                            } else if(bc1 < 0) {
                                bc1 = -bc1;
                            }
                            str += '<canvas class="zhexian" id="canvas' + i + '0" width="' + (bc1 + 1) * 20 + '" height="32px" style="z-index: 10; left:' + Left + 'px; display: none;"></canvas>';
                        }

                        str += '</i>';
                    } else {
                        str += '<i></i>';
                    }
                    str += '</var>';
                }
            }
            $("#zhexianData").html(str);

            for(var i = 0; i < data.length - 1; ++i) {

                var thisOpenCode = data[i].openCode.split(",");
                var sum = parseInt(thisOpenCode[0]) + parseInt(thisOpenCode[1]) + parseInt(thisOpenCode[2]);

                var canvas = document.getElementById("canvas" + i+"0");
                var context = canvas.getContext("2d");
                var nextOpenCode = data[i + 1].openCode.split(",");
                var nextSum = parseInt(nextOpenCode[0]) + parseInt(nextOpenCode[1]) + parseInt(nextOpenCode[2]);
                var bc1 = sum - nextSum;

                if(bc1 < 0) {
                    context.moveTo(17, 13);
                    context.lineTo(canvas.width - 5, canvas.height - 5);
                } else if(bc1 > 0) {
                    context.moveTo(canvas.width - 15, 13);
                    context.lineTo(8, canvas.height - 8);
                } else {
                    context.moveTo(10, 12);
                    context.lineTo(10, 30);
                }
                context.strokeStyle = "#cc0000";
                context.stroke();
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

         var cxzcs = []; // 出现总次数

         var zdylz = []; // 最大遗漏值
         var tmpZdylz = [];   // 临时计算最大遗漏值

         var pjylz = [];      // 平均遗漏值
         var tmpPjylz = [];   // 临时计算平均遗漏值

         var zdlcz = [];     // 最大连出值
         var tmpZdlcz = [];  // 临时计算最大连出值


         for (var jj = 0; jj < 28; ++jj) {
             cxzcs[jj] = 0;

             zdylz[jj] = 0;
             tmpZdylz[jj] = {
                 total: 0,   // 当前数
                 maxTotal: 0,    // 最大数
                 count: 0    // 计算次数
             };

             pjylz[jj] = 0;
             tmpPjylz[jj] = {
                 totalYl: 0, // 遗漏总计
                 count: 0,    // 遗漏次数
                 cx0Flag: 0 //出现标签

             };

             zdlcz[jj] = 0;
             tmpZdlcz[jj] = {
                 total: 0, //当前数
                 maxTotal: 0, // 连出最大
                 count: 0    // 连出计数
             };
         }

         var hm_cxzcs = []; // 出现总次数

         var hm_zdylz = []; // 最大遗漏值
         var hm_tmpZdylz = [];   // 临时计算最大遗漏值

         var hm_pjylz = [];      // 平均遗漏值
         var hm_tmpPjylz = [];   // 临时计算平均遗漏值

         var hm_zdlcz = [];     // 最大连出值
         var hm_tmpZdlcz = [];  // 临时计算最大连出值

         for (var j = 0; j < 28; ++j) {
             hm_cxzcs[j] = 0;

             hm_zdylz[j] = 0;
             hm_tmpZdylz[j] = {
                 total: 0,   // 当前数
                 maxTotal: 0,    // 最大数
                 count: 0    // 计算次数
             };

             hm_pjylz[j] = 0;
             hm_tmpPjylz[j] = {
                 totalYl: 0, // 遗漏总计
                 count: 0,    // 遗漏次数
                 cx0Flag: 0 //出现标签

             };

             hm_zdlcz[j] = 0;
             hm_tmpZdlcz[j] = {
                 total: 0, //当前数
                 maxTotal: 0, // 连出最大
                 count: 0    // 连出计数
             };
         }

         // 遗漏统计
         var numberArr = [];
         var hm_numberArr = [];


         for(var idata = 0; idata < data.length; idata++){
             var num = 0, hm_num = 0;
             var arr = [], hm_arr = [];
             var openCode = data[idata].openCode.split(",");

             for(var n = 0; n < 28; n++){
                 arr[n] = 0;
             }

             for(var n = 0; n < 10; n++){
                 hm_arr[n] = 0;
             }

             for(var jYl = 0; jYl < openCode.length; jYl++){
                 num += parseInt(openCode[jYl]);
                 hm_num = parseInt(openCode[jYl]);
                 //出现号码计数
                 hm_cxzcs[hm_num]++;
                 hm_arr[hm_num] = 1;
             }

             //出现号码标记为1
             arr[num] = 1;
             cxzcs[num]++;
             //每期出现或遗漏的数据
             numberArr.push(arr);

             hm_numberArr.push(hm_arr);

         }


         //计算遗漏平均值
         for(var ii = 0; ii < numberArr.length; ii++){
             for (var jj = 0; jj <= 27; jj++) {
                 //判断是遗漏号
                 if (numberArr[ii][jj] == 0) {
                     //遗漏累加
                     tmpPjylz[jj].totalYl++;
                     //遗漏计数标签
                     tmpPjylz[jj].cx0Flag++;
                     if(tmpPjylz[jj].cx0Flag == 1){
                         tmpPjylz[jj].count++;
                     }

                     //最大遗漏计算
                     tmpZdylz[jj].count++;
                     if(ii == numberArr.length - 1){
                         tmpZdylz[jj].total = tmpZdylz[jj].count; //当前遗漏
                         tmpZdylz[jj].maxTotal = tmpZdylz[jj].total > tmpZdylz[jj].maxTotal ? tmpZdylz[jj].total : tmpZdylz[jj].maxTotal;
                     }

                     //最大连出值
                     tmpZdlcz[jj].total = tmpZdlcz[jj].count; //当前连出值
                     tmpZdlcz[jj].maxTotal = tmpZdlcz[jj].total > tmpZdlcz[jj].maxTotal ? tmpZdlcz[jj].total : tmpZdlcz[jj].maxTotal;
                     tmpZdlcz[jj].count = 0;

                 }else{
                     //如果出现计数标签归零
                     tmpPjylz[jj].cx0Flag = 0;

                     //最大遗漏计算
                     tmpZdylz[jj].total = tmpZdylz[jj].count; //当前遗漏
                     tmpZdylz[jj].maxTotal = tmpZdylz[jj].total > tmpZdylz[jj].maxTotal ? tmpZdylz[jj].total : tmpZdylz[jj].maxTotal;
                     tmpZdylz[jj].count = 0;

                     //最大连出值
                     tmpZdlcz[jj].count++;
                     //如果当前期数等于最后一期
                     if(ii == numberArr.length - 1){
                         tmpZdlcz[jj].total = tmpZdlcz[jj].count; //当前连出值
                         tmpZdlcz[jj].maxTotal = tmpZdlcz[jj].total > tmpZdlcz[jj].maxTotal ? tmpZdlcz[jj].total : tmpZdlcz[jj].maxTotal;
                     }
                 }
             }
         }

         for(var iZd = 0; iZd < tmpZdylz.length; iZd++){
             zdylz[iZd] = tmpZdylz[iZd].maxTotal;
         }

         for(var iPj = 0; iPj < tmpPjylz.length; iPj++){
             pjylz[iPj] = parseInt(tmpPjylz[iPj].totalYl / tmpPjylz[iPj].count);
         }

         for(var iLc = 0; iLc < tmpZdlcz.length; iLc++){
             zdlcz[iLc] = tmpZdlcz[iLc].maxTotal;
         }




         //计算平均遗漏--号码位
         //计算遗漏平均值
         for(var ii = 0; ii < hm_numberArr.length; ii++){
             for (var jj = 0; jj < 10; jj++) {
                 //判断是遗漏号
                 if ( hm_numberArr[ii][jj] == 0) {
                     //遗漏累加
                     hm_tmpPjylz[jj].totalYl++;
                     //遗漏计数标签
                     hm_tmpPjylz[jj].cx0Flag++;
                     if( hm_tmpPjylz[jj].cx0Flag == 1){
                         hm_tmpPjylz[jj].count++;
                     }

                     //最大遗漏计算
                     hm_tmpZdylz[jj].count++;
                     if(ii ==  hm_numberArr.length - 1){
                         hm_tmpZdylz[jj].total =  hm_tmpZdylz[jj].count; //当前遗漏
                         hm_tmpZdylz[jj].maxTotal =  hm_tmpZdylz[jj].total >  hm_tmpZdylz[jj].maxTotal ?  hm_tmpZdylz[jj].total :  hm_tmpZdylz[jj].maxTotal;
                     }

                     //最大连出值
                     hm_tmpZdlcz[jj].total =  hm_tmpZdlcz[jj].count; //当前连出值
                     hm_tmpZdlcz[jj].maxTotal =  hm_tmpZdlcz[jj].total >  hm_tmpZdlcz[jj].maxTotal ?  hm_tmpZdlcz[jj].total :  hm_tmpZdlcz[jj].maxTotal;
                     hm_tmpZdlcz[jj].count = 0;

                 }else{
                     //如果出现计数标签归零
                     hm_tmpPjylz[jj].cx0Flag = 0;

                     //最大遗漏计算
                     hm_tmpZdylz[jj].total = hm_tmpZdylz[jj].count; //当前遗漏
                     hm_tmpZdylz[jj].maxTotal = hm_tmpZdylz[jj].total > hm_tmpZdylz[jj].maxTotal ? hm_tmpZdylz[jj].total : hm_tmpZdylz[jj].maxTotal;
                     hm_tmpZdylz[jj].count = 0;

                     //最大连出值
                     hm_tmpZdlcz[jj].count++;
                     //如果当前期数等于最后一期
                     if(ii == numberArr.length - 1){
                         hm_tmpZdlcz[jj].total =  hm_tmpZdlcz[jj].count; //当前连出值
                         hm_tmpZdlcz[jj].maxTotal =  hm_tmpZdlcz[jj].total >  hm_tmpZdlcz[jj].maxTotal ?  hm_tmpZdlcz[jj].total :  hm_tmpZdlcz[jj].maxTotal;
                     }
                 }
             }
         }



         for(var iZd = 0; iZd < hm_tmpZdylz.length; iZd++){
             hm_zdylz[iZd] = hm_tmpZdylz[iZd].maxTotal;
         }

         for(var iPj = 0; iPj < hm_tmpPjylz.length; iPj++){
             hm_pjylz[iPj] = parseInt(hm_tmpPjylz[iPj].totalYl / hm_tmpPjylz[iPj].count);
         }

         for(var iLc = 0; iLc < hm_tmpZdlcz.length; iLc++){
             hm_zdlcz[iLc] = hm_tmpZdlcz[iLc].maxTotal;
         }

//和值位统计
         var str1 = '',
             str2 = '',
             str3 = '',
             str4 = '';
         for(var i = 0; i < 28; ++i) {
             // 出现次数
             str1 += '<var><i>' + cxzcs[i] + '</i></var>';
             str2 += '<var><i>' + pjylz[i] + '</i></var>';
             str3 += '<var><i>' + zdylz[i] + '</i></var>';
             str4 += '<var><i>' + zdlcz[i] + '</i></var>';

         }

         $("#cxzcs").html(str1);
         $("#pjylz").html(str2);
         $("#zdylz").html(str3);
         $("#zdlcz").html(str4);


//号码位统计
         str1 = '';
         str2 = '';
         str3 = '';
         str4 = '';
         for (var i = 0; i < 10; ++i) {
             // 出现次数
             str1 += '<var><i>' + hm_cxzcs[i] + '</i></var>';
             str2 += '<var><i>' + hm_pjylz[i] + '</i></var>';
             str3 += '<var><i>' + hm_zdylz[i] + '</i></var>';
             str4 += '<var><i>' + hm_zdlcz[i] + '</i></var>';

         }

         $("#hm_cxzcs").html(str1);
         $("#hm_pjylz").html(str2);
         $("#hm_zdylz").html(str3);
         $("#hm_zdlcz").html(str4);


         // 遗漏数据
         for(var i = 0; i < 28; ++i) {
             var tmpCount = 0;
             var obj = $(".i_" + i + " i");
             for(var j = 0; j < obj.length; ++j) {
                 var o = obj[j];
                 if(typeof $(o).data('num') == 'undefined') {
                     tmpCount = tmpCount + 1;
                     $(o).html(tmpCount).addClass("transparent");
                 } else {
                     tmpCount = 0;
                 }
             }
         }

         // 遗漏分层
         for(var i = 0; i < 28; ++i) {
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
            for(var i = 0; i <= 9; ++i) {
                yData[i ] = 0;
                option.xAxis.data.push(i);
            }
            $.each(data, function(index, value) {
                var openCode = value.openCode;
                var arr = openCode.split(",");

                for(var i = 0; i < arr.length; ++i) {
                    //                console.log(parseInt(arr[i]));
                    yData[parseInt(arr[i] )]++;
                }
            });
    },
    })
});