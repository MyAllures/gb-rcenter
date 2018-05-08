/**
 * 数据中心
 */
define(['common/BasePage', 'g2/g2.min', 'g2/data-set.min'], function (BasePage, G2, DataSet) {
    return BasePage.extend({

        /**
         * 画玉珏图
         * @author martin
         * @param containerName
         * @param data
         * @param color
         */
        drawBarChart: function(containerName, data, color) {
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 300,
                padding: [40,30,40,0]
            });

            chart.source(data, {
                'percent': { min: 0, max: 1 },
            });
            chart.tooltip({
                title: 'title'
            });
            chart.legend(false);
            chart.coord('polar', { innerRadius: 0.6 }).transpose();
            chart.interval()
                .position('title*percent')
                .color('numerical', color)
                .tooltip(['numerical','tips'], function(val, tips) {
                    return {
                        name: tips,
                        value: val + '元'
                    };
                })
                .label('numerical', {
                    offset: 3,
                    textStyle: {
                        textAlign: 'end', // 文本对齐方向，可取值为： start center end
                        fill: '#000000', // 文本的颜色
                        fontSize: '12', // 文本大小
                        fontWeight: 'normal', // 文本粗细
                        rotate: 30,
                        textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
                    }
                });
            data.map(function(obj) {
                chart.guide().text({
                    position: [ obj.title, 0 ],
                    content: obj.title + ' ',
                    style: {
                        textAlign: 'right'
                    }
                });
            });
            chart.render();
        },

        /**
         * 分组柱状图
         * @author martin
         * @param containerName
         * @param data
         * @param fieldSet
         * @param width
         */
        drawGroupColumnChart: function(containerName, data, fieldSet) {
            if(data == null || data.length < 1) return;
            $("#"+containerName).html(null);
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: fieldSet, // 展开字段集
                key: 'time', // key字段
                value: 'sum' // value字段
            });
            const chart = new G2.Chart({
                    container: containerName,
                    forceFit: true,
                    height: 401,
                    padding: [20, 12, 95, 50]
                });
            chart.source(dv);
            chart.interval().position('time*sum').color('name').adjust([{
                type: 'dodge',
                marginRatio: 1 / 32
            }]);
            chart.render();
        },

        /**
         * 基础柱状图
         * @author martin
         * @param containerName
         * @param data
         * @param xField
         * @param yField
         * @param position
         * @param tips
         * @param height
         * @param isFormat
         */
        drawBasicColumnChart: function(containerName, data, xField, yField, tips, height, isFormat) {
            var _this = this;
            //清空原有内容
            $("#"+containerName).empty();

            const position = xField + '*' + yField;
            const chart =  new G2.Chart({
                container: containerName,
                forceFit: true,
                height: height,
                padding: [20, 40, 45, 50]
            });
            chart.source(data);
            chart.interval().position(position)
                .tooltip(yField, function(val) {
                    return {
                        name: tips,
                        value: isFormat ? _this.formatMoney(val) : val
                    };
                });
            chart.render();
        },

        /**
         *基础面积图
         * @param data
         * @param containerName
         * @param keys
         * @param height
         */
        acreageChart:function(data,containerName,attribute,height){
            const ds = new DataSet();
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                // width: 500,
                height:height,
                padding: [38, 36, 88, 78]
            });
            chart.source(data);
            chart.scale({
                time: {
                    range: [ 0 , 1 ]
                }
            });
            chart.axis(attribute, {
                label: {
                    formatter: function(val) {
                        return val;
                    }
                }
            });
            chart.area().position('time*'+ attribute).shape('smooth');
            chart.line().position('time*'+ attribute).size(2).shape('smooth');

            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.render();
        },

        /**
         * 多条曲线图
         * @param data
         * @param containerName
         * @param keys
         * @param height
         */
        curveChart:function(data,containerName,keys,height){
            const ds = new DataSet();
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                // width: 500,
                height:height,
                padding: [38, 36, 88, 78]
            });
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: keys, // 展开字段集
                key: 'name', // key字段
                value: 'sum', // value字段
            });
            chart.axis('sum', {
                label: {
                    formatter: function(val) {
                        return val;
                    }
                }
            });
            /*,[ '#0072ff', '#02c16e', '#ff5050' ]*/
            /*,[ '#0072ff', '#02c16e', '#ff5050' ]*/
            chart.line().position('time*sum').color('name').shape('smooth');
            chart.point().position('time*sum').color('name').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });

            chart.source(dv,{
                time: {
                    range: [ 0, 1 ]
                }
            });

            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.render();
        },


        /**
         * 多条折线图
         * @author gavin
         * @param containerName
         * @param data
         */
        foldlineDiagram: function(containerName, data) {
            if(data == null || data.length < 1) return;
            $("#"+containerName).empty();
            const ds = new DataSet();
            var keys = Object.keys(data[0]);
            keys.splice(0,1);
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 400,
                // width:476,
                padding: [20, 30, 105, 50]
            });
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: keys, // 展开字段集
                key: 'name', // key字段
                value: 'sum' // value字段
            });
            chart.axis('sum', {
                label: {
                    formatter: function(val) {
                        return val;
                    }
                }
            });
            chart.axis('time', {
                label: {
                    formatter: function(time) {
                        return time + '    ';
                    }
                }
            });
            chart.line().position('time*sum').color('name');
            chart.point().position('time*sum').color('name').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });

            chart.source(dv,{
                time: {
                    range: [ 0, 1 ]
                }
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.render();
        },

        /**
         * 绘制双环仪表图
         * @author martin
         * @param containerName
         * @param data
         * @param colorm
         * @param colorn
         * @param column
         */
        drawGaugeChart: function(containerName, data, colorm, colorn, column) {
            //清空原有内容
            $("#"+containerName).empty();

            // 获取最近两个周期的值
            var numerical0 = $(data[data.length-1]).attr(column);
            var numerical1 = $(data[data.length-2]).attr(column);
            var staticDay0 = $(data[data.length-1]).attr('staticDay');
            var staticDay1 = $(data[data.length-2]).attr('staticDay');
            $("#"+containerName+"_title").html(staticDay0+": "+this.formatMoney(numerical0));

            var startNum, endNum;
            if(numerical0>=0 && numerical1>=0) {
                startNum = 0;
                if(numerical0 >= numerical1) {
                    endNum = numerical0;
                } else {
                    endNum = numerical1;
                }
            } else {
                if(Math.abs(numerical0) >= Math.abs(numerical1)) {
                    startNum = -(Math.abs(numerical0));
                    endNum = Math.abs(numerical0);
                } else {
                    startNum = -(Math.abs(numerical1));
                    endNum = Math.abs(numerical1);
                }
            }
            const Shape = G2.Shape;
            // 自定义Shape 部分
            Shape.registerShape('point', 'pointer', function(cfg, group) {
                var point = cfg.points[0]; // 获取第一个标记点
                point = this.parsePoint(point);
                const center = this.parsePoint({ // 获取极坐标系下画布中心点
                    x: 0,
                    y: 0
                });
            });
            const chart = new G2.Chart({
                container: containerName,
                forceFit: true,
                height: 300,
                padding: [ 40, 10, 50, 10 ]
            });
            chart.source(data);

            chart.coord('polar', {
                startAngle: -9 / 8 * Math.PI,
                endAngle: 1 / 8 * Math.PI,
                radius: 0.80 //设置仪表图在画框中占比(即在固定画框中的大小)
            });
            chart.scale('numerical', {
                min: startNum,
                max: (startNum===0 && endNum===0) ? 100 : endNum,
                nice: false
            });

            chart.axis('1', false);
            chart.axis('numerical', {
                zIndex: 2,
                line: null,
                label: {
                    offset: -8,
                    textStyle: {
                        fontSize: 12,
                        textAlign: 'center',
                        textBaseline: 'middle'
                    }
                },
                subTickCount: 4,
                subTickLine: {
                    length: -8,
                    stroke: '#fff',
                    strokeOpacity: 1
                },
                tickLine: {
                    length: -17,
                    stroke: '#fff',
                    strokeOpacity: 1
                },
                grid: null
            });
            chart.legend(false);
            chart.point({
                generatePoints: true
            }).position('numerical*1')
                .shape('pointer')
                .color('#1890FF')
                .active(false);

            // 绘制仪表盘背景
            chart.guide().arc({
                zIndex: 0,
                top: false,
                start: [ startNum, 0.98 ],
                end: [ endNum, 0.98 ],
                style: { // 底灰色
                    stroke: '#CBCBCB',
                    lineWidth: 2,
                }
            });

            // 绘制昨天的指标
            chart.guide().arc({
                zIndex: 1,
                start: [ numerical0>=0 ? 0 : numerical0, 1.07 ],
                end: [ numerical0>=0 ? numerical0 : 0, 1.07 ],
                style: {
                    stroke: colorm,
                    lineWidth: 12,
                }
            });

            // 绘制前天指标
            chart.guide().arc({
                zIndex: 2,
                start: [ numerical1>=0 ? 0 : numerical1, 1.19 ],
                end: [ numerical1>=0 ? numerical1 : 0, 1.19 ],
                style: {
                    stroke: colorn,
                    lineWidth: 12,
                }
            });

            // 绘制指标数字
            chart.guide().html({
                position: [ '50%', '60%' ],
                html: '<div style="width: 300px;text-align: center; border:0px solid red;">'
                + '<p style="margin: 0; font-weight:bold;">' + this.getGaugePercent(numerical0, numerical1) + '</p>'
                + '<p style="font-size:15px; color: #545454;margin: 0;">' + staticDay1 + '</p>'
                + '<p style="font-size:14px; font-weight:bold; color:#d2b0ff;margin: 0;">' + this.formatMoney(numerical1, 2) + '</p>'
                + '</div>'
            });

            // 自定义标题
            chart.guide().html({
                position: [ '50%', '110%' ],
                html: '<div style="width: 300px;text-align: center; border:0px solid red;">'
                + '<span style="background-color: '+colorm+'; width: 15px; height: 15px; display: inline-block; margin-right: 8px;"></span>' + staticDay0
                + '<span style="background-color: '+colorn+'; width: 15px; height: 15px; display: inline-block; margin: 0px 8px 0px 20px;"></span>' + staticDay1
                + '</div>'
            });

            chart.render();
        },

        /**
         * 上涨和下跌百分比
         * @author martin
         * @param numerical0
         * @param numerical1
         * @returns {string}
         */
        getGaugePercent: function(numerical0, numerical1) {
            // 当往期值为0时，计算增长率是没有意义的
            if(numerical1===0) {
                return '<font color="#d2b0ff" size="30"></font>';
            }
            if(numerical0===0) {
                numerical0 = 0.0;
            }
            var percent = Number([(numerical0-numerical1)/Math.abs(numerical1)]*100).toFixed(2);
            if (numerical0>numerical1) {
                return '<font color="red" size="30">↑</font><font color="#d2b0ff" size="30">'+percent+'%</font>';
            } else if(numerical0<numerical1) {
                return '<font color="green" size="30">↓</font><font color="#d2b0ff" size="30">'+Math.abs(percent)+'%</font>';
            } else {
                return '<font color="#d2b0ff" size="30">'+percent+'%</font>';
            }
        },

        /**
         * 数字千分位格式化
         * @public
         * @param mixed mVal 数值
         * @param int iAccuracy 小数位精度(默认为2)
         * @return string
         */
        formatMoney: function (mVal, iAccuracy) {
            var fTmp = 0.00;//临时变量
            var iFra = 0;//小数部分
            var iInt = 0;//整数部分
            var aBuf = new Array(); //输出缓存
            var bPositive = true; //保存正负值标记(true:正数)
            /**
             * 输出定长字符串，不够补0
             * <li>闭包函数</li>
             * @param int iVal 值
             * @param int iLen 输出的长度
             */
            function funZero(iVal, iLen) {
                var sTmp = iVal.toString();
                var sBuf = new Array();
                for (var i = 0, iLoop = iLen - sTmp.length; i < iLoop; i++)
                    sBuf.push('0');
                sBuf.push(sTmp);
                return sBuf.join('');
            };

            if (typeof(iAccuracy) === 'undefined')
                iAccuracy = 2;
            bPositive = (mVal >= 0);//取出正负号
            fTmp = (isNaN(fTmp = parseFloat(mVal))) ? 0 : Math.abs(fTmp);//强制转换为绝对值数浮点
            //所有内容用正数规则处理
            iInt = parseInt(fTmp); //分离整数部分
            iFra = parseInt((fTmp - iInt) * Math.pow(10, iAccuracy) + 0.5); //分离小数部分(四舍五入)

            do {
                aBuf.unshift(funZero(iInt % 1000, 3));
            } while ((iInt = parseInt(iInt / 1000)));
            aBuf[0] = parseInt(aBuf[0]).toString();//最高段区去掉前导0
            return ((bPositive) ? '' : '-') + aBuf.join(',') + '.' + ((0 === iFra) ? '00' : funZero(iFra, iAccuracy));
        }
    });
});