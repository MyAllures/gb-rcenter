
$(function(){
		/*页面整体滚动*/
	mui('.mui-content.mui-scroll-wrapper').scroll({
		 scrollY: true, //是否竖向滚动
		 scrollX:false, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: false, //是否显示滚动条
		 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
		 bounce: true //是否启用回弹
	});
	/*关闭轮播*/
	$(".banner-slide").on("tap",".close-slide",function(){
		$(this).parent().hide();
	});
	/*公告弹窗*/
	mui(".notice .notice-list").on("tap","a",function(){
		var noticeA =noticeIndicator="";
		$(".notice .notice-list .marquee a").each(function(){//生成公告html和indicator
			noticeA+="<a href='javascript:'>"+$(this).html()+"</a>";
		});
		var noticeHtml = $('<div>' +
			'<div class="mui-slider notice-slider">' +
				'<div class="mui-slider-group">' +
					'<div class="mui-slider-item">' +
						'<div class="mui-scroll-wrapper">' +
							'<div class="mui-scroll">' +
								'<div style="padding-right: 10px;">'+noticeA+'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'</div>');
		var alertNotice = mui.alert(noticeHtml.html(),"公告","关闭");
		$(alertNotice.element).addClass('notice-alert');// 定义弹窗的class,方便修改样式
		$(".notice-slider").css({height:$(window).height()*0.7})
		mui(".notice-slider .mui-scroll-wrapper").scroll();
	});
	/*侧滑菜单脚本*/
	$(".mui-bar").on("tap",".mui-action-menu",function(){
		$("html").toggleClass("index-canvas-show");
		mui('.index-canvas-wrap .mui-scroll-wrapper').scroll();
	});
		/*关闭侧滑菜单*/
	$(".mui-inner-wrap").on("tap",function(event){
		if(mui('.mui-off-canvas-wrap').offCanvas().isShown('left')){
			mui('.mui-off-canvas-wrap').offCanvas().close();
		}		
	});
	/*打开侧滑菜单*/
	$(".mui-bar").on("tap",".mui-action-menu",function(){
		mui('.mui-off-canvas-wrap').offCanvas().show();
	});
	/* 关闭浮窗广告 */
	mui(".ads-slider").on("tap",".close-ads",function(){
		$(".ads-slider").hide();
	});
	/*侧滑菜单滚动*/
	mui('.side-menu-scroll-wrapper').scroll({
		 scrollY: true, //是否竖向滚动
		 scrollX:false, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: true, //是否显示滚动条
		 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
		 bounce: true //是否启用回弹
	});
	
	$(".lottery-nav li").on("tap",function(){
		$(this).siblings().find("a").removeClass("mui-active");
		$(this).find("a").addClass("mui-active");
	});
	/*语言弹窗弹出*/
	mui('.side-nav').on("tap","li",function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		if($(this).hasClass("lang")){
			$(".lang-menu").toggle();
		}		
	});
	/* 关闭侧滑菜单隐藏语言弹窗 */
	$('.mui-off-canvas-wrap').on('hidden',function (event) {
	    $(".lang-menu").hide();
	});
	// 监听tap事件，解决 a标签 不能跳转页面问题
	mui('body').on('tap','a[href$=html]',function(){
		document.location.href=this.href;
		console.log(this.href);
	});
	// 选择器示例，展示用而已。根据业务逻辑自己定义
	$(".mui-input-select").on("tap",function(){
		 var picker = new mui.PopPicker();
		 picker.setData([{value:'v1',text:'选项1'},{value:'v2',text:'选项2'},{value:'v3',text:'选项3'}]);
		 picker.show(function (selectItems) {
		 });
	});
	//登录信息点击弹出余额信息
	$("#login-info").on("tap",function(){
		$(this).find(".ex").toggleClass("open");
		$(this).find(".money-shadow").toggle();
		mui(".mui-assets").scroll({			
			 scrollY: true, //是否竖向滚动
			 scrollX:false, //是否横向滚动
			 startX: 0, //初始化时滚动至x
			 startY: 0, //初始化时滚动至y
			 indicators: true, //是否显示滚动条
			 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
			 bounce: true //是否启用回弹
		});
	});
	$(".lottery-nav li").on("tap",function(){
		$(this).siblings("li").find("a").removeClass("mui-active");
		$(this).find("a").addClass("mui-active");
		$(".lottery-content .mui-control-content").removeClass("mui-active");
		var index = $(this).index();
		$(this).parents(".lottery-nav").next().find(".mui-control-content").eq(index).addClass("mui-active");
		// 动态计算滑动内容的高度
		$(this).parents(".swiper-wrapper").css({
			height:$(this).parents(".lottery-nav").next().find(".mui-control-content").eq(index).outerHeight()+48
		});
	});
	// 导航点击下面滑块高度问题bug解决
	$(".swiper-container.nav-slide-indicators").on("tap",".swiper-slide",function(e){
		var index = $(this).data("swiper-slide-index");
		var targetSlide = $(".nav-slide-content .swiper-slide[data-swiper-slide-index="+index+"]")[0];
		console.log($(targetSlide).outerHeight());
		setTimeout(function(){// 滑动循环最后一个有延迟，设个定时器抵消延迟的效果
			$(".nav-slide-content>.swiper-wrapper").css({height:$(targetSlide).outerHeight()});
		},100);		
	});
	// 关闭红包
	$("#hongbao").on("tap",".icon-close",function(e){
		e.stopPropagation();
		$(this).parent().hide();
	});
	$(".desk").on("tap",".close",function(){
		$(this).parents(".desk").hide();
	});
});