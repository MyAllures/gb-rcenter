$(function(){
	    //报表数据			    
	    var reportForms = [
	        {"date":"2018-1-1","newplayer":"100",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-2","newplayer":"200",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-3","newplayer":"150",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-4","newplayer":"150",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-5","newplayer":"120",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-6","newplayer":"110",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-7","newplayer":"140",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-8","newplayer":"130",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-9","newplayer":"110",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-10","newplayer":"100",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-11","newplayer":"60",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-12","newplayer":"170",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-13","newplayer":"130",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-14","newplayer":"150",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-15","newplayer":"100",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-16","newplayer":"90",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-17","newplayer":"100",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-18","newplayer":"100",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-19","newplayer":"110",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-20","newplayer":"70",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-21","newplayer":"110",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-22","newplayer":"150",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-23","newplayer":"60",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-24","newplayer":"170",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-25","newplayer":"130",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-26","newplayer":"150",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-27","newplayer":"190",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-28","newplayer":"90",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-29","newplayer":"130",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-30","newplayer":"120",'active':'20',"moneyPlay":"25","nomoney":"15"},
	        {"date":"2018-1-31","newplayer":"110",'active':'20',"moneyPlay":"25","nomoney":"15"}
	    ]			    	
		var html = "";
		var startData = 0;//数据提取开始
		var stopData = parseInt($('#choseNum .dropdown-item:first-child').text());//数据提取末
		var nowpage = '';//当前在第几页
		var run = true;
		var dataTypes = 8;	//决定X轴数据类型变化控制图表个数，控制日月年
		$('.allCot').text('共'+reportForms.length+'条')//显示总共数据
		function dataChose(sta,sto){
			$('#Searchresult').empty();
			html = '';
			for(var i=sta; i<sto; i++){
				var item = reportForms[i];
			    html += '<tr class="show"><td>'+item.date+'</td><td>'+item.active+'</td><td>'+item.newplayer+'</td><td>'+item.moneyPlay+'</td><td>'+item.nomoney+'</td></tr>';

			}
			document.getElementById("Searchresult").innerHTML = html;
			$('#Searchresult').prepend('<tr><th>日期</th><th>活跃玩家</th><th>新增活跃</th><th>存款活跃</th><th>非存款活跃</th></tr>');//添加表头tr th
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
//			var tabHei = $('.reportTab tr:last-child').height();//48.4
//			var hNum = $('.reportTab tr:last-child').height()*dataTypes+48.4;
//			var heiNum = Math.ceil(hNum);
//			$('.reportTab').height(heiNum);
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
				type: 'column'
		};
		var title = {
				text: ''
		};
		var subtitle = {
				text: ''
		};
		var xAxis = {
		    	//X坐标名称
		        categories: ['10月20日','10月21日','10月22日','10月23日','10月24日','10月25日','10月26日','10月27日'],
				labels: {
		            style: {
		                    color: '#999999',//设置X轴字体颜色
		                    fontSize:'12px'//X轴字体大小
		                    
		            },
		       },
		       tickLength:5,//刻度线长度
		       lineColor: '#dedede',              //X轴颜色
		       tickmarkPlacement:'on',//刻度线和图标对齐		       
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
		        tickAmount: 6,//分段
		        //Y轴数据显示，总数
			    stackLabels: {
			        enabled: true,
			        style: {
			           fontWeight: 'bold',
			           color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
			        }
			    }		        
		};
		var plotOptions = {
		        column: {
		            stacking: 'normal'//常规堆叠图
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
		        layout: 'horizontal',  //图例内容布局方式，水平布局	        
		};
	    var series1 = {
			        name: '新增活跃',
       				color: '#ff4e4e',
       				data:[20,10,20,30,20,15,20,10]
			    };
		var series2 = 
			    {//数据列 图型显示
			        name: '存款活跃',
       				color: '#02c16e',
       				data:[10,30,70,120,90,40,60,40]
			    };
		var series3 ={
			        name: '未存款玩家',
       				color: '#0072ff',
       				data:[10,10,30,40,40,20,30,20]
			    };
		var series4 ={
			        name: '新增活跃',
       				color: '#ff4e4e',
       				data:[15,10,20,35,430,25,27,23]
			    };
		var series5 ={
			        name: '存款活跃',
       				color: '#02c16e',
       				data:[13,15,31,42,37,27,29,23]
			    };
		var series6 ={
			        name: '未存款玩家',
       				color: '#0072ff',
       				data:[14,19,32,36,41,24,38,22]
			    };			    
		var tooltip = {
		        shared: false,//鼠标移动到图形区域显示单个数据
		        //valueSuffix: null,//标示框后缀加上符号 例如%
		        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',

		};
		var series = [];
		series.push(series1,series2,series3)	
		json.chart = chart;
		json.xAxis = xAxis;
		json.yAxis = yAxis;
		json.title = title;
		json.plotOptions = plotOptions;
		json.legend = legend;
		json.series = series;
		json.credits = credits;
		json.subtitle = subtitle
		json.tooltip = tooltip;
		$('#curveTable').highcharts(json);
		//var ydata = false; //控制Y轴是否是百分比
		//var lendType = 1;//控制图例显示字
		//随机生成图表数据
		function rundomData(){
	    	for(var l=0;l<series.length;l++){//控制是全部还是单个数据				
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
	    //不同数据，日周月活跃
	    $('#playerInfo').on('click','button',function(){	    	
	    	if($(this).index()==0){
	    		dataTypes = 8;
	    		rundomX(1)
	    	}
	    	if($(this).index()==1){
	    		dataTypes = 4;
	    		rundomX(2)
	    	}
	    	if($(this).index()==2){
	    		dataTypes = 12;
	    		rundomX(3)
	    	}
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
	    		dataTypes = 8;
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
				xAxis.categories = ['10月20日','10月21日','10月22日','10月23日','10月24日','10月25日','10月26日','10月27日'];				
			};
			if(type==2){
				xAxis.categories = ['第一周','第二周','第三周','第四周']	
			};
			if(type==3){
				xAxis.categories = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']	
			};			
	    	json.xAxis = xAxis;
	    	rundomData();
	    	//$('#curveTable').highcharts(json);	//重绘数据				
		}	    
	    //PC与手机端的数据交互
		$('.btnAll').click(function(){
			returnTab(series1,series2,series3)//点击传入全部数据
		})
		$('.btnCell').click(function(){
			returnTab(series1,series5,series6,)//传入手机端数据
		})
		$('.btnPc').click(function(){
			returnTab(series4,series2,series3,)//传入PC端数据
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
	
})
