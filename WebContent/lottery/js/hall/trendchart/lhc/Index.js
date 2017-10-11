define(['site/hall/trendchart/LotteryTrendChart'],function (LotteryTrendChart) {
    return LotteryTrendChart.extend({
        init: function () {
            this._super();
        },
         kxian:  function(data) {
             // 基于准备好的dom，初始化echarts实例
             var myChart1 = echarts.init(document.getElementById('main1'));

             var subtext = "香港六合彩";
             if(data.length > 0) {
                 subtext += " 第" + data[0].expect + '期 ~ ' + "第" + data[data.length - 1].expect + '期';
             }

             // 指定图表的配置项和数据
             var option = {
                 title: {
                     text: '香港赛马会六合彩K线图',
                     subtext: subtext,
                     x: 'center'
                 },
                 legend: {
                     data: ['第1位', '第2位', '第3位', '第4位', '第5位', '第6位', '第7位'],
                     y: 530
                 },
                 dataZoom: {
                     show: true,
                     realtime: true,
                     start: 0,
                     end: 60
                 },
                 xAxis: [{
                     axisLabel: {
                         rotate: -60,
                     },
                     type: 'category',
                     boundaryGap: false,
                     data: []
                 }],
                 tooltip: {
                     trigger: 'axis',
                     formatter: function(params) {
                         var openCode = params[0].data.openCode;

                         var res = params[0].seriesName;
                         res += '<br/>期号：' + params[0].name;
                         res += '<br/>号码：' + params[0].data;
                         return res;
                     }
                 },
                 yAxis: [{
                     type: 'value',
                     name: '号码'
                 }],
                 grid: {
                     left: '1%',
                     right: '2%',
                     containLabel: true,
                     y2: 120
                 },
                 series: [{
                     name: '第1位',
                     type: 'line',
                     data: []
                 }, {
                     name: '第2位',
                     type: 'line',
                     data: []
                 }, {
                     name: '第3位',
                     type: 'line',
                     data: []
                 }, {
                     name: '第4位',
                     type: 'line',
                     data: []
                 }, {
                     name: '第5位',
                     type: 'line',
                     data: []
                 }, {
                     name: '第6位',
                     type: 'line',
                     data: []
                 }, {
                     name: '第7位',
                     type: 'line',
                     data: []
                 }, ]
             };
             $.each(data, function(index, value) {
                 option.xAxis[0].data.push(value.expect);

                 var tmpArr = value.openCode.split(",");
                 $.each(tmpArr, function(index, value) {
                     var v = Tools.parseInt(value);
                     option.series[index].data.push(v);
                 });

             });

             myChart1.setOption(option);

         },
        zhexian : function (data) {
            var str = '';
            for(var i = 0; i < data.length; i++) {
                // qihao
                str += '<div class="cl-30 clean">';
                str += '<div class="left cl-31 number" style="height:45px;line-height:45px;">' + data[i].expect + '</div>';

                var kjData = data[i].openCode.split(",");
                str += '<div class="left cl-32 openCode" style="width:170px;height:45px;line-height:45px;">';
                for(var j = 0; j < 7; ++j) {
                    var haoma = Tools.parseInt(kjData[j]);
                    var bg = getBose(haoma);
                    if(bg == 0) {
                        bg = 'ball-red';
                    } else if(bg == 1) {
                        bg = 'ball-blue';
                    } else {
                        bg = 'ball-green';
                    }
                    if(kjData[j].length == 1) {
                        str += '<span style="padding:3px;margin-right:3px;" class="round ' + bg + '">' + '0' + kjData[j] + '</span>';
                    } else {
                        str += '<span style="padding:3px;margin-right:3px;" class="round ' + bg + '">' + kjData[j] + '</span>';
                    }

                }
                str += '</div>';

                str += '<div class="cl-35 cl-36">';
                for(var j = 0; j < kjData.length; ++j) {
                    var haoma = Tools.parseInt(kjData[j]);

                    str += '<var  style="width:50px;height:45px;">';
                    var bg = getBose(haoma);
                    if(bg == 0) {
                        bg = 'ball-red';
                    } else if(bg == 1) {
                        bg = 'ball-blue';
                    } else {
                        bg = 'ball-green';
                    }
                    str += '<i style="width:25px;line-height:25px;height:25px;margin:auto;" data-num="' + haoma + '" class="round ' + bg + '">';
                    str += haoma;
                    var dhaoma = haoma;
                    if (Number(haoma) <= 9){
                        dhaoma = '0' + haoma;
                    }
                    str += '</i>';
                    str += '<span class="clean">' + eval("("+lhcmap+")")[dhaoma] + '</span>';
                    str += '</var>';
                }

                var sum = 0;
                var boseArr = [0, 0, 0];
                $.each(kjData, function(index, value) {
                    sum += Tools.parseInt(value);
                    boseArr[getBose(value)]++;
                });
                var maxBose = 0;
                var maxValue = 0;
                $.each(boseArr, function(index, value) {
                    if(value > maxValue) {
                        maxValue = value;
                        maxBose = index;
                    }
                });
                if(maxBose == 0) {
                    maxBose = '<font class="color-red">红波</font>';
                } else if(maxBose == 1) {
                    maxBose = '<font class="color-blue">蓝波</font>';
                } else if(maxBose == 2) {
                    maxBose = '<font class="color-green">绿波</font>';
                }
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + sum + '</div>';
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + (sum % 2 == 0 ? '总和双' : '总和单') + '</div>';
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + (sum >= 175 ? '总和大' : '总和小') + '</div>';
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + maxBose + '</div>';

                var tm = Tools.parseInt(kjData[6]);
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + (tm == 49 ? '和' : (tm % 2 == 0 ? '<font class="color-red">双</font>' : '<font>单</font>')) + '</div>';
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + (tm >= 25 ? (tm != 49 ? '<font class="color-red">大</font>' : '和') : '<font>小</font>') + '</div>';
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + ((tm == 49 ? '和' : (Math.floor(tm / 10) + tm % 10) % 2 == 0 ? '<font class="color-red">合双</font>' : '<font>合单</font>')) + '</div>';
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + (tm == 49 ? '和' : ((Math.floor(tm / 10) + tm % 10) >= 7 ? '<font class="color-red">合大</font>' : '<font>合小</font>')) + '</div>';
                str += '<div class="left cl-31 number" style="background:none;width:53px;height:45px;line-height:45px;">' + (tm == 49 ? '和' : (tm % 10 >= 5 ? '<font class="color-red">尾大</font>' : '<font>尾小</font>')) + '</div>';

                str += '</div>';
            }
            $("#zhexianData").html(str);
        }
    })
});