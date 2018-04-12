	$(function(){
		$(".hideMenu").slideToggle();//打开二级导航
	  //左侧二级导航
	  $('.list-group li').click(function(){
	  		window.event.cancelBubble=true; 
			$(this).children().filter('.hideMenu').stop().slideToggle()
	  })
	  //二级导航高亮
	  $('.hideMenu li').mouseover(function(){
			$(this).addClass("active").siblings().removeClass('active');		
	  })
	  //一级导航箭头图标
	  var off = false;
	  $('.list-group li').click(function(){
	  	if(off){
	  		$(this).addClass('active');
	  		off = false;
	  	}
	  	else{
	  		$(this).removeClass('active');
	  		off = true
	  	}
	  })
	  //数据类型切换
	  $(".top-info li span").click(function(){
			var windowWidth = $(window).width();
				if(windowWidth > 768){
	  			$(this).parent('li').toggleClass('active');
				}else{
	  			$(this).parent('li').toggleClass('active').siblings('li').removeClass('active');
	    	}
	  });
	  //Sweiper滑动
	  $('.swiper-info div .swiper-slide').mousedown(function(){
	  	$(this).addClass('btn-primary').removeClass('swp').siblings().addClass('swp').removeClass('btn-primary');
	  	
	  })
	  //年月日
	  //
	  $('#ymd').on('click','button',function(){
	  		$(this).addClass('btn-success').siblings().removeClass('btn-success')
	  })
	  //日历插件:dattimepicker
	  //开始选择时间
		$("#startDate").datetimepicker({
			format: 'yyyy-mm-dd',//显示格式
			todayHighlight: 1,//今天高亮
			minView: "month",//设置只显示到月份
			startView:2,//月视图
			showMeridian:true,
			//todayBtn : "linked",//显示今天
			autoclose: 1//选择后自动关闭
		}).on('changeDate',function(ev){
			var starttime=ev.date; //获取当前选择的日期
			$("#endDate").datetimepicker('setStartDate',starttime);//设置结束日期不得前于开始日期
		});
		//结束选择时间
		$("#endDate").datetimepicker({
			format: 'yyyy-mm-dd',//显示格式
			minView: "month",//设置只显示到月份
			startView:2,//月视图
			autoclose: 1//选择后自动关闭
		}).on('changeDate',function(ev){
		  var endtime = ev.date;
			$("#startDate").datetimepicker('setEndDate',endtime);//设置开始日期不得超过结束日期
	 });
		//按钮增删Class类名，控制样式
	  $("._addPrimary .btn").click(function(){
			$(this).addClass("btn-primary").siblings().removeClass("btn-primary");
	  });          
		//显示导航:
	  function toggleActive (){
	    $('._menu').toggleClass('drawer-active');
			$("._mainContent").toggleClass('drawer-body');
			$('._drawer-mask').toggleClass('active');
			$('body').toggleClass('hide-y');
	  }
	  $('._showMenu').click(function(){
	  	toggleActive();
	  });
	  $("._drawer-mask").click(function(){
	  	toggleActive();
	  });
		//自定义select选框 :
		function chooseValue(id){
			$('.'+ id +' '+".dropdown-item").click(function(){
		  $('.'+ id +' ' + '.btn').text($(this).text());
			});
		}
		chooseValue('_chooseNum');
		chooseValue('_chooseSite');
		//时间函数
		function showLeftTime()
		{
				var now=new Date();
				var gmt = now.toGMTString();
				$('#nowTime').html(gmt);
			//一秒刷新一次显示时间		
		} 
		showLeftTime()
		var timeID=setInterval(showLeftTime,1000);	
		//$('.swiper-container').width($(window).width()-86)
		//$('.tableBox').width($('.main-content').width())
//		$(window).resize(function(){
//			var w = $('.main-content').width()
//			$('.swiper-container').width(w-86)
//		})
		
	})
	