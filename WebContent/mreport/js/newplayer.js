	    //报表数据			    
	    var reportForms = [
	        {"date":"2018-1-1","newplayer":"100","moneyplayer":"80"},
	        {"date":"2018-1-2","newplayer":"200","moneyplayer":"70"},
	        {"date":"2018-1-3","newplayer":"150","moneyplayer":"60"},
	        {"date":"2018-1-4","newplayer":"150","moneyplayer":"60"},
	        {"date":"2018-1-5","newplayer":"120","moneyplayer":"50"},
	        {"date":"2018-1-6","newplayer":"110","moneyplayer":"60"},
	        {"date":"2018-1-7","newplayer":"140","moneyplayer":"70"},
	        {"date":"2018-1-8","newplayer":"130","moneyplayer":"80"},
	        {"date":"2018-1-9","newplayer":"110","moneyplayer":"50"},
	        {"date":"2018-1-10","newplayer":"100","moneyplayer":"90"},
	        {"date":"2018-1-11","newplayer":"60","moneyplayer":"40"},
	        {"date":"2018-1-12","newplayer":"170","moneyplayer":"100"},
	        {"date":"2018-1-13","newplayer":"130","moneyplayer":"110"},
	        {"date":"2018-1-14","newplayer":"150","moneyplayer":"120"},
	        {"date":"2018-1-15","newplayer":"100","moneyplayer":"50"},
	        {"date":"2018-1-16","newplayer":"90","moneyplayer":"65"},
	        {"date":"2018-1-17","newplayer":"100","moneyplayer":"90"},
	        {"date":"2018-1-18","newplayer":"100","moneyplayer":"88"},
	        {"date":"2018-1-19","newplayer":"110","moneyplayer":"93"},
	        {"date":"2018-1-20","newplayer":"70","moneyplayer":"62"},
	        {"date":"2018-1-21","newplayer":"110","moneyplayer":"50"},
	        {"date":"2018-1-22","newplayer":"150","moneyplayer":"90"},
	        {"date":"2018-1-23","newplayer":"60","moneyplayer":"40"},
	        {"date":"2018-1-24","newplayer":"170","moneyplayer":"110"},
	        {"date":"2018-1-25","newplayer":"130","moneyplayer":"110"},
	        {"date":"2018-1-26","newplayer":"150","moneyplayer":"120"},
	        {"date":"2018-1-27","newplayer":"190","moneyplayer":"150"},
	        {"date":"2018-1-28","newplayer":"90","moneyplayer":"65"},
	        {"date":"2018-1-29","newplayer":"130","moneyplayer":"97"},
	        {"date":"2018-1-30","newplayer":"120","moneyplayer":"88"},
	        {"date":"2018-1-31","newplayer":"110","moneyplayer":"93"}
	    ]			    	
		var html = "";
		var startData = 0;//数据提取开始
		var stopData = parseInt($('#choseNum .dropdown-item:first-child').text());//数据提取末
		var nowpage = '';//当前在第几页
		var run = true;
		$('.allCot').text('共'+reportForms.length+'条')//显示总共数据
		function dataChose(sta,sto){
			$('#Searchresult').empty();
			html = '';
			for(var i=sta; i<sto; i++){
		    	var item = reportForms[i];
		    	var num = item.moneyplayer/item.newplayer;
			    var percent=Number(num*100).toFixed(1)+'%';
			    html += '<tr class="show"><td>'+item.date+'</td><td>'+item.newplayer+'</td><td>'+item.moneyplayer+'</td><td>'+percent+'</td></tr>';
			}
			document.getElementById("Searchresult").innerHTML = html;
			$('#Searchresult').prepend('<tr><th>时间</th><th>新增玩家</th><th>新增存款玩家</th><th>转化率</th></tr>')//添加表头tr th
			var tabHei = $('.reportTab tr:first-child').height()		
		}
		function howPage(){
        	var newstart = (nowpage-1)*stopData;//数组遍历开始值  点第二页从10开始
        	var newstop = nowpage*stopData; //数组遍历末值 点第二页20结尾
        	var dval = newstop - reportForms.length; //差值，stopData为一页显示多少数据 
			if(newstop>reportForms.length){
				newstop = reportForms.length;
			}
			if(dval>stopData){//计算翻页后还有有数据没 取值末大于一页空间说明以后没有数据
				alert('没有数据啦');
				run = false;
				return false;
			}
			run = true;
            dataChose(newstart,newstop)			
		}
		//选择一页显示多少
		$('#choseNum .dropdown-item').click(function(){
			var curnum = parseInt(this.text)//取值，该页面显示多少条
        	stopData = curnum;	
			howPage()
		})
		//分页
	    $.jqPaginator('#pagination', {
	        totalPages: 5,//总共多少页
	        //pageSize:10,//分页条目
	        visiblePages: 3,//显示多少分页按钮
	        currentPage: 1,//当前在第几页
	        //第一页按钮，上翻页，下翻页，最后一页，普通页
	        first: '<li class="page-item"><a class="page-link first-page" href="javascript:;"></a></li>',
	        prev: '<li class="page-item"><a class="page-link previous" href="javascript:;" aria-label="Previous"></a></li>',
	        next: '<li class="page-item"><a class="page-link next" href="javascript:;" aria-label="Next"></a></li>',
	        last: '<li class="page-item"><a class="page-link last-page" href="javascript:;"></a></li>',
	        page: ' <li class="page page-item"><a class="page-link" href="javascript:;">{{page}}</a></li>',
	        //<li class="page-item page"><a href="javascript:;">{{page}}</a></li>
	        onPageChange: function (num, type) {
	        	nowpage = num;
				howPage();
				if(!run){return false}//控制没有时页面还跳动情况
	        }
	    }); 
		//$('#id').jqPaginator('option', {currentPage: 1});初始化
        //曲线图构造函数（highcharts插件)
		var json = {};
		var chart = {
				type: 'spline'
		};
		var title = {
				text: ''
		};
		var subtitle = {
				text: ''
		};
		var xAxis = {
		    	//X坐标名称
		        categories: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00',
				        '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
				labels: {
		            style: {
		                    color: '#999999',//设置X轴字体颜色
		                    fontSize:'12px'//X轴字体大小
		                    
		             },
		            align:'right',
		           	x:-5//X水平偏移
		       },
		       tickLength:5,//刻度线长度
		       //tickmarkPlacement:'on',//刻度线和图标对齐
		       lineColor: '#dedede'              //X轴颜色		
		};
		var credits = {
				enabled: false     //不显示LOGO
		};
		var yAxis = {
		        title: {
		            text: ''
		        },
                labels: {//y轴刻度文字标签  
                    formatter: function () {  
                        return this.value //+ '%';//y轴加上%  
                    }  
                },  		        
		        gridLineDashStyle:'dash',//Y轴网格线虚线
		        //max: '120',//最大值
		        //tickAmount: 4//分段			        
		};
		var plotOptions = {
		        line: {
		            dataLabels: {
		                enabled: true //去掉数据图形上的数字点
		            },
		            enableMouseTracking: true//允许数据提示框
		        },
		        spline: {
		            marker: {
		                radius: 4,//点状大小
		                //lineColor: '#666666',//点状阴影颜色
		                lineWidth: .5//阴影部分面积
		            }
		        }	        
		};
		var legend = {
		    	borderWidth : 0, //图例边框长度	
			  	itemStyle: {//图例文字样式
				    color: '#808080',
				    fontSize:'12px',
				    fontWeight:'normal'
			    },
			    verticalAlign:'bottom',//图例上下对齐
		        layout: 'horizontal'  //图例内容布局方式，水平布局		
		};
		var seriesPc = 
			{
		        name: '新增玩家',//图例文字
		        //图形坐标
		        marker: {symbol: 'circle'},//曲线点状图，方块
		        color:'#0072ff',
		        data: [7.0, 6.5, 9.0, 14.5, 18.0, 21.5, 25.5, 26.5, 23.0, 18.5, 13.5, 9.5,
		        7.0, 6.5, 9.5, 14.5, 18.5, 21.5, 25.0, 26.5, 23.0, 18.0, 13.5, 15.5,19.5]
		   };
		var seriesCell = 
			{
		        name: '新增玩家',//图例文字
		        //图形坐标
		        marker: {symbol: 'circle'},//曲线点状图，方块
		        color:'#ff4e4e',
		        data: [9.0, 10.5, 12.0, 15.5, 19.0, 22.5, 27.5, 23.5, 22.0, 19.5, 17.5, 16.5,
		        14.0, 12.5, 10.5, 12.5, 14.5, 16.5, 19.0, 20.5, 22.0, 19.0, 17.5, 15.5,17.5]
		  };
		var tooltip = {
		        crosshairs: true,
		        shared: true,
		        valueSuffix: null//标示框后缀加上符号 例如%
		};
		var responsive = {
				rules: [{              // 在图表小于 500px 的情况下关闭图例
			    	condition: {         // 响应条件
			      		maxWidth: 500
			    	},
			    	chartOptions: {      // 响应内容
			     		legend: {
			        	enabled: false
			     		}
			   		}
				}]		
		}
		var series = [];
		series.push(seriesPc,seriesCell)	
		json.chart = chart;
		json.xAxis = xAxis;
		json.yAxis = yAxis;
		json.title = title;
		json.plotOptions = plotOptions;
		json.legend = legend;
		json.responsive = responsive;
		json.series = series;
		json.credits = credits;
		json.subtitle = subtitle
		json.tooltip = tooltip;
		$('#curveTable').highcharts(json);
		var dataTypes = 24;	//决定X轴数据类型变化控制图表个数，控制日月年
		var ydata = false; //控制Y轴是否是百分比
		var lendType = 1;//控制图例显示字
		//随机生成图表数据
		function rundomData(){
			if(ydata){
				yAxis.labels.formatter = function(){	return this.value + '%';  };//y轴加上%
				tooltip.valueSuffix = '%';
				yAxis.max = 100;
				//(Math.round(this * 10000)/100).toFixed(2) + '%'				
			}
			else{
				yAxis.labels.formatter = function(){	return this.value;  }//y轴去掉%
				tooltip.valueSuffix = null;	
				yAxis.max = null;
			}
	    	for(var l=0;l<series.length;l++){//控制是全部还是单个数据
				if(lendType==1){
					series[l].name = '新增玩家';
				}
				if(lendType==2){
					series[l].name = '新增存款玩家';
				}
				if(lendType==3){
					series[l].name = '转化率';
				}					
	    		series[l].data = [];
		    	for(var t = 0;t<dataTypes;t++){
			    	var serNum = Math.ceil(Math.random()*100);
			    	series[l].data.push(serNum);
		    	}			
			}
	    	json.yAxis = yAxis;
	    	json.series = series;
	    	$('#curveTable').highcharts(json);	//重绘数据				
		}
		//图标点击生成数据
	    $('#Searchresult tr').click(function(){
	    	rundomData()
	    })
	    //不同数据，新增玩家，存款玩家，转化率
	    $('#playerInfo').on('click','button',function(){	    	
	    	if($(this).attr('name')=='playerNum'){
	    		ydata = false;
	    		lendType = 1;
	    	}
	    	if($(this).attr('name')=='playerMoney'){
	    		ydata = false;
	    		lendType = 2;
	    	}	    	
	    	if($(this).attr('name')=='playPercent'){
	    		ydata = true;
	    		lendType = 3;
	    	}
	    	rundomData()
	    })
	    //时间改变
	    var times = 0;
	    $("#startDate").on('changeDate',function(ev){
	    	times++;
	    	timeChange()
	    })
	    $("#endDate").on('changeDate',function(ev){
	    	times++;
	    	timeChange()
	    })
	    //当日期改变，图标数据变更
	    function timeChange(){
	    	if(times==2){
	    		times = 0;//归0
	    		rundomData()
	    	}else{return}
	    }
	    //日月年切换X轴
	    $('#ymd').on('click','button',function(){
	    	if($(this).attr('id')=='days'){
	    		dataTypes = 25;
	    		rundomX(1)
	    	}
	    	if($(this).attr('id')=='months'){
	    		dataTypes = 4;
	    		rundomX(2)
	    	}
	    	if($(this).attr('id')=='years'){
	    		dataTypes = 12;
	    		rundomX(3)
	    	}
	    })
	    //X坐标变化并随机生成数据
		function rundomX(type){
			if(type==1){
				xAxis.categories = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00',
					        '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];				
			};
			if(type==2){
				xAxis.categories = ['第一周','第二周','第三周','第四周']	
			};
			if(type==3){
				xAxis.categories = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']	
			};			
	    	json.xAxis = xAxis;
	    	rundomData();
	    	$('#curveTable').highcharts(json);	//重绘数据				
		}	    
	    //PC与手机端的数据交互
		$('.btnAll').click(function(){
			returnTab(seriesPc,seriesCell)//点击传入全部数据
		})
		$('.btnCell').click(function(){
			returnTab(seriesCell)//传入手机端数据
		})
		$('.btnPc').click(function(){
			returnTab(seriesPc)//传入PC端数据
		})
		function returnTab(obj){
			series = [];//清空数据
			for(var i = 0; i < arguments.length; i++){
				series.push(arguments[i]);	//更新数据		
			}		
			json.series = series;//生成数据
			$('#curveTable').highcharts(json);	//重绘数据	
		}
		$(window).resize(function(){
			$('#curveTable').highcharts(json);	//重绘数据	
		})