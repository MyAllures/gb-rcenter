<script>

    // 单个游戏的彩池
    function gameJackPot() {
        $(".jianchi_num").each(function(i,e){
            var _this = $(this);
            var gameId = _this.data("game-id");
            var speed = Number($(this).data("speed"));
            var random = Number(Math.random()*5);
            var caichi = parseInt(204545*Number(random==0?1:random));
            var perJ = caichi/86400*speed; // 每次增加的量根据跳动时间来算
            var jackpotN = 0;
            if(sessionStorage.getItem("game_caichi"+gameId)==null){// 第一次获取的时候或者清除缓存后，把初始化的彩池值存入缓存
                sessionStorage.setItem("game_caichi"+gameId,caichi);
                $(_this).removeClass("jianchi_num").addClass(""+gameId+"");
            }
            jackpotN = Number(sessionStorage.getItem("game_caichi"+gameId));// 取出的是字符串，转换成数字
            _this.html(jackpotN.toLocaleString());
            clearInterval(gameId);
            gameId = setInterval(function(){
                jackpotN+=Math.ceil(perJ);
                sessionStorage.setItem("game_caichi"+gameId,jackpotN);
                _this.html(jackpotN.toLocaleString());
            },speed*1000);
        })
    }

    // 总彩池跳动脚本
    var intervalAipJ = null;
    function apiJackpot(apiId) {
        $("#jackpot_"+apiId).removeClass("hide");
        var jackpot_html_S="";
        //已缓存并且没有标记
        if(sessionStorage.getItem("caichi"+apiId)){
            clearInterval(intervalAipJ);
            intervalAipJ = setInterval(function () {
                jackpot_num_N = Number(sessionStorage.getItem("caichi"+apiId));// 取出的是字符串，转换成数字
                jackpot_num_N += 123;
                sessionStorage.setItem("caichi"+apiId,jackpot_num_N); // 彩池数字增加后，存入缓存

                jackpot_num_S = jackpot_num_N.toLocaleString();
                for(var i = 0;i<jackpot_num_S.length;i++){
                    if(jackpot_num_S[i] === ',' || jackpot_num_S[i] === '.'){
                        jackpot_html_S+= "<span class='j_dot'>"+jackpot_num_S[i]+"</span> "
                    } else {
                        jackpot_html_S+= "<span class='j_num'>"+jackpot_num_S[i]+"</span> "
                    }
                }

                $("#jackpot_"+apiId).html(jackpot_html_S);
                jackpot_html_S="";
            },1000);
        }else{
            //没有缓存并且没有标记
            var jackpot_num_S ="";
            var jackpot_num_N = 0;

            var caichi = Number($("#jackpot_"+apiId).data("jackpot"));
            caichi = Math.floor(caichi+Math.random()*10000000);
            sessionStorage.setItem("caichi"+apiId,caichi);
            clearInterval(intervalAipJ);
            intervalAipJ = setInterval(function () {
                jackpot_num_N = Number(sessionStorage.getItem("caichi"+apiId));// 取出的是字符串，转换成数字
                jackpot_num_N += 123;
                sessionStorage.setItem("caichi"+apiId,jackpot_num_N); // 彩池数字增加后，存入缓存

                jackpot_num_S = jackpot_num_N.toLocaleString();
                for(var i = 0;i<jackpot_num_S.length;i++){
                    jackpot_html_S+= "<span class='j_num'>"+jackpot_num_S[i]+"</span> "
                }
                $("#jackpot_"+apiId).html(jackpot_html_S);
                jackpot_html_S="";
            },1000);
        }
    }

    // api轮播
    var apiSwiper = new Swiper('.swiper-container',{
        loop: true,
        slidesPerView : 6,
        simulateTouch : false,
        autoplay:2500,
        autoplayDisableOnInteraction : false,
        onSlideClick: function(swiper){
           // console.log('事件触发了;'+apiSwiper.clickedSlideIndex);
        }
    });
    $('.swiper-contro.next').on('click',function(e){
        e.preventDefault()
        apiSwiper.swipeNext()
    });
    $('.swiper-contro.prev').on('click',function(e){
        e.preventDefault()
        apiSwiper.swipePrev()
    });
    // api-tab奇偶数区分
    $(".api-nav .swiper-slide:odd").addClass("odd");
    // 点击当前api设置当前api为active
    $('body').on('click','.api-nav .swiper-slide',function () {
        var api = $(this).find('a').data('api');
        $('.api-nav .swiper-slide').removeClass('active');
        $('.api-nav .swiper-slide a[data-api="'+api+'"]').parent().addClass('active');
    });
    // 从缓存读取api的显示方式
    if(sessionStorage.getItem('api-style')){
        if(sessionStorage.getItem('api-style') === 'api-slide'){
            $('.toggle-api').removeClass('a-all');
            $(".api-nav-slide").show();
            $(".api-nav-all").hide();
            apiSwiper.reInit();
        }
    }
    // api显示方式切换
    $("body").on("click",".toggle-api",function(){
        $(this).toggleClass("a-all");
        if($(this).hasClass("a-all")){
            sessionStorage.setItem('api-style','api-all')
            $(".api-nav-slide").slideUp();
            $(".api-nav-all").slideDown();
        }else{
            sessionStorage.setItem('api-style','api-slide')
            $(".api-nav-slide").slideDown();
            $(".api-nav-all").slideUp();
            apiSwiper.reInit();// 解决默认为全部展开时，点击切换后api轮播不滚动的问题
            setTimeout(function () { // api轮播的重新滚动起来
                apiSwiper.swipeNext();
            }, 500)
        }
    });
    // 为捕鱼api时， 用获取地址栏字段的方法添加active
    if(location.search.indexOf("Fish") > -1){
        $('.gui-logo-fish').parents('.swiper-slide').addClass('active');
    }
    // 为开元棋牌加active
    if(location.search.indexOf("apiId=34") > -1){
        $('.gui-logo-chess').parents('.swiper-slide').addClass('active');
    }
    //回车搜索
    $("._vr_casinoSearch").on("keydown",".search input[name='gameName']",function(e) {
        if (e.which == 13) {
            $("._vr_buttonSubmit").trigger("click");
        }
    });

    //异步加载游戏
    $("._vr_casinoSearch").on('click',"._vr_getGames",function(){
        if(typeof $(this).attr("onclick")=="undefined"){
            /*此处选中状态需要根据模板调整*/
            var apiId = $(this).data("api");
            var gameName;
            if($(this).data("type")!="paging"){
                /*用于搜索结果多页时判断是否保留搜索关键词*/
                gameName='';
            }else {
                gameName = $("input[name='gameName']").val()==''?'':encodeURIComponent($("input[name='gameName']").val());
            }
            $.ajax({
                url:$(this).data("href"),
                dataType:"html",
                data:{
                    gameName:gameName
                },
                success:function(data){
                    $("._vr_itemCasino").html(data);
                    maintainCheck();
                    gameJackPot();
                    apiJackpot(apiId);
                    game_demo();//试玩按钮是否显示
                }
            });
        }
    });

    //游戏搜索
    $("._vr_casinoSearch").on("click", "._vr_buttonSubmit",function (e) {
        var apiType = typeof $("input[name='apiType']").val()=='undefined'?'':encodeURIComponent($("input[name='apiType']").val());
        var gameType = typeof $("input[name='gameType']").val()=='undefined'?'':encodeURIComponent($("input[name='gameType']").val());
        var gameName = typeof $("input[name='gameName']").val()=='undefined'?'':encodeURIComponent($("input[name='gameName']").val());
        /*此处取apiId的target需要根据模板调整*/
        var tarApi = $("._vr_casinoSearch").find(".active a").data("api");
        var apiId = typeof tarApi !="undefined"?tarApi :"";

        $.ajax({
            url:"casino_partial.html?t="+new Date().getTime(),
            dataType:"html",
            data:{
                gameName:gameName,
                apiType:apiType,
                gameType:gameType,
                apiId:apiId
            },
            success:function(data){
                $("._vr_itemCasino").html(data);
                // 没有数据时隐藏全部游戏加载字样
                var noData = $(data).find('.g_no_result').length;
                maintainCheck();
                apiJackpot(apiId);
                // 单个游戏的彩池
                gameJackPot();
                if(noData > 0){
                    $('.g_all_game_loaded').attr('style','none');
                }
                game_demo();//试玩按钮是否显示
            }
        });
    });

    //更多游戏
    var isLoading = 0;
    $(window).on('scroll',function () { // 滚动到游戏列表底部触发加载更多
        if($(window).scrollTop()+$(window).height() > $("footer").offset().top){
            if(isLoading==0){
                var firstPage = Number($('#game-page').attr('data-firstpageNumber')),lastPage = Number($('#game-page').attr('data-lastPageNumber')); // 定义起始页和结束页变量
                var moreUrl = $("._vr_itemCasino ._vr_tabs").find("li.active a").data("href");
                if(firstPage < lastPage){ // 如果还有数据没显示，第一页变量加1
                    $(".g_loading").show(); // 加载时的加载层
                    firstPage += 1;
                }else{ // 否则显示全部数据加载完成，直接退出函数
                    $('.g_all_game_loaded').show();
                    return ;
                }
                $('#game-page').attr('data-firstpageNumber',firstPage); // 新的第一页变量赋值给页面的隐藏钩子元素
                $.ajax({
                    url:moreUrl + '&pageNumber=' + firstPage,
                    type: 'post',
                    success: function (data) {
                        $(".jianchi_num").removeClass("jianchi_num");
                        var afterData = $(data).find('._vr_casino_game').children();
                        $('div._vr_casino_game').append(afterData);
                        var first = $('#game-page').attr('data-firstPageNumber');
                        $('.g_loading').hide();
                        isLoading = 0; // 请求成功后恢复允许请求变量
                        maintainCheck();//添加onclick事件
                        // 单个游戏的彩池
                        gameJackPot();
                        game_demo();//试玩按钮是否显示
                    }
                })
                isLoading = 1; // 发起一次请求后把变量设为请求状态，禁止多次请求。
            }
        }
    });
    // 总彩池跳动脚本
    var apiId = getlocationParam("apiId");
    apiJackpot(apiId);
    // 单个游戏的彩池
    gameJackPot();

</script>