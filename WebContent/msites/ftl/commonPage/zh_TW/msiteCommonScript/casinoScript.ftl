<script>
    $(function () {
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
                $(this).parent().parent().find(".active").removeClass("active");
                $(this).parent().addClass("active");
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
                    }
                });
            }
        });

        //游戏搜索
        $("._vr_casinoSearch").on("click", "._vr_buttonSubmit",function (e) {
            var gameName = typeof $("input[name='gameName']").val()=='undefined'?'':encodeURIComponent($("input[name='gameName']").val());
            /*此处取apiId的target需要根据模板调整*/
            var tarApi = $("._vr_casinoSearch").find(".active a").data("api");
            var apiId = typeof tarApi !="undefined"?tarApi :"";

            $.ajax({
                url:"casino_partial.html?t="+new Date().getTime(),
                dataType:"html",
                data:{
                    gameName:gameName,
                    apiId:apiId
                },
                success:function(data){
                    $("._vr_itemCasino").html(data);
                    maintainCheck();
                }
            });
        });

        //更多游戏
        $("._vr_casinoSearch").on("click",".more_click_game",function (e) {
            var firstPageNumber = $(".more_click_game").attr("data-firstPageNumber");
            var lastPageNumber = $(".more_click_game").attr("data-lastPageNumber");
            var data_firstPageNumber = Number(firstPageNumber);
            var data_lastPageNumber = Number(lastPageNumber);
            //根据模板调整moreUrl的target
            var moreUrl = $("._vr_itemCasino ._vr_tabs").find("li.active a").data("href");
            if(data_firstPageNumber<data_lastPageNumber){
                data_firstPageNumber+=1;
            }else{
                $(".more_click_game").text("全部遊戲載入完成");
                return;
            }
            $(".more_click_game").attr("data-firstPageNumber",data_firstPageNumber);
            $.ajax({
                url:moreUrl+"&pageNumber="+data_firstPageNumber,
                type:"post",
                success:function(data){
                    var afterData = $(data).find("._vr_casino_game").children();
                    $('div._vr_casino_game').append(afterData);
                    var first = $(".more_click_game").attr("data-firstPageNumber");
                    if(first>=data_lastPageNumber){
                        $(".more_click_game").text("全部遊戲載入完成");
                        $(".more_click_game").removeClass("more_click_game");
                    }
                    maintainCheck();
                }
            })
        })
    });
</script>