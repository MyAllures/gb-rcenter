/*界面初始化*/
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*左侧菜单上下滚动，可自行指定范围*/
        leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left'],
        init: pullUpRefreshOption('#pullfresh', pullfresh, false)
    };
    muiInit(options);
});

/*上拉请求数据*/
function pullfresh() {
    setTimeout(function () {
        mui('#pullfresh').pullRefresh().endPullupToRefresh(false);
        var apiId = $("#api").attr("apiId");
        var pageNumber = parseInt($("#api").attr("pageNumber"));
        var lastPageNumber = parseInt($("#api").val());

        if (pageNumber == lastPageNumber) {
            mui('#pullfresh').pullRefresh().endPullupToRefresh(true);
        }else{
            loadData(apiId,pageNumber + 1,'');
        }
    }, 0);
}

function searchGame(){
    var apiId = $("#api").attr("apiId");
    var pageNumber = parseInt(1);
    var name = $("#game-name").val();
    $(".casino-list .mui-row").html('');

    loadData(apiId,pageNumber,name);
    if(name !=null && name.length != 0){
        mui('#pullfresh').pullRefresh().endPullupToRefresh(true);
    }else{
        mui('#pullfresh').pullRefresh().refresh(true);
    }
}

function loadData(apiId,pageNumber,name) {
    var tempName = '';
    if(name !=null && name != ""){
       tempName = '&search.name='+name;
    }
    var options = {
        url:root + '/game/getCasinoGameByApiId.html?search.apiId='+apiId+'&search.apiTypeId=2&paging.pageNumber='+pageNumber + tempName,
        type:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        dataType:'html',
        success:function(data){
            setTimeout(function() {
                $("#api").attr("pageNumber",pageNumber);
                $(".casino-list .mui-row").append(data);
            }, 1000);
        }
    };
    muiAjax(options);
}