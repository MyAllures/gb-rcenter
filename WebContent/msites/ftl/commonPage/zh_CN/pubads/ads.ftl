<style>
.swiper-container {
	margin:0 auto;
	position:relative;
	overflow:hidden;
	-webkit-backface-visibility:hidden;
	-moz-backface-visibility:hidden;
	-ms-backface-visibility:hidden;
	-o-backface-visibility:hidden;
	backface-visibility:hidden;
	/* Fix of Webkit flickering */
	z-index:1;
}
.swiper-wrapper {
	position:relative;
	width:100%;
	-webkit-transition-property:-webkit-transform, left, top;
	-webkit-transition-duration:0s;
	-webkit-transform:translate3d(0px,0,0);
	-webkit-transition-timing-function:ease;
	
	-moz-transition-property:-moz-transform, left, top;
	-moz-transition-duration:0s;
	-moz-transform:translate3d(0px,0,0);
	-moz-transition-timing-function:ease;
	
	-o-transition-property:-o-transform, left, top;
	-o-transition-duration:0s;
	-o-transform:translate3d(0px,0,0);
	-o-transition-timing-function:ease;
	-o-transform:translate(0px,0px);
	
	-ms-transition-property:-ms-transform, left, top;
	-ms-transition-duration:0s;
	-ms-transform:translate3d(0px,0,0);
	-ms-transition-timing-function:ease;
	
	transition-property:transform, left, top;
	transition-duration:0s;
	transform:translate3d(0px,0,0);
	transition-timing-function:ease;

	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}
.swiper-free-mode > .swiper-wrapper {
	-webkit-transition-timing-function: ease-out;
	-moz-transition-timing-function: ease-out;
	-ms-transition-timing-function: ease-out;
	-o-transition-timing-function: ease-out;
	transition-timing-function: ease-out;
	margin: 0 auto;
}
.swiper-slide {
	float: left;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}

/* IE10 Windows Phone 8 Fixes */
.swiper-wp8-horizontal {
	-ms-touch-action: pan-y;
}
.swiper-wp8-vertical {
	-ms-touch-action: pan-x;
}
		
.pubads-slide{ background: transparent; position: fixed; left: 10px;  bottom: 0; width: 168px;overflow: hidden; z-index: 2001; height: 188px;}
.pubads-slide .swiper-wrapper .swiper-slide{position: relative;overflow: hidden;}
.pubads-slide .swiper-wrapper .swiper-slide,.pubads-slide .swiper-wrapper li a{height: 170px;}
.pubads-slide .ads1-txt{transition:all 0.5s;transform: translateX(-100px);opacity: 0;filter: alpha(opacity=0); width: 127px;height: 43px;background: url(../../ftl/commonPage/themes/images/ads1-txt.png) no-repeat;    left: 50%;  position: absolute;    top: 20px;   margin-left: -62px;}
.pubads-slide .swiper-wrapper .swiper-slide.swiper-slide-active .ads1-txt,.pubads-slide .swiper-wrapper .swiper-slide.swiper-slide-active .ads2-txt,.pubads-slide .swiper-wrapper .swiper-slide.swiper-slide-active .ads1-img,.pubads-slide .swiper-wrapper .swiper-slide.swiper-slide-active .ads2-img{transform: translateX(0);opacity: 1;filter: alpha(opacity=100);}
.pubads-slide .ads1-img{transition:all 0.5s;transform: translateX(100px);opacity: 0;filter: alpha(opacity=0);width: 131px;height: 90px;background: url(../../ftl/commonPage/themes/images/ads1-img.png) no-repeat;    left: 50%;  position: absolute;   margin-left: -65px;top: 67px;}
.pubads-slide .ads2-txt{transition:all 0.5s;transform: translateX(-100px);opacity: 0;filter: alpha(opacity=0);width: 128px;height: 43px;background: url(../../ftl/commonPage/themes/images/ads2-txt.png) no-repeat;    left: 50%;  position: absolute;   margin-left: -64px;    top: 16px;}
.pubads-slide .ads2-img{transition:all 0.5s;transform: translateX(100px);opacity: 0;filter: alpha(opacity=0);width: 114px;height: 97px;background: url(../../ftl/commonPage/themes/images/ads2-img.png) no-repeat;    left: 50%;  position: absolute;   margin-left: -57px;top: 61px;}
.pubads-slide .swiper-wrapper .swiper-slide a:after{content: '';position: absolute;z-index: 1;width: 170px;height:170px;background: url(../../ftl/commonPage/themes/images/circle_dot.png) no-repeat;left: -3px;  top: -3px;animation: spin infinite linear 20s;}
.pubads-slide .swiper-wrapper .swiper-slide a{position: absolute;width: 100%;top: 0;z-index: 2;}
.pubads-slide .pagination .swiper-pagination-switch{display: inline-block;width: 9px;height: 9px;background: url(../../ftl/commonPage/themes/images/dot_normal.png) no-repeat center;margin: 0 4px;    cursor: pointer;}
.pubads-slide .pagination .swiper-pagination-switch.swiper-active-switch{background: url(../../ftl/commonPage/themes/images/dot_active.png) no-repeat center;}
.pubads-slide .btn-close{position: absolute;right: 0;top: 0;z-index:99;background: url(../../ftl/commonPage/themes/images/icon_close.png) no-repeat center;width: 15px;height: 15px;cursor: pointer;}
.pubads-slide .pagination{    position: absolute;    left: 0;    right: 0;    height: 22px; text-align: center;   bottom: 0;    margin: 0;}
@keyframes spin{
	from{    transform: rotateZ(0deg);}
	to{    transform: rotateZ(360deg);}
}
</style>
	        <!--轮播-->
<div class="swiper-container pubads-slide">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
    	<a href="live.html">
    		<img src="../../ftl/commonPage/zh_CN/pubads/images/ads1.png"/>
    		<span class="ads1-txt"></span>
    		<span class="ads1-img"></span>
    	</a>
    </div>
    <div class="swiper-slide">
    	<a href="casino.html?apiType=2&apiId=20&gameTag=hot_game">
    		<img src="../../ftl/commonPage/zh_CN/pubads/images/ads2.png"/>
    		<span class="ads2-txt"></span>
    		<span class="ads2-img"></span>
    	</a>    	
    </div>
  </div>
  <div class="pagination"></div>
  <div class="btn-close"></div>
</div>
    <script src="../../ftl/commonPage/js/jquery/jquery-1.11.3.min.js"></script>
    <script src="../../ftl/commonPage/js/idangerous.swiper.min.js"></script>
    <script>
    $(function() {
		var mySwiper = new Swiper('.swiper-container',{
			autoplay : 3500,//可选选项，自动滑动
			loop : true,//可选选项，开启循环
			pagination : '.pagination',
			paginationClickable :true,
			autoplayDisableOnInteraction : false
		});		
		if(!localStorage.getItem("pubads-close")){
			$(".pubads-slide").show();
		}
		$(".pubads-slide .btn-close").on('click',function(){
			$(this).parents(".pubads-slide").hide();
			localStorage.setItem("pubads-close", true);
		});
    });
    </script>
