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
                str += '<div class="left cl-31 number">' + this.formatDateTime(new Date(data[i].openTime), "yyyy-MM-dd HH:mm:ss") + '</div>';
                str += '<div class="left cl-31 number">' + data[i].expect + '</div>';
                str += '<div class="left cl-32 openCode">' + data[i].openCode + '</div>';
                var kjData = data[i].openCode.split(",");

                var num1 = Tools.parseInt(kjData[0]);
                var num2 = Tools.parseInt(kjData[1]);
                var num3 = Tools.parseInt(kjData[2]);
                var sum = num1 + num2 + num3;
                str += '<div class="left cl-32 openCode" style="width:50px">' + sum + '</div>';

                var kuadu = Math.abs(num1 - num2);
                var tmp = Math.abs(num1 - num3);
                kuadu = tmp > kuadu ? tmp : kuadu;
                tmp = Math.abs(num2 - num3);
                kuadu = tmp > kuadu ? tmp : kuadu;

                for(var j = 0; j < kjData.length; ++j) {
                    var haoma = kjData[j];
                    var bc1 = 0;
                    var Left = 0;

                    str += '<div class="cl-35 cl-36">';
                    if(i < data.length - 1) {
                        bc1 = (data[i].openCode.split(",")[j]) - (data[i + 1].openCode.split(",")[j]);
                    }

                    if(bc1 > 0) {
                        Left = (bc1) * (-34);
                    } else if(bc1 < 0) {
                        bc1 = -bc1;
                    }
                    for(var k = 1; k < 7; ++k) {
                        str += '<var class="' + (j % 2 == 0 ? 'bg-1' : 'bg-2') + ' i_' + j + "_" + k + ' k3_varW">';
                        if(k == haoma) {
                            str += '<i data-num="' + k + '" class="' + (j % 2 == 0 ? 'bg-4' : 'bg-5') + '">';
                            str += k;
                            str += '<canvas class="zhexian" id="canvas' + i + j + '" width="' + (bc1 + 1) * 34 + '" height="32px" style="z-index: 10; left:' + Left + 'px; display: none;"></canvas>';
                            str += '</i>';
                        } else {
                            str += '<i></i>';
                        }
                        str += '</var>';

                        // 三不同对子豹子
                        if(j == 2 && k == 6) {
                            var type = num1 == num2 && num2 == num3 ? 2 : (num1 == num2 || num1 == num3 || num2 == num3 ? 1 : (num2 - num1 == 1 && num3 - num2 == 1 ? 3 : 0));
                            if(i < data.length - 1) {
                                var kjData = data[i + 1].openCode.split(',');
                                num1 = Tools.parseInt(kjData[0]);
                                num2 = Tools.parseInt(kjData[1]);
                                num3 = Tools.parseInt(kjData[2]);
                                var type2 = num1 == num2 && num2 == num3 ? 2 : (num1 == num2 || num1 == num3 || num2 == num3 ? 1 : (num2 - num1 == 1 && num3 - num2 == 1 ? 3 : 0));

                                bc1 = type - type2;
                                if(bc1 < 0) {
                                    bc1 = -bc1;
                                    Left = 0;
                                } else {
                                    Left = (bc1) * (-40);
                                }
                            }

                            for(var w = 0; w < 4; ++w) {
                                if(w == type) {
                                    str += '<var class="" style="text-align:center;"><i data-type="txFlag" data-num="type_'+ type +':qishu_'+ i +'"   style="margin:auto;width:42px!important;background:#ffddc4;color:#ff0000">' + (type == 0 ? '三不同' : (type == 1 ? '对子' : type == 3 ? '顺子' : '豹子'));
                                    str += '<canvas class="zhexian" id="canvas' + i + '4" width="' + (bc1 + 1) * 40 + '" height="32px" style="z-index: 10; left:' + Left + 'px;"></canvas>';
                                    str += '</i></var>';
                                } else {
                                    str += '<var class="bg-2"><i data-type="txFlag" style="width:40px"></i></var>';
                                }
                            }
                        }
                    }
                    str += '</div>';
                }
                str += '</div>';
            }
            $("#zhexianData").html(str);

            for(var i = 0; i < data.length - 1; ++i) {
                for(var j = 0; j < 3; ++j) {
                    bc1 = Tools.parseInt(data[i].openCode.split(',')[j]) - Tools.parseInt(data[i + 1].openCode.split(',')[j]);
                    var Left = 0;
                    if(bc1 < 0) {
                        bc1 = -bc1;
                        Left = (bc1) * (-35);
                    }
                    var canvas = document.getElementById("canvas" + i + j);
                    var context = canvas.getContext("2d");
                    var bc1 = (data[i].openCode.split(',')[j]) - data[i + 1].openCode.split(',')[j];
                    if(bc1 < 0) {
                        context.moveTo(13, 13);
                        context.lineTo(canvas.width - 21, canvas.height - 7);
                    } else if(bc1 > 0) {
                        context.moveTo(canvas.width - 26, 15);
                        context.lineTo(11, canvas.height - 5);
                    } else {
                        context.moveTo(10, 15);
                        context.lineTo(10, 26);
                    }
                    if(j % 2 != 0) {
                        context.strokeStyle = "#cc0000";
                    }
                    context.stroke();
                }
            }
            // 对子三不同豹子
            for(var i = 0; i < data.length - 1; ++i) {
                var kjData = data[i].openCode.split(',');
                var num1 = Tools.parseInt(kjData[0]);
                var num2 = Tools.parseInt(kjData[1]);
                var num3 = Tools.parseInt(kjData[2]);
                var type1 = num1 == num2 && num2 == num3 ? 2 : (num1 == num2 || num1 == num3 || num2 == num3 ? 1 : (num2 - num1 == 1 && num3 - num2 == 1 ? 3 : 0));
                kjData = data[i + 1].openCode.split(',');
                num1 = Tools.parseInt(kjData[0]);
                num2 = Tools.parseInt(kjData[1]);
                num3 = Tools.parseInt(kjData[2]);
                var type2 = num1 == num2 && num2 == num3 ? 2 : (num1 == num2 || num1 == num3 || num2 == num3 ? 1 : (num2 - num1 == 1 && num3 - num2 == 1 ? 3 : 0));

                bc1 = type1 - type2;
                var Left = 0;
                if(bc1 < 0) {
                    bc1 = -bc1;
                    Left = (bc1) * (-30);
                }
                var canvas = document.getElementById("canvas" + i + '4');
                var context = canvas.getContext("2d");
                var bc1 = type1 - type2;
                if(bc1 < 0) {
                    context.moveTo(17, 16);
                    context.lineTo(canvas.width - 23, canvas.height - 6);
                } else if(bc1 > 0) {
                    context.moveTo(canvas.width - 27, 15);
                    context.lineTo(15, canvas.height - 8);
                } else {
                    context.moveTo(20, 25);
                    context.lineTo(20, 15);
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
         var data_len = data.length;

         for(var i = 0; i < 4; ++i) {
             yilou[i] = [];
             for(var j = 1; j < 7; ++j) {
                 yilou[i][j] = {
                     cxCs: 0, // 出现次数
                     cxZhi:[], //出现时存储的期数
                     maxLcCs: 0, // 最大连出次数
                     ylCs:0, // 遗漏次数
                     ylArr: [] // 最大遗漏次数数组
                 };
             }
         }

         //初始化遗
         yilou[3][1].ylArr[1] = 0;
         yilou[3][2].ylArr[2] = 0;
         yilou[3][3].ylArr[3] = 0;
         yilou[3][4].ylArr[4] = 0;


         var yilouJis = [];
         var yilouJis1 = [];
         var yilouJis2 = [];
         var yilouJis3 = [];
         for(var n = 0; n < data_len; n++){
             yilouJis[n] = n;
             yilouJis1[n] = n;
             yilouJis2[n] = n;
             yilouJis3[n] = n;
         }

         $("i[data-type='txFlag']").each(function (index, value) {
             var flag = $(this)[0].hasAttribute("data-num");
             if(flag){
                 var num =$(this).attr("data-num");
                 var type_012 = num.split(":")[0];
                 var qisuh = num.split(":")[1];
                 var number_type = type_012.split("_")[1]; //类型标记
                 var number_qishu = qisuh.split("_")[1]; //期数的值

                 if(number_type == "0"){
                     yilou[3][1].cxCs++; //大不同号出现次数
                     yilou[3][1].cxZhi.push(number_qishu);
                 }else if(number_type == "1"){
                     yilou[3][2].cxCs++; //对子号出现次数
                     yilou[3][2].cxZhi.push(number_qishu);
                 }else if(number_type == "2"){
                     yilou[3][3].cxCs++; //豹子号出现次数
                     yilou[3][3].cxZhi.push(number_qishu);
                 }else if(number_type == "3"){
                     yilou[3][4].cxCs++; //顺子号出现次数
                     yilou[3][4].cxZhi.push(number_qishu);
                 }
             }
         });


         var lcflag_0 = yilou[3][1].cxZhi;
         var lcflag_1 = yilou[3][2].cxZhi;
         var lcflag_2 = yilou[3][3].cxZhi;
         var lcflag_3 = yilou[3][4].cxZhi;

         var maxLcCs_tmp_0 = 0; //最大连出次数
         var maxLcCs_tmp_1 = 0; //最大连出次数
         var maxLcCs_tmp_2 = 0; //最大连出次数
         var maxLcCs_tmp_3 = 0; //最大连出次数

         var maxYlCs_tmp_0 = 0; //最大遗漏次数
         var maxYlCs_tmp_1 = 0; //最大遗漏次数
         var maxYlCs_tmp_2 = 0; //最大遗漏次数
         var maxYlCs_tmp_3 = 0; //最大遗漏次数

         if(lcflag_0.length > 0){
             for(var m = 0; m < lcflag_0.length; m++){
                 for(var n=0; n<data_len; n++){
                     if(yilouJis[n] == lcflag_0[m]){
                         yilouJis[n] = 99;
                     }
                 }
             }

             for(var n1 = 0; n1 < data_len; n1++){
                 if(yilouJis[n1] != 99){
                     //最大遗漏值临时计算
                     maxYlCs_tmp_0++;

                     if(maxYlCs_tmp_0 < 2){
                         //遗漏次数
                         yilou[3][1].ylCs++;
                     }

                     //判断已存在的连数是否是最大连数将最大连数放入最大连数数组中
                     yilou[3][1].maxLcCs = maxLcCs_tmp_0 > yilou[3][1].maxLcCs ? maxLcCs_tmp_0 : yilou[3][1].maxLcCs;
                     maxLcCs_tmp_0 = 0; //将当前计算数值清零

                     if(n1 == data_len-1){
                         yilou[3][1].ylArr[1] = maxYlCs_tmp_0 > yilou[3][1].ylArr[1] ? maxYlCs_tmp_0 : yilou[3][1].ylArr[1];
                     }
                 }else{
                     //最大遗漏值
                     yilou[3][1].ylArr[1] = maxYlCs_tmp_0 > yilou[3][1].ylArr[1] ? maxYlCs_tmp_0 : yilou[3][1].ylArr[1];
                     maxYlCs_tmp_0 = 0;

                     maxLcCs_tmp_0++;
                     if(n1 == data_len-1){
                         yilou[3][1].maxLcCs = maxLcCs_tmp_0 > yilou[3][1].maxLcCs ? maxLcCs_tmp_0 : yilou[3][1].maxLcCs;
                     }
                 }
             }
         }

         if(lcflag_1.length > 0){
             for(var m = 0; m < lcflag_1.length; m++){
                 for(var n=0; n<data_len; n++){
                     if(yilouJis1[n] == lcflag_1[m]){
                         yilouJis1[n] = 99;
                     }
                 }
             }

             for(var n1 = 0; n1 < data_len; n1++){
                 if(yilouJis1[n1] != 99){
                     //最大遗漏值临时计算
                     maxYlCs_tmp_1++;

                     if(maxYlCs_tmp_1 < 2){
                         //遗漏次数
                         yilou[3][2].ylCs++;
                     }

                     //判断已存在的连数是否是最大连数将最大连数放入最大连数数组中
                     yilou[3][2].maxLcCs = maxLcCs_tmp_1 > yilou[3][2].maxLcCs ? maxLcCs_tmp_1 : yilou[3][2].maxLcCs;
                     maxLcCs_tmp_1 = 0; //将当前计算数值清零

                     if(n1 == data_len-1){
                         yilou[3][2].ylArr[2] = maxYlCs_tmp_1 > yilou[3][2].ylArr[2] ? maxYlCs_tmp_1 : yilou[3][2].ylArr[2];
                     }
                 }else{
                     //最大遗漏值
                     yilou[3][2].ylArr[2] = maxYlCs_tmp_1 > yilou[3][2].ylArr[2] ? maxYlCs_tmp_1 : yilou[3][2].ylArr[2];
                     maxYlCs_tmp_1 = 0;

                     maxLcCs_tmp_1++;
                     if(n1 == data_len-1){
                         yilou[3][2].maxLcCs = maxLcCs_tmp_1 > yilou[3][2].maxLcCs ? maxLcCs_tmp_1 : yilou[3][2].maxLcCs;
                     }
                 }
             }
         }


         if(lcflag_2.length > 0){
             for(var m = 0; m < lcflag_2.length; m++){
                 for(var n=0; n<data_len; n++){
                     if(yilouJis2[n] == lcflag_2[m]){
                         yilouJis2[n] = 99;
                     }
                 }

             }

             for(var n1 = 0; n1 < data_len; n1++){
                 if(yilouJis2[n1] != 99){
                     //最大遗漏值临时计算
                     maxYlCs_tmp_2++;
                     if(maxYlCs_tmp_2 < 2){
                         //遗漏次数
                         yilou[3][3].ylCs++;
                     }

                     //判断已存在的连数是否是最大连数将最大连数放入最大连数数组中
                     yilou[3][3].maxLcCs = maxLcCs_tmp_2 > yilou[3][3].maxLcCs ? maxLcCs_tmp_2 : yilou[3][3].maxLcCs;
                     maxLcCs_tmp_2 = 0; //将当前计算数值清零

                     if(n1 == data_len-1){
                         yilou[3][3].ylArr[3] = maxYlCs_tmp_2 > yilou[3][3].ylArr[3] ? maxYlCs_tmp_2 : yilou[3][3].ylArr[3];
                     }
                 }else{
                     //最大遗漏值
                     yilou[3][3].ylArr[3] = maxYlCs_tmp_2 > yilou[3][3].ylArr[3] ? maxYlCs_tmp_2 : yilou[3][3].ylArr[3];
                     maxYlCs_tmp_2 = 0;

                     maxLcCs_tmp_2++;
                     if(n1 == data_len-1){
                         yilou[3][3].maxLcCs = maxLcCs_tmp_2 > yilou[3][3].maxLcCs ? maxLcCs_tmp_2 : yilou[3][3].maxLcCs;
                     }
                 }
             }
         }


         if(lcflag_3.length > 0){
             for(var m = 0; m < lcflag_3.length; m++){
                 for(var n=0; n<data_len; n++){
                     if(yilouJis3[n] == lcflag_3[m]){
                         yilouJis3[n] = 99;
                     }
                 }

             }

             for(var n1 = 0; n1 < data_len; n1++){
                 if(yilouJis3[n1] != 99){
                     //最大遗漏值临时计算
                     maxYlCs_tmp_3++;
                     if(maxYlCs_tmp_3 < 2){
                         //遗漏次数
                         yilou[3][4].ylCs++;
                     }

                     //判断已存在的连数是否是最大连数将最大连数放入最大连数数组中
                     yilou[3][4].maxLcCs = maxLcCs_tmp_3 > yilou[3][4].maxLcCs ? maxLcCs_tmp_3 : yilou[3][4].maxLcCs;
                     maxLcCs_tmp_3 = 0; //将当前计算数值清零

                     if(n1 == data_len-1){
                         yilou[3][4].ylArr[4] = maxYlCs_tmp_3 > yilou[3][4].ylArr[4] ? maxYlCs_tmp_3 : yilou[3][4].ylArr[4];
                     }
                 }else{
                     //最大遗漏值
                     yilou[3][4].ylArr[4] = maxYlCs_tmp_3 > yilou[3][4].ylArr[4] ? maxYlCs_tmp_3 : yilou[3][4].ylArr[4];
                     maxYlCs_tmp_3 = 0;

                     maxLcCs_tmp_3++;
                     if(n1 == data_len-1){
                         yilou[3][4].maxLcCs = maxLcCs_tmp_3 > yilou[3][4].maxLcCs ? maxLcCs_tmp_3 : yilou[3][4].maxLcCs;
                     }
                 }
             }
         }
         var datalength = data.length-1;
         for(var i = 0; i < 3; ++i) {
             for(var j = 1; j < 7; ++j) {
                 var obj = yilou[i][j];

                 var tmpYlCs = 0; // 连续遗漏次数
                 var tmpLcCs = 0; // 连出次数
                 $.each(data, function(index, value) {
                     var openCodeArr = value.openCode.split(",");
                     var tmpValue = Tools.parseInt(openCodeArr[i]);

                     if(tmpValue != j) { // 遗漏
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
         for(var i = 0; i < 3; ++i) {
             for(var j = 1; j < 7; ++j) {
                 var obj = yilou[i][j];
                 // 出现次数
                 str1 += '<var class="k3_varW"><i>' + obj.cxCs + '</i></var>';

                 // 平均遗漏值&最大遗漏值
                 var maxYl = 0;
                 if(obj.ylArr.length > 0) {
                     var sumYl = 0;
                     $.each(obj.ylArr, function(index, value) {
                         sumYl += value;
                         maxYl = value > maxYl ? value : maxYl;
                     });
                     str2 += '<var class="k3_varW"><i>' + Math.floor(sumYl / obj.ylArr.length) + '</i></var>';
                     str3 += '<var class="k3_varW"><i>' + maxYl + '</i></var>';
                 } else {
                     str2 += '<var class="k3_varW"><i>0</i></var>';
                     str3 += '<var class="k3_varW"><i>0</i></var>';
                 }

                 // 最大连出值
                 str4 += '<var class="k3_varW"><i>' + obj.maxLcCs + '</i></var>';
             }
         }

         str1 += '<var><i style="width:40px" class="sbt_cxcs"></i></var><var><i style="width:40px" class="duiz_cxcs"></i></var><var><i style="width:40px" class="baozi_cxcs"></i></var><var><i style="width:40px" class="shunzi_cxcs"></i></var>';
         str2 += '<var><i style="width:40px" class="sbt_pjyl"></i></var><var><i style="width:40px" class="duiz_pjyl"></i></var><var><i style="width:40px" class="baozi_pjyl"></i></var><var><i style="width:40px" class="shunzi_pjyl"></i></var>';
         str3 += '<var><i style="width:40px" class="sbt_zdyl"></i></var><var><i style="width:40px" class="duiz_zdyl"></i></var><var><i style="width:40px" class="baozi_zdyl"></i></var><var><i style="width:40px" class="shunzi_zdyl"></i></var>';
         str4 += '<var><i style="width:40px" class="sbt_zdlc"></i></var><var><i style="width:40px" class="duiz_zdlc"></i></var><var><i style="width:40px" class="baozi_zdlc"></i></var><var><i style="width:40px" class="shunzi_zdlc"></i></var>';
         $("#cxzcs").html(str1);
         $("#pjylz").html(str2);
         $("#zdylz").html(str3);
         $("#zdlcz").html(str4);


         //出现次数统计
         $(".sbt_cxcs").html(yilou[3][1].cxCs);
         $(".duiz_cxcs").html(yilou[3][2].cxCs);
         $(".baozi_cxcs").html(yilou[3][3].cxCs);
         $(".shunzi_cxcs").html(yilou[3][4].cxCs);

         //平均遗漏值统计
         $(".sbt_pjyl").html((Math.floor((data_len - yilou[3][1].cxCs) / yilou[3][1].ylCs)) == Infinity ? 0 : (Math.floor((data_len - yilou[3][1].cxCs) / yilou[3][1].ylCs)));
         $(".duiz_pjyl").html((Math.floor((data_len - yilou[3][2].cxCs) / yilou[3][2].ylCs)) == Infinity ? 0 : (Math.floor((data_len - yilou[3][2].cxCs) / yilou[3][2].ylCs)));
         $(".baozi_pjyl").html((Math.floor((data_len - yilou[3][3].cxCs) / yilou[3][3].ylCs)) == Infinity ? 0 : (Math.floor((data_len - yilou[3][3].cxCs) / yilou[3][3].ylCs)));
         $(".shunzi_pjyl").html((Math.floor((data_len - yilou[3][4].cxCs) / yilou[3][4].ylCs)) == Infinity ? 0 : (Math.floor((data_len - yilou[3][4].cxCs) / yilou[3][4].ylCs)));

         //最大遗漏数统计
         $(".sbt_zdyl").html(yilou[3][1].ylArr[1]);
         $(".duiz_zdyl").html(yilou[3][2].ylArr[2]);
         $(".baozi_zdyl").html(yilou[3][3].ylArr[3]);
         $(".shunzi_zdyl").html(yilou[3][4].ylArr[4]);

         //最大连出值
         $(".sbt_zdlc").html(yilou[3][1].maxLcCs);
         $(".duiz_zdlc").html(yilou[3][2].maxLcCs);
         $(".baozi_zdlc").html(yilou[3][3].maxLcCs);
         $(".shunzi_zdlc").html(yilou[3][4].maxLcCs);

         var str5 = '';
         for(var i = 0; i < 3; ++i) {
             for(var j = 1; j < 7; ++j) {
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
         for(var i = 0; i < 3; ++i) {
             for(var j = 1; j < 7; ++j) {
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
         for(var i = 0; i < 3; ++i) {
             for(var j = 1; j < 7; ++j) {
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
        for(var i = 0; i < 6; ++i) {
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
    },
    })
});